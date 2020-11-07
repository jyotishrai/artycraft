import React from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import { SHOP_CART, MENU, NOTIFICATION ,ORDER} from '../images'
import Ripple from 'react-native-material-ripple'

import { colors } from '../theme'
import { DIMENS,WIDTH,HEIGHT, FONT_FAMILIY } from '../constants'
import translate from '../i18n/i18n'
import Basecomponents from './BaseComponent'

export const CommonEmptyView = (props) => {
    return (
        <View style={[styles.container,props.containerStyle]}>
            <View style={styles.imgView}>
                <Image source={props.image} />
            </View>
            <Text style={styles.titl}>{props.title}</Text>
           {props.subtitle&& <Text style={styles.subTitl}>{props.subtitle}</Text>}
           {
                props.btntext1&&<Ripple  style={styles.btn}
                onPress={props.onPress1} >
                <Text style={styles.btnTxt}>{props.btntext1}</Text>
            </Ripple>}
            {
                props.btntext2&&
                <Ripple  style={[styles.btn,{backgroundColor:colors.transparent,flexDirection:'row',alignItems:'center'}]}
                onPress={props.onPress2}>
                <Text style={[styles.btnTxt,{color:colors.primary,marginRight:DIMENS.px_5,fontFamily:FONT_FAMILIY.Roboto_Regular}]}>{props.btntext2}</Text>
                {props.btntextImg2&&
                <Image source={props.btntextImg2} style={{tintColor:colors.primary}} />}
            </Ripple>}

        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
       // padding: DIMENS.px_20,
    },
    titl: {
        fontSize: DIMENS.txt_size_large,
        fontWeight: 'bold',
        marginVertical: DIMENS.px_15
    },
    subTitl: {
        fontSize: DIMENS.txt_size_medium_14,
        marginBottom: DIMENS.px_15,
        textAlign: 'center',
        paddingHorizontal:DIMENS.px_10
    },
    imgView: {
       // height: WIDTH * 0.5,
      //  width: WIDTH * 0.5,
       // borderRadius: WIDTH * 0.25,
       // margin: DIMENS.px_30
    },
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
        paddingVertical: DIMENS.px_10,
        paddingHorizontal: DIMENS.px_30,
        borderRadius: DIMENS.px_5,
        marginTop: DIMENS.px_10
    },
    btnTxt: {
        fontSize: DIMENS.txt_size_medium_14,
       // fontWeight: 'bold',
        fontFamily:FONT_FAMILIY.Roboto_Bold,
        color: colors.white
    }


});