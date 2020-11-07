import React from 'react'
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text, Image, StyleSheet,
    TouchableOpacity, FlatList, Button,
    View, Dimensions, TextInput, findNodeHandle, NativeModules
} from 'react-native'
import Modal from 'react-native-modal'
import Ripple from 'react-native-material-ripple';
import styles from '../Auth/styles'
import { colors } from '../../theme';
import { EDIT, DOT_MENU, LOC, PLUS, CIRCLE, RADIO_POINT } from '../../images'
import HeaderButton from '../HeaderButton'
import CommonHeaderHome from '../../common/CommonHeaderHome'
import translate from '../../i18n/i18n';
import CommonSearch from '../../common/CommonSearch';
import { DIMENS, FONT_FAMILIY, WIDTH, HEIGHT, APP_PARAMS, CONST, SCREENS, KEY } from '../../constants';
import * as Toast from '../../utility/Toast'
import * as Utils from '../../utility/Utils'

import CommonDialog from '../../common/CommonDialog';
import CommonNavHeader from '../../common/CommonNavHeader';
import Basecomponents from '../../common/BaseComponent';
// import { Popover } from 'react-native-modal-popover';
import {
    Menu,
    MenuOptions,
    MenuOption, renderers,
    MenuTrigger, MenuProvider
} from 'react-native-popup-menu';
import Loader from '../../common/Loader';
const { Popover } = renderers

export default class MyAddress extends Basecomponents {
    constructor(props) {
        super(props)
        this.item=undefined;
        this.index=undefined;
        this.productID = undefined;
        this.arrowBtn = undefined;
        this.listnerFocus = this.props.navigation.addListener('didFocus', this.onDidFoucs);
        this.state = {
            address:undefined,
            //  [{ name: 'Quiz Name', addressType: 'Home' }],
             addressArrData:undefined,
             // [{ name: 'Quiz Name', addressType: 'Home', address: '10 B Scheme ,Usha Vihar , Arjun Nagar Jaipur,Rajsthan ,India', mobileNo: '+91 9514456788' },
            // { name: 'Quiz Name', addressType: 'Home', address: '10 B Scheme ,Usha Vihar , Arjun Nagar Jaipur', mobileNo: '+91 9514456788' },
            // { name: 'Quiz Name', addressType: 'Home', address: '10 B Scheme ,Usha Vihar , Arjun Nagar Jaipur', mobileNo: '+91 9514456788' },
            // { name: 'Quiz Name', addressType: 'Home', address: '10 B Scheme ,Usha Vihar , Arjun Nagar Jaipur 10 B Scheme ,Usha Vihar , Arjun Nagar Jaipur', mobileNo: '+91 9514456788' }],
            isShowPopover: false,
            popoverAnchor: { x: 0, y: 0, width: 0, height: 0 },
            listAnchor: { x: 0, y: 0, width: 0, height: 0 },
            viewlistAnchor: { x: 0, y: 0, width: 0, height: 0 },
            searchView: { x: 0, y: 0, width: 0, height: 0 },
            deleteDialogShow: false
        }
    }
    componentDidMount=()=>{
       console.warn('didmount')
    }
    onDidFoucs=()=>{
        console.warn('onDidFoucs')
        this.props.getAddressListApi().then(result=>{
            let data = this.responseAPI(result)
            console.log('data::-->>',JSON.stringify(data))
            this.setState({addressArrData:data})
         })
    }
    componentWillUnmount(){
        this.listnerFocus.remove()
    }
    //Action
    showPopover = (index,item) => {
        let yAxis = this.state.popoverAnchor
        yAxis.y = 135 + this.state.listAnchor.height * index

        let data = this.state.addressArrData
        data.forEach((elt,indx)=>{
            if(indx === index){
                elt.isSelected = true
            }else{
                elt.isSelected = false
            }
        })


        this.setState({
            isShowPopover: !this.state.isShowPopover,
            popoverAnchor: yAxis,
            addressArrData:[...data]
        } )
    }
    hideEditView=()=>{
        let data = this.state.addressArrData
        data.forEach(elt=>{
           elt.isSelected = false
        })
        this.setState({
            addressArrData:[...data]
        } )
    }
    setListLayout = (event, flag) => {
        // const handle = findNodeHandle(this.arrowBtn);
        var { x, y, width, height } = event.nativeEvent.layout;

        this.setState({ listAnchor: { x, y, width, height } })
    }
    searchViewLayout = (event) => {
        // const handle = findNodeHandle(this.arrowBtn);
        var { x, y, width, height } = event.nativeEvent.layout;

        this.setState({ searchView: { x, y, width, height } })
    }
    setButton = (e, index) => {
        const handle = findNodeHandle(this.arrowBtn);
        if (handle) {
            NativeModules.UIManager.measure(handle, (x0, y0, width, height, x, y) => {
                this.setState({ popoverAnchor: { x: x, y: y, width, height } });
            });
        }
    };
    goToEditAddressScrn=(item)=>{
        this.hideEditView()
        this.props.navigation.navigate('AddAddress',{item:item})
    }

    activeCustomerAddress = (item, index) => {
        let data = {
            [APP_PARAMS.ADDRESS_ID]: item[APP_PARAMS.U_UID]
        };
        this.props.activeCustomerAddressAPI(data).then(result => {

            this.responseAPI(result, true)
           if(result) {
        
                if(result[APP_PARAMS.SUCCESS]!=undefined) {
                    if(result[APP_PARAMS.SUCCESS]) {
                        let addressList = this.state.addressArrData
                        addressList.forEach((elt,eltIndx)=>{
                            if(eltIndx===index)
                              elt.isChange = true
                             else
                              elt.isChange = false
                        })
                        this.setState({addressArrData:[...addressList]},()=>this.goBackAfterSelectAddress(item))
                    }
                    if(result[APP_PARAMS.MESSAGE])
                    Toast.showErrorToast(result[APP_PARAMS.MESSAGE])
                } else {
                    Toast.showErrorToast(translate('MESSAGE_SERVER_ERROR'))
                } 
        } else {
            Toast.showErrorToast(translate('MESSAGE_SERVER_ERROR'))
        }
        })
    }
    deleteAddress=(item,index)=>{
        this.hideEditView()
        this.props.deleteAddressAPi({[APP_PARAMS.ADDRESS_ID]:item[APP_PARAMS.U_UID]}).then(result=>{
            console.warn('delte data:--',result)
            if(this.responseAPI(result,true)){                
                let dataList = this.state.addressArrData
                dataList.splice(index,1)
                this.setState({addressArrData:dataList})
               // console.warn('dataList data:--',JSON.stringify(dataList))
            }
        })
    }

    deleteAddress=(item,index)=>{
        this.setState({ deleteDialogShow: false });
        if(item!=undefined && index!=undefined) {
            this.props.deleteAddressAPi({[APP_PARAMS.ADDRESS_ID]:item[APP_PARAMS.U_UID]}).then(result=>{
                // console.warn('delte data:--',result)
                 if(this.responseAPI(result,true)){
                     let dataList = this.state.addressArrData
                     dataList.splice(index,1)
                     this.setState ({addressArrData:dataList})
                    // console.warn('dataList data:--',JSON.stringify(dataList))
                 }
             })
        } 
    }
    selectBuyAddress=(item,index)=>{
       this.activeCustomerAddress(item, index)
     
    }
    comBackFromAddAddress=(item)=>{
        this.props.navigation.state.params.goBackAdress(item)
        this.props.navigation.goBack()
    }
    goBackAfterSelectAddress=(item)=>{
        let data = {
          [APP_PARAMS.PRODUCT_ID] : this.productID,
          [APP_PARAMS.REQ_ID]:Utils.getRequestId(),
          [APP_PARAMS.POSTAL_CODE]:item[APP_PARAMS.POSTAL_CODE],
          [APP_PARAMS.ADDRESS_ID]:item[APP_PARAMS.U_UID],
          [APP_PARAMS.CUSTOMER_ID]: global[KEY.USER_DATA] != undefined && global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID] && global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID],

        }
        console.warn('data::--',data);
        
        this.props.addressActiveAPI(data).then(result=>{
            console.warn('result::--',result);
            this.props.navigation.state.params.goBackAdress(item)
            this.props.navigation.goBack()
        })
    }
    addNeWAddress=()=>{
        if(this.props.navigation.state.params!=undefined&&this.props.navigation.state.params[CONST.IS_FROM]!=undefined
            &&this.props.navigation.state.params[CONST.IS_FROM]===SCREENS.ORDER_SUMMARY){
               console.warn('is from Order Summary');
               
            this.props.navigation.navigate('AddAddress',{goBackAddAddress:(item)=>this.comBackFromAddAddress(item)})
        }else{
            console.warn('is from Order ADd');
            this.props.navigation.navigate('AddAddress')
        }
      //this.props.navigation.navigate('AddAddress')
    }
    //Response
    responseAPI = (result, flag) => {
        let data = {};
        if (result) {
            if (result.hasOwnProperty(APP_PARAMS.SUCCESS) && result[APP_PARAMS.SUCCESS]) {
                  if(flag){
                    if (result[APP_PARAMS.MESSAGE]) {
                        Toast.showErrorToast(result[APP_PARAMS.MESSAGE])
                        return true
                    }
                  }else{
                    if (result.hasOwnProperty(APP_PARAMS.DATA) && result[APP_PARAMS.DATA] != null && result[APP_PARAMS.DATA].length > 0) {
                        result[APP_PARAMS.DATA].forEach(element => {
                            element['isSelected'] = false
                        });
                        data = result[APP_PARAMS.DATA]
                    }
                    
                    return data
                  }
            } else if (result[APP_PARAMS.MESSAGE]) {
                Toast.showErrorToast(result[APP_PARAMS.MESSAGE])
            }
        } else {
            Toast.showErrorToast(translate('MESSAGE_SERVER_ERROR'))
        }
    }

    renderItem = (item, index) => {
        return (
            <View style={{ padding: 10, borderBottomColor: colors.lightGraytransparent, borderBottomWidth: DIMENS.px_5, }}
                //onLayout={(e) => this.setListLayout(e)}
                onStartShouldSetResponder={() => this.hideEditView()}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                   {
                       this.props.navigation.state.params!=undefined&&this.props.navigation.state.params[CONST.IS_FROM]!=undefined
                       &&this.props.navigation.state.params[CONST.IS_FROM]===SCREENS.ORDER_SUMMARY&&
                      <Ripple style={{ marginRight:DIMENS.px_10}} onPress={() => this.selectBuyAddress(item,index)}>
                        <Image source={item.isChange ? RADIO_POINT : CIRCLE} 
                        style={{ width: 18, height: 18, padding: 10,}} />
                       </Ripple>
                        }
                        <Text
                            numberOfLines={2}
                            style={{
                                fontFamily: FONT_FAMILIY.Roboto_Regular,
                                fontSize: DIMENS.txt_size_medium_1, color: colors.black
                            }}>{item[APP_PARAMS.FIRST_NAME]&&item[APP_PARAMS.FIRST_NAME]}</Text>
                        <Text style={{
                            textAlign: 'center',
                            fontFamily: FONT_FAMILIY.Roboto_Regular,
                            fontSize: DIMENS.txt_size_medium,
                            color: colors.black,
                            backgroundColor: colors.bgOfTxt,
                            paddingHorizontal: DIMENS.px_10,
                            paddingVertical: DIMENS.px_5,
                            marginHorizontal: DIMENS.px_10,
                        }}>{item.addressType?(item.addressType).toUpperCase():'HOME'}</Text>
                    </View>
                    {
                        this.props.navigation.state.params==undefined&&
                        <Ripple onLayout={(e) => this.setButton()}
                            style={{ width: DIMENS.px_30, height: DIMENS.px_45, alignItems: 'center', justifyContent: 'center' }}
                            ref={r => { this.arrowBtn = r }}
                            onPress={() => this.showPopover(index)}>
                            <Image source={DOT_MENU} />
                        </Ripple>
                    }
                        
                </View>
                <Text style={{ fontFamily: FONT_FAMILIY.Roboto_Regular, fontSize: DIMENS.txt_size_medium, color: colors.black, marginVertical: DIMENS.px_5 }}>
                    {`${item[APP_PARAMS.STREET_ADDRESS]}, ${item[APP_PARAMS.APARTMENT_SUIT]}, ${item[APP_PARAMS.CITY]}, ${item[APP_PARAMS.STATE]}`}</Text>
                <Text style={{ fontFamily: FONT_FAMILIY.Roboto_Regular, fontSize: DIMENS.txt_size_medium, color: colors.black }}>
                    {item.phone&&item.phone}</Text>
                    {
                        item.isSelected&&
                    
                    <View style={{top:DIMENS.px_45,right:DIMENS.px_15,position:'absolute',
                            backgroundColor:colors.whiteBackground,borderColor:colors.lightGrayText,
                            borderColor:DIMENS.px_05,borderRadius:DIMENS.px_5}}>
                                <Ripple onPress={()=>this.goToEditAddressScrn(item) }>
                                  <Text style={{paddingLeft:DIMENS.px_8,paddingRight:DIMENS.px_15,paddingVertical:DIMENS.px_5, fontFamily: FONT_FAMILIY.Roboto_Regular,
                                   fontSize: DIMENS.txt_size_medium, color: colors.black, marginVertical: DIMENS.px_5,
                                   borderBottomWidth:DIMENS.px_05,borderBottomColor:colors.lightGrayText }}>
                                    {'EDIT'}</Text>
                                </Ripple>
                                <Ripple onPress={()=> {
                                    this.hideEditView();
                                    this.item=item;
                                    this.index=index;
                                    this.setState({ deleteDialogShow: true }) }} >
                                 <Text style={{paddingLeft:DIMENS.px_8,paddingRight:DIMENS.px_15, paddingVertical:DIMENS.px_5,fontFamily: FONT_FAMILIY.Roboto_Regular, fontSize: DIMENS.txt_size_medium, color: colors.black }}>
                                    {'DELETE'}</Text>
                                </Ripple>
                            </View>
                     }   
            </View>
            /* </MenuProvider> */ 
        )
    }
    render() {
        const {loading,data,productID} = this.props
        this.productID = productID
        
       
        return (
            <View style={{ flex: 1 }}>
                <CommonNavHeader title={translate('SCREEN_MY_ADDRESS')}
                    rightBtnText = {translate('ADD_NEW_ADDRSS')}
                    rightBtnPress={()=>this.addNeWAddress()}
                    rightImgWithTxt={PLUS}
                    rightBtnClr={colors.white}
                    rightTxtstyle={{fontSize:DIMENS.txt_size_small,textAlign:'left'}}
                    rightBtnStyle = {{paddingHorizontal:DIMENS.px_8,paddingVertical:DIMENS.px_10,
                    flexDirection:'row',alignItems:'center',backgroundColor:colors.notifyClr,width:115,justifyContent:'center'}}
                    backPress={() => this.props.navigation.goBack()} />
                <ScrollView contentContainerStyle={{}} >
                  {
                   this.state.addressArrData && this.state.addressArrData.length > 0 &&
                    <View style={{ flexDirection: 'row', backgroundColor: colors.whiteBackground, padding: DIMENS.px_12 }}
                       >
                        <Image source={LOC} />
                        <Text style={{ marginHorizontal: DIMENS.px_10, color: colors.lightGrayText, fontFamily: FONT_FAMILIY.Roboto_Regular, fontSize: DIMENS.txt_size_medium }}>
                            {this.state.addressArrData.length+' '+translate('SAVED_ADDRESS')}</Text>
                    </View>
                    } 
                    {
                        this.state.addressArrData != undefined && this.state.addressArrData.length > 0 &&
                        <View >
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                data={this.state.addressArrData}
                                renderItem={({ item, index }) => this.renderItem(item, index)}
                                extraData={this.state}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                    }
                  
                </ScrollView>
                <CommonDialog
                    modalVisible={this.state.deleteDialogShow}
                    subtitle={translate('DELETE_ADDRESS_HINT')}
                    okPressed={() => this.deleteAddress(this.item,this.index)}
                    cancelPressed={() => this.setState({ deleteDialogShow: false })}
                />
               { loading &&
                <Loader loading={true}/>}
            </View>
        )
    }
}