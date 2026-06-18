import csvText from '../../пример корпуса.csv?raw';
import { parseCsv, type Word } from '../utils/parseCsv';

export const words: Word[] = parseCsv(csvText);
