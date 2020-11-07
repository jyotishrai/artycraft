
import {
    BASE_URL, API
} from '../constants'

import {
 getProductDetailByIdApiReq, getProductDetailByIdApiSuccess, getProductDetailByIdApiFailed
} from '../actionCreators'
import { showError } from '../NotificationService'
import axios from 'axios'

export const getProductDetailByIdAPI = userData => async dispatch => {
   
    await dispatch(getProductDetailByIdApiReq (userData))
    console.warn('request Data:--',BASE_URL + API.GET_PRODUCT_DETAILS_BY_ID, userData);
    return axios.post(BASE_URL + API.GET_PRODUCT_DETAILS_BY_ID, userData, {
        headers: { 'content-type': 'application/json' }
    }).then((res) => {
       console.warn('response Data:--Cat',JSON.stringify(res))
        if (res.data.error == undefined) {
            dispatch(getProductDetailByIdApiSuccess(res.data))
            return (res.data)
        } else {
            dispatch(getProductDetailByIdApiSuccess(res.data))
            return (res.data)
        }
    })
        .catch((err) => {
          //  console.log('response Data:--err',err)
            const message = "Server don't response correctly";
            showError(message)
            dispatch(getProductDetailByIdApiFailed(message))
            return (err)
        })

}
