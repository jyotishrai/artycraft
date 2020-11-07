import React from 'react'
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text, Image,
  TouchableOpacity,
  View, Dimensions, TextInput, FlatList, DeviceEventEmitter
} from 'react-native'
import Ripple from 'react-native-material-ripple';
import styles from '../Auth/styles'
import { colors } from '../../theme';
import { } from '../../images'
import HeaderButton from '../HeaderButton'
import CommonHeaderHome from '../../common/CommonHeaderHome'
import translate from '../../i18n/i18n';
import { DIMENS, FONT_FAMILIY, WIDTH, HEIGHT, APP_PARAMS, KEY, SCREEN, SCREENS } from '../../constants';
import CommonNavHeader from '../../common/CommonNavHeader';
import CodeInput from 'react-native-confirmation-code-input';
import NavigationService from '../../NavigationService';
import { showInfoToast } from '../../utility/Toast'
import { storeData, retrieveData } from '../../common/AsyncStorage'
import * as AsyncStorage from '../../common/AsyncStorage'



export default class Otp extends React.PureComponent {
  constructor(props) {
    super(props)
    this.isFromWish = this.props.navigation.state != undefined &&
      this.props.navigation.state.params != undefined &&
      this.props.navigation.state.params['isFromCatWish'] != undefined
      && this.props.navigation.state.params['isFromCatWish'];
    this.isFrom = this.props.navigation.state != undefined &&
      this.props.navigation.state.params != undefined &&
      this.props.navigation.state.params['isFrom'] != undefined
      && this.props.navigation.state.params['isFrom']
  }
  componentDidMount() {
    //Otp
    
    console.log("user data::--",JSON.stringify(global[KEY.USER_DATA]));

    // alert('alerts'+this.props.navigation.state.params[APP_PARAMS.CUSTOMER_ID])

  }
  updateProfileBtOtpVerify=(otp)=>{
    let data = {
      [APP_PARAMS.CUSTOMER_ID]:global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID],
      [APP_PARAMS.EMAIL]:this.props.navigation.state.params&&this.props.navigation.state.params[APP_PARAMS.EMAIL],
      [APP_PARAMS.FULL_NAME]:this.props.navigation.state.params&&this.props.navigation.state.params[APP_PARAMS.FULL_NAME],
      [APP_PARAMS.OTP]:otp
      }
      this.props.updateProfileAPi(data).then(response=>{
        this.responseOfApi(response,true)
      })
  }

  resendOtp = () => {

      this.props.resendOtpApi( this.props.navigation.state.params[APP_PARAMS.CUSTOMER_ID]).then(result => {
        this.responseOfApi(result)
      })
    
  }

  responseOfApi = (response,updateProfile) => {

    if (response) {
      if (response[APP_PARAMS.SUCCESS]!=undefined) {

       if(response[APP_PARAMS.MESSAGE]) 
       showInfoToast(response[APP_PARAMS.MESSAGE])
       else 
       showInfoToast(translate('MESSAGE_SERVER_ERROR'))
        }
        if(updateProfile){
          if(response[APP_PARAMS.SUCCESS]==true){
            if(global[KEY.USER_DATA]){
              console.log("user data::--",JSON.stringify(global[KEY.USER_DATA]));
              
             // DeviceEventEmitter.emit('UserDetail')
              
              global[KEY.USER_DATA][APP_PARAMS.NAME] = this.props.navigation.state.params&&this.props.navigation.state.params[APP_PARAMS.FULL_NAME]
              global[KEY.USER_DATA][APP_PARAMS.EMAIL] = this.props.navigation.state.params&&this.props.navigation.state.params[APP_PARAMS.EMAIL]
              AsyncStorage.storeData(KEY.USER_DATA, global[KEY.USER_DATA])
              this.props.savUserOnEdit(global[KEY.USER_DATA])
            }
            this.props.navigation.state.params&&this.props.navigation.state.params.goBackUpdateEmail()
            this.props.navigation.goBack()
          }else{
            if(global[KEY.USER_DATA]){
              console.log("user data::--",JSON.stringify(global[KEY.USER_DATA]));
            
              AsyncStorage.storeData(KEY.USER_DATA, global[KEY.USER_DATA])
              this.props.savUserOnEdit(global[KEY.USER_DATA])
            }
          }
        }
      } else {
        showInfoToast(translate('MESSAGE_SERVER_ERROR'))
       
      }
    console.log('response data:---', response)
  }

  sendOtpConfirm = (otp) => {
    const { otpAPI } = this.props
    if(this.isFrom===SCREENS.EDIT_PROFILE){
      this.updateProfileBtOtpVerify(otp)
    }else{
    let data = {
      [APP_PARAMS.CUSTOMER_ID]: this.props.navigation.state.params[APP_PARAMS.CUSTOMER_ID],
      [APP_PARAMS.OTP]: otp,

    }

    otpAPI(data, false).then(result => {
      console.log('response::--', result);
      if (result != undefined) {
        if (result.hasOwnProperty(APP_PARAMS.SUCCESS)) {
          if (result[APP_PARAMS.SUCCESS]) {
            if (result.hasOwnProperty(APP_PARAMS.DATA) && result[APP_PARAMS.DATA] != null) {
              setTimeout(() => {
                storeData(KEY.USER_DATA, result[APP_PARAMS.DATA])
                global[KEY.AS_GUESt_USER] = undefined;
                global[KEY.USER_DATA] = result[APP_PARAMS.DATA];
                // alert("result"+JSON.stringify(result))
                if(this.props.isFromApp!=undefined){
                 if(this.props.isFromApp[APP_PARAMS.PAGE_TYPE]!==SCREENS.MY_ACCOUNT){
                  if(this.props.navigation.state.params&&this.props.navigation.state.params[KEY.IS_FROM]&&
                      this.props.navigation.state.params[KEY.IS_FROM]===SCREENS.SIGN_UP){
                        // alert('signUp')

                        DeviceEventEmitter.emit(KEY.COME_BACK_FROM_LOGIN) 
                    //    NavigationService.popToScren(2)
                        NavigationService.popToScren(3)
                  }else{
                    // alert('login')
                    DeviceEventEmitter.emit(KEY.COME_BACK_FROM_LOGIN) 
                    NavigationService.popToScren(2)
                  }
                 }else{
                  // alert('come')
                  NavigationService.clearStack('Drawer' ,
                  {[APP_PARAMS.PAGE_TYPE]:this.props.isFromApp[APP_PARAMS.PAGE_TYPE]})
                 }
                 
                }else{
                   
                  NavigationService.clearStack('Drawer')
                }
              
              }, 500);
            } else {
              result[APP_PARAMS.MESSAGE] &&
                showInfoToast(result[APP_PARAMS.MESSAGE])
            }
          } else {
            result[APP_PARAMS.MESSAGE] &&
              showInfoToast(result[APP_PARAMS.MESSAGE])
          }
        }

      } else {
        showInfoToast(translate('MESSAGE_SERVER_ERROR'))
      }
    })
  }

  }

  render() {
    const { loading } = this.props
    return (
      <View style={{
        backgroundColor: colors.white,
        flex: 1, width: '100%'
      }}>
        <CommonNavHeader title={translate('SCREEN_VERIFY_NUMBER')}
          backPress={() => this.props.navigation.goBack()} />
        <View style={{ alignItems: 'center', padding: 20, flex: 1 }}>
          <Text style={{ color: colors.grayClr, fontSize: DIMENS.txt_size_medium_15, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
            {translate('OTP_TITLE')}
          </Text>
          <View style={{ marginTop: DIMENS.px_20, flexDirection: 'row' }}>
            <Text style={{ color: colors.black, fontSize: DIMENS.txt_size_medium_15, fontFamily: FONT_FAMILIY.Roboto_Medium }}>
              {this.props.navigation.state != undefined && this.props.navigation.state.params != undefined &&
                this.props.navigation.state.params[APP_PARAMS.PHONE] != undefined && 
                this.props.navigation.state.params[APP_PARAMS.PHONE_CODE] + ' ' +
                this.props.navigation.state.params[APP_PARAMS.PHONE]}
            </Text>
            <Ripple style={{ paddingHorizontal: 10 }} onPress={() => this.props.navigation.goBack()}>
              <Text style={{ color: colors.primary, fontSize: DIMENS.txt_size_medium_15, fontFamily: FONT_FAMILIY.Roboto_Medium, textDecorationLine: 'underline' }}>
                {translate('EDIT')}
              </Text>
            </Ripple>
          </View>
          <View style={{ marginTop: DIMENS.px_20, height: DIMENS.px_100 }}>
            <CodeInput
              ref='otpRef'
              keyboardType={'numeric'}
              className={'border-b'}
              codeLength={4}
              activeColor={colors.primary}
              inactiveColor={colors.colorPrimarydark}
              ignoreCase={true}
              inputPosition='center'
              size={40}
              onFulfill={(isValid) =>
                this.sendOtpConfirm(isValid)
              }
              fontSize={DIMENS.txt_size_medium}
              fontFamily={FONT_FAMILIY.Roboto_Regular}
            />
          </View>
          <View style={{ width: '100%', alignItems: 'flex-end', marginRight: DIMENS.px_40 }}>
          <Ripple style={{ paddingHorizontal: 10 }} onPress={() => this.resendOtp()}>
              <Text style={{ color: colors.primary, fontSize: DIMENS.txt_size_medium_15, fontFamily: FONT_FAMILIY.Roboto_Medium }}>
                {translate('RESEND_OTP')}
              </Text>
            </Ripple>
            </View>
        </View>
        {/* <Text style={{color:colors.black,fontFamily:FONT_FAMILIY.Roboto_Regular,fontSize:DIMENS.txt_size_medium,flex:1,textAlign:'right',marginTop:150,right:DIMENS.px_15}}>{translate('RESEND_CODE')}
          <Text style={{color:colors.primary,fontFamily:FONT_FAMILIY.Roboto_Regular,fontSize:DIMENS.txt_size_medium}}>{' 01:00'}</Text>
          </Text> */}
        {loading &&
          <ActivityIndicator color={colors.primary} size={35} style={{ padding: 10, position: 'absolute', width: '100%', height: '100%' }} />
        }

      </View>
    )
  }
}
