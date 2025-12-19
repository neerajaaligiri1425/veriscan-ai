
export interface Source {
  title: string;
  uri: string;
}

export interface PlagiarismMatch {
  segment: string;
  sourceUrl?: string;
  sourceTitle?: string;
  isSuspicious: boolean;
}

export interface AnalysisResult {
  overallScore: number;
  summary: string;
  matches: PlagiarismMatch[];
  sources: Source[];
  wordCount: number;
}

export enum AppStatus {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR'
}
