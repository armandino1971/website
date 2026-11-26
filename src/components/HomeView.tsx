import { FormEvent, useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Copy,
  Factory,
  Lock,
  Pause,
  Play,
  Printer,
  Quote,
  ShieldCheck,
  X,
} from 'lucide-react';
import { AppView, DiagnosticSubmission, IndustrialTool, Language, ToolCategory } from '../types';
import { useModalA11y } from '../utils/useModalA11y';
import {
  CONTACT_EMAIL,
  homeCopy,
  industrialTools,
  LINKEDIN_URL,
  WHATSAPP_NUMBER,
} from '../data/homeData';

const HERO_GEMBA_IMAGE = '/src/assets/images/hero_gemba_factory_1795511926506.jpg';
const GEMBA_BOARD_IMAGE = '/src/assets/images/gemba_visual_board_1795511926674.jpg';
const CASE_IMAGES = [
  '/src/assets/images/case_aerospace_ops_1795511927919.jpg',
  '/src/assets/images/case_chemical_plant_1795511928045.jpg',
  '/src/assets/images/case_kaizen_assembly_1795511928523.jpg',
];

function ResilientImage({
  src,
  alt,
  className = '',
  fallbackLabel,
  loading = 'lazy',
  fetchPriority,
  width = 1280,
  height = 720,
}: {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel: string;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
  width?: number;
  height?: number;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`bg-gradient-to-br from-slate-900 via-slate-800 to-[#0F172A] flex flex-col items-center justify-center gap-2 p-6 text-slate-300 ${className}`}
      >
        <Factory className="w-8 h-8 text-[#D96B43]" />
        <span className="text-xs font-mono tracking-wide text-slate-400 text-center">{fallbackLabel}</span>
      </div>
    );
  }

  const webpSrc = /\.(jpg|jpeg|png)$/i.test(src)
    ? src.replace(/\.(jpg|jpeg|png)$/i, '.webp')
    : null;

  return (
    <picture className="block w-full h-full">
      {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className={className}
      />
    </picture>
  );
}

interface HomeViewProps {
  lang: Language;
  onNavigate: (view: AppView, sectionId?: string, prefillNotes?: string) => void;
  prefillNotes?: string | null;
  onConsumedPrefill?: () => void;
}

export function HomeView({
  lang,
  onNavigate,
  prefillNotes = null,
  onConsumedPrefill,
}: HomeViewProps) {
  const t = homeCopy[lang];

  // ROI Simulator state
  const [sectorWaste, setSectorWaste] = useState<number>(0.22);
  const [operators, setOperators] = useState<number>(20);
  const [hourlyCost, setHourlyCost] = useState<number>(18);

  const totalHours = operators * 520;
  const recoveredHours = Math.round(totalHours * sectorWaste * 0.5);
  const quarterSavings = recoveredHours * hourlyCost;
  const annualSavings = quarterSavings * 4;

  // Tools Library state
  const [toolFilter, setToolFilter] = useState<ToolCategory>('all');
  const [selectedTool, setSelectedTool] = useState<IndustrialTool | null>(null);

  // Lean Success Stories Modal state
  const [selectedCaseIdx, setSelectedCaseIdx] = useState<number | null>(null);

  // FAQ accordion & filter state
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);
  const [activeFaqCategory, setActiveFaqCategory] = useState<string>('all');

  // Client Testimonials Carousel state
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState<number>(0);
  const [carouselPaused, setCarouselPaused] = useState<boolean>(false);
  const [carouselHovered, setCarouselHovered] = useState<boolean>(false);

  // Founder portrait fallback state
  const [portraitError, setPortraitError] = useState(false);

  // Diagnostic Form state
  const [formState, setFormState] = useState<DiagnosticSubmission>({
    name: '',
    company: '',
    email: '',
    phone: '',
    region: t.form.regions[0],
    size: t.form.sizes[1],
    priority: t.form.priorities[0],
    notes: '',
  });
  const [formError, setFormError] = useState<string>('');
  const [invalidFields, setInvalidFields] = useState<{
    name?: boolean;
    company?: boolean;
    email?: boolean;
    phone?: boolean;
  }>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedData, setSubmittedData] = useState<DiagnosticSubmission | null>(null);
  const [submittedRefId, setSubmittedRefId] = useState<string | null>(null);
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [transferNotice, setTransferNotice] = useState<string | null>(null);

  const caseModalRef = useRef<HTMLDivElement>(null);
  const toolModalRef = useRef<HTMLDivElement>(null);

  // Accessible modals: Escape, scroll-lock, focus trap & focus restoration
  useModalA11y(selectedCaseIdx !== null, caseModalRef, () => setSelectedCaseIdx(null));
  useModalA11y(selectedTool !== null, toolModalRef, () => setSelectedTool(null));

  // Sync select defaults when language changes if untouched
  useEffect(() => {
    setFormState((prev) => ({
      ...prev,
      region: homeCopy[lang].form.regions[0],
      size: homeCopy[lang].form.sizes[1],
      priority: homeCopy[lang].form.priorities[0],
    }));
  }, [lang]);

  // Apply prefilled context handed off from PrinciplesView Radar
  useEffect(() => {
    if (!prefillNotes) return;
    setFormState((prev) => ({
      ...prev,
      notes: prev.notes.includes(prefillNotes)
        ? prev.notes
        : prev.notes
        ? `${prefillNotes}\n${prev.notes}`
        : prefillNotes,
    }));
    setTransferNotice(
      lang === 'fr'
        ? 'Synthèse du Radar de Maturité (1–9) préremplie ci-dessous.'
        : 'Síntese do Radar de Maturidade (1–9) pré-preenchida abaixo.'
    );
    onConsumedPrefill?.();
  }, [prefillNotes, onConsumedPrefill, lang]);

  // Auto-advance testimonials carousel (respects pause, hover & reduced motion)
  useEffect(() => {
    if (carouselPaused || carouselHovered) return;
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const count = t.testimonials.items.length;
    const timer = window.setInterval(() => {
      setActiveTestimonialIdx((prev) => (prev + 1) % count);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [carouselPaused, carouselHovered, t.testimonials.items.length]);

  const filteredTools =
    toolFilter === 'all'
      ? industrialTools
      : industrialTools.filter((item) => item.category === toolFilter);

  const numberLocale = lang === 'fr' ? 'fr-FR' : 'pt-PT';

  const handleTransferRoiToForm = () => {
    const formatted = quarterSavings.toLocaleString(numberLocale);
    const prefix =
      lang === 'fr'
        ? `[Simulation ROI : ${operators} opérateurs | Potentiel estimé : ${formatted} € / 90j] `
        : `[Simulação ROI: ${operators} operadores | Potencial estimado: ${formatted} € / 90d] `;
    setFormState((prev) => ({
      ...prev,
      notes: prev.notes.startsWith('[Simul') ? prev.notes : `${prefix}${prev.notes}`,
    }));
    setTransferNotice(
      lang === 'fr'
        ? `Simulation ROI (${formatted} € / 90j) jointe aux notes de votre demande.`
        : `Simulação ROI (${formatted} € / 90d) anexada às notas do seu pedido.`
    );
    onNavigate('home', 'diagnostico');
  };

  const handleTransferCaseToForm = (sector: string, title: string) => {
    const prefix =
      lang === 'fr'
        ? `[Étude de cas : ${sector} — ${title}] `
        : `[Estudo de caso: ${sector} — ${title}] `;
    setSelectedCaseIdx(null);
    setFormState((prev) => ({
      ...prev,
      notes: prev.notes.startsWith('[Étude') || prev.notes.startsWith('[Estudo') ? prev.notes : `${prefix}${prev.notes}`,
    }));
    setTransferNotice(
      lang === 'fr'
        ? `Référence « ${sector} — ${title} » ajoutée à votre demande.`
        : `Referência "${sector} — ${title}" adicionada ao seu pedido.`
    );
    onNavigate('home', 'diagnostico');
  };

  const handlePrintRoi = () => {
    document.body.classList.add('roi-print-mode');
    const cleanup = () => {
      document.body.classList.remove('roi-print-mode');
      window.removeEventListener('afterprint', cleanup);
    };
    window.addEventListener('afterprint', cleanup);
    window.print();
    window.setTimeout(cleanup, 1200);
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setFormError('');
    setInvalidFields({});

    const name = formState.name.trim();
    const company = formState.company.trim();
    const email = formState.email.trim();
    const phone = formState.phone.trim();
    const notes = formState.notes.trim();

    if (!name || !company || !email || !phone) {
      setInvalidFields({
        name: !name,
        company: !company,
        email: !email,
        phone: !phone,
      });
      setFormError(t.form.errRequired);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setInvalidFields({ email: true });
      setFormError(t.form.errEmail);
      return;
    }

    const payload: DiagnosticSubmission = {
      ...formState,
      name,
      company,
      email,
      phone,
      notes,
    };

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/diagnostic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, lang }),
      });

      if (response.ok) {
        const result = (await response.json()) as { referenceId?: string };
        setSubmittedRefId(result.referenceId ?? null);
        setSubmittedData(payload);
        setCopiedSummary(false);
        return;
      }

      if (response.status === 400) {
        const errBody = (await response.json().catch(() => ({}))) as { error?: string };
        setFormError(errBody.error === 'INVALID_EMAIL' ? t.form.errEmail : t.form.errRequired);
        return;
      }

      // Server unreachable / unexpected 5xx: fall back cleanly to instant WhatsApp/Mail summary
      setSubmittedRefId(null);
      setSubmittedData(payload);
      setCopiedSummary(false);
    } catch {
      setSubmittedRefId(null);
      setSubmittedData(payload);
      setCopiedSummary(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const buildSummaryText = (data: DiagnosticSubmission) => {
    return lang === 'fr'
      ? `Bonjour Armandino, demande de Diagnostic Flash OpEx Lean :\n- Contact : ${data.name}\n- Entreprise : ${data.company}\n- Zone : ${data.region} (${data.size})\n- Défi : ${data.priority}\n- Email : ${data.email}\n- Tél : ${data.phone}${data.notes ? `\n- Notes : ${data.notes}` : ''}`
      : `Olá Armandino, pedido de Diagnóstico Flash OpEx Lean:\n- Contacto: ${data.name}\n- Empresa: ${data.company}\n- Zona: ${data.region} (${data.size})\n- Desafio: ${data.priority}\n- Email: ${data.email}\n- Tel: ${data.phone}${data.notes ? `\n- Notas: ${data.notes}` : ''}`;
  };

  const handleCopySummary = async () => {
    if (!submittedData) return;
    const text = buildSummaryText(submittedData);
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSummary(true);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopiedSummary(true);
    }
  };

  const waDefaultUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    lang === 'fr'
      ? 'Bonjour Armandino, je souhaite échanger sur l’Excellence Opérationnelle et le Lean dans mon entreprise.'
      : 'Olá Armandino, gostaria de falar sobre Excelência Operacional e Lean na minha empresa.'
  )}`;

  return (
    <div id="top">
      {/* 1. HERO SECTION */}
      <section className="bg-[#F8F9FA] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 lg:pt-14 pb-16 lg:pb-24">

          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                <p className="text-xs sm:text-sm font-semibold text-[#D96B43] tracking-wide flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>{t.hero.guarantee}</span>
                </p>

                <h1 className="font-display font-extrabold text-slate-950 tracking-tight leading-[1.08] text-balance text-[clamp(2.25rem,4vw,3.75rem)]">
                  {t.hero.title1}
                  <span className="block text-[#D96B43] mt-1">{t.hero.title2}</span>
                </h1>

                <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                  {t.hero.subtitle}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#diagnostico"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('home', 'diagnostico');
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#D96B43] hover:bg-[#B8532D] text-white font-semibold text-sm sm:text-base transition-colors whitespace-nowrap"
                >
                  <span>{t.hero.ctaPrimary}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#simulador"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('home', 'simulador');
                  }}
                  className="inline-flex items-center px-5 py-3.5 rounded-lg bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 font-semibold text-sm sm:text-base transition-colors whitespace-nowrap"
                >
                  {t.hero.ctaSecondary}
                </a>
                <button
                  type="button"
                  onClick={() => onNavigate('principles')}
                  className="text-sm font-semibold text-slate-800 hover:text-[#D96B43] underline underline-offset-4 transition-colors cursor-pointer whitespace-nowrap px-1 py-2"
                >
                  {t.hero.ctaPrinciples}
                </button>
              </div>
            </div>

            {/* Right Commitment Surface with Editorial Factory Visual */}
            <div className="lg:col-span-5 bg-[#0F172A] text-white rounded-2xl border border-slate-800 overflow-hidden flex flex-col justify-between">
              <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                <ResilientImage
                  src={HERO_GEMBA_IMAGE}
                  alt={
                    lang === 'fr'
                      ? 'Accompagnement Gemba sur site industriel moderne'
                      : 'Acompanhamento Gemba em unidade industrial moderna'
                  }
                  fallbackLabel="OpEx Lean · Gemba"
                  loading="eager"
                  fetchPriority="high"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/45 to-transparent" />
                <div className="absolute bottom-3 left-6 right-6 flex items-end justify-between gap-3">
                  <div>
                    <p className="text-[11px] font-mono font-semibold text-[#D96B43] uppercase tracking-wider">
                      {t.hero.panelTitle}
                    </p>
                    <p className="font-display font-bold text-base sm:text-lg text-white leading-snug">
                      {t.hero.panelSubtitle}
                    </p>
                  </div>
                  <span className="font-mono text-xs font-bold text-emerald-400 tabular-nums whitespace-nowrap shrink-0">
                    {t.hero.panelTag}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:px-8 sm:pb-7 sm:pt-3 divide-y divide-slate-800">
                {t.hero.metrics.map((m) => (
                  <div key={m.label} className="py-3.5 first:pt-2 last:pb-0 flex items-start gap-4">
                    <span className="font-mono font-bold text-xl text-[#D96B43] tabular-nums w-14 shrink-0">
                      {m.value}
                    </span>
                    <div>
                      <h3 className="font-semibold text-sm text-white">{m.label}</h3>
                      <p className="text-xs text-slate-300 leading-relaxed mt-0.5">{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. APPROACH COMPARISON */}
      <section id="abordagem" className="py-20 lg:py-24 bg-white border-b border-slate-200 scroll-mt-[65px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#D96B43]">{t.comparison.kicker}</p>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-950 mt-2 text-balance">
              {t.comparison.title}
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">{t.comparison.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            <div className="rounded-2xl bg-[#F8F9FA] border border-slate-200 p-8 flex flex-col justify-between">
              <div>
                <p className="text-xs font-mono font-semibold text-slate-500 uppercase tracking-wider">
                  {t.comparison.tradTag}
                </p>
                <h3 className="font-display font-bold text-2xl text-slate-900 mt-2 mb-6">
                  {t.comparison.tradTitle}
                </h3>
                <ul className="divide-y divide-slate-200">
                  {t.comparison.tradItems.map((item) => (
                    <li key={item} className="py-3.5 flex items-start gap-3 text-sm sm:text-base text-slate-600">
                      <X className="w-4 h-4 text-red-600 shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="rounded-2xl bg-[#0F172A] text-white border border-slate-800 p-8 flex flex-col justify-between">
              <div>
                <p className="text-xs font-mono font-semibold text-[#D96B43] uppercase tracking-wider">
                  {t.comparison.opexTag}
                </p>
                <h3 className="font-display font-bold text-2xl text-white mt-2 mb-6">
                  {t.comparison.opexTitle}
                </h3>
                <ul className="divide-y divide-slate-800">
                  {t.comparison.opexItems.map((item) => (
                    <li key={item.lead} className="py-3.5 flex items-start gap-3 text-sm sm:text-base text-slate-200">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                      <span>
                        <strong className="text-white">{item.lead}</strong> {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. METHODOLOGY & 90-DAY ROADMAP */}
      <section id="metodologia" className="py-20 lg:py-24 bg-[#F8F9FA] border-b border-slate-200 scroll-mt-[65px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {/* 4-Step Methodology */}
          <div>
            <div className="max-w-3xl mb-12">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#D96B43]">{t.methodology.kicker}</p>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-950 mt-2 text-balance">
                {t.methodology.title}
              </h2>
              <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">{t.methodology.subtitle}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {t.methodology.steps.map((step) => (
                <div
                  key={step.num}
                  className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-baseline justify-between gap-2 pb-4 border-b border-slate-100 mb-4">
                      <span className="font-mono font-bold text-xl text-[#D96B43] tabular-nums">{step.num}</span>
                      <span className="font-mono text-xs text-slate-500">{step.phase}</span>
                    </div>
                    <h3 className="font-display font-bold text-lg text-slate-950 mb-2">{step.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Field Visual Management Spotlight */}
            <div className="mt-10 bg-white rounded-2xl border border-slate-200 overflow-hidden grid lg:grid-cols-12 items-stretch">
              <div className="lg:col-span-7 aspect-video lg:aspect-auto lg:min-h-[300px] bg-slate-900 overflow-hidden">
                <ResilientImage
                  src={GEMBA_BOARD_IMAGE}
                  alt={
                    lang === 'fr'
                      ? 'Tableau de management visuel SQCDP au cœur de l’atelier'
                      : 'Quadro de gestão visual SQCDP no chão de fábrica'
                  }
                  fallbackLabel="SQCDP · Gemba Management"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <p className="text-xs font-mono font-semibold uppercase tracking-wider text-[#D96B43]">
                    {lang === 'fr' ? 'Pilotage Visuel · Gemba' : 'Gestão Visual · Terreno'}
                  </p>
                  <h3 className="font-display font-extrabold text-2xl text-slate-950 text-balance">
                    {lang === 'fr'
                      ? 'Rituels SQCDP quotidiens et autonomie des équipes'
                      : 'Rituais SQCDP diários e autonomia das equipas'}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {lang === 'fr'
                      ? 'Chaque poste dispose d’indicateurs visuels clairs (Sécurité, Qualité, Coût, Délai, Personnel) pour détecter les écarts en moins de 15 minutes et agir à la source.'
                      : 'Cada célula opera com indicadores visuais claros (Segurança, Qualidade, Custo, Prazo, Pessoas) para detetar desvios em minutos e eliminar causas raiz no terreno.'}
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                  <span className="text-xs font-mono text-slate-500">
                    {lang === 'fr' ? '9 Principes · Évaluation 1–9' : '9 Princípios · Avaliação 1–9'}
                  </span>
                  <button
                    type="button"
                    onClick={() => onNavigate('principles')}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#D96B43] hover:text-[#B8532D] transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <span>{lang === 'fr' ? 'Lancer l’autodiagnostic' : 'Iniciar autodiagnóstico'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 90-Day Roadmap */}
          <div id="roteiro" className="scroll-mt-20">
            <div className="max-w-3xl mb-10">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#D96B43]">{t.roadmap.kicker}</p>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-950 mt-2 text-balance">
                {t.roadmap.title}
              </h2>
              <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">{t.roadmap.subtitle}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {t.roadmap.phases.map((phase) => (
                <div key={phase.num} className="bg-white rounded-2xl border border-slate-200 p-7 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-slate-500 pb-4 border-b border-slate-100 mb-4">
                      <span className="font-semibold text-slate-900">{phase.days}</span>
                      <span>{phase.num}</span>
                    </div>
                    <h3 className="font-display font-bold text-xl text-slate-950 mb-3">{phase.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-5">{phase.desc}</p>
                  </div>
                  <ul className="space-y-2 pt-4 border-t border-slate-100 text-xs font-medium text-slate-700">
                    {phase.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#D96B43] shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Contractual Guarantee Bar */}
            <div className="mt-8 bg-[#0F172A] text-white rounded-2xl border border-slate-800 p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <ShieldCheck className="w-7 h-7 text-[#D96B43] shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-display font-bold text-lg sm:text-xl text-white">{t.roadmap.guaranteeTitle}</h3>
                  <p className="text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">{t.roadmap.guaranteeDesc}</p>
                </div>
              </div>
              <a
                href="#diagnostico"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('home', 'diagnostico');
                }}
                className="px-5 py-3 rounded-lg bg-[#D96B43] hover:bg-[#B8532D] text-white font-semibold text-sm transition-colors whitespace-nowrap shrink-0"
              >
                {t.roadmap.guaranteeCta}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FOUNDER, REAL CASE STUDIES & RECOMMENDATIONS */}
      <section id="fundador" className="py-20 lg:py-24 bg-white border-b border-slate-200 scroll-mt-[65px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Founder Profile */}
          <div className="rounded-2xl border border-slate-200 overflow-hidden grid lg:grid-cols-12 items-stretch">
            <div className="lg:col-span-5 bg-[#0F172A] text-white p-8 sm:p-10 flex flex-col justify-between space-y-8">
              <div className="space-y-5">
                <p className="text-xs font-mono font-semibold text-[#D96B43] uppercase tracking-wider">
                  {t.founder.kicker}
                </p>
                <div className="flex items-center gap-5">
                  <div className="w-24 h-28 rounded-xl overflow-hidden bg-slate-800 border border-slate-700 shrink-0 flex items-center justify-center">
                    {!portraitError ? (
                      <picture className="block w-full h-full">
                        <source srcSet="/assets/aistudio/armandino_3d0f8cc6.webp" type="image/webp" />
                        <img
                          src="/assets/aistudio/armandino_3d0f8cc6.png"
                          alt="Armandino Seixas"
                          width={96}
                          height={112}
                          loading="lazy"
                          decoding="async"
                          referrerPolicy="no-referrer"
                          onError={() => setPortraitError(true)}
                          className="w-full h-full object-cover"
                        />
                      </picture>
                    ) : (
                      <span className="font-display font-bold text-2xl text-slate-300">AS</span>
                    )}
                  </div>
                  <div>
                    <h2 className="font-display font-extrabold text-2xl text-white">Armandino Seixas</h2>
                    <p className="text-xs sm:text-sm font-medium text-emerald-400 mt-1">{t.founder.role}</p>
                    <p className="text-xs text-slate-400 mt-1">{t.founder.location}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">{t.founder.bio}</p>
                <div className="flex flex-wrap gap-2.5 pt-1">
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold border border-slate-700 transition-colors"
                  >
                    {t.founder.linkedinBtn}
                  </a>
                  <a
                    href={waDefaultUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-lg bg-[#25D366] hover:bg-[#1ebe5d] text-slate-950 text-xs font-bold transition-colors"
                  >
                    WhatsApp
                  </a>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800">
                {t.founder.stats.map((st) => (
                  <div key={st.label}>
                    <p className="font-mono font-bold text-xl text-[#D96B43] tabular-nums">{st.value}</p>
                    <p className="text-xs text-slate-400 mt-1 leading-snug">{st.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 bg-[#F8F9FA] p-8 sm:p-10 flex flex-col justify-between space-y-8">
              <div>
                <h3 className="font-display font-extrabold text-2xl text-slate-950 mb-3">{t.founder.expTitle}</h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{t.founder.expDesc}</p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
                  {t.founder.sectors.map((sec) => (
                    <div
                      key={sec}
                      className="px-3 py-2.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-800"
                    >
                      {sec}
                    </div>
                  ))}
                </div>
              </div>

              <blockquote className="bg-white border border-slate-200 rounded-xl p-6">
                <p className="text-slate-900 font-medium text-sm sm:text-base italic leading-relaxed">
                  {t.founder.quote}
                </p>
                <footer className="text-xs font-semibold text-[#D96B43] mt-3">— Armandino Seixas</footer>
              </blockquote>
            </div>
          </div>

          {/* Lean Success Stories / Real Case Studies (Adjacent Proof) */}
          <div id="casos" className="scroll-mt-20">
            <div className="max-w-3xl mb-10">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#D96B43]">{t.cases.kicker}</p>
              <h2 className="font-display font-extrabold text-3xl text-slate-950 mt-2">{t.cases.title}</h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">{t.cases.subtitle}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {t.cases.items.map((c, idx) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedCaseIdx(idx)}
                  className="text-left bg-[#F8F9FA] rounded-2xl border border-slate-200 hover:border-[#D96B43] overflow-hidden flex flex-col justify-between group cursor-pointer transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D96B43]"
                >
                  <div>
                    <div className="aspect-[4/3] w-full overflow-hidden bg-slate-900">
                      <ResilientImage
                        src={CASE_IMAGES[idx % CASE_IMAGES.length]}
                        alt={`${c.sector} — ${c.title}`}
                        fallbackLabel={c.sector}
                        width={800}
                        height={600}
                        className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-300"
                      />
                    </div>
                    <div className="p-7 pb-0">
                      <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-3">
                        <span className="font-semibold text-[#D96B43]">{c.sector}</span>
                        <span aria-hidden="true">·</span>
                        <span>{c.meta}</span>
                      </div>
                      <h3 className="font-display font-bold text-lg text-slate-950 group-hover:text-[#D96B43] transition-colors mb-2">
                        {c.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">{c.desc}</p>
                    </div>
                  </div>
                  <div className="p-7 pt-5 w-full">
                    <div className="pt-4 border-t border-slate-200 flex items-baseline justify-between">
                      <div>
                        <span className="font-mono font-extrabold text-2xl text-slate-950 tabular-nums">{c.metric}</span>
                        <span className="block text-xs text-slate-500 mt-0.5">{c.metricLabel}</span>
                      </div>
                      <span className="text-xs font-mono text-slate-600">{c.method}</span>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs font-semibold text-slate-900 group-hover:text-[#D96B43] transition-colors">
                      <span>{t.cases.cardAction}</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Client Testimonials Carousel (Attributable Executive Proof) */}
          <div
            id="depoimentos"
            className="scroll-mt-20 space-y-8"
            role="region"
            aria-roledescription="carousel"
            aria-label={t.testimonials.title}
            onMouseEnter={() => setCarouselHovered(true)}
            onMouseLeave={() => setCarouselHovered(false)}
            onKeyDown={(e) => {
              const count = t.testimonials.items.length;
              if (e.key === 'ArrowLeft') {
                setActiveTestimonialIdx((prev) => (prev - 1 + count) % count);
              } else if (e.key === 'ArrowRight') {
                setActiveTestimonialIdx((prev) => (prev + 1) % count);
              }
            }}
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#D96B43]">
                  {t.testimonials.kicker}
                </p>
                <h2 className="font-display font-extrabold text-3xl text-slate-950 mt-2">
                  {t.testimonials.title}
                </h2>
                <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
                  {t.testimonials.subtitle}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="font-mono text-xs font-semibold text-slate-500 tabular-nums mr-1">
                  0{activeTestimonialIdx + 1} / 0{t.testimonials.items.length}
                </span>
                <button
                  type="button"
                  onClick={() => setCarouselPaused((prev) => !prev)}
                  aria-label={carouselPaused ? t.testimonials.playLabel : t.testimonials.pauseLabel}
                  title={carouselPaused ? t.testimonials.playLabel : t.testimonials.pauseLabel}
                  className="w-10 h-10 rounded-lg border border-slate-200 bg-white hover:border-slate-300 text-slate-700 hover:text-slate-950 flex items-center justify-center transition-colors cursor-pointer"
                >
                  {carouselPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveTestimonialIdx(
                      (prev) => (prev - 1 + t.testimonials.items.length) % t.testimonials.items.length
                    )
                  }
                  aria-label={t.testimonials.prevLabel}
                  title={t.testimonials.prevLabel}
                  className="w-10 h-10 rounded-lg border border-slate-200 bg-white hover:border-[#D96B43] text-slate-800 hover:text-[#D96B43] flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setActiveTestimonialIdx((prev) => (prev + 1) % t.testimonials.items.length)
                  }
                  aria-label={t.testimonials.nextLabel}
                  title={t.testimonials.nextLabel}
                  className="w-10 h-10 rounded-lg border border-slate-200 bg-[#0F172A] hover:bg-[#D96B43] text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {(() => {
              const activeRec =
                t.testimonials.items[activeTestimonialIdx] || t.testimonials.items[0];
              return (
                <div className="space-y-4">
                  {/* Main Spotlight Slide */}
                  <div
                    id={`testimonial-panel-${activeTestimonialIdx}`}
                    role="tabpanel"
                    aria-live="polite"
                    className="bg-[#0F172A] text-white rounded-2xl border border-slate-800 p-8 sm:p-10 lg:p-12 flex flex-col justify-between gap-8"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                        <span className="text-[#D96B43] font-semibold">{activeRec.sector}</span>
                        <span aria-hidden="true">·</span>
                        <span>{activeRec.focus}</span>
                      </div>
                      <span className="text-xs font-mono text-emerald-400">
                        {t.testimonials.verifiedLabel}
                      </span>
                    </div>

                    <div className="flex items-start gap-4 sm:gap-6">
                      <Quote
                        aria-hidden="true"
                        className="w-8 h-8 sm:w-10 sm:h-10 text-[#D96B43] shrink-0 mt-1"
                      />
                      <blockquote className="font-display font-semibold text-lg sm:text-xl lg:text-2xl text-white leading-relaxed text-balance">
                        {activeRec.quote}
                      </blockquote>
                    </div>

                    <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#D96B43] text-white font-mono text-sm font-bold flex items-center justify-center shrink-0">
                          {activeRec.initials}
                        </div>
                        <div>
                          <p className="font-display font-bold text-base sm:text-lg text-white">
                            {activeRec.author}
                          </p>
                          <p className="text-xs sm:text-sm text-slate-300">
                            {activeRec.role} · <span className="font-semibold text-white">{activeRec.org}</span>
                          </p>
                        </div>
                      </div>

                      <div
                        className="flex items-center gap-2"
                        role="tablist"
                        aria-label={t.testimonials.title}
                        onKeyDown={(e) => {
                          const count = t.testimonials.items.length;
                          if (e.key === 'ArrowRight') {
                            e.stopPropagation();
                            setActiveTestimonialIdx((prev) => (prev + 1) % count);
                          } else if (e.key === 'ArrowLeft') {
                            e.stopPropagation();
                            setActiveTestimonialIdx((prev) => (prev - 1 + count) % count);
                          }
                        }}
                      >
                        {t.testimonials.items.map((item, idx) => (
                          <button
                            key={item.author}
                            type="button"
                            role="tab"
                            aria-selected={activeTestimonialIdx === idx}
                            aria-controls={`testimonial-panel-${idx}`}
                            aria-label={`${item.author} — ${item.org}`}
                            onClick={() => setActiveTestimonialIdx(idx)}
                            className={`h-2 rounded-full transition-all cursor-pointer ${
                              activeTestimonialIdx === idx
                                ? 'w-8 bg-[#D96B43]'
                                : 'w-2 bg-slate-600 hover:bg-slate-400'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Quick Executive Selector Strip */}
                  <div className="grid md:grid-cols-3 gap-4">
                    {t.testimonials.items.map((rec, idx) => {
                      const isActive = activeTestimonialIdx === idx;
                      return (
                        <button
                          key={rec.author}
                          type="button"
                          aria-current={isActive ? 'true' : undefined}
                          onClick={() => setActiveTestimonialIdx(idx)}
                          className={`text-left rounded-xl p-5 border transition-colors flex items-center gap-3.5 cursor-pointer ${
                            isActive
                              ? 'bg-white border-[#D96B43]'
                              : 'bg-[#F8F9FA] border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div
                            className={`w-10 h-10 rounded-full font-mono text-xs font-bold flex items-center justify-center shrink-0 transition-colors ${
                              isActive
                                ? 'bg-[#D96B43] text-white'
                                : 'bg-[#0F172A] text-white'
                            }`}
                          >
                            {rec.initials}
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-sm text-slate-950 truncate">{rec.author}</p>
                            <p className="text-xs text-slate-500 truncate">
                              {rec.role} · {rec.org}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE ROI SIMULATOR */}
      <section id="simulador" className="py-20 lg:py-24 bg-[#0F172A] text-white scroll-mt-[65px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Executive Print-Only Letterhead */}
          <div className="hidden print:flex items-center justify-between border-b border-slate-300 pb-4 mb-6">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-wider">OPEX LEAN · ARMANDINO SEIXAS</p>
              <p className="font-display font-extrabold text-xl">
                {lang === 'fr' ? 'Simulation Exécutive ROI — 90 Jours' : 'Simulação Executiva ROI — 90 Dias'}
              </p>
            </div>
            <div className="text-right font-mono text-xs">
              <p>https://opex-lean.eu</p>
              <p>{new Date().toISOString().slice(0, 10)}</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#D96B43]">{t.simulator.kicker}</p>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white text-balance">
                {t.simulator.title}
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">{t.simulator.subtitle}</p>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                <div>
                  <label htmlFor="sim-sector" className="block text-sm font-medium text-slate-200 mb-2">
                    {t.simulator.sectorLabel}
                  </label>
                  <select
                    id="sim-sector"
                    value={sectorWaste}
                    onChange={(e) => setSectorWaste(parseFloat(e.target.value))}
                    className="w-full bg-[#0F172A] border border-slate-700 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D96B43]"
                  >
                    {t.simulator.sectors.map((sec) => (
                      <option key={sec.label} value={sec.value}>
                        {sec.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="sim-operators" className="text-sm font-medium text-slate-200">
                      {t.simulator.opsLabel}
                    </label>
                    <span className="font-mono font-bold text-base text-[#D96B43] tabular-nums">{operators}</span>
                  </div>
                  <input
                    id="sim-operators"
                    type="range"
                    min={5}
                    max={50}
                    value={operators}
                    onChange={(e) => setOperators(parseInt(e.target.value, 10))}
                    className="opex-slider"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="sim-cost" className="text-sm font-medium text-slate-200">
                      {t.simulator.costLabel}
                    </label>
                    <span className="font-mono font-bold text-sm text-white tabular-nums">{hourlyCost} €/h</span>
                  </div>
                  <input
                    id="sim-cost"
                    type="range"
                    min={12}
                    max={35}
                    value={hourlyCost}
                    onChange={(e) => setHourlyCost(parseInt(e.target.value, 10))}
                    className="opex-slider"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-800">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#D96B43]">
                    {t.simulator.resHeader}
                  </span>
                  <span className="text-xs text-slate-400">{t.simulator.resNote}</span>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-5">
                    <p className="text-xs text-slate-400 uppercase font-medium">{t.simulator.resHours}</p>
                    <p className="font-mono font-extrabold text-3xl text-white mt-2 tabular-nums">
                      {recoveredHours.toLocaleString(numberLocale)}{' '}
                      <span className="text-sm font-normal text-slate-400">{t.simulator.resHoursUnit}</span>
                    </p>
                  </div>
                  <div className="bg-[#0F172A] border border-[#D96B43]/50 rounded-xl p-5">
                    <p className="text-xs text-[#D96B43] uppercase font-medium">{t.simulator.resSavings}</p>
                    <p className="font-mono font-extrabold text-3xl text-emerald-400 mt-2 tabular-nums">
                      {quarterSavings.toLocaleString(numberLocale)} €
                    </p>
                  </div>
                </div>

                <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-5 space-y-2">
                  <p className="text-xs text-slate-300">{t.simulator.resAnnualLabel}</p>
                  <p className="font-mono font-bold text-2xl text-white tabular-nums">
                    {annualSavings.toLocaleString(numberLocale)} €{' '}
                    <span className="text-xs font-sans font-normal text-slate-400">{t.simulator.resAnnualSub}</span>
                  </p>
                  <p className="text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-800 tabular-nums">
                    {lang === 'fr'
                      ? `Hypothèse : ${operators} op. × 520 h/trim. × ${Math.round(sectorWaste * 100)}% Muda × 50% captation × ${hourlyCost} €/h`
                      : `Base de cálculo: ${operators} op. × 520 h/trim. × ${Math.round(sectorWaste * 100)}% Muda × 50% captação × ${hourlyCost} €/h`}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 no-print">
                  <button
                    type="button"
                    onClick={handleTransferRoiToForm}
                    className="flex-1 px-5 py-3.5 rounded-lg bg-[#D96B43] hover:bg-[#B8532D] text-white font-semibold text-sm transition-colors cursor-pointer"
                  >
                    {t.simulator.cta}
                  </button>
                  <button
                    type="button"
                    onClick={handlePrintRoi}
                    className="px-4 py-3.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>{t.simulator.printBtn}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. INDUSTRIAL TOOLS LIBRARY */}
      <section id="ferramentas" className="py-20 lg:py-24 bg-[#F8F9FA] border-b border-slate-200 scroll-mt-[65px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#D96B43]">{t.toolsSection.kicker}</p>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-950 mt-2">
                {t.toolsSection.title}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2">{t.toolsSection.subtitle}</p>
            </div>

            <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-200/70 rounded-lg self-start">
              {t.toolsSection.filters.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setToolFilter(f.key)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                    toolFilter === f.key
                      ? 'bg-white text-slate-950 shadow-xs'
                      : 'text-slate-600 hover:text-slate-950'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <button
                key={tool.id}
                type="button"
                onClick={() => setSelectedTool(tool)}
                className="text-left bg-white rounded-2xl border border-slate-200 hover:border-[#D96B43] p-6 transition-colors flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                    <span>{tool.tag[lang]}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono font-semibold text-[#D96B43] tabular-nums">
                      {typeof tool.kpi === 'string' ? tool.kpi : tool.kpi[lang]}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-slate-950 group-hover:text-[#D96B43] transition-colors mb-2">
                    {tool.title[lang]}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{tool.summary[lang]}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-900 group-hover:text-[#D96B43]">
                  <span>{t.toolsSection.cardAction}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lean Success Story Deep-Dive Modal */}
      {selectedCaseIdx !== null && t.cases.items[selectedCaseIdx] && (() => {
        const activeCase = t.cases.items[selectedCaseIdx];
        const totalCases = t.cases.items.length;
        return (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-study-modal-title"
            onClick={() => setSelectedCaseIdx(null)}
            className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4"
          >
            <div
              ref={caseModalRef}
              tabIndex={-1}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto border border-slate-200 shadow-2xl focus:outline-none"
            >
              {/* Banner Photo with Measured Scrim */}
              <div className="relative h-52 sm:h-60 w-full overflow-hidden bg-slate-900">
                <ResilientImage
                  src={CASE_IMAGES[selectedCaseIdx % CASE_IMAGES.length]}
                  alt={`${activeCase.sector} — ${activeCase.title}`}
                  fallbackLabel={activeCase.sector}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/55 to-black/20" />
                <button
                  type="button"
                  onClick={() => setSelectedCaseIdx(null)}
                  aria-label={lang === 'fr' ? 'Fermer' : 'Fechar'}
                  className="absolute top-4 right-4 p-2 rounded-lg bg-slate-950/70 hover:bg-slate-950 text-white border border-white/20 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-5 left-6 right-6 text-white">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-300 mb-1.5">
                    <span className="font-semibold text-[#D96B43]">{activeCase.sector}</span>
                    <span aria-hidden="true">·</span>
                    <span>{activeCase.meta}</span>
                    <span aria-hidden="true">·</span>
                    <span>{activeCase.method}</span>
                  </div>
                  <h3 id="case-study-modal-title" className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                    {activeCase.title}
                  </h3>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-7">
                {/* Industrial Context Metadata Grid */}
                <div className="grid sm:grid-cols-12 gap-4 pb-6 border-b border-slate-200">
                  <div className="sm:col-span-6">
                    <p className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500">
                      {t.cases.modalContextLabel}
                    </p>
                    <p className="text-sm text-slate-700 leading-relaxed mt-1">{activeCase.context}</p>
                  </div>
                  <div className="sm:col-span-3">
                    <p className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500">
                      {t.cases.modalDurationLabel}
                    </p>
                    <p className="font-mono font-bold text-base text-slate-950 mt-1 tabular-nums">{activeCase.duration}</p>
                  </div>
                  <div className="sm:col-span-3">
                    <p className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500">
                      {t.cases.modalScopeLabel}
                    </p>
                    <p className="text-sm font-semibold text-slate-950 mt-1">{activeCase.teamScope}</p>
                  </div>
                </div>

                {/* Quantified KPI Impact Row */}
                <div>
                  <p className="text-xs font-mono font-semibold uppercase tracking-wider text-[#D96B43] mb-3">
                    {t.cases.modalResultsTitle}
                  </p>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {activeCase.kpis.map((k) => (
                      <div key={k.label} className="bg-[#0F172A] text-white rounded-xl p-4 border border-slate-800">
                        <p className="font-mono font-extrabold text-2xl text-emerald-400 tabular-nums">{k.value}</p>
                        <p className="text-xs font-semibold text-white mt-1">{k.label}</p>
                        <p className="text-xs font-mono text-slate-400 mt-0.5 tabular-nums">{k.delta}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Before vs Gemba Intervention Comparison */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="bg-[#F8F9FA] rounded-xl p-5 border border-slate-200 space-y-3">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700">
                      {t.cases.modalBeforeTitle}
                    </h4>
                    <ul className="space-y-2.5 text-sm text-slate-600">
                      {activeCase.beforeItems.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <X className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white rounded-xl p-5 border border-slate-200 space-y-3">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#D96B43]">
                      {t.cases.modalActionsTitle}
                    </h4>
                    <ul className="space-y-2.5 text-sm text-slate-700">
                      {activeCase.interventionItems.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Modal Stepper & Primary CTA */}
                <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedCaseIdx((selectedCaseIdx - 1 + totalCases) % totalCases)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>{t.cases.modalPrev}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedCaseIdx((selectedCaseIdx + 1) % totalCases)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <span>{t.cases.modalNext}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleTransferCaseToForm(activeCase.sector, activeCase.title)}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#D96B43] hover:bg-[#B8532D] text-white text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <span>{t.cases.modalCta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Tool Detail Modal */}
      {selectedTool && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="home-tool-modal-title"
          onClick={() => setSelectedTool(null)}
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div
            ref={toolModalRef}
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-6 focus:outline-none"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                  <span>{selectedTool.tag[lang]}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono font-semibold text-[#D96B43]">
                    {typeof selectedTool.kpi === 'string' ? selectedTool.kpi : selectedTool.kpi[lang]}
                  </span>
                </div>
                <h3 id="home-tool-modal-title" className="font-display font-extrabold text-2xl text-slate-950">
                  {selectedTool.title[lang]}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTool(null)}
                aria-label={lang === 'fr' ? 'Fermer' : 'Fechar'}
                className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{selectedTool.summary[lang]}</p>

            <div className="bg-[#F8F9FA] rounded-xl p-5 border border-slate-200 space-y-3">
              <h4 className="font-semibold text-xs uppercase tracking-wider text-slate-900">
                {t.toolsSection.modalStepHeader}
              </h4>
              <ul className="space-y-2.5 text-sm text-slate-700">
                {selectedTool.steps[lang].map((step) => (
                  <li key={step} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#D96B43] shrink-0 mt-0.5" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="#diagnostico"
              onClick={(e) => {
                e.preventDefault();
                setSelectedTool(null);
                onNavigate('home', 'diagnostico');
              }}
              className="block w-full text-center px-6 py-3.5 rounded-lg bg-[#D96B43] hover:bg-[#B8532D] text-white font-semibold text-sm transition-colors"
            >
              {t.toolsSection.modalCta}
            </a>
          </div>
        </div>
      )}

      {/* 7. DIAGNOSTIC FORM & FAQ */}
      <section id="diagnostico" className="py-20 lg:py-24 bg-white scroll-mt-[65px]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="rounded-2xl border border-slate-200 overflow-hidden bg-[#F8F9FA]">
            <div className="bg-[#0F172A] px-6 sm:px-10 py-8 text-white">
              <p className="text-xs font-mono font-semibold text-[#D96B43] uppercase tracking-wider">
                {t.form.kicker}
              </p>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white mt-2">
                {t.form.title}
              </h2>
              <p className="text-sm sm:text-base text-slate-300 mt-2 leading-relaxed">{t.form.subtitle}</p>
            </div>

            {!submittedData ? (
              <form noValidate onSubmit={handleFormSubmit} className="p-6 sm:p-10 space-y-6">
                {transferNotice && !formError && (
                  <div
                    role="status"
                    className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm font-medium flex items-center justify-between gap-3"
                  >
                    <span>{transferNotice}</span>
                    <button
                      type="button"
                      onClick={() => setTransferNotice(null)}
                      aria-label={lang === 'fr' ? 'Fermer' : 'Fechar'}
                      className="text-emerald-700 hover:text-emerald-950 cursor-pointer shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
                {formError && (
                  <div role="alert" className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm font-medium">
                    {formError}
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="f-name" className="block text-sm font-semibold text-slate-900 mb-1.5">
                      {t.form.nameLabel}
                    </label>
                    <input
                      id="f-name"
                      type="text"
                      autoComplete="name"
                      required
                      aria-invalid={Boolean(invalidFields.name)}
                      value={formState.name}
                      onChange={(e) => {
                        setFormState({ ...formState, name: e.target.value });
                        if (invalidFields.name) setInvalidFields((prev) => ({ ...prev, name: false }));
                      }}
                      placeholder={t.form.namePh}
                      className={`w-full px-4 py-3 rounded-lg border bg-white text-sm text-slate-900 focus:outline-none focus:border-[#D96B43] ${
                        invalidFields.name ? 'border-red-500' : 'border-slate-300'
                      }`}
                    />
                  </div>
                  <div>
                    <label htmlFor="f-company" className="block text-sm font-semibold text-slate-900 mb-1.5">
                      {t.form.companyLabel}
                    </label>
                    <input
                      id="f-company"
                      type="text"
                      autoComplete="organization"
                      required
                      aria-invalid={Boolean(invalidFields.company)}
                      value={formState.company}
                      onChange={(e) => {
                        setFormState({ ...formState, company: e.target.value });
                        if (invalidFields.company) setInvalidFields((prev) => ({ ...prev, company: false }));
                      }}
                      placeholder={t.form.companyPh}
                      className={`w-full px-4 py-3 rounded-lg border bg-white text-sm text-slate-900 focus:outline-none focus:border-[#D96B43] ${
                        invalidFields.company ? 'border-red-500' : 'border-slate-300'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-5">
                  <div>
                    <label htmlFor="f-email" className="block text-sm font-semibold text-slate-900 mb-1.5">
                      {t.form.emailLabel}
                    </label>
                    <input
                      id="f-email"
                      type="email"
                      autoComplete="email"
                      required
                      aria-invalid={Boolean(invalidFields.email)}
                      value={formState.email}
                      onChange={(e) => {
                        setFormState({ ...formState, email: e.target.value });
                        if (invalidFields.email) setInvalidFields((prev) => ({ ...prev, email: false }));
                      }}
                      placeholder={t.form.emailPh}
                      className={`w-full px-4 py-3 rounded-lg border bg-white text-sm text-slate-900 focus:outline-none focus:border-[#D96B43] ${
                        invalidFields.email ? 'border-red-500' : 'border-slate-300'
                      }`}
                    />
                  </div>
                  <div>
                    <label htmlFor="f-phone" className="block text-sm font-semibold text-slate-900 mb-1.5">
                      {t.form.phoneLabel}
                    </label>
                    <input
                      id="f-phone"
                      type="tel"
                      autoComplete="tel"
                      required
                      aria-invalid={Boolean(invalidFields.phone)}
                      value={formState.phone}
                      onChange={(e) => {
                        setFormState({ ...formState, phone: e.target.value });
                        if (invalidFields.phone) setInvalidFields((prev) => ({ ...prev, phone: false }));
                      }}
                      placeholder={t.form.phonePh}
                      className={`w-full px-4 py-3 rounded-lg border bg-white text-sm text-slate-900 focus:outline-none focus:border-[#D96B43] ${
                        invalidFields.phone ? 'border-red-500' : 'border-slate-300'
                      }`}
                    />
                  </div>
                  <div>
                    <label htmlFor="f-region" className="block text-sm font-semibold text-slate-900 mb-1.5">
                      {t.form.regionLabel}
                    </label>
                    <select
                      id="f-region"
                      value={formState.region}
                      onChange={(e) => setFormState({ ...formState, region: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:border-[#D96B43]"
                    >
                      {t.form.regions.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="f-size" className="block text-sm font-semibold text-slate-900 mb-1.5">
                      {t.form.sizeLabel}
                    </label>
                    <select
                      id="f-size"
                      value={formState.size}
                      onChange={(e) => setFormState({ ...formState, size: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:border-[#D96B43]"
                    >
                      {t.form.sizes.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="f-priority" className="block text-sm font-semibold text-slate-900 mb-1.5">
                      {t.form.priorityLabel}
                    </label>
                    <select
                      id="f-priority"
                      value={formState.priority}
                      onChange={(e) => setFormState({ ...formState, priority: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:border-[#D96B43]"
                    >
                      {t.form.priorities.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="f-notes" className="block text-sm font-semibold text-slate-900 mb-1.5">
                    {t.form.notesLabel}
                  </label>
                  <textarea
                    id="f-notes"
                    rows={3}
                    value={formState.notes}
                    onChange={(e) => setFormState({ ...formState, notes: e.target.value })}
                    placeholder={t.form.notesPh}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:border-[#D96B43]"
                  />
                </div>

                <div className="space-y-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-4 rounded-lg bg-[#D96B43] hover:bg-[#B8532D] disabled:opacity-60 disabled:cursor-wait text-white font-bold text-base transition-colors cursor-pointer"
                  >
                    {isSubmitting ? t.form.submitting : t.form.submit}
                  </button>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span>{t.form.privacyNote}</span>
                    </span>
                    <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-slate-900 hover:underline">
                      {CONTACT_EMAIL}
                    </a>
                  </div>
                </div>
              </form>
            ) : (
              <div className="p-8 sm:p-12 text-center space-y-6">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-2xl text-slate-950">{t.form.confTitle}</h3>
                  <p className="text-sm text-slate-600 mt-2 max-w-lg mx-auto">{t.form.confDesc}</p>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-5 max-w-md mx-auto text-left text-sm space-y-2 text-slate-800">
                  {submittedRefId && (
                    <p className="font-mono text-xs text-[#D96B43] font-bold pb-2 border-b border-slate-100">
                      {t.form.refLabel}: {submittedRefId}
                    </p>
                  )}
                  <p><strong>{t.form.labels.contact}:</strong> {submittedData.name}</p>
                  <p><strong>{t.form.labels.company}:</strong> {submittedData.company}</p>
                  <p><strong>{t.form.labels.email}:</strong> {submittedData.email}</p>
                  <p><strong>{t.form.labels.phone}:</strong> {submittedData.phone}</p>
                  <p><strong>{t.form.labels.zone}:</strong> {submittedData.region} ({submittedData.size})</p>
                  <p><strong>{t.form.labels.challenge}:</strong> {submittedData.priority}</p>
                  {submittedData.notes && <p><strong>{t.form.labels.notes}:</strong> {submittedData.notes}</p>}
                </div>

                <div className="flex flex-wrap justify-center gap-3">
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildSummaryText(submittedData))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 rounded-lg bg-[#25D366] hover:bg-[#1ebe5d] text-slate-950 font-bold text-sm transition-colors"
                  >
                    {t.form.confWa}
                  </a>
                  <a
                    href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
                      lang === 'fr'
                        ? `Diagnostic Flash OpEx Lean - ${submittedData.company}`
                        : `Diagnóstico Flash OpEx Lean - ${submittedData.company}`
                    )}&body=${encodeURIComponent(buildSummaryText(submittedData))}`}
                    className="px-5 py-3 rounded-lg bg-[#0F172A] hover:bg-slate-800 text-white font-semibold text-sm transition-colors"
                  >
                    {t.form.confMail}
                  </a>
                </div>

                <div className="flex items-center justify-center gap-6 text-xs">
                  <button
                    type="button"
                    onClick={handleCopySummary}
                    className="inline-flex items-center gap-1.5 font-semibold text-[#D96B43] hover:underline cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedSummary ? t.form.confCopied : t.form.confCopy}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmittedData(null);
                      setSubmittedRefId(null);
                      setCopiedSummary(false);
                    }}
                    className="font-medium text-slate-500 hover:text-slate-900 underline cursor-pointer"
                  >
                    {t.form.confReset}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* FAQ */}
          <div id="faq" className="space-y-6 scroll-mt-24">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#D96B43]">{t.faq.kicker}</p>
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-950">{t.faq.title}</h3>
              {t.faq.subtitle && (
                <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">{t.faq.subtitle}</p>
              )}
            </div>

            {t.faq.categories && (
              <div className="flex flex-wrap items-center gap-2 pt-1" role="tablist" aria-label="Categorias FAQ">
                {t.faq.categories.map((cat) => {
                  const isSelected = activeFaqCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => {
                        setActiveFaqCategory(cat.id);
                        setOpenFaqIdx(null);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[#0F172A] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-950'
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            )}

            <div className="divide-y divide-slate-200 border-t border-b border-slate-200">
              {t.faq.items
                .filter((item) => activeFaqCategory === 'all' || item.category === activeFaqCategory)
                .map((item, idx) => {
                  const isOpen = openFaqIdx === idx;
                  const answerId = `faq-answer-${idx}`;
                  const categoryObj = t.faq.categories?.find((c) => c.id === item.category);
                  return (
                    <div key={item.q} className="py-2">
                      <button
                        type="button"
                        onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                        aria-expanded={isOpen}
                        aria-controls={answerId}
                        className="w-full py-3.5 flex items-start justify-between gap-4 text-left group cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D96B43]"
                      >
                        <div className="space-y-1">
                          {categoryObj && activeFaqCategory === 'all' && (
                            <span className="inline-block text-[10px] font-mono font-semibold uppercase tracking-wider text-[#D96B43] bg-orange-50 px-2 py-0.5 rounded border border-orange-200/60">
                              {categoryObj.label}
                            </span>
                          )}
                          <h4
                            className={`font-semibold text-base transition-colors leading-snug ${
                              isOpen ? 'text-[#D96B43]' : 'text-slate-950 group-hover:text-[#D96B43]'
                            }`}
                          >
                            {item.q}
                          </h4>
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 shrink-0 mt-1 transition-transform duration-200 ${
                            isOpen ? 'rotate-180 text-[#D96B43]' : 'text-slate-400 group-hover:text-slate-700'
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div id={answerId} className="pb-5 pr-8 pl-1">
                          <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200/70">
                            {item.a}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
