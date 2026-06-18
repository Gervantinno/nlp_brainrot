export interface Word {
  canonical: string;
  word: string;
  forms: string[];
  pos: string;
  docFreq: number;
  meanSurprisal: number;
  examples: string[];
  meaning: string;
}
