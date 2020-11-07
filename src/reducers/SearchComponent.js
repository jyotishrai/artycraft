import {
  SEARCH_REQUEST,
  SEARCH_FAIL,
  SEARCH_SUCCESS
} from '../constants'

const initialState = {
  error: undefined,
  loading: false,
  data:undefined
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_REQUEST:
      return { ...state, error: undefined, loading: true }

    case SEARCH_FAIL:
      return { ...state, error: action.error, loading: false }

    case SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        data: { ...action.payload }
      }
    
    default: return state
  }
}