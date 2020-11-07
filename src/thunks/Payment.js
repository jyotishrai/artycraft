

import {
    BASE_URL, API, KEY, APP_PARAMS, BASE_URL_RAZOR_PAY_ORDER_ID
} from '../constants'

import { showError } from '../NotificationService'
import axios from 'axios'
import { placeOrderReq, placeOrderSuccess, placeOrderFailed, placeOrderIDReq, placeOrderIDSuccess, placeOrderIDFailed, paymentModeReq, paymentModeSuccess, paymentModeFailed } from '../actionCreators'

export const placeOrderAPi = (data) => async dispatch => {
    await dispatch(placeOrderReq(data))
    let api = BASE_URL + API.PLACE_ORDER
    console.warn('request data:-', api,data);
    return axios.post(api,data,{
        headers: { 'content-type': 'application/json' }
    }).then((res) => {
        console.warn('response:-',JSON.stringify(res));

        if (res.data.error == undefined) {
            dispatch(placeOrderSuccess(res.data))
            return (res.data)
        } else {
            dispatch(placeOrderSuccess(res.data))
            return (res.data)
        }
    }).catch((err) => {
            const message = "Server don't response correctly";
            showError(message)
            dispatch(placeOrderFailed(message))
            return (err)
        })

}
export const placeOrderID = (data) => async dispatch => {
    await dispatch(placeOrderIDReq(data))
   // let api = BASE_URL_RAZOR_PAY_ORDER_ID + API.PLACE_ORDER_ID
    let api = BASE_URL + API.PLACE_ORDER_ID

    http://172.104.160.243:8080/admin/api/mob/v1/ptmSimilarUser/orderPayPost
    console.warn('request data:-', api,data);
    return axios.post(api,data,{
        headers: { 'content-type': 'application/json' }
    }).then((res) => {
        console.warn('response:-',JSON.stringify(res));
        if (res.data.error == undefined) {
            dispatch(placeOrderIDSuccess(res.data))
            return (res.data)
        } else {
            dispatch(placeOrderIDSuccess(res.data))
            return (res.data)
        }
    }).catch((err) => {
            const message = "Server don't response correctly";
            showError(message)
            dispatch(placeOrderIDFailed(message))
            return (err)
        })

}
export const getPaymentMode = () => async dispatch => {
    await dispatch(paymentModeReq())
    let api = BASE_URL + API.PAYMENT_MODE
    
    console.warn('request data:-', api);
    return axios.get(api,{
        headers: { 'content-type': 'application/json' }
    }).then((res) => {
        //console.warn('response:-paymentMode',JSON.stringify(res));
        if (res.data.error == undefined) {
            dispatch(paymentModeSuccess(res.data))
            return (res.data)
        } else {
            dispatch(paymentModeSuccess(res.data))
            return (res.data)
        }
    }).catch((err) => {
            const message = "Server don't response correctly";
            showError(message)
            dispatch(paymentModeFailed(message))
            return (err)
        })

}