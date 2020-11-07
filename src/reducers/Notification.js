import {
  NOTIFICATION_FAIL,NOTIFICATION_SUCCESS,NOTIFICATION_REQ
} from '../constants'

const initialState = {
  error: undefined,
  loading: false,
  data:undefined,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case NOTIFICATION_REQ:
      return { ...state, error: undefined, loading: true }

    case NOTIFICATION_FAIL:
      return { ...state, error: action.error, loading: false}

    case NOTIFICATION_SUCCESS:
      return {
        ...state,
        loading: false,
        data: {...action.payload }
      }
      // case NOTIFICATION_CLEAR:
      //   return { ...state, error: action.error, loading: false,data:undefined }
  
    default: return state
  }
}