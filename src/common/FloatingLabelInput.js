import React, { Component } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View, TextInput, Platform
} from 'react-native'
import { colors } from '../theme'
import { DIMENS } from '../constants';
import Basecomponents from './BaseComponent';

export default  class FloatingLabelInput extends Basecomponents {
    constructor(props){
        super(props)
        this.state = {
            isFocused: false,
            txtInputHeight : Platform.OS == 'ios'? 30 : 20
          };
    }
  
    handleFocus = () => {
        this.setState({ isFocused: true,txtInputHeight:DIMENS.px_45});
        this.props.focus()
    }
    handleBlur = () => {
        const { value } = this.props;
        let height = value !=undefined && value == '' ?5:value ==undefined?5: DIMENS.px_45
        this.setState({ isFocused: false,txtInputHeight:height});
    }
  
    render() {
      const { label,value,onChangeText, ...props } = this.props;
      const { isFocused ,txtInputHeight} = this.state;
     // console.warn("props. floating:-",this.props.value);
      
      const labelStyle = {
        position: 'absolute',
        left: 2,
        top: !isFocused ? 5 : 0,
        fontSize: !isFocused ? DIMENS.txt_size_large : DIMENS.txt_size_large,
        color: !isFocused ? '#aaa' : colors.primary,
      };
      return (
        <View style={{ paddingTop: 15,marginTop:DIMENS.px_20}}>
          <Text style={labelStyle}>
            {label}
          </Text>
          <TextInput
          
            value={this.props.value}
            style={{ height:txtInputHeight,
               color: '#000', borderBottomWidth:!isFocused ? 0.5 :DIMENS.px_1, borderBottomColor: !isFocused ?colors.lightGrayText:colors.primary }}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            
            //onChangeText={(text)=>this.props.onChangeText(text)}
            onChangeText={onChangeText}
          />
        </View>
      );
    }
  }