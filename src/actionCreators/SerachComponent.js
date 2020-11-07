import {

  SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAIL,

} from '../constants'

export function searchApiReq(data) {
  return { type: SEARCH_REQUEST, payload: data }
}

export function searchApiSuccess(user) {
  return { type: SEARCH_SUCCESS, payload: user }
}

export function searcApiFailed(user) {
  return { type: SEARCH_FAIL, payload: user }
}
