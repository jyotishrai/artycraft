import {
  ADDRESS_FROM_GOOGLE_REQ,
  ADDRESS_FROM_GOOGLE_SUCCESS,
  ADDRESS_FROM_GOOGLE_FAIL,
  COUNTRY_API_REQ,
  COUNTRY_API_FAIL,
  COUNTRY_API_SUCCESS,
  STATE_API_REQ,
  STATE_API_FAIL,
  STATE_API_SUCCESS,
  CITY_API_REQ,
  CITY_API_FAIL,
  CITY_API_SUCCESS,
  ADD_ADDRESS_API_REQ,
  ADD_ADDRESS_API_FAIL,
  ADD_ADDRESS_API_SUCCESS,
  ADDRESS_IS_FROM,

} from '../constants'

const initialState = {
  error: undefined,
  loading: false,
  data: undefined,
  city: undefined,
  country: undefined,
  state: undefined,
  addressIsFrom: undefined
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADDRESS_FROM_GOOGLE_REQ:
      return { ...state, error: undefined, loading: true }
    case ADDRESS_FROM_GOOGLE_FAIL:
      return { ...state, error: action.error, loading: false }
    case ADDRESS_FROM_GOOGLE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      }

    case COUNTRY_API_REQ:
      return { ...state, error: undefined, loading: true }
    case COUNTRY_API_FAIL:
      return { ...state, error: action.error, loading: false }
    case COUNTRY_API_SUCCESS:
      return {
        ...state,
        loading: false,
        country: action.payload
      }

    case STATE_API_REQ:
      return { ...state, error: undefined, loading: true }
    case STATE_API_FAIL:
      return { ...state, error: action.error, loading: false }
    case STATE_API_SUCCESS:
      return {
        ...state,
        loading: false,
        state: action.payload
      }

    case CITY_API_REQ:
      return { ...state, error: undefined, loading: true }
    case CITY_API_FAIL:
      return { ...state, error: action.error, loading: false }
    case CITY_API_SUCCESS:
      return {
        ...state,
        loading: false,
        city: action.payload
      }

    case ADD_ADDRESS_API_REQ:
      return { ...state, error: undefined, loading: true }
    case ADD_ADDRESS_API_FAIL:
      return { ...state, error: action.error, loading: false }
    case ADD_ADDRESS_API_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      }

    case ADDRESS_IS_FROM:
      return {
        ...state,
        addressIsFrom: action.payload
      }

    default: return state
  }
}