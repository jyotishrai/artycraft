

import {
    BASE_URL, API, KEY, APP_PARAMS
} from '../constants'

import {
 countryApiReq,countryApiSuccess, countryApiFailed,
 stateApiReq, stateApiSuccess, stateApiFailed, 
 cityApiReq, cityApiSuccess, cityApiFailed,
 addAddressOrUpdateApiReq, addAddressOrUpdateApiSuccess, addAddressOrUpdateApiFailed,
 addressIsFromCallSuccess,
} from '../actionCreators'
import { showError } from '../NotificationService'
import axios from 'axios'

export const getAllCountryAPI = () => async dispatch => {
    await dispatch(countryApiReq())
    let api = BASE_URL + API.GET_ALL_COUNTRY 
    console.log('request data:-', api);
    return axios.get(api, {
        headers: { 'content-type': 'application/json' }
    }).then((res) => {
        if (res.data.error == undefined) {
            dispatch(countryApiSuccess(res.data))
            return (res.data)
        } else {
            dispatch(countryApiSuccess(res.data))
            return (res.data)
        }
    }).catch((err) => {
            const message = "Server don't response correctly";
            showError(message)
            dispatch(countryApiFailed(message))
            return (err)
        })

}

export const getAllStateAPI = (countryId) => async dispatch => {
    await dispatch(stateApiReq())
    let api = BASE_URL + API.GET_ALL_STATE +countryId
    console.warn('request data:-', api);
    return axios.get(api, {
        headers: { 'content-type': 'application/json' }
    }).then((res) => {
        console.warn('response data:-', JSON.stringify(res));
        if (res.data.error == undefined) {
            dispatch(stateApiSuccess(res.data))
            return (res.data)
        } else {
            dispatch(stateApiSuccess(res.data))
            return (res.data)
        }
    }).catch((err) => {
            const message = "Server don't response correctly";
            showError(message)
            dispatch(stateApiFailed(message))
            return (err)
        })

}

export const getAllCityAPI = (stateId) => async dispatch => {
    await dispatch(cityApiReq())
    let api = BASE_URL + API.GET_ALL_CITY + stateId
    console.log('request data:-', api);
    return axios.get(api, {
        headers: { 'content-type': 'application/json' }
    }).then((res) => {
        if (res.data.error == undefined) {
            dispatch(cityApiSuccess(res.data))
            return (res.data)
        } else {
            dispatch(cityApiSuccess(res.data))
            return (res.data)
        }
    }).catch((err) => {
            const message = "Server don't response correctly";
            showError(message)
            dispatch(cityApiFailed(message))
            return (err)
        })

}

export const addAdressUpdateAPi = (data) => async dispatch => {
    await dispatch(addAddressOrUpdateApiReq(data))
    let api = BASE_URL + API.ADD_UPDATE_ADDRESS + global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID]
    console.log('request data:-', api,data);
    return axios.post(api,data ,{
        headers: { 'content-type': 'application/json' }
    }).then((res) => {
        console.log('response data:-',JSON.stringify(res));
        if (res.data.error == undefined) {
            dispatch(addAddressOrUpdateApiSuccess(res.data))
            return (res.data)
        } else {
            dispatch(addAddressOrUpdateApiSuccess(res.data))
            return (res.data)
        }
    }).catch((err) => {
            const message = "Server don't response correctly";
            showError(message)
            dispatch(addAddressOrUpdateApiFailed(message))
            return (err)
        })
}

export const cleaData=()=>async dispatch=>{
    dispatch(addAddressOrUpdateApiSuccess(undefined))
}

export const addressIsFromCall=(data)=>async dispatch=>{
    dispatch(addressIsFromCallSuccess(data))
}
