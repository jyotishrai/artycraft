import {
  HOME_REQUEST,
  HOME_FAIL,
  HOME_SUCCESS
} from '../constants'

const initialState = {
  error: undefined,
  loading: false,
  data:undefined
}

export default (state = initialState, action) => {
  switch (action.type) {
    case HOME_REQUEST:
      return { ...state, error: undefined, loading: true }

    case HOME_FAIL:
      return { ...state, error: action.error, loading: false }

    case HOME_SUCCESS:
      return {
        ...state,
        loading: false,
        data: { ...action.payload }
      }
    
    default: return state
  }
}