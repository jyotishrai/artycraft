import React from 'react'
import {
    ActivityIndicator,
    KeyboardAvoidingView,
 
    ScrollView,
    Text, Image,
    TouchableOpacity, FlatList,
    View, Dimensions, TextInput
} from 'react-native'
import Ripple from 'react-native-material-ripple';
import styles from '../Auth/styles'
import { colors } from '../../theme';
import { NOTIFICATION, HEART, SEARCH, ORDER, PROFILE_IMG } from '../../images'
import HeaderButton from '../HeaderButton'
import translate from '../../i18n/i18n';
import { DIMENS, FONT_FAMILIY, WIDTH, HEIGHT, CURRENCY, KEY, APP_PARAMS, SCREENS } from '../../constants';
import Basecomponents from '../../common/BaseComponent';
import CommonNavHeader from '../../common/CommonNavHeader';
import { CommonBillingView, CommonMyOrder } from '../../common/CommonProductRow';
import { Dropdown } from 'react-native-material-dropdown';
import { TextField } from 'react-native-material-textfield';
import Loader from '../../common/Loader';
import * as Toast from '../../utility/Toast'
import * as AsyncStorage from '../../common/AsyncStorage'

export default class EditProfile extends Basecomponents {

    constructor(props) {
        super(props)
        this.emailRef = undefined;
        this.nameRef = undefined;
        this.state = {
            name: global[KEY.USER_DATA]&&global[KEY.USER_DATA][APP_PARAMS.NAME],
            mobileNo: global[KEY.USER_DATA]&&global[KEY.USER_DATA][APP_PARAMS.PHONE],
            emailId: global[KEY.USER_DATA]&&global[KEY.USER_DATA][APP_PARAMS.EMAIL], 
        }
    }
    componentDidMount() {
        console.log("user data response::--didmount",JSON.stringify(global[KEY.USER_DATA]));

    }
    goBackUpdateEmail=()=>{
        this.setState({name:global[KEY.USER_DATA]&&global[KEY.USER_DATA][APP_PARAMS.NAME],
        emailId:global[KEY.USER_DATA]&&global[KEY.USER_DATA][APP_PARAMS.EMAIL]})
    }
  
    submitBtnClk=()=>{
        this.emailRef.focus&&this.emailRef.blur()
        this.nameRef.focus&&this.nameRef.blur()
        if(global[KEY.USER_DATA][APP_PARAMS.NAME]!==this.state.name&&
            global[KEY.USER_DATA][APP_PARAMS.EMAIL]===this.state.emailId){
                let data = {
                    [APP_PARAMS.CUSTOMER_ID]:global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID],
                    [APP_PARAMS.EMAIL]:this.state.emailId,
                    [APP_PARAMS.FULL_NAME]:this.state.name,
                }
            this.props.updateProfileAPi(data).then(result=>{
                this.responseAPI(result)
            })
        }else if(global[KEY.USER_DATA][APP_PARAMS.EMAIL]!==this.state.emailId){
            let data = {
                [APP_PARAMS.PHONE]:global[KEY.USER_DATA]&&global[KEY.USER_DATA][APP_PARAMS.PHONE]
            }
           this.props.otpFromMobile(data,true).then(response=>{
               this.responseAPI(response,true)
           })
           
           
             
        }else{
            Toast.showInfoToast('Nothing to change data for update user profile')
        }
    }

    onChangePassClick = () => {
        this.props.navigation.navigate(SCREENS.CHANGE_PASSWORD)
    }
  
    responseAPI = (result,otpVerify) => {
        if (result) {
            if (result.hasOwnProperty(APP_PARAMS.SUCCESS) && result[APP_PARAMS.SUCCESS]) {
                if(otpVerify){
                    if(result.hasOwnProperty(APP_PARAMS.DATA)){
                        console.warn("user data response::--",JSON.stringify(global[KEY.USER_DATA]));

                    let navParams = {
                        [APP_PARAMS.PHONE]: this.state.mobileNo,
                        [APP_PARAMS.COUNTRY_ID]: global[KEY.USER_DATA][APP_PARAMS.COUNTRY_ID], isFrom: SCREENS.EDIT_PROFILE,
                        [APP_PARAMS.CUSTOMER_ID]: global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID],
                        [APP_PARAMS.PHONE_CODE]:'+91',
                        [APP_PARAMS.EMAIL]:this.state.emailId,
                        [APP_PARAMS.FULL_NAME]:this.state.name,
                         goBackUpdateEmail:()=>this.goBackUpdateEmail()
                      };
                     this.props.navigation.navigate('Otp', navParams)
                    }
                }else{
                if(result.hasOwnProperty(APP_PARAMS.DATA)){
                    console.log('data of update profile',JSON.stringify(result));
                    global[KEY.USER_DATA][APP_PARAMS.EMAIL] = this.state.emailId
                    global[KEY.USER_DATA][APP_PARAMS.NAME] = this.state.name
                    AsyncStorage.storeData(KEY.USER_DATA, global[KEY.USER_DATA])
                    this.props.savUserOnEdit(global[KEY.USER_DATA])
                }
            }
            if (result[APP_PARAMS.MESSAGE]) {
                 Toast.showSuccessToast(result[APP_PARAMS.MESSAGE])
                }
            } else {
                Toast.showErrorToast(translate('MESSAGE_SERVER_ERROR'))
            }
        }
    }

    render() {
        const {loading,data} = this.props
        // if(data){
        //     this.responseAPI(data)
        // }
        
        return (
            <View style={{ flex: 1 }}>
                <CommonNavHeader 
                    backPress={() => this.props.navigation.goBack()} />
                <ScrollView contentContainerStyle={{}} bounces={false} keyboardShouldPersistTaps='always'>
                    <View>
                        {/* Image View*/}
                        <View style={{ backgroundColor: colors.primary, width: '100%', alignItems: 'center', justifyContent: 'center', paddingBottom: 20, height: HEIGHT * 22 / 100 }}>
                            <Image style={{ width: DIMENS.px_90, height: DIMENS.px_90, borderRadius: DIMENS.px_45, borderColor: colors.grayClr, borderWidth: .5,marginTop:-DIMENS.px_10 }}
                                source={PROFILE_IMG} />
                        </View>
                        {/*Edit View*/}
                        <View style={{paddingHorizontal:DIMENS.px_10}}>
                            <TextField style={{}}
                                ref={(refs)=>this.nameRef=refs}
                                tintColor={colors.primary}
                                label={translate('NAME')}
                                value={this.state.name}
                                onChangeText={(text) => { this.setState({ name: text }) }}
                                onSubmitEditing={()=>this.emailRef.focus()}
                                returnKeyType='next'

                            />
                            <TextField style={{}}
                                ref={(refs)=>this.emailRef=refs}
                                tintColor={colors.primary}
                                label={translate('EMAIL_ID')}
                                value={this.state.emailId}
                                onChangeText={(text) => { this.setState({ emailId: text }) }}
                            />
                            <TextField style={{}}
                                editable={false}
                                tintColor={colors.primary}
                                label={translate('PLACEHOLDER_MOBILE_NO')}
                                value={this.state.mobileNo}
                            />
                       </View>
                       {/*Submit button*/}
                       <View style={{ marginTop: DIMENS.px_5, width: '100%' }}>
                            {
                                  !loading ?
                                <Ripple style={styles.submitBtn} onPress={()=>this.submitBtnClk()}>
                                <Text style={[styles.submitBtnText]}>
                                    {translate('SUBMIT')}
                                </Text>
                            </Ripple>:
                            <View style={styles.submitBtn}>
                            <ActivityIndicator color={colors.white} size={30} style={{ padding: 8 }} />
                            </View>
                            }
                        </View>
                        {/*Change button*/}
                       <View style={{  width: '100%' }}>
                            <Ripple style={[styles.submitBtn,{marginTop:DIMENS.px_5,}]}
                             onPress={() => this.onChangePassClick() } >
                                <Text style={[styles.submitBtnText]}>
                                    {translate('CHANGE_PASSWORD')}
                                </Text>
                            </Ripple>
                        </View>
                    </View>
                </ScrollView>
            {/* {
                loading &&
                <Loader loader={loading}/>
            } */}
            </View>
        )
    }
}