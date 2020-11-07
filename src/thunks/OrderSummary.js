

import {
    BASE_URL, API, KEY, APP_PARAMS
} from '../constants'

import { cartListApiReq, cartListApiSuccess, cartListApiFailed,orderSummaryCallFromSuccess, 
    cartUpdateApiSuccess, cartUpdateApiReq, cartUpdateApiFailed,addBillingDataReq, dataUpdateInProductDetail } from '../actionCreators'
import { showError } from '../NotificationService'
import axios from 'axios'



export const cartListDataAPi = (data) => async dispatch => {
    await dispatch(cartListApiReq(data))
    let api = BASE_URL + API.CART_LIST 
    console.warn('request data:-', api,data);
    return axios.post(api,data ,{
        headers: { 'content-type': 'application/json' }
    }).then((res) => {
        //console.log('reponse data:-', JSON.stringify(res));

        if (res.data.error == undefined) {
            dispatch(cartListApiSuccess(res.data))
            return (res.data)
        } else {
            dispatch(cartListApiSuccess(res.data))
            return (res.data)
        }
    }).catch((err) => {
            const message = "Server don't response correctly";
            showError(message)
            dispatch(cartListApiFailed(message))
            return (err)
        })
}

// export const cleaData=()=>async dispatch=>{
//     dispatch(addAddressOrUpdateApiSuccess(undefined))
// }
export const orderSummaryCallFrom=(data)=>async dispatch=>{
    dispatch(orderSummaryCallFromSuccess(data))
}


export const addUpdateCartQtyDataAPi = (data) => async dispatch => {
    await dispatch(cartUpdateApiReq(data))
    let api = BASE_URL + API.ADD_ORDER_QTY 
    console.warn('request data:-', api,data);
    return axios.post(api,data ,{
        headers: { 'content-type': 'application/json' }
    }).then((res) => {
        //console.log('reponse data:-', JSON.stringify(res));

        if (res.data.error == undefined) {
            dispatch(cartUpdateApiSuccess(res.data))
            return (res.data)
        } else {
            dispatch(cartUpdateApiSuccess(res.data))
            return (res.data)
        }
    }).catch((err) => {
            const message = "Server don't response correctly";
            showError(message)
            dispatch(cartUpdateApiFailed(message))
            return (err)
        })
}
export const addBillingData=(data)=>async dispatch=>{
    dispatch(addBillingDataReq(data))
    return data
}

