import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import Ripple from 'react-native-material-ripple';
import styles from '../Auth/styles'
import { colors } from '../../theme';
import { NOTIFICATION, HEART, SEARCH, ORDER, PLUS,CANCEL } from '../../images'
import HeaderButton from '../HeaderButton'
import translate from '../../i18n/i18n';
import { DIMENS, FONT_FAMILIY, WIDTH, HEIGHT, CURRENCY } from '../../constants';
import Basecomponents from '../../common/BaseComponent';
import Modal from "react-native-modal";

export default class CommonMsgDialog extends Basecomponents{
    constructor(props){
        super(props)
        this.state={
            isVisible :true
        }
    }
    onClosePopover=()=>{
        this.setState({isVisible:false})
        this.props.onClosePopover()
    }
    yesPress=()=>{
        this.onClosePopover()
        this.props.yesPopverPress()
    }

    render(){
        return(
            <Modal
            backgroundColor={colors.blackTransparent}
             animationType="slide"
             style={{justifyContent:'center',alignItems:'center',margin:0}}
             transparent={true}
             visible={this.state.isVisible}
             onDismiss={this.onClosePopover}
             onRequestClose={this.onClosePopover}
             onBackdropPress={this.onClosePopover}
          >
            <View style={{backgroundColor:colors.white,borderRadius:DIMENS.px_3,width:'80%',
            justifyContent:'center',alignItems:'center',paddingVertical:DIMENS.px_15,marginHorizontal:DIMENS.px_10}}>
               {
                  this.props.title != undefined &&
                  <Text style={{textAlign:'center',fontSize:DIMENS.txt_size_medium,fontFamily:FONT_FAMILIY.Roboto_Medium,color:colors.primary}}>
                      {this.props.title}</Text>
               }
                {
                  this.props.mzg != undefined &&
                  <Text style={{fontSize:DIMENS.txt_size_medium_1,fontFamily:FONT_FAMILIY.Roboto_Medium,color:colors.primary}}>
                      {this.props.mzg}</Text>
               }
               {
                   <View style={{flexDirection:'row',justifyContent:'space-evenly',marginTop:DIMENS.px_20,marginHorizontal:DIMENS.px_10}}>
                   <Ripple style={{justifyContent:'center',alignItems:'center',backgroundColor:colors.blueTextClr,
                   paddingVertical:DIMENS.px_5,borderRadius:DIMENS.px_3,flex:.45}}>
                       <Text style={{color:colors.white,fontSize:DIMENS.txt_size_medium}}>
                           {this.props.yesTxt}</Text>
                    </Ripple>
                    <Ripple style={{justifyContent:'center',alignItems:'center',backgroundColor:colors.primary,
                     paddingVertical:DIMENS.px_5,borderRadius:DIMENS.px_3,marginLeft:DIMENS.px_5,flex:.45}}
                     onPress={this.onClosePopover}>
                       <Text style={{color:colors.white,fontSize:DIMENS.txt_size_medium}}>
                           {this.props.noTxts}</Text>
                    </Ripple>
                   </View>
               }
            
            </View>
       </Modal>
        )
    }
}

