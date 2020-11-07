import { 
  GET_COMMENT_REVIEW_LIST_REQ, 
  GET_COMMENT_REVIEW_LIST_SUCCESS, 
  GET_COMMENT_REVIEW_LIST_FAIL,
  DELETE_COMMENT_REVIEW_REQ, 
  DELETE_ADDRESS_API_SUCCESS,
  DELETE_COMMENT_REVIEW_FAIL,
  DELETE_COMMENT_REVIEW_SUCCESS} from '../constants'

export function getCommentReviewListApiReq(data) {
  return { type: GET_COMMENT_REVIEW_LIST_REQ, payload: data }
}

export function getCommentReviewListApiSuccess(user) {
  return { type: GET_COMMENT_REVIEW_LIST_SUCCESS, payload: user }
}

export function getCommentReviewListApiFailed(user) {
  return { type: GET_COMMENT_REVIEW_LIST_FAIL, payload: user }
}


export function deleteCommentReviewApiReq(data) {
  return { type: DELETE_COMMENT_REVIEW_REQ, payload: data }
}

export function deleteCommentReviewApiSuccess(user) {
  return { type: DELETE_COMMENT_REVIEW_SUCCESS, payload: user }
}

export function deleteCommentReviewApiFailed(user) {
  return { type: DELETE_COMMENT_REVIEW_FAIL, payload: user }
}