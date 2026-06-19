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
        <div className="result-word-container">
          <h3 className="result-word">{word.word}</h3>
          {word.canonical !== word.word && (
            <span className="result-canonical">{word.canonical}</span>
          )}
        </div>
        <div className="result-tags">
          <span className="result-pos">{word.pos}</span>
          {word.kind && <span className="result-kind">{word.kind}</span>}
        </div>
      </div>

      <div className="result-forms">
        <strong>Формы:</strong> {word.forms.join(', ')}
      </div>

      {word.meaning && (
        <div className="result-meaning">
          <strong>Значение:</strong> {word.meaning}
        </div>
      )}

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
