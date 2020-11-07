import React from 'react'
import { Image, TouchableOpacity, View, Text, FlatList, ActivityIndicator } from 'react-native'
import { SHOP_CART, MENU, NOTIFICATION, ORDER, STAR, NEXT_GRAY, BULLET, DOWN_ARR, PLACEHOLDER_PRODUCT_IMG, GREENCIRCLE, PERCENTAGE } from '../images'
import styles from '../components/Auth/styles'
import Ripple from 'react-native-material-ripple'

import { FONT_FAMILIY, WIDTH, CURRENCY, DIMENS, APP_PARAMS, KEY, CONST } from '../constants/index'
import { colors } from '../theme'
import translate, { translateHeaderText } from '../i18n/i18n'
import { Dropdown } from 'react-native-material-dropdown';
import * as Utils from '../utility/Utils'
import CommonImage from '../common/CommonImage'

export default ({ style, onPress, item }) => (
    <Ripple style={[{ justifyContent: 'center', alignItems: 'center', borderColor: colors.lightGray, borderWidth: 0.5, paddingVertical: DIMENS.px_10 }, style,]}//styles.productImgView
        onPress={onPress}>
        <View style={{ margin: 5, justifyContent: 'center', alignItems: 'center' }}>

            <CommonImage
                source={(item.imageLocations && item.imageLocations !== '') ?
                    { uri: item.imageLocations } : PLACEHOLDER_PRODUCT_IMG}
                styles={{
                    width: WIDTH * 40 / 100, height: 100, marginHorizontal: DIMENS.px_5
                        .px2, resizeMode: 'contain',
                    tintColor: (item.imageLocations && item.imageLocations !== '') ? undefined : colors.lightGrayText
                }}
            ></CommonImage>

            <Text style={{ marginTop: DIMENS.px_10, textAlign: 'center', color: colors.Blue, marginBottom: DIMENS.px_3, fontSize: DIMENS.txt_size_small, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                {item.price != undefined && item.price != '' && translate('FROM_TEXT') + CURRENCY.RUPEES + item.price}</Text>
            <Text numberOfLines={2} style={{ textAlign: 'center', color: colors.header, fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                {item.name}</Text>
        </View>
    </Ripple>
)
export const CommonHorizontailList = (props) => {
    const { item, onPress, style } = props;
    return (
        <Ripple style={[{
            padding: 10,
            justifyContent: 'center', alignItems: 'center',
            borderColor: colors.lightGray, borderWidth: 0.5
        },
            style
        ]}// styles.productImgView
            onPress={onPress}>
            <View style={{ justifyContent: 'center', alignItems: 'center', padding: 5, width: '100%' }}>
                <Image source={item.imageLocations != undefined && item.imageLocations != '' ? { uri: item.imageLocations } : SHOP_CART} style={{
                    height: 100, width: WIDTH * 40 / 100,
                    marginHorizontal: DIMENS.px_5, marginBottom: DIMENS.px_10
                    , resizeMode: 'contain'
                }} />
                <View style={{
                    width: WIDTH / 2 - 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: DIMENS.px_3,
                }}>
                    <Text style={{
                        color: colors.Blue,
                        fontSize: DIMENS.txt_size_small, fontFamily: FONT_FAMILIY.Roboto_Regular
                    }}>
                        {item.discountPrice != undefined && item.discountPrice != '' ? translate('FROM_TEXT') + CURRENCY.RUPEES + item.discountPrice + '  ' : undefined}

                        {item.discountPrice && (item.price != 0 || item.amount) && (item.discount != undefined && item.discount != 0 || item[APP_PARAMS.OFF_IN_PER] != undefined && item[APP_PARAMS.OFF_IN_PER] != 0) &&
                            <Text style={{
                                marginHorizontal: 4, textDecorationLine: 'line-through',
                                color: colors.lightGrayText, fontSize: DIMENS.txt_size_small,
                                fontFamily: FONT_FAMILIY.Roboto_Regular
                            }} >{item.price != undefined && item.price != '' ? CURRENCY.RUPEES + item.price:item.amount&&CURRENCY.RUPEES + item.amount}
                            </Text>
                        }

                        {/* {item.discount && item.discount != '0' &&
                            <Text style={{
                                marginHorizontal: 4, color: colors.lightGreen,
                                fontSize: DIMENS.txt_size_small,
                                fontFamily: FONT_FAMILIY.Roboto_Regular
                            }} >{' ' + item.discount + translate('OFF')}
                            </Text>} */}
                    </Text>
                </View>

                <Text style={{
                    textAlign: 'center', color: colors.header,
                    fontSize: DIMENS.txt_size_medium,
                    fontFamily: FONT_FAMILIY.Roboto_Regular
                }}>
                    {item.name}</Text>
            </View>
        </Ripple>)
}
export const CommonItemListForCat = (props) => {
    const { item, onPress, style } = props;
    return (
        <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', paddingVertical: 10 }}>
            <View style={{ flex: .9, flexDirection: 'row' }}>
                <Image source={item.uri != undefined ? { uri: item.uri } : (item.uriRequire != undefined ? item.uriRequire : PERCENTAGE)}
                    style={{ resizeMode: 'contain', width: 18, height: 18, marginTop: 2 }} />
                <Text style={{ marginHorizontal: DIMENS.px_5, fontFamily: FONT_FAMILIY.Roboto_Regular, fontSize: DIMENS.txt_size_medium, color: colors.grayClr }}>{item.offer}</Text>
            </View>
            <Ripple onPress={onPress} style={{ marginRight: DIMENS.px_10 }}>
                <Image source={NEXT_GRAY} />
            </Ripple>

        </View>
    )
}
export const CommonColumnTextDetils = (props) => {
    const { item, style } = props;
    return (
        <View style={{ flex: 1, alignItems: 'center', flexDirection: 'row', paddingVertical: 4 }}>
            <Image source={BULLET} style={{ resizeMode: 'center', width: DIMENS.px_5, height: DIMENS.px_5, tintColor: colors.black }} />
            <Text style={{
                marginHorizontal: DIMENS.px_5, fontFamily: FONT_FAMILIY.Roboto_Regular,
                fontSize: DIMENS.txt_size_medium, color: colors.grayClr
            }}>{item}</Text>
        </View>
    )
}
export const CommonRatingReview = (props) => {
    const { item, style } = props
    return (
        <View style={{ flex: .5 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: DIMENS.txt_size_small_12, fontFamily: FONT_FAMILIY.Roboto_Medium, color: colors.black }}>{'5'}</Text>
                <Image source={STAR} style={{ tintColor: colors.orange, resizeMode: 'center', marginHorizontal: DIMENS.px_5 }} />
                <View style={{ height: DIMENS.px_10, flex: 1, flexDirection: 'row' }}>
                    <View style={{ height: DIMENS.px_10, backgroundColor: colors.green, flex: 4, borderTopLeftRadius: 2, borderBottomLeftRadius: 2 }} />
                    <View style={{ height: DIMENS.px_10, backgroundColor: colors.lightGraytransparent, flex: 1, borderTopRightRadius: 2, borderBottomRightRadius: 2 }} />
                </View>
                <Text style={{ marginLeft: DIMENS.px_5, fontSize: DIMENS.txt_size_small, fontFamily: FONT_FAMILIY.Roboto_Regular, color: colors.grayClr }}>{'4.6K'}</Text>
            </View>

            {/*Second*/}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: DIMENS.txt_size_small_12, fontFamily: FONT_FAMILIY.Roboto_Medium, color: colors.black }}>{'4'}</Text>
                <Image source={STAR} style={{ tintColor: colors.orange, resizeMode: 'center', marginHorizontal: DIMENS.px_5 }} />
                <View style={{ height: DIMENS.px_10, flex: 1, flexDirection: 'row', borderRadius: 2 }}>
                    <View style={{ height: DIMENS.px_10, backgroundColor: colors.green, flex: 2, borderTopLeftRadius: 2, borderBottomLeftRadius: 2 }} />
                    <View style={{ height: DIMENS.px_10, backgroundColor: colors.lightGraytransparent, flex: 3, borderTopRightRadius: 2, borderBottomRightRadius: 2 }} />
                </View>
                <Text style={{ marginLeft: DIMENS.px_5, fontSize: DIMENS.txt_size_small, fontFamily: FONT_FAMILIY.Roboto_Regular, color: colors.grayClr }}>{'3.6K'}</Text>
            </View>
            {/*Third*/}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: DIMENS.txt_size_small_12, fontFamily: FONT_FAMILIY.Roboto_Medium, color: colors.black }}>{'3'}</Text>
                <Image source={STAR} style={{ tintColor: colors.orange, resizeMode: 'center', marginHorizontal: DIMENS.px_5 }} />
                <View style={{ height: DIMENS.px_10, flex: 1, flexDirection: 'row', borderRadius: 2 }}>
                    <View style={{ height: DIMENS.px_10, backgroundColor: colors.green, flex: 3, borderTopLeftRadius: 2, borderBottomLeftRadius: 2 }} />
                    <View style={{ height: DIMENS.px_10, backgroundColor: colors.lightGraytransparent, flex: 2, borderTopRightRadius: 2, borderBottomRightRadius: 2 }} />
                </View>
                <Text style={{ marginLeft: DIMENS.px_5, fontSize: DIMENS.txt_size_small, fontFamily: FONT_FAMILIY.Roboto_Regular, color: colors.grayClr }}>{'3.6K'}</Text>
            </View>

            {/*Forth*/}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: DIMENS.txt_size_small_12, fontFamily: FONT_FAMILIY.Roboto_Medium, color: colors.black }}>{'2'}</Text>
                <Image source={STAR} style={{ tintColor: colors.orange, resizeMode: 'center', marginHorizontal: DIMENS.px_5 }} />
                <View style={{ height: DIMENS.px_10, flex: 1, flexDirection: 'row', borderRadius: 2 }}>
                    <View style={{ height: DIMENS.px_10, backgroundColor: colors.green, flex: 1, borderTopLeftRadius: 2, borderBottomLeftRadius: 2 }} />
                    <View style={{ height: DIMENS.px_10, backgroundColor: colors.lightGraytransparent, flex: 4, borderTopRightRadius: 2, borderBottomRightRadius: 2 }} />
                </View>
                <Text style={{ marginLeft: DIMENS.px_5, fontSize: DIMENS.txt_size_small, fontFamily: FONT_FAMILIY.Roboto_Regular, color: colors.grayClr }}>{'3.6K'}</Text>
            </View>
            {/*Five*/}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: DIMENS.txt_size_small_12, fontFamily: FONT_FAMILIY.Roboto_Medium, color: colors.black }}>{'1'}</Text>
                <Image source={STAR} style={{ tintColor: colors.orange, resizeMode: 'center', marginHorizontal: DIMENS.px_5 }} />
                <View style={{ height: DIMENS.px_10, flex: 1, flexDirection: 'row', borderRadius: 2 }}>
                    <View style={{ height: DIMENS.px_10, backgroundColor: colors.green, flex: 2, borderTopLeftRadius: 1, borderBottomLeftRadius: 2 }} />
                    <View style={{ height: DIMENS.px_10, backgroundColor: colors.lightGraytransparent, flex: 5, borderTopRightRadius: 2, borderBottomRightRadius: 2 }} />
                </View>
                <Text style={{ marginLeft: DIMENS.px_5, fontSize: DIMENS.txt_size_small, fontFamily: FONT_FAMILIY.Roboto_Regular, color: colors.grayClr }}>{'3.6K'}</Text>
            </View>

        </View>
    )
}
export const CommonSimmilarItem = (props) => {
    const { item, style, onPress } = props
    return (
        <Ripple style={[{ justifyContent: 'center', alignItems: 'center', borderColor: colors.lightGray, borderWidth: 0.5, paddingVertical: DIMENS.px_10 }, style, styles.productImgView]}
            onPress={onPress}>
            <View style={{ margin: 5, justifyContent: 'center', alignItems: 'center' }}>
                <View>
                    <CommonImage source={item.imageLocations != undefined && item.imageLocations != '' ? { uri: item.imageLocations } : PLACEHOLDER_PRODUCT_IMG}
                        styles={{
                            width: WIDTH * 40 / 100, height: 100, marginHorizontal: DIMENS.px_5
                                .px2, resizeMode: 'contain'
                        }} />
                    {
                        item[APP_PARAMS.IN_STOCK] != undefined && item[APP_PARAMS.IN_STOCK] == 0 &&

                        <View style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center', width: '100%', height: 100, }}>
                            <Text style={{ color: 'red', fontFamily: FONT_FAMILIY.Roboto_Medium, fontSize: DIMENS.txt_size_large_extra }}>
                                {translate('OUT_OF_STOCK')}</Text>
                        </View>
                    }
                </View>

                <Text numberOfLines={2} style={{ textAlign: 'center', color: colors.black, fontSize: DIMENS.txt_size_small_12, fontFamily: FONT_FAMILIY.Roboto_Regular, marginTop: 8 }}>
                    {item.name}</Text>
                {
                    item.rating != undefined &&
                    <View style={{ flexDirection: 'row', marginVertical: DIMENS.px_5, alignItems: 'center' }}>
                        <Text style={{ color: colors.green, fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                            {item.rating}</Text>
                        <Image source={STAR} style={{ width: DIMENS.px_8, height: DIMENS.px_8, marginHorizontal: DIMENS.px_2 }} />
                        <Text style={{ color: colors.lightGrayClr, fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                            {'(' + item.ratingCount + ')'}</Text>
                    </View>
                }
                <View style={{ flexDirection: 'row', alignItems: 'baseline', marginTop: DIMENS.px_3 }}>
                    <Text style={{ color: colors.black, fontSize: DIMENS.txt_size_medium_1, fontFamily: FONT_FAMILIY.Roboto_Medium }}>
                        {item.discountPrice != undefined && CURRENCY.RUPEES + item.discountPrice.toFixed(2)}</Text>
                    {
                        item.discount != undefined && item.discount != 0 ?
                            <Text style={{ marginLeft: DIMENS.px_8, textDecorationLine: 'line-through', color: colors.lightGrayClr, fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                                {CURRENCY.RUPEES + item.price.toFixed(2) + ' '}</Text> : null
                    }
                </View>
            </View>
        </Ripple>
    )
}
export const CommonInfoOrderProduct = (props) => {
    const { data, onPress } = props
    //  name, uri, rating, ratingCount, off, onPress, price, disPrice,
    return (
        <View style={{}}>
            <View style={{ flexDirection: 'row', paddingVertical: DIMENS.px_5, paddingHorizontal: DIMENS.px_10 }}>
                <CommonImage source={data[APP_PARAMS.IMG_URl] != undefined ? { uri: data[APP_PARAMS.IMG_URl] } : PLACEHOLDER_PRODUCT_IMG}
                    styles={{ width: WIDTH * 20 / 100, height: 100, flex: 0.25 }} />
                <View style={{ marginHorizontal: DIMENS.px_5, paddingLeft: DIMENS.px_15, flex: 0.75, marginTop: DIMENS.px_10 }}>
                    <Text style={{ color: colors.black, fontSize: DIMENS.txt_size_medium_14, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                        {data.name ? data.name : ''}</Text>
                    <Text style={{ color: colors.grayClrForTxt, fontSize: DIMENS.txt_size_medium_14, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                        {data[APP_PARAMS.SELLER_NAME] ? data[APP_PARAMS.SELLER_NAME] : ''}</Text>
                    {
                        data[APP_PARAMS.TOTAL_RATING] != undefined && data[APP_PARAMS.TOTAL_RATING] > 0 &&
                        <View style={{ flexDirection: 'row', marginVertical: DIMENS.px_5, alignItems: 'center' }}>
                            <Text style={{ color: colors.green, fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                                {rating}</Text>
                            <Image source={STAR} style={{ width: DIMENS.px_5, height: DIMENS.px_5, marginHorizontal: DIMENS.px_2 }} />
                            {
                                data[APP_PARAMS.TOTAL_RATING] != undefined &&
                                <Text style={{ color: colors.lightGrayClr, fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                                    {'(' + data[APP_PARAMS.TOTAL_RATING] + ')'}</Text>
                            }

                        </View>}
                    <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                        {data[APP_PARAMS.PAY_PRICE] != undefined &&

                            <Text style={{ color: colors.black, fontSize: DIMENS.txt_size_medium_1, fontFamily: FONT_FAMILIY.Roboto_Medium, marginTop: DIMENS.px_5 }}>
                                {CURRENCY.RUPEES + data[APP_PARAMS.PAY_PRICE].toFixed(2) + ""}</Text>}
                        {
                            data[APP_PARAMS.DISCOUNT] != undefined && data[APP_PARAMS.DISCOUNT] != 0 && data[APP_PARAMS.PRICE] &&
                            <Text style={{ marginLeft: DIMENS.px_8, marginTop: DIMENS.px_5, textDecorationLine: 'line-through', color: colors.lightGrayClr, fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                                {CURRENCY.RUPEES + data[APP_PARAMS.PRICE].toFixed(2) + ' '}</Text>
                        }


                    </View>

                    {
                        data[APP_PARAMS.OFF_IN_PER] != undefined && data[APP_PARAMS.OFF_IN_PER] > 0 &&
                        <Text style={{ marginVertical: DIMENS.px_5, color: colors.black, fontSize: DIMENS.txt, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                            {`${data[APP_PARAMS.OFF_IN_PER]}% ${translate('OFF')}`}</Text>
                        // translate('UPTO') + CURRENCY.RUPEES + off + ' ' + translate('OFF_EXCHANGE_TXT')
                    }
                </View>
            </View>

            <View style={{ backgroundColor: colors.lightGray, height: DIMENS.px_05, width: '100%', marginTop: DIMENS.px_15 }} />

        </View>
    )

}
export const CommonInfoProduct = (props) => {
    const { data, onPress } = props
    //  name, uri, rating, ratingCount, off, onPress, price, disPrice,
    return (
        <View style={{}}>
            <View style={{ flexDirection: 'row', paddingVertical: DIMENS.px_5, paddingHorizontal: DIMENS.px_10 }}>
                <CommonImage source={data[APP_PARAMS.IMG_LOC] != undefined && data[APP_PARAMS.IMG_LOC] != ""  ? { uri: data[APP_PARAMS.IMG_LOC] } : PLACEHOLDER_PRODUCT_IMG}
                    styles={{ width: WIDTH * 20 / 100, height: 100, flex: 0.25 }} />
                <View style={{ marginHorizontal: DIMENS.px_5, paddingLeft: DIMENS.px_15, flex: 0.75, marginTop: DIMENS.px_10 }}>
                    <Text style={{ color: colors.black, fontSize: DIMENS.txt_size_medium_14, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                        {data.name ? data.name : ''}</Text>
                    {
                        data[APP_PARAMS.TOTAL_RATING] != undefined && data[APP_PARAMS.TOTAL_RATING] > 0 &&
                        <View style={{ flexDirection: 'row', marginVertical: DIMENS.px_5, alignItems: 'center' }}>
                           {/* { 
                           rating!=undefined&&<Text style={{ color: colors.green, fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                                {rating&&rating}</Text>} */}
                            <Image source={STAR} style={{ width: DIMENS.px_5, height: DIMENS.px_5, marginHorizontal: DIMENS.px_2 }} />
                            {
                                data[APP_PARAMS.TOTAL_RATING] != undefined &&
                                <Text style={{ color: colors.lightGrayClr, fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                                    {'(' + data[APP_PARAMS.TOTAL_RATING] + ')'}</Text>
                            }

                        </View>}
                    <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                        {data[APP_PARAMS.DISCOUNT_PRICE] != undefined &&

                            <Text style={{ color: colors.black, fontSize: DIMENS.txt_size_medium_1, fontFamily: FONT_FAMILIY.Roboto_Medium, marginTop: DIMENS.px_5 }}>
                                {CURRENCY.RUPEES + data[APP_PARAMS.DISCOUNT_PRICE].toFixed(2) + ""}</Text>}
                        {
                            data[APP_PARAMS.DISCOUNT] != undefined && data[APP_PARAMS.DISCOUNT] != 0 && data[APP_PARAMS.PRICE] &&
                            <Text style={{ marginLeft: DIMENS.px_8, marginTop: DIMENS.px_5, textDecorationLine: 'line-through', color: colors.lightGrayClr, fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                                {CURRENCY.RUPEES + data[APP_PARAMS.PRICE].toFixed(2) + ' '}</Text>
                        }
                        {
                            data[APP_PARAMS.DISCOUNT] != undefined && data[APP_PARAMS.DISCOUNT] != 0  &&
                            <Text style={{ marginLeft: DIMENS.px_5,  color: colors.green, fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular,fontWeight:'500' }}>
                             {data[APP_PARAMS.DISCOUNT] + '% ' + translate('OFF')}</Text>
                        }

                    </View>

                    {
                        data[APP_PARAMS.OFF_IN_PER] != undefined && data[APP_PARAMS.OFF_IN_PER] > 0 &&
                        <Text style={{ marginVertical: DIMENS.px_5, color: colors.black, fontSize: DIMENS.txt, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                            {`${data[APP_PARAMS.OFF_IN_PER]}% ${translate('OFF')}`}</Text>
                        // translate('UPTO') + CURRENCY.RUPEES + off + ' ' + translate('OFF_EXCHANGE_TXT')
                    }
                </View>
            </View>

            <View style={{ backgroundColor: colors.lightGrayText, height: DIMENS.px_05, width: '100%', marginTop: DIMENS.px_15 }} />

        </View>
    )

}
export const CommonBillingView = (props) => {
    let dataOffer = []
    const { price, deliveryCharge, amountPayablePrice, sellingPrice, extraPrice,
        specialPrice, offer, dataOfferArr, data, priceDetailTxtProps, priceDetailColor, paymentMode, orderSummary } = props
    dataOffer = dataOfferArr
    return (
        <View style={{ borderBottomColor: colors.lightGraytransparent, borderBottomWidth: DIMENS.px_5, width: '100%' }}>
            <View style={{ paddingHorizontal: DIMENS.px_5 }}>
                <View style={{
                    borderBottomWidth: DIMENS.px_05, borderBottomColor: colors.lightGraytransparent, width: '100%',
                   paddingVertical: !orderSummary ? DIMENS.px_10 : undefined//  paddingHorizontal: DIMENS.px_5,
                }}>
                    <Text style={[{ color: priceDetailColor != undefined ? priceDetailColor : colors.black, fontSize: DIMENS.txt_size_medium_1, fontFamily: FONT_FAMILIY.Roboto_Medium }, priceDetailTxtProps]}>
                        {translate('PRICE_DETAIL')} </Text>
                </View>
                <View style={{ paddingHorizontal: DIMENS.px_10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: DIMENS.px_10, paddingBottom: DIMENS.px_5 }}>
                        <Text style={{ color: colors.black, fontSize: DIMENS.txt_size_medium_1, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                            {`${translate('PRICE')} ( ${data.qty} Product)`}</Text>
                        <Text style={{ color: colors.grayClr, fontSize: DIMENS.txt_size_medium_1, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                            {CURRENCY.RUPEES + data.price + ''}</Text>
                    </View>
                    {
                        data.discount!=undefined&&data.discount!=0&&
                    
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: DIMENS.px_10, paddingBottom: DIMENS.px_5 }}>
                        <Text style={{ color: colors.black, fontSize: DIMENS.txt_size_medium_1, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                            {`${translate('DISCOUNT')} `}</Text>
                        <Text style={{ color: colors.green, fontSize: DIMENS.txt_size_medium_1, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                            { data.discount + '% ' + translate('OFF')}</Text>
                    </View>
}
                    {
                        sellingPrice &&
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: DIMENS.px_5 }}>
                            <Text style={{ color: colors.black, fontSize: DIMENS.txt_size_medium_1, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                                {translate('SELLING_PRICE')}</Text>
                            <Text style={{ color: colors.green, fontSize: DIMENS.txt_size_medium_1, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                                {CURRENCY.RUPEES + sellingPrice}</Text>
                        </View>
                    }
                    {
                        extraPrice &&
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: DIMENS.px_5 }}>
                            <Text style={{ color: colors.black, fontSize: DIMENS.txt_size_medium_1, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                                {translate('EXTRA_PRICE')}</Text>
                            <Text style={{ color: colors.green, fontSize: DIMENS.txt_size_medium_1, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                                {CURRENCY.RUPEES + extraPrice}</Text>
                        </View>
                    }
                    {
                        specialPrice &&
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: DIMENS.px_5 }}>
                            <Text style={{ color: colors.black, fontSize: DIMENS.txt_size_medium_1, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                                {translate('SPECIAL_PRICE')}</Text>
                            <Text style={{ color: colors.green, fontSize: DIMENS.txt_size_medium_1, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                                {CURRENCY.RUPEES + extraPrice}</Text>
                        </View>
                    }
                    {
                        data.deliveryCharge!=undefined &&
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: DIMENS.px_5 }}>
                            <Text style={{ color: colors.black, fontSize: DIMENS.txt_size_medium_1, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                                {translate('DELIVERY')}</Text>
                            <Text style={{ color: colors.grayClr, fontSize: DIMENS.txt_size_medium_1, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                                {data.deliveryCharge != 0.0 ? data.deliveryCharge + '' : translate('FREE')}</Text>
                        </View>
                    }
                    <View style={{ width: '100%', backgroundColor: colors.lightGraytransparent, height: DIMENS.px_05, marginVertical: DIMENS.px_10, }} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: DIMENS.px_05, paddingBottom: DIMENS.px_15 }}>
                        <Text style={{ color: colors.black, fontSize: DIMENS.txt_size_medium_1, fontFamily: FONT_FAMILIY.Roboto_Medium }}>
                            {translate('AMOUNT_PAYABLE')}</Text>
                        <Text style={{ color: colors.grayClr, fontSize: DIMENS.txt_size_medium_1, fontFamily: FONT_FAMILIY.Roboto_Medium }}>
                            {CURRENCY.RUPEES + data.amountPayablePrice + ''}</Text>
                    </View>

                </View>
                <View style={{ width: '100%', backgroundColor: colors.lightGraytransparent, height: DIMENS.px_05 }} />


                {/*Offer*/}
                {
                    offer &&
                    <View style={{ paddingHorizontal: DIMENS.px_10, paddingVertical: DIMENS.px_20 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={PERCENTAGE} style={{ width: DIMENS.px_20, height: DIMENS.px_20 }} />
                            <Text style={{ marginHorizontal: DIMENS.px_10, color: colors.black, fontSize: DIMENS.txt_size_medium_1, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                                {offer}</Text>
                        </View>

                        {dataOffer &&
                            dataOffer.map(item => {
                                return (
                                    <View style={{ paddingHorizontal: DIMENS.px_20 + DIMENS.px_10, paddingTop: DIMENS.px_20, paddingBottom: DIMENS.px_5 }}>
                                        <Text style={{ color: colors.black, fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                                            {item}</Text>
                                    </View>
                                )
                            })
                        }
                    </View>
                }
            </View>
            {
                data.savePrice != undefined && data.savePrice != 0.0 &&
                <View style={{ borderBottomColor: colors.lightGraytransparent, borderBottomWidth: DIMENS.px_05, paddingVertical: DIMENS.px_10, paddingHorizontal: DIMENS.px_10 }}>
                    {/* {
                    data.savePrice != undefined && data.savePrice != 0.0 && */}
                    <Text style={{ color: colors.green, fontSize: DIMENS.txt_size_medium_1, fontFamily: FONT_FAMILIY.Roboto_Medium }}>
                        {`${translate('SAVE_TEXT_ON_ORDER')} ${CURRENCY.RUPEES}${data.savePrice} ${translate('ON_ORDER')}`}</Text>
                    {/* } */}
                </View>
            }
            {
                paymentMode != undefined &&
                <Text style={{ paddingHorizontal: DIMENS.px_15, paddingVertical: DIMENS.px_10, color: colors.black, fontSize: DIMENS.txt_size_medium_1, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                    {`Payment Mode : ${paymentMode}`}</Text>
            }

        </View>
    )
}
export const CommonNotification = (props) => {
    const { item } = props
    return (
        <View style={{ flex: 1, borderBottomColor: colors.lightGrayText, borderBottomWidth: DIMENS.px_05, paddingVertical: DIMENS.px_15, paddingLeft: DIMENS.px_10, }}>
            <View style={{ flexDirection: 'row' }}>
                <Image source={item.uri} style={{ width: WIDTH * 20 / 100, height: 100 }} resizeMode={'contain'} />
                <View style={{ flex: 1, marginHorizontal: 10 }}>
                    <Text style={{
                        color: colors.black, fontSize: DIMENS.txt_size_medium_14,
                        fontFamily: FONT_FAMILIY.Roboto_Regular,
                    }}>{item.orderStatus}</Text>
                    <Text style={{ color: colors.lightGrayClr, fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                        {item.status1}</Text>
                    <Text style={{ color: colors.lightGrayClr, fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                        {item.status1}</Text>
                    <Text style={{ color: colors.lightGrayClr, fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                        {item.status1}</Text>
                    {
                        item.time != undefined &&
                        <Text style={{
                            marginVertical: DIMENS.px_5, color: colors.lightGrayClr, fontSize: DIMENS.txt, fontFamily:
                                FONT_FAMILIY.Roboto_Regular
                        }}>
                            {item.time}</Text>
                    }
                </View>
            </View>
        </View>
    )

}
export const CommonMyOrder = (props) => {
    const { itemData,isFrom, onPress,onPressNotifictionAdmin } = props
    return (
        <View style={{ flex: 1, borderBottomColor: colors.lightGraytransparent, borderBottomWidth: DIMENS.px_5, paddingBottom: DIMENS.px_10 }}//paddingVertical:DIMENS.px_10,paddingLeft: DIMENS.px_10,
        >
            {
                itemData[APP_PARAMS.ORDER_NUMBER]!=undefined&&
                <Text
                style={{ color: colors.black, fontSize: DIMENS.px_12, padding: 10, borderBottomColor: colors.lightGraytransparent, borderBottomWidth: DIMENS.px_1, fontFamily: FONT_FAMILIY.Roboto_Bold }}>
                {`${translate('ORDER_ID_TXT')} - ${itemData[APP_PARAMS.ORDER_NUMBER]}`}</Text>}
            {
            // itemData.type=='order'|| isFrom=='notification'&&                                                                                                                                               
                itemData[APP_PARAMS.BEAN_ORDER_PRODUCT] != undefined && itemData[APP_PARAMS.BEAN_ORDER_PRODUCT].length > 0 &&
                itemData[APP_PARAMS.BEAN_ORDER_PRODUCT].map((item, index) => {
                    console.log("order staus:-",item.orderStatus);

                    return (
                        <Ripple style={{
                            paddingHorizontal: DIMENS.px_10, flexDirection: 'row', marginTop: DIMENS.px_10, borderBottomColor: index != itemData[APP_PARAMS.BEAN_ORDER_PRODUCT].length - 1 ? colors.lightGraytransparent : colors.transparent,
                            borderBottomWidth: index != itemData[APP_PARAMS.BEAN_ORDER_PRODUCT].length - 1 ? DIMENS.px_2 : 0,paddingBottom:index != itemData[APP_PARAMS.BEAN_ORDER_PRODUCT].length - 1 ?8:undefined
                        }} onPress={() => onPress(item, index)}>
                            <Image source={item.imageUrl != undefined && item.imageUrl != '' ? { uri: item.imageUrl } : PLACEHOLDER_PRODUCT_IMG} style={{ width: WIDTH * 20 / 100, height: 70 }} resizeMode={'contain'} />
                            <View style={{ flex: 1, marginLeft: DIMENS.px_10, marginRight: DIMENS.px_5, marginTop: DIMENS.px_5 }}>
                                <Text style={{
                                    color: colors.black, fontSize: DIMENS.txt_size_medium_14,
                                    fontFamily: FONT_FAMILIY.Roboto_Regular,
                                }} numberOfLines={2}>{item.name}</Text>
                                {
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: DIMENS.px_5, marginRight: DIMENS.px_10 }}>
                                        <Image source={GREENCIRCLE} style={{ width: 12, height: 12, marginRight: DIMENS.px_5, tintColor: item.status == 'delivered' ? colors.green : 'red' }} resizeMode={'contain'} />
                                        <Text style={{ color: colors.lightGrayClr, fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                                            {item.orderStatus}</Text>

                                    </View>
                                }
                                {/* <Text style={{ color: colors.lightGrayClr, fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                                    {item.orderStatus!=CONST.ORDER_CANCEL&&item.orderStatus != [APP_PARAMS.ORDER_STATUS_DELIVERED] ? translate('ORDER_WILL_DELIVER') + Utils.getTimeFromTimeStamp(item[APP_PARAMS.DELIVERY_TIME], 'DD MMM, dddd') :
                                        translate('ORDER_DELIVERED') + Utils.getTimeFromTimeStamp(item[APP_PARAMS.DELIVERY_TIME], 'DD MMM, dddd')}</Text> */}

                            </View>
                        </Ripple>
                    )
                })
            }
            {
                itemData.type=='from_admin'&&
                 <Ripple style={{
                     flexDirection:'row', paddingHorizontal: DIMENS.px_10, marginTop: DIMENS.px_10,
                }} 
                onPress={()=>onPressNotifictionAdmin()}
                >
                    <Image source={itemData.imageUrl != undefined && itemData.imageUrl != '' ? { uri: itemData.imageUrl } : PLACEHOLDER_PRODUCT_IMG} style={{ width: WIDTH * 20 / 100, height: 70 }} resizeMode={'contain'} />
                    <View style={{ flex: 1, marginLeft: DIMENS.px_10, marginRight: DIMENS.px_5, marginTop: DIMENS.px_5 }}>
                        <Text style={{
                            color: colors.black, fontSize: DIMENS.txt_size_medium_14,
                            fontFamily: FONT_FAMILIY.Roboto_Regular,
                        }}
                         >
                             {itemData.title}</Text>
                        {
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: DIMENS.px_5, marginRight: DIMENS.px_10 }}>
                                <Text style={{ color: colors.lightGrayClr, fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                                    {itemData.body}</Text>
                            </View>
                        }
                    </View>
                </Ripple>
            }
        </View>
    )

}
export const CommonViewAllItem = (props) => {
    const { item, style, onPress, compareClk } = props
    return (
        <View style={[{ borderColor: colors.lightGray, borderWidth: 0.5, paddingVertical: DIMENS.px_10 }, style,]}>
            <Ripple //style={[{ borderColor: colors.lightGray, borderWidth: 0.5, paddingVertical: DIMENS.px_10 ,flex:1}, style,]}
                onPress={onPress}>
                <View style={{ margin: 3, justifyContent: 'center', alignItems: 'center', }}>
                    <CommonImage source={item.imageLocations != undefined && item.imageLocations != '' ? { uri: item.imageLocations } :
                        PLACEHOLDER_PRODUCT_IMG}
                        styles={{
                            width: WIDTH * 41 / 100, height: 100, resizeMode: 'contain',
                        }} />
                   
                </View>
                <View style={{ paddingLeft: DIMENS.px_12, paddingRight: DIMENS.px_5, marginTop: DIMENS.px_5 }}>
                    <Text numberOfLines={3}
                        style={{
                            marginBottom: DIMENS.px_3, textAlign: 'left', color: colors.black,
                            fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular,
                        }}>{item.name}</Text>
                    {
                        item.rating != undefined &&
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: DIMENS.px_3, }}>
                            <Text style={{ textAlign: 'left', color: colors.green, fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                                {item.rating}</Text>
                            <Image source={STAR} style={{ width: DIMENS.px_8, height: DIMENS.px_8, marginHorizontal: DIMENS.px_2 }} />

                            <Text style={{ color: colors.lightGrayClr, fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                                {'(' + item.ratingCount + ')'}</Text>
                        </View>
                    }
                    {
                        item.shortDescription ?
                            <Text style={{
                                marginBottom: DIMENS.px_3, color: colors.grayClrForTxt,
                                fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular
                            }}
                                numberOfLines={1}>
                                {Utils.convertHtmlToText(item.shortDescription)}</Text> : null
                    }

                    <View style={{ flexDirection: 'row', width: '100%', flexWrap: 'wrap', alignItems: 'center' }}>
                        {
                            item.discountPrice!=undefined&&item.discountPrice!=0&&
                        <Text style={{ textAlign: 'left', color: colors.black, fontSize: DIMENS.txt_size_medium_14, fontFamily: FONT_FAMILIY.Roboto_Medium }}>
                            {CURRENCY.RUPEES + item.discountPrice.toFixed(2) + ''}</Text>
}

                        {
                           ( item.discount != undefined && item.discount > 0 ||  item[APP_PARAMS.OFF_IN_PER]!=undefined && item[APP_PARAMS.OFF_IN_PER] != null && item[APP_PARAMS.OFF_IN_PER]!= '' && item[APP_PARAMS.OFF_IN_PER] != 0 ) &&item.price!=undefined&&item.price!=0&&
                            <Text style={{
                                marginHorizontal: DIMENS.px_3,
                                textDecorationLine: 'line-through', color: colors.lightGrayText,
                                fontSize: DIMENS.txt_size_small_12, fontFamily: FONT_FAMILIY.Roboto_Regular
                            }}>
                                {CURRENCY.RUPEES + item.price.toFixed(2) + ''}</Text>
                        }
                        {
                            item.discount && item.discount != null && item.discount != '' && item.discount != 0 ?
                                <Text
                                    numberOfLines={1}
                                    style={{
                                        color: colors.green,
                                        fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular
                                    }}>
                                    {`  ${item.discount}% ${translate('OFF')}`}</Text> : null
                        }
                        {
                            item[APP_PARAMS.OFF_IN_PER]!=undefined && item[APP_PARAMS.OFF_IN_PER] != null && item[APP_PARAMS.OFF_IN_PER]!= '' && item[APP_PARAMS.OFF_IN_PER] != 0 &&
                           ( item.discount!=undefined &&  item.discount == 0.0 )

                            ?
                                <Text
                                    numberOfLines={1}
                                    style={{
                                        color: colors.green,
                                        fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular
                                    }}>
                                    {`  ${item[APP_PARAMS.OFF_IN_PER]}% ${translate('OFF')}`}</Text> : null
                        }
                    </View>
               
                    {
                            item[APP_PARAMS.OFF_IN_PER]!=undefined && item[APP_PARAMS.OFF_IN_PER] != null && item[APP_PARAMS.OFF_IN_PER]!= '' && item[APP_PARAMS.OFF_IN_PER] != 0 &&  ( item.discount &&  item.discount != 0 ) ?

                                <Text
                                    numberOfLines={1}
                                    style={{
                                        color: colors.green,
                                        fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular
                                    }}> 
                                    {`${translate('UPTO')} ${item[APP_PARAMS.OFF_IN_PER]}% ${translate('OFF')}`}</Text> : null
                        }
                </View>
            </Ripple>
            {
                (item[APP_PARAMS.COMPARABLE] != undefined && item[APP_PARAMS.COMPARABLE] != '') ?
                    <View style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center', width: '100%', height: 120 }}>
                        <Ripple style={{
                            position: 'absolute', justifyContent: 'center', alignItems: 'center', width: '80%',
                            backgroundColor: item[APP_PARAMS.COMPARABLE] == translate('COMPARE') ? colors.white : colors.primary
                        }}
                            onPress={compareClk}>
                            <Text style={{
                                color: item[APP_PARAMS.COMPARABLE] == translate('COMPARE') ? colors.primary : colors.white,
                                fontFamily: FONT_FAMILIY.Roboto_Medium, fontSize: DIMENS.txt_size_small_12,
                                paddingVertical: DIMENS.px_5, borderRadius: DIMENS.px_3
                            }}>
                                {item[APP_PARAMS.COMPARABLE]}</Text>
                        </Ripple>
                    </View> :
                    item[APP_PARAMS.IN_STOCK] != undefined && item[APP_PARAMS.IN_STOCK] == 0 &&

                    <View style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center', width: '100%', height: 120, }}>
                        <Text style={{ color: 'red', fontFamily: FONT_FAMILIY.Roboto_Medium, fontSize: DIMENS.txt_size_large_extra }}>
                            {translate('OUT_OF_STOCK')}</Text>
                    </View>
            }

        </View>
    )
}
export const CommonALlOffer = (props) => {
    const { item, style, onPress } = props
    return (
        <Ripple style={[{ justifyContent: 'center', alignItems: 'center', borderColor: colors.lightGray, borderWidth: 0.5 }, style,]}//styles.productImgView
            onPress={onPress}>
            <View style={{ margin: 5, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={item.imageLocations != undefined && item.imageLocations != '' ? { uri: item.imageLocations } : SHOP_CART} style={{
                    width: WIDTH * 40 / 100, height: 100, marginHorizontal: DIMENS.px_5
                        .px2, resizeMode: 'contain',
                    tintColor: item.imageLocations == undefined || item.imageLocations == '' && colors.lightGrayText
                }}
                />
                <Text style={{ marginTop: DIMENS.px_10, textAlign: 'center', color: colors.Blue, marginBottom: DIMENS.px_3, fontSize: DIMENS.txt_size_small, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                    {item.amount != undefined && item.amount != '' && translate('FROM_TEXT') + CURRENCY.RUPEES + item.amount}</Text>
                <Text style={{ textAlign: 'center', color: colors.header, fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                    {item.name}</Text>
            </View>
        </Ripple>
    )
}
