import { AppView, Language } from '../types';
import { CONTACT_EMAIL, homeCopy, LINKEDIN_URL, WHATSAPP_NUMBER } from '../data/homeData';

interface FooterProps {
  lang: Language;
  onChangeLang: (lang: Language) => void;
  onNavigate: (view: AppView, sectionId?: string) => void;
  onOpenCookieBanner: () => void;
}

export function Footer({ lang, onChangeLang, onNavigate, onOpenCookieBanner }: FooterProps) {
  const f = homeCopy[lang].footer;
  const nav = homeCopy[lang].nav;
  const waMessage =
    lang === 'fr'
      ? 'Bonjour Armandino, je souhaite échanger sur l’Excellence Opérationnelle et le Lean dans mon entreprise.'
      : 'Olá Armandino, gostaria de falar sobre Excelência Operacional e Lean na minha empresa.';
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage)}`;

  return (
    <footer className="bg-[#0F172A] text-slate-300 border-t border-slate-800 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <img
                src="/assets/aistudio/logo-opex-lean_d2b62a02.png"
                alt="OpEx Lean"
                width={36}
                height={36}
                referrerPolicy="no-referrer"
                className="w-9 h-9 rounded-md object-contain"
              />
              <span className="font-display font-extrabold text-xl text-white">
                OpEx <span className="text-[#D96B43]">Lean</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">{f.desc}</p>
            <div className="inline-flex items-center p-1 rounded-lg bg-slate-900 border border-slate-700" role="group" aria-label="Language switcher">
              <button
                type="button"
                onClick={() => onChangeLang('pt')}
                className={`px-3 py-1.5 text-xs font-mono font-semibold rounded-md transition-colors cursor-pointer ${
                  lang === 'pt' ? 'bg-[#D96B43] text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                PT-PT
              </button>
              <button
                type="button"
                onClick={() => onChangeLang('fr')}
                className={`px-3 py-1.5 text-xs font-mono font-semibold rounded-md transition-colors cursor-pointer ${
                  lang === 'fr' ? 'bg-[#D96B43] text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                FR
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">{f.navTitle}</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <button type="button" onClick={() => onNavigate('home', 'abordagem')} className="hover:text-white transition-colors cursor-pointer">
                  {nav.approach}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('home', 'metodologia')} className="hover:text-white transition-colors cursor-pointer">
                  {nav.methodology}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('home', 'fundador')} className="hover:text-white transition-colors cursor-pointer">
                  {nav.experience}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('home', 'casos')} className="hover:text-white transition-colors cursor-pointer">
                  {f.casesLink}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('home', 'depoimentos')} className="hover:text-white transition-colors cursor-pointer">
                  {f.testimonialsLink}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('principles')} className="text-[#D96B43] font-semibold hover:underline cursor-pointer">
                  {nav.principles}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('home', 'simulador')} className="hover:text-white transition-colors cursor-pointer">
                  {nav.roi}
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigate('home', 'ferramentas')} className="hover:text-white transition-colors cursor-pointer">
                  {nav.tools}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">{f.zonesTitle}</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              {f.zones.map((zone) => (
                <li key={zone}>{zone}</li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">{f.contactTitle}</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <a href={waUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline font-medium">
                  WhatsApp: +351 912 771 681
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-white transition-colors">
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  LinkedIn — Armandino Seixas
                </a>
              </li>
              <li>Oeiras / Lisboa · Portugal</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800/80 mt-10 pt-6 text-xs text-slate-400 leading-relaxed">
          <p>{f.seoLine}</p>
        </div>

        <div className="border-t border-slate-800 mt-6 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>
            © 2026 OpEx Lean (opex-lean.eu). {f.rights}
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <button type="button" onClick={() => onNavigate('privacy')} className="hover:text-white transition-colors cursor-pointer">
              {f.privacy}
            </button>
            <button type="button" onClick={onOpenCookieBanner} className="hover:text-white transition-colors cursor-pointer">
              {f.cookies}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
