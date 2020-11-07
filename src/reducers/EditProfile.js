import { ORDER_DETAIL_REQ, ORDER_DETAIL_FAIL, ORDER_DETAIL_SUCCESS, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_REQ } from '../constants'

const initialState = {
  error: undefined,
  loading: false,
  data:undefined,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQ:
      return { ...state, error: undefined, loading: true }

    case UPDATE_PROFILE_FAIL:
      return { ...state, error: action.error, loading: false }

    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: {...action.payload }
      }
    
    default: return state
  }
}