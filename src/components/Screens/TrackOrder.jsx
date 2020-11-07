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
import { DIMENS, FONT_FAMILIY, WIDTH, HEIGHT, CURRENCY, APP_PARAMS, SCREENS } from '../../constants';
import Basecomponents from '../../common/BaseComponent';
import CommonNavHeader from '../../common/CommonNavHeader';
import { CommonBillingView } from '../../common/CommonProductRow';
import CommonOrderSummaryProduct from '../../common/CommonOrderSummaryProduct';
import CommonDropDown from '../../common/CommonDropDown';
import { CommonEmptyView } from '../../common/CommonEmptyView';
import StepIndicator from 'react-native-step-indicator';
import CustomStepIndicator from '../../common/CustomStepIndicator';
import { OrderStatusBar } from '../../common/OrderStatusBar';
import * as Utils from '../../utility/Utils'





export default class TrackOrder extends Basecomponents {

    constructor(props) {
        super(props);
        
       
    }
    // componentDidMount = () => {
    //     console.log("datta::--", this.props.data);
    // }

    // renderOrderStatus = (item) => {

    //     return (
    //         item.map((elt, index) => {
    //             return (
    //                 <View>
    //                     <Text>{elt.title}</Text>
    //                     {
    //                         index != 0 &&
    //                         <Text>{elt.body}</Text>
    //                     }
    //                 </View>

    //             )
    //         })
    //     );
    // }

    render() {
        const { loading, data } = this.props
        
        return (
            <View style={{ flex: 1 }}>
                <CommonNavHeader backPress={() => this.props.navigation.goBack()} />

             {data && 
             <View style={{flex:1}}>
              {
                data.status&&
                <View style={{  justifyContent: 'center',marginTop:DIMENS.px_10 }}>
                    
                                <Text style={{
                                    fontSize: DIMENS.txt_size_medium,
                                    fontFamily: FONT_FAMILIY.Roboto_Medium,
                                    marginLeft: DIMENS.px_20,
                                    fontWeight: '600',
                                    color: colors.primary , //marginTop: -DIMENS.px_14,

                                }}>{data.status[APP_PARAMS.CURRENT_STATUS_TYPE]&&Utils.orderStatus(data.status) }</Text>
                                {
                                    data.status.current_status_body &&

                                    <Text style={{
                                        fontSize: DIMENS.txt_size_medium,
                                        fontFamily: FONT_FAMILIY.Roboto_Medium,
                                        marginLeft: DIMENS.px_20,
                                        fontWeight: '500',
                                        color: colors.grayClrForTxt,
                                        marginVertical: DIMENS.px_3,

                                    }}>{data.status.current_status_body&&data.status.current_status_body}</Text>
                                }
                            
                        {
                            data.status.current_status_time!= undefined &&
                            <Text style={{
                                fontSize: DIMENS.txt_size_medium,
                                fontFamily: FONT_FAMILIY.Roboto_Regular,
                                marginRight: DIMENS.px_5,
                                fontWeight: '500',
                                color: colors.grayClrForTxt,
                                marginLeft: DIMENS.px_20,

                            }}>{data.status.current_status_time}</Text>
                        }

                </View>
                }
               <OrderStatusBar
               style= {{marginTop:DIMENS.px_15}}
                    data={data && data[APP_PARAMS.TRACK_ARR]}
                
                />
                </View>
           }
            </View>
        );
    }
}