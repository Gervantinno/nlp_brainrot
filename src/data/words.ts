import type { Word } from '../types/word';
import { parseCsv } from '../utils/parseCsv';

let cachedWords: Word[] | null = null;

export async function loadWords(): Promise<Word[]> {
  if (cachedWords) {
    return cachedWords;
  }

  const response = await fetch('final_corpus-2.csv');
  const csvText = await response.text();
  cachedWords = parseCsv(csvText);
  
  return cachedWords;
}

export function getWordsSync(): Word[] {
  if (!cachedWords) {
    throw new Error('Words not loaded yet. Call loadWords() first.');
  }
  return cachedWords;
}
