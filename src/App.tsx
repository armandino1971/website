/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { AppView, Language } from './types';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { PrinciplesView } from './components/PrinciplesView';
import { PrivacyView } from './components/PrivacyView';
import { Footer } from './components/Footer';
import { CookieBanner } from './components/CookieBanner';

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

export default function App() {
  const [lang, setLang] = useState<Language>(getInitialLanguage);
  const [activeView, setActiveView] = useState<AppView>('home');
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

    if (activeView === 'principles') {
      document.title =
        lang === 'fr'
          ? 'OpEx Lean | 9 Principes Lean & Radar de Maturité 1–9'
          : 'OpEx Lean | 9 Princípios Lean & Radar de Maturidade 1–9';
    } else if (activeView === 'privacy') {
      document.title = 'Política de Privacidade & Menções Legais | OpEx Lean';
    } else {
      document.title =
        lang === 'fr'
          ? 'OpEx Lean | Cabinet Conseil Excellence Opérationnelle & Lean Manufacturing'
          : 'OpEx Lean | Consultoria Lean Manufacturing & Excelência Operacional';
    }
  }, [lang, activeView]);

  const handleNavigate = (view: AppView, sectionId?: string) => {
    setActiveView(view);
    if (sectionId) {
      window.setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

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
      <Navbar lang={lang} activeView={activeView} onNavigate={handleNavigate} />

      <div className="flex-1">
        {activeView === 'home' && (
          <HomeView lang={lang} onChangeLang={setLang} onNavigate={handleNavigate} />
        )}
        {activeView === 'principles' && (
          <PrinciplesView lang={lang} onChangeLang={setLang} onNavigate={handleNavigate} />
        )}
        {activeView === 'privacy' && (
          <PrivacyView lang={lang} onNavigate={(view) => handleNavigate(view)} />
        )}
      </div>

      <Footer
        lang={lang}
        onChangeLang={setLang}
        onNavigate={handleNavigate}
        onOpenCookieBanner={() => setShowCookieBanner(true)}
      />

      <CookieBanner
        visible={showCookieBanner}
        lang={lang}
        onChoice={handleCookieChoice}
        onNavigate={(view) => handleNavigate(view)}
      />
    </div>
  );
}
