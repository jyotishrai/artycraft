import React from 'react'
import { Image, TouchableOpacity, View, Text } from 'react-native'
import { SHOP_CART, MENU, NOTIFICATION, SEARCH } from '../images'
import styles from '../components/Auth/styles'
import Ripple from 'react-native-material-ripple'
import translate from '../i18n/i18n';


import { colors } from '../theme'
import { DIMENS, FONT_FAMILIY } from '../constants'


export default ({ onSearchPress, textHeader, alignItems, imageSource, height, justifyContent, text, }) => (
    <View style={{
        backgroundColor: colors.header,
        paddingHorizontal: DIMENS.px_10,
        paddingTop: 5,
        paddingBottom:DIMENS.px_15
    }}>
        
        <Ripple style={{ flexDirection: 'row',backgroundColor:colors.white,paddingVertical:DIMENS.px_10,alignItems:'center', borderRadius:2}} onPress={onSearchPress}>
            <Image source={SEARCH} style={{marginLeft:DIMENS.px_10,marginRight:DIMENS.px_5 ,height: DIMENS.px_12, width: DIMENS.px_12, resizeMode: 'contain' }} />
            <Text style={{color:colors.lightGrayClr,fontSize:DIMENS.px_12,fontFamily:FONT_FAMILIY.Roboto_Regular}}>{translate('PLACEHOLDER_SEARCH_PORODUCT')}</Text>
        </Ripple>
    </View>
)