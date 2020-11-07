import React from 'react'
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text, Image,
  TouchableOpacity,
  View, Dimensions, TextInput,DeviceEventEmitter
} from 'react-native'
import { Form, Field } from 'react-final-form'
import Ripple from 'react-native-material-ripple';


import FormTextInput from '../FormTextInput'
import HeaderButton from '../HeaderButton'
import { showError, setupPushNotifications } from '../../NotificationService'
import styles from './styles'
import { colors } from '../../theme'
import { images, DOWN_ARR, NEXT, CHECKMARK, CHECKMARK_GRAY, LOCK, EMAIL } from '../../images'
import translate from '../../i18n/i18n';
import {
  APP_PARAMS, FONT_FAMILIY, DIMENS, emailRegex, KEY, passRegex, SCREEN, SCREENS, CONST
} from '../../constants'
import CommonHeader from '../../common/CommonHeader'
import SignUp from '../../containers/Auth/SignUp';
import NavigationService from '../../NavigationService'
import CountryPicker, { getAllCountries, getCallingCode }
  from 'react-native-country-picker-modal';
import { showInfoToast, showErrorToast } from '../../utility/Toast'
import Loader from '../../common/Loader'
import { storeData, retrieveData } from '../../common/AsyncStorage'
import CommonAddressView from '../../common/CommonAddressView';



const Header = ({ children, style }) => (
  <Text style={[styles.header, style]}>
    {children}
  </Text>
)

const Label = ({ children, style }) => (
  <Text style={[styles.label, style]}>
    {children}
  </Text>
)

// w3c email regex https://html.spec.whatwg.org/multipage/input.html#e-mail-state-(type=email)

export default class Login extends React.PureComponent {


  constructor(props) {
    super(props)
    this.passRef = undefined;
    this.isFromCatWish = this.props.navigation.state != undefined &&
      this.props.navigation.state.params != undefined &&
      this.props.navigation.state.params['isFromCatWish'] != undefined
      && this.props.navigation.state.params['isFromCatWish'];
    this.isFrom = this.props.navigation.state != undefined &&
      this.props.navigation.state.params != undefined &&
      this.props.navigation.state.params['isFrom'] != undefined
      && this.props.navigation.state.params['isFrom'];
      // DeviceEventEmitter.addListener('linking',(data)=>this.navigateProductDetail(data) );

    // this.deepLink =  DeviceEventEmitter.addListener(CONST.DEEP_LINK, this.navigateProductDetail);

        
    this.state = {
      mobileNumber: '',
      isSelectTerms: false,
      isLoginPhone: true,
      submitError: undefined,
      passTxtField: '',
      emailTxtField: '',
      countryCode: '91',
      countryCodeVisible: false,
      countryId: undefined
    }
  }
  componentDidMount() {

    this.props.getAllCountries()
  }
  componentWillUnmount(){
   // this.deepLink.remove()
  }


  //Action
  skipPress = () => {
    storeData(KEY.AS_GUESt_USER, true)
    global[KEY.AS_GUESt_USER] = true
    NavigationService.clearStack('Drawer')
  }
  sendOtpPress = (otp) => {

    let errors = undefined
    if (this.state.isLoginPhone) {
      if (this.state.mobileNumber == '') {
        errors = translate('MOBILE_EMPTY_ERR')
      } else if (this.state.mobileNumber.length < 10) {
        errors = translate('MOBILE_INVALID_ERR')
      } else if (!this.state.isSelectTerms) {
        errors = translate('AGREE_TERMS_CONDITION_VALID')
      }
    } else {
      if (this.state.emailTxtField == '') {
        errors = translate('EMAIl_EMPTY_ERR')
      } else if (!emailRegex.test(this.state.emailTxtField)) {
        errors = translate('EMAIl_INVALID_ERR')
      } else if (this.state.passTxtField == '') {
        errors = translate('PASS_EMPTY_ERR')
      } else if (!passRegex.test(this.state.passTxtField)) {
        errors = translate('PASS_STRONG_VALIDATION')
      } else if (!this.state.isSelectTerms) {
        errors = translate('AGREE_TERMS_CONDITION_VALID')
      }
    }
    if (errors != undefined) {
      showInfoToast(errors)
    } else {
      let dataReq = this.state.isLoginPhone ? 
      { 
        [APP_PARAMS.PHONE]: this.state.mobileNumber,
       } :
        { [APP_PARAMS.EMAIL]: this.state.emailTxtField, 
          [APP_PARAMS.PASSWORD]: this.state.passTxtField,
        }
        dataReq[APP_PARAMS.DEVICE_TOKEN]= global[KEY.FCM_TOKEN] 

      this.props.loginAppUser(dataReq, this.state.isLoginPhone).then(result => {
        this.responseOflogin(result)
      })
    }
  }

  responseOflogin = (response) => {

    if (response) {
      if (response[APP_PARAMS.SUCCESS]) {
        if (response.hasOwnProperty(APP_PARAMS.DATA) && response[APP_PARAMS.DATA] != null) {
          console.warn("login response::--",JSON.stringify(response));
          
          if (this.state.isLoginPhone) {
            let navParams = {
              [APP_PARAMS.PHONE]: this.state.mobileNumber,
              [APP_PARAMS.COUNTRY_ID]: this.state.countryCode, isFrom: 'Auth',
              [APP_PARAMS.CUSTOMER_ID]: response[APP_PARAMS.DATA][APP_PARAMS.CUSTOMER_ID],
              [APP_PARAMS.PHONE_CODE]:'+'+this.state.countryCode
            };
            if (this.props.isFromApp!=undefined) {
              //this.props.navigation.replace('Otp', navParams)
              this.props.navigation.navigate('Otp', navParams)
            }
            else {
              this.props.navigation.navigate('Otp', navParams)
            }
          } else {
            storeData(KEY.USER_DATA, response[APP_PARAMS.DATA])
            global[KEY.AS_GUESt_USER] = undefined;
            global[KEY.USER_DATA] = response[APP_PARAMS.DATA];
            // if (this.isFromCatWish) {
            //   DeviceEventEmitter.emit('loginDataUpdate')
            //   this.props.navigation.goBack()
            // } else {
             
              if(this.props.isFromApp!=undefined){
                if(this.props.isFromApp[APP_PARAMS.PAGE_TYPE]!==SCREENS.MY_ACCOUNT){
                //===SCREENS.ORDER_SUMMARY
                this.props.navigation.state.params&&
                this.props.navigation.state.params.goBackLogin()
                this.props.navigation.goBack()
                }
                // else if(this.props.isFromApp[APP_PARAMS.PAGE_TYPE]===SCREENS.MY_ACCOUNT){
                //   NavigationService.clearStack('Drawer' ,
                //   {[APP_PARAMS.PAGE_TYPE]:this.props.isFromApp[APP_PARAMS.PAGE_TYPE]})
                //  } 
                else{
                 NavigationService.clearStack('Drawer' ,
                 {[APP_PARAMS.PAGE_TYPE]:this.props.isFromApp[APP_PARAMS.PAGE_TYPE]})
                } 
               }else{
                NavigationService.clearStack('Drawer')
               }
              
            //}
          }
        } else {
          response[APP_PARAMS.MESSAGE] != undefined &&
            showInfoToast(response[APP_PARAMS.MESSAGE])
        }
      } else {
        if (response[APP_PARAMS.MESSAGE] != undefined) {
          showInfoToast(response[APP_PARAMS.MESSAGE])
        }
      }
    }
    console.log('response data:---', response)
  }

  countryCodePickerShow = () => {
    this.setState({ countryCodeVisible: true })
  }
  
  onSelectCountryCode = (item) => {
    this.setState({ countryCode: item[APP_PARAMS.PHONE_CODE], countryId: item[APP_PARAMS._id] })
    //this.setState({ countryCode: item.callingCode[0] })
  }

  render() {
    const { loading, country, countryLoader } = this.props
    if (country && country[APP_PARAMS.RES_PKT])
      global[KEY.COUNTRY_LIST] = country[APP_PARAMS.RES_PKT]
    //console.log('country code data',JSON.stringify(country));



    return (
      <View style={styles.topView}>
        <CommonHeader justifyContent={'center'} alignItems={'center'}
          height={(Dimensions.get('screen').height / 100) * 12}
          isFromLogin={global[KEY.AS_GUESt_USER] != undefined && global[KEY.AS_GUESt_USER] && true}
          backPress={() => this.props.navigation.goBack()}
          back={global[KEY.AS_GUESt_USER] != undefined && global[KEY.AS_GUESt_USER] && true} />
        <ScrollView style={{ backgroundColor: colors.white, borderTopLeftRadius: 20, borderTopRightRadius: 20, borderColor: 'white' }}>
          <View style={{ backgroundColor: colors.white, borderTopLeftRadius: 20, borderTopRightRadius: 20, borderColor: 'white', flex: 1 }}>

            <View style={{ padding: DIMENS.px_15, marginTop: DIMENS.px_15 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Header style={{ color: colors.black, fontSize: DIMENS.px_15, fontWeight: 'bold', paddingVertical: 2, flex: .8 }}>{translate('LOGIN_TITLE')}</Header>
                {
                    !this.props.isFromApp&&
                <Ripple style={{ flexDirection: 'row', flex: .2, alignItems: 'baseline', justifyContent: 'flex-end' }}
                  onPress={() => this.skipPress()}>
                  
                    <Text style={{ color: colors.primary, fontWeight: 'bold' }}>
                    {translate('SKIP')}
                  </Text>
                  <Image style={{ marginLeft: DIMENS.px_5, height: 15, width: 6, resizeMode: 'center' }} source={NEXT} />
                </Ripple>
  }
              </View>
              <Header style={{ color: colors.label, fontSize: DIMENS.px_14, opacity: 0.6, }}>{translate('LOGIN_SUB_TITLE')}</Header>
            </View>

            <View style={styles.formControlView}>
              {
                this.state.isLoginPhone ?
                  <View style={[styles.textInput, { flexDirection: 'row', alignItems: 'center', width: '100%' }]}>
                    <Ripple style={{ flex: .1 }} onPress={() => this.countryCodePickerShow()}>
                    {!countryLoader ?
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}> 
                      <Text style={{ color: colors.lightGrayClr, fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                        {'+' + this.state.countryCode}</Text>
                      <Image source={DOWN_ARR} style={{ width: DIMENS.px_8, height: DIMENS.px_10, marginLeft: DIMENS.px_3, resizeMode: 'contain' }} />
                    </View> : 
                    <ActivityIndicator color={colors.primary} size={'small'} style={{ padding: 10 }} /> }

                    </Ripple> 
  

                    <View style={{ flex: 1 }}>
                      <TextInput style={{ padding: Platform.OS == "android" ? 10 : 20, width: '100%' }}
                        keyboardType={'phone-pad'}
                        value={this.state.mobileNumber}
                        maxLength={10}
                        onChangeText={(text) => { this.setState({ mobileNumber: text }) }}
                      />
                    </View>
                  </View> :
                  <View style={{}}>
                    <View style={[styles.textInput, { flexDirection: 'row', alignItems: 'center' }]}>
                      <Image source={EMAIL} style={{ width: 30, height: 30, resizeMode: 'center', flex: 0.1 }} />

                      <TextInput
                        placeholder={translate('EMAIL_ID')}
                        onChangeText={(txt) => {
                          this.setState({ emailTxtField: txt })
                        }}
                        onSubmitEditing={() => this.passRef.focus()}
                        returnKeyType="next"
                        value={this.state.emailTxtField}
                        style={[{
                          paddingVertical: Platform.OS != "android" ? DIMENS.px_18 : DIMENS.px_10,
                          flex: 0.9, marginLeft: DIMENS.px_5, width: '100%'
                        }]}

                      />
                    </View>
                    <View style={[styles.textInput, { flexDirection: 'row', alignItems: 'center', marginTop: DIMENS.px_10 }]}>
                      <Image source={LOCK} style={{ width: 30, height: 30, resizeMode: 'center', flex: 0.1 }} />

                      <TextInput
                        placeholder={translate('PASSWORD')}
                        ref={(refs) => this.passRef = refs}
                        secureTextEntry = {true}
                        onChangeText={(txt) => {
                          this.setState({ passTxtField: txt })
                        }}
                        returnKeyType="done"
                        value={this.state.passTxtField}
                        style={[{ paddingVertical: Platform.OS != "android" ? DIMENS.px_18 : DIMENS.px_10, flex: 0.9, marginLeft: DIMENS.px_5, width: '100%' }]}

                      />
                    </View>

                    {/* <FormTextInput input={{onBlur:false}}
             name='email'
              meta={{active:true}}
            // onChange={(text)=>{
            //   this.loginData(text)
            // }}
             style={[styles.textInput,{paddingVertical:20}]} imgSrc={EMAIL}
              placeholder={translate('EMAIL_ID')}/> */}
                    {/* <FormTextInput input={{onBlur:false}} meta={{active:true}}
             style={[styles.textInput,{marginTop:DIMENS.px_10}]} 
             imgSrc={LOCK} placeholder={translate('PASSWORD')}/> */}
                  </View>
              }
              <Ripple onPress={() => this.setState({
                isLoginPhone: !this.state.isLoginPhone
              })}>
                <Text style={{ color: colors.primary, marginVertical: DIMENS.px_10, textAlign: 'right' }}>{this.state.isLoginPhone ? translate('LOGIN_WITH_EMAIL_ID') : translate('LOGIN_WITH_PHONE_NO')}</Text>
              </Ripple>
            </View>
            <View style={{ marginTop: DIMENS.px_5, flexDirection: 'row', paddingHorizontal: DIMENS.px_15, alignItems: 'center' }}>

              <Ripple onPress={() => this.setState({ isSelectTerms: !this.state.isSelectTerms })}>
                {!this.state.isSelectTerms ?
                  <Image source={CHECKMARK_GRAY} style={{ width: 22, height: 22 }} />
                  : <Image source={CHECKMARK} style={{ width: 22, height: 22,tintColor:colors.primary }} />}
              </Ripple>
              <Text style={{ marginLeft: DIMENS.px_5, marginRight: DIMENS.px_1, color: colors.grayClr }}>
                {translate('AGREE_TERMS_CONDITION')}
              </Text>
              <Ripple onPress={() =>{
                                 this.props.appIsFromComingReq({ [APP_PARAMS.PAGE_TYPE]: KEY.TERMS_CONDITION })
                                 this.props.navigation.navigate(SCREENS.TERMS_CONDITION)
              }}>
                <Text style={{ color: colors.primary, opacity: 1.0, textDecorationLine: 'underline', }}>
                  {translate('TERMS_CONDITION')}
                </Text>
              </Ripple>
            </View>

            <Ripple style={styles.submitBtn} disable={loading ? false : true} onPress={() => this.sendOtpPress()}>
              {!loading ?
                <Text style={{ color: colors.white, fontWeight: 'bold', padding: DIMENS.px_15, textAlign: 'center' }}>
                  {this.state.isLoginPhone ? translate('SEND_OTP') : translate('CONTINUE').toUpperCase()}
                </Text> :
                <ActivityIndicator color={colors.white} size={35} style={{ padding: 10 }} />
              }
            </Ripple>

            <View style={{ marginTop: DIMENS.px_20, alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }}>
              <Text>
                {translate('NOT_REGISTER_YET_TEXT')}
              </Text>
              <Ripple onPress={() => this.props.navigation.navigate('SignUp')}>
                <Text style={{ marginLeft: DIMENS.px_2, color: colors.primary, textDecorationLine: 'underline' }}>
                  {translate('SIGN_UP')}
                </Text>
              </Ripple>
            </View>
            {this.state.submitError &&
              <Label style={{ alignSelf: 'center', color: colors.error }}>
                {submitError}
              </Label>}
            {/* {submitError ? (
                <Label style={{ alignSelf: 'center', color: colors.error }}>
                  {submitError}
                </Label>
              ) : null}
              <TouchableOpacity
                disabled={submitDisabled}
                onPress={handleSubmit}

                style={submitStyles}
              >
                {loading ? (
                  <ActivityIndicator color={colors.white} size={20} />
                ) : (
                    <Text style={styles.submitBtnText}>Login</Text>
                  )}
              </TouchableOpacity> */}
          </View>
        </ScrollView>
        {
          this.state.countryCodeVisible && country && country[APP_PARAMS.RES_PKT] != undefined &&
          <CommonAddressView
            title={`${translate('SELECT')} ${translate('COUNTRY')}`}
            data={country[APP_PARAMS.RES_PKT]}
            modalAddressVisible={this.state.countryCodeVisible}
            selectItem={(item) => this.onSelectCountryCode(item)}
            closePopOver={() => this.setState({ countryCodeVisible: !this.state.countryCodeVisible })}
          />
          // <CountryPicker
          //   withAlphaFilter
          //   withCallingCode
          //   //  withFilter
          //   visible={this.state.countryCodeVisible}
          //   onSelect={(item) => this.onSelectCountryCode(item)}
          //   onClose={() => this.setState({ countryCodeVisible: false })}
          // /> 
        }
        {/* {
                loading &&
                <Loader loader={true} />
              } */}
      </View>
    )
  }

}