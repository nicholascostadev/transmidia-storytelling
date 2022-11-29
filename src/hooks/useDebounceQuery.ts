import {
  filterReducer,
  initialState,
  QueryAction,
} from '@root/reducers/queryReducer'
import { useRouter } from 'next/router'
import { useEffect, useReducer } from 'react'
import { TFilter } from '../../@types/queryFilter'

/**
 * @param refreshFn - this is a function that will be called whenever the query
 * changes.
 * @param {number} [timeInMs=500] - the time in milliseconds that we want to wait
 * before we actually change the query
 * @returns An object with the following properties:
 * - `changeQuery`: a function that takes a string as a parameter and sets the query
 * state to that string
 * - `filterState`: the current state of the filter
 * - `dispatch`: a function that dispatches an action to the filter reducer
 */
export const useDebounceQuery = (
  refreshFn?: () => void,
  timeInMs: number = 500,
) => {
  const { push, query } = useRouter()
  const [filterState, dispatch] = useReducer(filterReducer, initialState)

  const changeQuery = (newQuery: string) => {
    dispatch({
      type: QueryAction.SET_QUERY,
      payload: { ...filterState, query: newQuery },
    })
  }

  const changeFilter = (filter: TFilter) => {
    dispatch({
      type: QueryAction.SET_FILTER,
      payload: { ...filterState, filter },
    })
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.q === filterState.query) return

      // whenever the query changes, we reset the page to 1
      // and also the lastAvailablePage to 1
      // because we want to show the first page of results
      // IF we don't do so, the list won't be shown(at least if the result has less than 5 items)
      if (refreshFn) refreshFn()
      push(
        {
          query: {
            ...query,
            q: filterState.query,
          },
        },
        undefined,
        {
          shallow: true,
          scroll: false,
        },
      )
    }, timeInMs)

    return () => clearTimeout(delayDebounceFn)
  }, [filterState.query, push, query, timeInMs, refreshFn])

  return { changeQuery, changeFilter, filterState, dispatch }
}
