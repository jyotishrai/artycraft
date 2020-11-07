import {
  ADDRESS_FROM_GOOGLE_REQ,
  ADDRESS_FROM_GOOGLE_FAIL,
  ADDRESS_FROM_GOOGLE_SUCCESS,

} from '../constants'

export function geoLocationReq(data) {
  return { type: ADDRESS_FROM_GOOGLE_REQ, payload: data }
}

export function geoLocationSuccess(user) {
  return { type: ADDRESS_FROM_GOOGLE_SUCCESS, payload: user }
}

export function geoLocationFailed(user) {
  return { type: ADDRESS_FROM_GOOGLE_FAIL, payload: user }
}


// export function usersCreateSuccess(user) {
//   return { type: USERS_CREATE_SUCCESS, payload: user }
// }

// export function usersCreateFail(error) {
//   return { type: USERS_CREATE_FAIL, error }
// }

// export function usersGet(payload) {
//   return { type: USERS_GET_REQUEST, payload }
// }

// export function usersGetSuccess(data) {
//   return { type: USERS_GET_SUCCESS, payload: data }
// }

// export function usersGetFail(error) {
//   return { type: USERS_GET_FAIL, error }
// }

// export function usersUpdate(profile) {
//   return { type: USERS_UPDATE_REQUEST, payload: profile }
// }

// export function usersUpdateSuccess(user) {
//   return { type: USERS_UPDATE_SUCCESS, payload: user }
// }

// export function usersUpdateFail(error) {
//   return { type: USERS_UPDATE_FAIL, error }
// }

// export function usersSelect(userId) {
//   return { type: USERS_SELECT, payload: userId }
// }

// export function usersBulkSelect(userIds) {
//   return { type: USERS_BULK_SELECT, payload: userIds }
// }

// export function usersSetFilter(filter) {
//   return { type: USERS_SET_FILTER, payload: filter }
// }

// export function usersSetPage(page) {
//   return { type: USERS_SET_PAGE, payload: page }
// }