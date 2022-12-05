import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

export const useDebouncedQuery = () => {
  const [query, setQuery] = useState('')
  const debounced = useDebouncedCallback((value: string) => {
    setQuery(value)
  }, 500)

  return { debounced, query }
}
