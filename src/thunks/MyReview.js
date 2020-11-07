

import {
    BASE_URL, API, KEY, APP_PARAMS
} from '../constants'

import { showError } from '../NotificationService'
import axios from 'axios'

import { getCommentReviewListApiReq, getCommentReviewListApiSuccess, getCommentReviewListApiFailed, deleteCommentReviewApiReq, deleteCommentReviewApiSuccess, deleteCommentReviewApiFailed } from '../actionCreators'


export const getCommentReviewListAPI = () => async dispatch => {
    await dispatch(getCommentReviewListApiReq())
    let api = BASE_URL + API.GET_COMMENT_REVIEW_LIST+ global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID]
    //  
    console.warn('request data:-', api, );
    return axios.get(api, {
        headers: { 'content-type': 'application/json' }
    }).then((res) => {
        console.warn('resspon  data:-', JSON.stringify(res));
        if (res.data.error == undefined) {
            dispatch(getCommentReviewListApiSuccess(res.data))
            return (res.data)
        } else {
            dispatch(getCommentReviewListApiSuccess(res.data))
            return (res.data)
        }
    }).catch((err) => {
            alert('api failed:::', err);
            const message = "Server don't response correctly";
            showError(message)
            dispatch(getCommentReviewListApiFailed(message))
            return (err)
        })
}

export const deleteCommentReviewAPI = (id) => async dispatch => {
    await dispatch(deleteCommentReviewApiReq())
    let api = BASE_URL + API.DELETE_COMMENT_REVIEW+ id
    //  
    console.warn('request data:-', api, );
    return axios.get(api, {
        headers: { 'content-type': 'application/json' }
    }).then((res) => {
        console.warn('resspon  data:-', JSON.stringify(res));
        if (res.data.error == undefined) {
            dispatch(deleteCommentReviewApiSuccess(res.data))
            return (res.data)
        } else {
            dispatch(deleteCommentReviewApiSuccess(res.data))
            return (res.data)
        }
    }).catch((err) => {
           // alert('api failed:::', err);
            const message = "Server don't response correctly";
            showError(message)
            dispatch(deleteCommentReviewApiFailed(message))
            return (err)
        })

}
