import { useState, useEffect } from 'react';

interface DebounceResult<T> {
  debouncedValue: T;
  isDebouncing: boolean;
}

export function useDebounce<T>(value: T, delay: number): DebounceResult<T> {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const [isDebouncing, setIsDebouncing] = useState(false);

  useEffect(() => {
    setIsDebouncing(true);
    const timer = setTimeout(() => {
      setDebouncedValue(value);
      setIsDebouncing(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return { debouncedValue, isDebouncing };
}
