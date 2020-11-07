import { MY_ORDER_HISTORY_REQUEST, MY_ORDER_HISTORY_SUCCESS, MY_ORDER_HISTORY_FAIL, MY_ORDER_HISTORY_REQUEST_PAGINATION, MY_ORDER_HISTORY_CLAER } from '../constants'

export function myOrderHistoryApiReq(data) {
  return { type: MY_ORDER_HISTORY_REQUEST, payload: data }
}

export function myOrderHistoryApiSuccess(user) {
  return { type: MY_ORDER_HISTORY_SUCCESS, payload: user }
}

export function myOrderHistoryApiFailed(user) {
  return { type: MY_ORDER_HISTORY_FAIL, payload: user }
}

export function myOrderHistoryApiReqOnPagination(data) {
  return { type: MY_ORDER_HISTORY_REQUEST_PAGINATION, payload: data }
}

export function clearMyOrderHistory(data) {
  return { type: MY_ORDER_HISTORY_CLAER, payload: data }
}