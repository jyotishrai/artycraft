import {
  APP_LOGIN_REQUEST,
  APP_LOGIN_SUCCESS,
  APP_LOGIN_FAIL,

  SIGNUP_REQUEST,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,

  OTP_FAIL,
  OTP_SUCCESS,
  OTP_REQUEST,
  APP_LOGOUT_REQUEST,
  APP_LOGOUT_SUCCESS,
  APP_IS_FROM_FOR_LOGIN,
  APP_USER_DATA_SAVE_ON_LOUNCH,
  RESEND_OTP_REQUEST,
  RESEND_OTP_FAIL,
  RESEND_OTP_SUCCESS,
  APP_LOGOUT_FAIL

} from '../constants'

export function saveLoginOnLounch(data) {
  return { type: APP_USER_DATA_SAVE_ON_LOUNCH, payload: data }
}
export function loginApi(data) {
  return { type: APP_LOGIN_REQUEST, payload: data }
}
export function loginApiFailed(user) {
  return { type: APP_LOGIN_FAIL, payload: user }
}

export function logoutRequest(data) {
  return { type: APP_LOGOUT_REQUEST, payload: data }
}

export function loginApiSuccess(user) {
  return { type: APP_LOGIN_SUCCESS, payload: user }
}
export function logoutSuccess(user) {
  return { type: APP_LOGOUT_SUCCESS, payload: user }
}
export function logoutFail(user) {
  return { type: APP_LOGOUT_FAIL, payload: user }
}





export function SignUpApi(data) {
  return { type: SIGNUP_REQUEST, payload: data }
}

export function SignUpApiSuccess(user) {
  return { type: SIGNUP_SUCCESS, payload: user }
}

export function SignUpApiFailed(user) {
  return { type: SIGNUP_FAIL, payload: user }
}

export function otpAPi(data) {
  return { type: OTP_REQUEST, payload: data }
}

export function otpApiSuccess(user) {
  return { type: OTP_SUCCESS, payload: user }
}

export function otpApiFailed(user) {
  return { type: OTP_FAIL, payload: user }
}
export function isFromForLoginRequest(user) {
  
  return { type: APP_IS_FROM_FOR_LOGIN, payload: user }
}

//// Resend otp

export function resendOtpApiSuccess(user) {
  return { type: RESEND_OTP_SUCCESS, payload: user }
}

export function resendOtpApiFailed(user) {
  return { type: RESEND_OTP_FAIL, payload: user }
}
export function resendOtpApiReq(user) { 
  return { type: RESEND_OTP_REQUEST, payload: user }
}



// export function usersCreateSuccess(user) {
//   return { type: USERS_CREATE_SUCCESS, payload: user }
// }

// export function usersCreateFail(error) {
//   return { type: USERS_CREATE_FAIL, error }
// }

// export function usersGet(payload) {
//   return { type: USERS_GET_REQUEST, payload }
// }

// export function usersGetSuccess(data) {
//   return { type: USERS_GET_SUCCESS, payload: data }
// }

// export function usersGetFail(error) {
//   return { type: USERS_GET_FAIL, error }
// }

// export function usersUpdate(profile) {
//   return { type: USERS_UPDATE_REQUEST, payload: profile }
// }

// export function usersUpdateSuccess(user) {
//   return { type: USERS_UPDATE_SUCCESS, payload: user }
// }

// export function usersUpdateFail(error) {
//   return { type: USERS_UPDATE_FAIL, error }
// }

// export function usersSelect(userId) {
//   return { type: USERS_SELECT, payload: userId }
// }

// export function usersBulkSelect(userIds) {
//   return { type: USERS_BULK_SELECT, payload: userIds }
// }

// export function usersSetFilter(filter) {
//   return { type: USERS_SET_FILTER, payload: filter }
// }

// export function usersSetPage(page) {
//   return { type: USERS_SET_PAGE, payload: page }
// }