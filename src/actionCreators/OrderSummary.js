import { CART_LIST_API_FAIL, CART_LIST_API_SUCCESS, CART_LIST_API_REQ,ORDER_IS_FROM,
   ADD_CART_QTY_API_SUCCESS, ADD_CART_QTY_API_REQ, ADD_CART_QTY_API_FAIL,ADD_BILL_DATA } from '../constants'

export function cartListApiReq(data) {
  return { type: CART_LIST_API_REQ, payload: data }
}

export function cartListApiSuccess(user) {
  return { type: CART_LIST_API_SUCCESS, payload: user }
}


export function cartListApiFailed(user) {
  return { type: CART_LIST_API_FAIL, payload: user }
}

export function orderSummaryCallFromSuccess(user) {
  return { type: ORDER_IS_FROM, payload: user }
}

//CART QTY  UPDATE
export function cartUpdateApiReq(data) {
  return { type: ADD_CART_QTY_API_REQ, payload: data }
}

export function cartUpdateApiSuccess(user) {
  return { type: ADD_CART_QTY_API_SUCCESS, payload: user }
}


export function cartUpdateApiFailed(user) {
  return { type: ADD_CART_QTY_API_FAIL, payload: user }
}

export function addBillingDataReq(data) {
  return { type: ADD_BILL_DATA, payload: data }
}






