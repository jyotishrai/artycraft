import React from 'react'
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text, Image, StyleSheet,
    TouchableOpacity, FlatList,
    View, Dimensions, TextInput, BackHandler
} from 'react-native'
import Ripple from 'react-native-material-ripple';
import styles from '../Auth/styles'
import { colors } from '../../theme';
import { NOTIFICATION, HEART, SEARCH, ORDER, PLACEHOLDER_PRODUCT, PLACEHOLDER_PRODUCT_IMG, NEXT, GREENCIRCLE, NEXT_GRAY } from '../../images'
import HeaderButton from '../HeaderButton'
import translate from '../../i18n/i18n';
import { DIMENS, FONT_FAMILIY, WIDTH, HEIGHT, CURRENCY, APP_PARAMS, SCREENS, ORDER_DETAIL_SUCCESS, KEY, CONST } from '../../constants';
import Basecomponents from '../../common/BaseComponent';
import CommonNavHeader from '../../common/CommonNavHeader';
import { CommonBillingView } from '../../common/CommonProductRow';
import CommonOrderSummaryProduct from '../../common/CommonOrderSummaryProduct';
import CommonDropDown from '../../common/CommonDropDown';
import { CommonEmptyView } from '../../common/CommonEmptyView';
import NavigationService from '../../NavigationService';
import Loader from '../../common/Loader';
import { OrderStatusBar } from '../../common/OrderStatusBar';
import CommonImage from '../../common/CommonImage'


import * as Toast from '../../utility/Toast'
import * as Utils from '../../utility/Utils'



let productInfo = { name: 'Apple MacBook air core i5 tthjoi joif m gok mogrgot', 'sellerName': 'Rajesh Kumar', 'features': '5th FGen , 8 GB', 'discountPrice': '50', 'price': '60', 'order_qty': 1, }
let addressData = {
    name: 'Sheetal Jain', flatNo: '90, 10 B', address: 'Usha Vihar, Arjun Nagar, Triveni Nagar, Near N S Boys Hostel', city: 'Jaipur',
    state: 'Rajasthan', phone: '9509274990'
}

export default class OrderSummaryWithDetail extends Basecomponents {
    constructor(props) {
        super(props)
        this.Star = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';
        this.back = BackHandler.addEventListener('hardwareBackPress', this.backHandler)
        //Empty Star. You can also give the path from local
        this.Star_With_Border = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';
        this.viewabilityConfig = { itemVisiblePercentThreshold: 40 };
        this.isFrom = this.props.navigation.state != undefined &&
            this.props.navigation.state.params != undefined &&
            this.props.navigation.state.params.isFrom != undefined &&
            this.props.navigation.state.params.isFrom == 'Cart' && true;
        this.data = undefined

        this.state = {
            offerArr: ['Extra 5% off* with Axis Bank Buzz Credit Card', 'Extra 5% off* with Axis Bank Buzz Credit Card', 'Extra 5% off* with Axis Bank Buzz Credit Card'],
            billingData: {
                price: '99999', deliveryCharge: '0.0',
                amountPayablePrice: '99999'
            },
            currentPosition: 2,
            Default_Rating: 0,
            Max_Rating: 5,
            orderDetailArr: [{ name: 'Product', uri: PLACEHOLDER_PRODUCT_IMG, status: 'Processing' }, { name: 'Product', uri: PLACEHOLDER_PRODUCT_IMG, status: 'Processing' }],
            idOfProduct: this.props.navigation.state.params && this.props.navigation.state.params[APP_PARAMS.PRODUCT_ID],
            orderId: this.props.navigation.state.params && this.props.navigation.state.params[APP_PARAMS.ORDER_ID],
            productArrData: undefined,
            shippingAddress: undefined,
            productDetail: undefined,
            orderNo: undefined,
            paymentMode: undefined,
            orderStatusData: undefined,
            orderCncelData: undefined
        }
    }
    componentDidMount() {
     console.log("dataa::---mount",this.state.orderId);
        
        this.state.orderId &&
            this.props.getOrderDetailAPi(this.state.orderId).then(result => {
                this.responseAPI(result)
                console.log("dataa::---mount",JSON.stringify(result));

            })

    }
    componentWillUnmount() {
        this.back.remove()
    }
    responseAPI = (result) => {
        let data = {};
        if (result) {
            if (result.hasOwnProperty(APP_PARAMS.SUCCESS) && result[APP_PARAMS.SUCCESS]) {

                if (result.hasOwnProperty(APP_PARAMS.DATA) && result[APP_PARAMS.DATA] != null) {
                    let shipping = undefined;
                    let product = undefined;
                    let productDetail = undefined;
                    let billingData = undefined;
                    let paymentMode = undefined;
                    this.data = result[APP_PARAMS.DATA]

                    let dataOrdre = [
                        { status: 'Order Placed', time: this.data && this.data[APP_PARAMS.CREATED_TIME] && this.data[APP_PARAMS.CREATED_TIME] },
                        // { status: "Order Delivered", time: this.state.productDetail != undefined && this.state.productDetail[APP_PARAMS.DELIVERY_DATE] }
                    ]

                    if (result[APP_PARAMS.DATA].hasOwnProperty(APP_PARAMS.BEAN_ORDER_PRODUCT) && result[APP_PARAMS.DATA][APP_PARAMS.BEAN_ORDER_PRODUCT].length > 0) {
                        product = result[APP_PARAMS.DATA][APP_PARAMS.BEAN_ORDER_PRODUCT]

                        productDetail = result[APP_PARAMS.DATA][APP_PARAMS.BEAN_ORDER_PRODUCT].filter(item => {
                            if (item[APP_PARAMS.PRODUCT_ID] === this.state.idOfProduct||item[APP_PARAMS.PRODUCT_U_UID] === this.state.idOfProduct) {
                           // if (item[APP_PARAMS.PRODUCT_U_UID] === this.state.idOfProduct) {
                                return item
                            }
                        })
                        dataOrdre[1] = { status: "Order Delivered", time: productDetail != undefined && productDetail.length > 0 && productDetail[0][APP_PARAMS.DELIVERY_DATE] }


                        product = result[APP_PARAMS.DATA][APP_PARAMS.BEAN_ORDER_PRODUCT].filter(item => {
                            if (item[APP_PARAMS.PRODUCT_ID] !== this.state.idOfProduct) {
                                return item
                            }
                        })
                        console.warn("product detaiLL--",productDetail[0]);
                        console.warn("this.state.idOfProduct",this.state.idOfProduct);
                        

                        billingData = this.billingDataCalculation(productDetail[0])
                        // { price:productDetail[0][APP_PARAMS.PRICE] , 
                        //                deliveryCharge: '0.0',
                        //               amountPayablePrice:productDetail[0][APP_PARAMS.PAY_PRICE],
                        //               qty: productDetail[0][APP_PARAMS.PRODUCT_ORDER_QTY]}

                    }
                    if (result[APP_PARAMS.DATA].hasOwnProperty(APP_PARAMS.SHIPPING_ADDRESS)) {
                        shipping = result[APP_PARAMS.DATA][APP_PARAMS.SHIPPING_ADDRESS]
                    }
                    if (result[APP_PARAMS.DATA].hasOwnProperty(APP_PARAMS.PAYMENT_MODE)) {
                        paymentMode = Utils.removeUnderscore(result[APP_PARAMS.DATA][APP_PARAMS.PAYMENT_MODE])
                    }

                    if (productDetail != undefined && productDetail[0].productCurrentStatusObj) {

                        let orderStatus = productDetail[0].productCurrentStatusObj
                        const JSONString = orderStatus;
                        object = JSON.parse(JSONString);
                        if (object.current_status_type && object.current_status_type === CONST.ORDER_PLACE) {
                            dataOrdre[0] = { status: translate('ORDER_STATUS_PLACE'), subStatus: object.current_status_body, current: true, time: object.current_status_time }
                        }
                        if (object.current_status_type && object.current_status_type === CONST.ORDER_CANCEL) {
                            dataOrdre[1] = { status: translate('ORDER_STATUS_CANCEL'), subStatus: object.current_status_body, current: true, time: object.current_status_time }
                        }else if(object.current_status_type && object.current_status_type === CONST.ORDER_RETURN){
                            dataOrdre[1] = { status: translate('ORDER_STATUS_RETURN'), subStatus: object.current_status_body, current: true, time: object.current_status_time }
 
                        }

                    }
                    let orderCncelData = undefined
                    if (productDetail != undefined && productDetail[0].productRefundStatusObj) {

                        let orderRefundStatus = productDetail[0].productRefundStatusObj
                        const JSONString = orderRefundStatus;
                        object = JSON.parse(JSONString);
                         console.log("order refund status::-",object);
                         orderCncelData = object

                    }

                    this.setState({
                        productArrData: product, shippingAddress: shipping,
                        productDetail: productDetail[0], billingData: billingData, paymentMode: paymentMode,
                        orderStatusData: dataOrdre,orderCncelData:orderCncelData,
                        Default_Rating:productDetail[0][APP_PARAMS.USER_REIEW]&&productDetail[0][APP_PARAMS.USER_REIEW][APP_PARAMS.STAR]?productDetail[0][APP_PARAMS.USER_REIEW][APP_PARAMS.STAR]:0

                    }, () => {
                        console.log('product::: ', this.state.productDetail);
                        
                    })
                    // if (result[APP_PARAMS.RES_PKT][APP_PARAMS.PRODUCTS] &&
                    //     result[APP_PARAMS.RES_PKT][APP_PARAMS.PRODUCTS].length > 0) {
                    //     data[APP_PARAMS.PRODUCTS] = result[APP_PARAMS.RES_PKT][APP_PARAMS.PRODUCTS]
                    // }
                    // if (result[APP_PARAMS.RES_PKT][APP_PARAMS.DESTINATION] != undefined) {
                    //     data[APP_PARAMS.DESTINATION] = result[APP_PARAMS.RES_PKT][APP_PARAMS.DESTINATION]
                    // }
                    // if (result[APP_PARAMS.RES_PKT][APP_PARAMS.POSTAL_CODE] != undefined) {
                    //     data[APP_PARAMS.POSTAL_CODE] = result[APP_PARAMS.RES_PKT][APP_PARAMS.POSTAL_CODE]
                    // }
                    // if (result[APP_PARAMS.RES_PKT][APP_PARAMS.ADDRESS] != undefined) {
                    //     data[APP_PARAMS.ADDRESS] = result[APP_PARAMS.RES_PKT][APP_PARAMS.ADDRESS]
                    // }
                } else if (result[APP_PARAMS.MESSAGE]) {
                    Toast.showErrorToast(result[APP_PARAMS.MESSAGE])
                }
            } else {
                Toast.showErrorToast(translate('MESSAGE_SERVER_ERROR'))
            }
        }
    }
    billingDataCalculation = (product) => {
        console.log("prodct:::--",product);
        let totalAount = product[APP_PARAMS.PRODUCT_ORDER_QTY]!=undefined&&product[APP_PARAMS.PRODUCT_ORDER_QTY]!=0? 
        product[APP_PARAMS.PAY_PRICE]*product[APP_PARAMS.PRODUCT_ORDER_QTY]: product[APP_PARAMS.PAY_PRICE]
        totalAount =  product[APP_PARAMS.SHIPPING_CHARGE]!=undefined?totalAount + product[APP_PARAMS.SHIPPING_CHARGE]:totalAount

        
        return billingData = {
            price:product[APP_PARAMS.PRODUCT_ORDER_QTY]!=undefined&&product[APP_PARAMS.PRODUCT_ORDER_QTY]!=0? product[APP_PARAMS.PRICE]*product[APP_PARAMS.PRODUCT_ORDER_QTY]: product[APP_PARAMS.PRICE],
            deliveryCharge: product[APP_PARAMS.SHIPPING_CHARGE],
            amountPayablePrice: totalAount,//product[APP_PARAMS.PRODUCT_ORDER_QTY]!=undefined&&product[APP_PARAMS.PRODUCT_ORDER_QTY]!=0? product[APP_PARAMS.PAY_PRICE]*product[APP_PARAMS.PRODUCT_ORDER_QTY]: product[APP_PARAMS.PAY_PRICE],
            qty: product[APP_PARAMS.PRODUCT_ORDER_QTY],
            discount:product[APP_PARAMS.DISCOUNT]
        }
    }
    //Action
    changeOrderProduct = (item, index) => {
        let billData = this.billingDataCalculation(item)
        let productArr = this.data[APP_PARAMS.BEAN_ORDER_PRODUCT].filter(element => {
            if (item[APP_PARAMS.PRODUCT_ID] !== element[APP_PARAMS.PRODUCT_ID]) {
                return item
            }
        })

        this.setState({ billingData: billData, productDetail: item, productArrData: productArr,  
            Default_Rating:item[APP_PARAMS.USER_REIEW]&&item[APP_PARAMS.USER_REIEW][APP_PARAMS.STAR]?item[APP_PARAMS.USER_REIEW][APP_PARAMS.STAR]:0
        })
    }
    orderTackingClk = (data) => {
        if (data[APP_PARAMS.TRACKING_ID]) {
            this.props.getTrackFullDetailAPi(data[APP_PARAMS.TRACKING_ID]).then(respose => {
                if (respose) {
                    this.props.navigation.navigate(SCREENS.TRACK_ORDER)
                }

            })
            // this.props.getTrackFullDetailAPi(1605116776243)
        }
        //this.props.navigation.navigate(SCREENS.TRACK_ORDER)

        //  
    }
    goBackDataReturn = (data,isFrom) => {
        console.log("data come back:-", data);
        let orderStatus = this.state.orderStatusData
        let status = ''
        if(this[CONST.IS_FROM] === CONST.CANCEL_ORDER){
            status = translate('ORDER_STATUS_CANCEL')
        }
        else if(this[CONST.IS_FROM] === CONST.RETURN_ORDER){
            status = translate('ORDER_STATUS_RETURN')
            
        }else
        status = translate('ORDER_STATUS_REPLACE')
        //alert('from'+this[CONST.IS_FROM]+'status:-'+status)
        orderStatus[1].status = status
        this.setState({ orderCncelData: data,orderStatusData :orderStatus},()=>{
            this.props.myOrderData[APP_PARAMS.DATA][APP_PARAMS.ORDER_LIST].map((item,mainIndex)=>{
                if(item.orderId === this.state.orderId){
                    item[APP_PARAMS.BEAN_ORDER_PRODUCT].map((productItem,index)=>{
                        if(productItem.productId===this.state.productDetail.productId){
                            productItem.orderStatus = "Order Cancelled"
                            this.props.myOrderData[APP_PARAMS.DATA][APP_PARAMS.ORDER_LIST][mainIndex][APP_PARAMS.BEAN_ORDER_PRODUCT][index] = productItem
                        }
                    })
                }
            })
            // console.log("this.props.myOrderData:-", this.props.myOrderData);

        })
    }
    backHandler = () => {
        this.backHrdwareHandler()
        return true;
    }
    backHrdwareHandler=()=>{
        this.props.navigation.state.params != undefined &&
        this.props.navigation.state.params.isFrom != undefined && this.props.navigation.state.params.isFrom === SCREENS.PAYMENT ?
        NavigationService.clearStack(SCREENS.DRAWER) :

        this.props.navigation.goBack()
    }
    navigateToProductDetail=(item)=>{
        this.props.navigation.push(SCREENS.CATEGORY_SUB_DETAIL, { [APP_PARAMS.DATA]: item })
    }
    
    //Render
    renderOrderItem = (item) => {

        try {
            return (
                <View style={{
                    borderBottomColor: colors.lightGraytransparent, borderBottomWidth: DIMENS.px_05, width: '100%',
                }}>
                    <View style={{ width: WIDTH, height: DIMENS.px_1, backgroundColor: colors.lightGray, marginBottom: DIMENS.px_10 }} />
                    <View style={{ paddingLeft: DIMENS.px_15, paddingRight: DIMENS.px_10, paddingTop: DIMENS.px_5, paddingBottom: DIMENS.px_10 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                            <View style={{
                                flex: .8
                            }}>
                                <Ripple 
                               onPress={()=>this.navigateToProductDetail(item)} >
                                <Text numberOfLines={2} style={{
                                    color: colors.black, fontSize: DIMENS.txt_size_medium_1,
                                    fontFamily: FONT_FAMILIY.Roboto_Regular, marginRight: DIMENS.px_5
                                }}>
                                   
                                    {item.name && item.name}</Text></Ripple>
                                    { item.productVariant != undefined &&
                                <Text style={{ color: colors.grayClrForTxt, fontSize: DIMENS.txt_size_small_12, fontFamily: FONT_FAMILIY.Roboto_Regular,marginVertical:DIMENS.px_5 }}>
                                    {item.productVariant}</Text>}
                                {item[APP_PARAMS.SELLER_NAME] != undefined &&
                                    <Text style={{
                                        color: colors.grayClrForTxt,
                                        fontSize: DIMENS.txt_size_small_12,
                                        fontFamily: FONT_FAMILIY.Roboto_Regular, marginVertical: DIMENS.px_5
                                    }}>
                                        {`${translate('SELLER')} : ${item[APP_PARAMS.SELLER_NAME]}`}</Text>}
                            <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>

                                {
                                    item[APP_PARAMS.PAY_PRICE] &&
                                    <Text style={{
                                        color: colors.black, marginTop: DIMENS.px_5, marginTop: DIMENS.px_5,
                                        fontSize: DIMENS.txt_size_large_extra, fontFamily: FONT_FAMILIY.Roboto_Regular
                                    }}>
                                        {CURRENCY.RUPEES + item[APP_PARAMS.PAY_PRICE] + ' '}</Text>
                                }
                                {
                                    item.price && item.discount != undefined && item.discount != 0 &&
                                    <Text style={{ marginLeft: DIMENS.px_5, textDecorationLine: 'line-through', color: colors.lightGrayClr, fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                                        {CURRENCY.RUPEES + ''+item.price + ' '}</Text>
                                }
                                 {
                                    item.discount != undefined && item.discount != 0 &&
                                    <Text style={{ marginLeft: DIMENS.px_5,  color: colors.green, fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                                        {item.discount + '% ' + translate('OFF')}</Text>
                                }
                               </View>
                                {/* <TouchableOpacity onPress={() => this.props.navigation.navigate(SCREENS.TRACK_ORDER)}
                                    style={{ flexDirection: 'row',  borderRadius: DIMENS.px_8, alignItems: 'center' }}>
                                    <Text style={[styles.nameText, { color: colors.primary, fontWeight: 'bold',marginRight:0 }]}>{translate('TRACK_ORDER')}</Text>
                                    <Image style={{ height: DIMENS.px_15, width: DIMENS.px_15, resizeMode: 'contain' }} source={NEXT} />
                                </TouchableOpacity> */}
                            </View>

                            <Ripple style={{ flex: .3 }} onPress={()=>this.navigateToProductDetail(item)}>
                                <Image source={item[APP_PARAMS.IMG_URl] != undefined && item[APP_PARAMS.IMG_URl] != '' ? { uri: item[APP_PARAMS.IMG_URl] } : PLACEHOLDER_PRODUCT_IMG}
                                    style={{ width: WIDTH * 25 / 100, height: 70, resizeMode: 'contain', }} />

                            </Ripple>



                        </View>

                        {/* {
                            item[APP_PARAMS.DELIVERY_TIME] != undefined &&
                            <View style={{ marginTop: 10 }}>
                                <Text style={{
                                    color: colors.black,
                                    fontSize: DIMENS.txt_size_medium,
                                    fontFamily: FONT_FAMILIY.Roboto_Regular,
                                }}> {translate('DELIVER_BY')}</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                        <Text style={{
                                            color: colors.black,
                                            fontSize: DIMENS.txt_size_medium,
                                            fontFamily: FONT_FAMILIY.Roboto_Regular,
                                            fontWeight: '500', textAlign: 'left'
                                        }}> {Utils.getTimeFromTimeStamp(item[APP_PARAMS.DELIVERY_TIME], 'DD MMM, dddd')}</Text>
                                        {
                                            item[APP_PARAMS.SHIPPING_CHARGE] != undefined &&
    
                                            <Text style={{
                                                color: colors.green,
                                                fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular,
                                                marginRight: DIMENS.px_5, fontWeight: '500'
                                            }}>{item[APP_PARAMS.SHIPPING_CHARGE] != 0.0 ? `( ${translate('FREE')} )` : item[APP_PARAMS.SHIPPING_CHARGE]}</Text>}
    
                                    </View>
    
                                </View>
                            </View>
                        } */}

                    </View>

                    {
                        this.state.moreTxtValue &&
                        this.addMoreQtyView()
                    }

                </View>
            );
        } catch (error) {
            alert('err::--' + error)
        }

    }
    navigateReviewRating=(key)=>{
        let productDetail = undefined
        if(this.state.productDetail){
            productDetail = this.state.productDetail
            productDetail[APP_PARAMS.BUYED_BY_ME] = true
            console.log("productDetail::--order summry before",productDetail);

             if(productDetail[APP_PARAMS.USER_REIEW]){
                productDetail[APP_PARAMS.USER_REIEW][APP_PARAMS.STAR] = key
             }
            //  else
            // productDetail[APP_PARAMS.USER_REIEW] = {[APP_PARAMS.STAR]:key}
        }
        console.log("productDetail::--order summry",productDetail);
        

        this.props.navigation.navigate(SCREENS.REVIEW_RATING,
            { 
                [APP_PARAMS.BUYED_BY_ME]:productDetail&&productDetail[APP_PARAMS.BUYED_BY_ME],// this.state.productDetail[APP_PARAMS.IS_REVIEWED_BY_ME]!=undefined &&  this.state.productDetail[APP_PARAMS.IS_REVIEWED_BY_ME]==true?true:false, 
                product: this.state.productDetail,
                 Default_Rating: key,
                 [APP_PARAMS.USER_REIEW]:this.state.productDetail&&this.state.productDetail[APP_PARAMS.USER_REIEW],
                 goBackFromReviewRattting:(item)=>this.goBackFromReviewRattting(item)
             })
        // this.props.navigation.navigate(SCREENS.REVIEW_RATING,
        //     { [APP_PARAMS.BUYED_BY_ME]: true, product: this.state.productDetail })
    }
    goBackFromReviewRattting=(data)=>{
        if( this.state.productDetail){
            let deatil = this.state.productDetail
            deatil[APP_PARAMS.IS_REVIEWED_BY_ME] = true
            deatil[APP_PARAMS.USER_REIEW] = data
            data&&data[APP_PARAMS.STAR]&&
            this.setState({Default_Rating:data[APP_PARAMS.STAR],productDetail:deatil})
        } 
    }

    onRatingClick = (key) => {
        this.setState({ Default_Rating: key }, () => {
            setTimeout(() => {
                this.navigateReviewRating(key)
                // this.props.navigation.navigate(SCREENS.REVIEW_RATING,
                //     { [APP_PARAMS.BUYED_BY_ME]: true, product: this.state.productDetail,
                //          Default_Rating: key,[APP_PARAMS.USER_REIEW]:this.dataResponse&&this.dataResponse[APP_PARAMS.USER_REIEW]&&this.dataResponse[APP_PARAMS.USER_REIEW]
                //          })
            }, 400)
        })
    }

    renderAddress = (item) => {
        return (
            <View style={{ borderBottomWidth: DIMENS.px_5, borderBottomColor: colors.lightGray }}>
                <View style={{ paddingLeft: DIMENS.px_5, paddingRight: DIMENS.px_10, paddingTop: DIMENS.px_5, paddingBottom: DIMENS.px_10 }}>
                    <View style={{ width: WIDTH, borderTopWidth: 0.5, borderBottomWidth: 0.5, borderColor: colors.lightGray }} >
                        <Text style={styles.headerTitleOfOrderView}>{translate('SHIPPING_DETAILS')}</Text>
                    </View>
                    <View style={{ margin: DIMENS.px_10 }}>

                        <Text style={styles.nameText}>{item[APP_PARAMS.FIRST_NAME] && Utils.capitalizeFirstChar(item[APP_PARAMS.FIRST_NAME])}</Text>
                        <Text style={[styles.addressText, { marginTop: DIMENS.px_10 }]}>{item[APP_PARAMS.STREET_ADDRESS]}</Text>
                        <Text style={styles.addressText}>{item[APP_PARAMS.APARTMENT_SUIT]}</Text>
                        <Text style={styles.addressText}>{item.city}</Text>
                        <Text style={styles.addressText}>{item.state}</Text>
                        <Text style={styles.addressText}>{translate('PHONE_NUMBER') + ": " + item.phone}</Text>
                    </View>
                </View>
            </View>
        );
    }
    renderRatingView = () => {
        let React_Native_Rating_Bar = [];
        //Array to hold the filled or empty Stars
        for (var i = 1; i <= this.state.Max_Rating; i++) {
            React_Native_Rating_Bar.push(
                <TouchableOpacity
                    activeOpacity={0.7} key={i}
                    onPress={this.onRatingClick.bind(this, i)}
                    style={{ justifyContent: 'center', alignItems: 'center' }} >
                    <Image
                        style={[{
                            width: DIMENS.px_25, height: DIMENS.px_25, resizeMode: 'contain', marginRight: DIMENS.px_12,
                            tintColor: i <= this.state.Default_Rating ? colors.primary : colors.lightGraytransparent
                        }]}
                        source={
                            i <= this.state.Default_Rating
                                ? { uri: this.Star }
                                : { uri: this.Star }
                        }
                    />
                </TouchableOpacity>
            );
        }
        return (
            <View style={{
                flex: 1, flexDirection: 'row', justifyContent: 'space-between', width: '100%',
                paddingVertical: DIMENS.px_10, paddingHorizontal: DIMENS.px_15, alignItems: 'center'
            }}>
                <View style={{ justifyContent: 'center', flexDirection: 'row' }}>{React_Native_Rating_Bar}</View>
                <Ripple onPress={() => this.navigateReviewRating(this.state.Default_Rating)}>
                    <Text style={{
                        fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Medium, marginRight: DIMENS.px_5,
                        fontWeight: '500', padding: DIMENS.px_10, color: colors.primary
                    }}>{this.state.productDetail!=undefined && this.state.productDetail!=null 
                        && this.state.productDetail[APP_PARAMS.IS_REVIEWED_BY_ME]!=undefined &&  this.state.productDetail[APP_PARAMS.IS_REVIEWED_BY_ME]==true ?
                        translate('EDIT_REVIEW') : translate('WRITE_REVIEW')}</Text>
                    {/* {translate('EDIT_REVIEW')} */}
                </Ripple>
            </View>
        )
    }

    renderOtherOrderItem = (item, index, section) => {
        let orderStatusObj = item.productCurrentStatusObj&&JSON.parse(item.productCurrentStatusObj)
        return (
            <Ripple style={{
                borderBottomColor: colors.lightGraytransparent, borderBottomWidth: DIMENS.px_05, width: '100%',
            }} onPress={() => this.changeOrderProduct(item)}>
                <View style={{ paddingLeft: DIMENS.px_15, paddingRight: DIMENS.px_10, paddingTop: DIMENS.px_5, paddingBottom: DIMENS.px_10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                        <View style={{
                            flex: .7
                        }}>
                            <Text numberOfLines={2} style={{
                                color: colors.black, fontSize: DIMENS.txt_size_medium_1,
                                fontFamily: FONT_FAMILIY.Roboto_Medium, marginRight: DIMENS.px_5
                            }}>
                                {item.name}</Text>
                            {
                                item.orderStatus &&
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: DIMENS.px_10, marginRight: DIMENS.px_10, marginLeft: -2 }}>
                                    <Image source={GREENCIRCLE} style={{ width: 12, height: 12, marginRight: DIMENS.px_5, tintColor: item.status == 'delivered' ? colors.green : 'red' }} resizeMode={'contain'} />
                                    <Text style={{ color: colors.lightGrayClr, fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                                        {Utils.orderStatusOrder(item.orderStatus)}</Text>

                                </View>
                              
                            }
                             {
                                 orderStatusObj!=undefined&&orderStatusObj.current_status_body&&
                              <Text style={{marginLeft:15, color: colors.lightGrayClr, fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                                {orderStatusObj.current_status_body}</Text>
                            }
                            

                            {/* {
                                item[APP_PARAMS.DELIVERY_TIME] != undefined &&
                                <View style={{ marginTop: DIMENS.px_5 }}>
                                    <Text style={{
                                        color: colors.black,
                                        fontSize: DIMENS.txt_size_medium,
                                        fontFamily: FONT_FAMILIY.Roboto_Regular,
                                    }}> {translate('DELIVER_BY')}</Text>

                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                            <Text style={{
                                                color: colors.black,
                                                fontSize: DIMENS.txt_size_medium,
                                                fontFamily: FONT_FAMILIY.Roboto_Regular,
                                                fontWeight: '500', textAlign: 'left'
                                            }}> {Utils.getTimeFromTimeStamp(item[APP_PARAMS.DELIVERY_TIME], 'DD MMM, dddd')}</Text>
                                            {
                                                item[APP_PARAMS.SHIPPING_CHARGE] != undefined &&

                                                <Text style={{
                                                    color: colors.green,
                                                    fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular,
                                                    marginRight: DIMENS.px_5, fontWeight: '500'
                                                }}>{item[APP_PARAMS.SHIPPING_CHARGE] != 0.0 ? `( ${translate('FREE')} )` : item[APP_PARAMS.SHIPPING_CHARGE]}</Text>}



                                        </View>

                                    </View>
                                </View>
                            } */}
                        </View>
                        <View style={{ flex: .3, alignItems: 'flex-end' }}>
                            <CommonImage source={item[APP_PARAMS.IMG_URl] != undefined && item[APP_PARAMS.IMG_URl] != '' ?
                                { uri: item[APP_PARAMS.IMG_URl] } : PLACEHOLDER_PRODUCT_IMG}
                                styles={{ width: WIDTH * 25 / 100, height: 65, }} />

                        </View>
                    </View>



                </View>
            </Ripple>
        );
    }
    renderHeader = () => {
        return (
            <View style={{
                borderBottomColor: colors.lightGraytransparent, borderBottomWidth: DIMENS.px_05, width: '100%',
            }}>
                <Text style={styles.headerTitleOfOrderView}>{translate('ORDER_ITEM_PRODUCT')}</Text>
            </View>
        )
    }
    render() {
        const { loading, data } = this.props
        console.log("order data::---", data);
     

        return (
            <View style={{ flex: 1 }}>
                <CommonNavHeader title={this.isFrom ? translate('SCREEN_CART') : translate('SCREEN_ORDER_SUMMARY')}
                    backPress={() => this.backHandler()} />
                <View style={{ flex: 1 }}>

                    {
                        this.data &&
                        <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
                            <View style={{ marginBottom: 50, paddingHorizontal: 5 }}>
                                {
                                    this.data && this.data[APP_PARAMS.ORDER_NUMBER] &&
                                    <Text style={styles.headerTitleOfOrderView}>{translate('ORDER_ID') + " - " + this.data[APP_PARAMS.ORDER_NUMBER] + ''}</Text>
                                }
                                <View>
                                    <View>
                                        {data && this.state.productDetail && this.renderOrderItem(this.state.productDetail)}
                                        {
                                            //Order Status
                                            this.state.orderStatusData &&
                                            <OrderStatusBar
                                                data={this.state.orderStatusData}
                                                isDetailScrn={true}
                                                orderTrackingClk={() => this.orderTackingClk(this.state.productDetail)} />
                                        }
                                        {
                                            //order cancel
                                             this.state.productDetail&&this.state.productDetail.orderStatus&&(this.state.productDetail.orderStatus!=CONST.ORDER_DELIVERD||this.state.productDetail.orderStatus!=CONST.ORDER_CANCEL)&&this.state.orderCncelData == undefined&&
                                            <Ripple style={{ width: WIDTH, marginLeft: -5, borderTopWidth:DIMENS.px_05, borderColor: colors.lightGray,borderBottomWidth:DIMENS.px_1 }}//backgroundColor: colors.lightGray
                                                onPress={() => this.props.navigation.navigate(SCREENS.CANCEL_ORDER, { productDetail: this.state.productDetail, [CONST.IS_FROM]: CONST.CANCEL_ORDER, goBackDataReturn: (data,isFrom) => this.goBackDataReturn(data,isFrom) })} >
                                                <Text style={[styles.headerTitleOfOrderView, { fontWeight: 'bold', marginLeft: DIMENS.px_10,color:colors.primary }]}>{this.state.orderCncelData == undefined && translate('APPLY_FOR_CNACEL')}</Text>
                                            </Ripple>
                                        }
                                        {
                                            //order refund
                                             this.state.productDetail&&this.state.productDetail.orderStatus&&this.state.productDetail.orderStatus==CONST.ORDER_DELIVERD&&
                                            <>
                                                <Ripple style={{ width: WIDTH, marginLeft: -5, flexDirection: 'row', alignItems: 'center' }}
                                                    onPress={() => this.props.navigation.navigate(SCREENS.CANCEL_ORDER, { productDetail: this.state.productDetail, [CONST.IS_FROM]: CONST.RETURN_ORDER, goBackDataReturn: (data,isFrom) => this.goBackDataReturn(data,isFrom) })} >
                                                    <Text style={[styles.headerTitleOfOrderView, { fontWeight: 'bold', marginLeft: DIMENS.px_10, fontSize: DIMENS.txt_size_medium_14, color: colors.primary, paddingRight: 5 }]}>
                                                        {translate('APPLY_FOR_RETURN')}</Text>
                                                    <Image source={NEXT_GRAY} style={{ marginLeft: DIMENS.px_10, width: DIMENS.px_8, resizeMode: 'contain', tintColor: colors.primary }} />

                                                </Ripple>

                                                <Ripple style={{ width: WIDTH, marginLeft: -5, borderTopWidth: .5, borderColor: colors.lightGray, borderBottomWidth: .5, flexDirection: 'row', alignItems: 'center' }}
                                                    onPress={() => this.props.navigation.navigate(SCREENS.CANCEL_ORDER, { productDetail: this.state.productDetail, [CONST.IS_FROM]: CONST.REPLACE_ORDER, goBackDataReturn: (data,isFrom) => this.goBackDataReturn(data,isFrom) })} >
                                                    <Text style={[styles.headerTitleOfOrderView, { fontWeight: 'bold', marginLeft: DIMENS.px_10, fontSize: DIMENS.txt_size_medium_14, color: colors.primary, paddingRight: 0 }]}>
                                                        {translate('APPLY_FOR_REPLACE')}</Text>
                                                    <Image source={NEXT_GRAY} style={{ marginLeft: DIMENS.px_10, width: DIMENS.px_8, resizeMode: 'contain', tintColor: colors.primary }} />

                                                </Ripple>
                                            </>
                                        }
                                        {
                                            //order refund
                                            this.state.productDetail  && this.state.orderCncelData != undefined && //this.state.productDetail.orderStatus && this.state.productDetail.orderStatus == CONST.ORDER_CANCEL || this.state.productDetail.orderStatus == CONST.ORDER_RETURN&&
                                            <>
                                           { this.state.orderCncelData.refundId!=undefined&&this.state.orderCncelData.refundId!="null"&&
                                                <View style={{ width: WIDTH, marginLeft: -5, borderbottWidth: 0.5, borderColor: colors.lightGray, borderBottomWidth: 0.5 }} >
                                                    <Text style={[styles.headerTitleOfOrderView, { marginLeft: DIMENS.px_10, color: colors }]}>
                                                        {`${translate('REFUND_ID')}: ${this.state.orderCncelData.refundId}`}</Text>
                                                </View>}
                                                {/* { this.state.productDetail.trackingId!=undefined&&this.state.productDetail.trackingId!="null"&&
                                                <View style={{ width: WIDTH, marginLeft: -5, borderbottWidth: 0.5, borderColor: colors.lightGray, borderBottomWidth: 0.5 }} >
                                                    <Text style={[styles.headerTitleOfOrderView, { marginLeft: DIMENS.px_10, color: colors }]}>
                                                        {`${translate('TRACKING_ID')}: ${this.state.productDetail.trackingId}`}</Text>
                                                </View>} */}
                                                <View style={{ marginHorizontal: DIMENS.px_15, paddingVertical: DIMENS.px_10, borderColor: colors.lightGray, borderBottomWidth: 0.5 }}>
                                                    <Text style={{ color: colors.primary, fontFamily: FONT_FAMILIY.Roboto_Medium, fontSize: DIMENS.txt_size_medium_14 }}>
                                                        {translate('REFUND_IN_PROCESS')}
                                                    </Text>
                                                    <Text style={{ color: colors.grayClrForTxt, fontFamily: FONT_FAMILIY.Roboto_Regular, fontSize: DIMENS.txt_size_medium }}>
                                                        {this.state.orderCncelData != undefined && this.state.orderCncelData.refundedAmount + ' ' + this.state.orderCncelData.refundSuccessMsg}
                                                    </Text>
                                                </View>

                                            </>
                                        }
                                        {
                                            //Ratting
                                            this.state.productDetail&&this.state.productDetail.orderStatus&&
                                            this.state.productDetail.orderStatus==CONST.ORDER_DELIVERD||
                                            this.state.productDetail.orderStatus==CONST.ORDER_RETURN&&
                                            this.renderRatingView()
                                        }


                                        {this.state.shippingAddress && this.renderAddress(this.state.shippingAddress)}

                                        {
                                            //Other Product 
                                            this.state.productArrData && this.state.productArrData.length > 0 &&
                                            <FlatList
                                                showsVerticalScrollIndicator={false}
                                                data={this.state.productArrData}//{this.state.orderDetailArr}
                                                renderItem={({ item, index }) => this.renderOtherOrderItem(item, index)}
                                                extraData={this.state}
                                                keyExtractor={(item, index) => index.toString()}
                                                ListHeaderComponent={() => this.renderHeader()} />
                                        }

                                    </View>
                                </View>
                                <View>
                                    {
                                        <CommonBillingView
                                            priceDetailTxtProps={styles.headerTitleOfOrderView}
                                            data={this.state.billingData}
                                            orderSummary={true}
                                        // sellingPrice={2323}
                                        // extraPrice={2323}
                                        // specialPrice={2323}
                                        // dataOfferArr={this.state.offerArr != undefined && this.state.offerArr.length > 0 && this.state.offerArr}
                                        // offer={this.state.offerArr != undefined && this.state.offerArr.length > 0 && this.state.offerArr.length + ' Offer Available'}
                                        // price={9999}
                                        // deliveryType={translate('FREE')}
                                        // amountPrice={9999} 
                                        />
                                        //  price={9999}
                                        //  sellingPrice={2323}
                                        //  extraPrice={2323}
                                        //  specialPrice={2323}
                                        //  dataOfferArr={this.state.offerArr!=undefined&&this.state.offerArr.length>0 &&this.state.offerArr}
                                        //  offer ={this.state.offerArr!=undefined&&this.state.offerArr.length>0 &&this.state.offerArr.length +' Offer Available'}
                                        //  amountPrice={9999} />
                                        // translate(PAYMENT_MODE)
                                    }

                                </View>
                                {
                                    this.state.paymentMode &&
                                    <View style={{ padding: DIMENS.px_10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text>{'Payment Mode'}</Text>
                                        <Text>{(this.state.paymentMode)}</Text>
                                    </View>
                                }
                            </View>
                        </ScrollView>}

                </View>
                {
                    loading &&
                    <Loader loading={loading} />
                }

            </View>

        )
    }
}
