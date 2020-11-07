import { CHANGE_PASSWORD_FAIL, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_REQ } from '../constants'

const initialState = {
  error: undefined,
  loading: false,
  data:undefined,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PASSWORD_REQ:
      return { ...state, error: undefined, loading: true }

    case CHANGE_PASSWORD_FAIL:
      return { ...state, error: action.error, loading: false }

    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        data: {...action.payload }
      }
    
    default: return state
  }
}