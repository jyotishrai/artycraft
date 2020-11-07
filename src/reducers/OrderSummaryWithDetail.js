import { ORDER_DETAIL_REQ, ORDER_DETAIL_FAIL, ORDER_DETAIL_SUCCESS, ORDER_CANCEL_REQ, ORDER_CANCEL_FAIL, ORDER_CANCEL_SUCCESS, GET_ORDR_CANCEL_LIST_REQ, GET_ORDR_CANCEL_LIST_FAIL, GET_ORDR_CANCEL_LIST_SUCCESS, ORDER_RETUEN_EXCHANGE_REQ, ORDER_RETUEN_EXCHANGE_FAIL, ORDER_RETUEN_EXCHANGE_SUCCESS } from '../constants'

const initialState = {
  error: undefined,
  loading: false,
   data:undefined,
   dataCancel:undefined,
 
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ORDER_DETAIL_REQ:
      return { ...state, error: undefined, loading: true }
    case ORDER_DETAIL_FAIL:
      return { ...state, error: action.error, loading: false }
    case ORDER_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload 
      }
     //cancel
    case ORDER_CANCEL_REQ:
      return { ...state, error: undefined, loading: true }
    case ORDER_CANCEL_FAIL:
      return { ...state, error: action.error, loading: false }
    case ORDER_CANCEL_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload 
      } 
      //Cancel sub list
    case GET_ORDR_CANCEL_LIST_REQ:
      return { ...state, error: undefined, loading: true }
    case GET_ORDR_CANCEL_LIST_FAIL:
      return { ...state, error: action.error, loading: false }
    case GET_ORDR_CANCEL_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        dataCancel: action.payload 
      } 
        //cancel
    case ORDER_RETUEN_EXCHANGE_REQ:
      return { ...state, error: undefined, loading: true }
    case ORDER_RETUEN_EXCHANGE_FAIL:
      return { ...state, error: action.error, loading: false }
    case ORDER_RETUEN_EXCHANGE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload 
      } 
    default: return state
  }
}