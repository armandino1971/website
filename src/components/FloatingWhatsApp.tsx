import { Language } from '../types';
import { WHATSAPP_NUMBER } from '../data/homeData';

interface FloatingWhatsAppProps {
  lang: Language;
  cookieBannerVisible?: boolean;
}

export function FloatingWhatsApp({ lang, cookieBannerVisible = false }: FloatingWhatsAppProps) {
  const label =
    lang === 'fr'
      ? 'Contacter Armandino sur WhatsApp'
      : 'Contactar Armandino por WhatsApp';

  const shortTooltip =
    lang === 'fr' ? 'WhatsApp · Réponse rapide' : 'WhatsApp · Resposta rápida';

  const prefilledText =
    lang === 'fr'
      ? 'Bonjour Armandino, je souhaite échanger sur l’Excellence Opérationnelle et le Lean dans mon entreprise.'
      : 'Olá Armandino, gostaria de falar sobre Excelência Operacional e Lean na minha empresa.';

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(prefilledText)}`;

  return (
    <div
      className={`fixed right-5 sm:right-6 z-40 no-print flex items-center gap-2.5 group transition-all ${
        cookieBannerVisible ? 'bottom-44 sm:bottom-6' : 'bottom-5 sm:bottom-6'
      }`}
    >
      <span
        aria-hidden="true"
        className="hidden sm:inline-block pointer-events-none opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 px-3 py-1.5 rounded-lg bg-[#0F172A] text-white text-xs font-medium shadow-lg whitespace-nowrap border border-slate-700"
      >
        {shortTooltip}
      </span>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        title={label}
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] active:scale-95 text-white shadow-lg shadow-slate-950/20 hover:shadow-xl flex items-center justify-center transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F172A]"
      >
        <svg
          viewBox="0 0 32 32"
          fill="currentColor"
          aria-hidden="true"
          className="w-7 h-7"
        >
          <path d="M16.004 3.2c-7.058 0-12.8 5.742-12.8 12.8 0 2.256.592 4.46 1.714 6.404L3.2 28.8l6.548-1.716a12.74 12.74 0 0 0 6.256 1.636h.006c7.056 0 12.794-5.742 12.794-12.8 0-3.42-1.332-6.634-3.75-9.052A12.72 12.72 0 0 0 16.004 3.2Zm7.456 18.234c-.314.884-1.824 1.69-2.528 1.792-.644.094-1.458.134-2.352-.15-.544-.172-1.24-.404-2.132-.79-3.752-1.62-6.202-5.402-6.39-5.654-.188-.252-1.526-2.03-1.526-3.872 0-1.842.966-2.748 1.308-3.124.344-.374.75-.468.998-.468.25 0 .5.002.718.014.23.012.538-.088.842.642.312.752 1.062 2.594 1.156 2.782.094.188.156.406.032.656-.124.252-.188.406-.374.626-.188.218-.394.488-.562.656-.188.188-.384.39-.164.766.218.374.97 1.6 2.084 2.594 1.432 1.276 2.638 1.672 3.012 1.86.374.188.594.156.812-.094.218-.25.938-1.094 1.188-1.468.25-.374.5-.312.842-.188.344.126 2.186 1.032 2.56 1.218.374.188.624.282.718.438.094.156.094.906-.22 1.79Z" />
        </svg>
      </a>
    </div>
  );
}
