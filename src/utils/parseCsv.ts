import type { Word } from '../types/word';

export { type Word } from '../types/word';

export function parseCsv(csvText: string): Word[] {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(';');

  return lines.slice(1).map(line => {
    const values = line.split(';');
    const result: Word = {
      canonical: '',
      word: '',
      forms: [],
      pos: '',
      docFreq: 0,
      meanSurprisal: 0,
      examples: [],
      meaning: ''
    };

    headers.forEach((header, index) => {
      const value = values[index] || '';
      const key = header.trim();

      switch (key) {
        case 'forms':
          result.forms = value.split(' / ').map(f => f.trim()).filter(f => f);
          break;
        case 'doc_freq':
          result.docFreq = parseInt(value, 10) || 0;
          break;
        case 'mean_surprisal':
          result.meanSurprisal = parseFloat(value) || 0;
          break;
        case 'examples':
          result.examples = value.split(' ||| ').map(e => e.trim()).filter(e => e);
          break;
        case 'canonical':
          result.canonical = value;
          break;
        case 'word':
          result.word = value;
          break;
        case 'pos':
          result.pos = value;
          break;
        case 'meaning':
          result.meaning = value;
          break;
      }
    });

    return result;
  });
}
