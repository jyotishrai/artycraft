import { GET_COMPARE_PROD_LIST_REQ, GET_COMPARE_PROD_LIST_SUCCESS, GET_COMPARE_PROD_LIST_FAIL } from '../constants'

export function getCompareProducsApiReq(data) {
  return { type: GET_COMPARE_PROD_LIST_REQ, payload: data }
}

export function getCompareProducsApiSuccess(user) {
  return { type: GET_COMPARE_PROD_LIST_SUCCESS, payload: user }
}

export function getCompareProducsApiFailed(user) {
  return { type: GET_COMPARE_PROD_LIST_FAIL, payload: user }
}