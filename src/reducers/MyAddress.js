import {
  LIST_ADDRESS_API_REQ,
  LIST_ADDRESS_API_FAIL,
  LIST_ADDRESS_API_SUCCESS,
  DELETE_ADDRESS_API_REQ,
  DELETE_ADDRESS_API_FAIL,
  DELETE_ADDRESS_API_SUCCESS,
  ACTIVE_CUSTOMER_ADDRESS_REQ,
  ACTIVE_CUSTOMER_ADDRESS_FAIL,
  ACTIVE_CUSTOMER_ADDRESS_SUCCESS,
}
  from '../constants'

const initialState = {
  error: undefined,
  loading: false,
  data: undefined,
  dltData: undefined,
  activeAddress: undefined

}

export default (state = initialState, action) => {
  switch (action.type) {
    case LIST_ADDRESS_API_REQ:
      return { ...state, error: undefined, loading: true }
    case LIST_ADDRESS_API_FAIL:
      return { ...state, error: action.error, loading: false }
    case LIST_ADDRESS_API_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      }

    case DELETE_ADDRESS_API_REQ:
      return { ...state, error: undefined, loading: true }
    case DELETE_ADDRESS_API_FAIL:
      return { ...state, error: action.error, loading: false }
    case DELETE_ADDRESS_API_SUCCESS:
      return {
        ...state,
        loading: false,
        dltData: action.payload
      }

    // Active Address
    case ACTIVE_CUSTOMER_ADDRESS_REQ:
      return { ...state, error: undefined, loading: true }
    case ACTIVE_CUSTOMER_ADDRESS_FAIL:
      return { ...state, error: action.error, loading: false }
    case ACTIVE_CUSTOMER_ADDRESS_SUCCESS:
      return {
        ...state,
        loading: false,
        activeAddress: action.payload
      }

    default: return state
  }
}