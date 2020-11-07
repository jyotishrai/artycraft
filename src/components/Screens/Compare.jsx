import React from 'react'
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text, Image,
    TouchableOpacity, BackHandler,
    View, Dimensions, TextInput, FlatList, SectionList
} from 'react-native'
import Ripple from 'react-native-material-ripple';
import styles from '../Auth/styles'
import { colors } from '../../theme';
import { PLUS, CANCEL, PLACEHOLDER_PRODUCT, NEXT } from '../../images'
import { DIMENS, FONT_FAMILIY, WIDTH, HEIGHT, CURRENCY, APP_PARAMS, KEY, CONST, SCREENS } from '../../constants';
import Basecomponents from '../../common/BaseComponent';
import CommonNavHeader from '../../common/CommonNavHeader';
import translate from '../../i18n/i18n'
import * as Utils from '../../utility/Utils';
import CommonImage from '../../common/CommonImage';
import CommonButton from '../../common/CommonButton';
import { CommonEmptyView } from '../../common/CommonEmptyView';
import NavigationService from '../../NavigationService'

export default class Compare extends Basecomponents {
    constructor(props) {
        super(props)
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.backHandler)
        this.state = {
            compareDataList: [
                //     {uri:require('../../assets/images/phone.png'),name:'Realme 3i(Diamond Blue, 32GB)',
                //     disCountPrice:'7499',price:undefined,data:[ "3GB RAM","32GB ROM",'15.8cm(6.22inch) HD+Display','12MP+2MP Dual Rear Canera',
                //    '13MP Front Camera','Media Tek Helio P60 Octa Core 2.0 GHz Octa Core2 GHz','4230 mAh Battery','Pie 9','Brand Warrenty of 2 Months']},
                //     {uri:require('../../assets/images/phone.png'),name:'Realme 3i(Diamond Blue, 32GB)',
                //     disCountPrice:'7499',price:undefined,data:[ "3GB RAM","32GB ROM",'15.8cm(6.22inch) HD+Display','12MP+2MP Dual Rear Canera',
                //    '13MP Front Camera','Media Tek Helio P60 Octa Core 2.0 GHz Octa Core2 GHz','4230 mAh Battery','Pie 9','Brand Warrenty of 2 Months']},
                //    {uri:require('../../assets/images/phone.png'),name:'Realme 3i(Diamond Blue, 32GB)',
                //    disCountPrice:'7499',price:undefined,data:[ "3GB RAM","32GB ROM",'15.8cm(6.22inch) HD+Display','12MP+2MP Dual Rear Canera',
                //   '13MP Front Camera','Media Tek Helio P60 Octa Core 2.0 GHz Octa Core2 GHz','4230 mAh Battery','Pie 9','Brand Warrenty of 2 Months']},
            ],
            isAddedCart: false,
            numCount: 0,
            localLoading: false
        }
    }

    componentDidMount() {
        this.compareData();
    }
    componentWillUnmount = () => {
        this.backHandler.remove()
    }

    compareData = () => {
        let data = {
            [APP_PARAMS.PRODUCT_ID_LIST]: this.props.navigation.state.params && this.props.navigation.state.params[APP_PARAMS.PRODUCT_ID_LIST]
                ? this.props.navigation.state.params[APP_PARAMS.PRODUCT_ID_LIST] : "",
            [APP_PARAMS.CUSTOMER_ID]: global[KEY.USER_DATA] != undefined && global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID] != undefined && global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID] != null
                ? global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID] : "",
            [APP_PARAMS.REQ_ID]: Utils.getRequestId()
        }
        this.props.getCompareProductListAPI(data).then(result => {
            let data = this.responseOfApi(result);
            if (data && data[APP_PARAMS.RES_PKT] && data[APP_PARAMS.RES_PKT].length > 0) {
                console.warn('got data ....' + JSON.stringify(data));

                this.setState({ compareDataList: data[APP_PARAMS.RES_PKT], numCount: data[APP_PARAMS.RES_PKT].length })
            }
        })

    }

    responseOfApi = (response) => {
        if (response) {
            let data = {}
            if (response.hasOwnProperty([APP_PARAMS.SUCCESS]) && response[APP_PARAMS.SUCCESS]) {
                if (response.hasOwnProperty(APP_PARAMS.RES_PKT) && response[APP_PARAMS.RES_PKT]) {
                    data[APP_PARAMS.RES_PKT] = response[APP_PARAMS.RES_PKT]
                    console.warn('data in response ::: ' + JSON.stringify(data[APP_PARAMS.RES_PKT]))
                    return data;

                    // this.setState({ compareDataList: response[APP_PARAMS.RES_PKT] })
                }
            }
        }
    }


    deleteSelectedItem = (item, index) => {
        let tempArr = this.state.compareDataList;
        tempArr.splice(index, 1)
        console.warn("tempArr::--",tempArr);
        
        if (tempArr.length == 1) {
            if(tempArr.some(item=>item.isADdProduct===true)){
                tempArr = [];
            }else
            tempArr.push({ isADdProduct: true })
        }
        this.setState({ compareDataList: tempArr }, () => {
            console.log('this.state.compareDataList item::: ', this.state.compareDataList);
        })
    }

    addItemClicked = (item) => {
        this.itemRemaining()
    }
    itemRemaining = () => {
        let idArr = [];
        if (this.state.compareDataList != undefined ) {
            //&& this.state.compareDataList.length > 0
            idArr = this.state.compareDataList.map((elt) => {
                return elt[APP_PARAMS.U_UID]
            })
            this.props.navigation.state.params.goBackCompare(idArr);
            this.props.navigation.goBack();
        }
    }
    backHandler = () => {
        this.itemRemaining()
        return true
    }
    backScrn = () => {
        this.itemRemaining()
    }
    addCart = (item, index) => {
        if (!item[APP_PARAMS.CART]) {
            item[APP_PARAMS.CART] = true
            item['localLoading'] = true
            let tempArr = this.state.compareDataList
            tempArr[index] = item
            this.setState({ compareDataList: [...tempArr] }, () => {
                this.addCartApi(item, index)
            })
        } else {
            this.props.orderSummaryCallFrom({
                [CONST.IS_FROM]: SCREENS.COMPARE, 
                [CONST.DATA]: item
            })
            this.props.navigation.navigate(SCREENS.ORDER_SUMMARY)
        }
    }
    addCartApi = (item, index) => {
        this.setState({ localLoading: true })
        let data = {
            [APP_PARAMS.PRODUCT_ID]: item[APP_PARAMS.U_UID],
            [APP_PARAMS.REQ_ID]: Utils.getRequestId(),
            [APP_PARAMS.CUSTOMER_ID]: global[KEY.USER_DATA] != undefined && global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID] != undefined ? global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID] : ''
        }
        this.props.addCartRemoveCartAPI(data).then(result => {
            console.log("addCart Result:--", JSON.stringify(result));
            let tempArr = this.state.compareDataList
            item['localLoading'] = false
            tempArr[index] = item
            this.setState({ compareDataList: [...tempArr] })

            // let data = this.responseAPI(result)
            // this.cartActive(data)
            // if (data[APP_PARAMS.CART] != undefined&&data[APP_PARAMS.PRODUCTS][APP_PARAMS.CART]!=null) {
            //     global[KEY.CART_COUNT] = global[KEY.CART_COUNT] != undefined ? global[KEY.CART_COUNT] + 1 : 1
            //     this.setState({ cartCount: global[KEY.CART_COUNT] })
            // }

        })
    }
    renderSectionItem = (item, index) => {
        return (
            <View style={{ alignItems: 'center', marginVertical: 5 }}>
                <Text style={{ color: colors.lightGrayText, fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Medium }}>
                    {item}
                </Text>
            </View>
        )
    }
    renderSectionHeader = (section) => {
        return (
            <View style={{ alignItems: 'center' }}>
                <View style={{ alignItems: 'flex-end', flexDirection: 'row' }}>
                    <Ripple>
                        <Image source={CANCEL} />
                    </Ripple>
                    <Image source={require('../../assets/images/phone.png')} style={{ width: WIDTH / 2 - 20, height: 120 }} />
                </View>
                {
                    section.name &&
                    <Text style={{ color: colors.black, fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Medium }}>
                        {section.name}
                    </Text>
                }
                {
                    section.disCountPrice &&
                    <Text style={{ marginVertical: DIMENS.px_3, color: colors.green, fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Medium }}>
                        {CURRENCY.RUPEES + section.disCountPrice}
                    </Text>
                }
                {
                    section.price &&
                    <Text style={{ color: colors.lightGrayText, textDecorationLine: 'line-through', fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Medium }}>
                        {CURRENCY.RUPEES + section.price}
                    </Text>
                }
            </View>
        )
    }

    renderDataList = (item, index, length) => {
        let specProdArrDataa = {};
        let specGroupProdArrDataa = {};
        if (item[APP_PARAMS.PRODUCT_SPECIFIACTION] && Object.entries([APP_PARAMS.PRODUCT_SPECIFIACTION]).length !== 0) {
            specProdArrDataa = Utils.parseSpecData(item[APP_PARAMS.PRODUCT_SPECIFIACTION])
        }
        if (item[APP_PARAMS.PRODUCT_GROUP_SPEC] && Object.entries([APP_PARAMS.PRODUCT_GROUP_SPEC]).length !== 0) {
            specGroupProdArrDataa = Utils.parserObj(item[APP_PARAMS.PRODUCT_GROUP_SPEC])
        }
        return (
            <View style={{
                width: WIDTH / this.state.compareDataList.length,
                alignItems: 'center',
                borderLeftWidth: DIMENS.px_05,
                borderLeftColor: colors.lightGraytransparent,
            }}>
                <View  style={{padding: 15}}>
                {
                    item.isADdProduct != undefined && item.isADdProduct ?

                        <View style={{ padding: 10, alignItems: 'center', justifyContent: 'center', width: WIDTH / 2, }}>
                            <Ripple style={[styles.submitBtn, { padding: DIMENS.px_10 }]} onPress={() => this.addItemClicked(item)} >
                                <Text style={{ color: colors.white, fontSize: DIMENS.txt_size_medium_1, fontFamily: FONT_FAMILIY.Roboto_Medium }}>
                                    {translate('Add_a_Product')}</Text>
                            </Ripple>
                        </View> :
                        <>

                            <View style={{ flexDirection: 'row' }}>
                                <CommonImage source={{ uri: item[APP_PARAMS.IMG_LOC] }} resizeMode={'contain'}
                                    styles={{ width: length == 1 ? WIDTH / 2 - 50 : WIDTH / this.state.compareDataList.length - 50, height: 120 }} />
                                <Ripple style={{ width: 20, height: 20 }} rippleCentered={true}
                                    onPress={() => this.deleteSelectedItem(item, index)} >
                                    <Image source={CANCEL} style={{ right: 0, width: 20, height: 20 }} />
                                </Ripple>
                            </View>
                            <View style={{ borderBottomColor: colors.lightGraytransparent, borderBottomColor: DIMENS.px_05, paddingBottom: DIMENS.px_10 }}>
                                {item.name &&
                                    <Text style={{ textAlign: 'center', color: colors.black, fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Medium, marginTop: DIMENS.px_10 }}>
                                        {item.name}
                                    </Text>}
                                {
                                    item.discountPrice &&
                                    <Text style={{ textAlign: 'center', marginVertical: DIMENS.px_3, color: colors.green, fontSize: DIMENS.txt_size_medium_1, fontFamily: FONT_FAMILIY.Roboto_Medium }}>
                                        {CURRENCY.RUPEES + item.discountPrice}
                                    </Text>
                                }
                                {
                                    item.discountPrice && item.amount != 0 && (item.discount != undefined && item.discount != 0 || item[APP_PARAMS.OFF_IN_PER] != undefined && item[APP_PARAMS.OFF_IN_PER] != 0) &&

                                    <Text style={{ color: colors.lightGrayText, textDecorationLine: 'line-through', fontSize: DIMENS.txt_size_medium_1, fontFamily: FONT_FAMILIY.Roboto_Medium }}>
                                        {CURRENCY.RUPEES + item.amount}
                                    </Text>
                                }
                                <View style={{ borderBottomColor: colors.lightGraytransparent, borderBottomWidth: DIMENS.px_05, marginHorizontal: -15 }} />
                                {
                                    specProdArrDataa && specProdArrDataa.length > 0 &&
                                    specProdArrDataa.map(itemElt => {
                                        return (
                                            <View style={{ alignItems: 'center', marginVertical: 5 }}>
                                                <Text style={{ textAlign: 'center', color: colors.black, opacity: .6, fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                                                    {`${itemElt.data} ${itemElt.title}`}
                                                </Text>
                                            </View>
                                        )
                                    })
                                }
                                {
                                    specGroupProdArrDataa && specGroupProdArrDataa.length > 0 &&
                                    specGroupProdArrDataa.map(itemElt => {
                                        return (
                                            <View style={{ marginVertical: 5 }}>
                                                <Text style={{ textAlign: 'center', color: colors.black, fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                                                    {`${itemElt.title}`}</Text>
                                                {

                                                    itemElt.data.map(dataItem => {
                                                        return (
                                                            <Text style={{ textAlign: 'center', marginTop: DIMENS.px_5, color: colors.black, opacity: .6, fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                                                                {`${dataItem.description} ${dataItem.title}`}
                                                            </Text>)
                                                    })
                                                }
                                            </View>
                                        )
                                    })
                                }
                            </View>
                            {/* <Ripple style={{}} onPress={() => this.addCart(item, index)}>
                                <View style={[{
                                   backgroundColor: colors.primary,
                                   borderTopWidth: 0.3,
                                   borderTopColor: colors.lightGraytransparent , 
                                   borderRadius: DIMENS.px_2,
                                    height:DIMENS.px_40,
                                    justifyContent:'center',
                                    marginHorizontal:-10
                                }]}>
                                    {
                                        item.localLoading ?
                                            <ActivityIndicator color={colors.white} size={'small'} style={{ padding: DIMENS.px_15 }} />
                                            :
                                            <Text style={{ textAlign: 'center', fontSize: DIMENS.txt_size_medium_1, fontFamily: FONT_FAMILIY.Roboto_Medium, color: colors.white }}>
                                                {item[APP_PARAMS.CART] ? translate('GO_TO_BAG') : translate('ADD_CART')}</Text>
                                    }
                                </View>
                            </Ripple> */}
                             <Ripple style={{}} disabled={ item.localLoading?true:false} onPress={() => this.addCart(item, index)}>
              <View style={[{
                 backgroundColor: colors.primary,
                 borderTopWidth: 0.3,
                 borderTopColor: colors.lightGraytransparent , 
                 borderRadius: DIMENS.px_2,
                  height:DIMENS.px_40,
                  justifyContent:'center',
                  width:WIDTH / this.state.compareDataList.length-10
              }]}>
                  {
                      item.localLoading ?
                          <ActivityIndicator color={colors.white} size={'small'} style={{ padding: DIMENS.px_15 }} />
                          :

                          <Text style={{ textAlign: 'center', fontSize: DIMENS.txt_size_medium_1, fontFamily: FONT_FAMILIY.Roboto_Medium, color: colors.white }}>
                              {item[APP_PARAMS.CART] ? translate('GO_TO_BAG') : translate('ADD_CART')}</Text>
                  }
              </View>
          </Ripple>

                        </>}
            
            </View>
              {/* <Ripple style={{}} disabled={ item.localLoading?true:false} onPress={() => this.addCart(item, index)}>
              <View style={[{
                 backgroundColor: colors.primary,
                 borderTopWidth: 0.3,
                 borderTopColor: colors.lightGraytransparent , 
                 borderRadius: DIMENS.px_2,
                  height:DIMENS.px_40,
                  justifyContent:'center',
                  width:WIDTH / this.state.compareDataList.length-10
              }]}>
                  {
                      item.localLoading ?
                          <ActivityIndicator color={colors.white} size={'small'} style={{ padding: DIMENS.px_15 }} />
                          :

                          <Text style={{ textAlign: 'center', fontSize: DIMENS.txt_size_medium_1, fontFamily: FONT_FAMILIY.Roboto_Medium, color: colors.white }}>
                              {item[APP_PARAMS.CART] ? translate('GO_TO_BAG') : translate('ADD_CART')}</Text>
                  }
              </View>
          </Ripple> */}
          </View>
        )
       
    }
    render() {
        const { loading, data } = this.props
        return (
            <View style={{ flex: 1 }}>
                <CommonNavHeader title={translate('SCREEN_COMPARE')}
                    rightIcon2={PLUS}
                    cartPress={() => this.addItemClicked()}
                    backPress={() => this.backScrn()}
                />
                <View style={{ flex: 1 }}>
                    {this.state.compareDataList != undefined && this.state.compareDataList.length > 0 ?
                        <FlatList
                            key={this.state.compareDataList.length}
                            showsVerticalScrollIndicator={false}
                            numColumns={this.state.compareDataList.length}
                            data={this.state.compareDataList}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => this.renderDataList(item, index, this.state.compareDataList.length)}
                            extraData={this.state}
                        />:
                        <CommonEmptyView
                        image={PLACEHOLDER_PRODUCT}
                        title={translate('Add_a_Product')}
                       // subtitle={translate('Add_a_Product')}
                        btntext2={translate('CONTINUE_SHOPING')}
                        onPress2={() => NavigationService.clearStack('Drawer')}
                        btntextImg2={NEXT} 
                        /> 
                    }
                </View>
            </View>
        )
    }
}