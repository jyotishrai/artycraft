import { ORDER_DETAIL_REQ, ORDER_DETAIL_SUCCESS, ORDER_DETAIL_FAIL, ORDER_CANCEL_REQ, ORDER_CANCEL_SUCCESS, ORDER_CANCEL_FAIL, GET_ORDR_CANCEL_LIST_SUCCESS, GET_ORDR_CANCEL_LIST_FAIL, GET_ORDR_CANCEL_LIST_REQ, ORDER_RETUEN_EXCHANGE_REQ, ORDER_RETUEN_EXCHANGE_SUCCESS, ORDER_RETUEN_EXCHANGE_FAIL } from '../constants'
 
 export function getOrderDetailApiReq(data) {
   return { type: ORDER_DETAIL_REQ, payload: data }
 }
 
 export function  getOrderDetailApiSuccess(user) {
   return { type: ORDER_DETAIL_SUCCESS, payload: user }
 }
 
 
 export function  getOrderDetailApiFailed(user) {
   return { type: ORDER_DETAIL_FAIL, payload: user }
 }
 
 //cancel order
 export function orderCancelApiReq(data) {
  return { type: ORDER_CANCEL_REQ, payload: data }
}

export function  orderCancelApiSuccess(user) {
  return { type: ORDER_CANCEL_SUCCESS, payload: user }
}


export function  orderCancelApiFailed(user) {
  return { type: ORDER_CANCEL_FAIL, payload: user }
}

//cancel list
export function getOrderCancelApiReq(data) {
  return { type: GET_ORDR_CANCEL_LIST_REQ, payload: data }
}

export function  getOrderCancelApiSuccess(user) {
  return { type: GET_ORDR_CANCEL_LIST_SUCCESS, payload: user }
}


export function  getOrderCancelApiFailed(user) {
  return { type: GET_ORDR_CANCEL_LIST_FAIL, payload: user }
}


//Rject and return order
export function orderReturnExchangeApiReq(data) {
  return { type: ORDER_RETUEN_EXCHANGE_REQ, payload: data }
}

export function  orderReturnExchangeApiSuccess(user) {
  return { type: ORDER_RETUEN_EXCHANGE_SUCCESS, payload: user }
}


export function  orderReturnExchangeApiFailed(user) {
  return { type: ORDER_RETUEN_EXCHANGE_FAIL, payload: user }
}
