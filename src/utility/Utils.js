import {
    BASE_URL_GEOCODE, API, APP_PARAMS, LEGACY_SERVER_KEY, KEY, CONST
} from '../constants'
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-community/async-storage';
import { storeData, retrieveData } from '../common/AsyncStorage'
import moment from 'moment';
import translate from '../i18n/i18n';

//import messaging from '@react-native-firebase/messaging';

// async function registerAppWithFCM() {
//   await messaging().registerForRemoteNotifications();
// }

export const getDeviceId = () => {
    return DeviceInfo.getUniqueId();
}
export const getRequestId = () => {
    return DeviceInfo.getUniqueId();
}

export const parseFilterData = (data) => {
    let tempDataArr = [];
    if (data != undefined && data != null) {
        try {
            console.warn('parse data object:::', JSON.stringify(data));

            Object.keys(data).map((key) => {
                //  tempDataArr.push({"title":key,"data":data[key]})
                let tempObj = { "title": key, "data": data[key] }
                let tempChildArr = [];

                //  Object.keys(data[key]).map((k) =>{
                //     tempChildArr.push( {"isSelected":false,"label":data[key][k]})
                // })
                // tempObj.data = tempChildArr;
                tempDataArr.push(tempObj)
            })
            console.warn('parse data object::: tempArr::---', JSON.stringify(tempDataArr));

            return tempDataArr;
        } catch (error) {
            // alert('error::: '+error)
        }
    }
}

export const parseSpecData = (data) => {
    let tempDataArr = [];
    if (data != undefined && data != null) {
        try {
            Object.keys(data).map((key) => {
                let tempObj = { "title": key }
                let tempChildArr = ''
                Object.keys(data[key]).map((k) => {
                    let str = data[key][k].replace(/__null__null__/g, "")
                    console.warn('parse data object:::k', str);

                    tempChildArr = tempChildArr != '' ? `${tempChildArr} | ${str}` : str
                })
                tempObj['data'] = tempChildArr
                tempDataArr.push(tempObj)
            })
            return tempDataArr;
        } catch (error) {
            // alert('error::: '+error)
        }
    }
}
export const parseVarinetData = (data) => {
    let tempDataArr = [];
    if (data != undefined && data != null) {
        try {
            let tempObj = {}
            Object.keys(data).map((key) => {
                let tempObj = { "type": key }
                let  tempChildArr = []
              
                Object.keys(data[key]).map((k) => {
                    tempChildArr.push(data[key][k])
                 })
                 tempObj['data'] = tempChildArr
                 tempDataArr.push(tempObj)
    })
            // console.log('varints:::0000--parse data object:::k', tempChildArr.length);
              console.log('varints:::0000--parse data object:::arr', tempDataArr.length);
            return tempDataArr;
        } catch (error) {
            // alert('error::: '+error)
        }
    }
}
export const parserObj = (data) => {
    let tempDataArr = [];
    if (data != undefined && data != null) {
        try {

            Object.keys(data).forEach((key) => {
                let dataTemp = [];
                Object.keys(data[key]).forEach(intElt => {

                    let desc = ''
                    data[key][intElt].forEach(descriptElt => {
                        desc = desc != '' ? desc + ' | ' + descriptElt : descriptElt
                    })
                    dataTemp.push({ "title": intElt, description: desc })
                })
                tempDataArr.push({ "title": key, "data": dataTemp })
            })
            console.warn('parse data object:::', JSON.stringify(tempDataArr));

            return tempDataArr;
        } catch (error) {
            console.warn('error in parseObj::', error);
        }
    }
}

export const parseGeocodeAddress = (response) => {
    try {
        let objAddress = {}
        if (response != undefined && response != null && response.data != undefined && response.data.results != undefined && response.data.results.length > 0) {

            let childobj = response.data.results[0];
            console.log('childobj:::--', childobj);
            objAddress[APP_PARAMS.FORMATED_ADDRESS] = childobj.formatted_address != undefined ?
                childobj.formatted_address : ''

            if (childobj.address_components != null &&
                childobj.address_components != undefined
                && childobj.address_components.length > 0) {

                console.log('objAddress:::--befor', objAddress);



                let array = childobj.address_components;

                for (const key in array) {
                    if (array.hasOwnProperty(key)) {
                        const element = array[key];
                        if (element.types[0] == "country") {
                            objAddress[APP_PARAMS.COUNTRY_LONG_NAME] = element.long_name;
                            objAddress[APP_PARAMS.COUNTRY_SHORT_NAME] = element.short_name;
                        }
                        if (element.types[0] == "administrative_area_level_1") {
                            objAddress[APP_PARAMS.STATE_LONG_NAME] = element.long_name;
                            objAddress[APP_PARAMS.STATE_SHORT_NAME] = element.short_name;
                        }
                        if (element.types[0] == "administrative_area_level_2") {
                            objAddress[APP_PARAMS.CITY_LONG_NAME] = element.long_name;
                            objAddress[APP_PARAMS.CITY_SHORT_NAME] = element.short_name;
                        }
                        if (element.types[0] == "postal_code") {
                            objAddress[APP_PARAMS.POSTAL_CODE] = element.long_name;
                        }

                    }
                }
            }
            console.log('objAddress:::--', objAddress);
            let geometryObj = childobj.geometry;
            if (geometryObj != undefined && geometryObj != null) {
                let objLocation = geometryObj.location;

                if (objLocation != undefined && objLocation != null) {
                    objAddress[APP_PARAMS.LAT] = objLocation.lat;
                    objAddress[APP_PARAMS.LNG] = objLocation.lng;
                }
            }

            objAddress.place_id = childobj.place_id;

        }
        return (objAddress)
    } catch (error) {
        return (error)
    }
}

export const getUserDetail = (key) => {
    retrieveData(key, (result => {
        return result
    }))
}

export const convertHtmlToText = (txt) => {
    var rex = /(<([^>]+)>)/ig;
    let withoutTag = txt.replace(rex,'');
    let withoutNbsp = withoutTag.replace(/[&]nbsp[;]/gi, " ");
    console.log("description::--",withoutNbsp);
    
    return withoutNbsp;
    // var text = txt.split(/[^A-Za-z]/).filter(x => x !== '').slice(1, -1).join(' ') 
    // return text
}
export const convertALignToHTml=(txt)=>{
    
    var text =  txt.match(/<(\w+)>[^\<]+<\/\1>|[^<>]+/ig)
    //var text = txt.split(/[^A-Za-z]/).filter(x => x !== '').slice(1, -1).join(' ') 
    return text
}
// export const getTimeFromTimeStamp=(timestamp,formate)=>{
//     var t = new Date(timestamp);
//     console.log('time:--',t);

//     var formatted = t.formate('DD:MM');
//     return formatted
// }
export const getDiffernceBtwDate = (start, end) => {
    const startDate = moment(start);
    const timeEnd = moment(end);
    const diff = startDate.diff(timeEnd);
    console.warn('moment ::---day', getTimeFromTimeStamp(diff, 'DD'))
    return diff
}
export const getTimeFromTimeStamp = (dateTime, forShowFormat) => {
    var showDateValue = '';
    if (dateTime !== null || dateTime !== undefined) {
        showDateValue = moment(dateTime).format(forShowFormat)
    }
    return showDateValue;
}
export const capitalizeFirstChar = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
export const convertDateIntoMilisecond = (dataTime, comingFormat) => {
    var convertedMilisecond = 0;
    if (dataTime !== null || dataTime !== undefined) {
        var momentObj = moment(dataTime, comingFormat);
        convertedMilisecond = momentObj.valueOf();
    }
    return convertedMilisecond;
}
export const convertStrDateFormat = (utcDateTime, comingFormat, forShowFormat) => {
    if (utcDateTime !== null && utcDateTime !== undefined && utcDateTime !== '') {
        var momentObj = moment(utcDateTime, comingFormat);
        utcDateTime = momentObj.format(forShowFormat);
    }
    else
        utcDateTime = '';
    return utcDateTime;
}

export const convertTimeToOtherFormat = (time, forShowFormat) => {
if(time!==undefined && time!==null && time!=='') {
  return  moment(time).format('MMM YYYY');
}
}
export const convertStrTimeToOtherFormat = (time, forShowFormat) => {
    if(time!==undefined && time!==null && time!=='') {
      
        
      return  moment(time).format(forShowFormat);
    }
    }
export const removeUnderscore = (str) => {
    return str.replace(/_/g, " ")
}

export async function getSearchlocation(keytext, callbackSucess, callbackFail) {
    var keytextTemp = keytext;
    if (keytextTemp != undefined && keytextTemp != null && keytextTemp != '') {
        keytextTemp = keytextTemp + ',(india)'
    }
    try {
        let response = await fetch(
            `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${keytextTemp}&key=${LEGACY_SERVER_KEY}`
        );

        let responseJson = await response.json();
        console.log('response of google search api', responseJson.predictions);

        callbackSucess(responseJson.predictions);
    } catch (error) {
        console.error(error);
        callbackFail(error)
    }
}

//Imqgae

export const getFormDataFromObject = (data) => {
    const formData = new FormData();
    for (var key in data) {
        if (typeof data[key] === 'object') {
            var dataValue = data[key];
            console.log("dataValue::--",dataValue);
            
            if (key == 'image') {
                dataValue.forEach((element, i) => {
                   
                    formData.append('image', element)
                  });
            }
            
            else {
                if (dataValue !== null && dataValue.uri !== undefined && dataValue.uri !== null) {
                }
                else {
                    if (dataValue != null) {
                        dataValue = ((JSON.stringify(dataValue)));
                        dataValue = dataValue.replace(/\\/g);
                    }
                }
                if (dataValue != undefined && dataValue != null) {
                    formData.append(key, dataValue);
                }
            }
        }
        else {
            if (data[key] != undefined && data[key] != null) {
                formData.append(key, data[key]);
            }
        }
    }
    return formData;
}



export const  createFormData = async(param) => {
   let image = param[APP_PARAMS.IMAGE]
   let dataParam =  delete param[APP_PARAMS.IMAGE]
   console.warn("dataParam::--",param);
   let imageName = image.path.split('/')
   let nameOfImage = imageName[imageName.length-1]
   const data = new FormData();
   data.append('image', 
   {
        uri: image.path,
        type: image.type,
        name:nameOfImage
    }
    );
    console.warn("data::--",data);
    for(var key in param){
        console.warn("data::-key-",key);
        data.append(key, param[key]);

    }

    // Object.keys(param).forEach(key => {
    //     data.append(key, param[key]);
    // });
    console.warn("data::--",data);

    return data;
};


export const orderStatus = (data)=>{
    if(data[APP_PARAMS.CURRENT_STATUS_TYPE]===CONST.ORDER_PLACE){
        return(translate('ORDER_STATUS_PROCESSING'))
    }else if(data[APP_PARAMS.CURRENT_STATUS_TYPE]===CONST.ORDER_CANCEL){
        return(translate('ORDER_STATUS_CANCEL'))
    }
}
export const orderStatusOrder = (status)=>{
    if(status===CONST.ORDER_PLACE){
        return(translate('ORDER_STATUS_PROCESSING'))
    }else if(status===CONST.ORDER_CANCEL){
        return(translate('ORDER_STATUS_CANCEL'))
    }else if(status===CONST.ORDER_MANIFEST){
        return(translate('ORDER_STATUS_MANIFEST'))
    }else if(status===CONST.ORDER_PICKED_UP){
        return(translate('ORDER_STATUS_PICKED_UP'))
    }else if(status===CONST.ORDER_DELIVERD){
        return(translate('ORDER_STATUS_DELIVERED'))
    }else if(status===CONST.ORDER_DISPATCH){
        return(translate('ORDER_STATUS_DISPATCH'))
    }else if(status===CONST.ORDER_OUT_FOR_DELIVRY){
        return(translate('ORDER_STATUS_OUT_FOR_DELIVRY'))
    }else if(status===CONST.ORDER_IN_TRANSIT){
        return(translate('ORDER_STATUSIN_TRANSIT'))
    }else if(status===CONST.ORDER_RETURN){
        return(translate('ORDER_STATUS_RETURN'))
    }else if(status===CONST.ORDER_RETURN_TRANSIT){
        return(translate('ORDER_STATUS_RETURN_TRANSIT'))
    }else if(status===CONST.ORDER_RETURN_OUT_FOR_DELIVRY){
        return(translate('ORDER_STATUS_RETURN_OUT_FOR_DELIVRY'))
    }else if(status===CONST.ORDER_REACHED_PICKER_WAREHOUSE){
        return(translate('ORDER_STATUS_REACHED_PICKER_WAREHOUSE'))
    }else if(status===CONST.ORDER_RETURN_TO_CONSIGNEE){
        return(translate('ORDER_STATUSRETURN_TO_CONSIGNEE'))
    }else if(status===CONST.ORDER_STATUS_DELIVEY_FAIL){
        return(translate('ORDER_STATUS_DELIVEY_FAIL'))
    }
}
 