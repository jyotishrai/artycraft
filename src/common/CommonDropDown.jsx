import React from 'react'
import { Image, TouchableOpacity, View, Text,FlatList } from 'react-native'
import { SHOP_CART, MENU, NOTIFICATION ,ORDER} from '../images'
import styles from '../components/Auth/styles'
import Ripple from 'react-native-material-ripple'

import { colors } from '../theme'
import { DIMENS } from '../constants'
import translate from '../i18n/i18n'
import Basecomponents from './BaseComponent'


export default class CommonDropDown extends Basecomponents{
    constructor(props){
      super(props)
    }
    renderItem=(item,index)=>{
        return(
         <View style={{backgroundColor:colors.white,padding:5}}>
             <Ripple style={{paddingHorizontal:item.value?15:undefined,paddingVertical:item.value?5:undefined}}>
              <Text style={{borderColor:colors.lightGrayText,borderWidth:DIMENS.px_05,padding:5}}>
                     {item.value?item.value:item.address&&item.address}</Text>
             </Ripple>
         </View>
        )
    }
    render(){
     const {data,onPress,style} = this.props
      return(
       <View style={{flex:1,backgroundColor:colors.white,elevation:2},style}>
       <View>
           <FlatList
           data={data}
           renderItem={({item,index})=>this.renderItem(item,index)}
           extraData={this.state}
           keyExtractor={(item,index)=>index.toString()}/>
       </View>
    </View>
    )
    }
}