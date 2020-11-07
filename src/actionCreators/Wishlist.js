import {
  WISH_LIST_REQUEST,WISH_LIST_REQUEST_SUCCESS,WISH_LIST_REQUEST_FAIL,
   CLEAR_WISH_LIST_REQUEST, CLEAR_WISH_LIST_REQUEST_SUCCESS,CLEAR_LIST_REQUEST_FAIL
} from '../constants'

export function wishListApiReq(data) {
  return { type: WISH_LIST_REQUEST, payload: data }
}

export function wishListApiSuccess(user) {
  return { type: WISH_LIST_REQUEST_SUCCESS, payload: user }
}


export function wishListpiFailed(user) {
  return { type: WISH_LIST_REQUEST_FAIL, payload: user }
}

export function clearAllWishDataApiReq(data) {
  return { type: CLEAR_WISH_LIST_REQUEST, payload: data }
}

export function clearAllWishDataApiSuccess(user) {
  return { type: CLEAR_WISH_LIST_REQUEST_SUCCESS, payload: user }
}


export function clearAllWishDataApiFailed(user) {
  return { type: CLEAR_LIST_REQUEST_FAIL, payload: user }
}

