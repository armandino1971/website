import { FormEvent, useEffect, useState } from 'react';
import {
  ArrowRight,
  Check,
  Copy,
  Lock,
  Printer,
  ShieldCheck,
  X,
} from 'lucide-react';
import { AppView, DiagnosticSubmission, IndustrialTool, Language, ToolCategory } from '../types';
import {
  CONTACT_EMAIL,
  homeCopy,
  industrialTools,
  LINKEDIN_URL,
  WHATSAPP_NUMBER,
} from '../data/homeData';

interface HomeViewProps {
  lang: Language;
  onChangeLang: (lang: Language) => void;
  onNavigate: (view: AppView, sectionId?: string) => void;
}

export function HomeView({ lang, onChangeLang, onNavigate }: HomeViewProps) {
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
  const [submittedData, setSubmittedData] = useState<DiagnosticSubmission | null>(null);
  const [copiedSummary, setCopiedSummary] = useState(false);

  // Sync select defaults when language changes if untouched
  useEffect(() => {
    setFormState((prev) => ({
      ...prev,
      region: homeCopy[lang].form.regions[0],
      size: homeCopy[lang].form.sizes[1],
      priority: homeCopy[lang].form.priorities[0],
    }));
  }, [lang]);

  // Close tool modal on Escape
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedTool(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const filteredTools =
    toolFilter === 'all'
      ? industrialTools
      : industrialTools.filter((item) => item.category === toolFilter);

  const handleTransferRoiToForm = () => {
    const prefix =
      lang === 'fr'
        ? `[Simulation ROI : ${operators} opérateurs | Potentiel estimé : ${quarterSavings.toLocaleString('fr-FR')} € / 90j] `
        : `[Simulação ROI: ${operators} operadores | Potencial estimado: ${quarterSavings.toLocaleString('fr-FR')} € / 90d] `;
    setFormState((prev) => ({
      ...prev,
      notes: prev.notes.startsWith('[Simul') ? prev.notes : `${prefix}${prev.notes}`,
    }));
    const el = document.getElementById('diagnostico');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormError('');

    const name = formState.name.trim();
    const company = formState.company.trim();
    const email = formState.email.trim();
    const phone = formState.phone.trim();

    if (!name || !company || !email || !phone) {
      setFormError(t.form.errRequired);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFormError(t.form.errEmail);
      return;
    }

    setSubmittedData({ ...formState, name, company, email, phone, notes: formState.notes.trim() });
    setCopiedSummary(false);
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16 lg:pb-24">
          {/* Sub-header Utility Line: Language Switcher + Regional Presence */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-slate-200/80 mb-10 lg:mb-14">
            <p className="text-xs sm:text-sm font-medium text-slate-600">{t.hero.regionLine}</p>
            <div className="inline-flex items-center p-1 rounded-lg bg-slate-200/70 border border-slate-300/60" role="group" aria-label="Language selector">
              <button
                type="button"
                onClick={() => onChangeLang('pt')}
                className={`px-3 py-1 text-xs font-mono font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  lang === 'pt' ? 'bg-white text-slate-950 shadow-xs' : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                PT-PT
              </button>
              <button
                type="button"
                onClick={() => onChangeLang('fr')}
                className={`px-3 py-1 text-xs font-mono font-semibold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                  lang === 'fr' ? 'bg-white text-slate-950 shadow-xs' : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                FR
              </button>
            </div>
          </div>

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
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#D96B43] hover:bg-[#B8532D] text-white font-semibold text-sm sm:text-base transition-colors whitespace-nowrap"
                >
                  <span>{t.hero.ctaPrimary}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#simulador"
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

            {/* Right Commitment Surface */}
            <div className="lg:col-span-5 bg-[#0F172A] text-white rounded-2xl border border-slate-800 p-6 sm:p-8 flex flex-col justify-between">
              <div className="flex items-start justify-between gap-4 pb-5 border-b border-slate-800">
                <div>
                  <p className="text-xs font-semibold text-[#D96B43] uppercase tracking-wider">
                    {t.hero.panelTitle}
                  </p>
                  <p className="font-display font-bold text-lg text-white mt-1">
                    {t.hero.panelSubtitle}
                  </p>
                </div>
                <span className="font-mono text-xs font-bold text-emerald-400 tabular-nums whitespace-nowrap">
                  {t.hero.panelTag}
                </span>
              </div>

              <div className="divide-y divide-slate-800 my-2">
                {t.hero.metrics.map((m) => (
                  <div key={m.label} className="py-4 flex items-start gap-4">
                    <span className="font-mono font-bold text-xl text-[#D96B43] tabular-nums w-14 shrink-0">
                      {m.value}
                    </span>
                    <div>
                      <h2 className="font-semibold text-sm text-white">{m.label}</h2>
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
      <section id="abordagem" className="py-20 lg:py-24 bg-white border-b border-slate-200 scroll-mt-16">
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
      <section id="metodologia" className="py-20 lg:py-24 bg-[#F8F9FA] border-b border-slate-200 scroll-mt-16">
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
                className="px-5 py-3 rounded-lg bg-[#D96B43] hover:bg-[#B8532D] text-white font-semibold text-sm transition-colors whitespace-nowrap shrink-0"
              >
                {t.roadmap.guaranteeCta}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FOUNDER, REAL CASE STUDIES & RECOMMENDATIONS */}
      <section id="fundador" className="py-20 lg:py-24 bg-white border-b border-slate-200 scroll-mt-16">
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
                      <img
                        src="/assets/aistudio/armandino_3d0f8cc6.png"
                        alt="Armandino Seixas"
                        referrerPolicy="no-referrer"
                        onError={() => setPortraitError(true)}
                        className="w-full h-full object-cover"
                      />
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

          {/* Real Case Studies (Adjacent Proof) */}
          <div>
            <div className="max-w-3xl mb-10">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#D96B43]">{t.cases.kicker}</p>
              <h2 className="font-display font-extrabold text-3xl text-slate-950 mt-2">{t.cases.title}</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {t.cases.items.map((c) => (
                <article key={c.title} className="bg-[#F8F9FA] rounded-2xl border border-slate-200 p-7 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-3">
                      <span className="font-semibold text-[#D96B43]">{c.sector}</span>
                      <span aria-hidden="true">·</span>
                      <span>{c.meta}</span>
                    </div>
                    <h3 className="font-display font-bold text-lg text-slate-950 mb-2">{c.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{c.desc}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-200 flex items-baseline justify-between">
                    <div>
                      <span className="font-mono font-extrabold text-2xl text-slate-950 tabular-nums">{c.metric}</span>
                      <span className="block text-xs text-slate-500 mt-0.5">{c.metricLabel}</span>
                    </div>
                    <span className="text-xs font-mono text-slate-600">{c.method}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Attributable Recommendations */}
          <div>
            <div className="max-w-3xl mb-10">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#D96B43]">{t.testimonials.kicker}</p>
              <h2 className="font-display font-extrabold text-3xl text-slate-950 mt-2">{t.testimonials.title}</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {t.testimonials.items.map((rec) => (
                <blockquote
                  key={rec.author}
                  className="bg-white rounded-2xl border border-slate-200 p-7 flex flex-col justify-between"
                >
                  <p className="text-sm text-slate-700 leading-relaxed italic mb-6">{rec.quote}</p>
                  <footer className="flex items-center gap-3 pt-4 border-t border-slate-100">
                    <div className="w-9 h-9 rounded-full bg-[#0F172A] text-white font-mono text-xs font-bold flex items-center justify-center shrink-0">
                      {rec.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-slate-950">{rec.author}</p>
                      <p className="text-xs text-slate-500">
                        {rec.role} · {rec.org}
                      </p>
                    </div>
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE ROI SIMULATOR */}
      <section id="simulador" className="py-20 lg:py-24 bg-[#0F172A] text-white scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                      {recoveredHours.toLocaleString('fr-FR')}{' '}
                      <span className="text-sm font-normal text-slate-400">{t.simulator.resHoursUnit}</span>
                    </p>
                  </div>
                  <div className="bg-[#0F172A] border border-[#D96B43]/50 rounded-xl p-5">
                    <p className="text-xs text-[#D96B43] uppercase font-medium">{t.simulator.resSavings}</p>
                    <p className="font-mono font-extrabold text-3xl text-emerald-400 mt-2 tabular-nums">
                      {quarterSavings.toLocaleString('fr-FR')} €
                    </p>
                  </div>
                </div>

                <div className="bg-[#0F172A] border border-slate-800 rounded-xl p-5">
                  <p className="text-xs text-slate-300">{t.simulator.resAnnualLabel}</p>
                  <p className="font-mono font-bold text-2xl text-white mt-1 tabular-nums">
                    {annualSavings.toLocaleString('fr-FR')} €{' '}
                    <span className="text-xs font-sans font-normal text-slate-400">{t.simulator.resAnnualSub}</span>
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={handleTransferRoiToForm}
                    className="flex-1 px-5 py-3.5 rounded-lg bg-[#D96B43] hover:bg-[#B8532D] text-white font-semibold text-sm transition-colors cursor-pointer"
                  >
                    {t.simulator.cta}
                  </button>
                  <button
                    type="button"
                    onClick={() => window.print()}
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
      <section id="ferramentas" className="py-20 lg:py-24 bg-[#F8F9FA] border-b border-slate-200 scroll-mt-16">
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
                    <span className="font-mono font-semibold text-[#D96B43] tabular-nums">{tool.kpi}</span>
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
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                  <span>{selectedTool.tag[lang]}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono font-semibold text-[#D96B43]">{selectedTool.kpi}</span>
                </div>
                <h3 id="home-tool-modal-title" className="font-display font-extrabold text-2xl text-slate-950">
                  {selectedTool.title[lang]}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTool(null)}
                aria-label="Fechar"
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
              onClick={() => setSelectedTool(null)}
              className="block w-full text-center px-6 py-3.5 rounded-lg bg-[#D96B43] hover:bg-[#B8532D] text-white font-semibold text-sm transition-colors"
            >
              {t.toolsSection.modalCta}
            </a>
          </div>
        </div>
      )}

      {/* 7. DIAGNOSTIC FORM & FAQ */}
      <section id="diagnostico" className="py-20 lg:py-24 bg-white scroll-mt-16">
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
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder={t.form.namePh}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:border-[#D96B43]"
                    />
                  </div>
                  <div>
                    <label htmlFor="f-company" className="block text-sm font-semibold text-slate-900 mb-1.5">
                      {t.form.companyLabel}
                    </label>
                    <input
                      id="f-company"
                      type="text"
                      required
                      value={formState.company}
                      onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                      placeholder={t.form.companyPh}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:border-[#D96B43]"
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
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder={t.form.emailPh}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:border-[#D96B43]"
                    />
                  </div>
                  <div>
                    <label htmlFor="f-phone" className="block text-sm font-semibold text-slate-900 mb-1.5">
                      {t.form.phoneLabel}
                    </label>
                    <input
                      id="f-phone"
                      type="tel"
                      required
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      placeholder={t.form.phonePh}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:border-[#D96B43]"
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
                    className="w-full px-6 py-4 rounded-lg bg-[#D96B43] hover:bg-[#B8532D] text-white font-bold text-base transition-colors cursor-pointer"
                  >
                    {t.form.submit}
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
                    onClick={() => setSubmittedData(null)}
                    className="font-medium text-slate-500 hover:text-slate-900 underline cursor-pointer"
                  >
                    {t.form.confReset}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* FAQ */}
          <div className="space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#D96B43]">{t.faq.kicker}</p>
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-950 mt-1">{t.faq.title}</h3>
            </div>
            <div className="divide-y divide-slate-200 border-t border-b border-slate-200">
              {t.faq.items.map((item) => (
                <div key={item.q} className="py-5">
                  <h4 className="font-semibold text-base text-slate-950">{item.q}</h4>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
