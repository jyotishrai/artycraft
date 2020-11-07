import { GET_COMPARE_PROD_LIST_REQ, GET_COMPARE_PROD_LIST_FAIL, GET_PRODUCT_DETAILS_BY_ID_SUCCESS } from '../constants'

const initialState = {
  error: undefined,
  loading: false,
  data:undefined,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_COMPARE_PROD_LIST_REQ:
      return { ...state, error: undefined, loading: true }

    case GET_COMPARE_PROD_LIST_FAIL:
      return { ...state, error: action.error, loading: false }

    case GET_PRODUCT_DETAILS_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        data: {...action.payload }
      }
    
    default: return state
  }
}