import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

export const useDebouncedQuery = (timeInMs: number = 500) => {
  const [query, setQuery] = useState('')
  const debounced = useDebouncedCallback((value: string) => {
    setQuery(value)
  }, timeInMs)

  return { debounced, query }
}
