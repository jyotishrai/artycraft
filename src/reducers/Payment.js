import { PLACE_ORDER_REQ, PLACE_ORDER_FAIL, PLACE_ORDER_SUCCESS, PLACE_ORDER_ID_REQ, PLACE_ORDER_ID_FAIL, PLACE_ORDER_ID_SUCCESS, PAYMENT_MODE_REQ, PAYMENT_MODE_FAIL, PAYMENT_MODE_SUCCESS } from '../constants'

const initialState = {
  error: undefined,
  loading: false,
  placeOrderLoader:false,
  data: undefined,
  paymentMode: undefined,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case PLACE_ORDER_REQ:
      return { ...state, error: undefined, loading: true,placeOrderLoader:true }

    case PLACE_ORDER_FAIL:
      return { ...state, error: action.error, loading: false,placeOrderLoader:false  }

    case PLACE_ORDER_SUCCESS:
      return {
        ...state,
        placeOrderLoader: false,
        loading: false,
        data: { ...action.payload }
    }
    //ORDER iD
    case PLACE_ORDER_ID_REQ:
      return { ...state, error: undefined, loading: true }

    case PLACE_ORDER_ID_FAIL:
      return { ...state, error: action.error, loading: false,  }

    case PLACE_ORDER_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        data: { ...action.payload }
    }

        //PAYMENT MODE
        case PAYMENT_MODE_REQ:
          return { ...state, error: undefined, loading: true }
    
        case PAYMENT_MODE_FAIL:
          return { ...state, error: action.error, loading: false,  }
    
        case PAYMENT_MODE_SUCCESS:
          return {
            ...state,
            loading: false,
            paymentMode: { ...action.payload }
        }
    default: return state
  }
}