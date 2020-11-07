

import {
    BASE_URL, API, KEY, APP_PARAMS
} from '../constants'
import translate from '../i18n/i18n'

import {
    loginApi,
    loginApiSuccess,
    loginApiFailed,

    SignUpApi,
    SignUpApiSuccess,
    SignUpApiFailed,

    otpAPi,
    otpApiFailed,
    otpApiSuccess,
    logoutRequest,
    logoutSuccess,
    isFromForLoginRequest,
    saveLoginOnLounch,
    resendOtpApiSuccess,
    resendOtpApiFailed,
    resendOtpApiReq,
    logoutFail
} from '../actionCreators'
import { showError } from '../NotificationService'
import axios from 'axios'
import { showErrorToast, showErrorFailToast } from '../utility/Toast'
import { storeData, clearData } from '../common/AsyncStorage'
import { appIsFromComing } from '../actionCreators/TermsCondition'

const backgroundColors = [
    '#53c6a2',
    '#fdd762',
    '#9261d3',
    '#43dce7',
    '#ffcc5a',
    '#ea4398',
    '#4a5de1',
    '#e95555',
    '#7eda54',
    '#f9b647',
]
const getRandomColor = () => {
    return backgroundColors[backgroundColors.length * Math.random() | 0]
}


export const loginApiUser = (userData, isPhoneLogin) => async dispatch => {
    await dispatch(loginApi(userData))
    let url = ''
    if (isPhoneLogin)
        url = BASE_URL + API.LOGIN_PHONE
    else
        url = BASE_URL + API.LOGIN_EMIAL
    console.log('request data:--', url, userData, isPhoneLogin);

    return axios.post(url, userData, {
        headers: { 'content-type': 'application/json' }
    }).then((res) => {

        if (res.data.error == undefined) {
            dispatch(loginApiSuccess(res.data))
            return (res.data)
        } else {
            dispatch(loginApiSuccess(res.data))
            return (res.data)
        }
    })
        .catch((err) => {
            const message = "Server don't response correctly";
            dispatch(loginApiFailed(message))
            showErrorFailToast(translate('MESSAGE_SERVER_ERROR'))
            return (err)
        })

}
export const SignUpAPI = userData => async dispatch => {
    await dispatch(SignUpApi(userData))
    let urlParameters = Object.entries(userData).map(e => e.join('=')).join('&');
    console.log('reques dtaa:->', userData, 'URTL:--', BASE_URL + API.SIGN_UP);
    return axios.post(BASE_URL + API.SIGN_UP, userData, {
        headers: { 'content-type': 'application/json' }
    }).then((res) => {
        console.log('response::--', res);


        if (res.data.error == undefined) {
            dispatch(SignUpApiSuccess(res.data))
            return (res.data)
        } else {
            dispatch(SignUpApiSuccess(res.data))
            return (res.data)
        }
    })
        .catch((err) => {
            const message = "Server don't response correctly";
            dispatch(SignUpApiFailed(message))
            return (err)
        })

}

export const otpAPI = userData => async dispatch => {
    await dispatch(otpAPi(userData))
    //let urlParameters = Object.entries(userData).map(e => e.join('=')).join('&');
    console.log('reques dtaa:->', userData, 'URTL:--', BASE_URL + API.OTP_VERIFICATION);
    return axios.post(BASE_URL + API.OTP_VERIFICATION, userData, {
        headers: { 'content-type': 'application/json' }
    }).then((res) => {
        console.log('response::--', res);

        if (res.data.error == undefined) {
            dispatch(otpApiSuccess(res.data))
            return (res.data)
        } else {
            dispatch(otpApiSuccess(res.data))
            return (res.data)
        }
    })
        .catch((err) => {
            const message = "Server don't response correctly";
            dispatch(otpApiFailed(message))
            return (err)
        })

}
export const resendOtpApi = id => async dispatch => {
    await dispatch(resendOtpApiReq(id))
    //let urlParameters = Object.entries(userData).map(e => e.join('=')).join('&');
    console.log('URTL:--', BASE_URL + API.RESEND_OTP + id);
    return axios.get(BASE_URL + API.RESEND_OTP + id, {
        headers: { 'content-type': 'application/json' }
    }).then((res) => {
        console.log('response::--', res);

        if (res.data.error == undefined) {
            dispatch(resendOtpApiSuccess(res.data))
            return (res.data)
        } else {
            dispatch(resendOtpApiSuccess(res.data))
            return (res.data)
        }
    })
        .catch((err) => {
            const message = "Server don't response correctly";
            dispatch(resendOtpApiFailed(message))
            return (err)
        })

}

export const logOutCall = userData => async dispatch => {
    // await dispatch(logoutRequest(false))
    // await clearData(KEY.AS_GUESt_USER)
    // await clearData(KEY.USER_DATA)
    // global[KEY.USER_DATA] = undefined
    // global[KEY.CART_COUNT] = 0
    // global[KEY.WISH_COUNT] = 0
    //  await dispatch(logoutSuccess(userData))
    // return userData
    await dispatch(logoutRequest(userData))
    let apiUrl = `${BASE_URL}${API.LOGOUT_API}${global[KEY.USER_DATA] != undefined && global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID]}`
    console.log('logout URTL:--', apiUrl);
    return axios.get(apiUrl, {
        headers: { 'content-type': 'application/json' }
    }).then((res) => {
        if (res.data.error == undefined) {
            console.log('reponse data:-err undefined', JSON.stringify(res));
            dispatch(logoutRequest(false))
            clearData(KEY.AS_GUESt_USER)
            clearData(KEY.USER_DATA)
            global[KEY.USER_DATA] = undefined
            global[KEY.CART_COUNT] = 0
            global[KEY.WISH_COUNT] = 0
            dispatch(logoutSuccess(res.data))
            return (res.data)
        } else {
            console.log('reponse data:-err false', JSON.stringify(res));
            dispatch(logoutSuccess(res.data))
            return (res.data)
        }
    }).catch((err) => {
        const message = "Server don't response correctly";
        showError(message)
        dispatch(logoutFail(message))
        return (err)
    })
    // return axios.get("http://172.105.49.143:8080/admin/api/mob/v1/ptmSimilarUser/userLogout/58987409-f056-4a07-9030-020f825485a4", {
    //     headers: { 'content-type': 'application/json' }
    // }).then((res) => {
    //     if (res.data.error == undefined) {
    //         console.log('response::--false', res);

    //         dispatch(logoutSuccess(res.data))
    //         return (res.data)
    //     } else {
    //         console.log('response::--true', res);

    //         dispatch(logoutSuccess(res.data))
    //         return (res.data)
    //     }
    // })
    //     .catch((err) => {
    //         const message = "Server don't response correctly";
    //         dispatch(logoutFail(message))
    //         return (err)
    //     })
}

export const changeIsFrom = userData => async dispatch => {
    await dispatch(isFromForLoginRequest(userData))
    return userData
}

export const savUserOnLunch = userData => async dispatch => {
    await dispatch(saveLoginOnLounch(userData))
    return userData
}

export const appIsFromComingReq = data => async dispatch => {
    await dispatch(appIsFromComing(data))
    return data
}