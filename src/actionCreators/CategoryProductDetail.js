import {  GET_PRODUCT_DETAILS_BY_ID_REQ, GET_PRODUCT_DETAILS_BY_ID_SUCCESS, GET_PRODUCT_DETAILS_BY_ID_FAIL } from '../constants'

export function getProductDetailByIdApiReq(data) {
  return { type: GET_PRODUCT_DETAILS_BY_ID_REQ, payload: data }
}

export function getProductDetailByIdApiSuccess(user) {
  return { type: GET_PRODUCT_DETAILS_BY_ID_SUCCESS, payload: user }
}

export function getProductDetailByIdApiFailed(user) {
  return { type: GET_PRODUCT_DETAILS_BY_ID_FAIL, payload: user }
}