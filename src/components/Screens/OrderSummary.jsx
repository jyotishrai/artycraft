import React from 'react'
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text, Image,
    TouchableOpacity, FlatList,
    View, Dimensions, TextInput, DeviceEventEmitter
} from 'react-native'
import Ripple from 'react-native-material-ripple';
import styles from '../Auth/styles'
import { colors } from '../../theme';
import { NOTIFICATION, HEART, SEARCH, ORDER, NEXT, PLACEHOLDER_PRODUCT } from '../../images'
import HeaderButton from '../HeaderButton'
import translate from '../../i18n/i18n';
import { DIMENS, FONT_FAMILIY, WIDTH, HEIGHT, CURRENCY, APP_PARAMS, KEY, CONST, SCREENS, SCREEN } from '../../constants';
import Basecomponents from '../../common/BaseComponent';
import CommonNavHeader from '../../common/CommonNavHeader';
import { CommonBillingView } from '../../common/CommonProductRow';
import CommonOrderSummaryProduct from '../../common/CommonOrderSummaryProduct'
import CommonDropDown from '../../common/CommonDropDown';
import * as Utils from '../../utility/Utils'
import * as Toast from '../../utility/Toast'
import Loader from '../../common/Loader';
import { CommonEmptyView } from '../../common/CommonEmptyView';
import NavigationService from '../../NavigationService';

export default class OrderSummary extends Basecomponents {
    constructor(props) {
        super(props)
        this.comeFromLoginLtsner = DeviceEventEmitter.addListener(KEY.COME_BACK_FROM_LOGIN, this.comeFromLogin)

        this.isFrom = this.props.navigation.state != undefined &&
            this.props.navigation.state.params != undefined &&
            this.props.navigation.state.params.isFrom != undefined &&
            this.props.navigation.state.params.isFrom == 'Cart' && true;
        this.orderIsFrom = undefined;
        this.state = {
            orderDetailArr: undefined,
            //  [{
            //     uri: require('../../assets/images/phone.png'), [APP_PARAMS.STORE_NAME]: 'faygy', discountPrice: '799', price: '1500',
            //     name: 'Realme 3i(Diamond Blue, 32GB)', rating: '3.3', ratingCount: '2,333', offer: '4 offers available', qty: '2',
            //     deliveryTime: '12 Dec,Saturday', deliveryType: 'Free'
            // }],
            postCodeWithAdres: undefined,
            deliveryCharge: undefined,
            data: [{ value: '1' }, { value: '2' }, { value: '3' }, { value: 'more' }],
            billingData: {
                price: '99999', deliveryCharge: '0.0',
                amountPayablePrice: '99999'
            },
            addMoreQtyPopover: false,
            qtyLoaderIndex: -1,
            address: undefined
        }
    }
    componentDidMount() {
        this.cartListApi()
    }
    //Lisnter
    comeFromLogin = () => {
        this.cartListApi()
    }
    cartListApi = () => {
        let data = {
            [APP_PARAMS.REQ_ID]: Utils.getRequestId(),
            [APP_PARAMS.CUSTOMER_ID]: global[KEY.USER_DATA] != undefined &&
                global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID] != undefined ? global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID] : '',
            [APP_PARAMS.PRODUCT_ID]: this.orderIsFrom ? this.orderIsFrom[APP_PARAMS.PRODUCT_ID] : '',
            [APP_PARAMS.PRODUCT_VARIENT_ID_LIST]: this.orderIsFrom ? this.orderIsFrom[APP_PARAMS.PRODUCT_VARIENT_ID_LIST] : undefined,
            [APP_PARAMS.PRODUCT_VARIANTS]: this.orderIsFrom ? this.orderIsFrom[APP_PARAMS.PRODUCT_VARIANTS] : undefined
        }

        this.props.cartListDataAPi(data).then(result => {
            let data = this.responseAPI(result)
            if (data) {

                this.setState({
                    orderDetailArr: data[APP_PARAMS.PRODUCTS] != undefined && data[APP_PARAMS.PRODUCTS],
                    postCodeWithAdres: data[APP_PARAMS.DESTINATION],
                    address: data[APP_PARAMS.ADDRESS] != undefined && data[APP_PARAMS.ADDRESS] != 'null' && data[APP_PARAMS.ADDRESS]
                }, () => {
                    if (data[APP_PARAMS.PRODUCTS] && data[APP_PARAMS.PRODUCTS].length > 0)
                        this.billingCalculation(data[APP_PARAMS.PRODUCTS])
                })
            }
        })
    }
    //API WORK
    addCartQty = (qty, item, index) => {
        let data = {
            [APP_PARAMS.REQ_ID]: Utils.getRequestId(),
            [APP_PARAMS.CUSTOMER_ID]: global[KEY.USER_DATA] != undefined &&
                global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID] != undefined ? global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID] : '',
            [APP_PARAMS.PRODUCT_ID]: item[APP_PARAMS.U_UID],
            [APP_PARAMS.ORDER_QTY]: qty
        }
        let detailArr = this.state.orderDetailArr
        item['isSelect'] = true
        detailArr[index] = item

        this.setState({ orderDetailArr: [...detailArr] })
        this.props.addUpdateCartQtyDataAPi(data).then(result => {
            if (result && result[APP_PARAMS.MESSAGE]) {
                if (result[APP_PARAMS.SUCCESS]) {
                    item[APP_PARAMS.ORDER_QTY] = qty
                }
                item['isSelect'] = false
                detailArr[index] = item
                this.setState({ orderDetailArr: [...detailArr] })
                this.billingCalculation(detailArr)
                let qtyOfItem = 0
                detailArr.forEach(element => {
                    qtyOfItem = element[APP_PARAMS.ORDER_QTY] && element[APP_PARAMS.ORDER_QTY] > 0 && qtyOfItem ? qtyOfItem + 1 : 1
                });
                // global[KEY.CART_COUNT] = global[KEY.CART_COUNT] ? global[KEY.CART_COUNT] + qtyOfItem : qtyOfItem
                global[KEY.CART_COUNT] = qtyOfItem

                Toast.showErrorToast(result[APP_PARAMS.MESSAGE])
            } else {
                Toast.showErrorToast(translate('MESSAGE_SERVER_ERROR'))
            }


        })
    }
    //Calculate:-0
    billingCalculation = (data) => {
        let discountPrice = 0.0
        let realPrice = 0.0
        let deliveryCharge = 0.0
        let qtyOfItem = 0

        data.forEach(element => {
            // if(element[APP_PARAMS.IN_STOCK]!=0){
            let qty = element[APP_PARAMS.ORDER_QTY] ? element[APP_PARAMS.ORDER_QTY] : 1;
            qtyOfItem = qtyOfItem + 1//element[APP_PARAMS.ORDER_QTY] ? qtyOfItem + 1 : qtyOfItem//: 1
            realPrice = element[APP_PARAMS.PRICE] * qty + realPrice
            discountPrice = element[APP_PARAMS.DISCOUNT_PRICE] * qty + discountPrice
            deliveryCharge = element[APP_PARAMS.SHIPPING_CHARGE] != undefined ? element[APP_PARAMS.SHIPPING_CHARGE] + deliveryCharge : deliveryCharge
            // }
        });

        let netAmountPayable = discountPrice + deliveryCharge
        let totalDiscount = realPrice - discountPrice

        let tempBillingData = {
            price: discountPrice.toFixed(2) + '', deliveryCharge: deliveryCharge.toFixed(2) + '',
            amountPayablePrice: netAmountPayable.toFixed(2) + '', savePrice: totalDiscount != 0.0 && totalDiscount.toFixed(2) + '',
            qty: qtyOfItem
        }
        // global[KEY.CART_COUNT] = global[KEY.CART_COUNT] ? global[KEY.CART_COUNT] + qtyOfItem :qtyOfItem

        this.setState({ billingData: tempBillingData })

        this.props.addBillingData(tempBillingData)
    }
   
    paymentContinue = () => {

        if (this.state.address) {
            for (let index = 0; index < this.state.orderDetailArr.length; index++) {
                const item = this.state.orderDetailArr[index];
                if (item[APP_PARAMS.IN_STOCK] == undefined || item[APP_PARAMS.IN_STOCK] != undefined && (item[APP_PARAMS.IN_STOCK] == 0 || item[APP_PARAMS.IN_STOCK] < item[APP_PARAMS.ORDER_QTY])) {
                    Toast.showErrorToast('Stock not available of ' + item.name)//translate('OUT_OF_STOCK_ERR_MESSAGE')
                    return;
                }
            }
            this.props.navigation.navigate('Payment')
        } else {
            if (global[KEY.USER_DATA] == undefined) {
                this.goToLogin()
            } else {
                this.props.navigation.navigate(SCREENS.ADD_ADDRESS,
                    { goBackAdress: (item) => this.goBackSetAddress(item) })
            }

        }
    }

    goToLogin = () => {
        this.props.changeIsFromCall({ [APP_PARAMS.PAGE_TYPE]: SCREENS.ORDER_SUMMARY })
        this.props.navigation.navigate('Login_As_GUEST', { goBackLogin: () => this.comeFromLogin() })
    }

    changeADdress = () => {
        this.props.addressIsFromCall({
            [CONST.IS_FROM]: SCREENS.ORDER_SUMMARY,
            [CONST.TO]: SCREENS.ADD_ADDRESS
        })
        this.props.navigation.navigate(SCREENS.MY_ADDRESS,
            { [CONST.IS_FROM]: SCREENS.ORDER_SUMMARY, goBackAdress: (item) => this.goBackSetAddress(item) })
    }
    goBackSetAddress = (item) => {
        if (item != undefined && item != '') {
            this.setState({ address: item })
        }
    }
    removeItemFromCart = (item, index) => {
        let data = {
            [APP_PARAMS.PRODUCT_ID]: item[APP_PARAMS.U_UID],
            [APP_PARAMS.REQ_ID]: Utils.getRequestId(),
            [APP_PARAMS.CUSTOMER_ID]: global[KEY.USER_DATA] != undefined && global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID] != undefined ? global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID] : '',
            [APP_PARAMS.PRODUCT_VARIANTS]: item[APP_PARAMS.PRODUCT_VARIANT_ID] != undefined ? { [APP_PARAMS.PRODUCT_VARIANT_ID]: item[APP_PARAMS.PRODUCT_VARIANT_ID] } : undefined
        }

        this.props.addCartRemoveCartAPI(data).then(result => {
            if (this.responseAPI(result)) {
                let listOfItem = this.state.orderDetailArr
                listOfItem.splice(index, 1)
                this.setState({ orderDetailArr: [...listOfItem] })
                if (global[KEY.CART_COUNT]) {
                    global[KEY.CART_COUNT] = global[KEY.CART_COUNT] - 1
                }
                this.billingCalculation(listOfItem)
                if (this.orderIsFrom != undefined && this.orderIsFrom[CONST.DATA] && this.orderIsFrom[CONST.DATA][APP_PARAMS.U_UID] === item[APP_PARAMS.U_UID]) {

                    if (this.orderIsFrom[CONST.DATA][APP_PARAMS.PRODUCT_VARIENT_ID_LIST] && this.orderIsFrom[CONST.DATA][APP_PARAMS.PRODUCT_VARIENT_ID_LIST].some(obj => obj === item[APP_PARAMS.PRODUCT_VARIANT_ID])) {
                        this.props.dataUpdateInProductDetail({ data: { [APP_PARAMS.PRODUCT_VARIENT_ID_LIST]: item[APP_PARAMS.PRODUCT_VARIENT_ID_LIST], [APP_PARAMS.CART]: false } })
                    } else if (item[APP_PARAMS.PRODUCT_VARIANT_ID]) {
                        this.props.dataUpdateInProductDetail({
                            data: {
                                [APP_PARAMS.PRODUCT_VARIENT_ID_LIST]: item[APP_PARAMS.PRODUCT_VARIENT_ID_LIST],
                                [APP_PARAMS.PRODUCT_VARIENT_CART]: false
                            }
                        })
                    } else {
                        this.props.dataUpdateInProductDetail({ data: { [APP_PARAMS.CART]: false } })
                    }
                }
            }
        })
    }
    // RESPONSE API
    responseAPI = (result) => {
        let data = {};
        if (result) {
            if (result.hasOwnProperty(APP_PARAMS.SUCCESS) && result[APP_PARAMS.SUCCESS]) {
                if (result.hasOwnProperty(APP_PARAMS.RES_PKT) && result[APP_PARAMS.RES_PKT] != null) {
                    if (result[APP_PARAMS.RES_PKT][APP_PARAMS.PRODUCTS] &&
                        result[APP_PARAMS.RES_PKT][APP_PARAMS.PRODUCTS].length > 0) {
                        data[APP_PARAMS.PRODUCTS] = result[APP_PARAMS.RES_PKT][APP_PARAMS.PRODUCTS]
                    }
                    if (result[APP_PARAMS.RES_PKT][APP_PARAMS.DESTINATION] != undefined) {
                        data[APP_PARAMS.DESTINATION] = result[APP_PARAMS.RES_PKT][APP_PARAMS.DESTINATION]
                    }
                    if (result[APP_PARAMS.RES_PKT][APP_PARAMS.POSTAL_CODE] != undefined) {
                        data[APP_PARAMS.POSTAL_CODE] = result[APP_PARAMS.RES_PKT][APP_PARAMS.POSTAL_CODE]
                    }
                    if (result[APP_PARAMS.RES_PKT][APP_PARAMS.ADDRESS] != undefined) {
                        data[APP_PARAMS.ADDRESS] = result[APP_PARAMS.RES_PKT][APP_PARAMS.ADDRESS]
                    }

                    return data
                } else if (result.hasOwnProperty(APP_PARAMS.DATA) && result[APP_PARAMS.DATA] != null) {
                    if (result[APP_PARAMS.DATA][APP_PARAMS.CART] != undefined && !result[APP_PARAMS.DATA][APP_PARAMS.CART]) {
                        return true
                    }
                } else if (result[APP_PARAMS.MESSAGE]) {
                    Toast.showErrorToast(result[APP_PARAMS.MESSAGE])
                }
            } else {
                Toast.showErrorToast(translate('MESSAGE_SERVER_ERROR'))
            }
        }
    }

    renderItem = (item, index) => {
        let isFrom = this.orderIsFrom ? this.orderIsFrom[CONST.IS_FROM] == SCREENS.CART ? true : false : false
        let dataTemp = []
        if (item[APP_PARAMS.IN_STOCK] != undefined) {
            let arrData = [];
            for (let index = item[APP_PARAMS.MIN_ORDR_QTY]; index <= item[APP_PARAMS.MAX_ORDR_QTY]; index++) {
                if (arrData.length != 3) {
                    arrData.push({ value: index + '' });
                } else if (index > 3) {
                    arrData.push({ value: 'more' });
                    break;
                }
            }
            dataTemp = arrData
        }

        return (
            <CommonOrderSummaryProduct
                moreQtyPopoverClose={this.state.addMoreQtyPopover}
                item={item}
                qty={item[APP_PARAMS.ORDER_QTY] ? item[APP_PARAMS.ORDER_QTY] : 1}
                data={dataTemp}
                isRemove={isFrom}
                // loader={this.state.qtyLoader}
                // loderIndex={this.state.qtyLoaderIndex}
                onPressRemove={() => this.removeItemFromCart(item, index)}
                selectQty={(qty) => this.addCartQty(qty, item, index)}
                onPress={() => {
                    return (
                        <CommonDropDown data={this.state.data} />
                    )
                }}
            />
        )
    }

    render() {
        const { loading, data, orderIsFrom, cart } = this.props
        this.orderIsFrom = orderIsFrom
        let destinationAddress = data && data[APP_PARAMS.RES_PKT] && data[APP_PARAMS.RES_PKT][APP_PARAMS.DESTINATION]
        let postalCode = data && data[APP_PARAMS.RES_PKT] && data[APP_PARAMS.RES_PKT][APP_PARAMS.POSTAL_CODE]

        return (
            <View style={{ flex: 1 }}>
                <CommonNavHeader
                    title={this.orderIsFrom && this.orderIsFrom[CONST.IS_FROM] == SCREENS.CART ?
                        translate('SCREEN_CART') : this.orderIsFrom[CONST.IS_FROM] == SCREENS.COMPARE ? translate('SCREEN_CART') : translate('SCREEN_ORDER_SUMMARY')}
                    backPress={() => this.props.navigation.goBack()} />
                {
                    !loading ?
                        <View style={{ flex: 1 }}>
                            {
                                this.state.orderDetailArr != undefined && this.state.orderDetailArr != 'null' && this.state.orderDetailArr.length > 0 ?

                                    <View style={{ flex: 1 }}>
                                        <ScrollView bounces={false} showsVerticalScrollIndicator={false}  >
                                            <View style={{ marginBottom: 50 }}>
                                                {
                                                    this.state.address != undefined && this.state.address != 'null' &&

                                                    <View style={{ padding: 10, borderBottomColor: colors.lightGraytransparent, borderBottomWidth: DIMENS.px_5, }}>
                                                        {
                                                            this.state.address[APP_PARAMS.FIRST_NAME] != undefined || destinationAddress != undefined &&

                                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                {
                                                                    this.state.address[APP_PARAMS.FIRST_NAME] != undefined || destinationAddress != undefined &&
                                                                    <Text
                                                                        style={{
                                                                            fontFamily: FONT_FAMILIY.Roboto_Regular,
                                                                            fontSize: DIMENS.txt_size_medium_1, color: colors.black
                                                                        }}>
                                                                        {this.state.address[APP_PARAMS.FIRST_NAME] ? this.state.address[APP_PARAMS.FIRST_NAME] : (destinationAddress && postalCode && destinationAddress)}
                                                                    </Text>
                                                                }

                                                                {
                                                                    this.state.address[APP_PARAMS.ADDRESS_TYPE] &&
                                                                    <Text style={{
                                                                        textAlign: 'center',
                                                                        fontFamily: FONT_FAMILIY.Roboto_Regular,
                                                                        fontSize: DIMENS.txt_size_medium,
                                                                        color: colors.black,
                                                                        backgroundColor: colors.bgOfTxt,
                                                                        paddingHorizontal: DIMENS.px_10,
                                                                        paddingVertical: DIMENS.px_5,
                                                                        marginHorizontal: DIMENS.px_10
                                                                    }}>
                                                                        {this.state.address[APP_PARAMS.ADDRESS_TYPE]}</Text>}
                                                            </View>
                                                        }
                                                        {this.state.address[APP_PARAMS.APARTMENT_SUIT] != undefined &&
                                                            <Text style={{ fontFamily: FONT_FAMILIY.Roboto_Regular, fontSize: DIMENS.txt_size_medium, color: colors.black, marginVertical: DIMENS.px_5 }}>
                                                                {`${this.state.address[APP_PARAMS.STREET_ADDRESS]}, ${this.state.address[APP_PARAMS.APARTMENT_SUIT]}`}</Text>}
                                                        {this.state.address[APP_PARAMS.PHONE] &&
                                                            <Text style={{ fontFamily: FONT_FAMILIY.Roboto_Regular, fontSize: DIMENS.txt_size_medium, color: colors.black }}>
                                                                {this.state.address[APP_PARAMS.PHONE] && this.state.address[APP_PARAMS.PHONE]}</Text>
                                                        }
                                                        <Ripple style={[styles.submitBtn, { marginHorizontal: 0, marginTop: this.state.address ? DIMENS.px_10 : DIMENS.px_0 }]} onPress={() =>
                                                            this.changeADdress()}>
                                                            <Text style={[styles.submitBtnText, { fontWeight: 'normal' }]}>
                                                                {this.state.address ? translate('CHANGE_ADD_ADDRESS') : translate('ADD_ADDRESS').toUpperCase()}</Text>
                                                        </Ripple>
                                                    </View>
                                                }
                                                <View>
                                                    {
                                                        this.state.orderDetailArr != undefined && this.state.orderDetailArr.length > 0 &&
                                                        <FlatList
                                                            showsVerticalScrollIndicator={false}
                                                            data={this.state.orderDetailArr}
                                                            renderItem={({ item, index }) => this.renderItem(item, index)}
                                                            extraData={this.state}
                                                            keyExtractor={(item, index) => index.toString()}
                                                            ListFooterComponent={() => {
                                                                return (
                                                                    <CommonBillingView
                                                                        data={this.state.billingData}
                                                                    // price={9999}
                                                                    // deliveryType={translate('FREE')}
                                                                    // amountPrice={9999} 
                                                                    />
                                                                )
                                                            }} />
                                                    }

                                                </View>
                                            </View>
                                        </ScrollView>
                                        {
                                            <View style={{ bottom: 0, flexDirection: 'row', position: 'absolute', backgroundColor: colors.whiteBackground, alignItems: 'center' }}>
                                                <Ripple style={{ flex: 0.5 }}>
                                                    <View style={{ backgroundColor: colors.whiteBackground, justifyContent: 'center', marginHorizontal: DIMENS.px_5 }}>
                                                        <Text style={{ fontSize: DIMENS.txt_size_medium_1, fontFamily: FONT_FAMILIY.Roboto_Medium, color: colors.black }}>
                                                            {this.state.billingData != undefined && CURRENCY.RUPEES + this.state.billingData.amountPayablePrice}</Text>
                                                        <Text style={{ fontSize: DIMENS.txt_size_medium_1, fontFamily: FONT_FAMILIY.Roboto_Medium, color: colors.primary }}>
                                                            {translate('VIEW_PRICE_DETAILS')}</Text>
                                                    </View>
                                                </Ripple>
                                                <Ripple style={{ flex: 0.5 }} onPress={() => this.paymentContinue()}>
                                                    <View style={{ backgroundColor: colors.primary }}>
                                                        <Text style={{ padding: 15, textAlign: 'center', fontSize: DIMENS.txt_size_medium_1, fontFamily: FONT_FAMILIY.Roboto_Medium, color: colors.white }}>
                                                            {translate('CONTINUE').toUpperCase()}</Text>
                                                    </View>
                                                </Ripple>
                                            </View>
                                        }
                                    </View>
                                    :
                                    <View style={{ flex: 1 }}>
                                        <CommonEmptyView
                                            image={PLACEHOLDER_PRODUCT}
                                            title={global[KEY.USER_DATA] != undefined && global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID] != undefined ?
                                                translate('CART_EMPTY') : translate('TITLE_MISSING_CART_ITEMS')}
                                            subtitle={global[KEY.USER_DATA] != undefined && global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID] != undefined ?
                                                translate('SUB_TITLE_CART_EMPTY') : translate('SUB_TITLE_MISSING_CART_ITEMS')}
                                            btntext1={global[KEY.USER_DATA] != undefined && global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID] != undefined ? undefined : translate('LOGIN')}
                                            onPress1={() => this.goToLogin()}
                                            btntext2={translate('CONTINUE_SHOPING')}
                                            onPress2={() => NavigationService.clearStack('Drawer')}
                                            btntextImg2={NEXT}
                                        />


                                    </View>
                            }
                        </View> :

                        <Loader loader={loading} />
                }

            </View>
        )
    }
}