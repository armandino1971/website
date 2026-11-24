/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { AppView, Language } from './types';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { Footer } from './components/Footer';
import { CookieBanner } from './components/CookieBanner';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ErrorBoundary } from './components/ErrorBoundary';

const PrinciplesView = lazy(() =>
  import('./components/PrinciplesView').then((m) => ({ default: m.PrinciplesView }))
);
const PrivacyView = lazy(() =>
  import('./components/PrivacyView').then((m) => ({ default: m.PrivacyView }))
);

const LANG_STORAGE_KEY = 'opex_lean_lang_v3';
const COOKIE_STORAGE_KEY = 'opex_cookie_consent';

function getInitialLanguage(): Language {
  try {
    const params = new URLSearchParams(window.location.search);
    const urlLang = (params.get('lang') || '').toLowerCase();
    if (urlLang === 'fr' || urlLang === 'fr-fr') return 'fr';
    if (urlLang === 'pt' || urlLang === 'pt-pt') return 'pt';
    const stored = localStorage.getItem(LANG_STORAGE_KEY);
    if (stored === 'fr') return 'fr';
  } catch {
    // ignore storage errors
  }
  return 'pt';
}

function getInitialView(): AppView {
  try {
    const params = new URLSearchParams(window.location.search);
    const v = (params.get('view') || '').toLowerCase();
    if (v === 'principles' || v === 'autodiagnostico' || v === '9-principios') return 'principles';
    if (v === 'privacy' || v === 'privacidade') return 'privacy';
  } catch {
    // ignore URL errors
  }
  return 'home';
}

function buildUrl(view: AppView, lang: Language, sectionId?: string): string {
  const basePath = window.location.pathname || '/';
  const query = new URLSearchParams();
  if (view !== 'home') query.set('view', view);
  if (lang === 'fr') query.set('lang', 'fr');
  const qs = query.toString();
  const hash = sectionId ? `#${sectionId}` : '';
  return `${basePath}${qs ? `?${qs}` : ''}${hash}`;
}

function setMetaContent(selector: string, content: string, attr: 'content' | 'href' = 'content') {
  const el = document.querySelector(selector);
  if (el) el.setAttribute(attr, content);
}

function scrollToSectionStart(sectionId: string) {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const el = document.getElementById(sectionId);
      if (!el) return;
      const headerHeight = document.querySelector('header')?.getBoundingClientRect().height ?? 65;
      const targetTop = el.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({
        top: Math.max(0, Math.round(targetTop)),
        behavior: 'smooth',
      });
    });
  });
}

export default function App() {
  const [lang, setLang] = useState<Language>(getInitialLanguage);
  const [activeView, setActiveView] = useState<AppView>(getInitialView);
  const [prefillDiagnosticNotes, setPrefillDiagnosticNotes] = useState<string | null>(null);
  const pendingSectionRef = useRef<string | null>(null);
  const [showCookieBanner, setShowCookieBanner] = useState<boolean>(() => {
    try {
      return !localStorage.getItem(COOKIE_STORAGE_KEY);
    } catch {
      return true;
    }
  });

  useEffect(() => {
    document.documentElement.lang = lang === 'fr' ? 'fr-FR' : 'pt-PT';
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch {
      // ignore
    }

    let pageTitle =
      lang === 'fr'
        ? 'OpEx Lean | Conseil Lean Management, Rentabilité & Équipes'
        : 'OpEx Lean | Consultoria Lean, Rentabilidade & Equipas';
    let pageDesc =
      lang === 'fr'
        ? 'Cabinet conseil en Lean Management, excellence opérationnelle, rentabilité et management d’équipe pour dirigeants et directeurs industriels en France/Portugal.'
        : 'Consultoria em Lean Management, melhoria de resultados, rentabilidade EBITDA e gestão de equipas para diretores industriais em Portugal e França em 90 dias.';

    if (activeView === 'principles') {
      pageTitle =
        lang === 'fr'
          ? 'OpEx Lean | Autodiagnostic Lean & Radar de Maturité 1–9'
          : 'OpEx Lean | Autodiagnóstico Lean & Radar de Maturidade 1–9';
      pageDesc =
        lang === 'fr'
          ? 'Évaluez la maturité Lean et l’excellence opérationnelle de votre usine sur 9 piliers (Radar 1–9) et identifiez vos leviers de rentabilité prioritaires.'
          : 'Avalie a maturidade Lean e a excelência operacional da sua fábrica em 9 princípios (Radar 1–9) e identifique alavancas prioritárias de rentabilidade.';
    } else if (activeView === 'privacy') {
      pageTitle =
        lang === 'fr'
          ? 'OpEx Lean | Politique de Confidentialité & Mentions RGPD'
          : 'OpEx Lean | Política de Privacidade & Menções Legais';
      pageDesc =
        lang === 'fr'
          ? 'Politique de confidentialité, protection des données RGPD et mentions légales d’OpEx Lean (Portugal et France).'
          : 'Política de privacidade, proteção de dados RGPD e menções legais da OpEx Lean (Portugal e França).';
    }

    document.title = pageTitle;
    setMetaContent('meta[name="description"]', pageDesc);
    setMetaContent('#og-title', pageTitle);
    setMetaContent('#og-description', pageDesc);
    setMetaContent('#twitter-title', pageTitle);
    setMetaContent('#twitter-description', pageDesc);
    setMetaContent('#og-locale', lang === 'fr' ? 'fr_FR' : 'pt_PT');

    try {
      const origin = window.location.origin;
      const resolvedUrl = `${origin}${buildUrl(activeView, lang)}`;
      const ptUrl = `${origin}${buildUrl(activeView, 'pt')}`;
      const frUrl = `${origin}${buildUrl(activeView, 'fr')}`;
      setMetaContent('#canonical-link', resolvedUrl, 'href');
      setMetaContent('#hreflang-pt', ptUrl, 'href');
      setMetaContent('#hreflang-fr', frUrl, 'href');
      setMetaContent('#hreflang-default', ptUrl, 'href');
      setMetaContent('#og-url', resolvedUrl);
      const socialImg = `${origin}/src/assets/images/hero_gemba_factory_1795511926506.jpg`;
      setMetaContent('#og-image', socialImg);
      setMetaContent('#twitter-image', socialImg);
    } catch {
      // ignore location errors
    }
  }, [lang, activeView]);

  // Listen for browser Back/Forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setActiveView(getInitialView());
      setLang(getInitialLanguage());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Handle initial URL hash navigation on first load
  useEffect(() => {
    const initialHash = window.location.hash.replace(/^#/, '');
    if (initialHash) {
      pendingSectionRef.current = initialHash;
    }
  }, []);

  // Scroll to deferred anchor once target view mounts
  useEffect(() => {
    const targetId = pendingSectionRef.current;
    if (!targetId) return;

    let attempts = 0;
    const tryScroll = () => {
      const el = document.getElementById(targetId);
      if (el) {
        pendingSectionRef.current = null;
        scrollToSectionStart(targetId);
      } else if (attempts < 15) {
        attempts += 1;
        window.setTimeout(tryScroll, 50);
      } else {
        pendingSectionRef.current = null;
      }
    };

    const timer = window.setTimeout(tryScroll, 30);
    return () => window.clearTimeout(timer);
  }, [activeView]);

  const handleChangeLang = useCallback(
    (nextLang: Language) => {
      setLang(nextLang);
      try {
        const nextUrl = buildUrl(activeView, nextLang);
        window.history.pushState({ view: activeView, lang: nextLang }, '', nextUrl);
      } catch {
        // ignore history errors
      }
    },
    [activeView]
  );

  const handleNavigate = useCallback(
    (view: AppView, sectionId?: string, prefillNotes?: string) => {
      if (prefillNotes) {
        setPrefillDiagnosticNotes(prefillNotes);
      }

      try {
        const nextUrl = buildUrl(view, lang, sectionId);
        if (window.location.pathname + window.location.search + window.location.hash !== nextUrl) {
          window.history.pushState({ view, lang }, '', nextUrl);
        }
      } catch {
        // ignore history errors
      }

      if (view === activeView) {
        if (sectionId) {
          scrollToSectionStart(sectionId);
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
      }

      pendingSectionRef.current = sectionId ?? null;
      setActiveView(view);
      if (!sectionId) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    [activeView, lang]
  );

  const handleCookieChoice = (choice: 'essential' | 'all') => {
    try {
      localStorage.setItem(COOKIE_STORAGE_KEY, choice);
    } catch {
      // ignore
    }
    setShowCookieBanner(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-slate-900">
      <Navbar
        lang={lang}
        activeView={activeView}
        onChangeLang={handleChangeLang}
        onNavigate={handleNavigate}
      />

      <main className="flex-1">
        {activeView === 'home' && (
          <HomeView
            lang={lang}
            onNavigate={handleNavigate}
            prefillNotes={prefillDiagnosticNotes}
            onConsumedPrefill={() => setPrefillDiagnosticNotes(null)}
          />
        )}
        {activeView !== 'home' && (
          <ErrorBoundary lang={lang} onReset={() => handleNavigate('home')}>
            <Suspense
              fallback={
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                  <p className="text-sm font-mono text-slate-500">
                    {lang === 'fr' ? 'Chargement...' : 'A carregar...'}
                  </p>
                </div>
              }
            >
              {activeView === 'principles' && (
                <PrinciplesView lang={lang} onNavigate={handleNavigate} />
              )}
              {activeView === 'privacy' && (
                <PrivacyView lang={lang} onNavigate={(view) => handleNavigate(view)} />
              )}
            </Suspense>
          </ErrorBoundary>
        )}
      </main>

      <Footer
        lang={lang}
        onChangeLang={handleChangeLang}
        onNavigate={handleNavigate}
        onOpenCookieBanner={() => setShowCookieBanner(true)}
      />

      <CookieBanner
        visible={showCookieBanner}
        lang={lang}
        onChoice={handleCookieChoice}
        onNavigate={(view) => handleNavigate(view)}
      />

      <FloatingWhatsApp lang={lang} cookieBannerVisible={showCookieBanner} />
    </div>
  );
}
