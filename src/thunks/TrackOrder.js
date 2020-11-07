

import {
    BASE_URL, API, KEY, APP_PARAMS
} from '../constants'

import { trackOrderFullDetailAPiReq, trackOrderFullDetailAPiSuccess, trackOrderFullDetailAPiFailed, getTrackIDAPiReq, getTrackIDAPiSuccess, getTrackIDAPiFailed } from '../actionCreators'
import { showError } from '../NotificationService'
import axios from 'axios'



export const getTrackFullDetailAPi = (id) => async dispatch => {
    await dispatch(trackOrderFullDetailAPiReq(id))
    let api = BASE_URL + API.TRACK_ORDER_FULL_DETAIL + id
    console.warn('request data:-Order Detail', api);
    return axios.get(api ,{
        headers: { 'content-type': 'application/json' }
    }).then((res) => {
        console.warn('reponse data:-', JSON.stringify(res));

        if (res.data.error == undefined) {
            dispatch(trackOrderFullDetailAPiSuccess(res.data))
            return (res.data)
        } else {
            dispatch(trackOrderFullDetailAPiSuccess(res.data))
            return (res.data)
        }
    }).catch((err) => {
            const message = "Server don't response correctly";
            showError(message)
            dispatch(trackOrderFullDetailAPiFailed(message))
            return (err)
        })
}
export const getTrackIDAPi = (id) => async dispatch => {
    await dispatch(getTrackIDAPiReq(id))
    let api = BASE_URL + API.GET_TRACK_ID + id
    console.warn('request data:-Order Detail', api);
    return axios.get(api ,{
        headers: { 'content-type': 'application/json' }
    }).then((res) => {
        console.warn('reponse data:-', JSON.stringify(res));

        if (res.data.error == undefined) {
            dispatch(getTrackIDAPiSuccess(res.data))
            return (res.data)
        } else {
            dispatch(getTrackIDAPiSuccess(res.data))
            return (res.data)
        }
    }).catch((err) => {
            const message = "Server don't response correctly";
            showError(message)
            dispatch(getTrackIDAPiFailed(message))
            return (err)
        })
}


