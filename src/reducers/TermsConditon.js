import {
  APP_IS_FROM_TERMS
} from '../constants'

const initialState = {
  data: undefined,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case APP_IS_FROM_TERMS:
      return {    
        ...state,
        loading: false,
        data: { ...action.payload } }
    default: return state
  }
}