
import {
    BASE_URL, API
} from '../constants'

import {
  catProductDetailApiReq, catProductDetailApiSuccess, catProductDetailApiFailed,
  addProductInWishListApiSuccess,addProductInWishListApiFailed,addProductInWishListReq, addPostalCodeReq, addPostalCodeApiSuccess, addPostalCodeApiFailed, addCartRemoveReq, addCartRemoveApiSuccess, addCartRemoveApiFailed, dataUpdateInProductDetail, clearCatSubDetailSuccess
} from '../actionCreators'
import { showError } from '../NotificationService'
import axios from 'axios'

export const categoryProductDetailAPI = userData => async dispatch => {
   
    await dispatch(catProductDetailApiReq(userData))
    console.warn('request Data:--',BASE_URL + API.CAT_PRODUCT_DETAIL,userData);
    return axios.post(BASE_URL + API.CAT_PRODUCT_DETAIL, userData, {
        headers: { 'content-type': 'application/json' }
    }).then((res) => {
       console.warn('response Data:--categoryProductDetailAPI',JSON.stringify(res))
        if (res.data.error == undefined) {
            dispatch(catProductDetailApiSuccess(res.data))
            return (res.data)
        } else {
            dispatch(catProductDetailApiSuccess(res.data))
            return (res.data)
        }
    })
        .catch((err) => {
            console.log('response Data:categoryProductDetailAPI--err',err)
            const message = "Server don't response correctly";
            showError(message)
            dispatch(catProductDetailApiFailed(message))
            return (err)
        })

}
export const addProductInWishListAPI = userData => async dispatch => {
   
    await dispatch(addProductInWishListReq(userData))

    console.log('request Data:--',BASE_URL + API.ADD_WISH_UN_WISH_PRODUCT,userData);
    return axios.post(BASE_URL + API.ADD_WISH_UN_WISH_PRODUCT, userData, {
        headers: { 'content-type': 'application/json' }
    }).then((res) => {
       console.log('response Data:--CatSubDetail WISHLISt',JSON.stringify(res))
        if (res.data.error == undefined) {
            dispatch(addProductInWishListApiSuccess(res.data))
            return (res.data)
        } else {
            dispatch(addProductInWishListApiSuccess(res.data))
            return (res.data)
        }
    })
        .catch((err) => {
            console.log('response Data:CatSubDetail WISHLISt--err',err)
            const message = "Server don't response correctly";
            showError(message)
            dispatch(addProductInWishListApiFailed(message))
            return (err)
        })

}
export const addPostalCodeAPI = userData => async dispatch => {
    await dispatch(addPostalCodeReq(userData))
    console.log('request Data:--',BASE_URL + API.ADD_POST_CODE,userData);
    return axios.post(BASE_URL + API.ADD_POST_CODE, userData, {
        headers: { 'content-type': 'application/json' }
    }).then((res) => {
       console.log('response Data:--CatSubDetail postal code',JSON.stringify(res))
        if (res.data.error == undefined) {
            dispatch(addPostalCodeApiSuccess(res.data))
            return (res.data)
        } else {
            dispatch(addPostalCodeApiSuccess(res.data))
            return (res.data)
        }
    }) .catch((err) => {
            console.log('response Data:CatSubDetail postal code--err',err)
            const message = "Server don't response correctly";
            showError(message)
            dispatch(addPostalCodeApiFailed(message))
            return (err)
        })
}
export const addCartRemoveCartAPI = data => async dispatch => {
    await dispatch(addCartRemoveReq(data))
    console.warn('request Data:--',BASE_URL + API.ADD_REMOVE_CART,data);
    return axios.post(BASE_URL + API.ADD_REMOVE_CART, data, {
        headers: { 'content-type': 'application/json' }
    }).then((res) => {
       console.warn('response Data:--CatSubDetail WISHLISt',JSON.stringify(res))
        if (res.data.error == undefined) {
            dispatch(addCartRemoveApiSuccess(res.data))
            return (res.data)
        } else {
            dispatch(addCartRemoveApiSuccess(res.data))
            return (res.data)
        }
    }) .catch((err) => {
            console.log('response Data:addCartRemoveCartAPI--err ',err)
            const message = "Server don't response correctly";
            showError(message)
            dispatch(addCartRemoveApiFailed(message))
            return (err)
        })
}

export const dataUpdateInProductDetailReq=(data)=>async dispatch=>{
    dispatch(dataUpdateInProductDetail(data))
}

export const commentAndReviewsAPI = data => async dispatch => {

}


export const clearCategorySubDetail = () => async dispatch => {
    dispatch(clearCatSubDetailSuccess(undefined))
}


