

import {
    BASE_URL_GEOCODE, API, APP_PARAMS, LEGACY_SERVER_KEY
} from '../constants'

import {
    geoLocationReq,
    geoLocationSuccess,
    geoLocationFailed
} from '../actionCreators'
import { showError } from '../NotificationService'
import axios from 'axios'
import * as Utils from '../utility/Utils'

export const geoLocationAPI = locationData => async dispatch => {
    await dispatch(geoLocationReq(locationData))
    let urlParameters = Object.entries(locationData).map(e => e.join('=')).join('&');
    console.log('locationData:-', locationData);


    let api = BASE_URL_GEOCODE + API.ADDRESS_FROM_GOOGLE + locationData[APP_PARAMS.LAT] + ',' + locationData[APP_PARAMS.LNG] + `&key=${LEGACY_SERVER_KEY}` //+ AIzaSyCglsWmMuR5tH0Sp1ktsFEktkPhRhJlPUY//Constants.LEGACY_SERVER_KEY;
    console.log('request data:-', api);

    return axios.get(api, {
        headers: { 'content-type': 'application/x-www-form-urlencoded' }
    }).then(async(response) => {
        let objAddress = await Utils.parseGeocodeAddress(response)
        console.warn('response of address:-',JSON.stringify(objAddress));
        dispatch(geoLocationSuccess(objAddress))
         return (objAddress)
      
    })
        .catch((err) => {
            const message = "Server don't response correctly";
            dispatch(geoLocationFailed(message))
            return (message)
        })

}


