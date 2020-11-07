import React from 'react'
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text, Image,
    TouchableOpacity, FlatList,
    View, Dimensions, TextInput, SectionList
} from 'react-native'
import Ripple from 'react-native-material-ripple';
import styles from '../Auth/styles'
import { colors } from '../../theme';
import { DELETE, STAR, DELTE_BG, EDIT_BG } from '../../images'
import translate from '../../i18n/i18n';
import { DIMENS, FONT_FAMILIY, WIDTH, HEIGHT, CURRENCY, APP_PARAMS } from '../../constants';
import Basecomponents from '../../common/BaseComponent';
import CommonNavHeader from '../../common/CommonNavHeader';
import { CommonBillingView } from '../../common/CommonProductRow';

export default class DeliveryInstallationDetails extends Basecomponents {
    constructor(props) {
        super(props)
        console.warn('props:--',props.navigation.state);
        this.data = props.navigation.state!=undefined&&props.navigation.state.params!=undefined&&props.navigation.state.params
        
        this.state = {

        }
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <CommonNavHeader title={translate('SCREEN_DELIVERY_INSTALLTION')}
                    backPress={() => this.props.navigation.goBack()} />

                <ScrollView >
                    <View style={{borderBottomWidth:DIMENS.px_05,borderBottomColor:colors.lightGraytransparent,width:'100%',padding:DIMENS.px_15}}>
                        <Text style={{
                            color: colors.black, fontSize: DIMENS.txt_size_medium,
                            fontFamily: FONT_FAMILIY.Roboto_Regular,
                        }}> {translate('DELIVER_BY')}</Text>
                        <Text style={{
                            color: colors.black, fontSize: DIMENS.txt_size_medium,
                            fontFamily: FONT_FAMILIY.Roboto_Regular,marginTop:DIMENS.px_5
                        }}>{`${this.data[APP_PARAMS.DELIVERY_TIME]} | `}
                            <Text style={{
                                color: colors.lightGreen, fontSize: DIMENS.txt_size_medium,
                                fontFamily: FONT_FAMILIY.Roboto_Regular,
                            }}>{`${this.data[APP_PARAMS.SHIPPING_CHARGE]} `}
                                {/* <Text style={{
                                    color: colors.lightGrayText, textDecorationLine: 'line-through', fontSize: DIMENS.txt_size_medium,
                                    fontFamily: FONT_FAMILIY.Roboto_Regular,
                                }}>{CURRENCY.RUPEES + '40'}
                                </Text> */}
                            </Text>
                        </Text>
                    </View>
                    
                    {/*Installtion detail*/}
                    <View style={{borderBottomWidth:DIMENS.px_05,borderBottomColor:colors.lightGraytransparent,width:'100%',padding:DIMENS.px_15}}>
                        <Text style={{
                            color: colors.black, fontSize: DIMENS.txt_size_medium,
                            fontFamily: FONT_FAMILIY.Roboto_Regular,
                        }}> {translate('INSTALLATION_DETAIL')}</Text>
                        {this.data[APP_PARAMS.INSTALL_DETAIL].map(item=>{
                            return(
                                <Text style={{
                                    color: colors.grayClr, fontSize: DIMENS.txt_size_medium,
                                    fontFamily: FONT_FAMILIY.Roboto_Regular,marginTop:DIMENS.px_5
                                }}>{item}</Text>
                            )
                        })
                        }
                    </View>

                     {/*detail*/}
                     <View style={{borderBottomWidth:DIMENS.px_05,borderBottomColor:colors.lightGraytransparent,width:'100%',padding:DIMENS.px_15}}>
                        <Text style={{
                            color: colors.black, fontSize: DIMENS.txt_size_medium,
                            fontFamily: FONT_FAMILIY.Roboto_Regular,
                        }}> {translate('SHIPPING_CHANGES_FOR_DEMO_ASSIRED')}</Text>
                         {this.data[APP_PARAMS.SHIPPING_CAHNGES].map(item=>{
                            return(
                        <Text style={{
                            color: colors.grayClr, fontSize: DIMENS.txt_size_medium,
                            fontFamily: FONT_FAMILIY.Roboto_Regular,marginTop:DIMENS.px_5
                        }}>{item}</Text>
                        )
                      })
                    }
                    </View>


                </ScrollView>
            </View>
        )
    }
}