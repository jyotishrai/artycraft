import {
   REVIEW_RATING_API_REQ, 
  REVIEW_RATING_API_SUCCESS,
   REVIEW_RATING_API_FAIL
 } from '../constants'
 
export function reviewRatingApiReq(data) {
  return { type: REVIEW_RATING_API_REQ, payload: data }
}

export function reviewRatingApiSuccess(user) {
  return { type: REVIEW_RATING_API_SUCCESS, payload: user }
}

export function reviewRatingApiFailed(user) {
  return { type: REVIEW_RATING_API_FAIL, payload: user }
}
