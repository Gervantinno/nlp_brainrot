export function highlightText(text: string, forms: string[]): string {
  if (!forms || forms.length === 0) return text;

  // Create regex pattern from all forms (sorted by length descending to match longer first)
  const escapedForms = forms
    .map(f => f.trim().toLowerCase())
    .filter(f => f)
    .sort((a, b) => b.length - a.length)
    .map(f => f.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));

  if (escapedForms.length === 0) return text;

  const pattern = escapedForms.join('|');
  // Case-insensitive matching for Cyrillic and Latin
  const wordRegex = new RegExp(`(${pattern})`, 'gi');

  return text.replace(wordRegex, '<span class="highlight">$1</span>');
}
