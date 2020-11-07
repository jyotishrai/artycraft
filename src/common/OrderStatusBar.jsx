import React from 'react'
import { View, Text, Image } from 'react-native'
import styles from '../components/Auth/styles'
import Ripple from 'react-native-material-ripple'
import { FAQ, NOTIFICATION_DRAWER, MY_ACCOUNT, WISHLIST, MY_CRT, MY_ORDR, OFF_ZONE, LEGAL, NEXT_GRAY, PROFILE_IMG } from '../images'
import { FONT_FAMILIY, WIDTH, KEY, APP_PARAMS, SCREEN, SCREENS } from '../constants/index'
import { colors } from '../theme'
import { DIMENS, CURRENCY } from '../constants'
import translate from '../i18n/i18n'
import { ScrollView } from 'react-native-gesture-handler'

export const OrderStatusBar = (props) => {
    const { data, orderTrackingClk, isDetailScrn,style } = props
    try {
        return (
            <ScrollView contentContainerStyle={[{flexGrow:1},style]}>
          <Ripple style={{ //flex: 1,
                paddingHorizontal: DIMENS.px_20, justifyContent: 'center',//paddingVertical:DIMENS.px_10,
                borderBottomColor: colors.lightGraytransparent, borderBottomWidth: DIMENS.px_05, 
                paddingVertical:DIMENS.px_15
            }}
            disabled = {isDetailScrn?false:true}
             onPress={() =>  orderTrackingClk()}>

                 {
                     data&&data.length>0 &&
                     data.map((item, index) => {
                    console.warn("item::- status",JSON.stringify(item));
                    let dataOfStatus =  item[APP_PARAMS.STATUS_ARRAY]
                    return (
                        <View style={{flex:1}} key={index.toString()}>
                            {
                                isDetailScrn ?
                                    <View style={{ flex: 1, justifyContent: 'center' }}>
    
                                        <View style={{
                                            width: DIMENS.px_10, height: DIMENS.px_10, borderRadius: DIMENS.px_5,
                                            backgroundColor: colors.green, marginLeft: -4,
                                        }} />
                                        <View style={{
                                            borderLeftColor: index != data.length - 1 ? colors.green : undefined,
                                            borderLeftWidth: index != data.length - 1 ? DIMENS.px_2 : 0,
                                        }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: -DIMENS.px_14, }}>
                                               <View>
                                                   <View style={{flexDirection: 'row', alignItems: 'center',}}>
                                                <Text style={{
                                                    fontSize: DIMENS.txt_size_medium,
                                                    fontFamily: FONT_FAMILIY.Roboto_Medium,
                                                    marginLeft: DIMENS.px_20,
                                                    fontWeight: '600',
                                                    color:item.current&&item.current==true ? colors.primary: colors.black, //marginTop: -DIMENS.px_14,
    
                                                }}>{item.status}</Text>
                                                  {
                                                    index == data.length - 1 &&
                                                    <Image source={NEXT_GRAY} style={{ marginLeft: DIMENS.px_10, width:DIMENS.px_8, resizeMode: 'contain',tintColor:colors.black }} />
                                                }
                                                </View>
                                                {
                                                    item.subStatus&&
                                                
                                                <Text style={{
                                                    fontSize: DIMENS.txt_size_medium,
                                                    fontFamily: FONT_FAMILIY.Roboto_Medium,
                                                    marginLeft: DIMENS.px_20,
                                                    fontWeight: '500',
                                                    color: colors.grayClrForTxt, 
                                                    marginVertical: DIMENS.px_3,
    
                                                }}>{item.subStatus}</Text>
                                            }
                                            
                                            </View>
                                                {/* {
                                                    index == data.length - 1 &&
                                                    <Image source={NEXT_GRAY} style={{ marginLeft: DIMENS.px_10, width: DIMENS.px_5, resizeMode: 'contain',tintColor:colors.black }} />
                                                } */}
                                            </View>
                                            {
                                                item.time != undefined &&
                                                <Text style={{
                                                    fontSize: DIMENS.txt_size_medium,
                                                    fontFamily: FONT_FAMILIY.Roboto_Regular,
                                                    marginRight: DIMENS.px_5,
                                                    fontWeight: '500',
                                                    color: colors.grayClrForTxt,
                                                    marginLeft: DIMENS.px_20,
                                                    marginBottom: index != data.length - 1 ? DIMENS.px_20 : undefined
    
                                                }}>{item.time}</Text>
                                            }
    
                                        </View>
                                        {/* {
                            index == data.length-1 &&
                         <View style={{ width: DIMENS.px_10, height: DIMENS.px_10, borderRadius: DIMENS.px_5, backgroundColor: colors.green, marginLeft: -4 }} /> 
                         } */}
                                    </View> :
                                    <View  > 
                                        {
                                          dataOfStatus!=undefined&&dataOfStatus.length > 0 &&
                                          dataOfStatus.map((statusItem,statusIndx)=>{
                                              console.warn("status Item",JSON.stringify(statusItem));
                                              
                                                return(
                                                <View style={{ justifyContent: 'center'}}>
    
                                                    <View style={{
                                                        width: statusIndx == 0? DIMENS.px_10:undefined,
                                                         height:statusIndx == 0? DIMENS.px_10:undefined, borderRadius: DIMENS.px_5,
                                                        backgroundColor: colors.green, marginLeft: -4,
                                                    }} />
                                                    <View style={{
                                                        borderLeftColor: index != data.length - 1 ? colors.green : undefined,
                                                        borderLeftWidth: index != data.length - 1 ? DIMENS.px_2 : 0,
                                                    }}>
                                                            <Text style={{
                                                                fontSize: DIMENS.txt_size_medium,
                                                                fontFamily: FONT_FAMILIY.Roboto_Medium,
                                                                marginLeft: DIMENS.px_20,
                                                                fontWeight: '500',
                                                                color: colors.black, marginTop: statusIndx == 0?-DIMENS.px_14:undefined,
    
                                                            }}>{statusItem[APP_PARAMS.STATUS_BODY]}</Text>
                                                        {
                                                            statusItem[APP_PARAMS.STATUS_LOC] != undefined &&
                                                            <Text style={{
                                                                fontSize: DIMENS.txt_size_medium,
                                                                fontFamily: FONT_FAMILIY.Roboto_Regular,
                                                                marginRight: DIMENS.px_5,
                                                                fontWeight: '500',
                                                                color: colors.grayClrForTxt,
                                                                marginLeft: DIMENS.px_20,
                                                                marginBottom:isDetailScrn? (index != data.length - 1 ? DIMENS.px_20 : undefined):undefined
    
                                                            }}>{statusItem[APP_PARAMS.STATUS_LOC]}</Text>
                                                        }
                                                           
                                                        {
                                                            statusItem[APP_PARAMS.STATUS_TIME] != undefined &&
                                                            <Text style={{
                                                                fontSize: DIMENS.txt_size_medium,
                                                                fontFamily: FONT_FAMILIY.Roboto_Regular,
                                                                marginRight: DIMENS.px_5,
                                                                fontWeight: '500',
                                                                color: colors.grayClrForTxt,
                                                                marginLeft: DIMENS.px_20,
                                                                marginBottom: isDetailScrn? (index != data.length - 1 ? DIMENS.px_20 :undefined):DIMENS.px_20
    
                                                            }}>{statusItem[APP_PARAMS.STATUS_TIME]}</Text>
                                                        }
    
                                                    </View>
                                                  
                                                </View>
                                                )
                                                })
                                     }
                                   </View>
                            }
                        </View>
                    )
                })}
                </Ripple>
                 </ScrollView>
        )                                  
    } catch (error) {
        alert('err::--'+error)
    return(
        <View/>
    )
    }
   
}