
import {
    BASE_URL, API
} from '../constants'

import {

} from '../actionCreators'
import { showError } from '../NotificationService'
import axios from 'axios'
import { changePasswordApiReq, changePasswordApiSuccess, changePasswordApiFailed } from '../actionCreators/ChangePassword'

export const changePasswordAPI = userData => async dispatch => {
   
    await dispatch(changePasswordApiReq(userData))
    console.warn('request Data:--',BASE_URL + API.CAHNGE_PASSWORD_LOGIN_USER,userData);
    return axios.post(BASE_URL + API.CAHNGE_PASSWORD_LOGIN_USER, userData, {
        headers: { 'content-type': 'application/json' }
    }).then((res) => {
       console.warn('response Data:--Cat',JSON.stringify(res))
        if (res.data.error == undefined) {
            dispatch(changePasswordApiSuccess(res.data))
            return (res.data)
        } else {
            dispatch(changePasswordApiSuccess(res.data))
            return (res.data)
        }
    })
        .catch((err) => {
            console.log('response Data:--err',err)
            const message = "Server don't response correctly";
            showError(message)
            dispatch(changePasswordApiFailed(message))
            return (err)
        })
}
