import React from 'react'
import { ActionSheetIOS, Platform, View, Text, ScrollView } from 'react-native'
import Basecomponents from './BaseComponent'
import styles from '../components/Auth/styles'
import translate from '../i18n/i18n';
import { colors } from '../theme';
import { FONT_FAMILIY, DIMENS } from '../constants';
import Ripple from 'react-native-material-ripple';
import Modal from 'react-native-modal'


export default class CustomActionSheet extends Basecomponents {
    constructor(props) {
        super(props)
        this.state = {
            visible: this.props.visible,
            data: [translate('SELECT_CAMERA'), translate('SELECT_FRM_LIB'), translate('CANCEL')]
        }
    }

    _cancel = () => {
        this.setState({ visible: !this.state.visible })
    }

    render() {
        return (
            <Modal visible={this.state.visible}
                animationType='none'
                transparent
                onRequestClose={this._cancel}
                style={{alignItems:'center',justifyContent:'center',
                backgroundColor:colors.blackTransparent_bG,margin:0,paddingHorizontal:DIMENS.px_30}}
            >
                <View style={{backgroundColor:colors.white,elevation:2,width:'100%' }}>
                    <View style={{ borderBottomColor: colors.primary, borderBottomWidth: DIMENS.px_2,
                         width: '100%', backgroundColor: colors.white }}>
                        <Text style={{
                            color: colors.primary, fontFamily: FONT_FAMILIY.Roboto_Regular,
                            fontSize: DIMENS.txt_size_large, paddingVertical: DIMENS.px_15,
                            paddingHorizontal:DIMENS.px_10
                        }}>
                            {translate('SELECT_PHOTO')}</Text>
                    </View>
                    {
                        this.state.data.map((item,indx) => {
                            return (
                                <Ripple style={{ borderBottomColor: colors.lightGrayText, borderBottomWidth: DIMENS.px_1, }}
                                onPress={()=>this.props.selectOption(indx)}>
                                    <Text style={{ 
                                        color: colors.grayClr, fontFamily: FONT_FAMILIY.Roboto_Regular,
                                        fontSize: DIMENS.txt_size_large, paddingVertical: DIMENS.px_15,
                                        width: '100%', paddingHorizontal:DIMENS.px_10
                                    }}>
                                        {item}</Text>
                                </Ripple>
                            )
                        })
                    }

                    {/* <Text
                            style={[styles.overlay]}
                            onPress={this._cancel}
                        /> 
                         <View
                            style={[
                                styles.body,
                                // { height: this.translateY, transform: [{ translateY: sheetAnim }] }
                            ]}
                        >
                            {this._renderTitle()}
                            {this._renderMessage()}
                            {/* <ScrollView scrollEnabled={false}>{this._renderOptions()}</ScrollView> */}
                    {/* {this._renderCancelButton()} 
                        </View> */}
                </View>
            </Modal>
        )
    }
}
