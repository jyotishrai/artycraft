import React from 'react'
import { Image, TouchableOpacity, View, Text, Picker, ActivityIndicator } from 'react-native'
import { BACK, MENU, NOTIFICATION, ORDER, STAR, DOWN_ARR, DELETE, PLACEHOLDER_PRODUCT, PLACEHOLDER_PRODUCT_IMG } from '../images'
import styles from '../components/Auth/styles'
import Ripple from 'react-native-material-ripple'

import { colors } from '../theme'
import { DIMENS, FONT_FAMILIY, CURRENCY, WIDTH, HEIGHT, APP_PARAMS } from '../constants'
import Basecomponents from './BaseComponent'
import { Dropdown } from 'react-native-material-dropdown';
import translate from '../i18n/i18n'
import * as Utils from '../utility/Utils'
import * as Toast from '../utility/Toast'
import Modal from 'react-native-modal'
import { TextInput } from 'react-native-gesture-handler'

export default class CommonOrderSummaryProduct extends Basecomponents {
    constructor(props) {
        super(props)

        this.state = {
            dropTxtValue: props.item && props.item[APP_PARAMS.QTY] ? props.item[APP_PARAMS.QTY] : '1',
            qtyTxtValue: '',
            moreTxtValue: false
        }
    }
    moreQtyPopoverClose = () => {
        this.setState({ moreTxtValue: false })
    }
    setQty = (text) => {
        if (text == 'more') {
            this.setState({ moreTxtValue: true })
        } else {
            this.setState({ dropTxtValue: text }, () =>
                this.props.selectQty(text))
        }
    }
    applyMoreQty = () => {
        if (this.state.qtyTxtValue != '') {
            this.setState({ moreTxtValue: false })
            this.props.selectQty(this.state.qtyTxtValue)
        } else {
            Toast.showErrorToast(translate('INVALID_QTY'))
        }

    }
    addMoreQtyView = () => {
        return (
            <Modal
                style={{ backgroundColor: colors.blackTransparent, margin: 0, justifyContent: 'center', }}
                animationType="slide"
                transparent={true}
                visible={this.state.moreTxtValue}
                onDismiss={() => this.setState({ moreTxtValue: !this.state.moreTxtValue })}
                onRequestClose={() => this.setState({ moreTxtValue: !this.state.moreTxtValue })}>

                <View style={{ backgroundColor: colors.white, marginHorizontal: DIMENS.px_30, marginTop: DIMENS.px_10 }}>

                    <Text style={{
                        color: colors.black, fontSize: DIMENS.txt_size_medium_1, marginTop: DIMENS.px_15,
                        fontFamily: FONT_FAMILIY.Roboto_Medium, marginHorizontal: DIMENS.px_10
                    }}>
                        {translate('ENTER_QTY')}</Text>
                    <TextInput
                        placeholder={translate('QUANTITY')}
                        style={{ marginHorizontal: DIMENS.px_10 }}
                        onChangeText={(txt) => this.setState({ qtyTxtValue: txt })} />

                    <View style={{
                        width: '100%', flexDirection: 'row', justifyContent: 'space-evenly', borderTopColor: colors.lightGrayText, borderTopWidth: DIMENS.px_05,
                        borderBottomColor: colors.lightGrayText, borderBottomWidth: DIMENS.px_05, paddingVertical: DIMENS.px_10
                    }}>
                        {/* <View style={{borderRightWidth:DIMENS.px_05 ,borderRightColor:colors.lightGrayText,justifyContent:'center'}}> */}
                        <Ripple style={{ width: '50%' }} onPress={() => this.setState({ moreTxtValue: false })}>
                            <Text style={{
                                color: colors.black, fontSize: DIMENS.txt_size_medium_1, textAlign: 'center',
                                fontFamily: FONT_FAMILIY.Roboto_Medium, textAlign: 'center', borderRightWidth: DIMENS.px_05, borderRightColor: colors.lightGrayText
                            }}>
                                {translate('CANCEL')}</Text>
                        </Ripple>
                        {/* </View> */}
                        <Ripple style={{ width: '50%' }} onPress={() => this.applyMoreQty()}>
                            <Text style={{
                                width: '50%',
                                color: colors.primary, fontSize: DIMENS.txt_size_medium_1,
                                fontFamily: FONT_FAMILIY.Roboto_Medium, textAlign: 'center'
                            }}>
                                {translate('APPLY')}</Text>
                        </Ripple>

                    </View>
                </View>
            </Modal>
        )
    }
    render() {
        const { item, onPressRemove, data, txt, isRemove, isSaveForLater } = this.props
        let qty = this.state.dropTxtValue
        let order_qty = item[APP_PARAMS.ORDER_QTY] ? item[APP_PARAMS.ORDER_QTY] : 1
      
        return (
            <View style={{
                borderBottomColor: colors.lightGraytransparent, borderBottomWidth: DIMENS.px_5, width: '100%',marginVertical:DIMENS.px_5
            }}>
                <View style={{ paddingLeft: 10, paddingTop: 10, marginBottom: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={{ flex: .8 }}>
                            <Text numberOfLines={2}
                            style={{ color: colors.black, fontSize: DIMENS.txt_size_medium_1, fontFamily: FONT_FAMILIY.Roboto_Medium }}>
                                {item.name}</Text>
                                { item.productVarinats != undefined &&
                                <Text style={{ color: colors.grayClrForTxt, fontSize: DIMENS.txt_size_small_12, fontFamily: FONT_FAMILIY.Roboto_Regular,marginVertical:DIMENS.px_5 }}>
                                    {item.productVarinats}</Text>}
                                {item[APP_PARAMS.SELLER_NAME] != undefined &&
                                <Text style={{ color: colors.grayClrForTxt, fontSize: DIMENS.txt_size_small_12, fontFamily: FONT_FAMILIY.Roboto_Regular,marginBottom:DIMENS.px_5 }}>
                                    {`${translate('SELLER')} : ${item[APP_PARAMS.SELLER_NAME]}`}</Text>}
                            {
                                 item[APP_PARAMS.IN_STOCK] != undefined && item[APP_PARAMS.IN_STOCK] != 0 && item.rating != undefined &&
                                <View style={{ flexDirection: 'row', marginVertical: DIMENS.px_10, alignItems: 'center' }}>
                                    <Text style={{ color: colors.green, fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                                        {item.rating}</Text>
                                    <Image source={STAR} style={{ width: DIMENS.px_5, height: DIMENS.px_5, marginHorizontal: DIMENS.px_2 }} />
                                    {
                                        item.ratingCount != undefined &&
                                        <Text style={{ color: colors.lightGrayClr, fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                                            {'(' + item.ratingCount + ')'}</Text>
                                    }

                                </View>}
                           
                           
                           { 
                        //    item[APP_PARAMS.IN_STOCK] != undefined && item[APP_PARAMS.IN_STOCK] != 0 &&
                           <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                                <Text style={{ color: colors.black, fontSize: DIMENS.txt_size_large, fontFamily: FONT_FAMILIY.Roboto_Medium }}>
                                    {item.discountPrice && CURRENCY.RUPEES + (item.discountPrice * order_qty).toFixed(2)}</Text>
                                {
                                    item.price && (item.discount != undefined && item.discount > 0 ||  item[APP_PARAMS.OFF_IN_PER] != undefined && item[APP_PARAMS.OFF_IN_PER] != 'null' && item[APP_PARAMS.OFF_IN_PER] != 0.0)&&
                                    <Text style={{ marginLeft: DIMENS.px_8, textDecorationLine: 'line-through', color: colors.lightGrayClr, fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                                        {CURRENCY.RUPEES + (item.price * order_qty).toFixed(2) + ' '}</Text>
                                }
                                 {
                                   
                                   item.discount!=undefined &&  item.discount != 0.0 &&
                                   <Text style={{
                                       marginLeft: DIMENS.px_5,
                                       color: colors.green,
                                       fontSize: DIMENS.txt_size_medium,
                                       fontFamily: FONT_FAMILIY.Roboto_Regular
                                   }}>
                                       {`${item.discount}%${translate('OFF')}`}</Text>
                               }
                               {
                                   item[APP_PARAMS.OFF_IN_PER] != undefined && item[APP_PARAMS.OFF_IN_PER] != 'null' && item[APP_PARAMS.OFF_IN_PER] != 0.0 &&
                                   ( item.discount!=undefined &&  item.discount == 0.0 )&&
                                   <Text style={{
                                       marginLeft: DIMENS.px_5,
                                       color: colors.green,
                                       fontSize: DIMENS.txt_size_medium,
                                       fontFamily: FONT_FAMILIY.Roboto_Regular
                                   }}>
                                       {`${item[APP_PARAMS.OFF_IN_PER]}%${translate('OFF')}`}</Text>
                               }

                           </View>}
                                {/* {
                                    item[APP_PARAMS.OFF_IN_PER] != undefined && item[APP_PARAMS.OFF_IN_PER] != 'null' && item[APP_PARAMS.OFF_IN_PER] != 0.0 &&
                                    <Text style={{
                                        marginLeft: DIMENS.px_5,
                                        color: colors.green,
                                        fontSize: DIMENS.txt_size_medium,
                                        fontFamily: FONT_FAMILIY.Roboto_Regular
                                    }}>
                                        {`${item[APP_PARAMS.OFF_IN_PER]}%${translate('OFF')}`}</Text>
                                } */}

                            
                            {
                                item[APP_PARAMS.IN_STOCK] != undefined && item[APP_PARAMS.IN_STOCK] != 0 &&
                                // item.offer != undefined &&
                                <Text style={{
                                    marginTop: DIMENS.px_15, color: colors.black,marginBottom: DIMENS.px_5,
                                    fontSize: DIMENS.txt, fontFamily: FONT_FAMILIY.Roboto_Regular,
                                    backgroundColor: colors.bgOfTxt, padding: 10, alignSelf: 'flex-start', borderRadius: 3
                                }}>
                                    {item.offer != undefined ? item.offer : translate('NO_OFFER')}</Text>
                            }
                        </View>
                        <View style={{ flexDirection: 'column', justifyContent: 'center', flex: .3 }}>
                            <Image source={item[APP_PARAMS.IMG_LOC] != undefined && item[APP_PARAMS.IMG_LOC] != '' ? { uri: item[APP_PARAMS.IMG_LOC] } : PLACEHOLDER_PRODUCT_IMG}
                                style={{ width: WIDTH * 25 / 100, height: 70, resizeMode: 'contain', marginTop: -20,paddingTop:10 }} />
                            {
                                item[APP_PARAMS.IN_STOCK] != undefined && item[APP_PARAMS.IN_STOCK] != 0 &&
                                    <View style={{ paddingHorizontal: DIMENS.px_15, paddingVertical: DIMENS.px_10 }}>
                                <Dropdown
                                    style={{paddingHorizontal:DIMENS.px_10,}}
                                    onChangeText={(text) => this.setQty(text)}
                                    data={data}
                                    renderBase={(itemData, index) => {

                                        return (
                                            <View style={{
                                                flexDirection: 'row', 
                                                backgroundColor: colors.bgOfTxt,paddingHorizontal:DIMENS.px_12 ,
                                                borderRadius: 3, paddingVertical: DIMENS.px_10,
                                                 alignItems: 'center', justifyContent: 'center'
                                            }}
                                            >
                                                {
                                                    item['isSelect'] == true ?
                                                        // item[APP_PARAMS.LoaderIndx]  ?
                                                        <ActivityIndicator size='small' color={colors.primary} style={{ paddingHorizontal: DIMENS.px_15 }} /> :
                                                        <View style={{ flexDirection: 'row', backgroundColor: colors.bgOfTxt, alignItems: 'center',//paddingHorizontal:DIMENS.px_8 ,
                                                         }}
                                                        >
                                                            <Text style={{
                                                                color: colors.black,
                                                                fontSize: DIMENS.txt, fontFamily: FONT_FAMILIY.Roboto_Regular,
                                                                //alignSelf: 'flex-start'
                                                            }}>
                                                                {translate('QTY') + " :" + this.props.qty}</Text>
                                                            <Image source={DOWN_ARR} style={{ width: 16, height: 8, resizeMode: 'center',paddingRight:5 }} />
                                                        </View>
                                                }
                                            </View>)
                                    }
                                    }
                                />
                            </View>
                            }
                        </View>
                    </View>


                    <View style={{ marginTop: 2,flexDirection:'row',justifyContent:'space-between' }}>
                        <View>
                        { 
                    item[APP_PARAMS.IN_STOCK] != undefined && item[APP_PARAMS.IN_STOCK] != 0 &&
                         (  item[APP_PARAMS.DELIVERY_TIME] != undefined &&
                        <View style={{  }}>
                            <Text style={{
                                color: colors.black,
                                fontSize: DIMENS.txt_size_medium,
                                fontFamily: FONT_FAMILIY.Roboto_Regular,
                            }}> {translate('DELIVER_BY')}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                    <Text style={{
                                        color: colors.black,
                                        fontSize: DIMENS.txt_size_medium,
                                        fontFamily: FONT_FAMILIY.Roboto_Regular,
                                        fontWeight: '500', textAlign: 'left'
                                    }}> {Utils.getTimeFromTimeStamp(item[APP_PARAMS.DELIVERY_TIME], 'DD MMM, dddd')}</Text>
                                    {
                                        item[APP_PARAMS.SHIPPING_CHARGE] != undefined &&

                                        <Text style={{
                                            color: colors.green,
                                            fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular,
                                            marginRight: DIMENS.px_5, fontWeight: '500'
                                        }}>{item[APP_PARAMS.SHIPPING_CHARGE] == 0.0 ? ` | ( ${translate('FREE')} )` : ` | ${CURRENCY.RUPEES}${item[APP_PARAMS.SHIPPING_CHARGE]}`}</Text>}

                                </View>
                                
                            </View>
                        </View>
                         )
                      }
                        </View>
                  

                    {
                                     isRemove &&
                                    <Ripple style={{
                                        flexDirection: 'row',
                                        paddingTop: DIMENS.px_5, right: 10,paddingBottom:DIMENS.px_5

                                    }}
                                        onPress={onPressRemove}>
                                        <Image source={DELETE} style={{ width: 20, height: 18, resizeMode: 'center', tintColor: colors.grayClr }} />

                                        <Text style={{
                                            color: colors.grayClr, textAlign: 'right',
                                            fontSize: DIMENS.txt, fontFamily: FONT_FAMILIY.Roboto_Regular,
                                            marginRight: DIMENS.px_5,
                                        }}>
                                            {translate('REMOVE')}</Text>
                                    </Ripple>
                                }
                    </View>
                  
                        {
                   item[APP_PARAMS.IN_STOCK] != undefined && item[APP_PARAMS.IN_STOCK] != 0 &&
                    (this.state.moreTxtValue &&
                    this.addMoreQtyView())
                }
                {
                    item[APP_PARAMS.IN_STOCK] != undefined && item[APP_PARAMS.IN_STOCK] == 0 &&
                    <Text style={{ paddingTop:DIMENS.px_10,color: 'red', fontFamily: FONT_FAMILIY.Roboto_Medium, fontSize: DIMENS.txt_size_large_extra }}>
                    {translate('OUT_OF_STOCK')}</Text>
                }

                </View>

            
             
            </View>
        )
    }
}