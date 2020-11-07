import { CHANGE_PASSWORD_REQ, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAIL } from '../constants'

export function changePasswordApiReq(data) {
  return { type: CHANGE_PASSWORD_REQ, payload: data }
}

export function changePasswordApiSuccess(user) {
  return { type: CHANGE_PASSWORD_SUCCESS, payload: user }
}

export function changePasswordApiFailed(user) {
  return { type: CHANGE_PASSWORD_FAIL, payload: user }
}