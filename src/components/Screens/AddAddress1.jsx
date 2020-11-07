import React from 'react'
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    PermissionsAndroid, Platform,
    ScrollView,
    Text, Image,
    TouchableOpacity, FlatList,
    View, Dimensions, TextInput, Picker
} from 'react-native'
import Ripple from 'react-native-material-ripple';
import styles from '../Auth/styles'
import { colors } from '../../theme';
import { NOTIFICATION, HEART, SEARCH, ORDER, CURNTLOC, RADIO_POINT, CIRCLE } from '../../images'
import HeaderButton from '../HeaderButton'
import translate from '../../i18n/i18n';
import { DIMENS, FONT_FAMILIY, WIDTH, HEIGHT, CURRENCY, APP_PARAMS, KEY, nameRegex, CONST, SCREENS } from '../../constants';
import Basecomponents from '../../common/BaseComponent';
import CommonNavHeader from '../../common/CommonNavHeader';
import { TextField } from 'react-native-material-textfield';
import Geolocation from '@react-native-community/geolocation';
import AddressDialog from '../Dialogs/AddressDialog';
import { Dropdown, DropDownList } from 'react-native-material-dropdown';
import * as Toast from '../../utility/Toast'
import * as Utils from '../../utility/Utils'
import CommonDropDown from '../../common/CommonDropDown';
import CommonAddressView from '../../common/CommonAddressView';
import LocationSearch from './LocationSearch';
import Loader from '../../common/Loader';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';




export default class AddAddress extends Basecomponents {
    constructor(props) {
        super(props)
        this.addressIsFrom=undefined;
        this.editData = this.props.navigation.state != undefined && this.props.navigation.state.params != undefined &&
            this.props.navigation.state.params.item && this.props.navigation.state.params.item
        this.pinRef = this.editData ? this.editData[APP_PARAMS.POSTAL_CODE] : undefined;
        this.houseRef = this.editData ? this.editData[APP_PARAMS.STREET_ADDRESS] : undefined;
        this.areaRef = this.editData ? this.editData[APP_PARAMS.APARTMENT_SUIT] : undefined;
        this.cityRefrence = this.editData ? this.editData[APP_PARAMS.CITY] : undefined;
        this.stateRef = this.editData ? this.editData[APP_PARAMS.STATE] : undefined;
        this.landmarkRef = this.editData ? this.editData[APP_PARAMS.LANDMARK] : undefined;
        this.nameRef = this.editData ? this.editData[APP_PARAMS.NAME] : undefined;
        this.mobileRef = this.editData ? this.editData[APP_PARAMS.PHONE] : undefined;
        this.altrnateNoRef = this.editData ? this.editData[APP_PARAMS.ALTER_NATE_PHONE] : undefined;
        this.formateAddress = undefined;
        this.stateId = this.editData ? this.editData[APP_PARAMS.STATE_ID] : undefined;
        this.cityId = this.editData ? this.editData[APP_PARAMS.CITY_ID] : undefined;
        this.countryId = this.editData ? this.editData[APP_PARAMS.COUNTRY_ID] : undefined;

        console.log('serach datat:-', JSON.stringify(this.editData));

        this.state = {
            isSelectHome:
                this.editData && this.editData[APP_PARAMS.ADDRESS_TYPE] != undefined &&
                    (this.editData[APP_PARAMS.ADDRESS_TYPE] == APP_PARAMS.HOME) ? true : false,
            addressDilog: false,
            addressData: undefined, pinStare: '',
            showCurrentLocView: false,
            country: undefined,
            isShowModal: false,
            pinTxtField: this.editData ? this.editData[APP_PARAMS.POSTAL_CODE] : '',
            houseTxtField: this.editData ? this.editData[APP_PARAMS.STREET_ADDRESS] : '',
            areaTxtField: this.editData ? this.editData[APP_PARAMS.APARTMENT_SUIT] : '',
            cityTxtField: this.editData ? this.editData[APP_PARAMS.CITY] : '',
            stateTxtField: this.editData ? this.editData[APP_PARAMS.STATE] : '',
            landMarkTxtField: this.editData ? this.editData[APP_PARAMS.LANDMARK] : '',
            nameTxtField: this.editData && this.editData[APP_PARAMS.FIRST_NAME] != undefined ?
                this.editData[APP_PARAMS.FIRST_NAME] : '',
            mobileTxtFiled: this.editData ? this.editData[APP_PARAMS.PHONE] : '',
            altenatTxtField: this.editData ? this.editData[APP_PARAMS.ALTER_NATE_PHONE] : '',
            isState: false,
            addressSerachArr: undefined,
            positionOfDrpDown: undefined
        }
    }
    componentDidMount() {
        var that = this;
        if (Platform.OS === 'ios') {
            this.callLocation(that);
            this.setState({addressDilog:true})
        } else {
            async function requestLocationPermission() {
                RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({ interval: 10000, fastInterval: 5000 })
                    .then(async(data) => {
                       // alert('location:-',JSON.stringify(data))

                        try {
                            const granted = await PermissionsAndroid.request(
                                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
                                'title': 'Location Access Required',
                                'message': 'This App needs to Access your location'
                             }
                            )
                     
                            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                                //To Check, If Permission is granted
                              
                                that.callLocation(that);
                                this.setState({addressDilog:true})
                            } else {
                                alert("Permission Denied");
                            }
                        } catch (err) {
                            alert("Permission error"+ err);
                            //console.warn(err)
                        }
                        // The user has accepted to enable the location services
                        // data can be :
                        //  - "already-enabled" if the location services has been already enabled
                        //  - "enabled" if user has clicked on OK button in the popup
                    }).catch(err => {
                        alert('location:-'+JSON.stringify(err))

                        // The user has not accepted to enable the location services or something went wrong during the process
                        // "err" : { "code" : "ERR00|ERR01|ERR02", "message" : "message"}
                        // codes : 
                        //  - ERR00 : The user has clicked on Cancel button in the popup
                        //  - ERR01 : If the Settings change are unavailable
                        //  - ERR02 : If the popup has failed to open
                    });

              
            }
            requestLocationPermission();
        }

        this.getAllState()
        if (this.stateId) {
            this.getAllCity(this.stateId)
        }
    }
    componentWillUnmount = () => {
        Geolocation.clearWatch(this.watchID);
    }

    //Action
    callLocation(that) {
        //alert("callLocation Called");
        Geolocation.getCurrentPosition(
            //Will give you the current location
            (position) => {
                console.log('position::--', position);

                const currentLongitude = JSON.stringify(position.coords.longitude);
                //getting the Longitude from the location json
                const currentLatitude = JSON.stringify(position.coords.latitude);
                //getting the Latitude from the location json
                //Setting state Longitude to re re-render the Longitude Text
                that.setState({ currentLongitude: currentLongitude ,currentLatitude: currentLatitude });
                //Setting state Latitude to re re-render the Longitude Text

                this.getGeoLocation({
                    [APP_PARAMS.LAT]: currentLatitude,
                    [APP_PARAMS.LNG]: currentLongitude
                })
            
            },
            (error) => alert(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
        that.watchID = Geolocation.watchPosition((position) => {
            //Will give you the location on location change
            console.log('position::--watch', position);
            const currentLongitude = JSON.stringify(position.coords.longitude);
            //getting the Longitude from the location json
            const currentLatitude = JSON.stringify(position.coords.latitude);
            //getting the Latitude from the location json
            that.setState({ currentLongitude: currentLongitude ,currentLatitude: currentLatitude });
            //Setting state Longitude to re re-render the Longitude Text
           // that.setState({ currentLatitude: currentLatitude });
            //Setting state Latitude to re re-render the Longitude Text
        });
    }
    selectAddrssType = () => {
        this.setState({ isSelectHome: !this.state.isSelectHome })
    }
    showCurrentADdressView = () => {
        const { data, error } = this.props
        console.warn('data::--', JSON.stringify(data));

        if (data != undefined) {
            this.formateAddress = data[APP_PARAMS.FORMATED_ADDRESS]
            this.setState({ showCurrentLocView: true })
        }
    }
    setAddress = (flag) => {
        const { data, error } = this.props

        if (data != undefined) {
            this.setState({ addressData: data })
            this.pinRef.setValue(data[APP_PARAMS.POSTAL_CODE])
            this.cityRefrence.setValue(data[APP_PARAMS.CITY_LONG_NAME])
            this.stateRef.setValue(data[APP_PARAMS.STATE_LONG_NAME])
            this.setState({
                pinTxtField: data[APP_PARAMS.POSTAL_CODE],
                cityTxtField: data[APP_PARAMS.CITY_LONG_NAME], stateTxtField: data[APP_PARAMS.STATE_LONG_NAME],
            })


            let stateData = this.responseAPI(this.props.state)
            if (stateData != undefined && stateData.length > 0) {
                stateData.forEach(element => {
                    if (element.name == data[APP_PARAMS.STATE_LONG_NAME]) {
                        this.stateId = element.id,
                            this.countryId = element.countryId
                        this.props.getAllCityAPI(this.stateId).then(result => {
                            let dataCity = this.responseAPI(result)
                            if (dataCity && dataCity.length > 0) {
                                dataCity.forEach(dataElt => {
                                    if (dataElt.name == data[APP_PARAMS.CITY_LONG_NAME]) {
                                        this.cityId = dataElt.id
                                    }
                                })
                            }
                        })
                        return;
                    }
                });
            }


            if (flag != 'default') {
                this.areaRef.setValue(data[APP_PARAMS.FORMATED_ADDRESS])
                this.setState({ showCurrentLocView: false, areaTxtField: data[APP_PARAMS.FORMATED_ADDRESS] })
            }
        }

    }
    showAddressModal = (isState) => {
        if (!isState) {
            if (this.stateId == undefined) {
                Toast.showInfoToast(translate('SELECT_STATE'))
                return;
            }
        }
        this.setState({ isShowModal: true, isState: isState })
    }
    addAddressOrUpdate = () => {
        if (this.state.pinTxtField == '') {
            Toast.showInfoToast(translate('ENTER_PIN_NUMBER'))
            return;
        } if (this.state.pinTxtField.length < 6) {
            Toast.showInfoToast(translate('ENTER_VALID_PIN_NUMBER'))
            return;
        } else if (this.state.houseTxtField.trim() == '') {
            Toast.showInfoToast(translate('ENTER_HOUSE_NUMBER'))
            return;
        } else if (this.state.areaTxtField.trim() == '') {
            Toast.showInfoToast(translate('ENTER_AREA'))
            return;
        } else if (this.state.stateTxtField == '') {
            Toast.showInfoToast(translate('SELECT_STATE'))
            return;
        } else if (this.state.cityTxtField == '') {
            Toast.showInfoToast(translate('SELECT_CITY'))
            return;
        } else if (this.state.nameTxtField.trim() == '') {
            Toast.showInfoToast(translate('NAME_EMPTY_ERR'))
            return;
        } else if (this.state.mobileTxtFiled == '') {
            Toast.showInfoToast(translate('MOBILE_EMPTY_ERR'))
            return;
        } else if (this.state.mobileTxtFiled.length < 10) {
            Toast.showInfoToast(translate('MOBILE_INVALID_ERR'))
            return;
        }
        let dataReq = {
            [APP_PARAMS.U_UID]: this.editData != undefined && this.editData[APP_PARAMS.U_UID],//"InEditCase-addressId",.
            [APP_PARAMS.PHONE]: this.state.mobileTxtFiled,
            [APP_PARAMS.ALTER_NATE_PHONE]: this.state.altenatTxtField,
            [APP_PARAMS.STATE_ID]: this.stateId,
            [APP_PARAMS.CITY_ID]: this.cityId,
            [APP_PARAMS.COUNTRY_ID]: this.countryId,
            [APP_PARAMS.POSTAL_CODE]: this.state.pinTxtField,
            [APP_PARAMS.LANDMARK]: this.state.landMarkTxtField,
            [APP_PARAMS.STREET_ADDRESS]: this.state.houseTxtField,
            [APP_PARAMS.APARTMENT_SUIT]: this.state.areaTxtField,
            [APP_PARAMS.ADDRESS_TYPE]: this.state.isSelectHome ? APP_PARAMS.HOME : APP_PARAMS.WORK,
            [APP_PARAMS.FIRST_NAME]: this.state.nameTxtField,
        }
        // console.warn('address:::-->>>0',JSON.stringify(dataReq))
        this.props.addAddressUpdateApi(dataReq)
    }
    onSelectStateOrCityCode = (item, isState) => {
        if (isState) {
            this.stateRef.setValue(item[APP_PARAMS.NAME])
            this.setState({ stateTxtField: item[APP_PARAMS.NAME] })
            this.stateId = item[APP_PARAMS._id]
            this.getAllCity(this.stateId)
        } else {
            this.cityId = item[APP_PARAMS._id]
            this.cityRefrence.setValue(item[APP_PARAMS.NAME])
            this.setState({ cityTxtField: item[APP_PARAMS.NAME] })
        }
    }

    getPositionOfView = (event) => {
        var { x, y, width, height } = event.nativeEvent.layout;
        this.setState({ positionOfDrpDown: y + height }, () => {
            //   console.warn('position of drop down:---',this.state.positionOfDrpDown);

        })
    }
    goBackSearch = (item) => {
        console.warn('item::--',item)

        this.areaRef.setValue(item)
       // let { current: field } = this.areaRef;

        this.setState({ areaTxtField: item },()=>
        console.warn('areaTxtField::--',this.state.areaTxtField,'value',this.areaRef.value())
        )
    }
    serachLocation=()=>{
      this.areaRef.blur()
      this.props.navigation.navigate("LocationSearch", 
         { goBackSearch: (item) => this.goBackSearch(item)}
      )
    }
    //API FUNCTION:--

    getGeoLocation = (reqObj) => {
     const { geoLocationAPI } = this.props
      geoLocationAPI(reqObj).then(result => {
        console.log('result::--->>', result);
       })
    }
    getAllState = () => {
        console.warn('state:--',global[KEY.USER_DATA]);
        if (global[KEY.USER_DATA] != undefined && global[KEY.USER_DATA][APP_PARAMS.COUNTRY_ID]!=undefined) {
            this.countryId = this.countryId != undefined ? this.countryId : global[KEY.USER_DATA][APP_PARAMS.COUNTRY_ID]
            this.props.getAllStateAPI(global[KEY.USER_DATA][APP_PARAMS.COUNTRY_ID])
        }
    }
    getAllCity = (id) => {
        this.props.getAllCityAPI(id)
    }

    //RESPONSE:--

    responseAPI = (result, isADDEdit) => {
        let data = {};
        if (result) {
            if (result.hasOwnProperty(APP_PARAMS.SUCCESS) && result[APP_PARAMS.SUCCESS]) {
                if (isADDEdit) {
                    if (result[APP_PARAMS.MESSAGE]) {
                        Toast.showErrorToast(result[APP_PARAMS.MESSAGE])
                        this.props.cleaData()
                        console.warn('address:-list',JSON.stringify(this.addressIsFrom));

                        if(this.addressIsFrom!=undefined){
                            if(this.addressIsFrom[CONST.IS_FROM]==[SCREENS.CATEGORY_SUB_DETAIL]){
                                this.props.navigation.replace(SCREENS.ORDER_SUMMARY)
                            }
                        }else{
                            alert('result'+JSON.stringify(result))
                            this.props.navigation.state.params.goBackAdress(result.data)
                            this.props.navigation.goBack()
                        }
                    }
                } else {
                    if (result.hasOwnProperty(APP_PARAMS.RES_PKT) && result[APP_PARAMS.RES_PKT] != null && result[APP_PARAMS.RES_PKT].length > 0) {
                        data = result[APP_PARAMS.RES_PKT]
                    }
                }
                return data
            } else if (result[APP_PARAMS.MESSAGE]) {
                Toast.showErrorToast(result[APP_PARAMS.MESSAGE])
            }
        } else {
            Toast.showErrorToast(translate('MESSAGE_SERVER_ERROR'))
        }
    }

    //render:--

    render() {
        const { loading, state, city, dataOfAdrs,addressIsFrom } = this.props
        let stateData = undefined
        let cityData = undefined
        console.warn('address:-render',this.state.areaTxtField);
        
        this.addressIsFrom = addressIsFrom;
        if (state) { stateData = this.responseAPI(state) }
        if (city) { cityData = this.responseAPI(city) }
        if (dataOfAdrs) {
            console.log('dataOfAdrs response:--', JSON.stringify(dataOfAdrs));
            let data = this.responseAPI(dataOfAdrs, true)
        }

        this.state.addressData != undefined &&
            console.log('address::---currentAddress', this.state.addressData[APP_PARAMS.FORMATED_ADDRESS]);

        //console.warn('stateTxtField:-->>>',  this.state.stateTxtField) 

        return (
            <View style={{ flex: 1 }}>
                <CommonNavHeader title={translate('SCREEN_ADD_ADDRESS')}
                    backPress={() => this.props.navigation.goBack()} />
                <ScrollView  >
                    <View>
                        <View style={{
                            borderColor: colors.lightGrayText,
                            borderWidth: DIMENS.px_1, padding: DIMENS.px_15, elevation: 3,

                        }}>
                            <Ripple style={{ flexDirection: 'row', alignItems: 'center' }}
                                onPress={() => this.showCurrentADdressView()}>
                                <Image source={CURNTLOC} style={{ width: DIMENS.px_22, height: DIMENS.px_22 }} />
                                <Text style={{ marginHorizontal: DIMENS.px_10, fontFamily: FONT_FAMILIY.Roboto_Medium, fontSize: DIMENS.txt_size_large_extra, color: colors.primary }}>
                                    {translate('USE_CURRENT_LOC')}</Text>
                            </Ripple>
                            <Ripple style={{}} >
                                <Text style={{
                                    marginHorizontal: DIMENS.px_32, fontFamily: FONT_FAMILIY.Roboto_Regular,
                                    fontSize: DIMENS.txt_size_medium, color: colors.lightGrayClr, marginTop: DIMENS.px_5
                                }}>
                                    {translate('TAP_TO_AUTO_FILL')}</Text>
                            </Ripple>
                        </View>

                        {
                            <View style={{
                                paddingBottom: DIMENS.px_20, paddingHorizontal: DIMENS.px_15,
                                borderBottomWidth: DIMENS.px_5, borderBottomColor: colors.lightGraytransparent
                            }}>
                                <TextField
                                    ref={(r) => this.pinRef = r}
                                    label={translate('PIN_CODE') + translate('REQ_ASTRIC')}
                                    keyboardType='numeric'
                                    maxLength={6}
                                    tintColor={colors.primary}
                                    lineWidth={0.3}
                                    style={{ fontFamily: FONT_FAMILIY.Roboto_Regular, fontSize: DIMENS.txt_size_medium }}
                                    returnKeyType='next'
                                    onFocus={this.onFocus}
                                    value={this.state.pinTxtField}
                                    onChangeText={(txt) => this.setState({ pinTxtField: txt })}
                                    onSubmitEditing={() => this.houseRef.focus()}

                                />
                                <TextField
                                    ref={(r) => this.houseRef = r}
                                    label={translate('HOUSE_BUILD') + translate('REQ_ASTRIC')}
                                    keyboardType='default'
                                    tintColor={colors.primary}
                                    lineWidth={0.3}
                                    returnKeyType='next'
                                    onFocus={this.onFocus}
                                    value={this.state.houseTxtField}
                                    onChangeText={(txt) => this.setState({ houseTxtField: txt })}
                                    onSubmitEditing={() => this.areaRef.focus()}
                                />
                                <TextField
                                    ref={(r) => this.areaRef = r}
                                    label={translate('ROAD_AREA') + translate('REQ_ASTRIC')}
                                    keyboardType='default'
                                    tintColor={colors.primary}
                                    lineWidth={0.3}
                                    returnKeyType='done'
                                    value={this.state.areaTxtField}
                                    //onFocus={this.onFocus}
                                     onFocus={() => this.serachLocation() }
                                   // onChangeText={(txt) => this.props.navigation.navigate("LocationSearch", { goBackSearch: (item) => this.goBackSearch(item) })}
                                    onSubmitEditing={() => this.stateRef.focus()}
                                    onLayout={(event) => this.getPositionOfView(event)}
                                />
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>

                                    <TextField
                                        ref={(r) => this.stateRef = r}
                                        label={translate('STATE') + translate('REQ_ASTRIC')}
                                        keyboardType='default'
                                        tintColor={colors.primary}
                                        lineWidth={0.3}
                                        returnKeyType='next'
                                        value={this.state.stateTxtField}
                                        containerStyle={{ width: '50%', }}
                                        onFocus={() => this.showAddressModal(true)}
                                        //onChangeText={(txt)=>this.setState({stateTxtField:txt})}   
                                        onSubmitEditing={() => this.cityRefrence.focus()}
                                    />
                                    <TextField
                                        ref={(r) => this.cityRefrence = r}
                                        value={this.state.cityTxtField}
                                        label={translate('CITY') + translate('REQ_ASTRIC')}
                                        keyboardType='default'
                                        tintColor={colors.primary}
                                        lineWidth={0.3}
                                        containerStyle={{ width: '40%' }}
                                        returnKeyType='next'
                                        onFocus={() => this.showAddressModal(false)}
                                        //  onChangeText={(txt)=>this.setState({cityTxtField:txt})}
                                        onSubmitEditing={() => this.landmarkRef.focus()}

                                    />

                                </View>
                                <TextField
                                    ref={(r) => this.landmarkRef = r}
                                    label={`${translate('LANDMARK')}(${translate('OPTIONAL')})`}
                                    keyboardType='default'
                                    tintColor={colors.primary}
                                    lineWidth={0.3}
                                    returnKeyType='next'
                                    onFocus={this.onFocus}
                                    value={this.state.landMarkTxtField}
                                    onSubmitEditing={() => this.nameRef.focus()}
                                    onChangeText={(txt) => this.setState({ landMarkTxtField: txt })}
                                />
                            </View>

                        }

                        {
                            //SECOND//
                            <View style={{
                                paddingBottom: DIMENS.px_20, paddingHorizontal: DIMENS.px_15,
                                borderBottomWidth: DIMENS.px_5, borderBottomColor: colors.lightGraytransparent
                            }}>
                                <TextField
                                    ref={(r) => this.nameRef = r}
                                    label={translate('NAME') + translate('REQ_ASTRIC')}
                                    maxLength={6}
                                    tintColor={colors.primary}
                                    lineWidth={0.3}
                                    style={{ fontFamily: FONT_FAMILIY.Roboto_Regular, fontSize: DIMENS.txt_size_medium }}
                                    returnKeyType='next'
                                    onFocus={this.onFocus}
                                    value={this.state.nameTxtField}
                                    onSubmitEditing={() => this.mobileRef.focus()}
                                    onChangeText={(txt) => this.setState({ nameTxtField: txt })}
                                />
                                <TextField
                                    ref={(r) => this.mobileRef = r}
                                    label={translate('PLACEHOLDER_DIGIT_MOBILE_NO') + translate('REQ_ASTRIC')}
                                    keyboardType='numeric'
                                    maxLength={10}
                                    tintColor={colors.primary}
                                    lineWidth={0.3}
                                    returnKeyType='next'
                                    onFocus={this.onFocus}
                                    value={this.state.mobileTxtFiled}
                                    onSubmitEditing={() => this.altrnateNoRef.focus()}
                                    onChangeText={(txt) => this.setState({ mobileTxtFiled: txt })}
                                />
                                <TextField
                                    ref={(r) => this.altrnateNoRef = r}
                                    label={`${translate('PLACEHOLDER_ALERNATE_PHONE_NO')}(${translate('OPTIONAL')})`}
                                    keyboardType='default'
                                    tintColor={colors.primary}
                                    lineWidth={0.3}
                                    returnKeyType='done'
                                    value={this.state.altenatTxtField}
                                    onSubmitEditing={() => this.altrnateNoRef.blur()}
                                    onChangeText={(txt) => this.setState({ altenatTxtField: txt })}
                                />
                            </View>
                        }
                        {
                            //THIRD//
                            <View style={{
                                paddingBottom: DIMENS.px_20, paddingHorizontal: DIMENS.px_15, paddingTop: DIMENS.px_10,
                                borderBottomWidth: DIMENS.px_5, borderBottomColor: colors.lightGraytransparent
                            }}>
                                <Text style={{
                                    color: colors.grayClr, fontSize: DIMENS.txt_size_medium,
                                    fontFamily: FONT_FAMILIY.Roboto_Regular
                                }}>
                                    {translate('ADDRSS_TYPE')}</Text>
                                <View style={{ marginVertical: DIMENS.px_20 }}>

                                    <Ripple onPress={() => this.selectAddrssType()} style={{}}
                                        style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image source={this.state.isSelectHome ? RADIO_POINT : CIRCLE}
                                            style={{ width: DIMENS.px_22, height: DIMENS.px_22, marginRight: DIMENS.px_5 }} />
                                        <Text style={{
                                            fontFamily: FONT_FAMILIY.Roboto_Regular,
                                            fontSize: DIMENS.txt_size_medium, color: colors.black
                                        }}>{translate('HOME_ADDRSS')}</Text>
                                    </Ripple>
                                </View>
                                <View>

                                    <Ripple onPress={() => this.selectAddrssType()}
                                        style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image source={!this.state.isSelectHome ? RADIO_POINT : CIRCLE}
                                            style={{ width: DIMENS.px_20, height: DIMENS.px_20, marginRight: DIMENS.px_5 }} />
                                        <Text style={{
                                            fontFamily: FONT_FAMILIY.Roboto_Regular,
                                            fontSize: DIMENS.txt_size_medium, color: colors.black
                                        }}>{translate('WORK_ADDRSS')}</Text>
                                    </Ripple>
                                </View>
                            </View>

                        }
                        {
                            <Ripple style={styles.submitBtn} onPress={() => this.addAddressOrUpdate()}>
                                <Text style={styles.submitBtnText}>
                                    {translate('HOME_save')}
                                </Text>
                            </Ripple>
                        }

                        {
                            this.state.addressDilog &&
                            //Address
                            <AddressDialog
                                title={translate('ADD_DETAIL')}
                                subTitle={'Jaipur'}
                                mzg={translate('LOC_PREF')}
                                noTxts={translate('NO')}
                                continueTxt={(`${translate('YES')},${translate('CONTINUE')}`)}
                                onClosePopover={() => this.setState({ addressDilog: false })}
                                yesPopverPress={() => this.setAddress('default')} />
                        }
                        {
                            this.state.showCurrentLocView &&
                            <AddressDialog
                                title={translate('UPDATE_DETAIL')}
                                subTitle={this.formateAddress}
                                noTxts={translate('CANCEL').toUpperCase()}
                                continueTxt={translate('CONFIRM').toUpperCase()}
                                onClosePopover={() => this.setState({ showCurrentLocView: false })}
                                yesPopverPress={() => this.setAddress('Current Address')} />
                        }
                    </View>
                </ScrollView>
                {
                    stateData != undefined && this.state.isShowModal &&
                    <CommonAddressView
                        title={`${translate('SELECT')} ${translate('STATE')}`}
                        data={this.state.isState ? stateData : cityData}
                        modalAddressVisible={this.state.isShowModal}
                        selectItem={(item) => this.onSelectStateOrCityCode(item, this.state.isState)}
                        closePopOver={() => this.setState({ isShowModal: !this.state.isShowModal })}
                    />
                }
                {
                    loading &&
                    <Loader loader={loading} />
                }

            </View>
        )
    }
}


// export default class AddAddress extends Basecomponents {
//     constructor(props) {
//         super(props)
//         this.addressIsFrom=undefined;
//         this.editData = this.props.navigation.state != undefined && this.props.navigation.state.params != undefined &&
//             this.props.navigation.state.params.item && this.props.navigation.state.params.item
//         this.pinRef = this.editData ? this.editData[APP_PARAMS.POSTAL_CODE] : undefined;
//         this.houseRef = this.editData ? this.editData[APP_PARAMS.STREET_ADDRESS] : undefined;
//         this.areaRef = this.editData ? this.editData[APP_PARAMS.APARTMENT_SUIT] : undefined;
//         this.cityRefrence = this.editData ? this.editData[APP_PARAMS.CITY] : undefined;
//         this.stateRef = this.editData ? this.editData[APP_PARAMS.STATE] : undefined;
//         this.landmarkRef = this.editData ? this.editData[APP_PARAMS.LANDMARK] : undefined;
//         this.nameRef = this.editData ? this.editData[APP_PARAMS.NAME] : undefined;
//         this.mobileRef = this.editData ? this.editData[APP_PARAMS.PHONE] : undefined;
//         this.altrnateNoRef = this.editData ? this.editData[APP_PARAMS.ALTER_NATE_PHONE] : undefined;
//         this.formateAddress = undefined;
//         this.stateId = this.editData ? this.editData[APP_PARAMS.STATE_ID] : undefined;
//         this.cityId = this.editData ? this.editData[APP_PARAMS.CITY_ID] : undefined;
//         this.countryId = this.editData ? this.editData[APP_PARAMS.COUNTRY_ID] : undefined;

//         console.log('serach datat:-', JSON.stringify(this.editData));
//         if (Platform.OS === 'ios') {
//             let that = this
//             this.callLocation(that);
//             this.setState({addressDilog:true})
//         } else {
           
//             this.requestLocationPermission();
//         }

//         this.state = {
//             isSelectHome:
//                 this.editData && this.editData[APP_PARAMS.ADDRESS_TYPE] != undefined &&
//                     (this.editData[APP_PARAMS.ADDRESS_TYPE] == APP_PARAMS.HOME) ? true : false,
//             addressDilog: false,
//             addressData: undefined, pinStare: '',
//             showCurrentLocView: false,
//             country: undefined,
//             isShowModal: false,
//             pinTxtField: this.editData ? this.editData[APP_PARAMS.POSTAL_CODE] : '',
//             houseTxtField: this.editData ? this.editData[APP_PARAMS.STREET_ADDRESS] : '',
//             areaTxtField: this.editData ? this.editData[APP_PARAMS.APARTMENT_SUIT] : '',
//             cityTxtField: this.editData ? this.editData[APP_PARAMS.CITY] : '',
//             stateTxtField: this.editData ? this.editData[APP_PARAMS.STATE] : '',
//             landMarkTxtField: this.editData ? this.editData[APP_PARAMS.LANDMARK] : '',
//             nameTxtField: this.editData && this.editData[APP_PARAMS.FIRST_NAME] != undefined ?
//                 this.editData[APP_PARAMS.FIRST_NAME] : '',
//             mobileTxtFiled: this.editData ? this.editData[APP_PARAMS.PHONE] : '',
//             altenatTxtField: this.editData ? this.editData[APP_PARAMS.ALTER_NATE_PHONE] : '',
//             isState: false,
//             addressSerachArr: undefined,
//             positionOfDrpDown: undefined,
//             loding: true
//         }
//     }
    
//     componentDidMount() {
//         var that = this;
//         // if (Platform.OS === 'ios') {
//         //     this.callLocation(that);
//         //     this.setState({addressDilog:true})
//         // } else {
           
//         //     requestLocationPermission();
//         // }

//         this.getAllState()
//         if (this.stateId) {
//             this.getAllCity(this.stateId)
//         }
//     }

//     componentWillUnmount = () => {
//         Geolocation.clearWatch(this.watchID);
//     }

//     requestLocationPermission = async() => {
//         RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({ interval: 10000, fastInterval: 5000 })
//             .then(async(data) => {
//                // alert('location:-',JSON.stringify(data))
//                 try {
//                     const granted = await PermissionsAndroid.request(
//                         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION )
//                     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//                         console.warn('permission granted');
//                         //To Check, If Permission is granted
//                         // that.callLocation(that);
//                         this.getCurrentLocation();
//                         //this.setState({addressDilog:true})
//                     } else {
//                         alert("Permission Denied");
//                     }
//                 } catch (err) {
//                     console.warn("Permission error "+ err);
//                     console.log(err)
//                 }
//                 // The user has accepted to enable the location services
//                 // data can be :
//                 //  - "already-enabled" if the location services has been already enabled
//                 //  - "enabled" if user has clicked on OK button in the popup
//             }).catch(err => {
//                 alert('location permission:-'+JSON.stringify(err.message))
//                 // The user has not accepted to enable the location services or something went wrong during the process
//                 //  "err" : { "code" : "ERR00|ERR01|ERR02", "message" : "message"}
//                 // codes : 
//                 //  - ERR00 : The user has clicked on Cancel button in the popup
//                 //  - ERR01 : If the Settings change are unavailable
//                 //  - ERR02 : If the popup has failed to open
//             });
//     }

//     getCurrentLocation = () => {
//         Geolocation.getCurrentPosition((position) => {
//             this.setState({ loding: false, addressDilog: true })
//                 console.log('position::--', position);
//                 const currentLongitude = JSON.stringify(position.coords.longitude);
//                 //getting the Longitude from the location json
//                 const currentLatitude = JSON.stringify(position.coords.latitude);
//                 //getting the Latitude from the location json
//                 //Setting state Longitude to re re-render the Longitude Text
//                 this.setState({ currentLongitude: currentLongitude ,currentLatitude: currentLatitude });
//                 //Setting state Latitude to re re-render the Longitude Text  
//                 this.getGeoLocation({
//                     [APP_PARAMS.LAT]: currentLatitude,
//                     [APP_PARAMS.LNG]: currentLongitude
//                 })    
//         },
//         (error) =>{this.setState({ loding: false })},
//         // alert(error.message),
//             { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 } )
//     }

//     //Action
//     callLocation(that) {
//         //alert("callLocation Called");
//         Geolocation.getCurrentPosition(
//             //Will give you the current location
//             (position) => {
//                 console.log('position::--', position);
//                 const currentLongitude = JSON.stringify(position.coords.longitude);
//                 //getting the Longitude from the location json
//                 const currentLatitude = JSON.stringify(position.coords.latitude);
//                 //getting the Latitude from the location json
//                 //Setting state Longitude to re re-render the Longitude Text
//                 that.setState({ currentLongitude: currentLongitude ,currentLatitude: currentLatitude });
//                 //Setting state Latitude to re re-render the Longitude Text  
//                 this.getGeoLocation({
//                     [APP_PARAMS.LAT]: currentLatitude,
//                     [APP_PARAMS.LNG]: currentLongitude
//                 })
//             },
//             (error) => alert(error.message),
//             { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
//         );
//         that.watchID = Geolocation.watchPosition((position) => {
//             //Will give you the location on location change
//             console.log('position::--watch', position);
//             const currentLongitude = JSON.stringify(position.coords.longitude);
//             //getting the Longitude from the location json
//             const currentLatitude = JSON.stringify(position.coords.latitude);
//             //getting the Latitude from the location json
//             that.setState({ currentLongitude: currentLongitude ,currentLatitude: currentLatitude });
//             //Setting state Longitude to re re-render the Longitude Text
//            // that.setState({ currentLatitude: currentLatitude });
//             //Setting state Latitude to re re-render the Longitude Text
//         });
//     }
//     selectAddrssType = () => {
//         this.setState({ isSelectHome: !this.state.isSelectHome })
//     }
//     showCurrentAddressView = () => {
//         const { data, error } = this.props
//         // console.warn('data::--', JSON.stringify(data));

//         if (data != undefined) {
//             this.formateAddress = data[APP_PARAMS.FORMATED_ADDRESS]
//             this.setState({ showCurrentLocView: true })
//         }
//     }
//     setAddress = (flag) => {
//         const { data, error } = this.props

//         if (data != undefined) {
//             this.setState({ addressData: data })
//             this.pinRef.setValue(data[APP_PARAMS.POSTAL_CODE])
//             this.cityRefrence.setValue(data[APP_PARAMS.CITY_LONG_NAME])
//             this.stateRef.setValue(data[APP_PARAMS.STATE_LONG_NAME])
//             this.setState({
//                 pinTxtField: data[APP_PARAMS.POSTAL_CODE],
//                 cityTxtField: data[APP_PARAMS.CITY_LONG_NAME], stateTxtField: data[APP_PARAMS.STATE_LONG_NAME],
//             })


//             let stateData = this.responseAPI(this.props.state)
//             if (stateData != undefined && stateData.length > 0) {
//                 stateData.forEach(element => {
//                     if (element.name == data[APP_PARAMS.STATE_LONG_NAME]) {
//                         this.stateId = element.id,
//                             this.countryId = element.countryId
//                         this.props.getAllCityAPI(this.stateId).then(result => {
//                             let dataCity = this.responseAPI(result)
//                             if (dataCity && dataCity.length > 0) {
//                                 dataCity.forEach(dataElt => {
//                                     if (dataElt.name == data[APP_PARAMS.CITY_LONG_NAME]) {
//                                         this.cityId = dataElt.id
//                                     }
//                                 })
//                             }
//                         })
//                         return;
//                     }
//                 });
//             }


//             if (flag != 'default') {
//                 this.areaRef.setValue(data[APP_PARAMS.FORMATED_ADDRESS])
//                 this.setState({ showCurrentLocView: false, areaTxtField: data[APP_PARAMS.FORMATED_ADDRESS] })
//             }
//         }

//     }
//     showAddressModal = (isState) => {
//         if (!isState) {
//             if (this.stateId == undefined) {
//                 Toast.showInfoToast(translate('SELECT_STATE'))
//                 return;
//             }
//         }
//         this.setState({ isShowModal: true, isState: isState })
//     }
//     addAddressOrUpdate = () => {
//         if (this.state.pinTxtField == '') {
//             Toast.showInfoToast(translate('ENTER_PIN_NUMBER'))
//             return;
//         } if (this.state.pinTxtField.length < 6) {
//             Toast.showInfoToast(translate('ENTER_VALID_PIN_NUMBER'))
//             return;
//         } else if (this.state.houseTxtField.trim() == '') {
//             Toast.showInfoToast(translate('ENTER_HOUSE_NUMBER'))
//             return;
//         } else if (this.state.areaTxtField.trim() == '') {
//             Toast.showInfoToast(translate('ENTER_AREA'))
//             return;
//         } else if (this.state.stateTxtField == '') {
//             Toast.showInfoToast(translate('SELECT_STATE'))
//             return;
//         } else if (this.state.cityTxtField == '') {
//             Toast.showInfoToast(translate('SELECT_CITY'))
//             return;
//         } else if (this.state.nameTxtField.trim() == '') {
//             Toast.showInfoToast(translate('NAME_EMPTY_ERR'))
//             return;
//         } else if (this.state.mobileTxtFiled == '') {
//             Toast.showInfoToast(translate('MOBILE_EMPTY_ERR'))
//             return;
//         } else if (this.state.mobileTxtFiled.length < 10) {
//             Toast.showInfoToast(translate('MOBILE_INVALID_ERR'))
//             return;
//         }
//         let dataReq = {
//             [APP_PARAMS.U_UID]: this.editData != undefined && this.editData[APP_PARAMS.U_UID],//"InEditCase-addressId",.
//             [APP_PARAMS.PHONE]: this.state.mobileTxtFiled,
//             [APP_PARAMS.ALTER_NATE_PHONE]: this.state.altenatTxtField,
//             [APP_PARAMS.STATE_ID]: this.stateId,
//             [APP_PARAMS.CITY_ID]: this.cityId,
//             [APP_PARAMS.COUNTRY_ID]: this.countryId,
//             [APP_PARAMS.POSTAL_CODE]: this.state.pinTxtField,
//             [APP_PARAMS.LANDMARK]: this.state.landMarkTxtField,
//             [APP_PARAMS.STREET_ADDRESS]: this.state.houseTxtField,
//             [APP_PARAMS.APARTMENT_SUIT]: this.state.areaTxtField,
//             [APP_PARAMS.ADDRESS_TYPE]: this.state.isSelectHome ? APP_PARAMS.HOME : APP_PARAMS.WORK,
//             [APP_PARAMS.FIRST_NAME]: this.state.nameTxtField,
//         }
//         // console.warn('address:::-->>>0',JSON.stringify(dataReq))
//         this.props.addAddressUpdateApi(dataReq)
//     }
//     onSelectStateOrCityCode = (item, isState) => {
//         if (isState) {
//             this.stateRef.setValue(item[APP_PARAMS.NAME])
//             this.setState({ stateTxtField: item[APP_PARAMS.NAME] })
//             this.stateId = item[APP_PARAMS._id]
//             this.getAllCity(this.stateId)
//         } else {
//             this.cityId = item[APP_PARAMS._id]
//             this.cityRefrence.setValue(item[APP_PARAMS.NAME])
//             this.setState({ cityTxtField: item[APP_PARAMS.NAME] })
//         }
//     }

//     getPositionOfView = (event) => {
//         var { x, y, width, height } = event.nativeEvent.layout;
//         this.setState({ positionOfDrpDown: y + height }, () => {
//             //   console.warn('position of drop down:---',this.state.positionOfDrpDown);

//         })
//     }
//     goBackSearch = (item) => {
//         // console.warn('item::--',item)

//         this.areaRef.setValue(item)
//        // let { current: field } = this.areaRef;

//         this.setState({ areaTxtField: item },()=>
//         console.log('areaTxtField::--',this.state.areaTxtField,'value',this.areaRef.value())
//         )
//     }
//     serachLocation=()=>{
//       this.areaRef.blur()
//       this.props.navigation.navigate("LocationSearch", 
//          { goBackSearch: (item) => this.goBackSearch(item)}
//       )
//     }
//     //API FUNCTION:--

//     getGeoLocation = (reqObj) => {
//      const { geoLocationAPI } = this.props
//       geoLocationAPI(reqObj).then(result => {
//         console.log('result::--->>', result);
//        })
//     }
//     getAllState = () => {
//         // console.warn('state:--',global[KEY.USER_DATA]);
//         if (global[KEY.USER_DATA] != undefined && global[KEY.USER_DATA][APP_PARAMS.COUNTRY_ID]!=undefined) {
//             this.countryId = this.countryId != undefined ? this.countryId : global[KEY.USER_DATA][APP_PARAMS.COUNTRY_ID]
//             this.props.getAllStateAPI(101)//(global[KEY.USER_DATA][APP_PARAMS.COUNTRY_ID])
//         }
//     }
//     getAllCity = (id) => {
//         this.props.getAllCityAPI(id)
//     }

//     //RESPONSE:--

//     responseAPI = (result, isADDEdit) => {
//         let data = {};
//         if (result) {
//             if (result.hasOwnProperty(APP_PARAMS.SUCCESS) && result[APP_PARAMS.SUCCESS]) {
//                 if (isADDEdit) {
//                     if (result[APP_PARAMS.MESSAGE]) {
//                         Toast.showErrorToast(result[APP_PARAMS.MESSAGE])
//                         this.props.cleaData()
//                      console.warn('address:-list',this.addressIsFrom);
//                      //this.addressIsFrom

//                         if(this.addressIsFrom!=undefined){

//                             if(this.addressIsFrom[CONST.IS_FROM]==[SCREENS.CATEGORY_SUB_DETAIL]){
//                                 this.props.navigation.replace(SCREENS.ORDER_SUMMARY)
//                             }
//                         }else{
//                             alert('result'+JSON.stringify(result))
//                             this.props.navigation.state.params.goBackAdress(result.data)
//                             this.props.navigation.goBack()
//                         }
//                     }
//                 } else {
//                     if (result.hasOwnProperty(APP_PARAMS.RES_PKT) && result[APP_PARAMS.RES_PKT] != null && result[APP_PARAMS.RES_PKT].length > 0) {
//                         data = result[APP_PARAMS.RES_PKT]
//                     }
//                 }
//                 return data
//             } else if (result[APP_PARAMS.MESSAGE]) {
//                 Toast.showErrorToast(result[APP_PARAMS.MESSAGE])
//             }
//         } else {
//             Toast.showErrorToast(translate('MESSAGE_SERVER_ERROR'))
//         }
//     }

//     //render:--

//     render() {
//         const { loading, state, city, dataOfAdrs,addressIsFrom } = this.props
//         let stateData = undefined
//         let cityData = undefined
//         // console.warn('address:-render',this.state.areaTxtField);
        
//         this.addressIsFrom = addressIsFrom;
//         if (state) { stateData = this.responseAPI(state) }
//         if (city) { cityData = this.responseAPI(city) }
//         if (dataOfAdrs) {
//             console.log('dataOfAdrs response:--', JSON.stringify(dataOfAdrs));
//             let data = this.responseAPI(dataOfAdrs, true)
//         }

//         this.state.addressData != undefined &&
//             console.log('address::---currentAddress', this.state.addressData[APP_PARAMS.FORMATED_ADDRESS]);

//         //console.warn('stateTxtField:-->>>',  this.state.stateTxtField) 

//         return (
//             <View style={{ flex: 1 }}>
//                 <CommonNavHeader title={translate('SCREEN_ADD_ADDRESS')}
//                     backPress={() => this.props.navigation.goBack()} />
//                 <ScrollView  >
//                     <View>
//                         <View style={{
//                             borderColor: colors.lightGrayText,
//                             borderWidth: DIMENS.px_1, padding: DIMENS.px_15, elevation: 3,

//                         }}>
//                             <Ripple style={{ flexDirection: 'row', alignItems: 'center' }}
//                                 onPress={() => this.showCurrentAddressView()}>
//                                 <Image source={CURNTLOC} style={{ width: DIMENS.px_22, height: DIMENS.px_22 }} />
//                                 <Text style={{ marginHorizontal: DIMENS.px_10, fontFamily: FONT_FAMILIY.Roboto_Medium, fontSize: DIMENS.txt_size_large_extra, color: colors.primary }}>
//                                     {translate('USE_CURRENT_LOC')}</Text>
//                             </Ripple>
//                             <Ripple style={{}} >
//                                 <Text style={{
//                                     marginHorizontal: DIMENS.px_32, fontFamily: FONT_FAMILIY.Roboto_Regular,
//                                     fontSize: DIMENS.txt_size_medium, color: colors.lightGrayClr, marginTop: DIMENS.px_5
//                                 }}>
//                                     {translate('TAP_TO_AUTO_FILL')}</Text>
//                             </Ripple>
//                         </View>

//                         {
//                             <View style={{
//                                 paddingBottom: DIMENS.px_20, paddingHorizontal: DIMENS.px_15,
//                                 borderBottomWidth: DIMENS.px_5, borderBottomColor: colors.lightGraytransparent
//                             }}>
//                                 <TextField
//                                     ref={(r) => this.pinRef = r}
//                                     label={translate('PIN_CODE') + translate('REQ_ASTRIC')}
//                                     keyboardType='numeric'
//                                     maxLength={6}
//                                     tintColor={colors.primary}
//                                     lineWidth={0.3}
//                                     style={{ fontFamily: FONT_FAMILIY.Roboto_Regular, fontSize: DIMENS.txt_size_medium }}
//                                     returnKeyType='next'
//                                     onFocus={this.onFocus}
//                                     value={this.state.pinTxtField}
//                                     onChangeText={(txt) => this.setState({ pinTxtField: txt })}
//                                     onSubmitEditing={() => this.houseRef.focus()}

//                                 />
//                                 <TextField
//                                     ref={(r) => this.houseRef = r}
//                                     label={translate('HOUSE_BUILD') + translate('REQ_ASTRIC')}
//                                     keyboardType='default'
//                                     tintColor={colors.primary}
//                                     lineWidth={0.3}
//                                     returnKeyType='next'
//                                     onFocus={this.onFocus}
//                                     value={this.state.houseTxtField}
//                                     onChangeText={(txt) => this.setState({ houseTxtField: txt })}
//                                     onSubmitEditing={() => this.areaRef.focus()}
//                                 />
//                                 <TextField
//                                     ref={(r) => this.areaRef = r}
//                                     label={translate('ROAD_AREA') + translate('REQ_ASTRIC')}
//                                     keyboardType='default'
//                                     tintColor={colors.primary}
//                                     lineWidth={0.3}
//                                     returnKeyType='done'
//                                     value={this.state.areaTxtField}
//                                     //onFocus={this.onFocus}
//                                      onFocus={() => this.serachLocation() }
//                                     onChangeText={(txt) => console.warn("text after back",txt)}
//                                     onSubmitEditing={() => this.stateRef.focus()}
//                                     //onLayout={(event) => this.getPositionOfView(event)}
//                                 />
//                                 <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>

//                                     <TextField
//                                         ref={(r) => this.stateRef = r}
//                                         label={translate('STATE') + translate('REQ_ASTRIC')}
//                                         keyboardType='default'
//                                         tintColor={colors.primary}
//                                         lineWidth={0.3}
//                                         returnKeyType='next'
//                                         value={this.state.stateTxtField}
//                                         containerStyle={{ width: '50%', }}
//                                         onFocus={() => this.showAddressModal(true)}
//                                         //onChangeText={(txt)=>this.setState({stateTxtField:txt})}   
//                                         onSubmitEditing={() => this.cityRefrence.focus()}
//                                     />
//                                     <TextField
//                                         ref={(r) => this.cityRefrence = r}
//                                         value={this.state.cityTxtField}
//                                         label={translate('CITY') + translate('REQ_ASTRIC')}
//                                         keyboardType='default'
//                                         tintColor={colors.primary}
//                                         lineWidth={0.3}
//                                         containerStyle={{ width: '40%' }}
//                                         returnKeyType='next'
//                                         onFocus={() => this.showAddressModal(false)}
//                                         //  onChangeText={(txt)=>this.setState({cityTxtField:txt})}
//                                         onSubmitEditing={() => this.landmarkRef.focus()}

//                                     />

//                                 </View>
//                                 <TextField
//                                     ref={(r) => this.landmarkRef = r}
//                                     label={`${translate('LANDMARK')}(${translate('OPTIONAL')})`}
//                                     keyboardType='default'
//                                     tintColor={colors.primary}
//                                     lineWidth={0.3}
//                                     returnKeyType='next'
//                                     onFocus={this.onFocus}
//                                     value={this.state.landMarkTxtField}
//                                     onSubmitEditing={() => this.nameRef.focus()}
//                                     onChangeText={(txt) => this.setState({ landMarkTxtField: txt })}
//                                 />
//                             </View>

//                         }

//                         {
//                             //SECOND//
//                             <View style={{
//                                 paddingBottom: DIMENS.px_20, paddingHorizontal: DIMENS.px_15,
//                                 borderBottomWidth: DIMENS.px_5, borderBottomColor: colors.lightGraytransparent
//                             }}>
//                                 <TextField
//                                     ref={(r) => this.nameRef = r}
//                                     label={translate('NAME') + translate('REQ_ASTRIC')}
//                                     tintColor={colors.primary}
//                                     lineWidth={0.3}
//                                     style={{ fontFamily: FONT_FAMILIY.Roboto_Regular, fontSize: DIMENS.txt_size_medium }}
//                                     returnKeyType='next'
//                                     onFocus={this.onFocus}
//                                     value={this.state.nameTxtField}
//                                     onSubmitEditing={() => this.mobileRef.focus()}
//                                     onChangeText={(txt) => this.setState({ nameTxtField: txt })}
//                                 />
//                                 <TextField
//                                     ref={(r) => this.mobileRef = r}
//                                     label={translate('PLACEHOLDER_DIGIT_MOBILE_NO') + translate('REQ_ASTRIC')}
//                                     keyboardType='numeric'
//                                     maxLength={10}
//                                     tintColor={colors.primary}
//                                     lineWidth={0.3}
//                                     returnKeyType='next'
//                                     onFocus={this.onFocus}
//                                     value={this.state.mobileTxtFiled}
//                                     onSubmitEditing={() => this.altrnateNoRef.focus()}
//                                     onChangeText={(txt) => this.setState({ mobileTxtFiled: txt })}
//                                 />
//                                 <TextField
//                                     ref={(r) => this.altrnateNoRef = r}
//                                     label={`${translate('PLACEHOLDER_ALERNATE_PHONE_NO')}(${translate('OPTIONAL')})`}
//                                     keyboardType='default'
//                                     tintColor={colors.primary}
//                                     lineWidth={0.3}
//                                     returnKeyType='done'
//                                     value={this.state.altenatTxtField}
//                                     onSubmitEditing={() => this.altrnateNoRef.blur()}
//                                     onChangeText={(txt) => this.setState({ altenatTxtField: txt })}
//                                 />
//                             </View>
//                         }
//                         {
//                             //THIRD//
//                             <View style={{
//                                 paddingBottom: DIMENS.px_20, paddingHorizontal: DIMENS.px_15, paddingTop: DIMENS.px_10,
//                                 borderBottomWidth: DIMENS.px_5, borderBottomColor: colors.lightGraytransparent
//                             }}>
//                                 <Text style={{
//                                     color: colors.grayClr, fontSize: DIMENS.txt_size_medium,
//                                     fontFamily: FONT_FAMILIY.Roboto_Regular
//                                 }}>
//                                     {translate('ADDRSS_TYPE')}</Text>
//                                 <View style={{ marginVertical: DIMENS.px_20 }}>

//                                     <Ripple onPress={() => this.selectAddrssType()} style={{}}
//                                         style={{ flexDirection: 'row', alignItems: 'center' }}>
//                                         <Image source={this.state.isSelectHome ? RADIO_POINT : CIRCLE}
//                                             style={{ width: DIMENS.px_22, height: DIMENS.px_22, marginRight: DIMENS.px_5 }} />
//                                         <Text style={{
//                                             fontFamily: FONT_FAMILIY.Roboto_Regular,
//                                             fontSize: DIMENS.txt_size_medium, color: colors.black
//                                         }}>{translate('HOME_ADDRSS')}</Text>
//                                     </Ripple>
//                                 </View>
//                                 <View>

//                                     <Ripple onPress={() => this.selectAddrssType()}
//                                         style={{ flexDirection: 'row', alignItems: 'center' }}>
//                                         <Image source={!this.state.isSelectHome ? RADIO_POINT : CIRCLE}
//                                             style={{ width: DIMENS.px_20, height: DIMENS.px_20, marginRight: DIMENS.px_5 }} />
//                                         <Text style={{
//                                             fontFamily: FONT_FAMILIY.Roboto_Regular,
//                                             fontSize: DIMENS.txt_size_medium, color: colors.black
//                                         }}>{translate('WORK_ADDRSS')}</Text>
//                                     </Ripple>
//                                 </View>
//                             </View>

//                         }
//                         {
//                             <Ripple style={styles.submitBtn} onPress={() => this.addAddressOrUpdate()}>
//                                 <Text style={styles.submitBtnText}>
//                                     {translate('HOME_save')}
//                                 </Text>
//                             </Ripple>
//                         }

//                         {
//                             this.state.addressDilog &&
//                             //Address
//                             <AddressDialog
//                                 title={translate('ADD_DETAIL')}
//                                 subTitle={'Jaipur'}
//                                 mzg={translate('LOC_PREF')}
//                                 noTxts={translate('NO')}
//                                 continueTxt={(`${translate('YES')},${translate('CONTINUE')}`)}
//                                 onClosePopover={() => this.setState({ addressDilog: false })}
//                                 yesPopverPress={() => this.setAddress('default')} />
//                         }
//                         {
//                             this.state.showCurrentLocView &&
//                             <AddressDialog
//                                 title={translate('UPDATE_DETAIL')}
//                                 subTitle={this.formateAddress}
//                                 noTxts={translate('CANCEL').toUpperCase()}
//                                 continueTxt={translate('CONFIRM').toUpperCase()}
//                                 onClosePopover={() => this.setState({ showCurrentLocView: false })}
//                                 yesPopverPress={() => this.setAddress('Current Address')} />
//                         }
//                     </View>
//                 </ScrollView>
//                 {
//                     stateData != undefined && this.state.isShowModal &&
//                     <CommonAddressView
//                         title={`${translate('SELECT')} ${translate('STATE')}`}
//                         data={this.state.isState ? stateData : cityData}
//                         modalAddressVisible={this.state.isShowModal}
//                         selectItem={(item) => this.onSelectStateOrCityCode(item, this.state.isState)}
//                         closePopOver={() => this.setState({ isShowModal: !this.state.isShowModal })}
//                     />
//                 }
//                 {
//                     loading || this.state.loding &&
//                     <Loader loader={true} />
//                 }

//             </View>
//         )
//     }
// }


