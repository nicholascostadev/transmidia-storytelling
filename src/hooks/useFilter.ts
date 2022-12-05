import { TFilter } from '@root/../@types/queryFilter'
import { useState } from 'react'

export const useFilter = () => {
  const [filterState, setFilterState] = useState<TFilter>({
    field: 'email',
    approval: undefined,
  })

  const handleFilterChange = (
    filter: TFilter['field'],
    approval: 'none' | 'approved' | 'unapproved',
  ) => {
    if (approval === 'none') {
      setFilterState({
        field: filter || filterState.field,
        approval: undefined,
      })
    } else {
      setFilterState({
        field: filterState.field,
        approval: approval === 'approved',
      })
    }
  }

  return { filter: filterState, handleFilterChange }
}
