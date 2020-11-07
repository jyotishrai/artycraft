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
import { NOTIFICATION, HEART, SEARCH, ORDER, PLACEHOLDER_PRODUCT, NEXT } from '../../images'
import HeaderButton from '../HeaderButton'
import translate from '../../i18n/i18n';
import { DIMENS, FONT_FAMILIY, WIDTH, HEIGHT, CURRENCY, KEY, SCREENS, APP_PARAMS, CONST } from '../../constants';
import Basecomponents from '../../common/BaseComponent';
import CommonNavHeader from '../../common/CommonNavHeader';
import { CommonBillingView, CommonMyOrder } from '../../common/CommonProductRow';
import Loader from '../../common/Loader';
import { CommonEmptyView } from '../../common/CommonEmptyView';
import { SectionList } from 'react-native';
import NavigationService from '../../NavigationService';
import {showInfoToast} from '../../utility/Toast'

const END = 5
export default class MyOrder extends Basecomponents {
    constructor(props) {
        super(props)
        this.start  = 0;
        this.end  = END;
        this.productSize=undefined;
        this.comeFromLoginLtsner = DeviceEventEmitter.addListener(KEY.COME_BACK_FROM_LOGIN,this.goBackLogin)
        this.focusMyOrderListener = this.props.navigation.addListener('didFocus', this.onDidFoucs);

        this.state = {
            orderDetailArr: [
                {
                    uri: require('../../assets/images/phone.png'), name: 'Realme 3i(Diamond Black, 4GB RAM,32GB Storage',
                    status: 'delivered', orderStatus: 'Delivey expected by Saturday,Dec 08'
                },
                {
                    uri: require('../../assets/images/phone.png'), name: 'Realme 3i(Diamond Black, 4GB RAM,32GB Storage',
                    status: 'cancel', orderStatus: 'Delivey expected by Saturday,Dec 08'
                },
                {
                    uri: require('../../assets/images/phone.png'), name: 'Realme 3i(Diamond Black, 4GB RAM,32GB Storage',
                    status: 'delivered', orderStatus: 'Delivey expected by Saturday'
                }],
                orderData:undefined,
                cartCount:global[KEY.CART_COUNT],
                stateFlag:false
        }
    }
    onDidFoucs=()=>{
        this.setState({stateFlag:!this.state.stateFlag})
       // this.orderDetailAPiCall()
    }
    componentDidMount() {
        this.orderDetailAPiCall()
    }
    componentWillUnmount(){
        this.comeFromLoginLtsner.remove()
        this.props.clearMyOrderData()
    }
  
    goBackLogin=()=>{
     this.orderDetailAPiCall()
    }

    orderDetailAPiCall=(isPagination)=>{


        if( global[KEY.USER_DATA]){
            let data = {
                [APP_PARAMS.USER_ID]: global[KEY.USER_DATA]&&global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID],
                [APP_PARAMS.START]:this.start,
                [APP_PARAMS.END]:this.end,
            }
            if(isPagination)
            this.props.myOrderHistoryApiReqOnPagination(data,true).then(result=>{
                this.responseOfAPI(result,isPagination)
            })
            else{
            this.props.orderHistoryAPi(data).then(result => {
                console.log("result::--My Order",JSON.stringify(result));
                 this.responseOfAPI(result)
                console.log("data::--",JSON.stringify(data));  
              })
            }
        }
    }
    //Response API
    responseOfAPI = (result,isPagination) => {
      
        if (result) {
          if (result.hasOwnProperty(APP_PARAMS.SUCCESS) && result[APP_PARAMS.SUCCESS]) {
            if (result.hasOwnProperty(APP_PARAMS.DATA)) {
                try {
                    if(result[APP_PARAMS.DATA][APP_PARAMS.ORDER_LIST]){
                        let data = this.props.data.data[APP_PARAMS.ORDER_LIST]//result[APP_PARAMS.DATA][APP_PARAMS.ORDER_LIST]
                        this.productSize = result[APP_PARAMS.DATA][APP_PARAMS.LSIT_SIZE] 

                        console.warn("tempData::--newData::--",JSON.stringify(this.props.data),"product size:::--",this.productSize);
                        // if(isPagination){
                        //     try {
                        //         let dataTemp = this.state.orderData
                        //         let newData = [...dataTemp, ...result[APP_PARAMS.DATA][APP_PARAMS.ORDER_LIST]]
                        //         console.warn("newData::--newData",JSON.stringify(newData));
                        //       if(newData) 
                        //       data =  [...newData]
                        //     } catch (error) {
                        //       console.warn("newData::--error::--",error);
                        //     }
                           
                        // }
                        // let tempdata = {...data}
                       this.setState({ orderData:data ,stateFlag:!this.state.stateFlag})  
                    }
                   
                } catch (error) {
                    console.warn("error::--error::--",JSON.stringify(error));  
                }
                
            }
          } else if (result[APP_PARAMS.MESSAGE]) {
            showInfoToast(result[APP_PARAMS.MESSAGE])
          }
        } else {
          showInfoToast(translate('MESSAGE_SERVER_ERROR'))
        }
      }

    //ACTION
    goToLogin=()=>{
        this.props.changeIsFromCall({ [APP_PARAMS.PAGE_TYPE]: SCREENS.MY_ORDER })
        this.props.navigation.navigate('Login_As_GUEST',{goBackLogin:()=>this.goBackLogin()})
    }

    cartBtnClk=()=>{
        this.props.orderSummaryCallFrom({ [CONST.IS_FROM]:SCREENS.CART })
        this.props.navigation.navigate(SCREENS.ORDER_SUMMARY)
      }
  
    orderDetailClk=(item,index,selctItem)=>{
        
        this.props.navigation.navigate(SCREENS.ORDER_DETAIL,{[APP_PARAMS.PRODUCT_ID]:selctItem.productId,
            [APP_PARAMS.ORDER_ID]:item[APP_PARAMS.ORDER_ID]})
    }
    reachEndOftblView = (productLength) => {
      if(this.end<this.productSize){
            this.start = this.start + END
            let endIndx = END
            if(this.productSize-this.start<END){
                // alert("come:-"+this.productSize+'start'+this.start)
                endIndx = this.productSize-this.start
            }
            this.end = this.end + endIndx

           if(this.productSize-this.start != 0){
            this.orderDetailAPiCall(true)
           }
        }
        // let data = {
        //     [APP_PARAMS.USER_ID]: global[KEY.USER_DATA]&&global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID],
        //     [APP_PARAMS.START]:this.start,
        //     [APP_PARAMS.END]:this.end,
        // }
        
      //  this.props.orderHistoryAPi(data)

        // if (this.productSize > productLength) {
        //   if (this.productSize > this.end) {
        //     this.start = this.start + END
        //     this.end = this.end + END
    
        //     if (this.isFrom == undefined && isFrom == 'DealsAndOff') {
        //       dealsOffUpToAPI(this.start)
        //     } else {
        //       this.categoryDetailAPI(this.start, "popularity", true)
        //     }
        //   }
        // }
      }

    renderItem = (item, index,section) => {
        return (
            <CommonMyOrder
                onPress={() => this.props.navigation.navigate(SCREENS.ORDER_DETAIL)}
                itemData={item}
                onPress={(selctItem,slctIndx) =>this.orderDetailClk(item,slctIndx,selctItem)}
            />
        )
    }
    renderHeaderItem = (section) => {
        return (
            <View style={{  backgroundColor: colors.primary, padding: DIMENS.px_10, marginBottom: 10 }}
                >
                <Text style={{ color: colors.white, fontSize: DIMENS.px_12, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                    {section[APP_PARAMS.ORDER_NUMBER]}</Text>
            </View>
        )
    }
    footerView=()=>{
        return(
            <View>
                {
                   this.props.isLoadMore &&
                   <ActivityIndicator color={colors.primary} size={35} style={{ padding: 10 }} /> 
                }
            </View>
        )
    }
    render() {
        const { loading, data,isLoadMore } = this.props
        console.warn('tempData::--myorder data::--', data);
        let orderData = data && data.data[APP_PARAMS.ORDER_LIST]

        //const {orderData} = this.props

        console.warn("order data:---",JSON.stringify(orderData));
        
        return (
            <View style={{ flex: 1 }}>
                <CommonNavHeader title={translate('SCREEN_MY_ORDER')}
                    rightIcon={SEARCH}
                    rightIcon2={ORDER}
                    cartCount={this.state.cartCount}

                    cartPress={() => this.cartBtnClk() }

                    searchPress={() => this.props.navigation.navigate('SearchComponent')}
                    backPress={() => this.props.navigation.goBack()} />
                {
                    !loading ?
                        (
                            global[KEY.USER_DATA] && orderData && orderData.length > 0 ?
                                <View style={{ flex: 1 }}>
                                <FlatList
                                showsVerticalScrollIndicator={false}
                                data={orderData}//{this.state.orderDetailArr}
                                renderItem={({ item, index }) => this.renderItem(item, index)}
                                extraData={this.state}
                                keyExtractor={(item, index) => index.toString()}
                                onEndReachedThreshold={0.5}
                                onEndReached={() => this.reachEndOftblView(orderData.length)}
                                ListFooterComponent={() => this.footerView()}
                            />
                                </View> :
                                <View style={{ flex: 1 }}>
                                    <CommonEmptyView
                                        image={PLACEHOLDER_PRODUCT}
                                        title={ global[KEY.USER_DATA] != undefined && global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID] != undefined ?
                                            translate('TITLE_NOT_PURCHED_ANY'): translate('TITLE_MISSING_ORDERED_ITEMS')}
                                        subtitle={ global[KEY.USER_DATA] != undefined && global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID] != undefined ?
                                            translate('SUB_TITLE_NOT_PURCHED_ANY') : translate('SUB_TITLE_MISSING_ORDERED_ITEMS')}
                                        btntext1={global[KEY.USER_DATA] != undefined && global[KEY.USER_DATA] != undefined && global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID] != undefined ? undefined : translate('LOGIN')}
                                        onPress1={() => this.goToLogin()}
                                        btntext2={translate('CONTINUE_SHOPING')}
                                        onPress2={() => NavigationService.clearStack('Drawer')}
                                        btntextImg2={NEXT}
                                    />
                                </View>
                        ) :

                        <Loader loading={loading} />
                }
            </View>
        )
    }
}