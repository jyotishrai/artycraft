import React from 'react'
import { Image, TouchableOpacity, View, Text } from 'react-native'
import { HEADERLOGO, MENU, NOTIFICATION ,ORDER, HEART} from '../images'
import styles from '../components/Auth/styles'
import Ripple from 'react-native-material-ripple'

import { colors } from '../theme'
import { DIMENS, KEY } from '../constants'

export default ({ menuPress,notificationPress,cartPress,cartCount,wishlistPress,wishCount,notificationCount}) => (
    <View style={{
        backgroundColor: colors.header,
        paddingHorizontal: 10,
        justifyContent: 'center',
        //paddingVertical: 5,
        height: global.HeaderHeight != undefined ? global.HeaderHeight : 60
    }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between',alignItems:'center' }}>
            <View style={{ flexDirection: 'row', flex: .7,alignItems:'center' }}>
                <Ripple onPress={menuPress} style={{}}>
                    <Image source={MENU} style={{ height: DIMENS.px_25, width: DIMENS.px_25, resizeMode: 'contain' }} />
                </Ripple>
                {/* LOGO*/}
                <Image source={HEADERLOGO} style={styles.headerHomeLogo} />

            </View>
            <View style={{ flexDirection: 'row', flex: .25, justifyContent: 'space-evenly',alignItems:'center' }}>
                {/* Notification*/}
               { 
               notificationCount!=undefined&&notificationCount!=0&&
               <Ripple onPress={notificationPress} style={{flexDirection:'row'}}>
                    <Image source={NOTIFICATION} style={{ height:DIMENS.px_20, width: DIMENS.px_20, resizeMode: 'contain' }} />
                    <View style={{justifyContent:'center',alignItems:'center',backgroundColor:colors.notifyClr,borderRadius:11,marginTop:-8,marginLeft:-10,height:DIMENS.px_22, width: DIMENS.px_22,}}>
                    <Text style={{textAlign:'center',height:DIMENS.px_20, width: DIMENS.px_20,color:colors.white }} >
                     {notificationCount}
                    </Text>
                    </View>
               </Ripple>}
               {/* wishlist */}
               {
              
               <Ripple onPress={wishlistPress} style={{flexDirection:'row',marginLeft: DIMENS.px_5}}>
                    <Image source={HEART} style={{ height: DIMENS.px_20, width: DIMENS.px_20, resizeMode: 'contain',marginLeft: DIMENS.px_10 }} />
                 {
                  wishCount != undefined && wishCount > 0 &&
                  <View style={{justifyContent:'center',alignItems:'center',backgroundColor:colors.notifyClr,borderRadius:11,marginTop:-8,marginLeft:-10,height:DIMENS.px_22, width: DIMENS.px_22,}}>
                    <Text style={{textAlign:'center',height:DIMENS.px_20, width: DIMENS.px_20,color:colors.white }} >
                     {wishCount}
                    </Text>
                    </View>
                    }
                </Ripple>}
                {/* Cart*/}
                <Ripple onPress={cartPress} style={{flexDirection:'row'}}>
                    <Image source={ORDER} style={{ height: DIMENS.px_22, width: DIMENS.px_22, resizeMode: 'contain', marginLeft: DIMENS.px_10 }} />
                   
                   {
                        cartCount !=undefined && cartCount > 0 &&
                       <View style={{justifyContent:'center',alignItems:'center',backgroundColor:colors.notifyClr,borderRadius:11,marginTop:-8,marginLeft:-10,height:DIMENS.px_22, width: DIMENS.px_22,}}>
                    <Text style={{textAlign:'center',height:DIMENS.px_20, width: DIMENS.px_20,color:colors.white }} >
                     { global[KEY.CART_COUNT]}
                    </Text>
                    </View>
                   } 
                </Ripple>
            </View>
        </View>

    </View>
)