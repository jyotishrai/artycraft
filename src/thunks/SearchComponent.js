import { BASE_URL, API, SEARCH_FAIL} from '../constants'
import {searchApiReq, searchApiSuccess, searcApiFailed} from '../actionCreators'
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
export const SearchComponentAPI = searchText => async dispatch => {
    await dispatch(searchApiReq(searchText))
    console.warn('request Data:--',BASE_URL + API.PRODUCT_SEARCH+searchText);
    return axios.post(BASE_URL + API.PRODUCT_SEARCH+searchText, {
        headers: { 'content-type': 'application/json' }
    }).then((res) => {
       // console.warn('response Data:--',res)
        if (res.data.error == undefined) {
            dispatch(searchApiSuccess(res.data))
            return (res.data)
        } else {
            dispatch(searchApiSuccess(res.data))
            return (res.data)
        }
    })
        .catch((err) => {
            console.log('response Data:--err',err)
            const message = "Server don't response correctly";
            dispatch(searcApiFailed(message))
            return (err)
        })

}