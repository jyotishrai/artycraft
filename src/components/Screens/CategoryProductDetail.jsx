import React from 'react'
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text, Image, StyleSheet,
    TouchableOpacity, SectionList, FlatList,
    View, Dimensions, TextInput
} from 'react-native'
import Ripple from 'react-native-material-ripple';
import styles from '../Auth/styles'
import { colors } from '../../theme';
import { } from '../../images'
import translate from '../../i18n/i18n';
import Basecomponents from '../../common/BaseComponent';
import CommonNavHeader from '../../common/CommonNavHeader';
import { CommonInfoProduct } from '../../common/CommonProductRow';
import { TabView, SceneMap } from 'react-native-tab-view';
import Animated from 'react-native-reanimated';
import * as Utils from '../../utility/Utils'
import * as Toast from '../../utility/Toast'
import { WIDTH, DIMENS, FONT_FAMILIY, APP_PARAMS, KEY } from '../../constants';
import ProductDescription from './ProductDescription';
import ProductSpecification from './ProductSpecification';


export default class CategoryProductDetail extends Basecomponents {
    constructor(props) {
        super(props);
        this[APP_PARAMS.PRODUCT_ID] = this.props.navigation.state.params!=undefined && this.props.navigation.state.params[APP_PARAMS.PRODUCT_ID]!=undefined ?
        this.props.navigation.state.params[APP_PARAMS.PRODUCT_ID] : undefined
        this.state = {
            index: 0,
            routes: [
                { key: 'first', title: 'Description' },
                { key: 'second', title: 'Specifications' },
            ],
            dataAreColor:
             [{
                type: 'Color', typeName: 'Blue', data: [{ 
                    uri: require('../../assets/images/phone.png'), typeName: 'Blue',isSelected:false },
                { uri: require('../../assets/images/phone.png'), typeName: 'Green',isSelected:false }, 
                { uri: require('../../assets/images/phone.png'), typeName: 'Black',isSelected:false }]
            },
            { type: 'Storage', typeName: '64GB', data: [{ isSelected: false, typeName: '32GB' }, { isSelected: false, typeName: '64GB' }] },
            { type: 'RAM', typeName: 'Blue', data: [{ isSelected: false, typeName: '3GB' }, { isSelected: false, typeName: '4GB' }] },
            ],
            showIndicator:false
        }
    }
  componentDidMount(){
      this.getProductDetailById()
      console.warn('product data is:::: ',this.props.productData!=undefined && this.props.productData);
  }
    //Action

    applySelectVarient=()=>{
    // let list = this.state.dataAreColor
    // let tempDataSelect = []
    // list.forEach((listElt,listIndex)=>{
    //       listElt.data.forEach((elt,eltIndex)=>{
    //           if(elt.isSelected)
    //            tempDataSelect.push({type:listElt.type,typeName:elt.typeName})
    //       })
    // })
    // console.log('select varinet:;-tempDataSelect',JSON.stringify(tempDataSelect));

        
      this.props.navigation.state.params.selectVarient(this.state.dataAreColor)
      this.props.navigation.goBack()
    }
    selectVarinetOfPrduct=(item,index,data,secIndex)=>{
        let list = [...this.state.dataAreColor]
        list.forEach((listElt,listIndex)=>{
          if(listIndex===secIndex){
            listElt.data.forEach((elt,eltIndex)=>{
                if(eltIndex ===index){
                    elt.isSelected = true
                }else{
                    elt.isSelected = false 
                }
            })
          }
        })
        this.setState({dataAreColor:list,showIndicator:!this.state.showIndicator})
    }

    getProductDetailById = () => {
          let data = { 
             [APP_PARAMS.CUSTOMER_KEY_ID]: global[KEY.USER_DATA]!=undefined && global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID] ,
             [APP_PARAMS.PRODUCT_ID]: this[APP_PARAMS.PRODUCT_ID],
             [APP_PARAMS.REQ_ID]: Utils.getRequestId(),
        
          }
            this.props.getProductDetailByIdAPI(data).then(result => {
            console.warn('get product detail by id :::', JSON.stringify(result));
            
            if(result!=undefined) {
                if(result[APP_PARAMS.SUCCESS]!=undefined) {
                    if(result[APP_PARAMS.SUCCESS]) {
                        console.log('product detail by id success');
      console.warn('product data in getProductDetailById is :::: ',JSON.stringify(this.props.productData));

                    }
                    if(result[APP_PARAMS.MESSAGE]) {
                    Toast.showInfoToast(result[APP_PARAMS.MESSAGE])
                    }
                } else {
                   Toast.showInfoToast(translate('MESSAGE_SERVER_ERROR'))
                }
            } else {
                Toast.showInfoToast(translate('MESSAGE_SERVER_ERROR'))
            }
         })
    }
       

    _renderTabBar = props => {
        const inputRange = props.navigationState.routes.map((x, i) => i);
        return (
            <View >
            <View style={{ flexDirection: 'row' }}>
                {props.navigationState.routes.map((route, i) => {
                    const color = Animated.color(
                        Animated.round(
                            Animated.interpolate(props.position, {
                                inputRange,
                                outputRange: inputRange.map(inputIndex =>
                                    inputIndex === i ? 125 : 0
                                ),
                            })
                        ),
                        0,
                        0
                    );

                    return (
                        <TouchableOpacity
                            style={styles.tabItem}
                            onPress={() => this.setState({ index: i })}>
                            <View style={{ borderRightColor: colors.lightGraytransparent, borderRightWidth: 0.5, alignItems: 'center', paddingVertical: DIMENS.px_15, paddingHorizontal: DIMENS.px_20, width: WIDTH / 2 }}>
                                <Animated.Text style={{ color }}>{route.title}</Animated.Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>
          <View style={{ backgroundColor: colors.lightGrayText, height: DIMENS.px_05, width: '100%'}} />
          </View>
        );
    };
    renderItemList = (item,index,data,secIndex) => {
        return (
            <View style={{ marginLeft: 10,marginTop:item.uri!= undefined ? DIMENS.px_20 :DIMENS.px_10 }}>
              {
                item.uri != undefined &&
                <Image source={item.uri} style={{ width: WIDTH * 30 / 100, height: 80, resizeMode: 'contain', }} />
              }
              <Ripple style={{marginTop:DIMENS.px_10,borderStyle:item.uri== undefined ?'dashed':undefined,
              borderColor:item.uri== undefined ?item.isSelected != undefined && item.isSelected ? colors.Blue : colors.grayClr:undefined,
              borderRadius:item.uri== undefined ?1:0,borderWidth:item.uri== undefined ?1:0,
              backgroundColor:item.isSelected != undefined && item.isSelected ?colors.orange:undefined}} 
              onPress={()=>this.selectVarinetOfPrduct(item,index,data,secIndex)}
              >
              <Text style={{padding: 10, color: colors.blueTextClr, textAlign:'center',
                    fontFamily: FONT_FAMILIY.Roboto_Regular, fontSize: DIMENS.txt_size_medium_14,
                    borderStyle:'dashed', borderRadius:2}} >
                   {item.typeName}
                </Text>
            </Ripple>
              </View>    
        )
    }
    
    renderItem = (item1,secIndex) => {
        return (
            <View style={{paddingVertical:20,paddingHorizontal:15}}>
                <Text style={{ color: colors.black, fontFamily: FONT_FAMILIY.Roboto_Regular, fontSize: DIMENS.txt_size_medium_14 }}>
                    {item1.type + ': '}
                    <Text style={{ color: colors.blueTextClr, fontFamily: FONT_FAMILIY.Roboto_Regular, fontSize: DIMENS.txt_size_medium_14 }}>
                        {item1.typeName}
                    </Text>
                </Text>
                <FlatList
                showsHorizontalScrollIndicator={false}
                style={{ }}
                    horizontal={true}
                    data={item1.data}
                    renderItem={({ item, index }) => this.renderItemList(item, index,item1.data,secIndex)}
                    keyExtractor={(item, index) => item + index}
                    extraData={this.state} />
            </View>
        )
    }



    render() {
        return (
            <View style={{ flex: 1 }}>
                <CommonNavHeader title={translate('SCREEN_PRODUCT_DETAIL')}
                    backPress={() => this.props.navigation.goBack()} />
                    {/* <ScrollView showsVerticalScrollIndicator={false}> */}
                <View style={{ flex: 1 }}>
{ this.props.productData!=undefined &&
                    <CommonInfoProduct
                        data={ this.props.productData }
                        uri={require('../../assets/images/phone.png')}
                        name={'Realme 3i (Diamond Blue,32GB)'}
                        rating='3.3'
                        ratingCount='2456'
                        price='7,499'
                        disPrice='7,800'
                        off='6000'
                    />
}
                <TabView
                  props = {this.props}
                        navigationState={this.state}
                        renderScene={SceneMap({
                            first: () => <ProductDescription data={this.props.data} />,
                            second: () => <ProductSpecification data={this.props.data} />,
                            //first: ProductDescription,
                            //second: ProductSpecification,//ProductSpecification,
                        })}
                        renderTabBar={this._renderTabBar}
                        indicatorStyle={{ backgroundColor: 'green', }}
                        tabStyle={{ backgroundColor: 'pink' }}
                        onIndexChange={index => this.setState({ index })}
                         initialLayout={{ width: Dimensions.get('window').width }}
                    />   
                </View>
                {/* </ScrollView> */}
            </View>
        )
    }
}
const FirstRoute = () => (
    <View style={[style.scene, { backgroundColor: 'red' }]} >
       
      
    </View>
);

const SecondRoute = () => (
    <View style={[style.scene, { backgroundColor: '#673ab7' }]} />
);
const style = StyleSheet.create({
    scene: {
        flex: 1,
    },
    indicator: {
        backgroundColor: 'green',
    },
    container: {
        // marginTop: 100,
        backgroundColor: 'red',

    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'red',
    },
});