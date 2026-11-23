export type Language = 'pt' | 'fr';

export type AppView = 'home' | 'principles' | 'privacy';

export type ToolCategory = 'all' | 'prod' | 'qual' | 'man';

export interface IndustrialTool {
  id: string;
  category: Exclude<ToolCategory, 'all'>;
  tag: Record<Language, string>;
  title: Record<Language, string>;
  kpi: string;
  summary: Record<Language, string>;
  steps: Record<Language, string[]>;
}

export interface TechnicalToolSpec {
  key: string;
  principleTag: Record<Language, string>;
  title: string;
  content: Record<
    Language,
    {
      what: string;
      when: string;
      impact: string;
    }
  >;
}

export interface EvolutionSnapshot {
  id: string;
  date: string;
  labelPt: string;
  labelFr: string;
  scores: number[];
}

export interface DiagnosticSubmission {
  name: string;
  company: string;
  email: string;
  phone: string;
  region: string;
  size: string;
  priority: string;
  notes: string;
}
