

import {
    BASE_URL, API, KEY, APP_PARAMS
} from '../constants'

import { updateProfileApiSuccess, updateProfileApiFailed, updateProfileApiReq } from '../actionCreators'
import { showError } from '../NotificationService'
import axios from 'axios'
import { } from '../actionCreators/MyOrder'



export const updateProfileAPi = (data) => async dispatch => {
    let api = `${BASE_URL}${API.UPDATE_PROFILE}`;
    console.warn('request APi:--',api,data)

    await dispatch(updateProfileApiReq(data))
    return axios.post(api,data, {
        headers: { 'content-type': 'application/json' }
    }).then((res) => {
        console.warn('response Data:--',JSON.stringify(res))

        if (res.data.error == undefined) {
            dispatch(updateProfileApiSuccess(res.data))
            return (res.data)
        } else {
            dispatch(updateProfileApiSuccess(res.data))
            return (res.data)
        }
    })
        .catch((err) => {
            console.log('response Data:--err',err)
            const message = "Server don't response correctly";
            dispatch(updateProfileApiFailed(message))
            return (err)
        })

}

