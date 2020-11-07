import React from 'react'
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text, Image,
  TouchableOpacity,FlatList,
  View, Dimensions, TextInput, DeviceEventEmitter
} from 'react-native'
import Ripple from 'react-native-material-ripple';
import styles from '../Auth/styles'
import { colors } from '../../theme';
import { NOTIFICATION,HEART,SEARCH,ORDER, DELETE } from '../../images'
import HeaderButton from '../HeaderButton'
import CommonHeaderHome from '../../common/CommonHeaderHome'
import translate from '../../i18n/i18n';
import CommonSearch from '../../common/CommonSearch';
import ImageSlider from 'react-native-image-slider';
import { DIMENS, FONT_FAMILIY, WIDTH, HEIGHT, CONST, SCREENS, KEY, APP_PARAMS } from '../../constants';
import  { CommonNotification, CommonMyOrder } from '../../common/CommonProductRow';
import Basecomponents from '../../common/BaseComponent';
import CommonNavHeader from '../../common/CommonNavHeader';
import NavigationService from '../../NavigationService';
import Loader from '../../common/Loader';

export default class Notification extends Basecomponents{
    constructor(props){
        super(props)
        this.state={
            wishCount: global[KEY.WISH_COUNT],
            cartCount:global[KEY.CART_COUNT],
            notificationArr:[
                {uri:require('../../assets/images/phone.png'),orderStatus:'Order Delivered',status1:'Your Package Containg Realme 3si(32 GB)',status2:'Your Package Containg Realme',status3:'Containg Realme 3s(32GB)',time:'10 Hours Ago'},
                {uri:require('../../assets/images/phone.png'),orderStatus:'Order Delivered',status1:'Your Package Containg Realme 3si(32 GB)',status2:'Your Package Containg Realme',status3:'Containg Realme 3s(32GB)',time:'10 Hours Ago'},
                {uri:require('../../assets/images/phone.png'),orderStatus:'Order Delivered',status1:'Your Package Containg Realme 3si(32 GB)',status2:'Your Package Containg Realme',status3:'Containg Realme 3s(32GB)',time:'10 Hours Ago'}
              ]
        }
    }
    componentDidMount(){
      global[KEY.NOTICATION_COUNT] = 0
      DeviceEventEmitter.emit(CONST.NOTYFY_COUNT)

      global[KEY.USER_DATA] != undefined && global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID]&&
      this.props.getNotificationAPi().then(response=>{
        console.log("response::--",response);
      })
    }
    orderDetailClk=(item,index,selctItem)=>{
        console.log("select item:::---",item,"index::--",index,"selctItem::",selctItem);
        
      this.props.navigation.navigate(SCREENS.ORDER_DETAIL,{[APP_PARAMS.PRODUCT_ID]:selctItem.productId,
          [APP_PARAMS.ORDER_ID]:item[APP_PARAMS.ORDER_ID]})
  }
    // renderItem=(item,index)=>{
    //   return(
    //     //   <View/>
    //      <CommonNotification
    //      item={item}
    //        />
    //   )
    // }
    renderItem = (item, index) => {
      console.log("render item:::---",item);

      return (
          <CommonMyOrder
              isFrom={'notification'}
              itemData={item}
              onPress={(selctItem,slctIndx) =>this.orderDetailClk(item,slctIndx,selctItem)}
              onPressNotifictionAdmin={()=>NavigationService.clearStack('Drawer')}
          />
      )
    }
    cartBtnClk=()=>{
      this.props.orderSummaryCallFrom({ [CONST.IS_FROM]:SCREENS.CART })
      this.props.navigation.navigate(SCREENS.ORDER_SUMMARY)
    }
    render(){
      const { loading, data,isLoadMore } = this.props

      let orderData = data && data[APP_PARAMS.RES_PKT]&&data[APP_PARAMS.RES_PKT][APP_PARAMS.NOTIFICATION]

        return(
            <View style={{
                backgroundColor: colors.white,
                flex: 1, width: '100%'
              }}>
                <CommonNavHeader title={translate('SCREEN_NOTIFICATION')}
                   rightIcon1={HEART}
                 //   rightIcon={SEARCH}
                  rightIcon2={ORDER}
                  cartCount={this.state.cartCount}
                  wishCount={this.state.wishCount}
                  cartPress={() => this.cartBtnClk() }
                  rightIcon1Press = {() => this.props.navigation.navigate(SCREENS.WISHLIST)}
                  //searchPress={()=>this.props.navigation.navigate('SearchComponent')}
                  backPress={() => this.props.navigation.goBack()} />
                { 
                orderData&&
                <View style={{flex:1}}>
                    <FlatList
                     showsVerticalScrollIndicator={false}
                     data={orderData}
                     renderItem={({item,index})=>this.renderItem(item,index)}
                     extraData={this.state}
                     keyExtractor={(item,index)=>index.toString()}
                    />
                </View> 
                }
                {
                  loading&&<Loader loader={true}/>
                }
            </View>      
        )
    }
}