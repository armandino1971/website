import { Lock } from 'lucide-react';
import { AppView, Language } from '../types';
import { homeCopy } from '../data/homeData';

interface CookieBannerProps {
  visible: boolean;
  lang: Language;
  onChoice: (choice: 'essential' | 'all') => void;
  onNavigate: (view: AppView) => void;
}

export function CookieBanner({ visible, lang, onChoice, onNavigate }: CookieBannerProps) {
  if (!visible) return null;
  const ck = homeCopy[lang].cookie;

  return (
    <div
      role="region"
      aria-label={ck.title}
      className="fixed bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-md z-50 bg-[#0F172A] text-white border border-slate-700 rounded-xl p-5 shadow-2xl space-y-4 no-print"
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-slate-800 text-[#D96B43] flex items-center justify-center shrink-0 mt-0.5">
          <Lock className="w-4 h-4" />
        </div>
        <div className="space-y-1">
          <h4 className="font-display font-bold text-sm text-white">{ck.title}</h4>
          <p className="text-xs text-slate-300 leading-relaxed">{ck.desc}</p>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 pt-1">
        <button
          type="button"
          onClick={() => onNavigate('privacy')}
          className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
        >
          {ck.more}
        </button>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onChoice('essential')}
            className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-600 transition-colors cursor-pointer whitespace-nowrap"
          >
            {ck.reject}
          </button>
          <button
            type="button"
            onClick={() => onChoice('all')}
            className="px-4 py-2 rounded-lg bg-[#D96B43] hover:bg-[#B8532D] text-white text-xs font-bold transition-colors cursor-pointer whitespace-nowrap"
          >
            {ck.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
