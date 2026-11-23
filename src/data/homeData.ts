import { IndustrialTool, Language } from '../types';

export const WHATSAPP_NUMBER = '351912771681';
export const CONTACT_EMAIL = 'Geral@opex-lean.eu';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/armandino-seixas-lean-performance-advisor/';

export const industrialTools: IndustrialTool[] = [
  {
    id: '5s',
    category: 'qual',
    tag: { pt: 'Qualidade & Organização', fr: 'Qualité & Organisation' },
    title: { pt: '5S Operacional', fr: '5S Opérationnel' },
    kpi: '-25% tempo procura',
    summary: {
      pt: 'Organização visual rigorosa dos postos de trabalho para eliminar perdas de tempo e melhorar a segurança.',
      fr: 'Organisation visuelle rigoureuse des postes de travail pour éliminer les pertes de temps et renforcer la sécurité.',
    },
    steps: {
      pt: [
        '1. Seiri (Triagem): Separar o necessário do supérfluo no posto.',
        '2. Seiton (Arrumação): Um lugar para cada ferramenta com sombras visuais.',
        '3. Seiso (Limpeza): Limpar para inspecionar e detetar anomalias.',
        '4. Seiketsu (Normalização): Criar padrões fotográficos claros.',
        '5. Shitsuke (Disciplina): Auditoria rápida de 5 min por semana.',
      ],
      fr: [
        '1. Seiri (Trier) : Séparer l’utile de l’inutile au poste.',
        '2. Seiton (Ranger) : Une place pour chaque outil avec repères visuels.',
        '3. Seiso (Nettoyer) : Nettoyer pour inspecter et détecter les fuites/anomalies.',
        '4. Seiketsu (Standardiser) : Créer des standards visuels photographiques.',
        '5. Shitsuke (Maintenir) : Audit flash de 5 min chaque semaine.',
      ],
    },
  },
  {
    id: 'smed',
    category: 'prod',
    tag: { pt: 'Produção & Fluxo', fr: 'Production & Flux' },
    title: { pt: 'SMED (Troca Rápida de Série)', fr: 'SMED (Changement Rapide de Série)' },
    kpi: '-40% a -60% setup',
    summary: {
      pt: 'Redução drástica do tempo de paragem de máquina entre duas referências para aumentar a flexibilidade.',
      fr: 'Réduction drastique des temps d’arrêt machine entre deux séries pour gagner en flexibilité et capacité.',
    },
    steps: {
      pt: [
        '1. Filmar e cronometrar uma troca de série real no Gemba.',
        '2. Separar operações internas (máquina parada) das externas (máquina a trabalhar).',
        '3. Converter operações internas em externas (pré-aquecimento, preparação de ferramentas).',
        '4. Simplificar fixações (substituir parafusos por apertos rápidos).',
      ],
      fr: [
        '1. Filmer et chronométrer un changement de série réel au Gemba.',
        '2. Séparer les opérations internes (machine arrêtée) des externes (machine en marche).',
        '3. Convertir les opérations internes en externes (préparation des outillages).',
        '4. Simplifier les bridages (remplacer les vis par des serrages rapides).',
      ],
    },
  },
  {
    id: 'sqcdp',
    category: 'man',
    tag: { pt: 'Management & Ritmos', fr: 'Management & Rituels' },
    title: { pt: 'Gestão Visual SQCDP & AIC', fr: 'Management Visuel SQCDP & AIC' },
    kpi: '15 min / dia',
    summary: {
      pt: 'Quadros físicos no chão de fábrica (Segurança, Qualidade, Custos, Prazos, Pessoas) para rituais diários.',
      fr: 'Tableaux physiques en atelier (Sécurité, Qualité, Coûts, Délais, Personnel) pour animer les rituels quotidiens.',
    },
    steps: {
      pt: [
        '1. Instalar um quadro branco simples no coração da oficina.',
        '2. Atualizar indicadores a verde/vermelho pelos próprios operadores.',
        '3. Realizar reunião de pé de 15 min todos os dias à mesma hora.',
        '4. Registar cada desvio num plano de ação imediato com responsável e prazo.',
      ],
      fr: [
        '1. Installer un tableau blanc simple au cœur de l’atelier.',
        '2. Mettre à jour les indicateurs en vert/rouge par les opérateurs eux-mêmes.',
        '3. Tenir le point debout de 15 min chaque jour à heure fixe.',
        '4. Noter chaque écart dans un plan d’action immédiat avec pilote et délai.',
      ],
    },
  },
  {
    id: 'vsm',
    category: 'prod',
    tag: { pt: 'Produção & Fluxo', fr: 'Production & Flux' },
    title: { pt: 'VSM (Mapeamento do Fluxo de Valor)', fr: 'VSM (Cartographie de la Chaîne de Valeur)' },
    kpi: '-35% Lead Time',
    summary: {
      pt: 'Visualização ponta-a-ponta do fluxo de materiais e informação desde a receção até à expedição.',
      fr: 'Visualisation de bout en bout des flux physiques et d’information de la réception jusqu’à l’expédition.',
    },
    steps: {
      pt: [
        '1. Percorrer fisicamente o fluxo de produto do fim para o início.',
        '2. Medir tempos de ciclo, tempos de espera e níveis de stock intermédio.',
        '3. Identificar os gargalos que ditam o ritmo real da fábrica.',
        '4. Desenhar o fluxo futuro puxado (Pull) e lançar os projetos Kaizen.',
      ],
      fr: [
        '1. Parcourir physiquement le flux produit de l’expédition vers la réception.',
        '2. Mesurer les temps de cycle, temps d’attente et encours (WIP).',
        '3. Identifier les goulots d’étranglement qui dictent la cadence réelle.',
        '4. Dessiner le flux futur tiré (Pull) et lancer les chantiers Kaizen.',
      ],
    },
  },
  {
    id: 'a3',
    category: 'qual',
    tag: { pt: 'Qualidade & Organização', fr: 'Qualité & Organisation' },
    title: { pt: 'Resolução de Problemas A3 & 5 Porquês', fr: 'Résolution de Problèmes A3 & 5 Pourquoi' },
    kpi: 'Zero recorrência',
    summary: {
      pt: 'Método estruturado numa única folha A3 para erradicar a causa raiz dos defeitos e avarias.',
      fr: 'Méthode structurée sur une seule page A3 pour éradiquer définitivement la cause racine des défauts et pannes.',
    },
    steps: {
      pt: [
        '1. Definir o problema com factos e dados observados no Gemba.',
        '2. Analisar as causas através do diagrama Ishikawa e dos 5 Porquês.',
        '3. Testar contramedidas simples no terreno antes de investir.',
        '4. Padronizar a solução para evitar que o problema regresse.',
      ],
      fr: [
        '1. Définir le problème avec des faits et données observés au Gemba.',
        '2. Analyser les causes via Ishikawa et les 5 Pourquoi.',
        '3. Tester des contre-mesures simples sur le terrain avant d’investir.',
        '4. Standardiser la solution pour empêcher toute récurrence.',
      ],
    },
  },
  {
    id: 'kanban',
    category: 'prod',
    tag: { pt: 'Produção & Fluxo', fr: 'Production & Flux' },
    title: { pt: 'Kanban & Fluxo Puxado', fr: 'Kanban & Flux Tiré' },
    kpi: '-30% stock intermédio',
    summary: {
      pt: 'Sistema visual de reposição automática baseado no consumo real, eliminando ruturas e excesso de stock.',
      fr: 'Système visuel de réapprovisionnement basé sur la consommation réelle, éliminant ruptures et surstocks.',
    },
    steps: {
      pt: [
        '1. Definir as referências de consumo regular (Classe A/B).',
        '2. Calcular o ponto de encomenda e o tamanho do contentor.',
        '3. Implementar cartões físicos ou caixas duplas (Two-Bin) nos postos.',
        '4. Disciplinar a reposição sem necessidade de ordens informáticas complexas.',
      ],
      fr: [
        '1. Identifier les références à consommation régulière (Classe A/B).',
        '2. Dimensionner le stock tampon et la taille des bacs.',
        '3. Déployer des cartes physiques ou bacs doubles (Two-Bin) aux postes.',
        '4. Règles simples de réapprovisionnement sans saisie informatique lourde.',
      ],
    },
  },
  {
    id: 'gemba',
    category: 'man',
    tag: { pt: 'Management & Ritmos', fr: 'Management & Rituels' },
    title: { pt: 'Gemba Walk Estruturado', fr: 'Gemba Walk Structuré' },
    kpi: 'Liderança no terreno',
    summary: {
      pt: 'Ronda diária da chefia no chão de fábrica para apoiar as equipas, verificar padrões e remover obstáculos.',
      fr: 'Tournée quotidienne du management en atelier pour soutenir les équipes, vérifier les standards et lever les blocages.',
    },
    steps: {
      pt: [
        '1. Definir um percurso fixo e horário diário sem telemóvel.',
        '2. Fazer 3 perguntas-chave: Qual é o padrão? Qual é a realidade? Que ajuda precisa?',
        '3. Valorizar as sugestões de melhoria dos operadores.',
        '4. Resolver os bloqueios sistémicos em menos de 48 horas.',
      ],
      fr: [
        '1. Définir un parcours fixe et un créneau quotidien sans téléphone.',
        '2. Poser 3 questions clés : Quel est le standard ? Quelle est la réalité ? De quelle aide avez-vous besoin ?',
        '3. Valoriser les idées d’amélioration des opérateurs.',
        '4. Lever les blocages systémiques en moins de 48 heures.',
      ],
    },
  },
];

export const homeCopy: Record<Language, {
  nav: {
    approach: string;
    methodology: string;
    principles: string;
    roi: string;
    tools: string;
    cta: string;
  };
  hero: {
    regionLine: string;
    guarantee: string;
    title1: string;
    title2: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    ctaPrinciples: string;
    panelTitle: string;
    panelSubtitle: string;
    panelTag: string;
    metrics: { value: string; label: string; desc: string }[];
  };
  comparison: {
    kicker: string;
    title: string;
    subtitle: string;
    tradTag: string;
    tradTitle: string;
    tradItems: string[];
    opexTag: string;
    opexTitle: string;
    opexItems: { lead: string; text: string }[];
  };
  methodology: {
    kicker: string;
    title: string;
    subtitle: string;
    steps: { num: string; phase: string; title: string; desc: string }[];
  };
  roadmap: {
    kicker: string;
    title: string;
    subtitle: string;
    phases: { num: string; days: string; title: string; desc: string; bullets: string[] }[];
    guaranteeTitle: string;
    guaranteeDesc: string;
    guaranteeCta: string;
  };
  founder: {
    kicker: string;
    role: string;
    location: string;
    bio: string;
    stats: { value: string; label: string }[];
    expTitle: string;
    expDesc: string;
    sectors: string[];
    quote: string;
    linkedinBtn: string;
  };
  cases: {
    kicker: string;
    title: string;
    items: { sector: string; meta: string; title: string; desc: string; metric: string; metricLabel: string; method: string }[];
  };
  testimonials: {
    kicker: string;
    title: string;
    items: { initials: string; quote: string; author: string; role: string; org: string }[];
  };
  simulator: {
    kicker: string;
    title: string;
    subtitle: string;
    sectorLabel: string;
    sectors: { value: number; label: string }[];
    opsLabel: string;
    costLabel: string;
    resHeader: string;
    resNote: string;
    resHours: string;
    resHoursUnit: string;
    resSavings: string;
    resAnnualLabel: string;
    resAnnualSub: string;
    cta: string;
    printBtn: string;
  };
  toolsSection: {
    kicker: string;
    title: string;
    subtitle: string;
    filters: { key: 'all' | 'prod' | 'qual' | 'man'; label: string }[];
    cardAction: string;
    modalStepHeader: string;
    modalCta: string;
  };
  form: {
    kicker: string;
    title: string;
    subtitle: string;
    nameLabel: string;
    namePh: string;
    companyLabel: string;
    companyPh: string;
    emailLabel: string;
    emailPh: string;
    phoneLabel: string;
    phonePh: string;
    regionLabel: string;
    regions: string[];
    sizeLabel: string;
    sizes: string[];
    priorityLabel: string;
    priorities: string[];
    notesLabel: string;
    notesPh: string;
    submit: string;
    privacyNote: string;
    errRequired: string;
    errEmail: string;
    confTitle: string;
    confDesc: string;
    confWa: string;
    confMail: string;
    confCopy: string;
    confCopied: string;
    confReset: string;
    labels: {
      contact: string;
      company: string;
      email: string;
      phone: string;
      zone: string;
      team: string;
      challenge: string;
      notes: string;
    };
  };
  faq: {
    kicker: string;
    title: string;
    items: { q: string; a: string }[];
  };
  footer: {
    desc: string;
    navTitle: string;
    zonesTitle: string;
    zones: string[];
    contactTitle: string;
    seoLine: string;
    rights: string;
    privacy: string;
    cookies: string;
  };
  cookie: {
    title: string;
    desc: string;
    more: string;
    reject: string;
    accept: string;
  };
}> = {
  pt: {
    nav: {
      approach: 'Abordagem',
      methodology: 'Metodologia',
      principles: '9 Princípios',
      roi: 'Simulador ROI',
      tools: 'Ferramentas',
      cta: 'Agendar Diagnóstico',
    },
    hero: {
      regionLine: 'Portugal (Lisboa, Porto, Aveiro, Leiria, Braga) · França (Île-de-France, Rhône-Alpes, Grand Est)',
      guarantee: 'Garantia contratual de reembolso de 50% se os KPIs não forem atingidos em 90 dias',
      title1: 'Sem teoria, no terreno.',
      title2: 'Resultados em 90 dias.',
      subtitle:
        'Consultoria prática de Excelência Operacional e Lean Manufacturing para PMEs industriais e logísticas. 90% no Gemba (chão de fábrica) e apenas 10% em sala — libertando margem EBITDA e tesouraria.',
      ctaPrimary: 'Agendar Diagnóstico Gratuito',
      ctaSecondary: 'Simular Ganhos (ROI)',
      ctaPrinciples: 'Explorar os 9 Princípios & Radar 1–9',
      panelTitle: 'Compromisso Operacional',
      panelSubtitle: 'Impacto direto em EBITDA e Cash',
      panelTag: 'ROI < 3 Meses',
      metrics: [
        {
          value: '90%',
          label: 'No Chão de Fábrica (Gemba)',
          desc: 'Lado a lado com operadores e chefes de equipa, resolvendo gargalos reais.',
        },
        {
          value: '90d',
          label: 'Para Retorno & Cash (ROI)',
          desc: 'Redução imediata de desperdícios (Muda), stocks intermédios e retrabalho.',
        },
        {
          value: '15m',
          label: 'Kaizen Diário (AIC)',
          desc: 'Rituais curtos de pé junto aos quadros visuais para alinhar a produção.',
        },
        {
          value: '50%',
          label: 'Garantia de Reembolso',
          desc: '3 KPIs acordados no Dia 15. Risco partilhado por contrato aos 90 dias.',
        },
      ],
    },
    comparison: {
      kicker: 'A Realidade das PMEs Industriais',
      title: 'Porquê o Lean Tradicional Falha nas PMEs?',
      subtitle:
        'Importar modelos rígidos de multinacionais não funciona quando cada colaborador é essencial e o orçamento é controlado ao cêntimo.',
      tradTag: 'O Modelo Antigo',
      tradTitle: 'Consultoria Tradicional',
      tradItems: [
        '80% do tempo em salas de reunião com apresentações PowerPoint teóricas.',
        'Exige compra de softwares ERP/MES caros e complexos antes de arrumar a casa.',
        'Jargão técnico incompreensível que gera resistência nos operadores.',
        'Faturação à hora sem qualquer compromisso sobre os resultados alcançados.',
      ],
      opexTag: 'Pragmatismo Industrial',
      opexTitle: 'Abordagem OpEx Lean',
      opexItems: [
        { lead: '90% no Gemba:', text: 'Botas calçadas na linha de produção a resolver problemas reais.' },
        { lead: 'Zero Software Requerido:', text: 'Gestão visual física (quadros, cartões, marcações) de baixo custo.' },
        { lead: 'Cultura Local:', text: 'Linguagem direta, respeito pelas pessoas e envolvimento da equipa.' },
        { lead: 'Garantia Contratual:', text: 'Reembolso de 50% se não atingirmos os KPIs acordados em 90 dias.' },
      ],
    },
    methodology: {
      kicker: 'Metodologia Pragmática',
      title: 'Da observação no terreno aos ganhos financeiros sustentáveis',
      subtitle:
        'Uma abordagem estruturada em 4 etapas que mobiliza chefes de equipa, operadores e funções de suporte em torno de uma linguagem comum.',
      steps: [
        {
          num: '01.',
          phase: 'Dias 1 a 15',
          title: 'Imersão Gemba',
          desc: 'Observação direta dos fluxos físicos e de informação, cronometragem real, eliminação de desperdícios (Muda) e escuta ativa dos operadores.',
        },
        {
          num: '02.',
          phase: 'Mês 1',
          title: 'Supervisão Ativa',
          desc: 'Implementação de rondas estruturadas no terreno e rituais AIC (Animação a Intervalo Curto) para detetar e corrigir desvios no próprio dia.',
        },
        {
          num: '03.',
          phase: 'Mês 2',
          title: 'Projetos Kaizen Direcionados',
          desc: 'Aplicação rápida de SMED, 5S, reorganização de células e balanceamento de postos com ganhos imediatos no OEE (TRS) e prazos de entrega.',
        },
        {
          num: '04.',
          phase: 'Mês 3',
          title: 'Formação Terreno & Autonomia',
          desc: 'Formação prática no terreno (Zero Slides) e coaching individual aos chefes de equipa para que a melhoria contínua prossiga após a nossa saída.',
        },
      ],
    },
    roadmap: {
      kicker: 'Plano de Ação Estruturado',
      title: 'Roteiro de Transformação em 90 Dias',
      subtitle: 'Um método progressivo desenhado para gerar vitórias rápidas sem perturbar as entregas aos seus clientes.',
      phases: [
        {
          num: '01',
          days: 'Dias 1 a 15',
          title: 'Diagnóstico Flash no Terreno',
          desc: 'Imersão imediata no chão de fábrica através de Gemba Walks para identificar os 7 desperdícios (Muda): stocks intermédios, deslocações e tempos de espera.',
          bullets: ['Mapeamento simplificado de fluxos (VSM)', 'Definição de 3 KPIs alvo com a gerência'],
        },
        {
          num: '02',
          days: 'Mês 1 a 2',
          title: 'Fundações 5S & Gestão Visual',
          desc: 'Organização física dos postos piloto, criação de padrões visuais de segurança e arranque dos rituais Kaizen diários de 15 minutos com os chefes de equipa.',
          bullets: ['Implementação 5S nos gargalos críticos', 'Instalação de quadros visuais SQCDP'],
        },
        {
          num: '03',
          days: 'Mês 3',
          title: 'Autonomia & Validação ROI',
          desc: 'Formação prática das equipas internas na resolução de problemas A3 para que a melhoria continue sozinha após a nossa saída. Balanço financeiro dos ganhos.',
          bullets: ['Equipas autónomas no método A3', 'Auditoria final de ROI em 90 dias'],
        },
      ],
      guaranteeTitle: 'Garantia Risco Zero: Reembolso de 50% dos Custos do Projeto',
      guaranteeDesc:
        'Definimos 3 metas mensuráveis no Dia 15. Se os objetivos acordados não forem atingidos em 90 dias, reembolsamos 50% do valor pago pelo acompanhamento.',
      guaranteeCta: 'Validar Elegibilidade',
    },
    founder: {
      kicker: '+25 Anos de Experiência Executiva & Lean',
      role: 'Senior Advisor · Excelência Operacional',
      location: 'Oeiras / Lisboa, Portugal · FR · PT · EN · ES',
      bio: 'Ex-diretor de instalações industriais e da cadeia de abastecimento (metalurgia de ponta, distribuição, indústria transformadora). Com base entre Lisboa e França, intervenho diretamente junto às máquinas para transformar os hábitos de gestão e consolidar ganhos sustentáveis.',
      stats: [
        { value: '+25', label: 'Anos de experiência executiva' },
        { value: '+30%', label: 'Produtividade industrial' },
        { value: '+25%', label: 'Crescimento de EBITDA' },
      ],
      expTitle: 'O Rigor dos Grandes Grupos Aplicado às PMEs',
      expDesc:
        'Ao longo de mais de duas décadas em cargos de Direção Geral e consultoria internacional, liderou transformações operacionais críticas em múltiplos setores exigentes:',
      sectors: [
        'Aeronáutica',
        'Produtos de Luxo',
        'Química',
        'Agroalimentar',
        'Distribuição',
        'Indústria & Fundição',
        'Cimento',
        'Banca & Seguros',
      ],
      quote: '"Transformo as organizações melhorando os seus comportamentos, as suas rotinas e os seus resultados — não acrescentando slides."',
      linkedinBtn: 'Perfil LinkedIn',
    },
    cases: {
      kicker: 'Track Record Comprovado · Confidencialidade Garantida',
      title: 'Casos Reais & Resultados no Terreno',
      items: [
        {
          sector: 'Aeronáutica',
          meta: 'Excelência Operacional',
          title: 'Supervisão Ativa & Pólos de Fluxo',
          desc: 'Implementação de rituais de gestão diários, matrizes RACI e pilotagem transversal entre produção e logística.',
          metric: '+30%',
          metricLabel: 'Produtividade',
          method: 'Rituais & RACI',
        },
        {
          sector: 'Química',
          meta: 'Relançamento Unidade',
          title: 'Otimização Industrial',
          desc: 'Redefinição da organização no chão de fábrica e revisão profunda do planeamento operacional.',
          metric: '+300%',
          metricLabel: 'Volume produção',
          method: 'Planeamento',
        },
        {
          sector: 'Indústria',
          meta: 'Performance Produção',
          title: 'Projetos Kaizen & Proximidade',
          desc: 'Lançamento de projetos Kaizen de eliminação de desperdícios críticos e formação prática de supervisores.',
          metric: '+25%',
          metricLabel: 'Aumento de EBITDA',
          method: 'Kaizen & Margem',
        },
      ],
    },
    testimonials: {
      kicker: 'Recomendações Executivas',
      title: 'O Que Dizem os Diretores Gerais',
      items: [
        {
          initials: 'WB',
          quote:
            '"Armandino soube incutir uma verdadeira cultura de desempenho operacional e rigor no terreno. A sua capacidade de mobilizar as equipas em torno de indicadores simples permitiu alcançar um patamar decisivo."',
          author: 'Wouter De Backer',
          role: 'Directeur Général',
          org: 'Action France',
        },
        {
          initials: 'CM',
          quote:
            '"Um líder de terreno pragmático, exigente e profundamente humano. Armandino possui o talento raro de traduzir uma visão estratégica em rotinas operacionais diárias."',
          author: 'Clément Meslier',
          role: 'Directeur Industriel',
          org: 'Aubert & Duval',
        },
        {
          initials: 'EC',
          quote:
            '"Trabalhar com o Armandino é a garantia de ir direto ao essencial. O seu sentido apurado do Gemba e a sua energia comunicativa desbloqueiam situações complexas em tempo recorde."',
          author: 'Eric Caridroit',
          role: 'Directeur Opérations & Supply Chain',
          org: 'Eramet',
        },
      ],
    },
    simulator: {
      kicker: 'Simulador Interativo PME',
      title: 'Quanto dinheiro perde a sua fábrica em desperdícios (Muda)?',
      subtitle:
        'Em média, uma PME industrial sem rotinas Lean perde entre 18% e 28% da sua capacidade produtiva em micro-paragens, procuras de material, deslocações e retrabalho.',
      sectorLabel: 'Setor de Atividade',
      sectors: [
        { value: 0.22, label: 'Metalomecânica & Estruturas' },
        { value: 0.25, label: 'Automóvel, Plásticos & Moldes' },
        { value: 0.2, label: 'Agroalimentar & Embalagem' },
        { value: 0.21, label: 'Mobiliário, Madeira & Têxtil' },
      ],
      opsLabel: 'Número de Operadores na Produção',
      costLabel: 'Custo Hora Médio (Salário + Encargos + Máquina)',
      resHeader: 'Potencial de Recuperação (90 Dias)',
      resNote: 'Estimativa conservadora (50% do Muda)',
      resHours: 'Horas Produtivas Ganhas',
      resHoursUnit: 'h / trim.',
      resSavings: 'Poupança / Capacidade Extra',
      resAnnualLabel: 'Projeção Anualizada após consolidação:',
      resAnnualSub: 'de margem operacional libertada por ano',
      cta: 'Validar estes números no meu Diagnóstico',
      printBtn: 'Imprimir PDF',
    },
    toolsSection: {
      kicker: 'Caixa de Ferramentas Pragmática',
      title: 'As Fichas de Ferramentas Industriais',
      subtitle: 'Clique numa ferramenta para abrir a ficha técnica detalhada com método de aplicação no terreno.',
      filters: [
        { key: 'all', label: 'Todas (7)' },
        { key: 'prod', label: 'Produção & Fluxo' },
        { key: 'qual', label: 'Qualidade & Organização' },
        { key: 'man', label: 'Management & Ritmos' },
      ],
      cardAction: 'Ver Ficha Técnica',
      modalStepHeader: 'Implementação passo-a-passo no terreno:',
      modalCta: 'Implementar esta ferramenta na minha empresa',
    },
    form: {
      kicker: 'Sem Compromisso · Chamada 20 min ou Visita 2h',
      title: 'Agendar Diagnóstico Flash (2h no Gemba) ou Chamada Exploratória',
      subtitle:
        'Comece por uma conversa confidencial de 20 minutos ou agende uma visita gratuita de 2 horas ao seu chão de fábrica para identificar 3 oportunidades imediatas de ganho e Cash.',
      nameLabel: 'Nome e Cargo *',
      namePh: 'Ex: João Silva, Diretor Industrial',
      companyLabel: 'Empresa *',
      companyPh: 'Ex: Metalúrgica do Centro, Lda',
      emailLabel: 'Email Profissional *',
      emailPh: 'joao@empresa.pt',
      phoneLabel: 'Telefone / Telemóvel *',
      phonePh: '+351 912 345 678',
      regionLabel: 'Distrito / Zona *',
      regions: [
        'Lisboa / Setúbal',
        'Porto / Braga',
        'Aveiro / Coimbra',
        'Leiria / Santarém',
        'Outra Região (Portugal)',
        'França (Todas as regiões)',
      ],
      sizeLabel: 'Dimensão da Equipa',
      sizes: [
        '5 a 15 colaboradores',
        '16 a 30 colaboradores',
        '31 a 50 colaboradores',
        'Mais de 50 colaboradores',
      ],
      priorityLabel: 'Principal Desafio Atual',
      priorities: [
        'Primeiro contacto: Chamada exploratória (20 min)',
        'Atrasos nas entregas / Gargalos',
        'Desorganização / Redução de stocks & Cash',
        'Custos elevados / Defeitos e retrabalho',
        'Formação de chefes de equipa / Autonomia',
      ],
      notesLabel: 'Notas adicionais (Opcional)',
      notesPh: 'Conte-nos brevemente sobre o seu processo produtivo...',
      submit: 'Solicitar Diagnóstico Flash Gratuito',
      privacyNote: 'Resposta em menos de 24h. Confidencialidade absoluta (NDA disponível mediante pedido) & RGPD.',
      errRequired: 'Por favor, preencha os 4 campos obrigatórios (*): Nome, Empresa, Email e Telefone.',
      errEmail: 'Por favor, introduza um endereço de e-mail profissional válido.',
      confTitle: 'Pedido de Diagnóstico Confirmado',
      confDesc: 'Escolha abaixo o canal de envio imediato (WhatsApp ou E-mail) para transmitir os seus dados diretamente a Armandino Seixas:',
      confWa: 'Enviar por WhatsApp',
      confMail: 'Enviar por E-mail',
      confCopy: 'Copiar resumo',
      confCopied: 'Resumo copiado!',
      confReset: 'Efetuar novo pedido',
      labels: {
        contact: 'Contacto',
        company: 'Empresa',
        email: 'Email',
        phone: 'Telefone',
        zone: 'Zona',
        team: 'Equipa',
        challenge: 'Desafio',
        notes: 'Notas',
      },
    },
    faq: {
      kicker: 'Dúvidas Frequentes',
      title: 'Perguntas Frequentes',
      items: [
        {
          q: 'Como funciona exatamente a garantia de reembolso de 50%?',
          a: 'No 15.º dia de intervenção no Gemba, definimos conjuntamente com a gerência 3 indicadores de desempenho (KPIs) mensuráveis. Se passados 90 dias esses objetivos não forem atingidos por falha nossa, reembolsamos 50% do valor pago pelo acompanhamento.',
        },
        {
          q: 'Qual é a zona geográfica de intervenção presencial?',
          a: 'Intervenções presenciais rápidas em todo o território de Portugal (Lisboa, Setúbal, Porto, Braga, Aveiro, Leiria) e em França (Île-de-France, Grand Est, Auvergne-Rhône-Alpes).',
        },
        {
          q: 'É necessário comprar algum software específico (ERP/MES)?',
          a: 'Não. O nosso foco é 100% no chão de fábrica (Gemba). Utilizamos gestão visual física (quadros brancos, marcações no chão, cartões Kanban) de baixíssimo custo e eficácia imediata.',
        },
      ],
    },
    footer: {
      desc: 'Consultoria prática de Excelência Operacional e Lean Manufacturing para PMEs industriais em Portugal e França. 0 Slide, 100% Gemba.',
      navTitle: 'Navegação',
      zonesTitle: 'Zonas de Atuação',
      zones: [
        'Lisboa, Oeiras & Setúbal',
        'Porto, Braga & Norte',
        'Aveiro, Leiria & Centro',
        'França (Île-de-France, Rhône-Alpes, Grand Est)',
      ],
      contactTitle: 'Contactos',
      seoLine:
        'OpEx Lean — Consultoria de Excelência Operacional & Lean Manufacturing (Portugal & França): Kaizen, Gemba, SMED, 5S, SQCDP, VSM, OEE/TRS e Kanban para PMEs industriais.',
      rights: 'Todos os direitos reservados.',
      privacy: 'Política de Privacidade (RGPD)',
      cookies: 'Gerir Cookies',
    },
    cookie: {
      title: 'Privacidade & Cookies',
      desc: 'Este site utiliza apenas armazenamento técnico estritamente necessário ao seu funcionamento e preferência de idioma. Não utilizamos cookies publicitários nem de rastreamento.',
      more: 'Saber mais',
      reject: 'Apenas Essenciais',
      accept: 'Aceitar',
    },
  },
  fr: {
    nav: {
      approach: 'Approche',
      methodology: 'Méthodologie',
      principles: '9 Piliers',
      roi: 'Simulateur ROI',
      tools: 'Outils',
      cta: 'Diagnostic Gratuit',
    },
    hero: {
      regionLine: 'France (Île-de-France, Rhône-Alpes, Grand Est) · Portugal (Lisbonne, Porto, Aveiro, Leiria, Braga)',
      guarantee: 'Garantie contractuelle de remboursement de 50 % si les KPI ne sont pas atteints en 90 jours',
      title1: 'Sans théorie, sur le terrain.',
      title2: 'Résultats en 90 jours.',
      subtitle:
        'Cabinet conseil en Excellence Opérationnelle et Lean Manufacturing pour PME industrielles et logistiques. 90 % au Gemba (atelier) et seulement 10 % en salle — libérant marge EBITDA et trésorerie.',
      ctaPrimary: 'Demander un Diagnostic Gratuit',
      ctaSecondary: 'Simuler mes Gains (ROI)',
      ctaPrinciples: 'Explorer les 9 Piliers & Radar 1–9',
      panelTitle: 'Engagement Opérationnel',
      panelSubtitle: 'Impact direct sur EBITDA & Cash',
      panelTag: 'ROI < 3 Mois',
      metrics: [
        {
          value: '90%',
          label: 'Sur le Terrain (Gemba)',
          desc: 'Aux côtés des opérateurs et chefs d’équipe pour résoudre les vrais goulots.',
        },
        {
          value: '90j',
          label: 'Pour le Retour & Cash (ROI)',
          desc: 'Réduction immédiate des gaspillages (Muda), encours (WIP) et retouches.',
        },
        {
          value: '15m',
          label: 'Kaizen Quotidien (AIC)',
          desc: 'Rituels courts debout devant les tableaux visuels pour aligner la production.',
        },
        {
          value: '50%',
          label: 'Garantie de Remboursement',
          desc: '3 KPI fixés au Jour 15. Risque partagé par contrat à 90 jours.',
        },
      ],
    },
    comparison: {
      kicker: 'La Réalité des PME Industrielles',
      title: 'Pourquoi le Lean Traditionnel Échoue dans les PME ?',
      subtitle:
        'Importer des modèles rigides de multinationales ne fonctionne pas lorsque chaque collaborateur est essentiel et le budget suivi au centime.',
      tradTag: 'L’Ancien Modèle',
      tradTitle: 'Conseil Traditionnel',
      tradItems: [
        '80 % du temps en salle de réunion avec des présentations PowerPoint théoriques.',
        'Exige l’achat de logiciels ERP/MES coûteux avant même de ranger l’atelier.',
        'Jargon technique incompréhensible créant de la résistance chez les opérateurs.',
        'Facturation au temps passé sans aucun engagement sur les résultats obtenus.',
      ],
      opexTag: 'Pragmatisme Industriel',
      opexTitle: 'Approche OpEx Lean',
      opexItems: [
        { lead: '90 % au Gemba :', text: 'Chaussures de sécurité aux pieds sur la ligne pour résoudre les vrais problèmes.' },
        { lead: 'Zéro Logiciel Requis :', text: 'Management visuel physique (tableaux, cartes, marquage) à faible coût.' },
        { lead: 'Culture Terrain :', text: 'Langage direct, respect des équipes et implication opérationnelle.' },
        { lead: 'Garantie Contractuelle :', text: 'Remboursement de 50 % si les KPI convenus ne sont pas atteints à 90 jours.' },
      ],
    },
    methodology: {
      kicker: 'Méthodologie Pragmatique',
      title: 'De l’observation terrain aux gains financiers durables',
      subtitle:
        'Une approche structurée en 4 étapes mobilisant chefs d’équipe, opérateurs et fonctions support autour d’un langage commun.',
      steps: [
        {
          num: '01.',
          phase: 'Jours 1 à 15',
          title: 'Immersion Gemba',
          desc: 'Observation directe des flux physiques et d’information, chronométrage réel, chasse aux gaspillages (Muda) et écoute des opérateurs.',
        },
        {
          num: '02.',
          phase: 'Mois 1',
          title: 'Supervision Active',
          desc: 'Mise en place de tournées terrain structurées et rituels AIC (Animation à Intervalle Court) pour corriger les écarts le jour même.',
        },
        {
          num: '03.',
          phase: 'Mois 2',
          title: 'Chantiers Kaizen Ciblés',
          desc: 'Application rapide du SMED, 5S, réimplantation de cellules et équilibrage de postes avec gains immédiats sur le TRS (OEE).',
        },
        {
          num: '04.',
          phase: 'Mois 3',
          title: 'Formation Terrain & Autonomie',
          desc: 'Formation pratique sur le terrain (Zéro Slide) et coaching individuel des chefs d’équipe pour que l’amélioration continue se poursuive après notre départ.',
        },
      ],
    },
    roadmap: {
      kicker: 'Plan d’Action Structuré',
      title: 'Feuille de Route de Transformation en 90 Jours',
      subtitle: 'Une méthode progressive conçue pour générer des victoires rapides sans perturber vos livraisons clients.',
      phases: [
        {
          num: '01',
          days: 'Jours 1 à 15',
          title: 'Diagnostic Flash Terrain',
          desc: 'Immersion immédiate en atelier via des Gemba Walks pour identifier les 7 gaspillages (Muda) : encours, déplacements et attentes.',
          bullets: ['Cartographie simplifiée des flux (VSM)', 'Définition de 3 KPI cibles avec la direction'],
        },
        {
          num: '02',
          days: 'Mois 1 à 2',
          title: 'Fondations 5S & Management Visuel',
          desc: 'Organisation physique des postes pilotes, standards visuels de sécurité et lancement des rituels Kaizen quotidiens de 15 minutes.',
          bullets: ['Déploiement 5S sur les goulots critiques', 'Installation des tableaux visuels SQCDP'],
        },
        {
          num: '03',
          days: 'Mois 3',
          title: 'Autonomie & Validation ROI',
          desc: 'Formation pratique des équipes internes à la résolution de problèmes A3 pour pérenniser les gains. Bilan financier à 90 jours.',
          bullets: ['Équipes autonomes sur la méthode A3', 'Audit final du ROI à 90 jours'],
        },
      ],
      guaranteeTitle: 'Garantie Risque Zéro : Remboursement de 50 % des Coûts du Projet',
      guaranteeDesc:
        'Nous fixons 3 objectifs mesurables au Jour 15. Si les objectifs convenus ne sont pas atteints en 90 jours, nous remboursons 50 % des coûts du projet.',
      guaranteeCta: 'Vérifier l’Éligibilité',
    },
    founder: {
      kicker: '+25 Ans d’Expérience Exécutive & Lean',
      role: 'Senior Advisor · Excellence Opérationnelle',
      location: 'Oeiras / Lisbonne, Portugal · FR · PT · EN · ES',
      bio: 'Ancien directeur de sites industriels et de supply chain (métallurgie de pointe, distribution, industrie manufacturière). Basé entre Lisbonne et la France, j’interviens directement au pied des machines pour ancrer des gains durables.',
      stats: [
        { value: '+25', label: 'Années d’expérience exécutive' },
        { value: '+30%', label: 'Productivité industrielle' },
        { value: '+25%', label: 'Croissance de l’EBITDA' },
      ],
      expTitle: 'La Rigueur des Grands Groupes Appliquée aux PME',
      expDesc:
        'Au cours de plus de deux décennies en Direction Générale et conseil international, accompagnement de transformations critiques dans des secteurs exigeants :',
      sectors: [
        'Aéronautique',
        'Produits de Luxe',
        'Chimie',
        'Agroalimentaire',
        'Distribution',
        'Industrie & Fonderie',
        'Ciment',
        'Banque & Assurance',
      ],
      quote: '"Je transforme les organisations en améliorant leurs comportements, leurs routines et leurs résultats — pas en ajoutant des slides."',
      linkedinBtn: 'Profil LinkedIn',
    },
    cases: {
      kicker: 'Track Record Prouvé · Confidentialité Garantie',
      title: 'Cas Réels & Résultats Terrain',
      items: [
        {
          sector: 'Aéronautique',
          meta: 'Excellence Opérationnelle',
          title: 'Supervision Active & Pôles de Flux',
          desc: 'Déploiement de rituels quotidiens, matrices RACI et pilotage transversal entre production et logistique.',
          metric: '+30%',
          metricLabel: 'Productivité',
          method: 'Rituels & RACI',
        },
        {
          sector: 'Chimie',
          meta: 'Relance de Site',
          title: 'Optimisation Industrielle',
          desc: 'Redéfinition de l’organisation atelier et refonte complète de la planification opérationnelle.',
          metric: '+300%',
          metricLabel: 'Volume de production',
          method: 'Planification',
        },
        {
          sector: 'Industrie',
          meta: 'Performance Production',
          title: 'Chantiers Kaizen & Proximité',
          desc: 'Lancement de chantiers Kaizen d’élimination des gaspillages critiques et coaching terrain des superviseurs.',
          metric: '+25%',
          metricLabel: 'Hausse d’EBITDA',
          method: 'Kaizen & Marge',
        },
      ],
    },
    testimonials: {
      kicker: 'Recommandations Exécutives',
      title: 'Ce Que Disent les Directeurs Généraux',
      items: [
        {
          initials: 'WB',
          quote:
            '"Armandino a su insuffler une véritable culture de la performance opérationnelle et de la rigueur terrain. Sa capacité à mobiliser les équipes autour d’indicateurs simples a permis de franchir un cap décisif."',
          author: 'Wouter De Backer',
          role: 'Directeur Général',
          org: 'Action France',
        },
        {
          initials: 'CM',
          quote:
            '"Un leader de terrain pragmatique, exigeant et profondément humain. Armandino possède le talent rare de traduire une vision stratégique en routines opérationnelles quotidiennes."',
          author: 'Clément Meslier',
          role: 'Directeur Industriel',
          org: 'Aubert & Duval',
        },
        {
          initials: 'EC',
          quote:
            '"Travailler avec Armandino est la garantie d’aller droit à l’essentiel. Son sens aigu du Gemba et son énergie communicative débloquent des situations complexes en un temps record."',
          author: 'Eric Caridroit',
          role: 'Directeur Opérations & Supply Chain',
          org: 'Eramet',
        },
      ],
    },
    simulator: {
      kicker: 'Simulateur Interactif PME',
      title: 'Combien votre usine perd-elle en gaspillages (Muda) ?',
      subtitle:
        'En moyenne, une PME industrielle sans routines Lean perd entre 18 % et 28 % de sa capacité productive en micro-arrêts, recherches d’outils, déplacements et retouches.',
      sectorLabel: 'Secteur d’Activité',
      sectors: [
        { value: 0.22, label: 'Métallurgie & Structures' },
        { value: 0.25, label: 'Automobile, Plasturgie & Moules' },
        { value: 0.2, label: 'Agroalimentaire & Emballage' },
        { value: 0.21, label: 'Mobilier, Bois & Textile' },
      ],
      opsLabel: 'Nombre d’Opérateurs en Production',
      costLabel: 'Coût Horaire Moyen (Salaire + Charges + Machine)',
      resHeader: 'Potentiel de Récupération (90 Jours)',
      resNote: 'Estimation prudente (50 % du Muda)',
      resHours: 'Heures Productives Gagnées',
      resHoursUnit: 'h / trim.',
      resSavings: 'Économies / Capacité Libérée',
      resAnnualLabel: 'Projection Annualisée après consolidation :',
      resAnnualSub: 'de marge opérationnelle libérée par an',
      cta: 'Valider ces chiffres dans mon Diagnostic',
      printBtn: 'Imprimer PDF',
    },
    toolsSection: {
      kicker: 'Boîte à Outils Pragmatique',
      title: 'Les Fiches Outils Industrielles',
      subtitle: 'Cliquez sur un outil pour ouvrir sa fiche technique détaillée avec la méthode d’application sur le terrain.',
      filters: [
        { key: 'all', label: 'Toutes (7)' },
        { key: 'prod', label: 'Production & Flux' },
        { key: 'qual', label: 'Qualité & Organisation' },
        { key: 'man', label: 'Management & Rituels' },
      ],
      cardAction: 'Voir la Fiche Technique',
      modalStepHeader: 'Déploiement étape par étape sur le terrain :',
      modalCta: 'Déployer cet outil dans mon entreprise',
    },
    form: {
      kicker: 'Sans Engagement · Appel 20 min ou Visite 2h',
      title: 'Planifier un Diagnostic Flash (2h au Gemba) ou un Échange',
      subtitle:
        'Commencez par un appel exploratoire confidentiel de 20 minutes ou planifiez une visite gratuite de 2 heures en atelier pour identifier 3 leviers immédiats de gain et de Cash.',
      nameLabel: 'Nom et Fonction *',
      namePh: 'Ex: Jean Dupont, Directeur Industriel',
      companyLabel: 'Entreprise *',
      companyPh: 'Ex: Mécanique de Précision SAS',
      emailLabel: 'Email Professionnel *',
      emailPh: 'jean.dupont@entreprise.fr',
      phoneLabel: 'Téléphone / Mobile *',
      phonePh: '+33 6 12 34 56 78',
      regionLabel: 'Région / Zone *',
      regions: [
        'France (Toutes régions)',
        'Lisbonne / Setúbal',
        'Porto / Braga',
        'Aveiro / Coimbra',
        'Leiria / Santarém',
        'Autre Région (Portugal)',
      ],
      sizeLabel: 'Taille de l’Équipe',
      sizes: [
        '5 à 15 collaborateurs',
        '16 à 30 collaborateurs',
        '31 à 50 collaborateurs',
        'Plus de 50 collaborateurs',
      ],
      priorityLabel: 'Défi Principal Actuel',
      priorities: [
        'Premier contact : Appel exploratoire (20 min)',
        'Retards de livraison / Goulots',
        'Désorganisation / Réduction des stocks & Cash',
        'Coûts élevés / Défauts et retouches',
        'Formation des chefs d’équipe / Autonomie',
      ],
      notesLabel: 'Notes complémentaires (Optionnel)',
      notesPh: 'Décrivez brièvement votre processus de production...',
      submit: 'Demander mon Diagnostic Flash Gratuit',
      privacyNote: 'Réponse sous 24h. Confidentialité absolue (NDA disponible sur demande) & RGPD.',
      errRequired: 'Veuillez renseigner les 4 champs obligatoires (*) : Nom, Entreprise, Email et Téléphone.',
      errEmail: 'Veuillez saisir une adresse e-mail professionnelle valide.',
      confTitle: 'Demande de Diagnostic Confirmée',
      confDesc: 'Choisissez ci-dessous votre canal d’envoi immédiat (WhatsApp ou E-mail) pour transmettre vos informations directement à Armandino Seixas :',
      confWa: 'Envoyer par WhatsApp',
      confMail: 'Envoyer par E-mail',
      confCopy: 'Copier le récapitulatif',
      confCopied: 'Récapitulatif copié !',
      confReset: 'Effectuer une nouvelle demande',
      labels: {
        contact: 'Contact',
        company: 'Entreprise',
        email: 'Email',
        phone: 'Téléphone',
        zone: 'Zone',
        team: 'Équipe',
        challenge: 'Défi',
        notes: 'Notes',
      },
    },
    faq: {
      kicker: 'Questions Fréquentes',
      title: 'Foire Aux Questions',
      items: [
        {
          q: 'Comment fonctionne exactement la garantie de remboursement de 50 % ?',
          a: 'Au 15e jour d’intervention sur le terrain (Gemba), nous définissons conjointement avec la direction 3 indicateurs de performance (KPI) mesurables. Si au bout de 90 jours ces objectifs ne sont pas atteints, nous remboursons 50 % des coûts du projet.',
        },
        {
          q: 'Quelle est votre zone géographique d’intervention ?',
          a: 'Interventions rapides sur site partout en France (Île-de-France, Grand Est, Auvergne-Rhône-Alpes) et au Portugal (Lisbonne, Setúbal, Porto, Braga, Aveiro, Leiria).',
        },
        {
          q: 'Faut-il acheter un logiciel spécifique (ERP/MES) ?',
          a: 'Non. Notre approche est 100 % terrain (Gemba). Nous utilisons le management visuel physique (tableaux blancs, marquage au sol, cartes Kanban) à très faible coût et efficacité immédiate.',
        },
      ],
    },
    footer: {
      desc: 'Cabinet conseil en Excellence Opérationnelle et Lean Manufacturing pour PME industrielles en France et au Portugal. 0 Slide, 100 % Gemba.',
      navTitle: 'Navigation',
      zonesTitle: 'Zones d’Intervention',
      zones: [
        'France (Île-de-France, Rhône-Alpes, Grand Est)',
        'Lisbonne, Oeiras & Setúbal',
        'Porto, Braga & Nord',
        'Aveiro, Leiria & Centre',
      ],
      contactTitle: 'Contacts',
      seoLine:
        'OpEx Lean — Cabinet Conseil en Excellence Opérationnelle & Lean Manufacturing (France & Portugal) : Kaizen, Gemba, SMED, 5S, SQCDP, VSM, TRS/OEE et Kanban pour PME industrielles.',
      rights: 'Tous droits réservés.',
      privacy: 'Politique de Confidentialité (RGPD)',
      cookies: 'Gérer les Cookies',
    },
    cookie: {
      title: 'Confidentialité & Cookies',
      desc: 'Ce site utilise uniquement le stockage technique strictement nécessaire à son fonctionnement et à votre préférence de langue. Aucun cookie publicitaire ou de suivi n’est utilisé.',
      more: 'En savoir plus',
      reject: 'Essentiels uniquement',
      accept: 'Accepter',
    },
  },
};
