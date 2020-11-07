

import {
    BASE_URL, API, KEY, APP_PARAMS
} from '../constants'

import { showError } from '../NotificationService'
import axios from 'axios'
import { wishListApiReq, wishListApiSuccess, wishListpiFailed, clearAllWishDataApiSuccess, clearAllWishDataApiFailed, clearAllWishDataApiReq } from '../actionCreators'

export const wishListAPI = (data) => async dispatch => {
    let api = BASE_URL + API.WISH_LIST //+ userID ;
    console.log('request Data:--Wishlist',api,"data",data);

    await dispatch(wishListApiReq(data))
    return axios.post(api,data, {
        headers: { 'content-type': 'application/json' }
    }).then((res) => {
        console.log('response Data:--Wishlist',res);

        if (res.data.error == undefined) {
            dispatch(wishListApiSuccess(res.data))
            return (res.data)
        } else {
            dispatch(wishListApiSuccess(res.data))
            return (res.data)
        }
    }).catch((err) => {
            const message = "Server don't response correctly";
            dispatch(wishListpiFailed(message))
            showError(message)
            return (err)
        })

}
export const clearWishData = (data) => async dispatch => {
    let api = BASE_URL + API.CLEAR_ALL_WISH  ;
    console.log('request Data:--Wishlist',api,data);

    await dispatch(clearAllWishDataApiReq(data))
    return axios.post(api,data, {
        headers: { 'content-type': 'application/json' }
    }).then((res) => {
        console.log('response Data:--Wishlist',res);

        if (res.data.error == undefined) {
            dispatch(clearAllWishDataApiSuccess(res.data))
            return (res.data)
        } else {
            dispatch(clearAllWishDataApiSuccess(res.data))
            return (res.data)
        }
    }).catch((err) => {
            const message = "Server don't response correctly";
            dispatch(clearAllWishDataApiFailed(message))
            showError(message)
            return (err)
        })

}
// export const clearWishData = () => async dispatch => {
//     dispatch(wishListApiSuccess(undefined))
// }


