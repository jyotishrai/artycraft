import React from 'react'
import { Image, TouchableOpacity, View, Text, FlatList } from 'react-native'
import { SHOP_CART, MENU, NOTIFICATION, ORDER, STAR, DELETE } from '../images'
import styles from '../components/Auth/styles'
import Ripple from 'react-native-material-ripple'

import { FONT_FAMILIY, WIDTH, CURRENCY, DIMENS } from '../constants/index'
import { colors } from '../theme'
import translate from '../i18n/i18n'
import Basecomponents from './BaseComponent'

export default class CommonProductList extends Basecomponents {
    constructor(props) {
        super(props)
    }
    renderItem = (item, index) => {
        return (
            <View>
                <Ripple style={{ paddingHorizontal: 15, paddingVertical: 5 }}>
                    <Text style={{ borderColor: colors.lightGrayText, borderWidth: DIMENS.px_05, padding: 5 }}>{item}</Text>
                </Ripple>
            </View>
        )
    }
    render() {
        const { data, item, onPress, isShowDescriptn, isDelte, deletePress } = this.props
        return (
            <View>
                <Ripple style={{ flex: 1,paddingVertical:DIMENS.px_5}}
                    onPress={onPress} >
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <View style={{ alignItems: 'center', flexDirection: 'row', flex: isDelte ? .9 : 1,  paddingHorizontal: DIMENS.px_5}}>
                            <Image source={item.imageLocations&&item.imageLocations!=''?{uri:item.imageLocations}:SHOP_CART}
                             style={{ width: WIDTH * 20 / 100, height: 70,
                                tintColor:item.imageLocations&&item.imageLocations!=''?undefined:colors.lightGraytransparent,resizeMode:'contain' }} 
                                 />
                            <View style={{ justifyContent: 'center', paddingHorizontal: 15,flex: isDelte ? .95 : 1,}}>
                                <Text style={{
                                    color: colors.black, fontSize: DIMENS.txt_size_medium_14,
                                    fontFamily: FONT_FAMILIY.Roboto_Regular,marginTop:DIMENS.px_5
                                }}
                                numberOfLines={2}>
                                    
                                    {item.name}</Text>
                                    { item.productVarinats != undefined &&
                                <Text style={{color: colors.grayClrForTxt, fontSize: DIMENS.txt_size_small_12, fontFamily: FONT_FAMILIY.Roboto_Regular,marginVertical:DIMENS.px_2 }}>
                                    {item.productVarinats}</Text>}
                                {
                                    item.ratting != undefined &&
                                    <View style={{ flexDirection: 'row', marginVertical: DIMENS.px_5, alignItems: 'center' }}>
                                        <Text style={{ color: colors.green, fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                                            {item.ratting}</Text>
                                        <Image source={STAR} style={{ width: DIMENS.px_5, height: DIMENS.px_5, marginHorizontal: DIMENS.px_2 }} />
                                        <Text style={{ color: colors.lightGrayClr, fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                                            {'(' + item.rattingCount + ')'}</Text>
                                    </View>
                                    }
                                <View style={{ flexDirection: 'row', alignItems: 'baseline', }}>
                                    <Text style={{ color: colors.black, fontSize: DIMENS.txt_size_medium_1, fontFamily: FONT_FAMILIY.Roboto_Medium }}>
                                        {item.discountPrice!=undefined?CURRENCY.RUPEES + item.discountPrice:CURRENCY.RUPEES + item.price}</Text>
                                    {
                                        item.discountPrice!=undefined&& item.price!=undefined && item.discount !=undefined && item.discount != 0 &&
                                        <Text style={{ marginLeft: DIMENS.px_8, textDecorationLine: 'line-through', color: colors.lightGrayClr, fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                                            {CURRENCY.RUPEES + item.price + ' '}</Text>
                                    }


                                </View>

                                {
                                    item.off != undefined &&
                                    <Text style={{ marginVertical: DIMENS.px_5, color: colors.black, fontSize: DIMENS.txt, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                                        {translate('UPTO') + CURRENCY.RUPEES + item.off + ' ' + translate('OFF_EXCHANGE_TXT')}</Text>
                                }
                            </View>
                        </View>

                    </View>
                    {
                        isShowDescriptn == undefined && !isShowDescriptn &&

                        <View style={{}}>
                            <FlatList
                                numColumns={2}
                                data={data}
                                renderItem={({ item, index }) => this.renderItem(item, index)}
                                extraData={this.state}
                                keyExtractor={(item, index) => index.toString()} />
                        </View>
                    }
                    <View style={{ backgroundColor: colors.lightGrayText, height: DIMENS.px_05, width: '100%', marginTop: DIMENS.px_10 }} />

                </Ripple>
                {
                    isDelte != undefined && isDelte &&
                    <Ripple style={{
                        flex: .1, paddingVertical: 20, position: 'absolute',
                        right: 10, width: 30, height: 50, 
                    }} onPress={deletePress}>
                        <Image source={DELETE} style={{ width: 30, height: 20,tintColor:colors.primary }} resizeMode={'contain'} />
                    </Ripple>
                }
            </View>
        )
    }
}
