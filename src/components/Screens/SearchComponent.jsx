import React from 'react'
import {
    ActivityIndicator,
    ScrollView, TextInput,
    Text, FlatList, View, Image, Platform
} from 'react-native'
import Ripple from 'react-native-material-ripple';
import styles from '../Auth/styles'
import { colors } from '../../theme';
import { SHOP_CART, BACK, SEARCH, PLACEHOLDER_PRODUCT_IMG, PLACEHOLDER_PRODUCT, NEXT } from '../../images'
import CommonHeaderHome from '../../common/CommonHeaderHome'
import translate from '../../i18n/i18n';
import CommonSearch from '../../common/CommonSearch';
import { DIMENS, FONT_FAMILIY, WIDTH, HEIGHT, APP_PARAMS, SCREENS } from '../../constants';
import Basecomponents from '../../common/BaseComponent';
import CommonNavHeader from '../../common/CommonNavHeader';
import { showInfoToast } from '../../utility/Utils';
import Loader from '../../common/Loader';
import { CommonEmptyView } from '../../common/CommonEmptyView';
import NavigationService from '../../NavigationService'

export default class SearchComponent extends Basecomponents {
    constructor(props) {
        super(props)
        this.viewRef = undefined;
        this.state = {
            searchData: undefined,
            // [{uri:SHOP_CART,name:'toys',subTitle:'in Push & Pull Along Toys'}],
            searchText: '',
            isApiCalled: false,
        }
    }
    
    renderSearchItem = (item, index) => {        
        return (
            <Ripple key={index} style={{ flexDirection: 'row', flex: 1, alignItems: 'center', //padding: DIMENS.px_10, 
           }}
            onPress={()=>this.props.navigation.push(SCREENS.CATEGORY_DETAIL, 
                        { [APP_PARAMS.CAT_ID]: item[APP_PARAMS.CAT_ID],name:item[APP_PARAMS.CATEGORY_NAME] })}>
                <Image source={(item.imageLocations && item.imageLocations !== '') ?
                           {uri:item.imageLocations}:SEARCH} 
                    style={{ flex: 0.06, resizeMode: 'contain',width: DIMENS.px_20, height: DIMENS.px_15 }} />
                <View style={{ flex: 0.94, width: '100%', marginHorizontal: DIMENS.px_8, borderBottomWidth: 0.5, borderBottomColor: colors.lightGrayText ,paddingVertical:DIMENS.px_10}}>
                    <Text style={{ fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular, color: colors.grayClr,paddingBottom:DIMENS.px_2}}
                    numberOfLines={1}>{item.name}</Text>
                    { item[APP_PARAMS.CATEGORY_NAME] &&
                    <Text style={{ fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular, color: colors.primary }}>{item[APP_PARAMS.CATEGORY_NAME]}</Text>
                    } 
                </View>
            </Ripple>
        )

    }
    
    serchOnChange = (text) => {
        try {
             this.setState({searchText:text, isApiCalled: false },()=>{
                 setTimeout(() => {
                if(text!="" && text.length>1) {
                this.props.searchAPi(text).then(result => {
                    if (result) {
                        if (result.hasOwnProperty(APP_PARAMS.SUCCESS)
                            && result[APP_PARAMS.SUCCESS]) {
                            if (result.hasOwnProperty(APP_PARAMS.DATA)) {
                                this.setState({ searchData:this.state.searchText!=""? result[APP_PARAMS.DATA]:undefined  },()=>{
                                    if(this.state.searchData==undefined||this.state.searchData&&this.state.searchData.length==0){
                                        this.setState({ isApiCalled: true})
                                    }
                                })
                                
                            }
                        } else if (result[APP_PARAMS.MESSAGE]) {
                            this.setState({ isApiCalled: true })
                            showInfoToast([APP_PARAMS.MESSAGE])
                        }
                    } else {
                        showInfoToast(translate('MESSAGE_SERVER_ERROR'))
                    }
                }) }
                else{
                     if(text==''){
                        console.log("text of search::1");
                        
                        this.setState({searchData:undefined})
                     }
                }
            
            } , 2000)
        })
        } catch (error) {
           alert(err)
        }
        if(text==''){
            console.log("text of search::2");
            
            this.setState({searchData:undefined})
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
                    <Ripple onPress={() => this.props.navigation.goBack()} style={{ flex: .1 }}>
                        <Image source={BACK} style={{ height: DIMENS.px_25, width: DIMENS.px_25 }} resizeMode={'center'} />
                    </Ripple>
                    <View ref={(refs) => this.viewRef = refs} style={{ flexDirection: 'row', backgroundColor: colors.white, alignItems: 'center', borderRadius: 2, flex: .9 }} >
                        <Image source={SEARCH} style={{ marginLeft: DIMENS.px_10, marginRight: DIMENS.px_5, height: DIMENS.px_12, width: DIMENS.px_12, resizeMode: 'contain', flex: .1 }} />
                        <TextInput
                            style={{ flex: .85, height: DIMENS.px_40 }}
                           // clearButtonMode={true}
                            placeholder={translate('PLACEHOLDER_SEARCH_PORODUCT')}
                            onChangeText={text => 
                                {
                                    console.log("search txt::-",text);
                                    if(text==''){
                                        this.setState({searchData:undefined,searchText:''})
                                    }else
                                    this.serchOnChange(text)}
                            }
                            //onFocus={()=>this.setState({isApiCalled:false})}
                            value={this.state.searchText} />
                    </View>
                </View>
            </View>)
    }
    render() {
        const { loading } = this.props
        return (
            <View style={{ backgroundColor: colors.white, flex: 1}}>
                {this.searchComponent()}
                {
                    this.state.searchData != undefined && this.state.searchData.length > 0 ?
                    <FlatList
                        style={{ width: '100%' }}
                        data={this.state.searchData}
                        renderItem={({ item, index }) => this.renderSearchItem(item, index)}
                        extraData={this.state}
                        keyExtractor={(item,index) => index.toString()} />
                        :
                        !loading&&this.state.isApiCalled==true&&
                        <ScrollView  contentContainerStyle={{flexGrow:1}}>
                        <CommonEmptyView
                        image={PLACEHOLDER_PRODUCT}
                        title={translate('TITLE_NO_PRODUCT_FOUND')}
                        subtitle={translate('SUB_TITLE_SEARCH_ANOTHER_KEYWORD')}
                        btntext2={translate('CONTINUE_SHOPING')}
                        onPress2={() => NavigationService.clearStack('Drawer')}
                        btntextImg2={NEXT} 
                        /> 
                        </ScrollView>
                }
                {
                    // loading&&
                    // <Loader loader={loading} />
                }
              {/* {
                    !loading &&this.state.isApiCalled==true && (this.state.searchData == undefined||this.state.searchData.length == 0) &&
                        <CommonEmptyView
                        image={PLACEHOLDER_PRODUCT}
                        title={translate('TITLE_NO_PRODUCT_FOUND')}
                        subtitle={translate('SUB_TITLE_SEARCH_ANOTHER_KEYWORD')}
                        btntext2={translate('CONTINUE_SHOPING')}
                        onPress2={() => NavigationService.clearStack('Drawer')}
                        btntextImg2={NEXT} 
                        /> 
                } */}
            </View>
        )
    }
}




