

import {
    BASE_URL, API, KEY, APP_PARAMS
} from '../constants'

import { showError } from '../NotificationService'
import axios from 'axios'
import { adressListApiReq,
     adressListApiSuccess, 
     adressListApiFailed, 
     deleteAddrssApiReq,
     deleteAddrssApiSuccess,
     deleteAddrssApiFailed,
     activeCustomerAddressApiSuccess
} from '../actionCreators/MyAddress'
import { activeCustomerAddressApiFailed, activeCustomerAddressApiReq } from '../actionCreators'

export const addressListAPi = () => async dispatch => {
    await dispatch(adressListApiReq())
    let api = BASE_URL + API.LIST_ADDRESS + global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID]
    console.log('request data:-', api);
    return axios.get(api,{
        headers: { 'content-type': 'application/json' }
    }).then((res) => {
        console.log('response:-',JSON.stringify(res));

        if (res.data.error == undefined) {
            dispatch(adressListApiSuccess(res.data))
            return (res.data)
        } else {
            dispatch(adressListApiSuccess(res.data))
            return (res.data)
        }
    }).catch((err) => {
            const message = "Server don't response correctly";
            showError(message)
            dispatch(adressListApiFailed(message))
            return (err)
        })

}

export const deleteAddressAPi = (data) => async dispatch => {
    await dispatch(deleteAddrssApiReq(data))
    let api = BASE_URL + API.DELETE_ADDRESS_ById 
    console.log('request data:-', api,data);
    return axios.post(api,data,{
        headers: { 'content-type': 'application/json' }
    }).then((res) => {
        console.log('response:-',JSON.stringify(res));

        if (res.data.error == undefined) {
            dispatch(deleteAddrssApiSuccess(res.data))
            return (res.data)
        } else {
            dispatch(deleteAddrssApiSuccess(res.data))
            return (res.data)
        }
    }).catch((err) => {
            const message = "Server don't response correctly";
            showError(message)
            dispatch(deleteAddrssApiFailed(message))
            return (err)
        })

}

export const activeCustomerAddressAPI = (data) => async dispatch => {
    await dispatch(activeCustomerAddressApiReq(data))
    let api = BASE_URL + API.ACTIVE_CUSTOMER_ADDRESS+ global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID]
    console.warn('request data:-', api, data);
    return axios.post(api, data, {
        headers: { 'content-type': 'application/json' }
    }).then((res) => {
        console.warn('resspon  data:-', JSON.stringify(res));
        if (res.data.error == undefined) {
            dispatch(activeCustomerAddressApiSuccess(res.data))
            return (res.data)
        } else {
            dispatch(activeCustomerAddressApiSuccess(res.data))
            return (res.data)
        }
    }).catch((err) => {
            alert('api failed:::', err);
            const message = "Server don't response correctly";
            showError(message)
            dispatch(activeCustomerAddressApiFailed(message))
            return (err)
        })

}
