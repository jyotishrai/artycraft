

import {
    BASE_URL, API
} from '../constants'

import {
    homeApiReq,
    homeApiFailed,
    homeApiSuccess
} from '../actionCreators'
import { showError } from '../NotificationService'
import axios from 'axios'

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


export const homeAPi = userData => async dispatch => {
    await dispatch(homeApiReq(userData))
    console.warn('request Data:--',BASE_URL + API.HOME_PAGE_DATA,userData);
    return axios.post(BASE_URL + API.HOME_PAGE_DATA, userData, {
        headers: { 'content-type': 'application/json' }
    }).then((res) => {
        console.log('response Data:--',res)
        if (res.data.error == undefined) {
            dispatch(homeApiSuccess(res.data))
            return (res.data)
        } else {
            dispatch(homeApiSuccess(res.data))
            return (res.data)
        }
    })
        .catch((err) => {
            console.log('response Data:--err',err)
            const message = "Server don't response correctly";
            dispatch(homeApiFailed(message))
            return (err)
        })

}

