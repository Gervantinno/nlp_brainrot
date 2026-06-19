import type { Word } from '../types/word';

export { type Word } from '../types/word';

/**
 * Parse a single CSV line handling quoted fields with commas inside
 */
function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      // Handle escaped quotes ("")
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }

  result.push(current.trim());
  return result;
}

/**
 * Parse CSV text into Word array
 * - Skips empty lines
 * - Skips lines with missing required fields (canonical, word, pos)
 */
export function parseCsv(csvText: string): Word[] {
  const lines = csvText.trim().split('\n');
  if (lines.length === 0) return [];

  const headers = parseCsvLine(lines[0]);
  const words: Word[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];

    // Skip empty lines
    if (!line.trim()) continue;

    const values = parseCsvLine(line);

    // Skip lines that don't have enough columns
    if (values.length < headers.length) continue;

    // Check required fields are non-empty
    const canonicalIdx = headers.indexOf('canonical');
    const wordIdx = headers.indexOf('word');
    const posIdx = headers.indexOf('pos');

    const hasRequiredFields =
      (canonicalIdx === -1 || values[canonicalIdx]?.trim()) &&
      (wordIdx === -1 || values[wordIdx]?.trim()) &&
      (posIdx === -1 || values[posIdx]?.trim());

    if (!hasRequiredFields) continue;

    const word: Word = {
      canonical: '',
      word: '',
      forms: [],
      pos: '',
      docFreq: 0,
      meanSurprisal: 0,
      examples: [],
      meaning: '',
      kind: ''
    };

    headers.forEach((header, index) => {
      const value = values[index] || '';
      const key = header.trim();

      switch (key) {
        case 'forms':
          word.forms = value.split(' / ').map(f => f.trim()).filter(f => f);
          break;
        case 'doc_freq':
          word.docFreq = parseInt(value, 10) || 0;
          break;
        case 'mean_surprisal':
          word.meanSurprisal = parseFloat(value) || 0;
          break;
        case 'examples':
          word.examples = value.split(' ||| ').map(e => e.trim()).filter(e => e);
          break;
        case 'canonical':
          word.canonical = value;
          break;
        case 'word':
          word.word = value;
          break;
        case 'pos':
          word.pos = value;
          break;
        case 'meaning':
          word.meaning = value;
          break;
        case 'kind':
          word.kind = value;
          break;
      }
    });

    words.push(word);
  }

  return words;
}
