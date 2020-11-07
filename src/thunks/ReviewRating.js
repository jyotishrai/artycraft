

import {
    BASE_URL, API, KEY, APP_PARAMS
} from '../constants'

import { reviewRatingApiSuccess, reviewRatingApiReq, reviewRatingApiFailed } from '../actionCreators'
import { showError } from '../NotificationService'
import axios from 'axios'
import {getFormDataFromObject,createFormData} from '../utility/Utils'

export const reviewRatingAPi = (data) => async dispatch => {
    await dispatch(reviewRatingApiReq(data))
    let api = BASE_URL + API.REVIEW_RATING 

    console.log('request data:-', api,data);
    let urlParameters = getFormDataFromObject (data)
    console.log('request urlParameters:-',JSON.stringify(urlParameters));

    return axios.post(api,urlParameters ,{
        headers: { 'content-type': 'application/json' }
    }).then((res) => {
        console.warn('reponse data:-', res);
        
        if (res.data.error == undefined) {
            dispatch(reviewRatingApiSuccess(res.data))
            return (res.data)
        } else {
            dispatch(reviewRatingApiSuccess(res.data))
            
            return (res.data)
        }
    }).catch((err) => {
        console.warn("err:::---",err);
        
            const message = "Server don't response correctly";
            showError(message)
            dispatch(reviewRatingApiFailed(message))
            return (err)
        })

}




