import { NOTIFICATION_REQ, NOTIFICATION_SUCCESS, NOTIFICATION_FAIL } from '../constants'

export function notificationApiReq(data) {
  return { type: NOTIFICATION_REQ, payload: data }
}

export function notificationApiSuccess(user) {
  return { type: NOTIFICATION_SUCCESS, payload: user }
}

export function notificationApiFailed(user) {
  return { type: NOTIFICATION_FAIL, payload: user }
}

