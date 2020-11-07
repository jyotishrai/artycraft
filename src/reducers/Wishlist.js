import {
  APP_PARAMS,
  WISH_LIST_REQUEST,
  WISH_LIST_REQUEST_FAIL,
  WISH_LIST_REQUEST_SUCCESS,
  CLEAR_WISH_LIST_REQUEST,
  CLEAR_WISH_LIST_REQUEST_SUCCESS,
  CLEAR_LIST_REQUEST_FAIL,
  DELETE_ADDRESS_API_REQ
} from '../constants'

const initialState = {
  error: undefined,
  loading: false,
  data:undefined
}

export default (state = initialState, action) => {
  switch (action.type) {
    case WISH_LIST_REQUEST:
      return { ...state, error: undefined, loading: true }

    case WISH_LIST_REQUEST_FAIL:
      return { ...state, error: action.error, loading: false}

    case WISH_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: {...action.payload }
      }

//WISH list
      case CLEAR_WISH_LIST_REQUEST:
        return { ...state, error: undefined, loading: true }
  
      case CLEAR_LIST_REQUEST_FAIL:
        return { ...state, error: action.error, loading: false}
  
      case CLEAR_WISH_LIST_REQUEST_SUCCESS:
        return {
          ...state,
          loading: false,
        //  data: {...action.payload }
        }
      
    default: return state
  }
}