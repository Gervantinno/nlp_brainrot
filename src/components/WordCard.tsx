import type { Word } from '../types/word';
import { HighlightText } from './HighlightText';
import './WordCard.css';

interface WordCardProps {
  word: Word;
  showBack?: boolean;
  onBack?: () => void;
}

export function WordCard({ word, showBack = false, onBack }: WordCardProps) {
  return (
    <div className="result-card">
      {showBack && onBack && (
        <button className="back-button" onClick={onBack}>
          ← Назад
        </button>
      )}
      
      <div className="result-header">
        <h3 className="result-word">{word.word}</h3>
        <span className="result-pos">{word.pos}</span>
      </div>

      <div className="result-forms">
        <strong>Формы:</strong> {word.forms.join(', ')}
      </div>

      <div className="result-meaning">
        <strong>Значение:</strong> {word.meaning}
      </div>

      <div className="result-examples">
        <strong>Примеры:</strong>
        <ul>
          {word.examples.map((ex, i) => (
            <li key={i}>
              <HighlightText text={ex} forms={word.forms} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
