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
import { NOTIFICATION, HEART, SEARCH, ORDER, PLACEHOLDER_PRODUCT, PLACEHOLDER_PRODUCT_IMG, NEXT } from '../../images';
import HeaderButton from '../HeaderButton'
import translate from '../../i18n/i18n';
import { DIMENS, FONT_FAMILIY, WIDTH, HEIGHT, CURRENCY, APP_PARAMS, SCREENS, CONST } from '../../constants';
import Basecomponents from '../../common/BaseComponent';
import CommonNavHeader from '../../common/CommonNavHeader';
import { CommonBillingView, CommonInfoProduct, CommonInfoOrderProduct } from '../../common/CommonProductRow';
import CommonOrderSummaryProduct from '../../common/CommonOrderSummaryProduct';
import CommonDropDown from '../../common/CommonDropDown';
import * as Utils from '../../utility/Utils'
import { Dropdown } from 'react-native-material-dropdown';
import CommonButton from '../../common/CommonButton';
import Loader from '../../common/Loader';
import * as Toast from '../../utility/Toast'


export default class CancelOrder extends Basecomponents {

    constructor(props) {
        super(props);
        this.productDetail = this.props.navigation.state.params&& this.props.navigation.state.params.productDetail&&this.props.navigation.state.params.productDetail
        this[CONST.IS_FROM] = this.props.navigation.state.params&& this.props.navigation.state.params[CONST.IS_FROM]&&this.props.navigation.state.params[CONST.IS_FROM]
        this.state = {
            cancelSubject: '',
            cancelComments: '',
        
        }
    }


    componentDidMount = () => {
        // console.log("data order::--", JSON.stringify(this.props.dataOrder[APP_PARAMS.DATA][APP_PARAMS.BEAN_ORDER_PRODUCT]));
     
       let type = undefined
       if(this[CONST.IS_FROM]){
          if(this[CONST.IS_FROM]===CONST.CANCEL_ORDER){
              type = 0
          }else{
            type = 1
          }
          this.props.getCancelOrderList(type)
       }
    }
    updateOrderDetailStore=(response)=>{
        //alert("response"+JSON.stringify(response))
        this.props.navigation.state.params.goBackDataReturn(response.data,this[CONST.IS_FROM]) 
        this.props.navigation.goBack()
    }

    cancelOrderAPI = () => {
        if(this[CONST.IS_FROM] === CONST.CANCEL_ORDER||this[CONST.IS_FROM] === CONST.RETURN_ORDER){
        //    alert('cancel:'+this[CONST.IS_FROM])

            let data = {
                [APP_PARAMS.SUBJECT]: this.state.cancelSubject,
                [APP_PARAMS.COMMENTS]: this.state.cancelComments,
                [APP_PARAMS.RETUEN_OR_EXCHANGE]:this[CONST.IS_FROM]===CONST.CANCEL_ORDER?false:true
                
            }
            let id = this.productDetail&& this.productDetail.orderProductId
            this.props.orderCancelAPI(data,id).then(response=>{
                if (response) {
                    if(response.success){
                        if(response.data){
                            
                            response.data.successMessage&&
                            Toast.showSuccessToast(response.data.successMessage)
                           this.updateOrderDetailStore(response)
                           
                        }
                       
                     
                    }else{
                        response.error&&
                        Toast.showErrorFailToast(response.error)
                    }
                }
                
            })
        }else{
            alert(this[CONST.IS_FROM])
            if ('ordr plce'+this[CONST.IS_FROM] === CONST.REPLACE_ORDER) {
                
            }
            let data = {
                [APP_PARAMS.SUBJECT]: this.state.cancelSubject,
                [APP_PARAMS.COMMENTS]: this.state.cancelComments,
                
            }
            let id = this.productDetail&& this.productDetail.orderProductId
            this.props.orderReturnExchangeAPI(data,id).then(response=>{
                console.log("respnse::--exchange",response);
                if (response) {
                    if(response.success){
                        response.data.successMessage&&
                        Toast.showSuccessToast(response.data.successMessage)
                        this.updateOrderDetailStore(response)
                      
                    }else{
                        response.error&&
                        Toast.showErrorFailToast(response.error)
                    }
                }
                
            })
        }
      
    }
    render() {
         const { loading, data } = this.props
         let pickerdata = undefined
         if(data){
            pickerdata = data.map(item=>{
                return {value:item.subject}
            })

         }
         console.log("this.productDetail::--",this.productDetail);
         
        return (
            <View style={{ flex: 1 }}>
                <CommonNavHeader backPress={() => this.props.navigation.goBack()} />
              <ScrollView contentContainerStyle={{flexGrow:1}}>
                {
                    <CommonInfoOrderProduct
                    data={this.productDetail}
                />
                }
              {
                  
                  data&&pickerdata&&
                <View style={{ flex: 1}}>
                    <View style={{backgroundColor:colors.lightGray}}>
                    <Text style={{ 
                        fontSize: DIMENS.txt_size_medium_14, 
                        fontFamily: FONT_FAMILIY.Roboto_Regular, 
                        color: colors.black,
                        paddingVertical:DIMENS.px_10,
                        paddingHorizontal:DIMENS.px_15 }}>
                        {this[CONST.IS_FROM]===CONST.CANCEL_ORDER?translate('REASON_FOR_CANCELLATION_HEADING'):(this[CONST.IS_FROM]===CONST.RETURN_ORDER?translate('REASON_FOR_CANCELLATION_HEADING_RETURN'):translate('REASON_FOR_CANCELLATION_HEADING_REPLACE'))}
                    </Text>
                    </View>
                    <View style={{paddingHorizontal:DIMENS.px_10}}>
                    {
                   
                    <Dropdown
                    fontSize={DIMENS.txt_size_medium}
                    labelFontSize={DIMENS.txt_size_medium}
                    textColor={colors.grayClrForTxt}
                    label={this[CONST.IS_FROM]===CONST.CANCEL_ORDER?translate('REASON_FOR_CANCELLATION'):(this[CONST.IS_FROM]===CONST.RETURN_ORDER?translate('REASON_FOR_RETURN'):translate('REASON_FOR_REPLACE'))}
                    data={pickerdata}
                    onChangeText={(item) => this.setState({ cancelSubject: item })} 
                    />
                    }
                   
                    <TextInput
                        placeholder={translate('COMMENT') + '....'}
                        multiline={true}
                        style={{
                            fontSize: DIMENS.txt_size_medium,
                            fontFamily: FONT_FAMILIY.Roboto_Regular,
                            color: colors.grayClrForTxt,
                            height: '35%',
                            borderColor: colors.lightGrayText,
                            borderWidth: DIMENS.px_1,
                            marginTop: DIMENS.px_20,
                            textAlignVertical: 'top',
                            backgroundColor:colors.lightGray
                        }}
                        value={this.state.cancelComments}
                        maxLength={100}
                        onChangeText={(txt) => this.setState({ cancelComments: txt })} />

                        <Ripple 
                        disabled={this.state.cancelComments!=''&&this.state.cancelSubject!=''?false:true}
                        onPress={()=>this.cancelOrderAPI()} 
                        style={[styles.submitBtn,{marginHorizontal:0,backgroundColor:this.state.cancelComments!=''&&this.state.cancelSubject!=''?colors.primary:colors.primaryDisabled}]}>
                        <Text style={styles.submitBtnText}>{this[CONST.IS_FROM]===CONST.CANCEL_ORDER? translate('CONFIRM_CANCELLATION'):(this[CONST.IS_FROM]===CONST.RETURN_ORDER?translate('CONFIRM_RETURN'):translate('CONFIRM_REPLACE'))}</Text>
                       </Ripple>

                   </View>
                </View>
    }
     {
                    loading &&
                    <Loader loading={loading} />
                }

</ScrollView>
            </View>
        );
    }
}