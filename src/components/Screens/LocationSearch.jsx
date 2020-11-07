import React from 'react'
import {
    ActivityIndicator,
    ScrollView, TextInput,StatusBar,
    Text, FlatList, View, Image, Platform, DeviceEventEmitter, Modal, SafeAreaView
} from 'react-native'
import Ripple from 'react-native-material-ripple';
import styles from '../Auth/styles'
import { colors } from '../../theme';
import { SHOP_CART, BACK, SEARCH } from '../../images'
import CommonHeaderHome from '../../common/CommonHeaderHome'
import translate from '../../i18n/i18n';
import CommonSearch from '../../common/CommonSearch';
import { DIMENS, FONT_FAMILIY, WIDTH, HEIGHT, APP_PARAMS } from '../../constants';
import Basecomponents from '../../common/BaseComponent';
import CommonNavHeader from '../../common/CommonNavHeader';
import { showInfoToast } from '../../utility/Utils'
import Loader from '../../common/Loader';
import * as Utils from '../../utility/Utils'
 


export default class LocationSearch extends Basecomponents {
    constructor(props) {
        super(props)
        this.viewRef = undefined;
        this.state = {
            searchData: undefined,
            // [{uri:SHOP_CART,name:'toys',subTitle:'in Push & Pull Along Toys'}],
            searchText: '',
            addressSerachArr:undefined
        }
    }
    //Action
    getAddress=(item)=>{
        console.warn('address:--in seracg',item);
        this.props.getAddress(item.address)
        this.backPress()
        
       // this.props.navigation.state.params.goBackSearch(item.address)
       // DeviceEventEmitter.emit('check',item.address)
       // this.props.navigation.goBack()
    }
    backPress=()=>{
        this.props.modalViewHide()
    }
    renderSearchItem = (item, index) => {
        return (
            <Ripple style={{ flexDirection: 'row', flex: 1, alignItems: 'center', }}
            onPress={()=>this.getAddress(item)}>
                {/* <Image source={(item.imageLocations && item.imageLocations !== '') ?
                           {uri:item.imageLocations}:SHOP_CART} style={{ borderColor: colors.lightGrayText, borderWidth: DIMENS.px_05, width: DIMENS.px_40, height: DIMENS.px_40, borderRadius: 22.5 }} /> */}
                <View style={{ width: '100%', marginHorizontal: DIMENS.px_8 }}>
                   {
                       item.address!=undefined && item.address!=''&&
                    <Text style={{ padding:DIMENS.px_5,fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular, color: colors.grayClr }}>
                        {item.address}</Text>
                   }
                    {/* { item.subTitle &&
                    <Text style={{ fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular, color: colors.primary }}>{item.subTitle}</Text>
                    }  */}
                   <View style={{ width: '100%', backgroundColor: colors.lightGrayText, height: .5, }} />
                </View>
            </Ripple>
        )

    }
    // serchOnChange = (text) => {
    //    this.setState({searchText:text}),setTimeout(() => {
    //         this.props.searchAPi(text).then(result => {
    //             console.log('result:---', JSON.stringify(result));
    //             if (result) {
    //                 if (!result.hasOwnProperty(APP_PARAMS.ERROR) ||
    //                     result.hasOwnProperty(APP_PARAMS.SUCCESS)
    //                     && result[APP_PARAMS.SUCCESS]) {
    //                     if (result.hasOwnProperty(APP_PARAMS.DATA)) {
    //                         this.setState({ searchData: result[APP_PARAMS.DATA] })
    //                     }
    //                 } else if (result[APP_PARAMS.MESSAGE]) {
    //                     Utils.showInfoToast([APP_PARAMS.MESSAGE])
    //                 }
    //             } else {
    //                 Utils.showInfoToast(translate('MESSAGE_SERVER_ERROR'))
    //             }

    //         })
    //     }, 2000);
    // }
    searchTxt = (txt) => {
        this.setState({ searchText: txt })
        if (txt != '') {
            setTimeout(() => {
                Utils.getSearchlocation((txt).trim(), (response) => {
                    let tempArr = []
                    response.map((elmt, index) => {
                        console.log('response of google search api:-', elmt['structured_formatting']['main_text'])
                        console.log('response of google search api:-', elmt['description'])
                        let dict = {
                            typeAddress: elmt['structured_formatting']['main_text'],
                            address: elmt['description'], placeId: elmt['place_id']
                        }
                        tempArr.push(dict)
                    })
                    // tempArr.push(this.state.addressArr[0])
                    this.setState(
                      {
                        
                        addressSerachArr:[...tempArr]
                      }
                    )
                }, (error) => {
                    console.log('response of google search api eror:-', error)
                });
            }, 1000);
        }else{
            this.setState(
                {
                  
                  addressSerachArr:undefined
                }
              )
        }
    }
    searchComponent = () => {
        return (
            <View style={{
                backgroundColor: colors.header,
                paddingHorizontal: 10, justifyContent: 'center',
                height: global.HeaderHeight != undefined ? global.HeaderHeight : 60
            }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ripple onPress={() => this.backPress()} style={{ flex: .1 }}>
                        <Image source={BACK} style={{ height: DIMENS.px_25, width: DIMENS.px_25 }} resizeMode={'center'} />
                    </Ripple>
                    <View ref={(refs) => this.viewRef = refs} style={{ flexDirection: 'row', backgroundColor: colors.white, alignItems: 'center', borderRadius: 2, flex: .9 }} >
                        <Image source={SEARCH} style={{ marginLeft: DIMENS.px_10, marginRight: DIMENS.px_5, height: DIMENS.px_12, width: DIMENS.px_12, resizeMode: 'contain', flex: .1 }} />
                        <TextInput
                            style={{ flex: .85, height: DIMENS.px_40,}}
                          //  clearButtonMode={true}
                            placeholder={translate('PLACEHOLDER_AREA')}
                            onChangeText={text => this.searchTxt(text)
                            }
                            value={this.state.searchText} />
                    </View>
                </View>

            </View>)
    }
    render() {
        const {loading} = this.props
        return (
            // <SafeAreaView style={{backgroundColor:colors.colorPrimarydark,flex:1,width:'100%'}}>

            <View style={{ backgroundColor: colors.white, flex: 1, width: '100%' }}>
                <Modal
               animationType="slide"
            //    style={{
            //     backgroundColor: colors.blackTransparent_bG,
            //     margin: 0,// bottom: 0
            //   }}
            transparent={false}
            isVisible={this.props.modalVisible}
           // onBackdropPress={this.props.closePopOver}
           // onDismiss={props.closePopOver}
            //onRequestClose={() => props.closePopOver}
        >
                        <SafeAreaView style={{backgroundColor:colors.colorPrimarydark,flex:1,width:'100%'}}>

             <View style={{ backgroundColor: colors.white, flex: 1, width: '100%' }}>
                 {/* <CommonNavHeader backPress={}/> */}
                    {this.searchComponent()}
                                    {
                                        this.state.addressSerachArr != undefined && 
                                        this.state.addressSerachArr.length > 0 &&
                                        <FlatList
                                            style={{ width: '100%' }}
                                            data={this.state.addressSerachArr}
                                            renderItem={({ item, index }) => this.renderSearchItem(item, index)}
                                            extraData={this.state}
                                            keyExtractor={(item,index) => index.toString()} />
                                    }
             </View>
             </SafeAreaView>
                    </Modal>

               
               
                {/* {
                    loading&&
                    <Loader loader={loading} />
                } */}
            </View>
            /* </SafeAreaView> */
        )
    }
}
