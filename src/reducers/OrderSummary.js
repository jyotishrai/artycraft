import { CART_LIST_API_REQ,CART_LIST_API_FAIL, CART_LIST_API_SUCCESS, ORDER_IS_FROM, ADD_CART_QTY_API_REQ, ADD_CART_QTY_API_SUCCESS, ADD_CART_QTY_API_FAIL, ADD_BILL_DATA } from '../constants'

const initialState = {
  error: undefined,
  loading: false,
   data:undefined,
   orderIsFrom:undefined,
   billData:undefined
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CART_LIST_API_REQ:
      return { ...state, error: undefined, loading: true }
    case CART_LIST_API_FAIL:
      return { ...state, error: action.error, loading: false }
    case CART_LIST_API_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload 
      }
    case ORDER_IS_FROM:  
      return {
       ...state,
       orderIsFrom: action.payload
     } 

     //ADD_CART_QTY
     case ADD_CART_QTY_API_REQ:
      return { ...state, error: undefined, loading: false }
    case ADD_CART_QTY_API_SUCCESS:
      return { ...state, error: action.error, loading: false }
    case ADD_CART_QTY_API_FAIL:
      return {
        ...state,
        loading: false,
        data: action.payload 
      }

    case ADD_BILL_DATA:
        return {
          ...state,
          billData: action.payload 
      }

    default: return state
  }
}