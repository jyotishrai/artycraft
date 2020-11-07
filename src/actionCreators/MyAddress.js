import {
  LIST_ADDRESS_API_SUCCESS, 
  LIST_ADDRESS_API_REQ, 
  LIST_ADDRESS_API_FAIL, 
  DELETE_ADDRESS_API_REQ, 
  DELETE_ADDRESS_API_FAIL, 
  DELETE_ADDRESS_API_SUCCESS,
  ACTIVE_CUSTOMER_ADDRESS_SUCCESS,
  ACTIVE_CUSTOMER_ADDRESS_REQ,
  ACTIVE_CUSTOMER_ADDRESS_FAIL,

} from '../constants'

export function adressListApiReq(data) {
  return { type: LIST_ADDRESS_API_REQ, payload: data }
}

export function adressListApiSuccess(user) {
  return { type: LIST_ADDRESS_API_SUCCESS, payload: user }
}

export function adressListApiFailed(user) {
  return { type: LIST_ADDRESS_API_FAIL, payload: user }
}

export function deleteAddrssApiReq(data) {
  return { type: DELETE_ADDRESS_API_REQ, payload: data }
}

export function deleteAddrssApiSuccess(user) {
  return { type: DELETE_ADDRESS_API_FAIL, payload: user }
}

export function deleteAddrssApiFailed(user) {
  return { type: DELETE_ADDRESS_API_SUCCESS, payload: user }
}

// Active customer Address
export function activeCustomerAddressApiReq(data) {
  return { type: ACTIVE_CUSTOMER_ADDRESS_REQ, payload: data }
}

export function activeCustomerAddressApiSuccess(data) {
  return { type: ACTIVE_CUSTOMER_ADDRESS_SUCCESS, payload: data }
}

export function activeCustomerAddressApiFailed(data) {
  return { type: ACTIVE_CUSTOMER_ADDRESS_FAIL, payload: data }
}