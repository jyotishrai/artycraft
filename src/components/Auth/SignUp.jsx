import React from 'react'
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text, Image,
  TouchableOpacity,
  View, Dimensions, TextInput
} from 'react-native'
import { Form, Field } from 'react-final-form'
import Ripple from 'react-native-material-ripple';
import FormTextInput from '../FormTextInput'
import HeaderButton from '../HeaderButton'
import { showError, setupPushNotifications } from '../../NotificationService'
import styles from './styles'
import { colors } from '../../theme'
import { PROFILE, EMAIL, NEXT, CHECKMARK, CHECKMARK_GRAY, LOCK, MOBILE, DOWN_ARR } from '../../images'
import translate from '../../i18n/i18n';
import {
  APP_PARAMS, FONT_FAMILIY, DIMENS, nameRegex, emailRegex, passRegex, KEY, SCREENS
} from '../../constants'
import CommonHeader from '../../common/CommonHeader'
import CountryPicker, { getAllCountries, getCallingCode }
  from 'react-native-country-picker-modal';
  import { storeData, retrieveData } from '../../common/AsyncStorage'


import { showInfoToast } from '../../utility/Toast'
import CommonAddressView from '../../common/CommonAddressView';
import NavigationService from '../../NavigationService';


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
export default class SignUp extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      mobileNumber: '',
      isSelectTerms: false,
      isLoginPhone: true,
      submitError: undefined,
      countryCodeVisible: false,
      countryCode: '91',
      countryId: '101'
    }
  }
  componentDidMount() {
    //this.props.getAllCountryAPI()
  }
  static navigationOptions = ({ navigation }) => ({
    title: 'Enter to chat',
    header: (
      <CommonHeader
        back={true}
        backPress={() => navigation.goBack()}
        justifyContent={'center'}
        alignItems={'center'}
        height={(Dimensions.get('screen').height / 100) * 12} />
    ),
  })
  // Action
  countryCodePicker
  how = () => {
    this.setState({ countryCodeVisible: true })
  }
  onSelectCountryCode = (item) => {
    //alert('id:-' + JSON.stringify(item))
    this.setState({ countryCode: item[APP_PARAMS.PHONE_CODE], countryId: item[APP_PARAMS._id] })
    // this.setState({ countryCode: item.callingCode[0] })
  }

  validate = (values) => {
    console.log('values::--', values);
    let errors = undefined
    let isErrPresent = false
    if (!values.fullName) {
      errors = translate('NAME_EMPTY_ERR')
    } else if (values.fullName == '') {
      errors = translate('NAME_EMPTY_ERR')
    } else if (!nameRegex.test(values.fullName)) {
      errors = translate('NAME_INVALID_ERR')
    } else if (!values.email) {
      errors = translate('EMAIl_EMPTY_ERR')
    }
    else if (values.email == '') {
      errors = translate('EMAIl_EMPTY_ERR')
    } else if (!emailRegex.test(values.email)) {
      errors = translate('EMAIl_INVALID_ERR')
    } else if (!values.phone) {
      errors = translate('MOBILE_EMPTY_ERR')
    } else if (values.phone == '') {
      errors = translate('MOBILE_EMPTY_ERR')
    } else if (values.phone.length < 10) {
      errors = translate('MOBILE_INVALID_ERR')
    } else if (!values.password) {
      errors = translate('PASS_EMPTY_ERR')
    } else if (values.password == '') {
      errors = translate('PASS_EMPTY_ERR')
    } else if (!passRegex.test(values.password)) {
      errors = translate('PASS_STRONG_VALIDATION')
    } else if (values.password == '' || values.password.length < 6) {
      errors = translate('PASS_INVALID_ERR')
    }
    else if (!values.confrmPassword) {
      errors = translate('CONFRM_PASS_INVALID_ERR')
    } else if (values.confrmPassword !== values.password) {

      errors = translate('CONFRM_PASS_INVALID_ERR')
    }

    //  else {
    //   errors = translate('MOBILE_EMPTY_ERR')

    // }
    // if (values.username) {
    //   if (!/^(?=.{3,20}$)(?!.*([\s])\1{2})[\w\s]+$/.test(values.username)) {
    //     errors.username = this.USERNAME_HINT
    //   }
    // } else {
    //   errors.username = this.USERNAME_HINT
    // }
    // if (values.login.indexOf('@') > -1) {
    //   if (!nameRegex.test(values.login)) {
    //     errors.login = translate('NAME_INVALID_ERR')
    //   }
    // } else {
    //   if (!/^[a-zA-Z][\w\-\.]{1,48}\w$/.test(values.login)) {
    //     errors.login = this.LOGIN_HINT
    //   }
    // }
    if (errors != undefined && errors != '') {
      showInfoToast(errors)
    }
    return errors
  }

  submit = (data) => {

    const { SignUpAPI } = this.props
    if (!this.state.isSelectTerms) {
      showInfoToast(translate('AGREE_TERMS_CONDITION_VALID'))
    } else {
      let reqDatat = Object.assign({}, data);
      delete reqDatat.confrmPassword

      reqDatat[APP_PARAMS.COUNTRY_ID] = this.state.countryId
      SignUpAPI(reqDatat).then(result => {
        if (result != undefined) {
          if (result.hasOwnProperty(APP_PARAMS.DATA) && result[APP_PARAMS.DATA] != null) {
            result[APP_PARAMS.DATA][APP_PARAMS.CUSTOMER_ID] != undefined &&
              // this.props.navigation.replace('Otp',
              //   {
              //     [APP_PARAMS.CUSTOMER_ID]: result[APP_PARAMS.DATA][APP_PARAMS.CUSTOMER_ID],
              //     [APP_PARAMS.PHONE]: data[APP_PARAMS.PHONE],
              //     [APP_PARAMS.COUNTRY_ID]: this.state.countryId,
              //     [APP_PARAMS.PHONE_CODE]: '+' + this.state.countryCode,
              //     [KEY.IS_FROM]:SCREENS.SIGN_UP
              //   })
              this.props.navigation.navigate('Otp',
                {
                  [APP_PARAMS.CUSTOMER_ID]: result[APP_PARAMS.DATA][APP_PARAMS.CUSTOMER_ID],
                  [APP_PARAMS.PHONE]: data[APP_PARAMS.PHONE],
                  [APP_PARAMS.COUNTRY_ID]: this.state.countryId,
                  [APP_PARAMS.PHONE_CODE]: '+' + this.state.countryCode,
                  [KEY.IS_FROM]:SCREENS.SIGN_UP
                }
              )

            result[APP_PARAMS.MESSAGE] &&
              showInfoToast(result[APP_PARAMS.MESSAGE])
          } else {
            result[APP_PARAMS.MESSAGE] &&
              showInfoToast(result[APP_PARAMS.MESSAGE])
          }
        } else {
          showInfoToast(translate('MESSAGE_SERVER_ERROR'))
        }
      })
    }

    //this.validate(data)

    // signIn({ login }).then(result => {
    //   if (result && result.error) {
    //     if (result.error.toLowerCase().indexOf('unauthorized') > -1) {
    //       createUser({
    //         fullName: username.trim(),
    //         login: login.trim(),
    //         password: 'quickblox',
    //       }).then(userCreateAction => {
    //         if (userCreateAction && userCreateAction.error) {
    //           showError(
    //             'Failed to create user account',
    //             userCreateAction.error
    //           )
    //         } else {
    //           this.submit({ login, username })
    //         }
    //       })
    //     } else {
    //       showError('Failed to sign in', result.error)
    //     }
    //   } else {
    //     this.checkIfUsernameMatch(username, result.payload.user)
    //   }
    // })
  }

  checkIfUsernameMatch = (username, user) => {
    const { updateUser } = this.props
    const update = user.fullName !== username.trim() ?
      updateUser({ fullName: username, login: user.login }) :
      Promise.resolve()
    update.then(action => {
      if (action && action.error) {
        showError('Failed to update user', action.error)
      } else {
        this.connectAndRedirect()
      }
    })
  }
  skipPress = () => {
    storeData(KEY.AS_GUESt_USER, true)
    global[KEY.AS_GUESt_USER] = true
    NavigationService.clearStack('Drawer')
  }
  connectAndRedirect = () => {
    const { connectAndSubscribe, navigation } = this.props
    connectAndSubscribe().then(() => {
      setupPushNotifications()
      navigation.navigate('Chat')
    })
  }
  countryCodePickerShow = () => {
    this.setState({ countryCodeVisible: true })
  }
  
  renderForm = (formProps) => {
    const { handleSubmit, invalid, pristine, submitError } = formProps
    const { loading } = this.props
    const submitDisabled = pristine || invalid || loading
    const submitStyles = submitDisabled ?
      [styles.submitBtn, styles.submitBtnDisabled] :
      styles.submitBtn

    return (
      <View
        //behavior={Platform.select({ ios: 'padding' })}
        style={styles.topView}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          //contentContainerStyle={{ alignItems: 'center' }}
          style={[styles.scrollView, { borderTopLeftRadius: 20, borderTopRightRadius: 20, borderColor: 'white' }]}
        >

          <View style={{ flex: 1, paddingBottom: 10 }}>
            <View style={{ padding: DIMENS.px_15, marginTop: DIMENS.px_15 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Header style={{ color: colors.black, fontSize: DIMENS.px_15, fontWeight: 'bold', paddingVertical: 2, flex: .8 }}>{translate('SIGN_UP_TITLE')}</Header>
                <Ripple style={{ flexDirection: 'row', flex: .2, alignItems: 'baseline', justifyContent: 'flex-end' }} onPress={()=>this.skipPress()}>
                  <Text style={{ color: colors.primary, fontWeight: 'bold' }}>
                    {translate('SKIP')}
                  </Text>
                  <Image style={{ marginLeft: DIMENS.px_5, height: 15, width: 6, resizeMode: 'center' }} source={NEXT} />
                </Ripple>
              </View>
              <Header style={{ color: colors.label, fontSize: DIMENS.px_14, opacity: 0.6, }}>{translate('SIGN_UP_SUB_TITLE')}</Header>
            </View>
            <View style={styles.formControlView}>
              <Field
                activeStyle={styles.textInputActive}
                autoCapitalize="none"
                blurOnSubmit={false}
                placeholder={translate('PLACEHOLDER_NAME')}
                component={FormTextInput}
                imgSrc={PROFILE}
                editable={!loading}
                name="fullName"
                onSubmitEditing={() => this.emailRef.focus()}
                returnKeyType="next"
                style={styles.textInput}
                //textContentType="username"
                underlineColorAndroid={colors.transparent}
              />
            </View>
            <View style={styles.formControlView}>
              <Field
                activeStyle={styles.textInputActive}
                autoCapitalize="none"
                component={FormTextInput}
                imgSrc={EMAIL}
                editable={!loading}
                placeholder={translate('PLACEHOLDER_EMAIL_ID')}
                inputRef={_ref => this.emailRef = _ref}
                name="email"
                onSubmitEditing={() => this.mobileNoRef.focus()}
                returnKeyType="next"
                style={styles.textInput}
                underlineColorAndroid={colors.transparent}
              />
            </View>
            <View style={[styles.formControlWithoutWithView, {
              flexDirection: 'row', alignItems: 'center',
              borderColor: colors.lightGray, borderRadius: 4,
              borderWidth: 1, marginHorizontal: DIMENS.px_15, flex: 1
            }]}>
              <Ripple style={{
                flex: .15, flexDirection: 'row', alignItems: 'center',
                paddingVertical: DIMENS.px_10
              }}
                onPress={() => this.countryCodePickerShow()}>
                <Text style={{ color: colors.lightGrayClr, fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                  {'+' + this.state.countryCode}</Text>
                <Image source={DOWN_ARR} style={{ tintColor: colors.lightGrayClr, width: DIMENS.px_8, height: DIMENS.px_10, marginLeft: DIMENS.px_3, resizeMode: 'contain' }} />
              </Ripple>
              <Field
                activeStyle={styles.textInputActive}
                autoCapitalize="none"
                component={FormTextInput}
                placeholder={translate('PLACEHOLDER_MOBILE_NO')}
                // imgSrc={MOBILE}
                maxLength={10}
                editable={!loading}
                inputRef={_ref => this.mobileNoRef = _ref}
                name="phone"
                keyboardType={'phone-pad'}
                onSubmitEditing={() => this.passwordRef.focus()}
                returnKeyType="next"
                //style={styles.textInput}
                style={{ flex: 1 }}
                underlineColorAndroid={colors.transparent}
              />
            </View>
            <View style={styles.formControlView}>
              <Field
                activeStyle={styles.textInputActive}
                autoCapitalize="none"
                component={FormTextInput}
                placeholder={translate('PLACEHOLDER_PASSWRD')}
                secureTextEntry = {true}
                editable={!loading}
                imgSrc={LOCK}
                inputRef={_ref => this.passwordRef = _ref}
                name="password"
                onSubmitEditing={() => this.confirmPasswordRef.focus()}
                returnKeyType="next"
                style={styles.textInput}
                underlineColorAndroid={colors.transparent}
              />
            </View>
            <View style={styles.formControlView}>
              <Field
                activeStyle={styles.textInputActive}
                autoCapitalize="none"
                component={FormTextInput}
                placeholder={translate('PLACEHOLDER_CONFRM_PASSWRD')}
                editable={!loading}
                secureTextEntry = {true}
                imgSrc={LOCK}
                inputRef={_ref => this.confirmPasswordRef = _ref}
                name="confrmPassword"
                // onSubmitEditing={() => this.confirmPasswordRef.focus()}
                returnKeyType="done"
                style={styles.textInput}
                underlineColorAndroid={colors.transparent}
              />
            </View>

            {/*Agress Componet*/}

            <View style={{ marginTop: DIMENS.px_15, flexDirection: 'row', paddingHorizontal: DIMENS.px_15, alignItems: 'center' }}>

              <Ripple onPress={() => this.setState({ isSelectTerms: !this.state.isSelectTerms })}>
                {!this.state.isSelectTerms ?
                  <Image source={CHECKMARK_GRAY} style={{ width: DIMENS.px_18, height: DIMENS.px_18 }} />
                  : <Image source={CHECKMARK} style={{ width: DIMENS.px_18, height: DIMENS.px_18 ,tintColor:colors.primary}} />}
              </Ripple>
              <Text style={{ marginLeft: DIMENS.px_5, marginRight: DIMENS.px_1, color: colors.grayClr, fontSize: DIMENS.px_12 }}>
                {translate('AGREE_TERMS_CONDITION')}
              </Text>
              <Ripple onPress={()=>{
                                 this.props.appIsFromComingReq({ [APP_PARAMS.PAGE_TYPE]: KEY.TERMS_CONDITION })
                                 this.props.navigation.navigate(SCREENS.TERMS_CONDITION)
              }}>
                <Text style={{ color: colors.primary, opacity: 1.0, textDecorationLine: 'underline', fontSize: DIMENS.px_12 }}>
                  {translate('TERMS_CONDITION')}
                </Text>
              </Ripple>
            </View>



            {

              this.state.countryCodeVisible && global[KEY.COUNTRY_LIST] != undefined &&

              <CommonAddressView
                title={`${translate('SELECT')} ${translate('COUNTRY')}`}
                data={global[KEY.COUNTRY_LIST]}
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

            {submitError ? (
              <Label style={{ alignSelf: 'center', color: colors.error }}>
                {submitError}
              </Label>
            ) : null}
            <Ripple
              disabled={submitDisabled}
              onPress={handleSubmit}
              style={submitStyles}
            >
              {loading ? (
                <ActivityIndicator color={colors.white} size={35} style={{ padding: 10 }} />
              ) : (
                  <Text style={styles.submitBtnText}>
                    {translate('SIGN_UP')}
                  </Text>
                )}
            </Ripple>

          </View>
        </ScrollView>
      </View>
      // </KeyboardAvoidingView>
    )
  }

  render() {

    return (
      <Form
        onSubmit={this.submit}
        render={this.renderForm}
        validate={this.validate}
      />
    )
  }

}