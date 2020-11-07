import React from 'react'
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text, Image,
    TouchableOpacity, FlatList,
    View, Dimensions, TextInput
} from 'react-native'
import Ripple from 'react-native-material-ripple';
import styles from '../Auth/styles'
import { colors } from '../../theme';
import { CIRCLE, RADIO_POINT, QUSTN, ORDER_SUCESS_GIF, LOGO } from '../../images'
import translate from '../../i18n/i18n';
import { DIMENS, FONT_FAMILIY, WIDTH, HEIGHT, CURRENCY, APP_PARAMS, KEY, SCREENS, RAZOR_PAY_KEY, BASE_URL_LOGO, APP_NAME } from '../../constants';
import Basecomponents from '../../common/BaseComponent';
import CommonNavHeader from '../../common/CommonNavHeader';
import { CommonBillingView } from '../../common/CommonProductRow';
import RazorpayCheckout from 'react-native-razorpay';
import Loader from '../../common/Loader';
import * as Toast from '../../utility/Toast'
import * as Utils from '../../utility/Utils'
import NavigationService from '../../NavigationService';
import ImageViewer from '../../common/CommonImage';
import FastImage from 'react-native-fast-image'
import * as AsyncStorage from '../../common/AsyncStorage'

export default class Payment extends Basecomponents {
    constructor(props) {
        super(props)
        this.orderId = undefined
        this.state = {
            billingData: {
                price: '99999', deliveryCharge: '0.0',
                amountPayablePrice: '99999'
            },
            orderDetailArr: [{
                uri: require('../../assets/images/phone.png'), discountPrice: '799', price: '1500',
                name: 'Realme 3i(Diamond Blue, 32GB)', rating: '3.3', ratingCount: '2,333', offer: '4 offers available', qty: '2',
                deliveryTime: '12 Dec,Saturday', deliveryType: 'Free'
            }],
            paymentArr: undefined,
            // [{ type: 'Credit/Debit Card/ATM Card', isSelected: false }, { type: 'UPI Payment', isSelected: false },
            // { type: 'Net Banking', isSelected: false }, { type: 'EMI', isSelected: false }, { type: 'COD (Cash on Delivery)', isSelected: false }],

            paymentCardArr: [{ name: 'Dummy Name ICICI', number: '65************30', uri: require('../../../src/assets/images/icic.png'), isSelected: false },
            { name: 'Dummy ICICI', number: '65************30', uri: require('../../../src/assets/images/icic.png'), isSelected: false },
            { name: 'Dummy ICICI', number: '65************30', uri: require('../../../src/assets/images/icic.png'), isSelected: false },
            { name: 'Dummy ICICI', number: '65************30', uri: require('../../../src/assets/images/icic.png'), isSelected: false }
            ],
            cvvTxt: undefined,
            orderSuccess: false,
            paymentSuccess: false,
        }
    }
    componentDidMount() {
        this.props.getPaymnetMode().then(result=>{
            if(result&&result.length>0){
                 result.map(elt=>{
                 elt.isSelected  = false
                })
                 this.setState({paymentArr:[...result]})
            }
        })
        // this.setState({paymentCardArr:paymentCardArr})
    }
    selctCard = (item, index) => {
        let list = [...this.state.paymentCardArr]
        list.forEach((elt, eltIndx) => {
            if (eltIndx === index)
                elt.isSelected = true
            else
                elt.isSelected = false
        })
        this.setState({ paymentCardArr: [...list] })
    }
    selctPaymentType = (item, index) => {
        // if(index==1){
        //     this.getOrderIdAPI()
        // }

        let list = [...this.state.paymentArr]
        list.forEach((elt, eltIndx) => {
            if (eltIndx === index)
                elt.isSelected = true
            else
                elt.isSelected = false
        })
        let tempBillData = this.state.billingData
        if(index==1){
            tempBillData[APP_PARAMS.PAYMENT_MODE] = "Online Pay"//item[APP_PARAMS.PAYMENT_MODES]
        }else{
            tempBillData[APP_PARAMS.PAYMENT_MODE] = "COD"//item[APP_PARAMS.PAYMENT_MODES]
        }
        this.setState({ paymentArr: [...list] ,billingData:tempBillData})
    }

    deselectPaymentType = () => {
        let list = [...this.state.paymentArr]
       list.forEach((item) => {
            item.isSelected = false
        });
        let bilData = this.state.billingData;
        bilData[APP_PARAMS.PAYMENT_MODE] = undefined;
        this.setState({ paymentArr: [...list], billingData: bilData })
    }

    renderPaymentGetWay = (id) => {
        var options = {
            description: 'Credits towards consultation',
            //image:BASE_URL_LOGO,
          // 'https://ya-webdesign.com/images250_/sad-emoji-transparent-png-5.png',
            image:'https://i.imgur.com/3g7nmJC.png',//BASE_URL_LOGO,
            currency: 'INR',
            key: RAZOR_PAY_KEY,
            amount: this.props.billData.amountPayablePrice * 100,
            //   external: {
            //     wallets: ['paytm']
            //   },
            order_id: id,
            name: APP_NAME,
            prefill: {
                email: global[KEY.USER_DATA][APP_PARAMS.EMAIL],
                contact: global[KEY.USER_DATA][APP_PARAMS.PHONE],
                name: global[KEY.USER_DATA][APP_PARAMS.NAME],
                // method:[]
            },
            theme: { color: colors.primary }
        }
        RazorpayCheckout.open(options).then((data) => {
            // handle success
            if(data&&data.razorpay_payment_id){
                AsyncStorage.storeData(KEY.RAZOR_ORDER_ID,data.razorpay_payment_id)
                this.setState({paymentSuccess:true},()=>{
                    this.placeOrder() 
                })
            }
         //   alert('data'+ data)

          //  alert(`Success: ${data.razorpay_payment_id}`);
        }).catch((error) => {
            this.deselectPaymentType();
            // handle failure
         //   alert(`Error: ${error} | ${error.description}`);
        });

        RazorpayCheckout.onExternalWalletSelection(data => {
            //alert(`External Wallet Selected: ${data.external_wallet} `);
        });
    }

    getOrderIdAPI = () => {
        let data = {
            [APP_PARAMS.PAYMENT_CAPTURE]: 1,
            [APP_PARAMS.AMOUNT]: this.props.billData.amountPayablePrice * 100,
            [APP_PARAMS.CURRENCY]: APP_PARAMS.INR_CURRENCY,
        }
        this.props.placeOrderID(data).then(result => {
            //console.warn('place order', result);
            if (result) {
               // alert(JSON.stringify(result))
                if (result.id) {
                    this.orderId = result.id
                    this.renderPaymentGetWay(result.id)
                } else {
                    Toast.showErrorToast(translate('TRY_AGAIN_ERR_MESSAGE'))
                }
            } else {
                Toast.showErrorToast(translate('MESSAGE_SERVER_ERROR'))
            }
        })
    }
    continueBtnClk=()=>{
        if(this.state.billingData[APP_PARAMS.PAYMENT_MODE]!='COD'){
            this.getOrderIdAPI()
       }else{
           this.placeOrder()
       }
    }
    placeOrder = () => {
        if(this.state.billingData){

            let tempProduct = this.props.productList
            let newProduct = tempProduct.map(elt => {
                return ({
                    [APP_PARAMS.PRODUCT_U_UID]: elt[APP_PARAMS.U_UID],
                    [APP_PARAMS.PRODUCT_ORDER_QTY]: elt[APP_PARAMS.ORDER_QTY] != undefined && elt[APP_PARAMS.ORDER_QTY] != 0  ? elt[APP_PARAMS.ORDER_QTY] : 1,
                    [APP_PARAMS.SHIPPING_CHARGE]:elt[APP_PARAMS.SHIPPING_CHARGE],
                    [APP_PARAMS.PRODUCT_VARIANT_ID]:elt[APP_PARAMS.PRODUCT_VARIANT_ID],
                    [APP_PARAMS.PRODUCT_VARIENT_ID_LIST]:elt[APP_PARAMS.PRODUCT_VARIENT_ID_LIST],
                    [APP_PARAMS.PRODUCT_VARIANTS_PRICE]:elt[APP_PARAMS.PRODUCT_VARIENT_ID_LIST]!=undefined? elt[APP_PARAMS.PRICE]:undefined,

                })
            })
           
            let data = {
                [APP_PARAMS.PAYMENT_MODE]: this.state.billingData[APP_PARAMS.PAYMENT_MODE]!=undefined&&
                (this.state.billingData[APP_PARAMS.PAYMENT_MODE]=='COD'?KEY.COD:KEY.ONLINE_PAY),
                [APP_PARAMS.CUSTOMER_ID]: global[KEY.USER_DATA] != undefined && global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID],
                [APP_PARAMS.BEAN_ORDER_PRODUCT]: newProduct,
                [APP_PARAMS.BILLING_ADDRESS]: this.props.address != undefined && this.props.address,//[APP_PARAMS.U_UID],
                [APP_PARAMS.TOTAL_AMOUNT]: this.props.billData.amountPayablePrice,
                [APP_PARAMS.PAYMENT_ORDER_ID]:this.orderId
                /// [APP_PARAMS.SUBL_AMOUNT]:this.props.billData.amountPayablePrice,
            }
            console.log("new product for place ordr::-newProduct-",JSON.stringify(data));

            this.props.placeOrder(data).then(result => {
                if (result) {
                   
                    console.log("place order result::--",result);
                    
                    if (result.hasOwnProperty(APP_PARAMS.SUCCESS) && result[APP_PARAMS.SUCCESS]) {
                        if (result[APP_PARAMS.SUCCESS]) {
                            this.setState({ orderSuccess: true ,paymentSuccess:false})
                            AsyncStorage.clearData(KEY.RAZOR_ORDER_ID)
                            if(result.hasOwnProperty(APP_PARAMS.DATA)&&result[APP_PARAMS.DATA]!=undefined&&result[APP_PARAMS.DATA][APP_PARAMS.BEAN_ORDER_PRODUCT]!=undefined&&result[APP_PARAMS.DATA][APP_PARAMS.BEAN_ORDER_PRODUCT].length>0){
    
                            
                            setTimeout(() => {
                               this.props.navigation.navigate(SCREENS.ORDER_DETAIL,{[APP_PARAMS.PRODUCT_ID]:result[APP_PARAMS.DATA][APP_PARAMS.BEAN_ORDER_PRODUCT][0].productId,
                                   [APP_PARAMS.ORDER_ID]:result[APP_PARAMS.DATA][APP_PARAMS.ORDER_ID],isFrom:SCREENS.PAYMENT})
                               // NavigationService.clearStack(SCREENS.DRAWER)
                                global[KEY.CART_COUNT] = 0
                              //  global[KEY.WISH_COUNT] = 0
                            }, 2000);
                        }
                        } else {
                           // console.warn("datat of order place",JSON.stringify(result[APP_PARAMS.MESSAGE]));
                            this.setState({ paymentSuccess:false,orderSuccess:false})
                            if (result[APP_PARAMS.MESSAGE]) {
                                Toast.showErrorToast(result[APP_PARAMS.MESSAGE])
                                //this.setState({ orderSuccess: true })
                            }
                        }
    
                    } else {
                        this.setState({ paymentSuccess:false,orderSuccess:false})
                        if (result[APP_PARAMS.MESSAGE]) {
                            Toast.showErrorToast(result[APP_PARAMS.MESSAGE])
                            //this.setState({ orderSuccess: true })
                        }else
                        Toast.showErrorToast(translate('MESSAGE_SERVER_ERROR'))
                    }
                }
            })
        }
       
    }
    renderHeaderItem = (item, index) => {
        return (
            index < 3 &&
            <View style={{ borderBottomWidth: DIMENS.px_05, borderBottomColor: colors.lightGrayText, padding: 15 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flex: .9 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Ripple onPress={() => this.selctCard(item, index)} style={{ flex: .1 }}
                                style={{ width: DIMENS.px_22, height: DIMENS.px_22 }}>
                                <Image source={item.isSelected ? RADIO_POINT : CIRCLE}
                                    style={{ width: DIMENS.px_22, height: DIMENS.px_22 }} />
                            </Ripple>
                            <View style={{ flex: .9, marginHorizontal: DIMENS.px_10 }}>
                                <Text style={{
                                    fontFamily: FONT_FAMILIY.Roboto_Regular,
                                    fontSize: DIMENS.txt_size_medium, color: colors.black
                                }}>{item.name}</Text>
                                <Text style={{
                                    fontFamily: FONT_FAMILIY.Roboto_Regular,
                                    fontSize: DIMENS.txt_size_medium, color: colors.black
                                }}>{item.number}</Text>
                                {
                                    item.isSelected &&

                                    <View style={{
                                        flexDirection: 'row', alignItems: 'center', width: WIDTH * 35 / 100,
                                        borderBottomColor: colors.grayClr, borderBottomWidth: 1, justifyContent: 'space-between'
                                    }}>
                                        <TextInput
                                            style={{
                                                height: DIMENS.px_45,
                                                fontSize: DIMENS.txt_size_large,
                                                fontFamily: FONT_FAMILIY.Roboto_Regular,
                                                color: colors.black,
                                            }}
                                            value={this.state.cvvTxt}
                                            placeholderTextColor={colors.gray}
                                            placeholder={translate('CVV')}
                                            onChangeText={(text) => this.setState({ cvvTxt: text })}
                                        />
                                        <Image source={QUSTN} style={{ width: DIMENS.px_22, height: DIMENS.px_22 }} />
                                    </View>
                                }
                            </View>
                        </View>
                    </View>
                    <Image source={item.uri} style={{ width: 60, height: 60 }} />
                </View>
            </View>
        )
    }
    renderFooterShowMore = () => {
        return (
            this.state.paymentCardArr != undefined && this.state.paymentCardArr.length > 3 ?
                <Ripple>
                    <Text style={{
                        fontSize: DIMENS.txt_size_medium_1,
                        fontFamily: FONT_FAMILIY.Roboto_Medium,
                        color: colors.primary, textAlign: 'center', padding: 15
                    }}>
                        {translate('SHOW') + ' 3 ' + translate('MORE')}</Text>
                </Ripple> :
                <View>
                </View>
        )
    }
    renderHeader = () => {
        return (
            <View style={{ flex: 1, borderBottomWidth: DIMENS.px_5, borderBottomColor: colors.lightGraytransparent }}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={this.state.paymentCardArr}
                    renderItem={({ item, index }) => this.renderHeaderItem(item, index)}
                    extraData={this.state}
                    keyExtractor={(item, index) => index.toString()}
                    ListFooterComponent={() => this.renderFooterShowMore()}
                />
            </View>
        )
    }
    renderItem = (item, index) => {
        return (
            <View>
                <View style={{ borderBottomWidth: DIMENS.px_05, borderBottomColor: colors.lightGrayText, 
                    paddingHorizontal: DIMENS.px_15,paddingVertical:DIMENS.px_20 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Ripple onPress={() => this.selctPaymentType(item, index)}>
                            <Image source={item.isSelected ? RADIO_POINT : CIRCLE}
                                style={{ width: DIMENS.px_22, height: DIMENS.px_22 }} />
                        </Ripple>
                        <Text style={{
                            marginHorizontal: DIMENS.px_10,
                            fontFamily: FONT_FAMILIY.Roboto_Regular,
                            fontSize: DIMENS.txt_size_medium, color: colors.black
                        }}>
                            {item[APP_PARAMS.PAYMENT_MODES]}</Text>
                    </View>

                </View>
                {
                    index === this.state.paymentArr.length - 1 &&
                    <View style={{ height: DIMENS.px_5, backgroundColor: colors.lightGraytransparent, width: '100%' }} />

                }
            </View>
        )
    }
    responseAPI = (result) => {
        let data = {};
        if (result) {
            if (result.hasOwnProperty(APP_PARAMS.SUCCESS) && result[APP_PARAMS.SUCCESS]) {
               
            } else {
                Toast.showErrorToast(translate('MESSAGE_SERVER_ERROR'))
            }
        }
    }
    render() {
        const { loading, billData, productList, address, data, paymentMode } = this.props
       // console.warn('address::--', this.props.address);
        //console.warn('paymentMode::--', paymentMode);

        return (
            <View style={{ flex: 1 }}>
                <CommonNavHeader title={translate('SCREEN_PAYMENT')}
                    backPress={() => this.props.navigation.goBack()} />

                <View style={{ flex: 1 }}>
                    {
                        this.state.orderSuccess ?
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <FastImage resizeMode={'contain'} style={{ width: WIDTH - 40, height: HEIGHT - 100 }} 
                                source={ORDER_SUCESS_GIF} />
                            </View>

                            :
                            this.state.paymentSuccess?<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                             <Loader textLoad={translate('PLEASE_WAIT')}/>
                              </View>:
                              this.state.paymentArr&&
                            <View style={{ flex: 1 }}>
                                <View style={{ position: 'absolute', top: 0, bottom: 50, width: '100%' }}>
                                    <FlatList
                                        showsVerticalScrollIndicator={false}
                                        data={this.state.paymentArr}
                                        renderItem={({ item, index }) => this.renderItem(item, index)}
                                        extraData={this.state}
                                        keyExtractor={(item, index) => index.toString()}
                                        //ListHeaderComponent={() => this.renderHeader()}
                                        ListFooterComponent={() => {
                                            return (
                                                <CommonBillingView
                                                    data={billData != undefined && billData}
                                                    paymentMode ={this.state.billingData[APP_PARAMS.PAYMENT_MODE]}// this.state.billingData
                                                />
                                            )
                                        }}
                                    />

                                </View>
                                <View style={{
                                    bottom: 0, flexDirection: 'row', position: 'absolute',
                                    backgroundColor: colors.whiteBackground, alignItems: 'center'
                                }}>
                                    <Ripple style={{ flex: 0.5 }}>
                                        <View style={{ backgroundColor: colors.whiteBackground, justifyContent: 'center', marginHorizontal: DIMENS.px_5 }}>
                                        <Text style={{ fontSize: DIMENS.txt_size_medium_1, fontFamily: FONT_FAMILIY.Roboto_Medium, color: colors.primary }}>
                                                {translate('PRICE')}</Text>
                                            <Text style={{ fontSize: DIMENS.txt_size_medium_1, fontFamily: FONT_FAMILIY.Roboto_Medium, color: colors.black }}>
                                                {CURRENCY.RUPEES + billData.amountPayablePrice}</Text>
                                            {/* <Text style={{ fontSize: DIMENS.txt_size_medium_1, fontFamily: FONT_FAMILIY.Roboto_Medium, color: colors.primary }}>
                                                {translate('VIEW_PRICE_DETAILS')}</Text> */}
                                        </View>
                                    </Ripple>
                                    <Ripple disabled={this.state.billingData[APP_PARAMS.PAYMENT_MODE]!=undefined?false:true}



                                      // this.state.billingData[APP_PARAMS.PAYMENT_MODE]=='COD' ? false : true }
                                     style={{ flex: 0.5 }} onPress={() => this.continueBtnClk()}>
                                        <View style={{ backgroundColor: this.state.billingData[APP_PARAMS.PAYMENT_MODE]!=undefined?
                                        colors.primary : colors.primaryDisabled }}>
                                            {/* // this.state.billingData[APP_PARAMS.PAYMENT_MODE]=='COD' ? */}
                                            <Text style={{ padding: 15, textAlign: 'center', fontSize: DIMENS.txt_size_medium_1, fontFamily: FONT_FAMILIY.Roboto_Medium, color: colors.white }}>
                                                {translate('CONTINUE').toUpperCase()}</Text>
                                        </View>
                                    </Ripple>
                                </View>
                            </View>

                    }
                </View>
                {
                    loading &&
                    <Loader loader={loading} />
                }

            </View>
        )
    }
}