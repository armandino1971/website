import 'dotenv/config';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import express from 'express';
import type { NextFunction, Request, Response } from 'express';

const PORT = Number(process.env.PORT) || 3000;
const DATA_DIR = path.resolve(process.cwd(), 'data');
const DIAGNOSTICS_FILE = path.resolve(DATA_DIR, 'diagnostics.jsonl');
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RATE_WINDOW_MS = 15 * 60 * 1000;
const RATE_MAX_REQUESTS = 10;
const rateBuckets = new Map<string, number[]>();

interface DiagnosticPayload {
  referenceId: string;
  receivedAt: string;
  lang: 'pt' | 'fr';
  name: string;
  company: string;
  email: string;
  phone: string;
  region: string;
  size: string;
  priority: string;
  notes: string;
}

function cleanString(value: unknown, maxLen: number): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLen);
}

function isRateLimited(clientKey: string): boolean {
  const now = Date.now();
  const recent = (rateBuckets.get(clientKey) || []).filter((ts) => now - ts < RATE_WINDOW_MS);
  if (recent.length >= RATE_MAX_REQUESTS) {
    rateBuckets.set(clientKey, recent);
    return true;
  }
  recent.push(now);
  rateBuckets.set(clientKey, recent);
  if (rateBuckets.size > 1000) {
    for (const [key, stamps] of rateBuckets.entries()) {
      if (stamps.every((ts) => now - ts >= RATE_WINDOW_MS)) {
        rateBuckets.delete(key);
      }
    }
  }
  return false;
}

function isSafeHttpsWebhook(rawUrl: string): URL | null {
  try {
    const parsed = new URL(rawUrl);
    if (parsed.protocol !== 'https:') return null;
    const host = parsed.hostname.toLowerCase();
    if (
      host === 'localhost' ||
      host === '127.0.0.1' ||
      host === '::1' ||
      host === '169.254.169.254' ||
      host.startsWith('10.') ||
      host.startsWith('192.168.') ||
      /^172\.(1[6-9]|2\d|3[0-1])\./.test(host)
    ) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

async function startServer() {
  const app = express();
  app.disable('x-powered-by');
  app.set('trust proxy', 1);

  // Baseline HTTP security headers (iframe-safe for AI Studio preview)
  app.use((_req: Request, res: Response, next: NextFunction) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
    next();
  });

  app.use(express.json({ limit: '32kb' }));

  app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof SyntaxError && req.path.startsWith('/api/')) {
      res.status(400).json({ error: 'INVALID_JSON' });
      return;
    }
    next(err);
  });

  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok' });
  });

  app.post('/api/diagnostic', async (req: Request, res: Response) => {
    const clientIp = req.ip || req.socket.remoteAddress || 'unknown';
    if (isRateLimited(clientIp)) {
      res.status(429).json({ error: 'RATE_LIMITED' });
      return;
    }

    const body = (req.body && typeof req.body === 'object' ? req.body : {}) as Record<string, unknown>;

    const name = cleanString(body.name, 120);
    const company = cleanString(body.company, 160);
    const email = cleanString(body.email, 160);
    const phone = cleanString(body.phone, 40);
    const region = cleanString(body.region, 100);
    const size = cleanString(body.size, 100);
    const priority = cleanString(body.priority, 160);
    const notes = cleanString(body.notes, 2000);
    const lang: 'pt' | 'fr' = body.lang === 'fr' ? 'fr' : 'pt';

    if (name.length < 2 || company.length < 2 || phone.length < 5) {
      res.status(400).json({ error: 'MISSING_REQUIRED_FIELDS' });
      return;
    }

    if (!EMAIL_REGEX.test(email)) {
      res.status(400).json({ error: 'INVALID_EMAIL' });
      return;
    }

    const receivedAt = new Date().toISOString();
    const dateStamp = receivedAt.slice(0, 10).replace(/-/g, '');
    const suffix = crypto.randomBytes(2).toString('hex').toUpperCase();
    const referenceId = `OPEX-${dateStamp}-${suffix}`;

    const record: DiagnosticPayload = {
      referenceId,
      receivedAt,
      lang,
      name,
      company,
      email,
      phone,
      region,
      size,
      priority,
      notes,
    };

    try {
      if (!DIAGNOSTICS_FILE.startsWith(DATA_DIR + path.sep)) {
        throw new Error('Invalid persistence path');
      }
      await fs.promises.mkdir(DATA_DIR, { recursive: true });
      await fs.promises.appendFile(DIAGNOSTICS_FILE, JSON.stringify(record) + '\n', 'utf8');
    } catch {
      res.status(500).json({ error: 'PERSISTENCE_FAILED' });
      return;
    }

    const rawWebhook = (process.env.DIAGNOSTIC_WEBHOOK_URL || '').trim();
    if (rawWebhook) {
      const safeUrl = isSafeHttpsWebhook(rawWebhook);
      if (safeUrl) {
        const serialized = JSON.stringify(record);
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
        };
        const webhookSecret = (process.env.DIAGNOSTIC_WEBHOOK_SECRET || '').trim();
        if (webhookSecret) {
          const sig = crypto
            .createHmac('sha256', webhookSecret)
            .update(serialized)
            .digest('hex');
          headers['X-OpEx-Signature'] = `sha256=${sig}`;
        }
        try {
          await fetch(safeUrl, {
            method: 'POST',
            headers,
            body: serialized,
            signal: AbortSignal.timeout(4000),
          });
        } catch {
          // Lead is already stored locally; do not fail user submission if external webhook times out.
        }
      }
    }

    res.status(201).json({
      ok: true,
      referenceId,
      receivedAt,
    });
  });

  app.all('/api/*', (_req: Request, res: Response) => {
    res.status(404).json({ error: 'NOT_FOUND' });
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`OpEx Lean server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
