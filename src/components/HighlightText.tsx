import { highlightText } from '../utils/highlightText';
import './HighlightText.css';

interface HighlightTextProps {
  text: string;
  forms: string[];
}

export function HighlightText({ text, forms }: HighlightTextProps) {
  const highlighted = highlightText(text, forms);
  
  return <span dangerouslySetInnerHTML={{ __html: highlighted }} />;
}
