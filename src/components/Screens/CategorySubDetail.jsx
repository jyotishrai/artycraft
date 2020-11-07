import React from 'react'
import {
    ActivityIndicator, Animated,
    Easing,
    KeyboardAvoidingView,
    Platform,
    ScrollView, BackHandler,
    Text, Image,
    TouchableOpacity, FlatList, SectionList, Share,
    View, Dimensions, TextInput, Modal, DeviceEventEmitter,
} from 'react-native'
import Ripple from 'react-native-material-ripple';
import styles from '../Auth/styles'
import { colors } from '../../theme';
import { NOTIFICATION, HEART, SEARCH, ORDER, DONE, STAR, SHARE, NEXT, CROSS, RADIO_POINT, CIRCLE, PLACEHOLDER_PRODUCT_IMG, CHECKMARK } from '../../images'
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
import NavigationService from '../../NavigationService';
import { RatingView } from '../../common/RatingView';
import CommonSellerDetail from '../../common/CommonSellerDetail';
//import Share from 'react-native-share';


const noOfimg = 4
const width = (WIDTH - 54) / 4
Dimensions.get('window').width
import CommonImage from '../../common/CommonImage'


export default class CategorySubDetail extends Basecomponents {
    constructor(props) {
        super(props)
        this.focusCategoryListner = this.props.navigation.addListener('didFocus', this.onDidFoucs);
        this.backhandler = BackHandler.addEventListener('hardwareBackPress', this.hardwareBackPress)
        this.hilightArrCount = 0,
            this.dataResponse = undefined;
        this.data = this.props.navigation.state != undefined &&
            this.props.navigation.state.params != undefined &&
            this.props.navigation.state.params[APP_PARAMS.DATA] != undefined
            && this.props.navigation.state.params[APP_PARAMS.DATA];
        this.isFrom = this.props.navigation.state.params != undefined &&
            this.props.navigation.state.params[CONST.IS_FROM]
        this.comeFromLoginLtsner = DeviceEventEmitter.addListener(KEY.COME_BACK_FROM_LOGIN, this.goBackLogin)

        this.logindataUpdate = DeviceEventEmitter.addListener('loginDataUpdate', this.logindataUpdate)
        //  this.id = this.props.navigation.state.params&&this.props.navigation.state.params.
        this.scaleValue = new Animated.Value(0);
        this.productVarintIdList = undefined
        this.productVariants = undefined
        this.state = {
            productSlices: [require('../../assets/images/phone.png'),
            require('../../assets/images/phone.png'),
            require('../../assets/images/phone.png'), require('../../assets/images/phone.png'),
            require('../../assets/images/phone.png'),
            require('../../assets/images/phone.png'), require('../../assets/images/phone.png')],
            offerArr: [{ uriRequire: PERCENTAGE, offer: '10% Instant Discount with SBI Debilt Cards and EMI Transactions' },
            { uriRequire: PERCENTAGE, offer: '10% Instant Discount with SBI Debilt Cards and EMI Transactions' },
            { uriRequire: PERCENTAGE, offer: '10% Instant Discount with SBI Debilt Cards and EMI Transactions' }],
            paymentOption: ['Easy payment Options', 'Cash on Delivery', 'Net Banking & Credit / Debit / ATM card'],
            highlightArr: ['4GB RAM | 64 GB ROM | Expandable Upto 256GB', '4GB RAM | 64 GB ROM | Expandable Upto 256GB',
                '4GB RAM | 64 GB ROM | Expandable Upto 256GB', '4GB RAM | 64 GB ROM | Expandable Upto 256GB'],
            ratingRevwSlices: [require('../../assets/images/phone.png'),
            require('../../assets/images/phone.png'),
            require('../../assets/images/phone.png'), require('../../assets/images/phone.png'),
            require('../../assets/images/phone.png'),
            require('../../assets/images/phone.png'), require('../../assets/images/phone.png')],

            reviewArr: [{
                rating: 5, title: 'Awesome', comment: 'Awesome Mobile in this Price Segment',
                reviewSliceData: [require('../../assets/images/phone.png'),
                require('../../assets/images/phone.png'),
                require('../../assets/images/phone.png')],
                address: 'Mansrovar,Jaipur, Rajasthan ', time: '4 Months Ago', likeCount: '2.6K', dislikeCount: 985
            },
            {
                rating: 5, title: 'Awesome', comment: 'Awesome Mobile in this Price Segment , Awesome Mobile in this Price Segment Awesome Mobile in this Price Segment,Awesome Mobile in this Price Segment Awesome Mobile in this Price Segment Awesome Mobile in this Price Segment',
                reviewSliceData: [require('../../assets/images/phone.png'),
                require('../../assets/images/phone.png'),
                require('../../assets/images/phone.png')],
                address: 'Mansrovar,Jaipur, Rajasthan ', time: '4 Months Ago', likeCount: '2.6K', dislikeCount: 985
            }],

            similarDataArr: [
                { uri: require('../../assets/images/shoe.png'), discountPrice: '799', price: '1500', name: 'Realme 3i(Diamond Blue, 32GB)', rating: '3.3', ratingCount: '2,333' },
                { uri: require('../../assets/images/shoe.png'), discountPrice: '799', price: '1500', name: 'Realme 3i(Diamond Blue, 32GB)', rating: '3.3', ratingCount: '2,333' },
                { uri: require('../../assets/images/micro.png'), discountPrice: '799', price: '1500', name: 'Realme 3i(Diamond Blue, 32GB)', rating: '3.3', ratingCount: '2,333' },
                { uri: require('../../assets/images/shoe.png'), discountPrice: '799', price: '1500', name: 'Realme 3i(Diamond Blue, 32GB)', rating: '3.3', ratingCount: '2,333' }],
            varintOfProduct: undefined,
            modalAddressVisible: false,
            addressArrData: undefined,
            // [
            //     { isSelected: false, name: 'Quiz Name', addressType: 'Home', address: '10 B Scheme ,Usha Vihar , Arjun Nagar Jaipur,Rajsthan ,India', mobileNo: '+91 9514456788' },
            // { isSelected: false, name: 'Quiz Name', addressType: 'Home', address: '10 B Scheme ,Usha Vihar , Arjun Nagar Jaipur', mobileNo: '+91 9514456788' }],
            wish: false,
            pinTxtField: '',
            deliveryTime: undefined,
            deliveryTimeInMs: undefined,
            pinCodeWithLoc: undefined,
            shippingChanges: undefined,
            installationDetail: undefined,
            deliveryCharge: undefined,
            isAddedCart: false,
            selectedImg: undefined,
            isPinCode: false,
            isWish: false,
            cartCount: undefined,
            wishCount: undefined,
            tempData: undefined,
            modalOfImg: false,
            showSellerDetail: false,

        }
    }
    componentDidMount() {
        this.addressListAPi()
        retrieveData(KEY.POSTAL_CODE, result => {
            if (result && result != null)
                this.pincodeAPI(result)
        });
        this.productDetailAPI()
    }
    componentWillUnmount() {
        this.focusCategoryListner.remove()
        this.comeFromLoginLtsner.remove()
    }
   
    //Listner
    onDidFoucs = () => {
        if (this.props.data) {
            let storeData = this.responseAPI(this.props.data)
            storeData && storeData.products && this.cartActive(storeData.products)
        }

        try {
            if (this.props.dataUpdate) {
                this.cartActive(this.props.data.data[APP_PARAMS.PRODUCTS])
            }
            if (global[KEY.CART_COUNT] != undefined) {
                this.setState({ cartCount: global[KEY.CART_COUNT] })
            }

            if (global[KEY.WISH_COUNT] != undefined) {
                this.setState({ wishCount: global[KEY.WISH_COUNT] })
            }

        } catch (error) {
            // console.log("focus:-" + error)
        }
    }

    logindataUpdate = () => {
        this.addInWishListApi()
    }
    hardwareBackPress = () => {
        NavigationService.popToScren(1)
        return true
    }
    goBackFromReviewRattting = (data) => {

        let productInfo = this.state.tempData
        let commentList = this.state.tempData[APP_PARAMS.COMNT_REVIEW_LIST]

        if (this.state.tempData && this.state.tempData[APP_PARAMS.USER_REIEW]) {
            if (this.state.tempData[APP_PARAMS.USER_REIEW][APP_PARAMS.U_UID] === data[APP_PARAMS.U_UID]) {
                productInfo[APP_PARAMS.USER_REIEW] = data
            }
        }
        if (this.state.tempData && this.state.tempData[APP_PARAMS.COMNT_REVIEW_LIST] && this.state.tempData[APP_PARAMS.COMNT_REVIEW_LIST].length > 0) {
            if (this.state.tempData[APP_PARAMS.COMNT_REVIEW_LIST].some(item => item[APP_PARAMS.U_UID] === data[APP_PARAMS.U_UID])) {
                commentList.map((item, indx) => {
                    if (item[APP_PARAMS.U_UID] === data[APP_PARAMS.U_UID]) {
                        commentList[indx] = data
                    }
                })
            } else {
                commentList.push(data)
            }

        }
        productInfo[APP_PARAMS.COMNT_REVIEW_LIST] = commentList
        this.setState({ tempData: productInfo })

    }
    //API CALLING
    productDetailAPI = () => {

        if (this.data) {
            let data = {
                [APP_PARAMS.CUSTOMER_ID]: global[KEY.USER_DATA] != undefined &&
                    global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID] ? global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID] : '',
                [APP_PARAMS.PRODUCT_ID]: this.isFrom != undefined && this.isFrom == SCREENS.MY_REVIEW ? this.data && this.data[APP_PARAMS.PRODUCT_ID] : this.data[APP_PARAMS.U_UID] ? this.data[APP_PARAMS.U_UID] : this.data[APP_PARAMS.PRODUCT_U_UID],
                [APP_PARAMS.REQ_ID]: Utils.getDeviceId()
            }
            this.props.categoryProductDetailAPI(data).then(result => {
                let data = this.responseAPI(result)
                this.setDataOfDeliveryTimeCharge(data)
                data && data.products &&
                    this.cartActive(data.products)

                if (data) {
                    let objArr = undefined
                    if (data && data[APP_PARAMS.PRODUCT_VARINET_LIST] && data[APP_PARAMS.PRODUCT_VARINET_LIST].length > 0) {
                        objArr = this.setVariantDataInDefault(data[APP_PARAMS.PRODUCT_VARINET_LIST])
                    }

                    this.setState({ tempData: { ...data }, varintOfProduct: objArr })
                }
            })
        }
    }
    setVariantDataInDefault = (productVarientData) => {
        let objArr = [];
        let productVarient = [...productVarientData]
        let productVarintId = [];
        productVarient.forEach((dataItem, secIndex) => {
            let datVarient = dataItem.data
            datVarient.forEach(item => {
                if (item[APP_PARAMS.DEF_VARIENT] && item[APP_PARAMS.DEF_VARIENT] === true) {

                    productVarintId.push(item.productVariantsId)
                    objArr.push(item)
                }
            })

        })

        this.productVariants = {
            [APP_PARAMS.PRODUCT_ATT_ID]: objArr[0][APP_PARAMS.PRODUCT_ATTRIB_ID],
            [APP_PARAMS.ATTR_VALUE_ID]: objArr[0][APP_PARAMS.ATTR_VALUE_ID],
            [APP_PARAMS.AMOUNT_WITHOUT_DISCOUNT]: objArr[0][APP_PARAMS.DISCOUNT_PRICE],
            [APP_PARAMS.PRICE]: objArr[0][APP_PARAMS.PRICE],
            [APP_PARAMS.PRODUCT_VARIANT_ID]: objArr[0][APP_PARAMS.PRODUCT_VARIANT_ID],
            [APP_PARAMS.QUANTITY]: objArr[0][APP_PARAMS.QUANTITY]
        }

        this.productVarintIdList = productVarintId
        return objArr
    }
    addressListAPi = () => {
        this.props.getAddressListApi().then(result => {
            let data = this.responseAPI(result, true)
            this.setState({ addressArrData: data })
        })
    }
    setDataOfDeliveryTimeCharge = (data, pinCode) => {
        if (data[APP_PARAMS.DELIVERY_TIME] != undefined && data[APP_PARAMS.DELIVERY_TIME] != null) {
            let deliveryTime = Utils.getTimeFromTimeStamp(data[APP_PARAMS.DELIVERY_TIME], 'DD MMM, dddd');
            let pinCodeWithLoc = '';
            let isPinCode = false
            if (data[APP_PARAMS.ADDRESS] != undefined && data[APP_PARAMS.ADDRESS] != null) {
                isPinCode = true
                pinCodeWithLoc = `${data[APP_PARAMS.ADDRESS][APP_PARAMS.FIRST_NAME].split(',')[0]} - ${data[APP_PARAMS.ADDRESS][APP_PARAMS.POSTAL_CODE]}`
            } else {

                pinCodeWithLoc = `${data[APP_PARAMS.DESTINATION].split(',')[0]}-${data[APP_PARAMS.DESTINATION].split(' ')[2]}`
                storeData(KEY.POSTAL_CODE, pinCode)
            }

            this.setState({
                deliveryTime: deliveryTime, pinCodeWithLoc: pinCodeWithLoc, shippingChanges: data[APP_PARAMS.SHIPPING_CAHNGES],
                installationDetail: data[APP_PARAMS.INSTALL_DETAIL], isPinCode: isPinCode,
                deliveryCharge: data[APP_PARAMS.SHIPPING_CHARGE] != undefined && data[APP_PARAMS.SHIPPING_CHARGE] != 0.0 ? `${CURRENCY.RUPEES}${data[APP_PARAMS.SHIPPING_CHARGE]}` : translate('FREE')
            })
        }
    }
    responseAPI = (result, isADdress, isWish) => {
        let data = {};
        if (result) {
            console.log("result::--responseAPIresponseAPI",result);
            
            if (result.hasOwnProperty(APP_PARAMS.SUCCESS) && result[APP_PARAMS.SUCCESS]) {
                if (result.hasOwnProperty(APP_PARAMS.DATA)) {
                    if (result[APP_PARAMS.DATA][APP_PARAMS.URL] ) {
                        data[APP_PARAMS.SHARE_URL] = result[APP_PARAMS.DATA][APP_PARAMS.URL]
                    }
                    if (result[APP_PARAMS.DATA][APP_PARAMS.USER_REIEW] && result[APP_PARAMS.DATA][APP_PARAMS.USER_REIEW] != 'null') {
                        data[APP_PARAMS.USER_REIEW] = result[APP_PARAMS.DATA][APP_PARAMS.USER_REIEW]
                    }
                    if (result[APP_PARAMS.DATA][APP_PARAMS.RELATED_PRODUCT_LIST] && result[APP_PARAMS.DATA][APP_PARAMS.RELATED_PRODUCT_LIST] != '' &&
                        result[APP_PARAMS.DATA][APP_PARAMS.RELATED_PRODUCT_LIST].length > 0) {
                        data[APP_PARAMS.RELATED_PRODUCT_LIST] = result[APP_PARAMS.DATA][APP_PARAMS.RELATED_PRODUCT_LIST]
                    }
                    if (result[APP_PARAMS.DATA][APP_PARAMS.PRODUCTS] && result[APP_PARAMS.DATA][APP_PARAMS.PRODUCTS] != null) {
                        data[APP_PARAMS.PRODUCTS] = result[APP_PARAMS.DATA][APP_PARAMS.PRODUCTS]
                        if (data[APP_PARAMS.PRODUCTS][APP_PARAMS.CART] && data[APP_PARAMS.PRODUCTS][APP_PARAMS.CART] != null) {
                            data[APP_PARAMS.CART] = data[APP_PARAMS.PRODUCTS][APP_PARAMS.CART]//result[APP_PARAMS.DATA]
                        }
                    }

                    if (result[APP_PARAMS.DATA][APP_PARAMS.PROD_HIGHLIGHT] && result[APP_PARAMS.DATA][APP_PARAMS.PROD_HIGHLIGHT] != null) {
                        data[APP_PARAMS.PROD_HIGHLIGHT] = Utils.parserObj(result[APP_PARAMS.DATA][APP_PARAMS.PROD_HIGHLIGHT])
                        this.hilightArrCount = Object.keys(result[APP_PARAMS.DATA][APP_PARAMS.PROD_HIGHLIGHT]).length;

                    }

                    if (result[APP_PARAMS.DATA][APP_PARAMS.PAYMENT_OPTION] && result[APP_PARAMS.DATA][APP_PARAMS.PAYMENT_OPTION] != null) {
                        data[APP_PARAMS.PAYMENT_OPTION] = result[APP_PARAMS.DATA][APP_PARAMS.PAYMENT_OPTION]
                    }
                    if (result[APP_PARAMS.DATA][APP_PARAMS.ADDRESS] && result[APP_PARAMS.DATA][APP_PARAMS.ADDRESS] != null) {
                        data[APP_PARAMS.ADDRESS] = result[APP_PARAMS.DATA][APP_PARAMS.ADDRESS]
                    }
                    if (result[APP_PARAMS.DATA][APP_PARAMS.COMNT_REVIEW_LIST] && result[APP_PARAMS.DATA][APP_PARAMS.COMNT_REVIEW_LIST] != null && result[APP_PARAMS.DATA][APP_PARAMS.COMNT_REVIEW_LIST].length > 0) {

                        data[APP_PARAMS.COMNT_REVIEW_LIST] = result[APP_PARAMS.DATA][APP_PARAMS.COMNT_REVIEW_LIST]
                    }
                    if (result[APP_PARAMS.DATA][APP_PARAMS.DELIVERY_TIME]) {
                        data[APP_PARAMS.DELIVERY_TIME] = result[APP_PARAMS.DATA][APP_PARAMS.DELIVERY_TIME]
                    }
                    if (result[APP_PARAMS.DATA][APP_PARAMS.DESTINATION]) {
                        data[APP_PARAMS.DESTINATION] = result[APP_PARAMS.DATA][APP_PARAMS.DESTINATION]//result[APP_PARAMS.DATA]
                    }
                    if (result[APP_PARAMS.DATA][APP_PARAMS.SHIPPING_CAHNGES]) {
                        data[APP_PARAMS.SHIPPING_CAHNGES] = result[APP_PARAMS.DATA][APP_PARAMS.SHIPPING_CAHNGES]//result[APP_PARAMS.DATA]
                    }
                    if (result[APP_PARAMS.DATA][APP_PARAMS.SHIPPING_CHARGE]) {
                        data[APP_PARAMS.SHIPPING_CHARGE] = result[APP_PARAMS.DATA][APP_PARAMS.SHIPPING_CHARGE]//result[APP_PARAMS.DATA]
                    }
                    if (result[APP_PARAMS.DATA][APP_PARAMS.INSTALL_DETAIL]) {
                        data[APP_PARAMS.INSTALL_DETAIL] = result[APP_PARAMS.DATA][APP_PARAMS.INSTALL_DETAIL]//result[APP_PARAMS.DATA]
                    }
                    if (result[APP_PARAMS.DATA][APP_PARAMS.CART] && result[APP_PARAMS.DATA][APP_PARAMS.CART] != null) {
                        data[APP_PARAMS.CART] = result[APP_PARAMS.DATA][APP_PARAMS.CART]//result[APP_PARAMS.DATA]
                    }
                    if (result[APP_PARAMS.DATA][APP_PARAMS.PRODUCT_VARINET_LIST] && result[APP_PARAMS.DATA][APP_PARAMS.PRODUCT_VARINET_LIST] != null) {
                        data[APP_PARAMS.PRODUCT_VARINET_LIST] = Utils.parseVarinetData(result[APP_PARAMS.DATA][APP_PARAMS.PRODUCT_VARINET_LIST])

                    }
                    if (result[APP_PARAMS.DATA][APP_PARAMS.DELIVERY_MZG] != undefined && result[APP_PARAMS.DATA][APP_PARAMS.DELIVERY_MZG] != null) {

                        try {
                            Toast.showErrorToast(result[APP_PARAMS.DATA][APP_PARAMS.DELIVERY_MZG])
                            //return;

                        } catch (error) {
                            alert(error)
                        }
                    }

                    else if (isADdress) {
                        if (result[APP_PARAMS.DATA] && result[APP_PARAMS.DATA].length > 0) {
                            result[APP_PARAMS.DATA].forEach(element => {
                                element['isSelected'] = false
                            });
                            return data = result[APP_PARAMS.DATA]
                        }
                    }
                    if (isWish) {
                        data = result[APP_PARAMS.DATA]
                    }
                    return data
                } else if (result.hasOwnProperty([APP_PARAMS.RES_PKT])) {
                    if (result[APP_PARAMS.RES_PKT][APP_PARAMS.ADDRESS] != undefined && result[APP_PARAMS.RES_PKT][APP_PARAMS.ADDRESS] != null) {
                        return true
                    } else {
                        return false
                    }
                } else if (result[APP_PARAMS.MESSAGE]) {
                    Toast.showErrorToast(result[APP_PARAMS.MESSAGE])
                }
            } else {
                Toast.showErrorToast(translate('MESSAGE_SERVER_ERROR'))
            }
        }
    }
    addInWishListApi = () => {
        let data = {
            [APP_PARAMS.CUSTOMER_ID]: global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID],
            [APP_PARAMS.PRODUCT_ID]: this.dataResponse[APP_PARAMS.PRODUCTS][APP_PARAMS.U_UID],
            [APP_PARAMS.PRODUCT_VARIENT_ID_LIST]: this.productVarintIdList,
            [APP_PARAMS.PRODUCT_VARIANTS]: this.productVariants
        }
        this.props.addProductInWishListAPI(data).then(result => {
            if (result) {
                if (result.hasOwnProperty(APP_PARAMS.SUCCESS) && result[APP_PARAMS.SUCCESS] && result.hasOwnProperty(APP_PARAMS.DATA)) {

                    this.setState({ isWish: result[APP_PARAMS.DATA] })
                    if (result.hasOwnProperty(APP_PARAMS.DATA)) {
                        let successADd = false
                        if (result.data == true) {
                            successADd = true
                            //  this.scaleValue.setValue(0);
                            Animated.timing(this.scaleValue, {
                                toValue: 1,
                                duration: 250,
                                easing: Easing.linear,
                                useNativeDriver: true
                            }).start();
                            global[KEY.WISH_COUNT] = global[KEY.WISH_COUNT] ? global[KEY.WISH_COUNT] + 1 : 1
                            // this.props.dataUpdateInProductDetail({ data: { [APP_PARAMS.WISH]: true } })
                            this.props.dataUpdateInProductDetail({ data: { [APP_PARAMS.PRODUCT_VARIENT_ID_LIST]: this.productVarintIdList, [APP_PARAMS.WISH]: true } })


                        } else {
                            successADd = false

                            DeviceEventEmitter.emit(KEY.COME_BACK_FROM_CATEGORY)
                            this.scaleValue.setValue(0);
                            Animated.timing(this.scaleValue, {
                                toValue: 0,
                                duration: 250,
                                easing: Easing.linear,
                                useNativeDriver: true
                            }).start();

                            global[KEY.WISH_COUNT] = global[KEY.WISH_COUNT] - 1
                            ///   this.props.dataUpdateInProductDetail({ data: { [APP_PARAMS.WISH]: false } })
                            this.props.dataUpdateInProductDetail({ data: { [APP_PARAMS.PRODUCT_VARIENT_ID_LIST]: this.productVarintIdList, [APP_PARAMS.WISH]: false } })


                        }

                        this.setState({ wishCount: global[KEY.WISH_COUNT] })
                    } else {
                        (result[APP_PARAMS.MESSAGE]) &&
                            Toast.showErrorToast(result[APP_PARAMS.MESSAGE])
                    }

                } else {
                    (result[APP_PARAMS.MESSAGE]) &&
                        Toast.showErrorToast(result[APP_PARAMS.MESSAGE])
                }
            } else {
                Toast.showErrorToast(translate('MESSAGE_SERVER_ERROR'))
            }
        })
    }
    //Action
    selectOneVarient = (item, index) => {

        let dataTemp = this.state.tempData[APP_PARAMS.PRODUCT_VARINET_LIST][0].data
        let prroductVarintDat = []
        let newData = dataTemp.filter((elt, eltIndx) => {
            if (index === eltIndx)
                elt[APP_PARAMS.DEF_VARIENT] = true
            else
                elt[APP_PARAMS.DEF_VARIENT] = false
            return index === eltIndx && elt
        })
        let productVariants = {
            [APP_PARAMS.PRODUCT_ATT_ID]: item[APP_PARAMS.PRODUCT_ATTRIB_ID],
            [APP_PARAMS.ATTR_VALUE_ID]: item[APP_PARAMS.ATTR_VALUE_ID],
            [APP_PARAMS.AMOUNT_WITHOUT_DISCOUNT]: item[APP_PARAMS.DISCOUNT_PRICE],
            [APP_PARAMS.PRICE]: item[APP_PARAMS.PRICE],
            [APP_PARAMS.PRODUCT_VARIANT_ID]: item[APP_PARAMS.PRODUCT_VARIANT_ID],
            [APP_PARAMS.QUANTITY]: item[APP_PARAMS.QUANTITY]
        }
        this.productVarintIdList = [item.productVariantsId]
        this.productVariants = productVariants
        this.props.dataUpdateInProductDetail({
            data:
            {
                [APP_PARAMS.PRODUCT_VARIENT_ID_LIST]: this.productVarintIdList,
                [APP_PARAMS.CART]: item[APP_PARAMS.CART],
                [APP_PARAMS.WISH]: item[APP_PARAMS.WISH]
            }
        })
        this.cartActive({ [APP_PARAMS.CART]: item[APP_PARAMS.CART], [APP_PARAMS.WISH]: item[APP_PARAMS.WISH] })
        this.setState({ varintOfProduct: [...newData] })
    }
    applySelectVarient = (data) => {
console.log("applySelectVarient::---",data);

        let productVariants = {
            [APP_PARAMS.PRODUCT_ATT_ID]: data[0][APP_PARAMS.PRODUCT_ATTRIB_ID],
            [APP_PARAMS.ATTR_VALUE_ID]: data[0][APP_PARAMS.ATTR_VALUE_ID],
            [APP_PARAMS.AMOUNT_WITHOUT_DISCOUNT]: data[0][APP_PARAMS.DISCOUNT_PRICE],
            [APP_PARAMS.PRICE]: data[0][APP_PARAMS.PRICE],
            [APP_PARAMS.PRODUCT_VARIANT_ID]: data[0][APP_PARAMS.PRODUCT_VARIANT_ID],
            [APP_PARAMS.QUANTITY]: data[0][APP_PARAMS.QUANTITY]
        }
        let productVarintId = data.map(item => {
            return item.productVariantsId
        })
        this.productVarintIdList = productVarintId
        this.productVariants = productVariants

        this.props.dataUpdateInProductDetail({
            data:
            {
                [APP_PARAMS.PRODUCT_VARIENT_ID_LIST]: productVarintId,
                [APP_PARAMS.CART]: data[0][APP_PARAMS.CART],
                [APP_PARAMS.WISH]: data[0][APP_PARAMS.WISH]
            }
        })
        this.setState({ varintOfProduct: [...data] })
    }
    selectMultipleVarient = () => {
        this.props.navigation.navigate(SCREENS.COLOR_VARIENT, {
            selectVarintObj: this.state.tempData[APP_PARAMS.PRODUCT_VARINET_LIST], product: this.state.tempData[APP_PARAMS.PRODUCTS],
            selectVarient: (data) => this.applySelectVarient(data)
        })
    }
    showAddressModalView = () => {
        this.setState({ modalAddressVisible: true })
    }
    closeAddressPopover = () => {
        this.setState({ modalAddressVisible: false })
    }
    selectAddress = (item, index) => {
        let addressId = undefined
        let pinCode = undefined
        let addressList = [...this.state.addressArrData]
        addressList.map((elemt, indexElt) => {
            if (index === indexElt) {
                elemt.isSelected = true
                addressId = elemt[APP_PARAMS.U_UID]
                pinCode = elemt[APP_PARAMS.POSTAL_CODE]
            } else {
                elemt.isSelected = false
            }
        })
        this.setState({ addressArrData: [...addressList], modalAddressVisible: false }, () =>
            this.selctAddressSetPinCode(pinCode, addressId)
        )
    }
    selctAddressSetPinCode = (pinCode, addressId) => {
        clearData(KEY.POSTAL_CODE)
        this.pincodeAPI(pinCode, addressId)
    }
    addInWishList = () => {

        if (global[KEY.USER_DATA] != undefined && global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID] != undefined) {
            this.addInWishListApi()
        } else {
            this.props.navigation.navigate('Login_As_GUEST', { goBackLogin: () => this.goBackLogin() })
            this.props.navigation.navigate("Login_As_GUEST", { isFromCatWish: true })
        }
    }
    addCart = () => {

        if (this.state.tempData && this.state.tempData[APP_PARAMS.PRODUCT_VARINET_LIST] && this.state.varintOfProduct != undefined) {
            if (this.state.varintOfProduct != undefined && this.state.varintOfProduct.length > 0) {
            } else if (this.state.varintOfProduct.length == 0 && this.state.tempData[APP_PARAMS.PRODUCT_VARINET_LIST].length != 0) {
                this.selectMultipleVarient()
                return;
            }
        }
        if (this.state.isAddedCart == false) {
            let data = {
                [APP_PARAMS.PRODUCT_ID]: this.dataResponse[APP_PARAMS.PRODUCTS][APP_PARAMS.U_UID],
                [APP_PARAMS.REQ_ID]: Utils.getRequestId(),
                [APP_PARAMS.CUSTOMER_ID]: global[KEY.USER_DATA] != undefined && global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID] != undefined ? global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID] : '',
                [APP_PARAMS.PRODUCT_VARIENT_ID_LIST]: this.productVarintIdList,
                [APP_PARAMS.PRODUCT_VARIANTS]: this.productVariants
            }
            this.props.addCartRemoveCartAPI(data).then(result => {
                let data = this.responseAPI(result)
                if (data[APP_PARAMS.CART] != undefined && data[APP_PARAMS.CART] != null) {
                    this.props.dataUpdateInProductDetail({ data: { [APP_PARAMS.PRODUCT_VARIENT_ID_LIST]: this.productVarintIdList, [APP_PARAMS.CART]: data[APP_PARAMS.CART] } })

                    global[KEY.CART_COUNT] = global[KEY.CART_COUNT] != undefined ? global[KEY.CART_COUNT] + 1 : 1
                    this.setState({ cartCount: global[KEY.CART_COUNT] })
                    this.cartActive(data)

                }
            })
        } else {
            this.props.orderSummaryCallFrom({
                [CONST.IS_FROM]: SCREENS.CART, [CONST.DATA]: this.dataResponse[APP_PARAMS.PRODUCTS]
            })
            this.props.navigation.navigate('OrderSummary')
        }
    }
    cartActive = (data) => {

        if (data[APP_PARAMS.CART] != undefined && data[APP_PARAMS.CART] != null) {
            this.setState({ isAddedCart: data[APP_PARAMS.CART] }, () => {
                if (this.state.isAddedCart) {
                    //global[KEY.CART_COUNT] = global[KEY.CART_COUNT]!=undefined? global[KEY.CART_COUNT] + 1 : 1
                    // this.setState({cartCount:global[KEY.CART_COUNT]})  
                }
            })

        }
        if (data[APP_PARAMS.WISH] != undefined) {
            this.setState({ isWish: data[APP_PARAMS.WISH] })
        }
    }
    goBackLogin = () => {
        this.buyNowApiForCheckAddrss()
    }
    cartBtnClk = () => {
        this.props.orderSummaryCallFrom({
            [CONST.IS_FROM]: SCREENS.CART,
            [CONST.DATA]: this.dataResponse[APP_PARAMS.PRODUCTS],
            // [CONST.PRODUCT_VARIENT_ID_LIST]
        })
        this.props.navigation.navigate(SCREENS.ORDER_SUMMARY)
    }
    goToLogin = () => {
        this.props.changeIsFromCall({ [APP_PARAMS.PAGE_TYPE]: SCREENS.CATEGORY_SUB_DETAIL })
        this.props.navigation.navigate('Login_As_GUEST', { goBackLogin: () => this.goBackLogin() })
    }
    buyNowClk = () => {
        global[KEY.USER_DATA] != undefined && global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID] != undefined ?
            this.buyNowApiForCheckAddrss() : this.goToLogin()
        // this.props.navigation.navigate('Auth',{isFrom:'CategorySubDetail'})
    }
    onShare = async () => {
     // let mzg = Platform.OS == 'android' ? 'http://172.104.187.80/view_all_bug_page.php?refresh=true' + 'React Native | A framework for building native apps using React' : 'React Native | A framework for building native apps using React'
        let mzg = Platform.OS == 'android' ?(this.dataResponse&& this.dataResponse[APP_PARAMS.SHARE_URL] ): ''
        console.log("message::--",mzg);

        try {
            const result = await Share.share({
                message: mzg,
                url: this.dataResponse&&this.dataResponse[APP_PARAMS.SHARE_URL]
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };
    renderListImage = (item, index) => {
        this.setState({ selectedImg: item != undefined && item != '' ? item : PLACEHOLDER_PRODUCT_IMG })
    }
    //API
    buyNowApiForCheckAddrss = () => {
        let data = {
            [APP_PARAMS.REQ_ID]: Utils.getRequestId(),
            [APP_PARAMS.CUSTOMER_ID]: global[KEY.USER_DATA] != undefined && global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID] != undefined &&
                global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID],
            [APP_PARAMS.PRODUCT_ID]: this.dataResponse[APP_PARAMS.PRODUCTS][APP_PARAMS.U_UID],
            [APP_PARAMS.PRODUCT_VARIENT_ID_LIST]: this.productVarintIdList,
            [APP_PARAMS.PRODUCT_VARIANTS]: this.productVariants
        }

        this.props.getBuyDataAPi(data).then(result => {
            if (this.responseAPI(result)) {
                this.props.orderSummaryCallFrom({
                    [CONST.IS_FROM]: SCREENS.ORDER_SUMMARY,
                    [APP_PARAMS.PRODUCT_ID]: this.dataResponse[APP_PARAMS.PRODUCTS][APP_PARAMS.U_UID],
                    [APP_PARAMS.PRODUCT_VARIENT_ID_LIST]: this.productVarintIdList,
                    [APP_PARAMS.PRODUCT_VARIANTS]: this.productVariants
                })
                if (!this.state.isAddedCart) {
                    global[KEY.CART_COUNT] = global[KEY.CART_COUNT] ? global[KEY.CART_COUNT] + 1 : 1
                    if (global[KEY.CART_COUNT] != undefined) {
                        this.setState({ cartCount: global[KEY.CART_COUNT], isAddedCart: true })
                    }
                }
                this.props.navigation.navigate('OrderSummary')
            } else {
                this.props.addressIsFromCall({
                    [CONST.IS_FROM]: SCREENS.CATEGORY_SUB_DETAIL,
                    [CONST.TO]: SCREENS.ADD_ADDRESS
                })
                this.props.navigation.navigate('AddAddress')
            }
        })
    }
    pincodeAPI = (txt, id) => {
        let dict = {
            [APP_PARAMS.PRODUCT_ID]: this.dataResponse ?
                this.dataResponse[APP_PARAMS.PRODUCTS][APP_PARAMS.U_UID] : this.data[APP_PARAMS.U_UID],
            [APP_PARAMS.REQ_ID]: Utils.getRequestId(),
            [APP_PARAMS.POSTAL_CODE]: txt,
            [APP_PARAMS.ADDRESS_ID]: id,
            [APP_PARAMS.CUSTOMER_ID]: global[KEY.USER_DATA] != undefined && global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID] && global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID],
        }
        this.setState({ modalAddressVisible: false })
        this.props.addPostalCodeAPI(dict).then(result => {
            let data = this.responseAPI(result)
            this.setDataOfDeliveryTimeCharge(data, txt)
        })
    }
    similarProductClk = (item, index) => {
        this.props.navigation.push(SCREENS.CATEGORY_SUB_DETAIL, { [APP_PARAMS.DATA]: item })
    }
    showModalOfImg = () => {
        return (
            <Modal
                style={{ justifyContent: 'flex-end' }}
                animationType="slide"
                // style={{backgroundColor:'red',width:'100%',height:'100%'}}
                transparent={false}
                visible={this.state.modalOfImg}
                onDismiss={() => this.setState({ modalOfImg: !this.state.modalOfImg })}
                onRequestClose={() => this.setState({ modalOfImg: !this.state.modalOfImg })}>
                <View style={{ flex: 1, backgroundColor: colors.white }}>
                    <Ripple style={{ padding: DIMENS.px_10, alignSelf: 'flex-start' }} onPress={() => this.setState({ modalOfImg: !this.state.modalOfImg })}>
                        <Image source={CROSS} />
                    </Ripple>
                    <View style={{ flex: 1 }}>
                        <ImageSlider
                            loopBothSides
                            autoPlayWithInterval={1000}
                            images={this.dataResponse[APP_PARAMS.PRODUCTS][APP_PARAMS.IMG_LOC_LIST]}//{this.sliderData}
                            style={{ backgroundColor: colors.white }}
                            customSlide={({ index, item, style, width }) => (
                                // It's important to put style here because it's got offset inside
                                <View key={index} style={{ marginHorizontal: 5 }} >
                                    <CommonImage
                                        source={{ uri: item }}
                                        styles={{ width: width - 10, height: HEIGHT - 100, resizeMode: 'stretch', borderRadius: 4 }}
                                    />
                                </View>
                            )}
                        />
                    </View>
                </View>
            </Modal>
        )
    }
    //Render

    renderProductSlices = (item, index, lenght) => {
        return (
            index <= 3 ?
                <View style={{ marginLeft: 10 }}>
                    {
                        <Ripple style={{
                            borderColor: colors.black, borderWidth: DIMENS.px_05,
                            height: 90, justifyContent: 'center'
                        }} onPress={() => index == 3 && this.state.productSlices != undefined && this.state.productSlices.length > 3 ? this.setState({ modalOfImg: true }) : this.renderListImage(item, index)}>
                            <Image source={item != undefined && item != '' ? { uri: item } : PLACEHOLDER_PRODUCT_IMG} style={{ width: width - 10, height: 70, resizeMode: 'contain', marginHorizontal: DIMENS.px_5 }} />
                            {
                                index == 3 && this.state.productSlices != undefined && this.state.productSlices.length > 3 &&
                                <View style={{
                                    position: 'absolute', alignItems: 'center', justifyContent: 'center', zIndex: 1,
                                    width: width, height: 90, backgroundColor: colors.blackTransparent
                                }}>

                                    <Text style={{
                                        color: colors.white,
                                        fontFamily: FONT_FAMILIY.Roboto_Medium,
                                        fontSize: DIMENS.txt_size_medium_1, textAlign: 'center'
                                    }}>

                                        {lenght != undefined && `+ ${lenght - 4}`}
                                    </Text>
                                </View>
                            }
                        </Ripple>
                    }
                </View>
                : null
        )
    }
    renderOffer = (item, index) => {
        return (
            <CommonItemListForCat
                item={item}
                onPress={() => alert('go Offer')} />
        )
    }
    paymentFotter = (isOfferPayment) => {
        return (
            <Ripple style={{
                flexDirection: 'row', alignItems: 'center', marginTop: DIMENS.px_10, alignSelf: 'flex-start',
                borderWidth: DIMENS.px_05, borderColor: colors.gray, padding: DIMENS.px_10, borderRadius: DIMENS.px_2
            }} onPress={() => isOfferPayment != undefined ? isOfferPayment ? this.props.navigation.navigate('PaymentOption') :
                this.props.navigation.push(SCREENS.CATEGORY_DETAIL, { [APP_PARAMS.CAT_ID]: this.dataResponse[APP_PARAMS.PRODUCTS][APP_PARAMS.CAT_ID] }) :
                //,[APP_PARAMS.PRODUCT_ID]: this.dataResponse[APP_PARAMS.PRODUCTS][APP_PARAMS.U_UID] 


                this.props.navigation.navigate(SCREENS.CATEGORY_PRODUCT_DETAIL, { [APP_PARAMS.PRODUCT_ID]: this.dataResponse[APP_PARAMS.PRODUCTS][APP_PARAMS.U_UID] })
            }
            >
                <Text style={{
                    fontSize: DIMENS.txt_size_medium, alignSelf: 'flex-start',
                    fontFamily: FONT_FAMILIY.Roboto_Medium, textAlign: 'center',
                    color: colors.primary, marginRight: DIMENS.px_5
                }}>{!isOfferPayment ? translate('VIEW_ALL') : translate('VIEW_DETAIL')}</Text>
                <Image source={NEXT} style={{ tintColor: colors.primary }} />
            </Ripple>
        )
    }
    offerFotter = () => {
        return (
            <View >
                <View style={{ flexDirection: 'row', marginTop: DIMENS.px_20 }}>
                    <Text style={{
                        marginRight: DIMENS.px_15, alignSelf: 'flex-start',
                        fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular,
                        color: colors.grayClr,
                        borderColor: colors.lightGray, borderWidth: DIMENS.px_05, padding: 10
                    }}>
                        {translate('FREE_DELIVERY')}</Text>
                    <Text style={{
                        alignSelf: 'flex-start', fontSize: DIMENS.txt_size_medium,
                        fontFamily: FONT_FAMILIY.Roboto_Regular,
                        color: colors.grayClr,
                        borderColor: colors.lightGrayText, borderWidth: DIMENS.px_05, padding: 10
                    }}>
                        {translate('NO_COST_EMI') + ' ' + CURRENCY.RUPEES + '600/' + translate('MONTH')}</Text>
                </View>

            </View>
        )
    }
    headerRatngReview = () => {
        return (
            <View style={{}}>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }}>
                    <View style={{ alignItems: 'center', paddingHorizontal: 15 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                            <View style={{
                                flexDirection: 'row', alignItems: 'center',
                                backgroundColor: colors.primary, paddingHorizontal: DIMENS.px_15, borderRadius: 20, padding: DIMENS.px_5
                            }}>
                                {/* justifyContent: 'center' */}
                                <Text style={{
                                    fontSize: DIMENS.txt_size_large_extra_20, fontFamily: FONT_FAMILIY.Roboto_Bold,
                                    color: colors.white, alignSelf: 'center', marginRight: 5
                                }}>{this.dataResponse && this.dataResponse[APP_PARAMS.PRODUCTS] && this.dataResponse[APP_PARAMS.PRODUCTS][APP_PARAMS.TOTAL_RATING]}</Text>

                                <Image source={STAR} style={{ tintColor: colors.white, width: 20, height: 20, resizeMode: 'contain', marginLeft: DIMENS.px_2 }} />

                            </View>
                            <Text style={{ fontSize: DIMENS.txt_size_medium, textAlign: 'center', fontFamily: FONT_FAMILIY.Roboto_Regular, color: colors.grayClr, marginHorizontal: 5 }}>
                                {`${this.dataResponse && this.dataResponse[APP_PARAMS.PRODUCTS] && this.dataResponse[APP_PARAMS.PRODUCTS][APP_PARAMS.TOTAL_RATING]} ratings and ${this.dataResponse && this.dataResponse[APP_PARAMS.PRODUCTS] && this.dataResponse[APP_PARAMS.PRODUCTS][APP_PARAMS.TOTAL_REVIEW]} review`}</Text>

                        </View>
                    </View>
                    {/* {
                        <CommonRatingReview />
                    } */}
                </View>

            </View>
        )
    }

    renderHeader = (section) => {
        return (<View style={{ padding: 10 }}>
            <Text style={{
                color: colors.black,
                fontFamily: FONT_FAMILIY.Roboto_Medium,
                fontSize: DIMENS.txt_size_medium_14
            }}>
                {section.title}
            </Text>
        </View>)
    }

    renderHighlight = (item) => {

        return (
            item != undefined &&
            <View style={{ padding: DIMENS.px_8 }}>
                <View style={{ flexDirection: item.description != undefined ? 'row' : "column", flex: 1 }}>
                    {
                        item.title != undefined &&
                        <View style={{ flexDirection: item.description != undefined ? 'column' : 'row', flex: item.description != undefined ? .4 : 1 }}>
                            <Text style={{
                                color: colors.grayClr,
                                fontFamily: FONT_FAMILIY.Roboto_Regular,
                                fontSize: DIMENS.txt_size_medium,
                            }}>
                                {item.title}
                            </Text>
                        </View>
                    }
                    {
                        item.description != undefined &&
                        <View style={{ flex: .6 }}>
                            <Text style={{
                                color: colors.grayClr,
                                fontFamily: FONT_FAMILIY.Roboto_Regular,
                                fontSize: DIMENS.txt_size_small_12
                            }}>
                                {item.description}
                            </Text>
                        </View>
                    }
                </View>
                {
                    item.description != undefined &&
                    <View style={{ width: '100%', backgroundColor: colors.lightGraytransparent, height: DIMENS.px_05, marginTop: DIMENS.px_10 }} />
                }
            </View>
        )
    }

    renderReviewItem = (item, index) => {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ marginHorizontal: DIMENS.px_15, marginVertical: DIMENS.px_10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <View style={{
                            borderWidth: DIMENS.px_05, borderColor: colors.lightGraytransparent, backgroundColor: colors.primary, flexDirection: 'row',
                            justifyContent: 'center', alignItems: 'center', height: DIMENS.px_15, width: DIMENS.px_35,
                            marginRight: DIMENS.px_10, padding: DIMENS.px_10
                        }}>
                            <Text style={{ color: colors.white, fontFamily: FONT_FAMILIY.Roboto_Medium, fontSize: DIMENS.txt_size_medium, marginRight: DIMENS.px_2 }}>
                                {item.star}</Text>
                            <Image source={STAR} style={{ resizeMode: 'center', tintColor: colors.white }} />
                        </View>
                        <Text style={{ color: colors.black, fontFamily: FONT_FAMILIY.Roboto_Regular, fontSize: DIMENS.txt_size_medium, fontWeight: '700' }}>
                            {item[APP_PARAMS.TITLE]}</Text>
                    </View>
                    <Text style={{
                        color: colors.black, fontFamily: FONT_FAMILIY.Roboto_Regular,
                        fontSize: DIMENS.txt_size_medium, marginVertical: DIMENS.px_5
                    }}>
                        {item[APP_PARAMS.DESRCIPTION]}</Text>
                    {item[APP_PARAMS.IMG_LOC_LIST] != undefined && item[APP_PARAMS.IMG_LOC_LIST] != null && item[APP_PARAMS.IMG_LOC_LIST].length > 0 &&
                        <FlatList
                            style={{ marginLeft: -10, marginVertical: DIMENS.px_5 }}
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                            data={item[APP_PARAMS.IMG_LOC_LIST]}
                            renderItem={({ item, index }) => this.renderRatingReviewSlicing(item, index, true)}
                            extraData={this.state}
                            keyExtractor={(item, index) => index.toString()} />}

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: DIMENS.px_5, }}>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ color: colors.lightGrayClr, fontFamily: FONT_FAMILIY.Roboto_Regular, fontSize: DIMENS.txt_size_small_12, fontWeight: '700' }}>
                                {/* {item.address != undefined && item.address != null && item.address} */}
                                {item[APP_PARAMS.CUSTOMER_NAME]}
                            </Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: DIMENS.px_5 }}>
                                {item[APP_PARAMS.APPROVE] != undefined && item[APP_PARAMS.APPROVE] != null && item[APP_PARAMS.APPROVE] &&
                                    <View style={{ flexDirection: 'row', }}>
                                        <Image source={CHECKMARK} style={{
                                            resizeMode: 'center', tintColor: colors.lightGrayClr, marginTop: DIMENS.px_2,
                                            marginRight: DIMENS.px_5
                                        }} />
                                        <Text style={{ color: colors.lightGrayClr, fontFamily: FONT_FAMILIY.Roboto_Regular, fontSize: DIMENS.txt_size_small_12 }}>
                                            {translate('CERTIFIED_BUYER') + " . "}</Text>
                                    </View>}
                                <Text style={{ color: colors.lightGrayClr, fontFamily: FONT_FAMILIY.Roboto_Regular, fontSize: DIMENS.txt_size_small_12 }}>
                                    {item[APP_PARAMS.CREATED_TIME]}</Text>
                            </View>
                        </View>
                        {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ripple onPress={() => alert('like')}>
                                <Image source={DONE} style={{ resizeMode: 'center', width: DIMENS.px_20, height: DIMENS.px_20 }} />
                            </Ripple>
                            <Text style={{ color: colors.lightGrayClr, fontFamily: FONT_FAMILIY.Roboto_Regular, fontSize: DIMENS.txt_size_small_12 }}>
                                {item.likeCount}</Text>
                            <Ripple onPress={() => alert('dislike')}>
                                <Image source={DONE} style={{ resizeMode: 'center', marginLeft: DIMENS.px_10, width: DIMENS.px_20, height: DIMENS.px_20 }} />
                            </Ripple>
                            <Text style={{ color: colors.lightGrayClr, fontFamily: FONT_FAMILIY.Roboto_Regular, fontSize: DIMENS.txt_size_small_12 }}>
                                {item.dislikeCount}</Text>
                        </View> */}
                    </View>
                </View>
                {/*Seprator*/}
                <View style={{ backgroundColor: colors.lightGraytransparent, height: DIMENS.px_05, width: '100%' }} />
            </View>
        )

    }
    renderRatingReviewSlicing = (item, index, reviewSlice) => {
        return (
            <View style={{ marginLeft: 10 }}>
                {
                    <View style={{
                        borderColor: colors.lightGrayText, borderWidth: DIMENS.px_05,
                        justifyContent: 'center'
                    }}>
                        <Image source={{ uri: item }}
                            style={{
                                width: item != undefined ? WIDTH * 0.15 : WIDTH * 0.3,
                                height: item != undefined ? WIDTH * 0.15 : WIDTH * 0.3,
                            }} />

                    </View>
                }
            </View>
        )
    }
    renderPayment = (item, index) => {
        return (
            <CommonColumnTextDetils
                item={item}
            />
        )
    }

    renderSimmilarProduct = (item, index) => {
        return (
            <CommonSimmilarItem
                item={item}
                onPress={() => this.similarProductClk(item, index)}
            />
        )
    }
    renderAddress = (item, index) => {
        return (
            <View style={{ padding: 15, borderBottomColor: colors.lightGraytransparent, borderBottomWidth: DIMENS.px_05, }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ripple style={{ flex: 1, }} onPress={() => this.selectAddress(item, index)}>
                        <Image source={item.isSelected ? RADIO_POINT : CIRCLE} style={{ width: 18, height: 18, padding: 10 }} />
                    </Ripple>
                    <Text
                        numberOfLines={2}
                        style={{
                            flex: 7, fontFamily: FONT_FAMILIY.Roboto_Regular,
                            fontSize: DIMENS.txt_size_medium_1, color: colors.black,
                            marginHorizontal: DIMENS.px_10
                        }}>
                        {`${item[APP_PARAMS.FIRST_NAME]}-${item[APP_PARAMS.POSTAL_CODE]}`}</Text>
                    <View style={{ flex: 2, backgroundColor: colors.whiteBackground, paddingHorizontal: DIMENS.px_10, paddingVertical: DIMENS.px_5 }}>
                        <Text style={{ textAlign: 'center', fontFamily: FONT_FAMILIY.Roboto_Regular, fontSize: DIMENS.txt_size_medium, color: colors.black }}>
                            {item.addressType.toUpperCase()}</Text>
                    </View>
                </View>
                <Text style={{ fontFamily: FONT_FAMILIY.Roboto_Regular, fontSize: DIMENS.txt_size_medium, color: colors.black, marginVertical: DIMENS.px_10 }}>
                    {item[APP_PARAMS.APARTMENT_SUIT]}</Text>
                <Text style={{ fontFamily: FONT_FAMILIY.Roboto_Regular, fontSize: DIMENS.txt_size_medium, color: colors.black }}>
                    {item[APP_PARAMS.PHONE]}</Text>

            </View>
        )
    }
    addressHeader = () => {
        return (
            <View style={{ backgroundColor: colors.white, paddingVertical: 15, borderBottomColor: colors.lightGraytransparent, borderBottomWidth: DIMENS.px_05, width: '100%', }}>
                <View style={{ paddingHorizontal: 10, justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ripple onPress={() => this.closeAddressPopover()}>
                            <Image source={CROSS} style={{ padding: 10, width: DIMENS.px_15, height: DIMENS.px_15, resizeMode: 'center' }} />
                        </Ripple>
                        <Text style={{ marginHorizontal: DIMENS.px_10, fontFamily: FONT_FAMILIY.Roboto_Regular, fontSize: DIMENS.txt_size_medium_1, color: colors.black }}>{translate('SELECT_DELIVERY_ADDRSS')}</Text>
                    </View>
                </View>
            </View>

        )
    }
    addressViewFooter = () => {
        return (
            <View style={{ paddingHorizontal: DIMENS.px_10, paddingVertical: DIMENS.px_15 }}>
                <TextInput
                    style={{
                        height: DIMENS.px_35,
                        fontSize: DIMENS.txt_size_medium,
                        fontFamily: FONT_FAMILIY.Roboto_Regular,
                        color: colors.black, marginBottom: DIMENS.px_15,
                        borderBottomColor: colors.lightGraytransparent, borderBottomWidth: DIMENS.px_05,
                    }}
                    value={this.state.pinCodeTxt}
                    placeholderTextColor={colors.lightGrayText}
                    placeholder={translate('PIN_CODE')}
                    keyboardType={'number-pad'}
                    maxLength={6}
                    onChangeText={(text) => this.setState({ pinCodeTxt: text })}
                />
                <Ripple style={{}} onPress={() => this.pincodeAPI(this.state.pinCodeTxt)}>
                    <Text style={{
                        fontFamily: FONT_FAMILIY.Roboto_Regular, fontSize: DIMENS.txt_size_medium,
                        color: colors.white, alignSelf: 'flex-start',
                        backgroundColor: colors.primary, paddingHorizontal: DIMENS.px_15, paddingVertical: DIMENS.px_8,
                        borderRadius: 3
                    }}>
                        {translate('CHECK')}</Text>
                </Ripple>
            </View>
        )
    }
    renderModalAddressView = () => {
        return (
            <Modal
                style={{ justifyContent: 'flex-end' }}
                animationType="slide"
                // style={{backgroundColor:'red',width:'100%',height:'100%'}}
                transparent={true}
                visible={this.state.modalAddressVisible}
                onDismiss={() => this.setState({ modalAddressVisible: !this.state.modalAddressVisible })}
                onRequestClose={() => this.setState({ modalAddressVisible: !this.state.modalAddressVisible })}>
                <View style={{ flex: 1, backgroundColor: colors.blackTransparent }}>
                    <View style={{ maxHeight: HEIGHT * 60 / 100, bottom: 0, width: '100%', position: 'absolute', marginTop: DIMENS.px_10, backgroundColor: colors.white }}>
                        {this.addressHeader()}
                        {this.state.addressArrData &&
                            <FlatList
                                style={{}}
                                data={this.state.addressArrData}
                                renderItem={({ item, index }) => this.renderAddress(item, index)}
                                extraData={this.state}
                                keyExtractor={(item, index) => index.toString()}

                            />
                        }
                        {this.addressViewFooter()}
                    </View>
                </View>
            </Modal>
        )
    }
    renderShowDefultVarient = (item, index) => {

        return (
            <View style={{ paddingVertical: 10 }}>

                <Ripple onPress={() => this.selectMultipleVarient()}
                    disabled={this.state.varintOfProduct.length == 1 ? true : false}
                    style={{
                        marginHorizontal: DIMENS.px_5,
                        width: this.state.varintOfProduct.length == 3 ? WIDTH / 3 - 15 : undefined, borderRightWidth: index != this.state.varintOfProduct.length - 1 ? .5 : undefined, borderStyle: 'dashed', borderColor: colors.lightGrayClr
                    }} >
                    <Text style={{
                        textAlign: this.state.varintOfProduct.length == 1 ? 'left' : 'center',
                        fontSize: DIMENS.txt_size_medium,
                        fontFamily: FONT_FAMILIY.Roboto_Medium,
                        color: colors.colorPrimarydark
                    }}>{`${item.attrName}`}</Text>
                    {/* (${item.length}) */}


                    {
                        this.state.varintOfProduct.length > 1 &&
                        <Text style={{
                            textAlign: 'center',
                            fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular,
                            color: colors.grayClr, marginHorizontal: DIMENS.px_15
                        }}>{item.value}</Text>

                    }
                </Ripple>
                {this.state.varintOfProduct.length == 1 &&
                    <>
                        {
                            this.state.varintOfProduct != undefined && this.state.varintOfProduct.length > 0 &&
                            <FlatList
                                horizontal={true}
                                data={this.state.tempData[APP_PARAMS.PRODUCT_VARINET_LIST][0].data}
                                renderItem={({ item, index }) => {
                                    return (
                                        <Ripple style={{
                                            marginTop: DIMENS.px_10, borderStyle: 'dashed',
                                            borderColor: item[APP_PARAMS.DEF_VARIENT] && item[APP_PARAMS.DEF_VARIENT] === true ? colors.Blue : colors.grayClr,
                                            borderRadius: item.uri == undefined ? 1 : 0, borderWidth: item.uri == undefined ? 1 : 0,
                                            backgroundColor: item[APP_PARAMS.DEF_VARIENT] && item[APP_PARAMS.DEF_VARIENT] === true ? colors.orange : undefined, marginHorizontal: DIMENS.px_5
                                        }}
                                            onPress={() => this.selectOneVarient(item, index)}
                                        >
                                            <Text style={{
                                                padding: 10, color: colors.blueTextClr, textAlign: 'center',
                                                fontFamily: FONT_FAMILIY.Roboto_Regular, fontSize: DIMENS.txt_size_medium_14,
                                                borderStyle: 'dashed', borderRadius: 2
                                            }} >
                                                {item.value}
                                            </Text>
                                        </Ripple>
                                    )
                                }}
                                extraData={this.state.varintOfProduct}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        }
                    </>
                }
            </View>
        )
    }
    render() {
        const cardScale = this.scaleValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [1, 1.1, 1.2]
        });
        let transformStyle = { transform: [{ scale: cardScale }] };

        const { loading, data, addressIsFrom, cartData } = this.props
        let wish = false
        if (data) {
            this.dataResponse = this.state.tempData && this.state.tempData
            console.log("data response::--",    this.dataResponse&&this.dataResponse[APP_PARAMS.PRODUCTS]);
            
            wish = this.state.isWish
            if (wish) {
                Animated.timing(this.scaleValue, {
                    toValue: 1,
                    duration: 250,
                    easing: Easing.linear,
                    useNativeDriver: true
                }).start();
            }
        }
        return (
            <View style={{
                backgroundColor: colors.white,
                flex: 1, width: '100%'
            }}>
                <CommonNavHeader //title={this.data[KEY.NAME]}
                    rightIcon1={HEART}
                    rightIcon={SEARCH}
                    rightIcon2={ORDER}
                    cartCount={this.state.cartCount}
                    wishCount={this.state.wishCount}
                    rightIcon1Press={() => this.props.navigation.navigate(SCREENS.WISHLIST, { [CONST.DATA]: this.dataResponse[APP_PARAMS.PRODUCTS] })}
                    searchPress={() => this.props.navigation.navigate('SearchComponent')}
                    backPress={() =>//this.props.navigation.pop()
                        // this.props.navigation.goBack()
                        NavigationService.popToScren(1)
                    }
                    cartPress={() => this.cartBtnClk()} />

                {
                    this.dataResponse != undefined && this.dataResponse != null &&
                    <View style={{ flex: 1 }}>
                        <View style={{ flex: 1 }}>
                            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50, paddingHorizontal: DIMENS.px_5 }}>
                                {/*Image*/}
                                {this.dataResponse[APP_PARAMS.PRODUCTS] != undefined && this.dataResponse[APP_PARAMS.PRODUCTS] != null ?
                                    <View>

                                        <Ripple style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center', right: DIMENS.px_10, padding: DIMENS.px_5 }}
                                            onPress={() => this.addInWishList()}>
                                            <Animated.View style={transformStyle}>
                                                <Image source={HEART} style={{
                                                    width: DIMENS.px_30, height: DIMENS.px_30, resizeMode: 'contain',
                                                    tintColor: wish ? colors.primary : colors.lightGrayClr
                                                }} />
                                            </Animated.View>
                                        </Ripple>

                                        <Image source={this.state.selectedImg == undefined ? (this.dataResponse[APP_PARAMS.PRODUCTS][APP_PARAMS.IMG_LOC] &&
                                            this.dataResponse[APP_PARAMS.PRODUCTS][APP_PARAMS.IMG_LOC] != '' ?
                                            { uri: this.dataResponse[APP_PARAMS.PRODUCTS][APP_PARAMS.IMG_LOC] } : PLACEHOLDER_PRODUCT_IMG) : { uri: this.state.selectedImg }}
                                            style={{ width: '100%', height: HEIGHT * 30 / 100, resizeMode: 'contain', marginTop: DIMENS.px_35, marginBottom: DIMENS.px_20 }} />

                                        {
                                            this.dataResponse[APP_PARAMS.PRODUCTS][APP_PARAMS.IMG_LOC_LIST] != undefined && this.dataResponse[APP_PARAMS.PRODUCTS][APP_PARAMS.IMG_LOC_LIST].length > 0 &&
                                            // this.state.productSlices != undefined && this.state.productSlices.length > 0 &&
                                            <FlatList style={{ height: 100 }}
                                                scrollEnabled={false}
                                                numColumns={parseInt(WIDTH / noOfimg)}
                                                data={this.dataResponse[APP_PARAMS.PRODUCTS][APP_PARAMS.IMG_LOC_LIST]}
                                                renderItem={({ item, index }) => this.renderProductSlices(item, index, this.dataResponse[APP_PARAMS.PRODUCTS][APP_PARAMS.IMG_LOC_LIST].length)}
                                                keyExtractor={(item, index) => index.toString()} />}
                                    </View> : null}

                                {/** Title View*/}

                                <View style={{ padding: 10 }}>
                                    <Text style={{ fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular, color: colors.black }}>
                                        {this.dataResponse != undefined && this.dataResponse[APP_PARAMS.PRODUCTS] != undefined && this.dataResponse[APP_PARAMS.PRODUCTS][APP_PARAMS.NAME] != undefined && this.dataResponse[APP_PARAMS.PRODUCTS][APP_PARAMS.NAME]}
                                    </Text>

                                    <View style={{ flexDirection: 'row', marginVertical: DIMENS.px_5, alignItems: 'center' }}>
                                        {
                                            this.dataResponse[APP_PARAMS.PRODUCTS] != undefined && this.dataResponse[APP_PARAMS.PRODUCTS][APP_PARAMS.TOTAL_RATING] != undefined && this.dataResponse[APP_PARAMS.PRODUCTS][APP_PARAMS.TOTAL_RATING] != null && this.dataResponse[APP_PARAMS.PRODUCTS][APP_PARAMS.TOTAL_RATING] != 0 &&
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Text style={{ color: colors.green, fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                                                    {this.dataResponse[APP_PARAMS.PRODUCTS][APP_PARAMS.TOTAL_RATING]}</Text>
                                                <Image source={STAR} style={{ width: DIMENS.px_5, height: DIMENS.px_5, marginHorizontal: DIMENS.px_2 }} />
                                            </View>
                                        }
                                        {this.dataResponse[APP_PARAMS.PRODUCTS] != undefined && this.dataResponse[APP_PARAMS.PRODUCTS][APP_PARAMS.TOTAL_REVIEW] != undefined && this.dataResponse[APP_PARAMS.PRODUCTS][APP_PARAMS.TOTAL_REVIEW] != null && this.dataResponse[APP_PARAMS.PRODUCTS][APP_PARAMS.TOTAL_REVIEW] != 0 &&
                                            <Text style={{ color: colors.lightGrayClr, fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                                                {`(${this.dataResponse[APP_PARAMS.PRODUCTS][APP_PARAMS.TOTAL_REVIEW]})`}</Text>
                                        }
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                                        <Text style={{ color: colors.black, fontSize: DIMENS.txt_size_large_extra, fontFamily: FONT_FAMILIY.Roboto_Medium }}>
                                            {this.dataResponse[APP_PARAMS.PRODUCTS] != undefined && this.dataResponse[APP_PARAMS.PRODUCTS][APP_PARAMS.DISCOUNT_PRICE] ? CURRENCY.RUPEES + this.dataResponse[APP_PARAMS.PRODUCTS][APP_PARAMS.DISCOUNT_PRICE] + '' : ''}</Text>
                                        {
                                            this.dataResponse[APP_PARAMS.PRODUCTS] != undefined && this.dataResponse[APP_PARAMS.PRODUCTS][APP_PARAMS.DISCOUNT] != undefined && this.dataResponse[APP_PARAMS.PRODUCTS][APP_PARAMS.DISCOUNT] != 0 || this.dataResponse[APP_PARAMS.PRODUCTS][APP_PARAMS.OFF_IN_PER] != '' && 
                                            this.dataResponse[APP_PARAMS.PRODUCTS][APP_PARAMS.OFF_IN_PER] != 0 ?
                                                <Text style={{ marginLeft: DIMENS.px_8, textDecorationLine: 'line-through', color: colors.lightGrayClr, fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                                                    {this.dataResponse[APP_PARAMS.PRODUCTS][APP_PARAMS.PRICE] && CURRENCY.RUPEES + this.dataResponse[APP_PARAMS.PRODUCTS][APP_PARAMS.PRICE] + ''}</Text> : null
                                        }
                                        {
                                            this.dataResponse[APP_PARAMS.PRODUCTS] != undefined && this.dataResponse[APP_PARAMS.PRODUCTS][APP_PARAMS.DISCOUNT] != undefined && this.dataResponse[APP_PARAMS.PRODUCTS][APP_PARAMS.DISCOUNT] != 0 &&
                                            <Text style={{ marginLeft: DIMENS.px_5, color: colors.green, fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular, fontWeight: '500' }}>
                                                {this.dataResponse[APP_PARAMS.PRODUCTS][APP_PARAMS.DISCOUNT] + '% ' + translate('OFF')}</Text>

                                        }
                                        {
                                            this.dataResponse[APP_PARAMS.PRODUCTS] != undefined &&this.dataResponse[APP_PARAMS.PRODUCTS][APP_PARAMS.DISCOUNT] == undefined|| (this.dataResponse[APP_PARAMS.PRODUCTS][APP_PARAMS.DISCOUNT] != undefined && this.dataResponse[APP_PARAMS.PRODUCTS][APP_PARAMS.DISCOUNT] == 0) &&
                                             this.dataResponse[APP_PARAMS.PRODUCTS][APP_PARAMS.OFF_IN_PER] != undefined && 
                                            this.dataResponse[APP_PARAMS.PRODUCTS][APP_PARAMS.OFF_IN_PER] != null && this.dataResponse[APP_PARAMS.PRODUCTS][APP_PARAMS.OFF_IN_PER] != '' && this.dataResponse[APP_PARAMS.PRODUCTS][APP_PARAMS.OFF_IN_PER] != 0&&
                                            <Text style={{ marginLeft: DIMENS.px_5, color: colors.green, fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular, fontWeight: '500' }}>
                                                {this.dataResponse[APP_PARAMS.PRODUCTS][APP_PARAMS.OFF_IN_PER] + '% ' + translate('OFF')}</Text>
                                                
                                        }
                                    </View>
                                    {
                                        this.dataResponse[APP_PARAMS.PRODUCTS] != undefined && this.dataResponse[APP_PARAMS.PRODUCTS][APP_PARAMS.OFF_IN_PER] != undefined && 
                                        this.dataResponse[APP_PARAMS.PRODUCTS][APP_PARAMS.OFF_IN_PER] != null && this.dataResponse[APP_PARAMS.PRODUCTS][APP_PARAMS.OFF_IN_PER] != '' && 
                                        this.dataResponse[APP_PARAMS.PRODUCTS][APP_PARAMS.OFF_IN_PER] != 0 && this.dataResponse[APP_PARAMS.PRODUCTS][APP_PARAMS.DISCOUNT] != 0
                                             ?
                                            <Text style={{
                                                marginVertical: DIMENS.px_10, color: colors.black, fontSize: DIMENS.txt,
                                                fontFamily: FONT_FAMILIY.Roboto_Regular, padding: DIMENS.px_12, backgroundColor: colors.whiteBackground, alignSelf: 'flex-start'
                                            }}>
                                                {translate('UPTO') +  this.dataResponse[APP_PARAMS.PRODUCTS][APP_PARAMS.OFF_IN_PER] + '% ' + translate('OFF') }</Text> : null

                                    }
                                    {/* {
                                        this.dataResponse[APP_PARAMS.PRODUCTS] != undefined && this.dataResponse[APP_PARAMS.PRODUCTS][APP_PARAMS.OFF] != undefined && this.dataResponse[APP_PARAMS.PRODUCTS][APP_PARAMS.OFF] != null 
                                        && this.dataResponse[APP_PARAMS.PRODUCTS][APP_PARAMS.OFF] != '' && this.dataResponse[APP_PARAMS.PRODUCTS][APP_PARAMS.DISCOUNT] !=0 
                                             ?
                                            <Text style={{
                                                marginVertical: DIMENS.px_10, color: colors.black, fontSize: DIMENS.txt,
                                                fontFamily: FONT_FAMILIY.Roboto_Regular, padding: DIMENS.px_12, backgroundColor: colors.whiteBackground, alignSelf: 'flex-start'
                                            }}>
                                                {translate('UPTO') + CURRENCY.RUPEES + 60 + ' ' + translate('OFF_EXCHANGE_TXT')}</Text> : null

                                    } */}

                                </View>
                                {/*Seprator*/}
                                <View style={{ backgroundColor: colors.lightGraytransparent, height: DIMENS.px_05, width: '100%' }} />
                                {/* Offers*/}
                                {
                                    this.state.offerArr != undefined && this.state.offerArr.length > 0 &&
                                    <View style={{ padding: DIMENS.px_10 }}>
                                        <Text style={[styles.catTitle]}>{translate('AVAIL_OFF')}</Text>
                                        <FlatList
                                            style={{ marginVertical: DIMENS.px_10 }}
                                            data={this.state.offerArr}
                                            renderItem={({ item, index }) => this.renderOffer(item, index)}
                                            extraData={this.state}
                                            keyExtractor={(item, index) => index.toString()}
                                            ListFooterComponent={() => this.offerFotter()} />
                                    </View>
                                }
                                {/*Seprator*/}
                                <View style={{ backgroundColor: colors.lightGraytransparent, height: DIMENS.px_05, width: '100%', }} />
                                <Ripple style={{
                                    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                                    paddingVertical: 10, borderBottomColor: colors.lightGraytransparent, borderBottomWidth: DIMENS.px_5, width: '100%'
                                }} onPress={() => this.onShare()}>
                                    <Image source={SHARE} style={{ marginRight: DIMENS.px_5 }} />
                                    <Text style={{}}>{translate('SHARE')}</Text>
                                </Ripple>
                                {/** */}

                                {/* Color*/}
                                {
                                    this.state.varintOfProduct != undefined && this.state.varintOfProduct.length > 0 &&
                                    <FlatList style={{ borderBottomColor: colors.lightGraytransparent, borderBottomWidth: DIMENS.px_5, width: WIDTH }}
                                        numColumns={this.state.varintOfProduct.length}
                                        data={this.state.varintOfProduct}
                                        renderItem={({ item, index }) => this.renderShowDefultVarient(item, index)}
                                        extraData={this.state.varintOfProduct}
                                        keyExtractor={(item, index) => index.toString()}
                                    />
                                }

                                {/*Delivery*/}
                                <View >
                                    <View style={{ padding: DIMENS.px_10 }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <View style={{ flex: .7 }}>
                                                <Text style={{
                                                    fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular,
                                                    color: colors.grayClr
                                                }}>{this.state.pinCodeWithLoc == undefined ?
                                                    'Enter PinCode For delivery time' : 'Deliver to ' + this.state.pinCodeWithLoc}</Text>
                                                {this.dataResponse[APP_PARAMS.ADDRESS] && this.dataResponse[APP_PARAMS.ADDRESS] != null && this.state.isPinCode &&
                                                    <Text numberOfLines={1} style={{
                                                        fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular,
                                                        color: colors.black, marginTop: DIMENS.px_3,
                                                    }}>{this.dataResponse[APP_PARAMS.ADDRESS][APP_PARAMS.APARTMENT_SUIT]}</Text>
                                                }
                                            </View>
                                            <Ripple style={{
                                                flexDirection: 'row', alignItems: 'center', flex: .2,
                                                borderWidth: DIMENS.px_05, borderColor: colors.gray, padding: DIMENS.px_10,
                                                borderRadius: DIMENS.px_2
                                            }} onPress={() => this.showAddressModalView()}>
                                                <Text style={{
                                                    fontSize: DIMENS.txt_size_medium,
                                                    fontFamily: FONT_FAMILIY.Roboto_Medium, textAlign: 'center',
                                                    color: colors.primary, marginRight: DIMENS.px_5
                                                }}>{translate('CHANGE')}</Text>
                                                <Image source={NEXT} style={{ tintColor: colors.primary }} />
                                            </Ripple>


                                        </View>
                                    </View>
                                    {/*Seprator*/}

                                    <View style={{ backgroundColor: colors.lightGraytransparent, height: DIMENS.px_05, width: '100%', marginVertical: DIMENS.px_5 }} />
                                    {this.state.pinCodeWithLoc &&
                                        <View style={{ padding: DIMENS.px_10, borderBottomColor: colors.lightGraytransparent, borderBottomWidth: DIMENS.px_5, width: '100%' }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <View>
                                                    <Text style={{
                                                        fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular,
                                                        color: colors.grayClr
                                                    }}>{'Deliver By'}</Text>
                                                    <Text style={{
                                                        fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular,
                                                        color: colors.black
                                                    }}>{this.state.deliveryTime + ' | '}
                                                        {this.state.deliveryCharge &&
                                                            <Text style={{
                                                                fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular,
                                                                color: colors.lightGreen
                                                            }}>{`${this.state.deliveryCharge}`}</Text>
                                                        }
                                                    </Text>
                                                </View>
                                                <Ripple style={{
                                                    flexDirection: 'row', alignItems: 'center',
                                                    borderWidth: DIMENS.px_05, borderColor: colors.gray, padding: DIMENS.px_10, borderRadius: DIMENS.px_2
                                                }} onPress={() => this.props.navigation.navigate('DeliveryInstallationDetails',
                                                    {
                                                        [APP_PARAMS.SHIPPING_CAHNGES]: this.state.shippingChanges,
                                                        [APP_PARAMS.INSTALL_DETAIL]: this.state.installationDetail,
                                                        [APP_PARAMS.DELIVERY_TIME]: this.state.deliveryTime,
                                                        [APP_PARAMS.SHIPPING_CHARGE]: this.state.deliveryCharge
                                                    })}>
                                                    <Text style={{
                                                        fontSize: DIMENS.txt_size_medium,
                                                        fontFamily: FONT_FAMILIY.Roboto_Medium, textAlign: 'center',
                                                        color: colors.primary, marginRight: DIMENS.px_5
                                                    }}>{translate('VIEW_DETAIL')}</Text>
                                                    <Image source={NEXT} style={{ tintColor: colors.primary }} />
                                                </Ripple>
                                            </View>
                                        </View>
                                    }
                                </View>
                                {/*Easy Payment Option */}
                                {
                                    this.dataResponse[APP_PARAMS.PAYMENT_OPTION] != undefined && this.dataResponse[APP_PARAMS.PAYMENT_OPTION].length > 0 &&
                                    <View style={{ borderBottomColor: colors.lightGraytransparent, borderBottomWidth: DIMENS.px_5, width: '100%' }}>
                                        <View style={{ padding: DIMENS.px_10 }}>
                                            <Text style={[styles.catTitle]}>{translate('EASY_PAY_OPTION')}</Text>
                                            <FlatList
                                                style={{ marginVertical: DIMENS.px_10 }}
                                                data={this.dataResponse[APP_PARAMS.PAYMENT_OPTION]}//{this.state.paymentOption}
                                                renderItem={({ item, index }) => this.renderPayment(item, index)}
                                                extraData={this.state}
                                                keyExtractor={(item, index) => index.toString()}
                                                //ListFooterComponent={() => this.paymentFotter(true)} 
                                            />
                                        </View>
                                    </View>
                                }
                                {/* Sold by */}
                                {
                                    <View style={{
                                        borderBottomColor: colors.lightGraytransparent,
                                        borderBottomWidth: DIMENS.px_5, width: '100%', padding: DIMENS.px_10
                                    }}>
                                        <Text>Sold by</Text>
                                        <TouchableOpacity style={{
                                            flexDirection: 'row'
                                        }}
                                            onPress={() => this.setState({ showSellerDetail: true })}>
                                            <Text>Brandonn</Text>
                                            <RatingView rating={4.4} />
                                        </TouchableOpacity>
                                    </View>
                                }
                                {/*Highlights*/}
                                {
                                    // this.state.highlightArr != undefined && this.state.paymentOption.length > 0 &&
                                    this.dataResponse[APP_PARAMS.PROD_HIGHLIGHT] != undefined && this.dataResponse[APP_PARAMS.PROD_HIGHLIGHT] != null &&
                                    this.hilightArrCount > 0 &&
                                    <View style={{ borderBottomColor: colors.lightGraytransparent, borderBottomWidth: DIMENS.px_5, width: '100%' }}>
                                        <View style={{ padding: DIMENS.px_10 }}>
                                            <Text style={[styles.catTitle]}>{translate('HIGLIGHT')}</Text>
                                            {/* { this.renderHighlight(this.dataResponse[APP_PARAMS.PROD_HIGHLIGHT]) } */}
                                            {/* <FlatList
                                                style={{ marginVertical: DIMENS.px_10 }}
                                                data={this.state.highlightArr}
                                                renderItem={({ item, index }) => this.renderPayment(item, index)}
                                                extraData={this.state}
                                                keyExtractor={(item, index) => index.toString()}
                                                ListFooterComponent={() => this.paymentFotter(false)} 
                                                /> */}
                                            <SectionList
                                                style={{ marginVertical: DIMENS.px_10 }}
                                                showsVerticalScrollIndicator={false}
                                                stickySectionHeadersEnabled={false}
                                                sections={this.dataResponse[APP_PARAMS.PROD_HIGHLIGHT]}
                                                stickySectionHeadersEnabled={false}
                                                keyExtractor={(item, index) => item + index}
                                                renderItem={({ item, index }) => this.renderHighlight(item, index)}
                                                renderSectionHeader={({ section }) => this.renderHeader(section)}
                                                ListFooterComponent={() => this.paymentFotter(undefined)}
                                            />
                                        </View>
                                    </View>
                                }

                                {
                                    this.dataResponse && this.dataResponse[APP_PARAMS.PRODUCTS] != undefined &&
                                    this.dataResponse[APP_PARAMS.PRODUCTS][APP_PARAMS.FULL_DESC] != undefined &&
                                    this.dataResponse[APP_PARAMS.PRODUCTS][APP_PARAMS.FULL_DESC] != "" &&
                                    <View style={{ borderBottomColor: colors.lightGraytransparent, borderBottomWidth: DIMENS.px_5, width: '100%' }}>
                                        <View style={{ padding: DIMENS.px_10 }}>
                                            <Text style={[styles.catTitle, { marginTop: DIMENS.px_5 }]}>{translate('Description')}</Text>
                                            <Text style={{
                                                color: colors.grayClr,
                                                fontFamily: FONT_FAMILIY.Roboto_Regular,
                                                fontSize: DIMENS.txt_size_small_12,
                                                //marginTop:DIMENS.px_2,
                                                textAlign: 'left',
                                                // lineHeight:20
                                            }}>
                                                {Utils.convertHtmlToText(this.dataResponse[APP_PARAMS.PRODUCTS][APP_PARAMS.FULL_DESC])}
                                            </Text>

                                        </View>
                                    </View>

                                }

                                {/*Rating Review */}

                                {
                                    this.state.ratingRevwSlices != undefined && this.state.ratingRevwSlices.length > 0 &&
                                    <View style={{}}>
                                        <View style={{ padding: DIMENS.px_10, }}>
                                            <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>

                                                <Text style={[styles.catTitle]}>
                                                    {
                                                        this.dataResponse != undefined && this.dataResponse[APP_PARAMS.COMNT_REVIEW_LIST] != undefined ? translate('RATING_REVIW') :
                                                            translate('NO_RVW_ITEM')}
                                                </Text>
                                                <Ripple style={[{
                                                    flexDirection: 'row', alignItems: 'center', marginTop: DIMENS.px_10, alignSelf: 'flex-start',
                                                    borderWidth: DIMENS.px_05, borderColor: colors.gray, padding: DIMENS.px_10, borderRadius: DIMENS.px_2,
                                                }, styles.elevationView]}
                                                    onPress={() => this.props.navigation.navigate(SCREENS.REVIEW_RATING,
                                                        {
                                                            [APP_PARAMS.BUYED_BY_ME]: global[KEY.USER_DATA] != undefined && this.dataResponse != undefined &&
                                                                this.dataResponse[APP_PARAMS.PRODUCTS] && this.dataResponse[APP_PARAMS.PRODUCTS][APP_PARAMS.BUYED_BY_ME] &&
                                                                this.dataResponse[APP_PARAMS.PRODUCTS][APP_PARAMS.BUYED_BY_ME],
                                                            product: this.dataResponse != undefined && this.dataResponse[APP_PARAMS.PRODUCTS],
                                                            [APP_PARAMS.USER_REIEW]: this.dataResponse && this.dataResponse[APP_PARAMS.USER_REIEW] && this.dataResponse[APP_PARAMS.USER_REIEW],
                                                            goBackFromReviewRattting: (item) => this.goBackFromReviewRattting(item)
                                                        })}>
                                                    <Text style={{
                                                        fontSize: DIMENS.txt_size_medium, alignSelf: 'flex-start',
                                                        fontFamily: FONT_FAMILIY.Roboto_Medium, textAlign: 'center',
                                                        color: colors.primary, marginRight: DIMENS.px_5
                                                    }}>{translate('RATE_PRODUCT')}</Text>
                                                    <Image source={NEXT} style={{ tintColor: colors.primary }} />
                                                </Ripple>
                                            </View>
                                        </View>
                                        {
                                            this.dataResponse[APP_PARAMS.COMNT_REVIEW_LIST] != undefined ?
                                                <View>
                                                    <View style={{ marginVertical: DIMENS.px_10 }}>
                                                        {this.headerRatngReview()}
                                                    </View>
                                                    {/* <FlatList
                                                        showsHorizontalScrollIndicator={false}
                                                        horizontal={true}
                                                        style={{ marginVertical: DIMENS.px_10 }}
                                                        data={this.state.ratingRevwSlices}
                                                        renderItem={({ item, index }) => this.renderRatingReviewSlicing(item, index)}
                                                        extraData={this.state}
                                                        keyExtractor={(item, index) => index.toString()}
                                                    /> */}
                                                    { /*Seprator*/}
                                                    <View style={{ backgroundColor: colors.lightGraytransparent, height: DIMENS.px_05, width: '100%', marginTop: DIMENS.px_10 }} />

                                                    {/*View Review*/}

                                                    {
                                                        this.dataResponse[APP_PARAMS.COMNT_REVIEW_LIST] != undefined &&
                                                        this.dataResponse[APP_PARAMS.COMNT_REVIEW_LIST].length > 0 &&
                                                        <FlatList
                                                            showsVerticalScrollIndicator={false}
                                                            style={{ marginVertical: DIMENS.px_10 }}
                                                            data={this.dataResponse[APP_PARAMS.COMNT_REVIEW_LIST]}
                                                            // data={this.state.reviewArr}
                                                            renderItem={({ item, index }) => this.renderReviewItem(item, index)}
                                                            extraData={this.state}
                                                            keyExtractor={(item, index) => index.toString()}
                                                        />
                                                    }
                                                </View> :
                                                // <View style={{ padding: 10 }}>
                                                <View style={{ backgroundColor: colors.lightGraytransparent, height: DIMENS.px_5, width: '100%', marginTop: DIMENS.px_10 }} />

                                            //      <Text style={{
                                            //         fontSize: DIMENS.txt_size_medium_14,
                                            //         fontFamily: FONT_FAMILIY.Roboto_Regular, textAlign: 'left',
                                            //         color: colors.lightGrayClr,
                                            //     }}>{'There are not available any review, you are the first one whose give rating this product'}</Text> */}
                                            //  </View>
                                        }
                                    </View>

                                }

                                {/*Simmilar Product*/}

                                {
                                    this.dataResponse[APP_PARAMS.RELATED_PRODUCT_LIST] != undefined && this.dataResponse[APP_PARAMS.RELATED_PRODUCT_LIST] != null &&
                                    this.dataResponse[APP_PARAMS.RELATED_PRODUCT_LIST].length > 0 &&
                                    <View style={{ width: '100%' }}>
                                        <View style={{ padding: DIMENS.px_10 }}>
                                            <Text style={[styles.catTitle]}>{translate('SIMILAR_PRODUCT')}</Text>
                                            <FlatList
                                                numColumns={2}
                                                style={{ marginVertical: DIMENS.px_10 }}
                                                data={this.dataResponse[APP_PARAMS.RELATED_PRODUCT_LIST]}//{this.state.similarDataArr}
                                                renderItem={({ item, index }) => this.renderSimmilarProduct(item, index)}
                                                extraData={this.state}
                                                keyExtractor={(item, index) => index.toString()}
                                                ListFooterComponent={() => this.paymentFotter(false)} />
                                        </View>
                                    </View>
                                }

                                {/* Address View */}
                                {
                                    this.state.modalAddressVisible != undefined && this.state.modalAddressVisible &&
                                    this.renderModalAddressView()
                                }

                            </ScrollView>
                            {/* Cart Button View */}


                        </View>


                        <View style={{ bottom: 0, }}>
                            {
                                this.dataResponse[APP_PARAMS.PRODUCTS][APP_PARAMS.IN_STOCK] != undefined &&
                                    (this.dataResponse[APP_PARAMS.PRODUCTS][APP_PARAMS.IN_STOCK] == 0 ||
                                        this.dataResponse[APP_PARAMS.PRODUCTS][APP_PARAMS.IN_STOCK] == '0') ?
                                    <View style={{ backgroundColor: colors.whiteBackground, borderTopWidth: 0.3, borderTopColor: colors.lightGraytransparent }}>
                                        <Text style={{ padding: 15, textAlign: 'center', fontSize: DIMENS.txt_size_medium_1, fontFamily: FONT_FAMILIY.Roboto_Medium, color: colors.redColor }}>
                                            {translate('OUT_OF_STOCK')}</Text>
                                    </View> :
                                    <View style={{ bottom: 0, flexDirection: 'row', backgroundColor: colors.primary }}>
                                        <Ripple style={{ flex: 0.5 }} onPress={() => this.addCart()}>
                                            <View style={{ backgroundColor: colors.whiteBackground, borderTopWidth: 0.3, borderTopColor: colors.lightGraytransparent }}>
                                                <Text style={{ padding: 15, textAlign: 'center', fontSize: DIMENS.txt_size_medium_1, fontFamily: FONT_FAMILIY.Roboto_Medium, color: colors.black }}>
                                                    {this.state.isAddedCart ? translate('GO_TO_BAG') : translate('ADD_CART')}</Text>
                                            </View>
                                        </Ripple>
                                        <Ripple style={{ flex: 0.5 }} onPress={() => this.buyNowClk()}>
                                            <View style={{ backgroundColor: colors.primary }}>
                                                <Text style={{ padding: 15, textAlign: 'center', fontSize: DIMENS.txt_size_medium_1, fontFamily: FONT_FAMILIY.Roboto_Medium, color: colors.white }}>
                                                    {translate('BUY_NOW')}</Text>
                                            </View>
                                        </Ripple>
                                    </View>
                            }
                        </View>
                        {
                            this.state.modalOfImg == true &&
                            this.showModalOfImg()

                        }
                    </View>
                }
                {
                    loading &&
                    <Loader loader={loading} />
                }
                <CommonSellerDetail
                    sellerDetailShow={this.state.showSellerDetail}
                    onPressCross={() => this.setState({ showSellerDetail: false })}
                />
            </View>
        )
    }
}





