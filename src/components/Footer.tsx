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
              <picture>
                <source srcSet="/assets/aistudio/logo-opex-lean_d2b62a02.webp" type="image/webp" />
                <img
                  src="/assets/aistudio/logo-opex-lean_d2b62a02.png"
                  alt="OpEx Lean"
                  width={36}
                  height={36}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-9 h-9 rounded-md object-contain"
                />
              </picture>
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
              <li>
                <button type="button" onClick={() => onNavigate('home', 'faq')} className="hover:text-white transition-colors cursor-pointer">
                  {lang === 'fr' ? 'Foire Aux Questions (FAQ)' : 'Perguntas Frequentes (FAQ)'}
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
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp: +351 912 771 681"
                  title="WhatsApp: +351 912 771 681"
                  className="inline-flex items-center hover:opacity-85 transition-opacity"
                >
                  <svg viewBox="0 0 32 32" className="w-6 h-6" aria-hidden="true">
                    <rect width="32" height="32" rx="6" fill="#25D366" />
                    <path
                      fill="#FFFFFF"
                      d="M16.004 5.2c-5.958 0-10.8 4.842-10.8 10.8 0 1.904.499 3.764 1.446 5.403L5.2 26.8l5.524-1.448a10.75 10.75 0 0 0 5.28 1.38h.005c5.954 0 10.795-4.842 10.795-10.8 0-2.885-1.124-5.597-3.164-7.638A10.73 10.73 0 0 0 16.004 5.2Zm6.291 15.385c-.265.746-1.539 1.426-2.133 1.512-.543.079-1.23.113-1.984-.127-.459-.145-1.046-.34-1.799-.666-3.166-1.367-5.233-4.558-5.392-4.77-.159-.213-1.287-1.713-1.287-3.267 0-1.554.815-2.319 1.104-2.636.29-.315.633-.395.842-.395.21 0 .422.002.606.012.194.01.454-.074.71.542.263.634.896 2.189.976 2.347.079.159.131.343.027.554-.105.212-.159.342-.316.528-.158.184-.332.412-.474.553-.158.159-.324.33-.138.647.184.315.818 1.35 1.758 2.189 1.208 1.076 2.226 1.41 2.541 1.569.316.159.501.132.685-.079.184-.211.792-.923 1.003-1.239.21-.315.422-.263.71-.158.29.106 1.844.871 2.16 1.028.316.158.527.237.606.369.079.132.079.765-.186 1.51Z"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  aria-label={`Email: ${CONTACT_EMAIL}`}
                  title={`Email: ${CONTACT_EMAIL}`}
                  className="inline-flex items-center hover:opacity-85 transition-opacity"
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
                    <rect width="24" height="24" rx="4" fill="#D96B43" />
                    <path
                      fill="#FFFFFF"
                      d="M4 6.5A1.5 1.5 0 0 1 5.5 5h13A1.5 1.5 0 0 1 20 6.5v11a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5v-11Zm2.2.5 5.8 4.35L17.8 7H6.2Zm12.3 1.6-5.92 4.44a1 1 0 0 1-1.16 0L5.5 8.6V17.5c0 .28.22.5.5.5h12c.28 0 .5-.22.5-.5V8.6Z"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/110004035/admin/dashboard/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn — OpEx Lean"
                  title="LinkedIn — OpEx Lean"
                  className="inline-flex items-center hover:opacity-85 transition-opacity"
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden="true">
                    <rect width="24" height="24" rx="4" fill="#0A66C2" />
                    <path
                      fill="#FFFFFF"
                      d="M8.05 18.5H5.35V9.8h2.7v8.7ZM6.7 8.62a1.56 1.56 0 1 1 0-3.12 1.56 1.56 0 0 1 0 3.12ZM19 18.5h-2.7v-4.23c0-1.01-.02-2.31-1.4-2.31-1.41 0-1.62 1.1-1.62 2.24v4.3h-2.7V9.8h2.59v1.19h.04c.36-.68 1.24-1.4 2.55-1.4 2.73 0 3.24 1.8 3.24 4.13v4.78Z"
                    />
                  </svg>
                </a>
              </li>
              <li>{lang === 'fr' ? 'Oeiras / Lisbonne · Portugal' : 'Oeiras / Lisboa · Portugal'}</li>
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
