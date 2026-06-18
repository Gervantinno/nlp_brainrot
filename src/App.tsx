import { useState, useEffect } from 'react'
import { loadWords } from './data/words'
import { useDebounce } from './hooks/useDebounce'
import { useWordSearch } from './hooks/useWordSearch'
import { SearchInput } from './components/SearchInput'
import { OptionsList } from './components/OptionsList'
import { WordCard } from './components/WordCard'
import type { Word } from './types/word'
import './App.css'

const DEBOUNCE_DELAY = 300;

function App() {
  const [search, setSearch] = useState('')
  const [selectedWord, setSelectedWord] = useState<number | null>(null)
  const [words, setWords] = useState<Word[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const { debouncedValue: debouncedSearch, isDebouncing } = useDebounce(search, DEBOUNCE_DELAY)
  const results = useWordSearch(words, debouncedSearch)

  useEffect(() => {
    loadWords()
      .then(setWords)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const displayWord = selectedWord !== null ? results[selectedWord] : null

  const handleSelectWord = (index: number) => setSelectedWord(index)
  const handleBack = () => setSelectedWord(null)
  const handleSearchChange = (value: string) => {
    setSearch(value)
    setSelectedWord(null)
  }

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Загрузка...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container">
        <div className="error">Ошибка: {error}</div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="search-container">
        <SearchInput
          value={search}
          onChange={handleSearchChange}
          placeholder="Поиск слова..."
        />

        {results.length > 1 && !displayWord && (
          <OptionsList
            words={results}
            onSelect={handleSelectWord}
          />
        )}

        {displayWord && (
          <WordCard
            word={displayWord}
            showBack
            onBack={handleBack}
          />
        )}

        {results.length === 1 && !displayWord && (
          <WordCard word={results[0]} />
        )}

        {search.trim() && results.length === 0 && !isDebouncing && (
          <div className="no-results">Ничего не найдено</div>
        )}
      </div>
    </div>
  )
}

export default App
