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
import { NOTIFICATION, HEART, SEARCH, ORDER, DELETE, PLACEHOLDER_PRODUCT, NEXT } from '../../images'
import HeaderButton from '../HeaderButton'
import CommonHeaderHome from '../../common/CommonHeaderHome'
import translate from '../../i18n/i18n';
import CommonSearch from '../../common/CommonSearch';
import ImageSlider from 'react-native-image-slider';
import { DIMENS, FONT_FAMILIY, WIDTH, HEIGHT, KEY, APP_PARAMS, SCREENS, CONST } from '../../constants';
import CommonButton from '../../common/CommonButton';
import CommonProductRow, { CommonHorizontailList } from '../../common/CommonProductRow';
import Basecomponents from '../../common/BaseComponent';
import CommonNavHeader from '../../common/CommonNavHeader';
import CompareSortFiltr from '../../common/CompareSortFiltr';
import CommonProductList from '../../common/CommonProductList';
import { CommonEmptyView } from '../../common/CommonEmptyView';
import CommonDialog from '../../common/CommonDialog';
import NavigationService from '../../NavigationService';
import Loader from '../../common/Loader';
import * as Toast from '../../utility/Toast';

export default class Wishlist extends Basecomponents {
    constructor(props) {
        super(props)
        this.comeFromLoginLtsner = DeviceEventEmitter.addListener(KEY.COME_BACK_FROM_LOGIN,this.goBackLogin)
        this.comeFromCategyLtsner = DeviceEventEmitter.addListener(KEY.COME_BACK_FROM_CATEGORY,this.comefromCategory)
        this.item=undefined;
        this.index=undefined;
        this.dataOfProduct = this.props.navigation.state.params&&this.props.navigation.state.params[CONST.DATA]
        this.state = {
            productListArr: undefined,
            deleteDialogShow: false,
            delQuantity: undefined,
        }
    }
    componentDidMount() {
        
       // this.props.clearWishData()
        this.wishListData()
    }

    componentWillUnmount(){
        this.comeFromLoginLtsner.remove()
        this.comeFromCategyLtsner.remove()
    }
    comefromCategory=()=>{
        this.wishListData()
    }

    wishListData=()=>{
      
        if (global[KEY.USER_DATA] != undefined && global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID] != undefined) {
            this.props.wishListAPI({[APP_PARAMS.CUSTOMER_ID]:global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID]}).then(result => {
                if (result) {
                    if (result.hasOwnProperty(APP_PARAMS.SUCCESS) && result[APP_PARAMS.SUCCESS]) {
                        if (result.hasOwnProperty(APP_PARAMS.RES_PKT)) {
                            if (result[APP_PARAMS.RES_PKT]&&result[APP_PARAMS.RES_PKT][APP_PARAMS.PRODUCTS]&&result[APP_PARAMS.RES_PKT][APP_PARAMS.PRODUCTS].length > 0)
                                this.setState({ productListArr: result[APP_PARAMS.RES_PKT][APP_PARAMS.PRODUCTS] })
                        }
                    } else if (result[APP_PARAMS.MESSAGE]) {
                        Toast.showErrorToast([APP_PARAMS.MESSAGE])
                    }
                } else {
                    Toast.showErrorToast(translate('MESSAGE_SERVER_ERROR'))
                }
            })
        }
    }

    //Action

    deletePress = (item, index) => {
        if(item!=undefined && index!=undefined)
        this.deleteWishListItem(item,index);
    }
    //APi
    deleteWishListItem = (item,index) => {
        let data = {
            [APP_PARAMS.CUSTOMER_ID]: global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID],
            [APP_PARAMS.PRODUCT_ID]: item[APP_PARAMS.U_UID],
            [APP_PARAMS.PRODUCT_VARIANTS]:item[APP_PARAMS.PRODUCT_VARIANT_ID]!=undefined?{[APP_PARAMS.PRODUCT_VARIANT_ID]:item[APP_PARAMS.PRODUCT_VARIANT_ID]}:undefined

        }
        
        this.props.removeProductInWishListAPI(data).then(result => {
            if (result) {
                if (result.hasOwnProperty(APP_PARAMS.SUCCESS) && result[APP_PARAMS.SUCCESS] && 
                result.hasOwnProperty(APP_PARAMS.DATA)) {
                    let status = result[APP_PARAMS.DATA]
                 
                    if (!status) {
                        let list = this.state.productListArr
                        list.splice(index, 1)
                        this.setState({ productListArr: [...list] })
                        global[KEY.WISH_COUNT] = global[KEY.WISH_COUNT] - 1
                        // if(this.dataOfProduct&&this.dataOfProduct[APP_PARAMS.U_UID]=== item[APP_PARAMS.U_UID]){
                        //     //alert('same id')
                        //      //this.props.dataUpdateInProductDetail({[APP_PARAMS.CART]:false})
                        //      this.props.dataUpdateInProductDetail({data:{[APP_PARAMS.WISH]:false}})
                        //   }
                        if(this.dataOfProduct&&this.dataOfProduct[APP_PARAMS.U_UID]=== item[APP_PARAMS.U_UID]){
                 
                            if(this.dataOfProduct[APP_PARAMS.PRODUCT_VARIENT_ID_LIST].some(obj=>obj===item[APP_PARAMS.PRODUCT_VARIANT_ID])){
                                this.props.dataUpdateInProductDetail({ data:{[APP_PARAMS.PRODUCT_VARIENT_ID_LIST]:item[APP_PARAMS.PRODUCT_VARIENT_ID_LIST],[APP_PARAMS.WISH]:false}})
            
                              }else if(item[APP_PARAMS.PRODUCT_VARIANT_ID]){
                                this.props.dataUpdateInProductDetail({ data:{
                                    [APP_PARAMS.PRODUCT_VARIENT_ID_LIST]:item[APP_PARAMS.PRODUCT_VARIENT_ID_LIST],
                                    [APP_PARAMS.PRODUCT_VARIENT_WISH]:false}
                            })
            
                              } else{
                                 this.props.dataUpdateInProductDetail({data:{[APP_PARAMS.WISH]:false}})
            
                              }
            
                          }
                    }
                    result[APP_PARAMS.MESSAGE] &&
                        Toast.showErrorToast(result[APP_PARAMS.MESSAGE])
                } else {
                    Toast.showErrorToast(translate('MESSAGE_SERVER_ERROR'))
                }
            } else {
                Toast.showErrorToast(translate('MESSAGE_SERVER_ERROR'))
            }
        })
    }
    clearWishData=()=>{
        this.props.clearWishData({[APP_PARAMS.CUSTOMER_ID]: global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID]}).then(result => {
            if (result) {
                if (result.hasOwnProperty(APP_PARAMS.SUCCESS) && result[APP_PARAMS.SUCCESS]) {
                    let status =  result[APP_PARAMS.SUCCESS]
                    try {
                        if (status) {
                            global[KEY.WISH_COUNT] = 0

                            this.state.productListArr.forEach(element => {
                                if(this.dataOfProduct&&this.dataOfProduct[APP_PARAMS.U_UID]=== element[APP_PARAMS.U_UID]){
                                    //alert('same id')
                                     this.props.dataUpdateInProductDetail({[APP_PARAMS.CART]:false})
                                }
                            });
                           
                            this.setState({ productListArr: undefined })
                        }
                        result[APP_PARAMS.MESSAGE] &&
                            Toast.showErrorToast(result[APP_PARAMS.MESSAGE])
                    } catch (error) {
                        // alert("error"+error)
                    }
                   
                } else {
                    Toast.showErrorToast(translate('MESSAGE_SERVER_ERROR'))
                }
            } else {
                Toast.showErrorToast(translate('MESSAGE_SERVER_ERROR'))
            }
        })
    }
    goBackLogin=()=>{
       this.wishListData()
    }
    goToLogin=()=>{
        this.props.changeIsFromCall({ [APP_PARAMS.PAGE_TYPE]: SCREENS.WISHLIST })
        this.props.navigation.navigate('Login_As_GUEST',{goBackLogin:()=>this.goBackLogin()})
    }
    cartBtnClk=()=>{
        this.props.orderSummaryCallFrom({
          [CONST.IS_FROM]:SCREENS.CART})
        this.props.navigation.navigate(SCREENS.ORDER_SUMMARY)
      }
    //API Response

    // responseAPI = (result, isDelete) => {
    //     let data = {};
    //     if (result) {
    //         if (result.hasOwnProperty(APP_PARAMS.SUCCESS) && result[APP_PARAMS.SUCCESS]) {
    //             if (result.hasOwnProperty(APP_PARAMS.DATA)) {
    //                 data = result[APP_PARAMS.DATA]
    //             }
    //             return data
    //         } else if (result[APP_PARAMS.MESSAGE]) {
    //             Toast.showErrorToast([APP_PARAMS.MESSAGE])
    //         }
    //     } else {
    //         Toast.showErrorToast(translate('MESSAGE_SERVER_ERROR'))
    //     }
    // }

    //RENDER
    renderItem = (item, index) => {
        return (
            <CommonProductList
                //  data={item.data}
                item={item}
                isShowDescriptn={false}
                isDelte={true}
                deletePress={() => {
                    this.item=item;
                    this.index=index;
                    this.setState({ 
                        delQuantity: APP_PARAMS.ONE,
                        deleteDialogShow: true 
                    })
                }}
                onPress={() => this.props.navigation.push(SCREENS.CATEGORY_SUB_DETAIL,{ [APP_PARAMS.DATA]: item })}
            />
        )
    }
    footerWishList = () => {
        return (
            <Ripple style={{ flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'center', padding: DIMENS.px_10, backgroundColor: colors.whiteBackground, bottom: 0 }}
            onPress={() => this.setState({
                                delQuantity: APP_PARAMS.ALL,
                                deleteDialogShow: true 
                })}>
                <Image source={DELETE} style={{ height: 15,tintColor:colors.primary }} />
                <Text style={{
                    color: colors.primary, fontFamily: FONT_FAMILIY.Roboto_Medium,
                    fontSize: DIMENS.txt_size_medium_1, marginHorizontal: DIMENS.px_5
                }}>{translate('CLEAR_LIST')}</Text>
            </Ripple>
        )
    }
    render() {
        const { loading, data, deletLoading, deleteData } = this.props
        let loader = undefined
        if (loading) {
            loader = loading
        }
        if (deletLoading) {
            loader = deletLoading
        }
        
        return (
            <View style={{
                backgroundColor: colors.white,
                flex: 1, width: '100%'
            }}>
                <CommonNavHeader title={translate('SCREEN_WISHLIST')}
                    rightIcon={SEARCH}
                    rightIcon2={ORDER}
                    cartCount= {global[KEY.CART_COUNT]}
                    searchPress={() => this.props.navigation.navigate('SearchComponent')}
                    backPress={() => this.props.navigation.goBack()} 
                    cartPress={() => this.cartBtnClk()}/>
               
                
                 <View style={{flex:1}}>
                {
                    !loader && (this.state.productListArr == undefined||this.state.productListArr.length == 0) ?
                        <CommonEmptyView
                        image={PLACEHOLDER_PRODUCT}
                        title={global[KEY.USER_DATA] == undefined ? translate('TITLE_MISSING_WISH') : translate('TITLE_EMPTY_WISH')}
                        subtitle={global[KEY.USER_DATA] == undefined ? translate('SUB_TITLE_LOGIN_MISING') : translate('SUB_TITLE_EMPTY_WISH')}
                        btntext1={global[KEY.USER_DATA] == undefined  ? translate('LOGIN') : undefined}
                        onPress1={() => this.goToLogin()}
                        btntext2={translate('CONTINUE_SHOPING')}
                        onPress2={() => NavigationService.clearStack('Drawer')}
                        btntextImg2={NEXT} /> 
                            :
                        <View style={{ flex: 1 }}>
                            {
                                this.state.productListArr != undefined && this.state.productListArr.length > 0 &&
                                <View style={{ flex: 1 }}>
                                    <FlatList
                                        showsVerticalScrollIndicator={false}
                                        data={this.state.productListArr}
                                        renderItem={({ item, index }) => this.renderItem(item, index)}
                                        extraData={this.state}
                                        keyExtractor={(item, index) => index.toString()}
                                    />
                                    {
                                        this.footerWishList()
                                    }
                                </View>

                            }
                        </View>
                }
                </View>
                
                <CommonDialog
                    modalVisible={this.state.deleteDialogShow}
                    subtitle={this.state.delQuantity!=undefined && (this.state.delQuantity==APP_PARAMS.ONE ?
                         translate('DELETE_ITEM_HINT') : translate('DELETE_ALL_ITEMS_HINT') )}
                    okPressed={() => {
                        this.setState({ deleteDialogShow: false });
                        this.state.delQuantity!=undefined && (this.state.delQuantity==APP_PARAMS.ONE ?
                        this.deletePress(this.item, this.index) : this.clearWishData())
                        }}
                    cancelPressed={() => this.setState({ deleteDialogShow: false })}
                />
                 { loader  &&
                    <Loader loader={true} />
                }
            </View>
        )
    }
}

