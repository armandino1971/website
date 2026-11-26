import { EvolutionSnapshot, Language, TechnicalToolSpec } from '../types';

export interface PrincipleDetailBlock {
  title: Record<Language, string>;
  text: Record<Language, string>;
}

export interface PrincipleCardItem {
  id: string;
  axis: '01' | '02' | '03' | '04' | '05';
  keywords: string;
  label: Record<Language, string>;
  title: Record<Language, string>;
  symptom?: Record<Language, string>;
  keyRule?: Record<Language, string>;
  tools: string[];
  blocks: PrincipleDetailBlock[];
  metrics?: { code: string; label: Record<Language, string> }[];
  takeaway: Record<Language, string>;
}

export interface AxisInfo {
  id: '01' | '02' | '03' | '04' | '05' | '06';
  filterLabel: Record<Language, string>;
  title: Record<Language, string>;
  subtitle: Record<Language, string>;
}

export const axesInfo: AxisInfo[] = [
  {
    id: '01',
    filterLabel: { pt: '01. Mentalidade', fr: '01. Mentalité' },
    title: { pt: 'Mentalidade Lean', fr: 'Mentalité Lean' },
    subtitle: { pt: 'Fundação Cultural & Alinhamento Estratégico', fr: 'Fondation Culturelle & Alignement Stratégique' },
  },
  {
    id: '02',
    filterLabel: { pt: '02. Valor', fr: '02. Valeur' },
    title: { pt: 'Valor e Desperdício', fr: 'Valeur et Gaspillage' },
    subtitle: { pt: 'Foco no Cliente & Eliminação de Muda', fr: 'Orientation Client & Élimination des Mudas' },
  },
  {
    id: '03',
    filterLabel: { pt: '03. Fluxo', fr: '03. Flux' },
    title: { pt: 'Fluxo e Produção', fr: 'Flux et Production' },
    subtitle: { pt: 'Sincronização Contínua & Sistema Pull', fr: 'Synchronisation Continue & Flux Tiré' },
  },
  {
    id: '04',
    filterLabel: { pt: '04. Padrão', fr: '04. Standard' },
    title: { pt: 'Padronização e Problemas', fr: 'Standardisation et Problèmes' },
    subtitle: { pt: 'Estabilidade Operacional & Causa Raiz', fr: 'Stabilité Opérationnelle & Cause Racine' },
  },
  {
    id: '05',
    filterLabel: { pt: '05. Pessoas', fr: '05. Personnes' },
    title: { pt: 'Pessoas e Melhoria', fr: 'Personnes et Amélioration' },
    subtitle: { pt: 'Gemba, Transparência Visual & Kaizen Diário', fr: 'Gemba, Transparence Visuelle & Kaizen Quotidien' },
  },
  {
    id: '06',
    filterLabel: { pt: '06. Resultado', fr: '06. Résultat' },
    title: { pt: 'Resultado', fr: 'Résultat' },
    subtitle: { pt: 'Lean é cultura de valor sem desperdício', fr: 'Le Lean est une culture de valeur sans gaspillage' },
  },
];

export const principleCards: PrincipleCardItem[] = [
  {
    id: 'p01',
    axis: '01',
    keywords: 'mentalidade lean desperdicio lideranca estrategia hoshin kanri prioridades silos',
    label: { pt: '01. Mentalidade Lean', fr: '01. Mentalité Lean' },
    title: { pt: 'Ver o mundo sem desperdício', fr: 'Voir le monde sans gaspillage' },
    symptom: {
      pt: 'Cada departamento puxa para o seu lado, excesso de projetos sem conclusão e liderança afastada da realidade do terreno.',
      fr: 'Chaque service tire dans son coin, trop de projets lancés sans aboutir et un management éloigné des réalités du terrain.',
    },
    tools: ['Hoshin Kanri'],
    blocks: [
      {
        title: { pt: 'Lean como mentalidade', fr: 'Le Lean comme mentalité' },
        text: {
          pt: 'O pensamento Lean é uma forma de ver o mundo, focado em procurar valor e rejeitar desperdício. Este pensamento deve ser adotado diariamente como hábito de melhoria contínua.',
          fr: 'La pensée Lean est une manière de voir le monde, centrée sur la recherche de valeur et le rejet du gaspillage. Elle doit être adoptée chaque jour comme une habitude d’amélioration continue.',
        },
      },
      {
        title: { pt: 'Importância da liderança', fr: 'Importance du leadership' },
        text: {
          pt: 'A liderança é absolutamente fundamental para alinhar toda a organização em torno desta visão. Os líderes devem ser exemplos vivos e participar ativamente na definição e comunicação da estratégia.',
          fr: 'Le leadership est absolument fondamental pour aligner toute l’organisation autour de cette vision. Les leaders doivent être des exemples vivants et participer activement à la définition et à la communication de la stratégie.',
        },
      },
      {
        title: { pt: 'Desdobramento da estratégia', fr: 'Déploiement de la stratégie' },
        text: {
          pt: 'O desdobramento da estratégia (Hoshin Kanri) é uma ferramenta fundamental para garantir que todos na organização compreendam e trabalhem em direção aos mesmos objetivos.',
          fr: 'Le déploiement de la stratégie (Hoshin Kanri) est un outil essentiel pour garantir que chacun dans l’organisation comprenne et œuvre vers les mêmes objectifs.',
        },
      },
    ],
    takeaway: {
      pt: 'Alinhamento claro entre a estratégia da direção e as prioridades diárias de cada equipa no terreno.',
      fr: 'Alignement clair entre la stratégie de la direction et les priorités quotidiennes de chaque équipe sur le terrain.',
    },
  },
  {
    id: 'p02',
    axis: '02',
    keywords: 'valor definido pelo cliente voc voice of the customer qfd quality function deployment mercado sobre-qualidade',
    label: { pt: '02. Valor e Desperdício', fr: '02. Valeur et Gaspillage' },
    title: { pt: 'Valor definido pelo cliente', fr: 'Valeur définie par le client' },
    keyRule: {
      pt: '« Foque só no que o cliente paga. »',
      fr: '« Concentrez-vous uniquement sur ce que le client paie. »',
    },
    tools: ['VoC', 'QFD'],
    blocks: [
      {
        title: { pt: 'Valor determinado pelo cliente', fr: 'Valeur déterminée par le client' },
        text: {
          pt: 'Cada processo deve entregar valor real para quem escolhe a empresa. Tudo o que não melhora o produto/serviço aos olhos do cliente é custo supérfluo.',
          fr: 'Chaque processus doit délivrer une valeur réelle. Tout ce qui n’améliore pas le produit ou service aux yeux du client est un coût superflu.',
        },
      },
      {
        title: { pt: 'Ferramentas para captar necessidades', fr: 'Outils pour capter les besoins' },
        text: {
          pt: 'Voice of the Customer (VoC) e QFD (Quality Function Deployment) traduzem as expectativas reais do cliente em especificações técnicas exatas, evitando sobre-qualidade dispendiosa.',
          fr: 'Voice of the Customer (VoC) et QFD (Quality Function Deployment) traduisent les attentes réelles du client en spécifications techniques exactes, évitant la sur-qualité coûteuse.',
        },
      },
    ],
    takeaway: {
      pt: 'Distinção imediata entre atividades de Valor Acrescentado (VA) e Não Valor Acrescentado (NVA).',
      fr: 'Distinction immédiate entre les activités à Valeur Ajoutée (VA) et Non-Valeur Ajoutée (NVA).',
    },
  },
  {
    id: 'p03',
    axis: '02',
    keywords: 'corte tudo que nao acrescenta valor desperdicios muda 5s vsm mapa do fluxo de valor perdas eficiencia',
    label: { pt: '03. Valor e Desperdício', fr: '03. Valeur et Gaspillage' },
    title: { pt: 'Corte tudo o que não acrescenta valor', fr: 'Éliminez tout ce qui n’ajoute pas de valeur' },
    tools: ['5S', 'VSM'],
    blocks: [
      {
        title: { pt: 'Eliminar os 7 Muda', fr: 'Éliminer les 7 Mudas' },
        text: {
          pt: 'Eliminar desperdícios de tempo, deslocações, esperas, defeitos e excesso de stock melhora a eficiência sem exigir investimento pesado.',
          fr: 'Éliminer les pertes de temps, déplacements, attentes, défauts et surstocks améliore l’efficience sans nécessiter d’investissements lourds.',
        },
      },
      {
        title: { pt: 'Implementação do 5S', fr: 'Déploiement du 5S' },
        text: {
          pt: 'Metodologia que mantém o posto organizado e visível: qualquer desvio ou ferramenta em falta deteta-se em 3 segundos.',
          fr: 'Méthodologie qui maintient le poste organisé et visuel : tout écart ou outil manquant se détecte en 3 secondes.',
        },
      },
      {
        title: { pt: 'Identificação de perdas (VSM)', fr: 'Identification des pertes (VSM)' },
        text: {
          pt: 'O Mapa do Fluxo de Valor (VSM) revela que frequentemente mais de 85% do tempo total de atravessamento é espera parada.',
          fr: 'La Cartographie de la Chaîne de Valeur (VSM) révèle souvent que plus de 85 % du délai total de traversée est de l’attente immobile.',
        },
      },
      {
        title: { pt: 'Impacto na margem', fr: 'Impact sur la marge' },
        text: {
          pt: 'Remover o supérfluo aumenta diretamente a capacidade produtiva e a margem operacional sem aumentar os preços ao cliente.',
          fr: 'Supprimer le superflu augmente directement la capacité productive et la marge opérationnelle sans augmenter les prix.',
        },
      },
    ],
    takeaway: {
      pt: 'Postos de trabalho organizados (5S) e processos enxutos com redução direta do Lead Time.',
      fr: 'Postes de travail organisés (5S) et processus épurés avec réduction directe du Lead Time.',
    },
  },
  {
    id: 'p04',
    axis: '03',
    keywords: 'fluxo continuo kanban balanceamento de linha takt time engarrafamentos esperas retrabalho',
    label: { pt: '04. Fluxo e Produção', fr: '04. Flux et Production' },
    title: { pt: 'Faça o trabalho fluir sem paragens', fr: 'Faites circuler le travail sans arrêt' },
    tools: ['Kanban', 'Balanceamento'],
    metrics: [
      { code: 'ZERO', label: { pt: 'Engarrafamentos', fr: 'Goulots' } },
      { code: 'ZERO', label: { pt: 'Esperas', fr: 'Attentes' } },
      { code: 'TAKT', label: { pt: 'Ritmo Estável', fr: 'Rythme Stable' } },
    ],
    blocks: [
      {
        title: { pt: 'Fluxo contínuo sincronizado ao Takt Time', fr: 'Flux continu synchronisé au Takt Time' },
        text: {
          pt: 'Um fluxo contínuo elimina engarrafamentos, retrabalho e esperas. Ferramentas como o Kanban e o balanceamento de linha sincronizam cada posto com o ritmo da procura (Takt Time).',
          fr: 'Un flux continu élimine les goulots d’étranglement, les reprises et les attentes. Le Kanban et l’équilibrage de ligne synchronisent chaque poste sur le rythme de la demande (Takt Time).',
        },
      },
    ],
    takeaway: {
      pt: 'Sincronização fluida entre postos de trabalho sem acumulação de trabalho em curso (WIP).',
      fr: 'Synchronisation fluide entre postes de travail sans accumulation d’en-cours (WIP).',
    },
  },
  {
    id: 'p05',
    axis: '03',
    keywords: 'produza so quando o cliente pedir just in time jit heijunka smed stock capital obsolescencia',
    label: { pt: '05. Fluxo e Produção', fr: '05. Flux et Production' },
    title: { pt: 'Produza só quando o cliente pedir', fr: 'Produisez uniquement quand le client commande' },
    tools: ['JIT', 'Heijunka'],
    blocks: [
      {
        title: { pt: 'Produção puxada pela procura real (Pull)', fr: 'Production tirée par la demande réelle (Pull)' },
        text: {
          pt: 'Stock parado não é riqueza — é dinheiro empatado que esconde avarias e atrasos. Produzir apenas sob pedido real liberta tesouraria e reduz a obsolescência.',
          fr: 'Un stock qui dort n’est pas une richesse — c’est de la trésorerie immobilisée qui masque pannes et retards. Produire uniquement à la demande libère du cash et réduit l’obsolescence.',
        },
      },
      {
        title: { pt: 'Just-in-Time (JIT)', fr: 'Just-in-Time (JIT)' },
        text: {
          pt: 'Entrega o item certo na quantidade exata e no momento pedido, eliminando lotes gigantes empurrados.',
          fr: 'Livre le bon article, en juste quantité et au moment demandé, supprimant les gros lots poussés.',
        },
      },
      {
        title: { pt: 'Heijunka (Nivelamento)', fr: 'Heijunka (Lissage)' },
        text: {
          pt: 'Nivela o volume e o mix de produção, evitando picos de sobrecarga (Muri) seguidos de paragens (Mura).',
          fr: 'Lisse le volume et le mix de production, évitant les pics de surcharge (Muri) suivis d’arrêts (Mura).',
        },
      },
    ],
    takeaway: {
      pt: 'Libertação de capital imobilizado em stock e resposta ágil à procura real do cliente.',
      fr: 'Libération du capital immobilisé en stock et réponse agile à la demande réelle du client.',
    },
  },
  {
    id: 'p06',
    axis: '04',
    keywords: 'padronize antes de melhorar sop checklists estabilidade consistencia',
    label: { pt: '06. Padronização e Problemas', fr: '06. Standardisation et Problèmes' },
    title: { pt: 'Padronize antes de melhorar', fr: 'Standardisez avant d’améliorer' },
    tools: ['SOP', 'Checklists'],
    blocks: [
      {
        title: { pt: 'Sem padrão não há melhoria', fr: 'Sans standard, pas d’amélioration' },
        text: {
          pt: 'A padronização cria consistência, qualidade e previsibilidade. O padrão não é burocracia de arquivo: é uma folha visual única, co-construída no posto, que fixa a melhor prática atual.',
          fr: 'La standardisation crée cohérence, qualité et prévisibilité. Le standard n’est pas un classeur poussiéreux : c’est une fiche visuelle unique, co-construite au poste, fixant la meilleure pratique actuelle.',
        },
      },
      {
        title: { pt: 'SOP visuais & Checklists', fr: 'SOP visuels & Checklists' },
        text: {
          pt: 'SOP (Standard Operating Procedures) e checklists garantem a sequência certa, os pontos críticos de qualidade/segurança e aceleram a integração de novos operadores.',
          fr: 'Les SOP (Standard Operating Procedures) et checklists garantissent la bonne séquence, les points clés qualité/sécurité et accélèrent l’intégration des nouveaux.',
        },
      },
    ],
    takeaway: {
      pt: 'A melhor prática conhecida torna-se a referência comum para toda a equipa e ponto de partida para o Kaizen.',
      fr: 'La meilleure pratique connue devient la référence commune de l’équipe et le point de départ du Kaizen.',
    },
  },
  {
    id: 'p07',
    axis: '04',
    keywords: 'ataque a causa nao o sintoma 5 porques ishikawa poka-yoke causa raiz fiabilidade',
    label: { pt: '07. Padronização e Problemas', fr: '07. Standardisation et Problèmes' },
    title: { pt: 'Ataque a causa, não o sintoma', fr: 'Attaquez la cause, pas le symptôme' },
    tools: ['5 Porquês', 'Ishikawa'],
    blocks: [
      {
        title: { pt: '« Boa! Um problema »', fr: '« Chouette ! Un problème »' },
        text: {
          pt: 'Cada anomalia exposta é uma oportunidade de ganho. Nunca culpe o mensageiro: vá ao Gemba e elimine a causa raiz.',
          fr: 'Chaque anomalie révélée est un gisement de progrès. Ne tirez jamais sur le messager : allez sur le Gemba et traitez la cause racine.',
        },
      },
      {
        title: { pt: 'Método dos 5 Porquês', fr: 'Méthode des 5 Pourquoi' },
        text: {
          pt: 'Perguntar sucessivamente «Porquê?» até ultrapassar os sintomas superficiais e atingir a causa técnica ou organizacional.',
          fr: 'Demander successivement « Pourquoi ? » jusqu’à dépasser les symptômes superficiels et atteindre la cause technique ou organisationnelle.',
        },
      },
      {
        title: { pt: 'Diagrama de Ishikawa', fr: 'Diagramme d’Ishikawa' },
        text: {
          pt: 'Estrutura em equipa todas as causas potenciais (6M) de problemas complexos para definir ações corretivas definitivas.',
          fr: 'Structure en équipe toutes les causes potentielles (6M) des problèmes complexes pour définir des actions correctives définitives.',
        },
      },
      {
        title: { pt: 'Fim do modo «bombeiro»', fr: 'Fin du mode « pompier »' },
        text: {
          pt: 'Substitui os remendos de urgência por processos fiáveis que impedem a reincidência do erro (Poka-Yoke).',
          fr: 'Remplace les rustines d’urgence par des processus fiables empêchant toute récidive (Poka-Yoke).',
        },
      },
    ],
    takeaway: {
      pt: 'Eliminação definitiva de avarias e defeitos recorrentes através da análise estruturada da causa raiz.',
      fr: 'Élimination définitive des pannes et défauts récurrents grâce à l’analyse structurée de la cause racine.',
    },
  },
  {
    id: 'p08',
    axis: '05',
    keywords: 'quem faz o trabalho tem as melhores ideias transparencia total gestao visual andon paineis de controlo indicadores gemba',
    label: { pt: '08. Pessoas e Melhoria', fr: '08. Personnes et Amélioration' },
    title: {
      pt: 'Quem faz o trabalho tem as melhores ideias & Transparência total',
      fr: 'Ceux qui font le travail ont les meilleures idées & Transparence totale',
    },
    tools: ['Gestão Visual'],
    blocks: [
      {
        title: { pt: 'Participação e compromisso das equipas', fr: 'Participation et engagement des équipes' },
        text: {
          pt: 'Quem executa a tarefa diariamente conhece os irritantes reais. Ouvir os operadores no Gemba e testar as suas sugestões em 48h cria compromisso genuíno.',
          fr: 'Ceux qui exécutent la tâche chaque jour connaissent les vrais irritants. Écouter les opérateurs sur le Gemba et tester leurs idées sous 48h crée un engagement durable.',
        },
      },
      {
        title: { pt: 'Gestão visual & Regra dos 5 segundos', fr: 'Management visuel & Règle des 5 secondes' },
        text: {
          pt: 'Ao passar por um quadro de equipa, qualquer pessoa deve perceber em 5 segundos se o turno está no verde (no alvo) ou no vermelho (com desvio), sem abrir um computador.',
          fr: 'En passant devant un tableau d’équipe, chacun doit comprendre en 5 secondes si l’équipe est dans le vert (à l’objectif) ou dans le rouge (en écart), sans ouvrir d’ordinateur.',
        },
      },
    ],
    takeaway: {
      pt: 'Equipas autónomas que visualizam indicadores em tempo real e propõem melhorias concretas no terreno.',
      fr: 'Équipes autonomes qui visualisent leurs indicateurs en temps réel et proposent des améliorations concrètes sur le terrain.',
    },
  },
  {
    id: 'p09',
    axis: '05',
    keywords: 'melhore um pouco a cada dia melhoria continua diaria kaizen ciclo pdca',
    label: { pt: '09. Pessoas e Melhoria', fr: '09. Personnes et Amélioration' },
    title: { pt: 'Melhore um pouco a cada dia', fr: 'Améliorez un peu chaque jour' },
    tools: ['PDCA'],
    blocks: [
      {
        title: { pt: 'Melhoria contínua diária (Kaizen)', fr: 'Amélioration continue quotidienne (Kaizen)' },
        text: {
          pt: 'Uma melhoria simples testada esta tarde vale mais do que um plano perfeito adiado para o próximo trimestre. Pequenos ganhos diários geram uma vantagem competitiva imbatível.',
          fr: 'Une amélioration simple testée cet après-midi vaut mille fois mieux qu’un plan parfait repoussé au trimestre prochain. De petits gains quotidiens créent un avantage décisif.',
        },
      },
      {
        title: { pt: 'Ciclo PDCA (Plan · Do · Check · Act)', fr: 'Cycle PDCA (Plan · Do · Check · Act)' },
        text: {
          pt: 'O ciclo PDCA estrutura a experimentação rápida no terreno: planear a melhoria, testar em pequena escala, medir o resultado real e atualizar o padrão.',
          fr: 'Le cycle PDCA structure l’expérimentation rapide terrain : planifier l’amélioration, tester à petite échelle, mesurer le résultat réel et mettre à jour le standard.',
        },
      },
    ],
    takeaway: {
      pt: 'Evolução incremental constante sem ruturas operacionais, consolidando cada ganho no padrão.',
      fr: 'Évolution incrémentale constante sans rupture opérationnelle, consolidant chaque gain dans le standard.',
    },
  },
];

export const outcomeCards: { code: string; title: Record<Language, string>; text: Record<Language, string> }[] = [
  {
    code: '01 / SISTEMA',
    title: { pt: 'Lean como sistema integrado', fr: 'Le Lean comme système intégré' },
    text: {
      pt: 'O Lean é um sistema integrado de reflexão, ferramentas e hábitos que agrega valor ao cliente sem desperdício, transformando assim a cultura organizacional.',
      fr: 'Le Lean est un système intégré de réflexion, d’outils et d’habitudes qui apporte de la valeur au client sans gaspillage, transformant ainsi la culture d’entreprise.',
    },
  },
  {
    code: '02 / EQUIPAS',
    title: { pt: 'Envolvimento das pessoas', fr: 'Implication des personnes' },
    text: {
      pt: 'O envolvimento de todos os membros da organização é essencial para a implementação bem-sucedida do Lean, garantindo a sustentabilidade das melhorias.',
      fr: 'L’implication de tous les membres de l’organisation est essentielle à la réussite du Lean, garantissant la pérennité des améliorations.',
    },
  },
  {
    code: '03 / CONSISTÊNCIA',
    title: { pt: 'Importância da consistência', fr: 'Importance de la constance' },
    text: {
      pt: 'O sucesso depende da consistência nas nove práticas apresentadas. A melhoria contínua diária é fundamental para criar uma cultura de aprendizagem e inovação.',
      fr: 'Le succès dépend de la constance dans les neuf pratiques présentées. L’amélioration continue quotidienne est fondamentale pour créer une culture d’apprentissage et d’innovation.',
    },
  },
  {
    code: '04 / SUSTENTABILIDADE',
    title: { pt: 'Transformação duradoura', fr: 'Transformation durable' },
    text: {
      pt: 'A melhoria contínua no dia a dia, combinada com o envolvimento das pessoas, transforma a organização de forma sustentável, elevando a competitividade e a satisfação do cliente.',
      fr: 'L’amélioration continue au quotidien, combinée à l’implication des personnes, transforme durablement l’organisation, augmentant la compétitivité et la satisfaction client.',
    },
  },
];

export const gembaFlashCriteria: {
  title: Record<Language, string>;
  red: Record<Language, string>;
  green: Record<Language, string>;
}[] = [
  {
    title: { pt: 'Posto 5S', fr: 'Poste 5S' },
    red: { pt: 'Ferramentas espalhadas, procura constante', fr: 'Outils dispersés, recherche permanente' },
    green: { pt: 'Tudo identificado, limpo e acessível em < 10s', fr: 'Tout est identifié, propre et accessible en < 10s' },
  },
  {
    title: { pt: 'Fluxo & WIP', fr: 'Flux & En-cours' },
    red: { pt: 'Montanhas de paletes / dossiers parados', fr: 'Montagnes de palettes / dossiers bloqués' },
    green: { pt: 'Flux contínuo peça a peça sem acumulação', fr: 'Flux continu pièce à pièce sans accumulation' },
  },
  {
    title: { pt: 'Padrões Visuais', fr: 'Standards Visuels' },
    red: { pt: 'Cada turno trabalha à sua maneira', fr: 'Chaque équipe travaille à sa façon' },
    green: { pt: 'SOP visual de 1 página afixado ao posto', fr: 'SOP visuel d’une page affiché au poste' },
  },
  {
    title: { pt: 'Ritmo Takt', fr: 'Rythme Takt' },
    red: { pt: 'Urgências permanentes e horas extra', fr: 'Urgences permanentes et heures supp.' },
    green: { pt: 'Quadro horário visível alinhado ao Takt Time', fr: 'Tableau horaire visuel calé sur le Takt Time' },
  },
  {
    title: { pt: 'Qualidade Fonte', fr: 'Qualité Source' },
    red: { pt: 'Retrabalho e triagem no fim da linha', fr: 'Retouches et tri en fin de ligne' },
    green: { pt: 'Deteção imediata no posto (Andon / Poka-Yoke)', fr: 'Détection immédiate au poste (Andon / Poka-Yoke)' },
  },
];

export const radarPrinciplesConfig: {
  short: Record<Language, string>;
  title: Record<Language, string>;
  action: Record<Language, string>;
  tools: string[];
}[] = [
  {
    short: { pt: 'Mentalidade', fr: 'Mentalité' },
    title: { pt: 'Ver o mundo sem desperdício', fr: 'Voir le monde sans gaspillage' },
    action: {
      pt: 'Alinhar a liderança no Gemba e desdobrar prioridades claras via Hoshin Kanri.',
      fr: 'Aligner le leadership sur le Gemba et déployer des priorités claires via Hoshin Kanri.',
    },
    tools: ['Hoshin Kanri'],
  },
  {
    short: { pt: 'Valor Cliente', fr: 'Valeur Client' },
    title: { pt: 'Valor definido pelo cliente', fr: 'Valeur définie par le client' },
    action: {
      pt: 'Mapear requisitos críticos do cliente e eliminar tarefas que o cliente não valoriza.',
      fr: 'Cartographier les exigences critiques du client et supprimer ce qu’il ne paie pas.',
    },
    tools: ['VoC', 'QFD'],
  },
  {
    short: { pt: 'Zero Muda', fr: 'Zéro Muda' },
    title: { pt: 'Corte tudo o que não acrescenta valor', fr: 'Éliminez ce qui n’ajoute pas de valeur' },
    action: {
      pt: 'Lançar auditorias 5S nas áreas críticas e desenhar o VSM do processo principal.',
      fr: 'Lancer des chantiers 5S sur les zones clés et tracer la VSM du flux principal.',
    },
    tools: ['5S', 'VSM'],
  },
  {
    short: { pt: 'Fluxo Contínuo', fr: 'Flux Continu' },
    title: { pt: 'Faça o trabalho fluir sem paragens', fr: 'Faites circuler le travail sans arrêt' },
    action: {
      pt: 'Limitar o trabalho em curso (WIP) com Kanban e reequilibrar postos gargalo.',
      fr: 'Limiter les en-cours (WIP) via Kanban et rééquilibrer les postes goulots.',
    },
    tools: ['Kanban', 'Balanceamento'],
  },
  {
    short: { pt: 'Sistema Pull', fr: 'Flux Tiré' },
    title: { pt: 'Produza só quando o cliente pedir', fr: 'Produisez quand le client commande' },
    action: {
      pt: 'Implementar reposição puxada Just-in-Time e nivelar o mix de produção (Heijunka).',
      fr: 'Déployer le réapprovisionnement tiré Just-in-Time et lisser la charge (Heijunka).',
    },
    tools: ['JIT', 'Heijunka'],
  },
  {
    short: { pt: 'Padronização', fr: 'Standardisation' },
    title: { pt: 'Padronize antes de melhorar', fr: 'Standardisez avant d’améliorer' },
    action: {
      pt: 'Documentar SOP visuais e checklists nas operações críticas para estabilizar resultados.',
      fr: 'Formaliser des SOP visuels et checklists sur les tâches clés pour stabiliser la qualité.',
    },
    tools: ['SOP', 'Checklists'],
  },
  {
    short: { pt: 'Causa Raiz', fr: 'Cause Racine' },
    title: { pt: 'Ataque a causa, não o sintoma', fr: 'Attaquez la cause, pas le symptôme' },
    action: {
      pt: 'Instituir análise sistemática de 5 Porquês e Ishikawa perante desvios recorrentes.',
      fr: 'Instaurer des analyses 5 Pourquoi et Ishikawa face aux dysfonctionnements récurrents.',
    },
    tools: ['5 Porquês', 'Ishikawa'],
  },
  {
    short: { pt: 'Pessoas/Visual', fr: 'Équipes/Visuel' },
    title: { pt: 'Melhores ideias & Transparência total', fr: 'Meilleures idées & Transparence totale' },
    action: {
      pt: 'Instalar painéis de controlo visuais no terreno e envolver operadores nas soluções.',
      fr: 'Installer des tableaux d’indicateurs visuels terrain et impliquer les opérateurs.',
    },
    tools: ['Gestão Visual'],
  },
  {
    short: { pt: 'Kaizen/PDCA', fr: 'Kaizen/PDCA' },
    title: { pt: 'Melhore um pouco a cada dia', fr: 'Améliorez un peu chaque jour' },
    action: {
      pt: 'Estabelecer rotinas diárias de melhoria incremental estruturadas pelo ciclo PDCA.',
      fr: 'Ancrer des rituels quotidiens d’amélioration incrémentale pilotés par le cycle PDCA.',
    },
    tools: ['PDCA'],
  },
];

export const toolsTechnicalSpecs: Record<string, TechnicalToolSpec> = {
  'Hoshin Kanri': {
    key: 'Hoshin Kanri',
    principleTag: { pt: 'Ver o mundo sem desperdício', fr: 'Voir le monde sans gaspillage' },
    title: 'Hoshin Kanri',
    content: {
      pt: {
        what: 'Metodologia de desdobramento estratégico que traduz a visão de longo prazo da direção em objetivos anuais e planos de ação concretos em cada nível operacional.',
        when: 'No planeamento estratégico anual e nas revisões mensais de alinhamento entre direção, chefias intermédias e equipas no Gemba.',
        impact: 'Exemplo Gemba: Numa PME industrial, o desdobramento de 3 prioridades claras eliminou 14 projetos paralelos e aumentou a entrega no prazo de 78% para 96% em 90 dias.',
      },
      fr: {
        what: 'Méthodologie de déploiement stratégique qui traduit la vision long terme de la direction en objectifs annuels et plans d’action concrets à chaque niveau opérationnel.',
        when: 'Lors de la planification stratégique annuelle et des revues mensuelles d’alignement entre direction, managers et équipes terrain.',
        impact: 'Exemple Gemba : Dans une PME industrielle, le déploiement de 3 priorités claires a stoppé 14 projets dispersés et fait passer le taux de service de 78 % à 96 % en 90 jours.',
      },
    },
  },
  VoC: {
    key: 'VoC',
    principleTag: { pt: 'Valor definido pelo cliente', fr: 'Valeur définie par le client' },
    title: 'Voice of the Customer (VoC)',
    content: {
      pt: {
        what: 'Processo estruturado de recolha e análise das expectativas, necessidades explícitas e implícitas e critérios de satisfação do cliente.',
        when: 'Antes de conceber ou rever produtos, serviços ou processos críticos, e sempre que ocorram alterações nas exigências do mercado.',
        impact: 'Exemplo Gemba: Numa metalomecânica, deixar de pintar o interior oculto de chassis elétricos (que o cliente não valorizava) poupou 42 000 €/ano.',
      },
      fr: {
        what: 'Processus structuré de collecte et d’analyse des attentes, besoins explicites ou implicites et critères de satisfaction du client.',
        when: 'Avant de concevoir ou réviser des produits, services ou processus clés, et lors de toute évolution du marché.',
        impact: 'Exemple Gemba : En métallerie, arrêter de peindre l’intérieur caché des châssis électriques (non valorisé par le client) a économisé 42 000 €/an.',
      },
    },
  },
  QFD: {
    key: 'QFD',
    principleTag: { pt: 'Valor definido pelo cliente', fr: 'Valeur définie par le client' },
    title: 'QFD — Quality Function Deployment',
    content: {
      pt: {
        what: 'Implantação da Função Qualidade: matriz estruturada (Casa da Qualidade) que converte a Voz do Cliente em especificações técnicas e parâmetros de controlo do processo.',
        when: 'No desenvolvimento de novos produtos/serviços ou na reengenharia de processos para assegurar conformidade desde a origem.',
        impact: 'Evita defeitos de conceção e garante que cada etapa produtiva responde diretamente a um requisito real do cliente.',
      },
      fr: {
        what: 'Déploiement de la Fonction Qualité : matrice structurée (Maison de la Qualité) convertissant la Voix du Client en spécifications techniques et paramètres de contrôle.',
        when: 'Lors du développement de nouveaux produits/services ou de la refonte de processus pour garantir la conformité dès l’origine.',
        impact: 'Évite les défauts de conception et assure que chaque étape répond à une exigence client réelle.',
      },
    },
  },
  '5S': {
    key: '5S',
    principleTag: { pt: 'Corte tudo o que não acrescenta valor', fr: 'Éliminez tout ce qui n’ajoute pas de valeur' },
    title: 'Metodologia 5S',
    content: {
      pt: {
        what: 'Disciplina de organização do espaço de trabalho baseada em 5 etapas: Seiri (Separar), Seiton (Ordenar), Seiso (Limpar), Seiketsu (Padronizar) e Shitsuke (Manter).',
        when: 'Como primeiro passo prático em qualquer área operacional, escritório ou armazém para estabelecer ordem e visibilidade imediata.',
        impact: 'Exemplo Gemba: Num cais de expedição, instalar um quadro de sombras para leitores e ferramentas poupou 35 minutos logo no início de cada turno.',
      },
      fr: {
        what: 'Discipline d’organisation de l’espace de travail en 5 étapes : Seiri (Trier), Seiton (Ranger), Seiso (Nettoyer), Seiketsu (Standardiser) et Shitsuke (Maintenir).',
        when: 'Comme première action terrain dans tout atelier, bureau ou entrepôt pour instaurer ordre et visibilité.',
        impact: 'Exemple Gemba : Sur un quai d’expédition, un panneau d’ombres pour scanners et outils a fait gagner 35 minutes dès la prise de poste chaque matin.',
      },
    },
  },
  VSM: {
    key: 'VSM',
    principleTag: { pt: 'Corte tudo o que não acrescenta valor', fr: 'Éliminez tout ce qui n’ajoute pas de valeur' },
    title: 'VSM — Mapa do Fluxo de Valor',
    content: {
      pt: {
        what: 'Representação visual completa do fluxo de materiais e de informação desde o fornecedor até ao cliente, distinguindo tempo de valor acrescentado e tempo de espera.',
        when: 'Para diagnosticar processos lentos, identificar perdas visíveis e invisíveis e desenhar o estado futuro enxuto.',
        impact: 'Exemplo Gemba: Num serviço de orçamentos, o VSM revelou 3h20 de trabalho real em 14 dias de espera — o prazo caiu para 48h após simplificação.',
      },
      fr: {
        what: 'Représentation visuelle complète des flux physiques et d’information du fournisseur au client, distinguant temps à valeur ajoutée et temps d’attente.',
        when: 'Pour diagnostiquer les processus lents, révéler les pertes visibles et invisibles et concevoir l’état futur cible.',
        impact: 'Exemple Gemba : Dans un service devis, la VSM a révélé 3h20 de travail réel sur 14 jours d’attente — délai ramené à 48h après suppression des attentes.',
      },
    },
  },
  Kanban: {
    key: 'Kanban',
    principleTag: { pt: 'Faça o trabalho fluir sem paragens', fr: 'Faites circuler le travail sans arrêt' },
    title: 'Sistema Kanban',
    content: {
      pt: {
        what: 'Sistema visual de sinalização e controlo de fluxo que limita o trabalho em curso (WIP) e autoriza a produção ou reposição apenas quando há capacidade ou consumo.',
        when: 'Em linhas de produção, cadeias de abastecimento e equipas de serviços para evitar sobrecarga e engarrafamentos.',
        impact: 'Exemplo Gemba: O sistema de dupla caixa (Kanban) em 120 referências eliminou 100% das ruturas de componentes na linha de montagem.',
      },
      fr: {
        what: 'Système visuel de signalisation et de pilotage des flux limitant les en-cours (WIP) et déclenchant la production ou le réapprovisionnement au besoin.',
        when: 'Sur les lignes de production, chaînes logistiques et équipes de services pour éviter surcharges et goulots.',
        impact: 'Exemple Gemba : Le double bac Kanban sur 120 références a supprimé 100 % des ruptures de composants sur la ligne d’assemblage.',
      },
    },
  },
  Balanceamento: {
    key: 'Balanceamento',
    principleTag: { pt: 'Faça o trabalho fluir sem paragens', fr: 'Faites circuler le travail sans arrêt' },
    title: 'Balanceamento de Linha',
    content: {
      pt: {
        what: 'Distribuição equilibrada das tarefas pelos vários postos de trabalho de modo a alinhar o tempo de ciclo de cada posto com o Takt Time do cliente.',
        when: 'Sempre que existam postos sobrecarregados a gerar filas enquanto outros postos ficam à espera de trabalho.',
        impact: 'Exemplo Gemba: Transferir duas micro-tarefas do posto gargalo (68s) para a embalagem (34s) aumentou a cadência da linha em +28% sem contratar.',
      },
      fr: {
        what: 'Répartition équilibrée des tâches entre postes de travail afin d’aligner chaque temps de cycle sur le Takt Time client.',
        when: 'Dès que certains postes saturent et créent des files d’attente tandis que d’autres sont sous-utilisés.',
        impact: 'Exemple Gemba : Transférer deux micro-tâches du poste goulot (68s) vers l’emballage (34s) a augmenté la cadence de +28 % à effectif constant.',
      },
    },
  },
  JIT: {
    key: 'JIT',
    principleTag: { pt: 'Produza só quando o cliente pedir', fr: 'Produisez uniquement quand le client commande' },
    title: 'Just-in-Time (JIT)',
    content: {
      pt: {
        what: 'Filosofia e sistema operacional de produção puxada: produzir e entregar apenas o item certo, na quantidade exata e no momento exato pedido pelo cliente.',
        when: 'Para substituir a produção empurrada por previsões incertas e eliminar excessos de stock e obsolescência.',
        impact: 'Exemplo Gemba: Reduzir encours e stocks intermédios para metade libertou 240 000 € de tesouraria em 4 meses numa PME industrial.',
      },
      fr: {
        what: 'Système opérationnel de production tirée : produire et livrer uniquement le bon produit, en juste quantité et au moment exact demandé par le client.',
        when: 'Pour remplacer la production poussée sur prévisions et supprimer surstocks et obsolescence.',
        impact: 'Exemple Gemba : Diviser par deux les en-cours et stocks a libéré 240 000 € de trésorerie en 4 mois dans une PME industrielle.',
      },
    },
  },
  Heijunka: {
    key: 'Heijunka',
    principleTag: { pt: 'Produza só quando o cliente pedir', fr: 'Produisez uniquement quand le client commande' },
    title: 'Heijunka (Nivelamento)',
    content: {
      pt: {
        what: 'Nivelamento do volume e do mix de produção ao longo de um período fixo, transformando picos irregulares de encomendas numa cadência estável.',
        when: 'Em ambientes com procura variável ou múltiplos modelos/referências para evitar picos de horas extraordinárias seguidos de paragens.',
        impact: 'Exemplo Gemba: Fracionar lotes semanais de 500 peças em lançamentos diários de 50 peças aumentou a produção em +14% e eliminou horas extra.',
      },
      fr: {
        what: 'Lissage du volume et du mix de production sur une période fixe, transformant les à-coups de commandes en cadence régulière.',
        when: 'Dans les environnements à demande variable ou multi-références pour éviter alternance de surcharges et d’arrêts.',
        impact: 'Exemple Gemba : Fractionner des lots hebdomadaires de 500 pièces en lancements quotidiens de 50 a accru la production de +14 % sans heures supp.',
      },
    },
  },
  SOP: {
    key: 'SOP',
    principleTag: { pt: 'Padronize antes de melhorar', fr: 'Standardisez avant d’améliorer' },
    title: 'SOP — Standard Operating Procedures',
    content: {
      pt: {
        what: 'Procedimentos Operacionais Padrão claros, visuais e concisos (1 página no posto) que descrevem a sequência segura e mais eficiente conhecida para executar uma tarefa.',
        when: 'Na formação de novos colaboradores, na estabilização de processos críticos e sempre que uma melhoria PDCA é validada.',
        impact: 'Exemplo Gemba: Com SOP visuais ilustrados ao posto, o tempo de autonomia de novos operadores caiu de 3 semanas para 3 dias.',
      },
      fr: {
        what: 'Procédures Opérationnelles Standard claires et visuelles (1 page au poste) décrivant la séquence la plus sûre et efficace connue pour exécuter une tâche.',
        when: 'Lors de l’intégration de nouveaux opérateurs, de la stabilisation des processus clés et après chaque amélioration PDCA validée.',
        impact: 'Exemple Gemba : Avec des SOP visuels affichés au poste, le temps d’autonomie des nouveaux opérateurs est passé de 3 semaines à 3 jours.',
      },
    },
  },
  Checklists: {
    key: 'Checklists',
    principleTag: { pt: 'Padronize antes de melhorar', fr: 'Standardisez avant d’améliorer' },
    title: 'Checklists Operacionais',
    content: {
      pt: {
        what: 'Listas de verificação objetivas dos pontos críticos de controlo antes, durante ou após uma operação, arranque de linha ou auditoria.',
        when: 'Em mudanças de formato (setup), verificações de qualidade, segurança e rotinas diárias de liderança no terreno.',
        impact: 'Exemplo Gemba: Uma checklist de 4 pontos (3 minutos) no arranque de máquina eliminou 100% dos lotes rejeitados.',
      },
      fr: {
        what: 'Listes de vérification objectives des points de contrôle critiques avant, pendant ou après une opération, un démarrage ou un audit.',
        when: 'Lors des changements de série, contrôles qualité, vérifications sécurité et routines quotidiennes terrain.',
        impact: 'Exemple Gemba : Une checklist de 4 points (3 minutes) au démarrage machine a éliminé 100 % des séries rejetées.',
      },
    },
  },
  '5 Porquês': {
    key: '5 Porquês',
    principleTag: { pt: 'Ataque a causa, não o sintoma', fr: 'Attaquez la cause, pas le symptôme' },
    title: 'Método dos 5 Porquês',
    content: {
      pt: {
        what: 'Técnica interrogativa iterativa que consiste em perguntar sucessivamente «Porquê?» perante um problema até ultrapassar os sintomas e alcançar a causa raiz.',
        when: 'Na ocorrência de desvios operacionais, defeitos de qualidade, atrasos ou incidentes no Gemba.',
        impact: 'Exemplo Gemba: Em vez de repor óleo todas as semanas numa máquina, os 5 Porquês revelaram uma junta partida — reparada uma única vez na origem.',
      },
      fr: {
        what: 'Technique interrogative itérative consistant à demander successivement « Pourquoi ? » face à un écart jusqu’à dépasser les symptômes et atteindre la cause racine.',
        when: 'Dès l’apparition d’un défaut qualité, d’un retard, d’une panne ou d’un incident sur le terrain.',
        impact: 'Exemple Gemba : Plutôt que de rajouter de l’huile chaque semaine sur une machine, les 5 Pourquoi ont révélé un joint fendu — réparé définitivement.',
      },
    },
  },
  Ishikawa: {
    key: 'Ishikawa',
    principleTag: { pt: 'Ataque a causa, não o sintoma', fr: 'Attaquez la cause, pas le symptôme' },
    title: 'Diagrama de Ishikawa',
    content: {
      pt: {
        what: 'Diagrama de Causa e Efeito (Espinha de Peixe) que organiza em equipa todas as potenciais causas de um problema segundo famílias (Método, Máquina, Mão de obra, Material, Medida, Meio).',
        when: 'Em problemas complexos ou multifatoriais onde a causa raiz não é evidente à primeira vista.',
        impact: 'Estrutura a análise coletiva, evita conclusões precipitadas e orienta ações corretivas robustas.',
      },
      fr: {
        what: 'Diagramme de Cause à Effet (Arête de Poisson) structurant en équipe toutes les causes potentielles d’un problème selon les 6M (Méthode, Machine, Main-d’œuvre, Matière, Mesure, Milieu).',
        when: 'Pour les problèmes complexes ou multifactoriels dont l’origine n’est pas immédiatement évidente.',
        impact: 'Structure l’analyse collective, évite les conclusions hâtives et cible des actions correctives durables.',
      },
    },
  },
  'Gestão Visual': {
    key: 'Gestão Visual',
    principleTag: {
      pt: 'Quem faz o trabalho tem as melhores ideias & Transparência total',
      fr: 'Ceux qui font le travail ont les meilleures idées & Transparence totale',
    },
    title: 'Gestão Visual & Painéis de Controlo',
    content: {
      pt: {
        what: 'Exposição clara e em tempo real dos objetivos, indicadores (KPIs), estado do fluxo e desvios diretamente no local de trabalho.',
        when: 'Nas reuniões curtas diárias (5–10 min) junto aos quadros de indicadores para alinhar a equipa e decidir ações imediatas.',
        impact: 'Exemplo Gemba: Um sinal luminoso Andon nos postos reduziu o tempo de resposta da chefia para menos de 90 segundos e cortou paragens em 75%.',
      },
      fr: {
        what: 'Affichage clair et en temps réel des objectifs, indicateurs (KPI), état des flux et écarts directement sur le lieu de travail.',
        when: 'Lors des points quotidiens courts (5–10 min) devant les tableaux d’indicateurs pour aligner l’équipe et agir vite.',
        impact: 'Exemple Gemba : Un bouton lumineux Andon aux postes a réduit le temps d’intervention du chef à moins de 90 secondes et divisé les arrêts par 4.',
      },
    },
  },
  PDCA: {
    key: 'PDCA',
    principleTag: { pt: 'Melhore um pouco a cada dia', fr: 'Améliorez un peu chaque jour' },
    title: 'Ciclo PDCA (Plan · Do · Check · Act)',
    content: {
      pt: {
        what: 'Método científico de melhoria contínua em 4 fases: Planear a hipótese, Executar em pequena escala, Verificar os resultados medidos e Agir/Padronizar o ganho.',
        when: 'Em todas as iniciativas de melhoria contínua diária (Kaizen) e resolução estruturada de problemas.',
        impact: 'Exemplo Gemba: Inclinar um suporte de caixas a 30° em teste PDCA poupou 4 segundos por ciclo e foi padronizado nas 4 linhas no próprio dia.',
      },
      fr: {
        what: 'Méthode scientifique d’amélioration continue en 4 étapes : Planifier l’hypothèse, Déployer à petite échelle, Contrôler les résultats mesurés et Agir/Standardiser le gain.',
        when: 'Dans toute démarche d’amélioration continue quotidienne (Kaizen) et de résolution de problèmes.',
        impact: 'Exemple Gemba : Incliner un support de cartons à 30° en test PDCA a fait gagner 4 secondes par cycle et a été standardisé le jour même sur 4 lignes.',
      },
    },
  },
};

export function getDefaultDemoHistory(): EvolutionSnapshot[] {
  return [
    {
      id: 'demo-t0',
      date: '2026-05-15',
      labelPt: 'Diagnóstico Inicial (T0)',
      labelFr: 'Diagnostic Initial (T0)',
      scores: [2, 3, 2, 2, 2, 3, 2, 3, 3],
    },
    {
      id: 'demo-t1',
      date: '2026-07-10',
      labelPt: 'Após Chantier 5S & Gestão Visual',
      labelFr: 'Après Chantier 5S & Management Visuel',
      scores: [4, 4, 5, 3, 3, 4, 3, 5, 4],
    },
    {
      id: 'demo-t2',
      date: '2026-09-18',
      labelPt: 'Fluxo Kanban & Padrões SOP',
      labelFr: 'Flux Kanban & Standards SOP',
      scores: [5, 5, 6, 5, 5, 6, 5, 6, 5],
    },
    {
      id: 'demo-t3',
      date: '2026-11-18',
      labelPt: 'Auditoria Atual (Kaizen Contínuo)',
      labelFr: 'Audit Actuel (Kaizen Continu)',
      scores: [6, 6, 7, 6, 6, 7, 6, 7, 6],
    },
  ];
}
