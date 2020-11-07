import React from 'react'
import { ActivityIndicator, Text, View,ImageBackground,Image,Modal } from 'react-native'

import { colors } from '../theme'
import {LOGO} from '../images'

const Loading = ({ message,online }) => (
  <View style={{
    alignItems: 'center',
    backgroundColor: colors.white,
    flex: 1,
    justifyContent: 'center',
    width: '100%'
  }}>
    <Modal visible={online} >
    {/* {message ? ( */}
      <View style={{
        alignItems: 'center',justifyContent:'center',flex:1,width: '100%',
        flexDirection:'column'}}>
    <Image source={LOGO} style={{resizeMode:'contain',width:156,height:156}}/>
      <Text style={{ color: colors.primary, textAlign: 'center' }}>
        {message}
      </Text>
      </View>
    {/* ) : null} */}
        <ActivityIndicator color={colors.primary} size="large" />
    </Modal>

  

  </View>
)

Loading.navigationOptions = { title: 'Loading' }

export default Loading