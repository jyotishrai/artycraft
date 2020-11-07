

import {
    BASE_URL, API, KEY, APP_PARAMS
} from '../constants'

import { getOrderDetailApiReq, getOrderDetailApiSuccess, getOrderDetailApiFailed, orderCancelApiReq, orderCancelApiSuccess, orderCancelApiFailed, getOrderCancelApiSuccess, getOrderCancelApiFailed, getOrderCancelApiReq, orderReturnExchangeApiReq, orderReturnExchangeApiSuccess, orderReturnExchangeApiFailed } from '../actionCreators'
import { showError } from '../NotificationService'
import axios from 'axios'

export const getOrderDetailAPi = (id) => async dispatch => {
    await dispatch(getOrderDetailApiReq(id))
    let api = BASE_URL + API.ORDER_DETAIL + id
    console.warn('request data:-Order Detail', api);
    return axios.get(api ,{
        headers: { 'content-type': 'application/json' }
    }).then((res) => {
       // console.log('reponse data:-', JSON.stringify(res));

        if (res.data.error == undefined) {
            dispatch(getOrderDetailApiSuccess(res.data))
            return (res.data)
        } else {
            dispatch(getOrderDetailApiSuccess(res.data))
            return (res.data)
        }
    }).catch((err) => {
            const message = "Server don't response correctly";
            showError(message)
            dispatch(getOrderDetailApiFailed(message))
            return (err)
        })
}

export const orderCancelAPi = (data,id) => async dispatch => {
    await dispatch(orderCancelApiReq(data))
    let api = BASE_URL + API.ORDER_CANCEL +id
    console.warn('request data:-Order Detail', api,"data",data);
    return axios.post(api ,data,{
        headers: { 'content-type': 'application/json' }
    }).then((res) => {
        console.log('reponse data:-', JSON.stringify(res));

        if (res.data.error == undefined) {
            dispatch(orderCancelApiSuccess(res.data))
            return (res.data)
        } else {
            dispatch(orderCancelApiSuccess(res.data))
            return (res.data)
        }
    }).catch((err) => {
            const message = "Server don't response correctly";
            showError(message)
            dispatch(orderCancelApiFailed(message))
            return (err)
        })
}
export const orderReturnExchangeAPI = (data,id) => async dispatch => {
    await dispatch(orderReturnExchangeApiReq(data))
    let api = BASE_URL + API.ORDER_RETURN_EXCHANGE +id
    console.warn('request data:-Order Detail', api,"data",data);
    return axios.post(api ,data,{
        headers: { 'content-type': 'application/json' }
    }).then((res) => {
        console.log('reponse data:-', JSON.stringify(res));

        if (res.data.error == undefined) {
            dispatch(orderReturnExchangeApiSuccess(res.data))
            return (res.data)
        } else {
            dispatch(orderReturnExchangeApiSuccess(res.data))
            return (res.data)
        }
    }).catch((err) => {
            const message = "Server don't response correctly";
            showError(message)
            dispatch(orderReturnExchangeApiFailed(message))
            return (err)
        })
}

export const getCancelOrderList = (type) => async dispatch => {
    await dispatch(getOrderCancelApiReq())
    let api = BASE_URL + API.GET_ORDER_CANCEL_SUB +type
    console.warn('request data:-Order Detail', api);
    return axios.get(api ,{
        headers: { 'content-type': 'application/json' }
    }).then((res) => {
        console.log('reponse data:-', JSON.stringify(res));

        if (res.data.error == undefined) {
            dispatch(getOrderCancelApiSuccess(res.data))
            return (res.data)
        } else {
            dispatch(getOrderCancelApiSuccess(res.data))
            return (res.data)
        }
    }).catch((err) => {
            const message = "Server don't response correctly";
            showError(message)
            dispatch(getOrderCancelApiFailed(message))
            return (err)
        })
}
