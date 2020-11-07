import { UPDATE_PROFILE_FAIL, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_REQ } from '../constants'

export function updateProfileApiReq(data) {
  return { type: UPDATE_PROFILE_REQ, payload: data }
}

export function updateProfileApiSuccess(user) {
  return { type: UPDATE_PROFILE_SUCCESS, payload: user }
}

export function updateProfileApiFailed(user) {
  return { type: UPDATE_PROFILE_FAIL, payload: user }
}


