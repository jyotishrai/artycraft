

import {
    BASE_URL, API
} from '../constants'

import {
    catDetailApiSuccess, catDetailApiFailed, catDetailApiReq, catDetailApiReqOnPagination, 
    dealUPTOApiReq, dealUPTOApiSuccess, dealUPTOApiFailed, 
    getSortFilterApiSuccess, getSortFilterApiFailed,getSortFiltrApi, randomProductApiApiReqOnPagination, randomProductApiApiSuccess, randomProductApiApiFailed, randomProductApiReq
} from '../actionCreators'
import { showError } from '../NotificationService'
import axios from 'axios'

// const backgroundColors = [
//     '#53c6a2',
//     '#fdd762',
//     '#9261d3',
//     '#43dce7',
//     '#ffcc5a',
//     '#ea4398',
//     '#4a5de1',
//     '#e95555',
//     '#7eda54',
//     '#f9b647',
// ]
// const getRandomColor = () => {
//     return backgroundColors[backgroundColors.length * Math.random() | 0]
// }


export const categoryDetailAPI = (userData,isPagination) => async dispatch => {
    if(isPagination)
    await dispatch(catDetailApiReqOnPagination(userData))
    else
    await dispatch(catDetailApiReq(userData))

    console.warn('request Data:--Category detail api',BASE_URL + API.CAT_DETAIL,userData);
    return axios.post(BASE_URL + API.CAT_DETAIL, userData, {
        headers: { 'content-type': 'application/json' }
    }).then((res) => {
        console.warn('response:--Category detail api',JSON.stringify(res.data));
        if (res.data.error == undefined) {
            dispatch(catDetailApiSuccess(res.data))
            return (res.data)
        } else {
            dispatch(catDetailApiSuccess(res.data))
            return (res.data)
        }
    })
        .catch((err) => {
          //  console.log('response Data:--err',err)
            const message = "Server don't response correctly";
            dispatch(catDetailApiFailed(message))
            return (err)
        })

}

export const clearCategoryDetail = () => async dispatch => {
    dispatch(catDetailApiSuccess(undefined))
}



export const getProductsByDealOfTheDayOrOffUpToAPI = (userData,isPagination) => async dispatch => {
    if(isPagination)
    await dispatch(dealUPTOApiReqOnPagination(userData))
    else
    await dispatch(dealUPTOApiReq(userData))
    console.log('request Data:--',BASE_URL + API.GET_PRODUCT_DEAL_OFF_UP_TO,userData);
    return axios.post(BASE_URL + API.GET_PRODUCT_DEAL_OFF_UP_TO, userData, {
        headers: { 'content-type': 'application/json' }
    }).then((res) => {
       // console.log('response Data:--Cat',JSON.stringify(res))
        if (res.data.error == undefined) {
            dispatch(dealUPTOApiSuccess(res.data))
            return (res.data)
        } else {
            dispatch(dealUPTOApiSuccess(res.data))
            return (res.data)
        }
    }).catch((err) => {
          //  console.log('response Data:--err',err)
            const message = "Server don't response correctly";
            dispatch(dealUPTOApiFailed(message))
            return (err)
        })
}

export const getSortFilterApi = (catId) => async dispatch => {
    await dispatch(getSortFiltrApi(catId))
    console.log('request Data:--',BASE_URL + API.SORT_FILTER_LIST, catId);
    return axios.post(BASE_URL + API.SORT_FILTER_LIST, catId, {
        headers: { 'content-type': 'application/json' }
    }).then((res) => {
        console.log('response Data:--Sort',JSON.stringify(res))
        if (res.data.error == undefined) {
            dispatch(getSortFilterApiSuccess(res.data))
            return (res.data)
        } else {
            dispatch(getSortFilterApiSuccess(res.data))
            return (res.data)
        }
    }).catch((err) => {
          //  console.log('',err)
            const message = "Server don't response correctly";
            dispatch(getSortFilterApiFailed(message))
            return (err)
        })
}

export const randomProductApi = (userData,isPagination) => async dispatch => {
    if(isPagination)
    await dispatch(randomProductApiApiReqOnPagination(userData))
    else
    await dispatch(randomProductApiReq(userData))

    console.warn('request Data:--',BASE_URL + API.RANDOM_PRODUCT,userData);
    return axios.post(BASE_URL + API.RANDOM_PRODUCT, userData, {
        headers: { 'content-type': 'application/json' }
    }).then((res) => {
        console.warn('response Data:--Cat',JSON.stringify(res))
        if (res.data.error == undefined) {
            dispatch(randomProductApiApiSuccess(res.data))
            return (res.data)
        } else {
            dispatch(randomProductApiApiSuccess(res.data))
            return (res.data)
        }
    }).catch((err) => {
       //     console.log('response Data:--err',err)
            const message = "Server don't response correctly";
            dispatch(randomProductApiApiFailed(message))
            return (err)
        })

}