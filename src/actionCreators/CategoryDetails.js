import {

  CATEGORY_DETAIL_FAIL, CATEGORY_DETAIL_SUCCESS, CATEGORY_DETAIL_REQUEST, CATEGORY_DETAIL_REQUEST_PAGINATION, 
  DEAL_OFF_LIST_REQUEST, DEAL_OFF_REQUEST_SUCCESS, DEAL_OFF_REQUEST_FAIL,DEAL_OFF_LIST_REQUEST_PAGINATION, SORT_FILTER_API_REQ, SORT_FILTER_API_SUCCESS, SORT_FILTER_API_FAIL, RANDOM_PRODUCT_REQUEST, RANDOM_PRODUCT_REQUEST_FAIL, RANDOM_PRODUCT_REQUEST_PAGINATION, RANDOM_PRODUCT_REQUEST_SUCCESS

} from '../constants'

export function catDetailApiReq(data) {
  return { type: CATEGORY_DETAIL_REQUEST, payload: data }
}

export function catDetailApiReqOnPagination(data) {
  return { type: CATEGORY_DETAIL_REQUEST_PAGINATION, payload: data }
}

export function catDetailApiSuccess(user) {
  return { type: CATEGORY_DETAIL_SUCCESS, payload: user }
}


export function catDetailApiFailed(user) {
  return { type: CATEGORY_DETAIL_FAIL, payload: user }
}

//DEALS
export function dealUPTOApiReq(data) {
  return { type: DEAL_OFF_LIST_REQUEST, payload: data }
}
export function dealUPTOApiReqOnPagination(data) {
  return { type: DEAL_OFF_LIST_REQUEST_PAGINATION, payload: data }
}
export function dealUPTOApiSuccess(user) {
  return { type: DEAL_OFF_REQUEST_SUCCESS, payload: user }
}
export function dealUPTOApiFailed(user) {
  return { type: DEAL_OFF_REQUEST_FAIL, payload: user }
}

//SORT and Filter list
export function getSortFiltrApi(data) {
  return { type: SORT_FILTER_API_REQ, payload: data }
}
export function getSortFilterApiSuccess(data) {
  return { type: SORT_FILTER_API_SUCCESS, payload: data }
}
export function getSortFilterApiFailed(data) {
  return { type: SORT_FILTER_API_FAIL, payload: data }
}

//RANDOM Product
export function randomProductApiReq(data) {
  return { type: RANDOM_PRODUCT_REQUEST, payload: data }
}
export function randomProductApiApiReqOnPagination(data) {
  return { type: RANDOM_PRODUCT_REQUEST_PAGINATION, payload: data }
}
export function randomProductApiApiSuccess(user) {
  return { type: RANDOM_PRODUCT_REQUEST_SUCCESS, payload: user }
}
export function randomProductApiApiFailed(user) {
  return { type: RANDOM_PRODUCT_REQUEST_FAIL, payload: user }
}

