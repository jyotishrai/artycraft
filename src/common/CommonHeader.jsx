import React from 'react'
import { Image, TouchableOpacity,View,Text } from 'react-native'
import {HEADERLOGO,BACK,CROSS} from '../images'
import styles from '../components/Auth/styles'
import Ripple from 'react-native-material-ripple'
import { colors } from '../theme'
import { DIMENS } from '../constants'

export default ({ onPress,textHeader,alignItems,imageSource,height,justifyContent,text,back,backPress,isFromLogin }) => (
    <View style={{
        backgroundColor: colors.header,
        paddingHorizontal: 10,
       // height:height,
       // justifyContent:justifyContent,
        alignItems:alignItems,
      }}>
         <Ripple onPress={backPress} style={{position:'absolute',left:DIMENS.px_10,top:DIMENS.px_10}}>
                <Image source={back==true?(isFromLogin==undefined?BACK:CROSS):undefined} style={{ tintColor:colors.white,height: DIMENS.px_25, width: DIMENS.px_25}}  resizeMode= {'center'} />
          </Ripple>
        <View style={{paddingVertical:DIMENS.px_25,flexDirection:'row',  justifyContent:justifyContent,
        alignItems:alignItems,}}>
        <Image source={HEADERLOGO} style={styles.headerAuthImgLogo}/>
     </View>
    </View>

)