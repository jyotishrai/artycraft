import {
  PLACE_ORDER_SUCCESS,
  PLACE_ORDER_FAIL,
  PLACE_ORDER_REQ,
  PLACE_ORDER_ID_REQ,
  PLACE_ORDER_ID_SUCCESS,
  PLACE_ORDER_ID_FAIL,
  PAYMENT_MODE_REQ,
  PAYMENT_MODE_SUCCESS,

} from '../constants'

export function placeOrderReq(data) {
  return { type: PLACE_ORDER_REQ, payload: data }
}

export function placeOrderSuccess(user) {
  return { type: PLACE_ORDER_SUCCESS, payload: user }
}

export function placeOrderFailed(user) {
  return { type: PLACE_ORDER_FAIL, payload: user }
}

//ID
export function placeOrderIDReq(data) {
  return { type: PLACE_ORDER_ID_REQ, payload: data }
}

export function placeOrderIDSuccess(user) {
  return { type: PLACE_ORDER_ID_SUCCESS, payload: user }
}

export function placeOrderIDFailed(user) {
  return { type: PLACE_ORDER_ID_FAIL, payload: user }
}

//Payment Mode

export function paymentModeReq(data) {
  return { type: PAYMENT_MODE_REQ, payload: data }
}

export function paymentModeSuccess(user) {
  return { type: PAYMENT_MODE_SUCCESS, payload: user }
}

export function paymentModeFailed(user) {
  return { type: PAYMENT_MODE_SUCCESS, payload: user }
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