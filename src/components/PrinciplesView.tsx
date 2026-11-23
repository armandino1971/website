import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  Check,
  Copy,
  Eye,
  Plus,
  Printer,
  RotateCcw,
  Search,
  Settings2,
  Trash2,
  X,
} from 'lucide-react';
import { AppView, EvolutionSnapshot, Language, TechnicalToolSpec } from '../types';
import {
  axesInfo,
  gembaFlashCriteria,
  getDefaultDemoHistory,
  outcomeCards,
  principleCards,
  radarPrinciplesConfig,
  toolsTechnicalSpecs,
} from '../data/principlesData';
import { CONTACT_EMAIL, WHATSAPP_NUMBER } from '../data/homeData';

const STORAGE_KEY_SCORES = 'opex_lean_radar_scores_v3';
const STORAGE_KEY_GEMBA = 'opex_lean_gemba_flash_v3';
const STORAGE_KEY_HISTORY = 'opex_lean_history_v1';

interface PrinciplesViewProps {
  lang: Language;
  onChangeLang: (lang: Language) => void;
  onNavigate: (view: AppView, sectionId?: string) => void;
}

function sanitizeScores(arr: unknown): number[] | null {
  if (!Array.isArray(arr) || arr.length !== 9) return null;
  return arr.map((v) => {
    const n = parseInt(String(v), 10);
    if (Number.isNaN(n)) return 5;
    return Math.min(9, Math.max(1, n));
  });
}

function calcAvg(scores: number[]): number {
  return scores.reduce((acc, v) => acc + v, 0) / 9;
}

export function PrinciplesView({ lang, onChangeLang, onNavigate }: PrinciplesViewProps) {
  // Persistent Evolution History
  const [history, setHistory] = useState<EvolutionSnapshot[]>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY_HISTORY) || 'null');
      if (Array.isArray(saved) && saved.length > 0) {
        const valid = saved
          .filter((item) => item && typeof item.date === 'string' && sanitizeScores(item.scores))
          .map((item) => ({ ...item, scores: sanitizeScores(item.scores)! }));
        if (valid.length > 0) return valid;
      }
    } catch {
      // ignore storage errors
    }
    return getDefaultDemoHistory();
  });

  // Persistent Radar Scores (1..9)
  const [scores, setScores] = useState<number[]>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY_SCORES) || 'null');
      const clean = sanitizeScores(saved);
      if (clean) return clean;
    } catch {
      // ignore
    }
    return [...getDefaultDemoHistory()[3].scores];
  });

  // Persistent 5-Minute Gemba Flash Test
  const [gembaChecks, setGembaChecks] = useState<boolean[]>(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY_GEMBA) || 'null');
      if (Array.isArray(saved) && saved.length === 5) return saved.map(Boolean);
    } catch {
      // ignore
    }
    return [false, false, false, false, false];
  });

  // Filters & UI state
  const [axisFilter, setAxisFilter] = useState<'all' | '01' | '02' | '03' | '04' | '05' | '06'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showBaselineOverlay, setShowBaselineOverlay] = useState(true);
  const [selectedBaselineIdx, setSelectedBaselineIdx] = useState(0);
  const [snapshotDate, setSnapshotDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [snapshotLabel, setSnapshotLabel] = useState('');
  const [activePointBanner, setActivePointBanner] = useState<{ title: string; score: string } | null>(null);
  const [drawerTool, setDrawerTool] = useState<TechnicalToolSpec | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SCORES, JSON.stringify(scores));
    } catch {
      // ignore
    }
  }, [scores]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_GEMBA, JSON.stringify(gembaChecks));
    } catch {
      // ignore
    }
  }, [gembaChecks]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(history));
    } catch {
      // ignore
    }
  }, [history]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDrawerTool(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    window.setTimeout(() => {
      setToastMsg((prev) => (prev === msg ? null : prev));
    }, 2600);
  };

  const openTool = (key: string) => {
    const spec = toolsTechnicalSpecs[key];
    if (spec) setDrawerTool(spec);
  };

  const getSnapLabel = (snap: EvolutionSnapshot) =>
    lang === 'pt' ? snap.labelPt || snap.labelFr : snap.labelFr || snap.labelPt;

  const safeBaselineIdx = selectedBaselineIdx < history.length ? selectedBaselineIdx : 0;
  const baselineSnap = history[safeBaselineIdx] || history[0];
  const currentAvg = calcAvg(scores);
  const startAvg = baselineSnap ? calcAvg(baselineSnap.scores) : currentAvg;
  const deltaPts = currentAvg - startAvg;
  const deltaPct = startAvg > 0 ? Math.round((deltaPts / startAvg) * 100) : 0;

  const greenCount = gembaChecks.filter(Boolean).length;

  const maturityLabel = useMemo(() => {
    if (currentAvg < 4) return lang === 'pt' ? 'Inicial / Reativo' : 'Initial / Réactif';
    if (currentAvg < 6.5) return lang === 'pt' ? 'Em Evolução' : 'En Évolution';
    if (currentAvg < 8) return lang === 'pt' ? 'Estruturado' : 'Structuré';
    return lang === 'pt' ? 'Referência Lean' : 'Référence Lean';
  }, [currentAvg, lang]);

  // Top 3 weakest principles for Priority Action Plan
  const priorityLevers = useMemo(() => {
    return scores
      .map((score, idx) => ({ score, idx, cfg: radarPrinciplesConfig[idx] }))
      .sort((a, b) => a.score - b.score)
      .slice(0, 3);
  }, [scores]);

  const applyPreset = (type: 'red' | 'mid' | 'top') => {
    if (type === 'red') setScores([2, 3, 2, 2, 2, 3, 2, 3, 3]);
    else if (type === 'mid') setScores([5, 5, 5, 5, 5, 5, 5, 5, 5]);
    else setScores([8, 9, 8, 8, 8, 9, 8, 9, 9]);
    showToast(lang === 'pt' ? 'Cenário aplicado ao Radar' : 'Scénario appliqué au Radar');
  };

  const saveSnapshot = () => {
    const dateVal = snapshotDate || new Date().toISOString().slice(0, 10);
    const trimmed = snapshotLabel.trim();
    const fallbackLabel = lang === 'pt' ? `Auditoria #${history.length + 1}` : `Audit #${history.length + 1}`;
    const newSnap: EvolutionSnapshot = {
      id: `snap-${Date.now()}`,
      date: dateVal,
      labelPt: trimmed || fallbackLabel,
      labelFr: trimmed || fallbackLabel,
      scores: [...scores],
    };
    const next = [...history, newSnap].sort((a, b) => a.date.localeCompare(b.date));
    setHistory(next);
    setSnapshotLabel('');
    showToast(lang === 'pt' ? 'Marco guardado no histórico!' : 'Jalon enregistré dans l’historique !');
  };

  const loadSnapshotIntoRadar = (idx: number) => {
    const snap = history[idx];
    if (!snap) return;
    setScores([...snap.scores]);
    setActivePointBanner({
      title: `${snap.date} · ${getSnapLabel(snap)}`,
      score: `${calcAvg(snap.scores).toFixed(1)} / 9.0`,
    });
    showToast(
      lang === 'pt' ? `Marco carregado: ${getSnapLabel(snap)}` : `Jalon chargé : ${getSnapLabel(snap)}`
    );
  };

  const deleteSnapshot = (idx: number) => {
    if (history.length <= 1) {
      clearHistory();
      return;
    }
    const next = history.filter((_, i) => i !== idx);
    setHistory(next);
    if (selectedBaselineIdx >= next.length) setSelectedBaselineIdx(0);
  };

  const loadDemoHistory = () => {
    const demo = getDefaultDemoHistory();
    setHistory(demo);
    setSelectedBaselineIdx(0);
    setScores([...demo[demo.length - 1].scores]);
    showToast(lang === 'pt' ? 'Percurso exemplo carregado' : 'Parcours exemple chargé');
  };

  const clearHistory = () => {
    const today = new Date().toISOString().slice(0, 10);
    setHistory([
      {
        id: `init-${Date.now()}`,
        date: today,
        labelPt: 'Diagnóstico Inicial (Before)',
        labelFr: 'Diagnostic Initial (Before)',
        scores: [...scores],
      },
    ]);
    setSelectedBaselineIdx(0);
    showToast(
      lang === 'pt' ? 'Histórico reiniciado com o estado atual' : 'Historique réinitialisé avec l’état actuel'
    );
  };

  const copyDiagnosticReport = async () => {
    const avgStr = currentAvg.toFixed(1);
    const header =
      lang === 'pt'
        ? `OPEX LEAN — DIAGNÓSTICO DE MATURIDADE LEAN (${avgStr} / 9.0)\n`
        : `OPEX LEAN — DIAGNOSTIC DE MATURITÉ LEAN (${avgStr} / 9.0)\n`;
    const lines = radarPrinciplesConfig
      .map((cfg, idx) => `- ${cfg.title[lang]}: ${scores[idx]}/9`)
      .join('\n');
    const fullText = `${header}${'='.repeat(45)}\n${lines}\n\nhttps://opex-lean.eu/9-principios.html`;

    try {
      await navigator.clipboard.writeText(fullText);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = fullText;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    showToast(
      lang === 'pt'
        ? 'Relatório copiado para a área de transferência!'
        : 'Rapport copié dans le presse-papiers !'
    );
  };

  // Filter visibility for principles & outcome axis
  const q = searchQuery.trim().toLowerCase();
  const visibleAxes = axesInfo.filter((axis) => {
    if (axisFilter !== 'all' && axisFilter !== axis.id) return false;
    if (axis.id === '06') {
      if (!q) return true;
      return outcomeCards.some(
        (c) => c.title[lang].toLowerCase().includes(q) || c.text[lang].toLowerCase().includes(q)
      );
    }
    const matchingCards = principleCards.filter((card) => {
      if (card.axis !== axis.id) return false;
      if (!q) return true;
      const hay = `${card.keywords} ${card.title[lang]} ${card.tools.join(' ')} ${card.blocks
        .map((b) => `${b.title[lang]} ${b.text[lang]}`)
        .join(' ')}`.toLowerCase();
      return hay.includes(q);
    });
    return matchingCards.length > 0;
  });

  // Radar SVG geometry
  const radarGeometry = useMemo(() => {
    const cx = 180;
    const cy = 165;
    const maxR = 108;
    const n = 9;
    const step = (Math.PI * 2) / n;

    const gridPolygons = [3, 6, 9].map((lvl) => {
      const r = (lvl / 9) * maxR;
      const pts: string[] = [];
      for (let i = 0; i < n; i++) {
        const angle = -Math.PI / 2 + i * step;
        pts.push(`${(cx + r * Math.cos(angle)).toFixed(1)},${(cy + r * Math.sin(angle)).toFixed(1)}`);
      }
      return pts.join(' ');
    });

    const axes = radarPrinciplesConfig.map((cfg, i) => {
      const angle = -Math.PI / 2 + i * step;
      const xEnd = cx + maxR * Math.cos(angle);
      const yEnd = cy + maxR * Math.sin(angle);
      const labelR = maxR + 22;
      const lx = cx + labelR * Math.cos(angle);
      const ly = cy + labelR * Math.sin(angle);
      const anchor: 'start' | 'end' | 'middle' =
        Math.cos(angle) > 0.2 ? 'start' : Math.cos(angle) < -0.2 ? 'end' : 'middle';
      const rVal = (scores[i] / 9) * maxR;
      const vx = cx + rVal * Math.cos(angle);
      const vy = cy + rVal * Math.sin(angle);
      const bVal = baselineSnap ? (baselineSnap.scores[i] / 9) * maxR : 0;
      const bx = cx + bVal * Math.cos(angle);
      const by = cy + bVal * Math.sin(angle);

      return {
        xEnd,
        yEnd,
        lx,
        ly,
        anchor,
        shortLabel: cfg.short[lang],
        vx,
        vy,
        bx,
        by,
      };
    });

    return {
      cx,
      cy,
      gridPolygons,
      axes,
      currentPoly: axes.map((a) => `${a.vx.toFixed(1)},${a.vy.toFixed(1)}`).join(' '),
      baselinePoly: axes.map((a) => `${a.bx.toFixed(1)},${a.by.toFixed(1)}`).join(' '),
    };
  }, [scores, baselineSnap, lang]);

  // Evolution Line SVG geometry
  const evolutionGeometry = useMemo(() => {
    const w = 620;
    const h = 250;
    const padL = 44;
    const padR = 26;
    const padT = 22;
    const padB = 42;
    const plotW = w - padL - padR;
    const plotH = h - padT - padB;

    const yFor = (val: number) => padT + plotH - ((val - 1) / 8) * plotH;
    const gridLevels = [1, 3, 5, 7.5, 9].map((val) => ({
      val,
      y: yFor(val),
      isTarget: val === 7.5,
    }));

    const count = history.length;
    const points = history.map((snap, idx) => {
      const avg = calcAvg(snap.scores);
      const x = count === 1 ? padL + plotW / 2 : padL + (idx / (count - 1)) * plotW;
      const y = yFor(avg);
      return { x, y, avg, snap, idx };
    });

    const polyline = points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
    const areaPath =
      points.length > 1
        ? `M ${points[0].x.toFixed(1)},${(padT + plotH).toFixed(1)} L ${points
            .map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`)
            .join(' L ')} L ${points[points.length - 1].x.toFixed(1)},${(padT + plotH).toFixed(1)} Z`
        : '';

    return { w, h, padL, padR, gridLevels, points, polyline, areaPath };
  }, [history]);

  // Dynamic WhatsApp / Email summary links for Radar
  const avgStr = currentAvg.toFixed(1);
  const summaryLines =
    lang === 'pt'
      ? `Diagnóstico Maturidade OpEx Lean (${avgStr}/9.0):\nTop 3 Alavancas Prioritárias:\n` +
        priorityLevers.map((r, i) => `${i + 1}. ${r.cfg.title.pt} (${r.score}/9)`).join('\n')
      : `Diagnostic Maturité OpEx Lean (${avgStr}/9.0) :\nTop 3 Leviers Prioritaires :\n` +
        priorityLevers.map((r, i) => `${i + 1}. ${r.cfg.title.fr} (${r.score}/9)`).join('\n');

  const waRadarHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    (lang === 'pt'
      ? 'Olá Armandino, seguem os resultados do meu diagnóstico OpEx Lean:\n'
      : 'Bonjour Armandino, voici les résultats de mon diagnostic OpEx Lean :\n') + summaryLines
  )}`;

  const mailRadarHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    lang === 'pt'
      ? `Diagnóstico OpEx Lean (${avgStr}/9) - 9 Princípios`
      : `Diagnostic OpEx Lean (${avgStr}/9) - 9 Principes`
  )}&body=${encodeURIComponent(summaryLines)}`;

  return (
    <div className="bg-[#F8F9FA]">
      {/* Toast Notification */}
      {toastMsg && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-lg bg-[#0F172A] text-white border border-slate-700 shadow-2xl font-mono text-xs"
        >
          <Check className="w-4 h-4 text-[#D96B43]" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* 1. HERO & ARCHITECTURAL 6-AXIS ROADMAP */}
      <section className="bg-[#0F172A] text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-14 lg:pb-18">
          {/* Sub-bar: Back to Home + Language Switch */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-slate-800 mb-10">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{lang === 'pt' ? 'Voltar à página inicial OpEx Lean' : 'Retour à l’accueil OpEx Lean'}</span>
            </button>

            <div className="inline-flex items-center p-1 rounded-lg bg-slate-900 border border-slate-700" role="group" aria-label="Language switcher">
              <button
                type="button"
                onClick={() => onChangeLang('pt')}
                className={`px-3 py-1 text-xs font-mono font-semibold rounded-md transition-colors cursor-pointer ${
                  lang === 'pt' ? 'bg-[#D96B43] text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                PT-PT
              </button>
              <button
                type="button"
                onClick={() => onChangeLang('fr')}
                className={`px-3 py-1 text-xs font-mono font-semibold rounded-md transition-colors cursor-pointer ${
                  lang === 'fr' ? 'bg-[#D96B43] text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                FR
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-10 items-stretch">
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                <p className="text-xs font-mono font-semibold uppercase tracking-wider text-[#D96B43]">
                  OpEx Lean · {lang === 'pt' ? '0 Slide · 100% Terreno (Gemba)' : '0 Slide · 100 % Terrain (Gemba)'}
                </p>

                <h1 className="font-display font-extrabold text-white tracking-tight leading-[1.08] text-balance text-[clamp(2.25rem,4vw,3.5rem)]">
                  {lang === 'pt' ? 'Pensar Lean:' : 'Penser Lean :'}
                  <span className="block text-[#D96B43] mt-1">
                    {lang === 'pt' ? '9 Princípios para Vencer' : '9 Principes pour Vaincre'}
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                  {lang === 'pt'
                    ? 'Uma boa maneira de gerir — Do terreno (Gemba) aos resultados sustentáveis. Cada princípio inclui os sintomas reais no terreno, ferramentas práticas e impacto operacional.'
                    : 'Une bonne manière de gérer — Du terrain (Gemba) aux résultats durables. Chaque principe intègre les symptômes réels du terrain, les outils pratiques et l’impact opérationnel.'}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#radar-diagnostico"
                  className="px-5 py-3.5 rounded-lg bg-[#D96B43] hover:bg-[#B8532D] text-white font-semibold text-sm transition-colors whitespace-nowrap"
                >
                  {lang === 'pt' ? 'Avaliação de Maturidade (1–9)' : 'Évaluation de Maturité (1–9)'}
                </a>
                <a
                  href="#gemba-flash"
                  className="px-5 py-3.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-semibold text-sm transition-colors whitespace-nowrap"
                >
                  {lang === 'pt' ? 'Teste Gemba (5 min)' : 'Test Gemba (5 min)'}
                </a>
                <a
                  href="#evolucao-temporal"
                  className="px-4 py-3.5 text-sm font-medium text-slate-300 hover:text-white underline underline-offset-4 whitespace-nowrap"
                >
                  {lang === 'pt' ? 'Curva de Evolução' : 'Courbe d’Évolution'}
                </a>
              </div>
            </div>

            {/* 6-Axis Roadmap */}
            <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-300">
                  {lang === 'pt' ? 'Arquitetura do Sistema Lean' : 'Architecture du Système Lean'}
                </span>
                <span className="text-xs font-mono font-bold text-[#D96B43]">6 · 9</span>
              </div>
              <div className="divide-y divide-slate-800">
                {axesInfo.map((axis) => (
                  <a
                    key={axis.id}
                    href={`#eixo-${axis.id}`}
                    onClick={() => setAxisFilter('all')}
                    className="py-2.5 flex items-center justify-between text-sm hover:text-[#D96B43] transition-colors group"
                  >
                    <span className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-[#D96B43] tabular-nums">{axis.id}.</span>
                      <span className="font-medium text-slate-100 group-hover:text-[#D96B43]">{axis.title[lang]}</span>
                    </span>
                    <span className="text-xs text-slate-400 group-hover:text-[#D96B43]">→</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FILTER TOOLBAR & SEARCH */}
      <section className="bg-white border-b border-slate-200 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg" role="tablist" aria-label="Filtrar por Eixo">
              <button
                type="button"
                onClick={() => setAxisFilter('all')}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  axisFilter === 'all' ? 'bg-white text-slate-950 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                {lang === 'pt' ? 'Todos (6 Eixos)' : 'Tous (6 Axes)'}
              </button>
              {axesInfo.map((axis) => (
                <button
                  key={axis.id}
                  type="button"
                  onClick={() => setAxisFilter(axis.id)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    axisFilter === axis.id
                      ? 'bg-white text-slate-950 shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-950'
                  }`}
                >
                  {axis.filterLabel[lang]}
                </button>
              ))}
            </div>

            <div className="relative w-full lg:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  lang === 'pt'
                    ? 'Pesquisar princípio ou ferramenta (5S, VSM, PDCA...)'
                    : 'Rechercher principe ou outil (5S, VSM, PDCA...)'
                }
                className="w-full pl-9 pr-8 py-2 rounded-lg bg-[#F8F9FA] border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#D96B43] focus:bg-white"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Limpar pesquisa"
                  className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-900 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. PRINCIPLES SECTIONS */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {visibleAxes.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center">
            <p className="font-semibold text-sm text-slate-900">
              {lang === 'pt'
                ? 'Nenhum princípio ou ferramenta corresponde à sua pesquisa.'
                : 'Aucun principe ou outil ne correspond à votre recherche.'}
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setAxisFilter('all');
              }}
              className="mt-4 px-4 py-2 rounded-lg bg-[#0F172A] text-white text-xs font-semibold cursor-pointer"
            >
              {lang === 'pt' ? 'Repor filtros' : 'Réinitialiser les filtres'}
            </button>
          </div>
        )}

        {visibleAxes.map((axis) => {
          if (axis.id === '06') {
            return (
              <section key={axis.id} id={`eixo-${axis.id}`} className="scroll-mt-24">
                <div className="bg-[#0F172A] text-white rounded-2xl border border-slate-800 p-8 sm:p-10">
                  <div className="border-b border-slate-800 pb-5 mb-8">
                    <p className="text-xs font-mono font-semibold text-[#D96B43] uppercase tracking-wider">
                      06 · {axis.title[lang]}
                    </p>
                    <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white mt-1">
                      {axis.subtitle[lang]}
                    </h2>
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {outcomeCards.map((oc) => (
                      <div key={oc.code} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                        <p className="font-mono text-xs font-bold text-[#D96B43] mb-2">{oc.code}</p>
                        <h3 className="font-display font-bold text-base text-white mb-2">{oc.title[lang]}</h3>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{oc.text[lang]}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            );
          }

          const cards = principleCards.filter((c) => {
            if (c.axis !== axis.id) return false;
            if (!q) return true;
            const hay = `${c.keywords} ${c.title[lang]} ${c.tools.join(' ')} ${c.blocks
              .map((b) => `${b.title[lang]} ${b.text[lang]}`)
              .join(' ')}`.toLowerCase();
            return hay.includes(q);
          });

          return (
            <section key={axis.id} id={`eixo-${axis.id}`} className="scroll-mt-24 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-slate-300 pb-3 gap-2">
                <div>
                  <p className="text-xs font-mono font-semibold text-[#D96B43] uppercase tracking-wider">
                    {axis.id}. {axis.title[lang]}
                  </p>
                  <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-950 mt-0.5">
                    {axis.title[lang]}
                  </h2>
                </div>
                <span className="text-xs font-mono text-slate-500">{axis.subtitle[lang]}</span>
              </div>

              <div className={`grid gap-6 ${cards.length === 1 ? 'grid-cols-1' : 'lg:grid-cols-2'}`}>
                {cards.map((card) => (
                  <article
                    key={card.id}
                    className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between space-y-6"
                  >
                    <div className="space-y-5">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <p className="text-xs font-mono font-semibold text-[#D96B43] uppercase tracking-wider">
                            {card.label[lang]}
                          </p>
                          <h3 className="font-display font-extrabold text-xl sm:text-2xl text-slate-950 mt-1">
                            {card.title[lang]}
                          </h3>
                        </div>

                        <div className="flex flex-wrap gap-2 no-print">
                          {card.tools.map((toolKey) => (
                            <button
                              key={toolKey}
                              type="button"
                              onClick={() => openTool(toolKey)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F8F9FA] hover:bg-[#D96B43] hover:text-white text-slate-800 border border-slate-200 text-xs font-mono font-semibold transition-colors cursor-pointer"
                            >
                              <Settings2 className="w-3.5 h-3.5" />
                              <span>{toolKey}</span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {card.symptom && (
                        <div className="p-4 rounded-xl bg-[#0F172A] text-white space-y-1">
                          <p className="font-mono text-[11px] font-bold text-[#D96B43] uppercase tracking-wider">
                            {lang === 'pt' ? 'Tem este problema no terreno?' : 'Vous observez ce symptôme ?'}
                          </p>
                          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{card.symptom[lang]}</p>
                        </div>
                      )}

                      {card.keyRule && (
                        <div className="p-4 rounded-xl bg-[#0F172A] text-white flex flex-wrap items-center gap-3">
                          <span className="font-mono text-[11px] font-bold text-[#D96B43] uppercase tracking-wider">
                            {lang === 'pt' ? 'Regra-chave:' : 'Règle clé :'}
                          </span>
                          <p className="font-semibold text-sm">{card.keyRule[lang]}</p>
                        </div>
                      )}

                      <div
                        className={`grid gap-4 ${
                          card.blocks.length === 3
                            ? 'md:grid-cols-3'
                            : card.blocks.length >= 4
                            ? 'sm:grid-cols-2'
                            : 'grid-cols-1'
                        }`}
                      >
                        {card.blocks.map((block) => (
                          <div key={block.title[lang]} className="p-4 rounded-xl bg-[#F8F9FA] border border-slate-200">
                            <h4 className="font-semibold text-sm text-slate-950 mb-1.5">{block.title[lang]}</h4>
                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{block.text[lang]}</p>
                          </div>
                        ))}
                      </div>

                      {card.metrics && (
                        <div className="grid grid-cols-3 gap-3 text-center">
                          {card.metrics.map((m) => (
                            <div key={m.label[lang]} className="p-3 rounded-xl bg-[#0F172A] text-white">
                              <p className="font-mono text-xs font-bold text-[#D96B43]">{m.code}</p>
                              <p className="text-xs text-slate-200 mt-0.5">{m.label[lang]}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="pt-4 border-t border-slate-200 text-xs text-slate-600 flex flex-wrap items-baseline gap-2">
                      <span className="font-mono font-bold text-slate-950 uppercase">
                        {lang === 'pt' ? 'Impacto no Gemba:' : 'Impact sur le Gemba :'}
                      </span>
                      <span>{card.takeaway[lang]}</span>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}

        {/* 4. 5-MINUTE GEMBA FLASH TEST */}
        <section id="gemba-flash" className="scroll-mt-24">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200 pb-4 gap-4">
              <div>
                <p className="text-xs font-mono font-semibold text-[#D96B43] uppercase tracking-wider">
                  {lang === 'pt'
                    ? 'Observação Direta no Terreno · Teste dos 5 Minutos'
                    : 'Observation Directe Terrain · Test des 5 Minutes'}
                </p>
                <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-950 mt-1">
                  {lang === 'pt'
                    ? 'Diagnóstico Visual Gemba: Operação no Vermelho vs. Verde'
                    : 'Diagnostic Visuel Gemba : Opération dans le Rouge vs. Vert'}
                </h2>
              </div>
              <div className="font-mono text-xs font-bold text-slate-950 tabular-nums">
                {greenCount} / 5 {lang === 'pt' ? 'critérios no verde' : 'critères au vert'}
              </div>
            </div>

            <p className="text-sm text-slate-600">
              {lang === 'pt'
                ? 'Ao caminhar 5 minutos pela sua área operacional ou escritório, assinale os critérios já visíveis no terreno para avaliar a saúde imediata do fluxo:'
                : 'En marchant 5 minutes dans votre atelier ou bureau, cochez les critères déjà visibles sur le terrain pour évaluer la santé immédiate du flux :'}
            </p>

            <div className="grid md:grid-cols-5 gap-3.5">
              {gembaFlashCriteria.map((item, idx) => {
                const isGreen = gembaChecks[idx];
                const stateLabel = isGreen
                  ? lang === 'pt'
                    ? 'VERDE · OK'
                    : 'VERT · OK'
                  : lang === 'pt'
                  ? 'VERMELHO · ALERTA'
                  : 'ROUGE · ALERTE';
                return (
                  <button
                    key={item.title.pt}
                    type="button"
                    aria-pressed={isGreen}
                    onClick={() =>
                      setGembaChecks((prev) => prev.map((v, i) => (i === idx ? !v : v)))
                    }
                    className={`text-left p-4 rounded-xl border transition-colors cursor-pointer flex flex-col justify-between space-y-4 ${
                      isGreen
                        ? 'bg-[#0F172A] text-white border-[#D96B43]'
                        : 'bg-[#F8F9FA] text-slate-900 border-slate-200 hover:border-[#D96B43]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className={`font-mono text-xs font-bold ${isGreen ? 'text-[#D96B43]' : 'text-slate-950'}`}>
                          {item.title[lang]}
                        </span>
                      </div>
                      <p className={`text-xs leading-relaxed ${isGreen ? 'text-slate-200' : 'text-slate-600'}`}>
                        {isGreen ? item.green[lang] : item.red[lang]}
                      </p>
                    </div>
                    <div
                      className={`pt-2 border-t text-[11px] font-mono font-semibold flex items-center justify-between ${
                        isGreen ? 'border-slate-800 text-emerald-400' : 'border-slate-200 text-slate-500'
                      }`}
                    >
                      <span>{stateLabel}</span>
                      <span>{isGreen ? '✓' : '○'}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* 5. RADAR DE MATURIDADE LEAN (1–9) & PRIORITY PLAN */}
        <section id="radar-diagnostico" className="scroll-mt-24 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-slate-300 pb-4 gap-4">
            <div>
              <p className="text-xs font-mono font-semibold text-[#D96B43] uppercase tracking-wider">
                {lang === 'pt'
                  ? 'Diagnóstico Executivo OpEx Lean · Escala 1 a 9'
                  : 'Diagnostic Exécutif OpEx Lean · Échelle 1 à 9'}
              </p>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-950 mt-1">
                {lang === 'pt'
                  ? 'Radar de Maturidade Lean & Plano de Ação Prioritário'
                  : 'Radar de Maturité Lean & Plan d’Action Prioritaire'}
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2 no-print">
              <div className="inline-flex items-center gap-1 p-1 bg-slate-200/70 rounded-lg">
                <button
                  type="button"
                  onClick={() => applyPreset('red')}
                  className="px-2.5 py-1.5 rounded-md text-xs font-mono font-semibold text-slate-800 hover:bg-white transition-colors cursor-pointer"
                >
                  {lang === 'pt' ? 'Inicial (2.4)' : 'Initial (2.4)'}
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset('mid')}
                  className="px-2.5 py-1.5 rounded-md text-xs font-mono font-semibold text-slate-800 hover:bg-white transition-colors cursor-pointer"
                >
                  {lang === 'pt' ? 'Médio (5.0)' : 'Moyen (5.0)'}
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset('top')}
                  className="px-2.5 py-1.5 rounded-md text-xs font-mono font-semibold text-[#D96B43] hover:bg-white transition-colors cursor-pointer"
                >
                  {lang === 'pt' ? 'Alvo (8.4)' : 'Cible (8.4)'}
                </button>
              </div>

              <button
                type="button"
                onClick={copyDiagnosticReport}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#D96B43] hover:bg-[#B8532D] text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{lang === 'pt' ? 'Copiar Relatório' : 'Copier le Rapport'}</span>
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#0F172A] hover:bg-slate-800 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{lang === 'pt' ? 'Imprimir / PDF' : 'Imprimer / PDF'}</span>
              </button>
            </div>
          </div>

          {/* Snapshot Save Bar */}
          <div className="bg-[#0F172A] text-white rounded-2xl border border-slate-800 p-5 space-y-3 no-print">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              <p className="text-xs sm:text-sm text-slate-200">
                <span className="font-mono font-bold text-[#D96B43] mr-2">
                  {lang === 'pt' ? 'REGISTO TEMPORAL:' : 'JALON TEMPOREL :'}
                </span>
                {lang === 'pt'
                  ? 'Guarde a avaliação atual com data e marco para acompanhar a evolução (Before vs. After).'
                  : 'Enregistrez l’évaluation actuelle avec date et jalon pour suivre la progression (Before vs. After).'}
              </p>

              <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0">
                <input
                  type="date"
                  aria-label="Data da avaliação"
                  value={snapshotDate}
                  onChange={(e) => setSnapshotDate(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-[#D96B43]"
                />
                <input
                  type="text"
                  value={snapshotLabel}
                  onChange={(e) => setSnapshotLabel(e.target.value)}
                  placeholder={lang === 'pt' ? 'Ex: Auditoria T1, Pós-5S...' : 'Ex : Audit T1, Post-5S...'}
                  className="w-full sm:w-52 px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs placeholder-slate-400 focus:outline-none focus:border-[#D96B43]"
                />
                <button
                  type="button"
                  onClick={saveSnapshot}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#D96B43] hover:bg-[#B8532D] text-white font-semibold text-xs transition-colors cursor-pointer whitespace-nowrap"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{lang === 'pt' ? 'Guardar' : 'Enregistrer'}</span>
                </button>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-6 items-start">
            {/* Left: 9 Sliders */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200">
                <h3 className="font-semibold text-sm sm:text-base text-slate-950">
                  {lang === 'pt'
                    ? 'Avalie a sua organização em cada princípio (1 = Inicial · 9 = Referência)'
                    : 'Évaluez votre organisation sur chaque principe (1 = Initial · 9 = Référence)'}
                </h3>
                <span className="text-xs font-mono text-slate-500">
                  {lang === 'pt' ? 'Guardado localmente' : 'Sauvegarde locale'}
                </span>
              </div>

              <div className="space-y-3">
                {radarPrinciplesConfig.map((p, idx) => {
                  const val = scores[idx];
                  return (
                    <div key={p.short.pt} className="p-3.5 rounded-xl bg-[#F8F9FA] border border-slate-200">
                      <div className="flex items-center justify-between gap-3 mb-2">
                        <label htmlFor={`slider-p-${idx}`} className="text-xs sm:text-sm font-semibold text-slate-900 cursor-pointer">
                          {p.title[lang]}
                        </label>
                        <span
                          className={`font-mono font-bold text-xs tabular-nums shrink-0 ${
                            val >= 7 ? 'text-[#D96B43]' : 'text-slate-900'
                          }`}
                        >
                          {val} / 9
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[11px] text-slate-400">1</span>
                        <input
                          id={`slider-p-${idx}`}
                          type="range"
                          min={1}
                          max={9}
                          step={1}
                          value={val}
                          onChange={(e) => {
                            const nextVal = parseInt(e.target.value, 10);
                            setScores((prev) => prev.map((v, i) => (i === idx ? nextVal : v)));
                          }}
                          className="opex-slider"
                        />
                        <span className="font-mono text-[11px] text-slate-400">9</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: SVG Radar + Top 3 Levers */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
                <div className="flex flex-wrap items-start justify-between gap-3 pb-4 border-b border-slate-200">
                  <div>
                    <p className="text-xs font-mono uppercase tracking-wider text-slate-500">
                      {lang === 'pt' ? 'Índice Global de Maturidade' : 'Indice Global de Maturité'}
                    </p>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="font-mono font-extrabold text-3xl text-[#D96B43] tabular-nums">{avgStr}</span>
                      <span className="font-mono text-sm font-bold text-slate-700 tabular-nums">/ 9.0</span>
                      <span className="text-xs font-semibold text-slate-700 ml-1">· {maturityLabel}</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1 no-print">
                    <button
                      type="button"
                      aria-pressed={showBaselineOverlay}
                      onClick={() => setShowBaselineOverlay((prev) => !prev)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono font-semibold border transition-colors cursor-pointer ${
                        showBaselineOverlay
                          ? 'bg-[#0F172A] text-white border-[#0F172A]'
                          : 'bg-[#F8F9FA] text-slate-700 border-slate-200'
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{lang === 'pt' ? 'Comparar Inicial' : 'Comparer Initial'}</span>
                    </button>
                    <span className="font-mono text-xs font-semibold text-[#D96B43] tabular-nums">
                      {deltaPts >= 0 ? '+' : ''}
                      {deltaPts.toFixed(1)} pts vs. {lang === 'pt' ? 'Inicial' : 'Initial'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-5 text-xs font-mono">
                  <span className="inline-flex items-center gap-1.5 text-slate-900 font-semibold">
                    <span className="w-3 h-3 rounded-xs bg-[#D96B43]/30 border-2 border-[#D96B43]" />
                    <span>{lang === 'pt' ? 'Atual (After)' : 'Actuel (After)'}</span>
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 text-slate-600 ${
                      showBaselineOverlay ? '' : 'opacity-40'
                    }`}
                  >
                    <span className="w-3 h-3 rounded-xs bg-slate-400/20 border-2 border-dashed border-[#0F172A]" />
                    <span>{lang === 'pt' ? 'Inicial (Before)' : 'Initial (Before)'}</span>
                  </span>
                </div>

                <div className="flex justify-center">
                  <svg
                    viewBox="0 0 360 330"
                    className="w-full max-w-[340px] h-auto overflow-visible"
                    role="img"
                    aria-label="Radar de Maturidade Lean 9 Princípios"
                  >
                    {radarGeometry.gridPolygons.map((pts, i) => (
                      <polygon key={i} points={pts} fill="none" stroke="#CBD5E1" strokeWidth="1" />
                    ))}
                    {radarGeometry.axes.map((ax, i) => (
                      <g key={i}>
                        <line
                          x1={radarGeometry.cx}
                          y1={radarGeometry.cy}
                          x2={ax.xEnd}
                          y2={ax.yEnd}
                          stroke="#CBD5E1"
                          strokeWidth="1"
                        />
                        <text
                          x={ax.lx}
                          y={ax.ly + 3.5}
                          textAnchor={ax.anchor}
                          fill="#0F172A"
                          fontFamily="JetBrains Mono, monospace"
                          fontSize="9.5"
                          fontWeight="700"
                        >
                          {ax.shortLabel}
                        </text>
                      </g>
                    ))}
                    {showBaselineOverlay && baselineSnap && (
                      <polygon
                        points={radarGeometry.baselinePoly}
                        fill="rgba(15, 23, 42, 0.1)"
                        stroke="#0F172A"
                        strokeWidth="1.75"
                        strokeDasharray="4 3"
                      />
                    )}
                    <polygon
                      points={radarGeometry.currentPoly}
                      fill="rgba(217, 107, 67, 0.25)"
                      stroke="#D96B43"
                      strokeWidth="2.5"
                    />
                    {radarGeometry.axes.map((ax, i) => (
                      <circle key={i} cx={ax.vx} cy={ax.vy} r="4" fill="#D96B43" stroke="#FFFFFF" strokeWidth="1.5" />
                    ))}
                  </svg>
                </div>
              </div>

              {/* Priority Plan */}
              <div className="bg-[#0F172A] text-white rounded-2xl border border-slate-800 p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <h3 className="font-display font-bold text-sm uppercase tracking-wider">
                    {lang === 'pt'
                      ? 'Plano de Ação Prioritário (Top 3 Alavancas)'
                      : 'Plan d’Action Prioritaire (Top 3 Leviers)'}
                  </h3>
                  <span className="font-mono text-xs font-bold text-[#D96B43]">GEMBA</span>
                </div>

                <div className="space-y-3">
                  {priorityLevers.map((item, rankIdx) => (
                    <div key={item.idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-xs sm:text-sm text-white">
                          <span className="font-mono text-[#D96B43] mr-1.5">#{rankIdx + 1}</span>
                          {item.cfg.title[lang]}
                        </span>
                        <span className="font-mono text-xs font-bold text-[#D96B43] tabular-nums shrink-0">
                          {item.score} / 9
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">{item.cfg.action[lang]}</p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {item.cfg.tools.map((toolKey) => (
                          <button
                            key={toolKey}
                            type="button"
                            onClick={() => openTool(toolKey)}
                            className="px-2.5 py-1 rounded-md bg-[#0F172A] hover:bg-[#D96B43] text-slate-200 hover:text-white font-mono text-[11px] border border-slate-700 transition-colors cursor-pointer"
                          >
                            {toolKey}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-800 space-y-3 no-print">
                  <p className="text-xs text-slate-300">
                    {lang === 'pt'
                      ? 'Pretende acelerar a implementação na sua empresa? Partilhe este diagnóstico diretamente:'
                      : 'Vous souhaitez accélérer le déploiement ? Partagez ce diagnostic directement :'}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <a
                      href={waRadarHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-lg bg-[#25D366] hover:bg-[#1ebe5d] text-slate-950 font-mono text-xs font-bold transition-colors"
                    >
                      WhatsApp
                    </a>
                    <a
                      href={mailRadarHref}
                      className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs font-semibold border border-slate-700 transition-colors"
                    >
                      {lang === 'pt' ? 'Enviar por E-mail' : 'Envoyer par E-mail'}
                    </a>
                    <button
                      type="button"
                      onClick={() => onNavigate('home', 'diagnostico')}
                      className="px-3.5 py-2 rounded-lg bg-[#D96B43] hover:bg-[#B8532D] text-white font-mono text-xs font-semibold transition-colors cursor-pointer"
                    >
                      {lang === 'pt' ? 'Agendar Diagnóstico' : 'Planifier Diagnostic'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. TEMPORAL EVOLUTION & BEFORE VS AFTER */}
        <section id="evolucao-temporal" className="scroll-mt-24">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-slate-200 pb-4 gap-4">
              <div>
                <p className="text-xs font-mono font-semibold text-[#D96B43] uppercase tracking-wider">
                  {lang === 'pt'
                    ? 'Curva de Progresso & Impacto Mensurável no Gemba'
                    : 'Courbe de Progression & Impact Mesurable sur le Gemba'}
                </p>
                <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-950 mt-1">
                  {lang === 'pt'
                    ? 'Evolução Temporal & Comparação Before vs. After'
                    : 'Évolution Temporelle & Comparaison Before vs. After'}
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-2 no-print">
                <button
                  type="button"
                  onClick={loadDemoHistory}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F8F9FA] hover:bg-slate-100 text-slate-800 border border-slate-200 font-mono text-xs font-semibold transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{lang === 'pt' ? 'Carregar Exemplo (6 Meses)' : 'Charger Exemple (6 Mois)'}</span>
                </button>
                <button
                  type="button"
                  onClick={clearHistory}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-900 hover:text-white text-slate-600 border border-slate-200 font-mono text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{lang === 'pt' ? 'Limpar Histórico' : 'Vider l’Historique'}</span>
                </button>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-[#F8F9FA] border border-slate-200 rounded-xl p-4">
              {lang === 'pt'
                ? 'No Lean, o que não se mede no tempo volta ao estado inicial. Este painel guarda localmente no seu navegador cada marco conquistado após os chantiers (5S, Kanban, SOP, PDCA) para demonstrar objetivamente à direção o ganho acumulado (After vs. Before).'
                : 'En Lean, ce qui n’est pas mesuré dans le temps finit par régresser. Ce tableau de bord enregistre localement dans votre navigateur chaque jalon franchi après vos chantiers terrain (5S, Kanban, SOP, PDCA) pour prouver objectivement les gains obtenus (After vs. Before).'}
            </p>

            {/* 4 KPI Summary Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-[#F8F9FA] border border-slate-200">
                <p className="font-mono text-[11px] uppercase text-slate-500">
                  {lang === 'pt' ? 'Ponto de Partida (Before)' : 'Point de Départ (Before)'}
                </p>
                <p className="font-mono font-extrabold text-2xl text-slate-950 mt-1 tabular-nums">
                  {startAvg.toFixed(1)} <span className="text-xs font-normal text-slate-500">/ 9.0</span>
                </p>
                <p className="font-mono text-[11px] text-slate-500 mt-1 truncate">
                  {baselineSnap ? `${baselineSnap.date} · ${getSnapLabel(baselineSnap)}` : ''}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F8F9FA] border border-slate-200">
                <p className="font-mono text-[11px] uppercase text-slate-500">
                  {lang === 'pt' ? 'Estado Atual (After)' : 'État Actuel (After)'}
                </p>
                <p className="font-mono font-extrabold text-2xl text-[#D96B43] mt-1 tabular-nums">
                  {currentAvg.toFixed(1)} <span className="text-xs font-normal text-slate-500">/ 9.0</span>
                </p>
                <p className="font-mono text-[11px] text-slate-500 mt-1">
                  {lang === 'pt' ? 'Radar em tempo real' : 'Radar en temps réel'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#0F172A] text-white">
                <p className="font-mono text-[11px] uppercase text-slate-300">
                  {lang === 'pt' ? 'Progressão Global (Δ)' : 'Progression Globale (Δ)'}
                </p>
                <p className="font-mono font-extrabold text-2xl text-[#D96B43] mt-1 tabular-nums">
                  {deltaPts >= 0 ? '+' : ''}
                  {deltaPts.toFixed(1)} <span className="text-xs font-normal text-slate-300">pts</span>
                </p>
                <p className="font-mono text-[11px] text-slate-300 mt-1 tabular-nums">
                  {deltaPct >= 0 ? '+' : ''}
                  {deltaPct}% vs. {lang === 'pt' ? 'referência' : 'référence'}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F8F9FA] border border-slate-200">
                <p className="font-mono text-[11px] uppercase text-slate-500">
                  {lang === 'pt' ? 'Marcos Registados' : 'Jalons Enregistrés'}
                </p>
                <p className="font-mono font-extrabold text-2xl text-slate-950 mt-1 tabular-nums">
                  {history.length}{' '}
                  <span className="text-xs font-normal text-slate-500">
                    {lang === 'pt' ? 'auditorias' : 'audits'}
                  </span>
                </p>
                <p className="font-mono text-[11px] font-semibold text-[#D96B43] mt-1">
                  {lang === 'pt' ? 'Meta OpEx: ≥ 7.5 / 9' : 'Cible OpEx : ≥ 7.5 / 9'}
                </p>
              </div>
            </div>

            {/* Line Chart + Snapshot List */}
            <div className="grid lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-7 bg-[#F8F9FA] rounded-xl border border-slate-200 p-5 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-semibold text-xs sm:text-sm uppercase tracking-wider text-slate-950">
                    {lang === 'pt'
                      ? 'Trajetória do Índice Global (1.0 – 9.0)'
                      : 'Trajectoire de l’Indice Global (1.0 – 9.0)'}
                  </h3>
                  <div className="flex items-center gap-4 font-mono text-[11px]">
                    <span className="inline-flex items-center gap-1.5 text-slate-900">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#D96B43]" />
                      <span>{lang === 'pt' ? 'Índice Real' : 'Indice Réel'}</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-slate-600">
                      <span className="w-3 border-t-2 border-dashed border-[#0F172A]" />
                      <span>{lang === 'pt' ? 'Alvo (7.5)' : 'Cible (7.5)'}</span>
                    </span>
                  </div>
                </div>

                {activePointBanner && (
                  <div className="px-3 py-2 rounded-lg bg-[#0F172A] text-white font-mono text-xs flex items-center justify-between gap-2">
                    <span>{activePointBanner.title}</span>
                    <span className="text-[#D96B43] font-bold tabular-nums">{activePointBanner.score}</span>
                  </div>
                )}

                <div className="overflow-x-auto">
                  <svg
                    viewBox={`0 0 ${evolutionGeometry.w} ${evolutionGeometry.h}`}
                    className="w-full min-w-[440px] h-auto"
                    role="img"
                    aria-label="Gráfico de Evolução Temporal OpEx Lean"
                  >
                    {evolutionGeometry.gridLevels.map((g) => (
                      <g key={g.val}>
                        <line
                          x1={evolutionGeometry.padL}
                          y1={g.y}
                          x2={evolutionGeometry.w - evolutionGeometry.padR}
                          y2={g.y}
                          stroke={g.isTarget ? '#0F172A' : '#CBD5E1'}
                          strokeWidth={g.isTarget ? '1.5' : '1'}
                          strokeDasharray={g.isTarget ? '5 4' : undefined}
                        />
                        <text
                          x={evolutionGeometry.padL - 8}
                          y={g.y + 3.5}
                          textAnchor="end"
                          fontFamily="JetBrains Mono, monospace"
                          fontSize="10"
                          fontWeight={g.isTarget ? '700' : '500'}
                          fill={g.isTarget ? '#0F172A' : '#64748B'}
                        >
                          {g.val.toFixed(1)}
                        </text>
                      </g>
                    ))}

                    {evolutionGeometry.areaPath && (
                      <path d={evolutionGeometry.areaPath} fill="rgba(217, 107, 67, 0.14)" />
                    )}
                    {evolutionGeometry.points.length > 1 && (
                      <polyline
                        points={evolutionGeometry.polyline}
                        fill="none"
                        stroke="#D96B43"
                        strokeWidth="2.75"
                      />
                    )}
                    {evolutionGeometry.points.map((pt) => (
                      <g
                        key={pt.snap.id}
                        onClick={() => loadSnapshotIntoRadar(pt.idx)}
                        className="cursor-pointer"
                      >
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r="5.5"
                          fill={pt.idx === safeBaselineIdx ? '#0F172A' : '#D96B43'}
                          stroke="#FFFFFF"
                          strokeWidth="2"
                        />
                        <text
                          x={pt.x}
                          y={pt.y - 10}
                          textAnchor="middle"
                          fontFamily="JetBrains Mono, monospace"
                          fontSize="11"
                          fontWeight="700"
                          fill="#0F172A"
                        >
                          {pt.avg.toFixed(1)}
                        </text>
                        <text
                          x={pt.x}
                          y={evolutionGeometry.h - 22}
                          textAnchor="middle"
                          fontFamily="JetBrains Mono, monospace"
                          fontSize="9.5"
                          fill="#475569"
                        >
                          {pt.snap.date.slice(5)}
                        </text>
                        <text
                          x={pt.x}
                          y={evolutionGeometry.h - 9}
                          textAnchor="middle"
                          fontFamily="Public Sans, sans-serif"
                          fontSize="9"
                          fontWeight="600"
                          fill="#475569"
                        >
                          {getSnapLabel(pt.snap).slice(0, 14)}
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#F8F9FA] rounded-xl border border-slate-200 p-5 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <h3 className="font-semibold text-xs sm:text-sm uppercase tracking-wider text-slate-950">
                    {lang === 'pt' ? 'Histórico de Avaliações' : 'Historique des Évaluations'}
                  </h3>
                  <span className="font-mono text-[11px] text-slate-500">
                    {lang === 'pt' ? 'Clique para carregar' : 'Cliquer pour charger'}
                  </span>
                </div>

                <div className="space-y-2 max-h-[290px] overflow-y-auto pr-1">
                  {history.map((snap, idx) => {
                    const avg = calcAvg(snap.scores).toFixed(1);
                    const isBaseline = idx === safeBaselineIdx;
                    return (
                      <div
                        key={snap.id}
                        onClick={() => loadSnapshotIntoRadar(idx)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            loadSnapshotIntoRadar(idx);
                          }
                        }}
                        className={`p-3 rounded-lg border flex items-center justify-between gap-2 cursor-pointer transition-colors ${
                          isBaseline
                            ? 'bg-[#0F172A] text-white border-[#0F172A]'
                            : 'bg-white hover:bg-slate-50 text-slate-900 border-slate-200'
                        }`}
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 font-mono text-[11px]">
                            <span className={isBaseline ? 'text-[#D96B43]' : 'text-slate-500'}>{snap.date}</span>
                            {isBaseline && (
                              <span className="text-[#D96B43] font-bold">· BEFORE</span>
                            )}
                          </div>
                          <p className="text-xs font-semibold truncate mt-0.5">{getSnapLabel(snap)}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="font-mono text-xs font-bold text-[#D96B43] tabular-nums">{avg}</span>
                          <button
                            type="button"
                            aria-label="Eliminar marco"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteSnapshot(idx);
                            }}
                            className={`p-1 rounded transition-colors cursor-pointer ${
                              isBaseline
                                ? 'text-slate-400 hover:text-white hover:bg-slate-800'
                                : 'text-slate-400 hover:text-red-600 hover:bg-red-50'
                            }`}
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Detailed Before vs After across all 9 principles */}
            <div className="border-t border-slate-200 pt-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="font-display font-bold text-base text-slate-950">
                    {lang === 'pt'
                      ? 'Comparação Detalhada por Princípio: Inicial (Before) vs. Atual (After)'
                      : 'Comparaison Détaillée par Principe : Initial (Before) vs. Actuel (After)'}
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {lang === 'pt'
                      ? 'Visualize os ganhos concretos alcançados em cada um dos 9 princípios.'
                      : 'Visualisez les gains concrets réalisés sur chacun des 9 principes.'}
                  </p>
                </div>

                <div className="flex items-center gap-2 no-print">
                  <label htmlFor="baseline-selector" className="font-mono text-xs font-semibold text-slate-700">
                    {lang === 'pt' ? 'Comparar com:' : 'Comparer avec :'}
                  </label>
                  <select
                    id="baseline-selector"
                    value={safeBaselineIdx}
                    onChange={(e) => setSelectedBaselineIdx(parseInt(e.target.value, 10))}
                    className="px-3 py-1.5 rounded-lg bg-[#F8F9FA] border border-slate-200 font-mono text-xs font-semibold text-slate-900 focus:outline-none focus:border-[#D96B43]"
                  >
                    {history.map((snap, i) => (
                      <option key={snap.id} value={i}>
                        {snap.date} — {getSnapLabel(snap)} ({calcAvg(snap.scores).toFixed(1)})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {radarPrinciplesConfig.map((cfg, idx) => {
                  const beforeVal = baselineSnap ? baselineSnap.scores[idx] : scores[idx];
                  const afterVal = scores[idx];
                  const diff = afterVal - beforeVal;
                  const diffStr = diff > 0 ? `+${diff}` : `${diff}`;
                  return (
                    <div key={cfg.short.pt} className="p-4 rounded-xl bg-[#F8F9FA] border border-slate-200 space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-semibold text-slate-900 truncate">{cfg.title[lang]}</span>
                        <span
                          className={`font-mono text-xs font-bold tabular-nums shrink-0 ${
                            diff > 0 ? 'text-[#D96B43]' : diff < 0 ? 'text-red-600' : 'text-slate-600'
                          }`}
                        >
                          {diffStr}
                        </span>
                      </div>
                      <div className="space-y-1.5 font-mono text-[10px]">
                        <div className="flex items-center gap-2">
                          <span className="w-12 text-slate-500">BEFORE</span>
                          <div className="flex-1 h-2 bg-slate-200 rounded-xs overflow-hidden">
                            <div className="h-full bg-[#0F172A]" style={{ width: `${(beforeVal / 9) * 100}%` }} />
                          </div>
                          <span className="w-6 text-right font-bold text-slate-800 tabular-nums">{beforeVal}/9</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-12 text-[#D96B43] font-bold">AFTER</span>
                          <div className="flex-1 h-2 bg-slate-200 rounded-xs overflow-hidden">
                            <div className="h-full bg-[#D96B43]" style={{ width: `${(afterVal / 9) * 100}%` }} />
                          </div>
                          <span className="w-6 text-right font-bold text-slate-950 tabular-nums">{afterVal}/9</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Technical Tool Drawer / Modal */}
      {drawerTool && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="drawer-tool-title"
          onClick={() => setDrawerTool(null)}
          className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-xl rounded-2xl border border-slate-200 shadow-2xl overflow-hidden"
          >
            <div className="bg-[#0F172A] text-white px-6 py-5 flex items-start justify-between gap-4 border-b border-slate-800">
              <div>
                <p className="font-mono text-xs text-[#D96B43] font-semibold uppercase tracking-wider">
                  {drawerTool.principleTag[lang]}
                </p>
                <h3 id="drawer-tool-title" className="font-display font-extrabold text-xl text-white mt-1">
                  {drawerTool.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setDrawerTool(null)}
                aria-label="Fechar"
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-sm text-slate-600">
              <div className="p-4 rounded-xl bg-[#F8F9FA] border border-slate-200">
                <p className="font-mono text-xs font-bold text-slate-950 uppercase mb-1">
                  {lang === 'pt' ? 'O que é' : 'Qu’est-ce que c’est'}
                </p>
                <p className="leading-relaxed">{drawerTool.content[lang].what}</p>
              </div>
              <div className="p-4 rounded-xl bg-[#F8F9FA] border border-slate-200">
                <p className="font-mono text-xs font-bold text-slate-950 uppercase mb-1">
                  {lang === 'pt' ? 'Quando aplicar' : 'Quand l’appliquer'}
                </p>
                <p className="leading-relaxed">{drawerTool.content[lang].when}</p>
              </div>
              <div className="p-4 rounded-xl bg-[#0F172A] text-white">
                <p className="font-mono text-xs font-bold text-[#D96B43] uppercase mb-1">
                  {lang === 'pt' ? 'Exemplo & Impacto no Gemba' : 'Exemple & Impact sur le Gemba'}
                </p>
                <p className="text-slate-200 leading-relaxed">{drawerTool.content[lang].impact}</p>
              </div>
            </div>

            <div className="bg-[#F8F9FA] px-6 py-3.5 border-t border-slate-200 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setDrawerTool(null);
                  onNavigate('home', 'diagnostico');
                }}
                className="text-xs font-semibold text-[#D96B43] hover:underline cursor-pointer"
              >
                {lang === 'pt' ? 'Implementar no terreno →' : 'Déployer sur le terrain →'}
              </button>
              <button
                type="button"
                onClick={() => setDrawerTool(null)}
                className="px-4 py-2 rounded-lg bg-[#0F172A] hover:bg-slate-800 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                {lang === 'pt' ? 'Fechar' : 'Fermer'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
