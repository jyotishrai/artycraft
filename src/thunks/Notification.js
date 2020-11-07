

import {
    BASE_URL, API, KEY, APP_PARAMS
} from '../constants'

import {
    
} from '../actionCreators'
import { showError } from '../NotificationService'
import axios from 'axios'
import { notificationApiReq, notificationApiSuccess, notificationApiFailed } from '../actionCreators/Notification'

export const getNotificationAPi = () => async dispatch => {
    await dispatch(notificationApiReq())
    let api = `${BASE_URL}${API.GET_NOTIFICATION_LIST}${global[KEY.USER_DATA] != undefined && global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID]}`;
     console.warn('requests Data:--getNotificationAPi',api)

    return axios.get(api, {
        headers: { 'content-type': 'application/json' }
    }).then((res) => {
       console.warn('response Data:--',JSON.stringify(res))
        if (res.data.error == undefined) {
            dispatch(notificationApiSuccess(res.data))
            return (res.data)
        } else {
            dispatch(notificationApiSuccess(res.data))
            return (res.data)
        }
    }) .catch((err) => {
            console.log('response Data:--err',err)
            const message = "Server don't response correctly";
            dispatch(notificationApiFailed(message))
            return (err)
        })
}

// export const clearNotificationData = () => async dispatch => {
//     dispatch(clearMyOrderHistory(undefined))
// }

