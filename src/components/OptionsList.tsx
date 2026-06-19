import type { Word } from '../types/word';
import './OptionsList.css';

interface OptionsListProps {
  words: Word[];
  onSelect: (index: number) => void;
}

export function OptionsList({ words, onSelect }: OptionsListProps) {
  return (
    <div className="options-list">
      <div className="options-header">Найдено вариантов: {words.length}</div>
      {words.map((word, index) => (
        <button
          key={index}
          className="option-item"
          onClick={() => onSelect(index)}
        >
          <div className="option-words">
            <span className="option-word">{word.word}</span>
            {word.canonical !== word.word && (
              <span className="option-canonical">{word.canonical}</span>
            )}
          </div>
          <span className="option-pos">{word.pos}</span>
        </button>
      ))}
    </div>
  );
}
