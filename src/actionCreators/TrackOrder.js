import { TRACK_ORDER_FULL_DETAIL_REQ,TRACK_ORDER_FULL_DETAIL_FAIL,  TRACK_ORDER_FULL_DETAIL_SUCCESS, GET_TRACKING_REQ, GET_TRACKING_SUCCESS, GET_TRACKING_FAIL } from '../constants'
 
 export function trackOrderFullDetailAPiReq(data) {
   return { type: TRACK_ORDER_FULL_DETAIL_REQ, payload: data }
 }
 
 export function  trackOrderFullDetailAPiSuccess(user) {
   return { type: TRACK_ORDER_FULL_DETAIL_SUCCESS, payload: user }
 }
 
 
 export function  trackOrderFullDetailAPiFailed(user) {
   return { type: TRACK_ORDER_FULL_DETAIL_FAIL, payload: user }
 }

 //GEt track ID

 export function getTrackIDAPiReq(data) {
  return { type: GET_TRACKING_REQ, payload: data }
}

export function  getTrackIDAPiSuccess(user) {
  return { type: GET_TRACKING_SUCCESS, payload: user }
}


export function  getTrackIDAPiFailed(user) {
  return { type: GET_TRACKING_FAIL, payload: user }
}
 
 