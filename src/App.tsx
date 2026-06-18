import { useState } from 'react'
import { words } from './data/words'
import { useDebounce } from './hooks/useDebounce'
import { useWordSearch } from './hooks/useWordSearch'
import { SearchInput } from './components/SearchInput'
import { OptionsList } from './components/OptionsList'
import { WordCard } from './components/WordCard'
import './App.css'

const DEBOUNCE_DELAY = 300;

function App() {
  const [search, setSearch] = useState('')
  const [selectedWord, setSelectedWord] = useState<number | null>(null)

  const { debouncedValue: debouncedSearch, isDebouncing } = useDebounce(search, DEBOUNCE_DELAY)
  const results = useWordSearch(words, debouncedSearch)

  const displayWord = selectedWord !== null ? results[selectedWord] : null

  const handleSelectWord = (index: number) => setSelectedWord(index)
  const handleBack = () => setSelectedWord(null)
  const handleSearchChange = (value: string) => {
    setSearch(value)
    setSelectedWord(null)
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
