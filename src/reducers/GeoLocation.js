import {
  ADDRESS_FROM_GOOGLE_REQ,
  ADDRESS_FROM_GOOGLE_SUCCESS,
  ADDRESS_FROM_GOOGLE_FAIL,
} from '../constants'

const initialState = {
  error: undefined,
  loading: false,
   data:undefined
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADDRESS_FROM_GOOGLE_REQ:
      return { ...state, error: undefined, loading: true }
    case ADDRESS_FROM_GOOGLE_FAIL:
      return { ...state, error: action.error, loading: false }
    case ADDRESS_FROM_GOOGLE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload 
      }
    default: return state
  }
}