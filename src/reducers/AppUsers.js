import {

  APP_LOGIN_SUCCESS,
  APP_LOGIN_FAIL,
  APP_LOGIN_REQUEST,

  SIGNUP_REQUEST,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,

  OTP_REQUEST,
  OTP_FAIL,
  OTP_SUCCESS,
  APP_LOGOUT_REQUEST,
  APP_LOGOUT_SUCCESS,
  APP_PARAMS,
  APP_IS_FROM_FOR_LOGIN,
  APP_USER_DATA_SAVE_ON_LOUNCH,
  RESEND_OTP_REQUEST,
  RESEND_OTP_FAIL,
  RESEND_OTP_SUCCESS,

} from '../constants'

const initialState = {
  error: undefined,
  loading: false,
  loggedIn: false,
  login: '',
  isFromApp: undefined,
  data: undefined,
  logoutSuccess: undefined
}

export default (state = initialState, action) => {

  switch (action.type) {

    case APP_LOGIN_REQUEST:
      return { ...state, error: undefined, loading: true }

    case APP_LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
      }
      
      case APP_IS_FROM_FOR_LOGIN:
        return {
          ...state,
          loading: false,
          loggedIn: false,
          isFromApp: { ...action.payload}
  
        }

    case APP_LOGIN_FAIL:
      return { ...state, error: action.error, loading: false }

    case APP_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedIn: true,
        logoutSuccess: false,
        // login: initialState.login,
        //password: initialState.password,
        data: { ...action.payload }
      }
    case APP_LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedIn: false,
        isFromApp: undefined,
        logoutSuccess: true,
        data: undefined
      }

    case SIGNUP_REQUEST:
      return { ...state, error: undefined, loading: true }

    case SIGNUP_FAIL:
      return { ...state, error: action.error, loading: false }

    case SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedIn: true,
        data: { ...action.payload }
      }

    case OTP_REQUEST:
      return { ...state, error: undefined, loading: true }

    case OTP_FAIL:
      return { ...state, error: action.error, loading: false }

    case OTP_SUCCESS:
      return {
        ...state,
        loading: false,
        logoutSuccess: false,
        data: { ...action.payload[APP_PARAMS.DATA] }
      }
      case APP_USER_DATA_SAVE_ON_LOUNCH:
      return {
        ...state,
        loading: false,
        logoutSuccess: false,
        loggedIn: true,
        data: action.payload 
      }
      // Resend otp
      case RESEND_OTP_REQUEST:
      return { ...state, error: undefined, loading: true }

    case RESEND_OTP_FAIL:
      return { ...state, error: action.error, loading: false }

    case RESEND_OTP_SUCCESS:
      return {
        ...state,
        loading: false,
        logoutSuccess: false,
        data: { ...action.payload[APP_PARAMS.DATA] }
      }

    default: return state
  }
}