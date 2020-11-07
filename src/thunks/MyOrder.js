

import {
    BASE_URL, API, KEY, APP_PARAMS
} from '../constants'

import {
    
} from '../actionCreators'
import { showError } from '../NotificationService'
import axios from 'axios'
import { myOrderHistoryApiReq, myOrderHistoryApiSuccess, myOrderHistoryApiFailed, myOrderHistoryApiReqOnPagination, clearMyOrderHistory } from '../actionCreators/MyOrder'



export const orderHistoryAPi = (data,isPagination) => async dispatch => {

    if(isPagination)
    await dispatch(myOrderHistoryApiReqOnPagination(data))
    else
    await dispatch(myOrderHistoryApiReq(data))
    let api = `${BASE_URL}${API.MY_ORDER_HISTORY}`;//${global[KEY.USER_DATA]!=undefined&&global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID]}
    console.warn('request APi:--',api,data)


    return axios.post(api,data, {
        headers: { 'content-type': 'application/json' }
    }).then((res) => {
       // console.warn('response Data:--',JSON.stringify(res))
        if (res.data.error == undefined) {
            dispatch(myOrderHistoryApiSuccess(res.data))
            return (res.data)
        } else {
            dispatch(myOrderHistoryApiSuccess(res.data))
            return (res.data)
        }
    })
        .catch((err) => {
            console.log('response Data:--err',err)
            const message = "Server don't response correctly";
            dispatch(myOrderHistoryApiFailed(message))
            return (err)
        })

}

export const clearMyOrderData = () => async dispatch => {
    dispatch(clearMyOrderHistory(undefined))
}

