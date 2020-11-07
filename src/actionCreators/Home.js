import {
  HOME_REQUEST,
  HOME_SUCCESS,
  HOME_FAIL,

} from '../constants'

export function homeApiReq(data) {
  return { type: HOME_REQUEST, payload: data }
}

export function homeApiSuccess(user) {
  return { type: HOME_SUCCESS, payload: user }
}

export function homeApiFailed(user) {
  return { type: HOME_FAIL, payload: user }
}
