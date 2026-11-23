import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AppView, Language } from '../types';
import { homeCopy } from '../data/homeData';

interface NavbarProps {
  lang: Language;
  activeView: AppView;
  onNavigate: (view: AppView, sectionId?: string) => void;
}

export function Navbar({ lang, activeView, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = homeCopy[lang].nav;

  const handleLink = (view: AppView, sectionId?: string) => {
    setMobileOpen(false);
    onNavigate(view, sectionId);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Brand wordmark (single line, no descriptor/badge clutter) */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              handleLink('home');
            }}
            className="flex items-center gap-2.5 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D96B43]"
          >
            <img
              src="/assets/aistudio/logo-opex-lean_d2b62a02.png"
              alt="OpEx Lean"
              width={32}
              height={32}
              referrerPolicy="no-referrer"
              className="w-8 h-8 rounded-md object-cover bg-slate-950"
            />
            <span className="font-display font-extrabold text-lg tracking-tight text-slate-950 whitespace-nowrap shrink-0">
              OpEx <span className="text-[#D96B43]">Lean</span>
            </span>
          </a>

          {/* Zone 2: 5 concise single-line text nav links */}
          <nav aria-label="Navegação principal" className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              type="button"
              onClick={() => handleLink('home', 'abordagem')}
              className="hover:text-slate-950 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {t.approach}
            </button>
            <button
              type="button"
              onClick={() => handleLink('home', 'metodologia')}
              className="hover:text-slate-950 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {t.methodology}
            </button>
            <button
              type="button"
              onClick={() => handleLink('principles')}
              className={`hover:text-slate-950 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeView === 'principles' ? 'text-[#D96B43] font-semibold underline' : ''
              }`}
            >
              {t.principles}
            </button>
            <button
              type="button"
              onClick={() => handleLink('home', 'simulador')}
              className="hover:text-slate-950 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {t.roi}
            </button>
            <button
              type="button"
              onClick={() => handleLink('home', 'ferramentas')}
              className="hover:text-slate-950 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {t.tools}
            </button>
          </nav>

          {/* Zone 3: 1 primary CTA button + mobile menu trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => handleLink('home', 'diagnostico')}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-lg bg-[#D96B43] hover:bg-[#B8532D] text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {t.cta}
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
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
          <button
            type="button"
            onClick={() => handleLink('home', 'abordagem')}
            className="block w-full text-left py-2.5 text-sm font-medium text-slate-700 hover:text-slate-950"
          >
            {t.approach}
          </button>
          <button
            type="button"
            onClick={() => handleLink('home', 'metodologia')}
            className="block w-full text-left py-2.5 text-sm font-medium text-slate-700 hover:text-slate-950"
          >
            {t.methodology}
          </button>
          <button
            type="button"
            onClick={() => handleLink('principles')}
            className={`block w-full text-left py-2.5 text-sm font-semibold ${
              activeView === 'principles' ? 'text-[#D96B43]' : 'text-slate-900'
            }`}
          >
            {t.principles}
          </button>
          <button
            type="button"
            onClick={() => handleLink('home', 'simulador')}
            className="block w-full text-left py-2.5 text-sm font-medium text-slate-700 hover:text-slate-950"
          >
            {t.roi}
          </button>
          <button
            type="button"
            onClick={() => handleLink('home', 'ferramentas')}
            className="block w-full text-left py-2.5 text-sm font-medium text-slate-700 hover:text-slate-950"
          >
            {t.tools}
          </button>
          <button
            type="button"
            onClick={() => handleLink('home', 'diagnostico')}
            className="mt-2 block w-full text-center py-3 px-4 rounded-lg bg-[#D96B43] hover:bg-[#B8532D] text-white text-sm font-semibold"
          >
            {t.cta}
          </button>
        </div>
      )}
    </header>
  );
}
