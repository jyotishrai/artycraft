import {

  CATEGORY_PRODUCT_DETAIL_REQUEST, 
  CATEGORY_PRODUCT_DETAIL_REQUEST_SUCCESS,
  CATEGORY_PRODUCT_DETAIL_REQUEST_FAIL,
   ADD_WISH_LIST_REQUEST_SUCCESS, 
   ADD_WISH_LIST_REQUEST_FAIL,
   ADD_WISH_LIST_REQUEST,
   ADD_POSTAL_CODE_API_REQ,
   ADD_POSTAL_CODE_API_SUCCESS,
   ADD_POSTAL_CODE_API_FAIL,
   ADD_CART_REMOVE_API_REQ,
   ADD_CART_REMOVE_API_SUCCESS,
   ADD_CART_REMOVE_API_FAIL,
   CATEGORY_PRODUCT_DETAIL_UPDATE,
   COMMENT_AND_REVIEWS_REQ,
   COMMENT_AND_REVIEWS_SUCCESS,
   COMMENT_AND_REVIEWS_FAIL,
   CATEGORY_PRODUCT_DETAIL_REQUEST_CLEAR

} from '../constants'

export function catProductDetailApiReq(data) {
  return { type: CATEGORY_PRODUCT_DETAIL_REQUEST, payload: data }
}

export function catProductDetailApiSuccess(user) {
  return { type: CATEGORY_PRODUCT_DETAIL_REQUEST_SUCCESS, payload: user }
}


export function catProductDetailApiFailed(user) {
  return { type: CATEGORY_PRODUCT_DETAIL_REQUEST_FAIL, payload: user }
}

export function addProductInWishListReq(data) {
  return { type: ADD_WISH_LIST_REQUEST, payload: data }
}

export function addProductInWishListApiSuccess(user) {
  return { type: ADD_WISH_LIST_REQUEST_SUCCESS, payload: user }
}


export function addProductInWishListApiFailed(user) {
  return { type: ADD_WISH_LIST_REQUEST_FAIL, payload: user }
}
//POSTAL CODE..
export function addPostalCodeReq(data) {
  return { type: ADD_POSTAL_CODE_API_REQ, payload: data }
}

export function addPostalCodeApiSuccess(user) {
  return { type: ADD_POSTAL_CODE_API_SUCCESS, payload: user }
}


export function addPostalCodeApiFailed(user) {
  return { type: ADD_POSTAL_CODE_API_FAIL, payload: user }
}

//ADD CART

export function addCartRemoveReq(data) {
  return { type: ADD_CART_REMOVE_API_REQ, payload: data }
}

export function addCartRemoveApiSuccess(user) {
  return { type: ADD_CART_REMOVE_API_SUCCESS, payload: user }
}


export function addCartRemoveApiFailed(user) {
  return { type: ADD_CART_REMOVE_API_FAIL, payload: user }
}

//DATA UPDAET


export function dataUpdateInProductDetail(user) {
  return { type: CATEGORY_PRODUCT_DETAIL_UPDATE, payload: user }
}
export function clearCatSubDetailSuccess(data) {
  return { type: CATEGORY_PRODUCT_DETAIL_REQUEST_CLEAR, payload: data }
}


