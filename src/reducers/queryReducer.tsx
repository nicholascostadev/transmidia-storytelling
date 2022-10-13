import { TFilter } from '../../@types/queryFilter'

export enum QueryAction {
  SET_QUERY = 'SET_QUERY',
  SET_FILTER = 'SET_FILTER',
}
interface State {
  query: string
  filter: TFilter
}

type Action = {
  type: QueryAction
  payload: State
}

export const initialState: State = {
  query: '',
  filter: {
    field: 'email',
    approval: undefined as undefined | boolean,
  },
}
export const filterReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case QueryAction.SET_QUERY:
      return {
        ...state,
        query: action.payload.query,
      }
    case QueryAction.SET_FILTER:
      return {
        ...state,
        filter: action.payload.filter,
      }
    default:
      return state
  }
}
