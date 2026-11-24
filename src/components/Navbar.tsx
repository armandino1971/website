import { MouseEvent, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AppView, Language } from '../types';
import { homeCopy } from '../data/homeData';

interface NavbarProps {
  lang: Language;
  activeView: AppView;
  onChangeLang: (lang: Language) => void;
  onNavigate: (view: AppView, sectionId?: string) => void;
}

export function Navbar({ lang, activeView, onChangeLang, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = homeCopy[lang].nav;

  const getHref = (view: AppView, sectionId?: string) => {
    const query = new URLSearchParams();
    if (view !== 'home') query.set('view', view);
    if (lang === 'fr') query.set('lang', 'fr');
    const qs = query.toString();
    const hash = sectionId ? `#${sectionId}` : '';
    return `/${qs ? `?${qs}` : ''}${hash || (view === 'home' ? '#top' : '')}`;
  };

  const handleLink = (e: MouseEvent<HTMLAnchorElement>, view: AppView, sectionId?: string) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    setMobileOpen(false);
    onNavigate(view, sectionId);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-6 xl:px-8">
        <div className="h-16 flex items-center justify-between gap-2 lg:gap-4 xl:gap-6">
          {/* Zone 1: Brand wordmark (single line, no descriptor/badge clutter) */}
          <a
            href={getHref('home')}
            onClick={(e) => handleLink(e, 'home')}
            className="flex items-center gap-2 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D96B43]"
          >
            <picture>
              <source srcSet="/assets/aistudio/logo-opex-lean_d2b62a02.webp" type="image/webp" />
              <img
                src="/assets/aistudio/logo-opex-lean_d2b62a02.png"
                alt="OpEx Lean"
                width={48}
                height={48}
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-10 h-10 lg:w-11 lg:h-11 xl:w-12 xl:h-12 rounded-md object-contain"
              />
            </picture>
            <span className="font-display font-extrabold text-sm lg:text-base xl:text-lg tracking-tight text-slate-950 whitespace-nowrap shrink-0">
              OpEx <span className="text-[#D96B43]">Lean</span>
            </span>
          </a>

          {/* Zone 2: 6 concise single-line anchor links pointing to the start of each block */}
          <nav
            aria-label={lang === 'fr' ? 'Navigation principale' : 'Navegação principal'}
            className="hidden lg:flex items-center gap-4 xl:gap-5 text-[13px] xl:text-sm font-medium text-slate-600 min-w-0"
          >
            <a
              href={getHref('home', 'abordagem')}
              onClick={(e) => handleLink(e, 'home', 'abordagem')}
              className="hover:text-slate-950 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {t.approach}
            </a>
            <a
              href={getHref('home', 'metodologia')}
              onClick={(e) => handleLink(e, 'home', 'metodologia')}
              className="hover:text-slate-950 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {t.methodology}
            </a>
            <a
              href={getHref('home', 'fundador')}
              onClick={(e) => handleLink(e, 'home', 'fundador')}
              className="hover:text-slate-950 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {t.experience}
            </a>
            <a
              href={getHref('principles')}
              onClick={(e) => handleLink(e, 'principles')}
              className={`hover:text-slate-950 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 ${
                activeView === 'principles' ? 'text-[#D96B43] font-semibold underline' : ''
              }`}
            >
              {t.principles}
            </a>
            <a
              href={getHref('home', 'simulador')}
              onClick={(e) => handleLink(e, 'home', 'simulador')}
              className="hover:text-slate-950 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {t.roi}
            </a>
            <a
              href={getHref('home', 'ferramentas')}
              onClick={(e) => handleLink(e, 'home', 'ferramentas')}
              className="hover:text-slate-950 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              {t.tools}
            </a>
          </nav>

          {/* Zone 3: Language Switcher + 1 primary CTA link + mobile menu trigger */}
          <div className="flex items-center gap-2 lg:gap-3 shrink-0">
            <div
              className="inline-flex items-center p-1 rounded-lg bg-slate-100 border border-slate-200 shrink-0"
              role="group"
              aria-label={lang === 'fr' ? 'Sélecteur de langue' : 'Seletor de idioma'}
            >
              <button
                type="button"
                onClick={() => onChangeLang('pt')}
                aria-pressed={lang === 'pt'}
                className={`px-2 lg:px-2.5 py-1 text-[11px] lg:text-xs font-mono font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  lang === 'pt'
                    ? 'bg-white text-slate-950 shadow-xs'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                PT-PT
              </button>
              <button
                type="button"
                onClick={() => onChangeLang('fr')}
                aria-pressed={lang === 'fr'}
                className={`px-2 lg:px-2.5 py-1 text-[11px] lg:text-xs font-mono font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  lang === 'fr'
                    ? 'bg-white text-slate-950 shadow-xs'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                FR
              </button>
            </div>

            <a
              href={getHref('home', 'diagnostico')}
              onClick={(e) => handleLink(e, 'home', 'diagnostico')}
              className="hidden sm:inline-flex items-center justify-center px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg bg-[#D96B43] hover:bg-[#B8532D] text-white text-xs lg:text-sm font-semibold transition-colors whitespace-nowrap shrink-0"
            >
              {t.cta}
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={
                mobileOpen
                  ? lang === 'fr'
                    ? 'Fermer le menu'
                    : 'Fechar menu'
                  : lang === 'fr'
                  ? 'Ouvrir le menu'
                  : 'Abrir menu'
              }
              aria-expanded={mobileOpen}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2">
          <a
            href={getHref('home', 'abordagem')}
            onClick={(e) => handleLink(e, 'home', 'abordagem')}
            className="block w-full text-left py-2.5 text-sm font-medium text-slate-700 hover:text-slate-950"
          >
            {t.approach}
          </a>
          <a
            href={getHref('home', 'metodologia')}
            onClick={(e) => handleLink(e, 'home', 'metodologia')}
            className="block w-full text-left py-2.5 text-sm font-medium text-slate-700 hover:text-slate-950"
          >
            {t.methodology}
          </a>
          <a
            href={getHref('home', 'fundador')}
            onClick={(e) => handleLink(e, 'home', 'fundador')}
            className="block w-full text-left py-2.5 text-sm font-medium text-slate-700 hover:text-slate-950"
          >
            {t.experience}
          </a>
          <a
            href={getHref('principles')}
            onClick={(e) => handleLink(e, 'principles')}
            className={`block w-full text-left py-2.5 text-sm font-semibold ${
              activeView === 'principles' ? 'text-[#D96B43]' : 'text-slate-900'
            }`}
          >
            {t.principles}
          </a>
          <a
            href={getHref('home', 'simulador')}
            onClick={(e) => handleLink(e, 'home', 'simulador')}
            className="block w-full text-left py-2.5 text-sm font-medium text-slate-700 hover:text-slate-950"
          >
            {t.roi}
          </a>
          <a
            href={getHref('home', 'ferramentas')}
            onClick={(e) => handleLink(e, 'home', 'ferramentas')}
            className="block w-full text-left py-2.5 text-sm font-medium text-slate-700 hover:text-slate-950"
          >
            {t.tools}
          </a>
          <a
            href={getHref('home', 'diagnostico')}
            onClick={(e) => handleLink(e, 'home', 'diagnostico')}
            className="mt-2 block w-full text-center py-3 px-4 rounded-lg bg-[#D96B43] hover:bg-[#B8532D] text-white text-sm font-semibold"
          >
            {t.cta}
          </a>
        </div>
      )}
    </header>
  );
}
