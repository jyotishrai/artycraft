import React from 'react'
import {
    ActivityIndicator, Animated,
    Easing,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text, Image,
    TouchableOpacity, FlatList,
    View, Dimensions, TextInput, Modal, DeviceEventEmitter,
} from 'react-native'
import Ripple from 'react-native-material-ripple';
import { Form, Field } from 'react-final-form';
import FormTextInput from '../FormTextInput'
import {TextField} from 'react-native-material-textfield';

import styles from '../Auth/styles'
import { colors } from '../../theme';
import { NOTIFICATION, HEART, SEARCH, ORDER, DONE, STAR, SHARE, NEXT, CROSS, RADIO_POINT, CIRCLE, PLACEHOLDER_PRODUCT_IMG, LOCK } from '../../images'
import HeaderButton from '../HeaderButton'
import CommonHeaderHome from '../../common/CommonHeaderHome'
import translate from '../../i18n/i18n';
import CommonSearch from '../../common/CommonSearch';
import ImageSlider from 'react-native-image-slider';
import { DIMENS, FONT_FAMILIY, WIDTH, HEIGHT, CURRENCY, OFF_ZONE, PERCENTAGE, APP_PARAMS, KEY, API, CONST, SCREENS } from '../../constants';
import CommonButton from '../../common/CommonButton';
import CommonProductRow, { CommonHorizontailList, CommonItemListForCat, CommonColumnTextDetils, ratingReview, CommonRatingReview, CommonSimmilarItem } from '../../common/CommonProductRow';
import Basecomponents from '../../common/BaseComponent';
import CommonNavHeader from '../../common/CommonNavHeader';
import CompareSortFiltr from '../../common/CompareSortFiltr';
import CommonProductList from '../../common/CommonProductList';
import Loader from '../../common/Loader';
import * as Utils from '../../utility/Utils'
import * as Toast from '../../utility/Toast'
import { storeData, retrieveData, clearData } from '../../common/AsyncStorage'
import { passRegex } from '../../constants'

const noOfimg = 4
const width = (WIDTH - 54) / 4
Dimensions.get('window').width


export default class ChangePassword extends Basecomponents {
    constructor(props) {
        super(props)
        this.state = {
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        }
    }
    componentDidMount() {

    }

    isValidOldPassword = (oldPassword) => {
        let errors = undefined
        if(oldPassword == '') {
            errors = translate('OLD_PASS_EMPTY_ERR')
        } else if (!passRegex.test(oldPassword)) {
            errors = translate('OLD_PASS_STRONG_VALIDATION')
        } else if (oldPassword.length < 6) {
            errors = translate('OLD_PASS_INVALID_ERR')
        }
        if (errors != undefined && errors != '') {
            Toast.showInfoToast(errors)
            return false;
        } else {
            return true;
        }
    }

    isValidNewPassword = (newPassword) => {
        let errors = undefined
        if(newPassword == '') {
            errors = translate('NEW_PASS_EMPTY_ERR')
        } else if (!passRegex.test(newPassword)) {
            errors = translate('NEW_PASS_STRONG_VALIDATION')
        } else if (newPassword.length < 6) {
            errors = translate('NEW_PASS_INVALID_ERR')
        }
        if (errors != undefined && errors != '') {
            Toast.showInfoToast(errors)
            return false;
        } else {
            return true;
        }
    }

    isValidConfirmPassword = (newPass, confirmPass) => {
        let errors = undefined
        if(confirmPass=='') {
            errors = translate('CONFIRM_PASS_EMPTY_ERR')
        } else if(newPass!=confirmPass) {
            errors = translate('PASSWORD_AND_CONFIRM_PASSWORD_ARE_NOT_SAME')
        }
        if (errors != undefined && errors != '') {
            Toast.showInfoToast(errors)
            return false;
        } else {
            return true;
        }
    }

    submit = () => {
        if(
        this.isValidOldPassword(this.state.oldPassword) &&
        this.isValidNewPassword(this.state.newPassword) &&
        this.isValidConfirmPassword (this.state.newPassword, this.state.confirmPassword)) {
          let data = { 
             [APP_PARAMS.CUSTOMER_KEY_ID]: global[KEY.USER_DATA]!=undefined && global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID] ,
             [APP_PARAMS.REQ_ID]: Utils.getRequestId(),
             [APP_PARAMS.OLD_PASSWORD]: this.state.oldPassword,
             [APP_PARAMS.PASSWORD]: this.state.newPassword
          }
            this.props.changePasswordApi(data).then(result => {
            console.warn('change Paswword :::', result);
            
            if(result!=undefined) {
                if(result[APP_PARAMS.SUCCESS]!=undefined) {
                    if(result[APP_PARAMS.SUCCESS]) {
                        this.props.navigation.goBack();
                    }
                    if(result[APP_PARAMS.MESSAGE]) {
                    Toast.showInfoToast(result[APP_PARAMS.MESSAGE])
                    }
                } else {
                   Toast.showInfoToast(translate('MESSAGE_SERVER_ERROR'))
                }
            } else {
                Toast.showInfoToast(translate('MESSAGE_SERVER_ERROR'))
            }
         })
        }
       


        //   SignUpAPI(reqDatat).then(result => {
        //     if (result != undefined) {
        //       if (result.hasOwnProperty(APP_PARAMS.DATA) && result[APP_PARAMS.DATA] != null) {
        //         result[APP_PARAMS.DATA][APP_PARAMS.CUSTOMER_ID] != undefined &&
        //           this.props.navigation.replace('Otp',
        //             {
        //               [APP_PARAMS.CUSTOMER_ID]: result[APP_PARAMS.DATA][APP_PARAMS.CUSTOMER_ID],
        //               [APP_PARAMS.PHONE]: data[APP_PARAMS.PHONE],
        //               [APP_PARAMS.COUNTRY_ID]: this.state.countryId,
        //               [APP_PARAMS.PHONE_CODE]: '+' + this.state.countryCode,
        //               [KEY.IS_FROM]:SCREENS.SIGN_UP
        //             }
        //           )

        //         result[APP_PARAMS.MESSAGE] &&
        //           showInfoToast(result[APP_PARAMS.MESSAGE])
        //       } else {
        //         result[APP_PARAMS.MESSAGE] &&
        //           showInfoToast(result[APP_PARAMS.MESSAGE])
        //       }
        //     } else {
        //       showInfoToast(translate('MESSAGE_SERVER_ERROR'))
        //     }
        //   })

    }

    
    render() {
        const { loading }= this.props 
        return (
            <View style={{
                backgroundColor: colors.white,
                flex: 1, width: '100%'
            }}>
                <CommonNavHeader
                    title={translate('CHANGE_PASSWORD')}
                    backPress={() => this.props.navigation.goBack()}
                />
                <View style={{ flex: 1, paddingHorizontal: DIMENS.px_20}}>
                   
                      <TextField
                      secureTextEntry={true}
                    ref={(r) => this.oldPassRef = r}
                    label={translate('OLD_PASSWORD') + translate('REQ_ASTRIC')}
                    tintColor={colors.primary}
                    lineWidth={0.3}
                    style={{ fontFamily: FONT_FAMILIY.Roboto_Regular, fontSize: DIMENS.txt_size_medium }}
                    returnKeyType='next'
                    onFocus={this.onFocus}
                    value={this.state.oldPassword}
                    onChangeText={(txt) => this.setState({ oldPassword: txt })}
                    onSubmitEditing={() => this.newPassRef.focus()}
                />
                 <TextField
                 secureTextEntry={true}
                    ref={(r) => this.newPassRef = r}
                    label={translate('NEW_PASSWORD') + translate('REQ_ASTRIC')}
                    tintColor={colors.primary}
                    lineWidth={0.3}
                    style={{ fontFamily: FONT_FAMILIY.Roboto_Regular, fontSize: DIMENS.txt_size_medium }}
                    returnKeyType='next'
                    onFocus={this.onFocus}
                    value={this.state.newPassword}
                    onChangeText={(txt) => this.setState({ newPassword: txt })}
                    onSubmitEditing={() => this.confirmPasswordRef.focus()}
                />
                <TextField
                                      secureTextEntry={true}

                    ref={(r) => this.confirmPasswordRef = r}
                    label={translate('CONFIRM_PASSWORD') + translate('REQ_ASTRIC')}
                    tintColor={colors.primary}
                    lineWidth={0.3}
                    style={{ fontFamily: FONT_FAMILIY.Roboto_Regular, fontSize: DIMENS.txt_size_medium }}
                    returnKeyType='next'
                    onFocus={this.onFocus}
                    value={this.state.confirmPassword}
                    onChangeText={(txt) => this.setState({ confirmPassword: txt })}
                />
                <View>
                <Ripple style={[styles.submitBtn,{marginHorizontal: DIMENS.px_0}]} onPress={() => this.submit()}>
                {loading ? (
                <ActivityIndicator color={colors.white} size={35} style={{ padding: 10 }} />
              ) : (
                    <Text style={styles.submitBtnText}>{translate('SUBMIT')}</Text>
              )
    }
                </Ripple>
                </View> 
                </View> 
            </View>
        )
    }
}