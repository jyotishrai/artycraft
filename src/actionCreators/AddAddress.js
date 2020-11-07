import {
  CITY_API_REQ,
  CITY_API_FAIL,
  CITY_API_SUCCESS,

  STATE_API_REQ,
  STATE_API_FAIL,
  STATE_API_SUCCESS,

  COUNTRY_API_REQ,
  COUNTRY_API_FAIL,
  COUNTRY_API_SUCCESS,
  ADD_ADDRESS_API_REQ,
  ADD_ADDRESS_API_SUCCESS,
  ADD_ADDRESS_API_FAIL,
  ADDRESS_IS_FROM,

} from '../constants'
//CITY
export function cityApiReq(data) {
  return { type: CITY_API_REQ, payload: data }
}

export function cityApiSuccess(user) {
  return { type: CITY_API_SUCCESS, payload: user }
}

export function cityApiFailed(user) {
  return { type: CITY_API_FAIL, payload: user }
}
//STATE
export function stateApiReq(data) {
  return { type: STATE_API_REQ, payload: data }
}

export function stateApiSuccess(user) {
  return { type: STATE_API_SUCCESS, payload: user }
}

export function stateApiFailed(user) {
  return { type: STATE_API_FAIL, payload: user }
}
//COUNTRY
export function countryApiReq(data) {
  return { type: COUNTRY_API_REQ, payload: data }
}

export function countryApiSuccess(user) {
  return { type: COUNTRY_API_SUCCESS, payload: user }
}

export function countryApiFailed(user) {
  return { type: COUNTRY_API_FAIL, payload: user }
}
//ADD ADdress
export function addAddressOrUpdateApiReq(data) {
  return { type: ADD_ADDRESS_API_REQ, payload: data }
}

export function addAddressOrUpdateApiSuccess(user) {
  return { type: ADD_ADDRESS_API_SUCCESS, payload: user }
}

export function addAddressOrUpdateApiFailed(user) {
  return { type: ADD_ADDRESS_API_FAIL, payload: user }
}

export function addressIsFromCallSuccess(data) {
  return { type: ADDRESS_IS_FROM, payload: data }
}



