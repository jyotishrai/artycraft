import {
    BASE_URL, API
} from '../constants'
import { getCompareProducsApiReq, getCompareProducsApiSuccess, getCompareProducsApiFailed } from '../actionCreators'
import { showError } from '../NotificationService'
import axios from 'axios'


export const getCompareProductListAPI = (data) => async dispatch => {
    console.warn('request Data:--Category detail api',BASE_URL + API.GET_COMPARE_PROD_LIST,JSON.stringify(data));

    await dispatch(getCompareProducsApiReq(data))
    let apiUrl = BASE_URL + API.GET_COMPARE_PROD_LIST

    return axios.post(apiUrl, data, {
        headers: { 'content-type': 'application/json' }
    }).then((res) => {
        console.log('response Compare:: :', JSON.stringify(res));
        
        if (res.data.error == undefined) {
            dispatch(getCompareProducsApiSuccess(res.data))
            return (res.data)
        } else {
            dispatch(getCompareProducsApiSuccess(res.data))
            return (res.data)
        }
    })  
    .catch((err) => {
            console.log('response Data:--err',err)
            const message = "Server don't response correctly";
            dispatch(getCompareProducsApiFailed(message))
            return (err)
        })



}