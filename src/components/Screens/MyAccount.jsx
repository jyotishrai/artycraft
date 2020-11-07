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
import { connect } from 'react-redux'
import Ripple from 'react-native-material-ripple';
import styles from '../Auth/styles'
import { colors } from '../../theme';
import { EDIT, PROFILE_IMG, PROFILE, NEXT, EXIT } from '../../images'
import HeaderButton from '../HeaderButton'
import CommonHeaderHome from '../../common/CommonHeaderHome'
import translate from '../../i18n/i18n';
import CommonSearch from '../../common/CommonSearch';
import ImageSlider from 'react-native-image-slider';
import { DIMENS, FONT_FAMILIY, WIDTH, HEIGHT, KEY, APP_PARAMS,SCREEN, SCREENS } from '../../constants';
import { FlatList } from 'react-native-gesture-handler';
import CommonButton from '../../common/CommonButton';
import CommonProductRow, { CommonHorizontailList } from '../../common/CommonProductRow';
import CommonNavHeader from '../../common/CommonNavHeader';
import NavigationService from '../../NavigationService';
import { clearData } from '../../common/AsyncStorage'
import {
    logOutCall,changeIsFrom
} from '../../thunks'
import * as Toast from '../../utility/Toast'




class MyAccount extends React.Component {
    constructor(props) {
        super(props)
        this.focusMyAccountLisner = this.props.navigation.addListener('didFocus', this.onDidFocus);

        this.state = {
            profileData: [
                { title: translate('MY_ORDER'), subTitle: translate('MY_ORDER_SUB_TITLE'), btnTitle: translate('VIEW_ALL_ORDER') },
                { title: translate('My_CARD'), subTitle: translate('My_CARD_SUB_TITLE'), btnTitle: translate('VIEW_DETAIL') },
                { title: translate('My_REVIEW'), subTitle: translate('My_REVIEW_SUB_TITLE'), btnTitle: translate('VIEW_REVIWS') },
                { title: translate('My_ADDRESS'), subTitle: translate('My_ADDRESS_SUB_TITLE'), btnTitle: translate('VIEW More') },
                { title: translate('LOG_OUT') }
            ],
            address:"Please Add Address"
        }
    }

    componentDidMount(){
        
        if(global[KEY.USER_DATA]==undefined){
            changeIsFrom({[SCREEN.MY_ACCOUNT]:SCREEN.MY_ACCOUNT})
            this.props.navigation.navigate('Login_As_GUEST') 
        }
    }
    onDidFocus=()=>{
        console.warn("userData::--",this.props.userData);
        if(this.props.userData){
           if (this.props.userData[APP_PARAMS.ADDRESS]&&this.props.userData[APP_PARAMS.ADDRESS] != null){
            this.setState({address:`${this.props.userData[APP_PARAMS.ADDRESS][APP_PARAMS.APARTMENT_SUIT]},
            ${this.props.userData[APP_PARAMS.ADDRESS][APP_PARAMS.CITY]}, ${this.props.userData[APP_PARAMS.ADDRESS][APP_PARAMS.STATE]}`})
           }
        }

        // if(global[KEY.USER_DATA]&&global[KEY.USER_DATA][APP_PARAMS.ADDRESS]&&global[KEY.USER_DATA][APP_PARAMS.ADDRESS] != null){
        //    this.setState({address:`${global[KEY.USER_DATA][APP_PARAMS.ADDRESS][APP_PARAMS.APARTMENT_SUIT]},
        //      ${global[KEY.USER_DATA][APP_PARAMS.ADDRESS][APP_PARAMS.CITY]}, ${global[KEY.USER_DATA][APP_PARAMS.ADDRESS][APP_PARAMS.STATE]}`})
        // }
    }

    //Action
    goOnDetail = (item, index) => {
        switch (index) {
            case 0:
                this.props.navigation.navigate('MyOrder')
                break;
            case 1:
                this.props.navigation.navigate('MyCard')
                break;
            case 2:
                this.props.navigation.navigate('MyReview')
                break;

            default:
                this.props.navigation.navigate('MyAddress')
                break;
        }
    }
    logOut = () => {
        this.props.logOutUser({}).then((result) => {
                let data = {};
                if (result) {
                    if (result.hasOwnProperty(APP_PARAMS.SUCCESS) && result[APP_PARAMS.SUCCESS]) {
                        let success = result[APP_PARAMS.SUCCESS]
                        if(success){
                            NavigationService.clearStack('Auth')

                        }
                       if (result[APP_PARAMS.MESSAGE]) {
                            Toast.showErrorToast(result[APP_PARAMS.MESSAGE])
                        }
                    } else {
                        Toast.showErrorToast(translate('MESSAGE_SERVER_ERROR'))
                    }
                }
            
            // if (this.props.logoutSuccess!=undefined&&this.props.logoutSuccess) {
            //     NavigationService.clearStack('Auth')
            // }
        });
    }

    renderProfileData = (item, index) => {
        return (
            <View >
                <View style={{ flex: 1, padding: 10, flexDirection: index == this.state.profileData.length - 1 ? 'row' : 'column', alignItems: index == this.state.profileData.length - 1 ? 'center' : undefined }}>

                    {
                        index == this.state.profileData.length - 1 &&
                        <Ripple>
                            <Image source={EXIT} resizeMode={'center'} style={{ marginRight: DIMENS.px_5, width: DIMENS.px_20, height: DIMENS.px_25 }} />

                        </Ripple>
                    }
                    <Ripple disabled={index == this.state.profileData.length - 1 ? false : true}
                        onPress={() => index == this.state.profileData.length - 1 && this.logOut()}
                    >
                        <Text style={{ fontFamily: FONT_FAMILIY.Roboto_Medium, fontSize: DIMENS.txt_size_medium_14, color: colors.black }}>
                            {item.title}
                        </Text>
                    </Ripple>
                    {
                        index != this.state.profileData.length - 1 &&
                        <View>
                            <Text style={{ fontFamily: FONT_FAMILIY.Roboto_Regular, fontSize: DIMENS.txt_size_medium, color: colors.grayClr,textAlign:'left' }}>
                                {index==this.state.profileData.length-2?(this.state.address?this.state.address:''): item.subTitle}
                            </Text>
                            <Ripple onPress={() => this.goOnDetail(item, index)}>
                                <View style={{
                                    borderColor: colors.primary, borderWidth: DIMENS.px_1, marginTop: DIMENS.px_10,
                                    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: DIMENS.px_5, borderRadius: DIMENS.px_2, width: WIDTH * 40 / 100, minWidth: WIDTH * 37 / 100,
                                }}>
                                    <Text style={{ fontFamily: FONT_FAMILIY.Roboto_Regular, fontSize: DIMENS.txt_size_medium, color: colors.primary }}>
                                        {item.btnTitle}
                                    </Text>
                                    <Image source={NEXT} resizeMode={'center'} style={{ marginLeft: DIMENS.px_5 }} />
                                </View>
                            </Ripple>
                        </View>
                    }
                </View>
                <View style={{ width: '100%', backgroundColor: colors.lightGraytransparent, height: DIMENS.px_5 }} />
            </View>
        )
    }
    render() {
        let userData = this.props.userData && this.props.userData.data!=undefined ? this.props.userData.data :this.props.userData
        console.warn('user data:--',JSON.stringify(userData));
        
        return (
            <View style={{
                backgroundColor: colors.white,
                flex: 1, width: '100%'
            }}>
                <CommonNavHeader title={translate('SCREEN_MY_ACCOUNT')}
                    rightIcon2={EDIT}
                    cartPress={()=>this.props.navigation.navigate(SCREENS.EDIT_PROFILE)}
                    backPress={() => this.props.navigation.goBack()} />

                <ScrollView bounces={false} >
                    {/*Blue profile View*/}
                    <View style={{ backgroundColor: colors.primary, width: '100%', alignItems: 'center', paddingBottom: 20 }}>
                        <Image style={{ width: DIMENS.px_90, height: DIMENS.px_90, borderRadius: DIMENS.px_45, borderColor: colors.grayClr, borderWidth: .5 }}
                            //resizeMode={'center'}
                            source={PROFILE_IMG} />
                        <Text style={{ marginTop: DIMENS.px_10,marginBottom:DIMENS.px_5 ,color: colors.white, fontSize: DIMENS.txt_size_medium_1, fontFamily: FONT_FAMILIY.Roboto_Medium }}>
                            {userData!=undefined&&userData[APP_PARAMS.NAME]?userData[APP_PARAMS.NAME]:''}</Text>
                        {/* <Text style={{ color: colors.white, fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                            {this.props.userData!=undefined&&this.props.userData.data[APP_PARAMS.PHONE]}</Text> */}
                        <Text style={{ color: colors.white, fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                            {userData!=undefined&&userData[APP_PARAMS.EMAIL]}</Text>
                    </View>
                    {/* List Info */}

                    <View>
                        {
                            this.state.profileData != undefined && this.state.profileData.length > 0 &&
                            <FlatList

                                data={this.state.profileData}
                                renderItem={({ item, index }) => this.renderProfileData(item, index)}
                                extraData={this.state}
                                keyExtractor={(item,index) => index.toString()} />
                        }
                    </View>
                </ScrollView>


            </View>
        )
    }
}

const mapStateToProps = ({ AppUsers }) => ({
    loading: AppUsers.loading,
    isFromApp: AppUsers.isFromApp,
    userData: AppUsers.data,
    logoutSuccess: AppUsers.logoutSuccess,
})

const mapDispatchToProps = {
    logOutUser: logOutCall,
    changeIsFrom:changeIsFrom,
}
export default connect(mapStateToProps, mapDispatchToProps)(MyAccount)