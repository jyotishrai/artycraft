import React from 'react'
import {
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,View,Image,
  TextInput,
  UIManager,
} from 'react-native'
import Ripple from 'react-native-material-ripple';
import {DOWN_ARR} from '../images'
import {DIMENS} from '../constants/index'


import { colors } from '../theme'

const styles = StyleSheet.create({
  hint: {
    color: colors.primaryDisabled,
    fontSize: 13,
    lineHeight: 15,
    paddingVertical: 10,
    textAlign: 'center',
  },
})

if (Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

export default class FormTextInput extends React.Component {

  state = { hint: '', showHint: false }

  showHint = (hint = '') => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.setState({ hint, showHint: true })
  }

  hideHint = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.setState({ hint: '', showHint: false })
  }

  shouldComponentUpdate(nextProps, nextState) {
    const {
      input: { value },
      meta: { active, error }
    } = this.props
    const { showHint } = this.state
    if (value !== nextProps.input.value ||
       active !== nextProps.meta.active ||
       error !== nextProps.meta.error ||
       showHint !== nextState.showHint) {
      if (error !== nextProps.meta.error) { // should show or hide hint
        if (!error && nextProps.meta.error && nextProps.meta.active) {
          this.showHint(nextProps.meta.error)
        }
        if (error && !nextProps.meta.error && nextProps.meta.active) {
          this.hideHint()
        }
      }
      if (active && !nextProps.meta.active) {
        this.hideHint()
      }
      if (!active && nextProps.meta.active && nextProps.meta.error) {
        this.showHint(nextProps.meta.error)
      }
      return true
    } else {
      return false
    }
  }

  render() {
    
    const { maxLength,activeStyle, imgSrc,placeholder,input, meta, 
      style,keyboardType,countryCode, ...rest } = this.props
    const { inputRef, ...inputProps } = rest
    console.log('value input',input.value);

    return (
      <React.Fragment >
        <View style={{flex:1}}>
       <View style={[{flexDirection:imgSrc?'row':'column',alignItems:imgSrc?'center':undefined},style]}>
       
        {
          imgSrc&&

          <Image source={imgSrc} style={{width:30,height:30,resizeMode:'center',flex:0.1}}/>
        }
        <TextInput 
          {...inputProps}
          placeholder={placeholder}
          onBlur={input.onBlur}
          onChangeText={input.onChange}
          onFocus={input.onFocus}
          ref={inputRef}
          value={input.value}
          keyboardType={keyboardType}
          maxLength = {maxLength}
        //meta.active && activeStyle ? activeStyle : style,
        style={[{paddingVertical:Platform.OS != "android" ? DIMENS.px_18 :undefined,
          flex:0.9,marginLeft:DIMENS.px_5,width:'100%'}]}
          // style={[{paddingVertical:Platform.OS != "android" ? DIMENS.px_18 :undefined,
          // flex:0.9,marginLeft:DIMENS.px_5,width:'100%'}]}
        />
        </View>
        {this.state.showHint ? (
          <Text style={styles.hint}>{this.state.hint}</Text>
        )
         : null}

        </View>
        
      </React.Fragment>
    )
  }

}