import React from 'react'
import { Image, TouchableOpacity, View, Text } from 'react-native'
import { SHOP_CART, MENU, NOTIFICATION ,ORDER} from '../images'
import styles from '../components/Auth/styles'
import Ripple from 'react-native-material-ripple'

import { colors } from '../theme'
import { DIMENS } from '../constants'
import translate from '../i18n/i18n'

export default ({style,onPress,textStyle}) => (
    <View style={[styles.submitBtn,style]}>
       <Ripple onPress={onPress}>
          <Text style={[styles.submitBtnText,textStyle]}>{translate('VIEW_ALL')}</Text>
        </Ripple>
    </View>
)