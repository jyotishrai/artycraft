import { 
  REVIEW_RATING_API_REQ, 
  REVIEW_RATING_API_FAIL, 
  REVIEW_RATING_API_SUCCESS } 
  from '../constants'

const initialState = {
  error: undefined,
  loading: false,
   data:undefined,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case REVIEW_RATING_API_REQ:
      return { ...state, error: undefined, loading: true }
    case REVIEW_RATING_API_FAIL:
      return { ...state, error: action.error, loading: false }
    case REVIEW_RATING_API_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload 
      }

    default: return state
  }
}