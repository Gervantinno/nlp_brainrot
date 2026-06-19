import { useMemo } from 'react';
import type { Word } from '../types/word';

export function useWordSearch(words: Word[], query: string): Word[] {
  return useMemo(() => {
    if (!query.trim()) return [];

    const searchQuery = query.toLowerCase();
    return words.filter(word => {
      const matchCanonical = word.canonical.toLowerCase().startsWith(searchQuery);
      const matchWord = word.word.toLowerCase().startsWith(searchQuery);
      const matchForms = word.forms.some(f => f.toLowerCase().startsWith(searchQuery));
      return matchCanonical || matchWord || matchForms;
    });
  }, [words, query]);
}
