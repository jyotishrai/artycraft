import React from 'react'
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text, Image,
  TouchableOpacity, FlatList,
  View, Dimensions, TextInput, BackHandler, ImageBackground,
} from 'react-native'
import Ripple from 'react-native-material-ripple';
import styles from '../Auth/styles'
import { colors } from '../../theme';
import { NOTIFICATION, HEART, SEARCH, ORDER, SHOP_CART, PLACEHOLDER_PRODUCT_IMG, IMAGE, CROSS, CANCEL } from '../../images'
import HeaderButton from '../HeaderButton'
import CommonHeaderHome from '../../common/CommonHeaderHome'
import translate from '../../i18n/i18n';
import CommonSearch from '../../common/CommonSearch';
import { DIMENS, FONT_FAMILIY, WIDTH, HEIGHT, APP_PARAMS, KEY, SCREENS, CONST } from '../../constants';
import CommonButton from '../../common/CommonButton';
import CommonProductRow, { CommonHorizontailList, CommonViewAllItem } from '../../common/CommonProductRow';
import Basecomponents from '../../common/BaseComponent';
import CommonNavHeader from '../../common/CommonNavHeader';
import CompareSortFiltr, { SortCompomnent } from '../../common/CompareSortFiltr';
import CommonProductList from '../../common/CommonProductList';
import Loader from '../../common/Loader';
import * as Utils from '../../utility/Utils'
import { showInfoToast } from '../../utility/Toast'
import Modal from 'react-native-modal'
import CommonImage from '../../common/CommonImage'

const END = 10
export default class CategoryDetails extends Basecomponents {
  constructor(props) {
    super(props)
    this.productSize = undefined;
    this.start = 0;
    this.end = END;
    this.focusListener = this.props.navigation.addListener('didFocus', this.onDidFoucs);
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.backHardwareHandler);
    this.isFrom = this.props.navigation.state != undefined &&
      this.props.navigation.state.params != undefined &&
      this.props.navigation.state.params['isFrom'] != undefined
      ? this.props.navigation.state.params['isFrom'] : undefined;
    this.navName = this.props.navigation.state != undefined &&
      this.props.navigation.state.params != undefined &&
      this.props.navigation.state.params.name != undefined
      && this.props.navigation.state.params.name;
    this.sortType = undefined;

    //this.sortData=undefined
    this.state = {
      isLoadMore: false,
      showSortModalView: false,
      sortData: undefined,
      filterData: undefined,
      dataResponse: undefined,
      localLoder: false,
      cartCount: undefined,
      wishCount: undefined,
      isCompare: false,
      compareProductList: undefined,
      compareArr: [{ name: 'Product 1' }, {name: 'Product 2'}, { name: 'Product 3'}],
      compareNowTxt:translate('SELECT_ITEM_FOR_COMPARE')
    }
  }

  componentDidMount() {
    let dataObj = {
      [APP_PARAMS.ID]: this.props.navigation.state != undefined &&
        this.props.navigation.state.params != undefined &&
        this.props.navigation.state.params[APP_PARAMS.CAT_ID] != undefined
        && this.props.navigation.state.params[APP_PARAMS.CAT_ID]
    };
    this.props.getSortFilterApi(dataObj).then(result => {
      let data = this.responseOfAPI(result)
      let sortArr = data[APP_PARAMS.SORT_LIST]
      sortArr[0].isSelected = true
      console.warn('filtered list ::: ', JSON.stringify(result));
      if(Object.keys(data[APP_PARAMS.FILTER_LIST]).length === 0) {
        // alert('empty object')
      }
      let filterArr = Utils.parseFilterData(data[APP_PARAMS.FILTER_LIST]);
      // filterArr.forEach(elt => {
      //   elt.isSelected = false
      // });
      // filterArr[0].isSelected = true
      if (filterArr != undefined && filterArr.length > 0) {
        filterArr[0].isSelected = true
        this.setState({ sortData: sortArr, filterData: filterArr }, () => {
          console.warn('filter data :::', this.state.filterData);
        })
      }
      console.warn('filter data :::', filterArr);

    })
    //this.props.clearCategoryDetail()
    if (this.isFrom != undefined) {
      if (this.isFrom == 'DealOfTheDay' || this.isFrom == 'OffUpTo')
        this.dealsOffUpToAPI(this.start)
      else if (this.isFrom == 'Recommanded')
        this.randomProductApi(this.start)
    } else {
      this.categoryDetailAPI(this.start, "popularity")
    }
  }

  componentWillUnmount = () => {
    this.focusListener.remove();
    this.backHandler.remove()
  }

  onDidFoucs = () => {
    if (global[KEY.CART_COUNT] != undefined) {
      this.setState({ cartCount: global[KEY.CART_COUNT] })
    }
    if (global[KEY.WISH_COUNT] != undefined) {
      this.setState({ wishCount: global[KEY.WISH_COUNT] })
    }
    // this.props.clearCategoryDetail()
    // if (this.isFrom != undefined && (this.isFrom == 'DealOfTheDay' || this.isFrom == 'OffUpTo')) {
    //   this.dealsOffUpToAPI(this.start)
    // } else {
    //   this.categoryDetailAPI(this.start, "popularity")
    // }
  }
  //API
  dealsOffUpToAPI = (start, filterType, isPagination) => {
    let data = {
      [APP_PARAMS.OFF_TYPE]: this.isFrom,
      [APP_PARAMS.START]: start,
      [APP_PARAMS.END]: this.end,
      [APP_PARAMS.USER_ID]: global[KEY.USER_DATA] != undefined &&
        global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID] != undefined && global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID],
      [APP_PARAMS.REQ_ID]: Utils.getDeviceId(),
      [APP_PARAMS.FILTER_TYPE]: filterType
    }

    if (isPagination) {
      this.props.getProductsByDealOfTheDayOrOffUpToAPIPagination(data, isPagination).then(result => {
        let data = this.responseOfAPI(result)
        let dataTemp = this.state.dataResponse
        let newData = [...dataTemp[APP_PARAMS.CAT_RELEATED_PRODUCT], ...data[APP_PARAMS.CAT_RELEATED_PRODUCT]]
        try {
          if (newData)
            data[APP_PARAMS.CAT_RELEATED_PRODUCT] = [...newData]
        } catch (error) {
        }

        this.setState({ dataResponse: data, localLoder: false })
      })
    } else {
      this.setState({ localLoder: true })
      this.props.getProductsByDealOfTheDayOrOffUpToAPI(data, false).then(result => {
        let data = this.responseOfAPI(result)
        this.setState({ dataResponse: data, localLoder: false })
      })
    }
  }
  categoryDetailAPI = (start, typeOfFilter, isPagination,filterValue) => {
    let data = {
      [APP_PARAMS.CAT_ID]: this.props.navigation.state != undefined &&
        this.props.navigation.state.params != undefined &&
        this.props.navigation.state.params[APP_PARAMS.CAT_ID] != undefined
        && this.props.navigation.state.params[APP_PARAMS.CAT_ID],
      [APP_PARAMS.START]: start,
      [APP_PARAMS.END]: this.end,
      [APP_PARAMS.USER_ID]: global[KEY.USER_DATA] != undefined &&
        global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID] != undefined && global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID],
      [APP_PARAMS.REQ_ID]: Utils.getDeviceId(),
      [APP_PARAMS.FILTER_TYPE]: typeOfFilter,//"popularity",
      [APP_PARAMS.FILTER_VALUES]: filterValue,//"popularity",
    }
    this.sortType = typeOfFilter
    if (isPagination) {
      this.props.categoryDetailAPIPagination(data, isPagination).then(result => {
        let data = this.responseOfAPI(result)
        let dataTemp = this.state.dataResponse
        
        
        let newData = [...dataTemp[APP_PARAMS.CAT_RELEATED_PRODUCT], ...data[APP_PARAMS.CAT_RELEATED_PRODUCT]]
        // console.log("categoryRelated Final data:::--",newData);
        try {
          if (newData)
            data[APP_PARAMS.CAT_RELEATED_PRODUCT] = [...newData]
        } catch (error) {
          //console.warn("error::--",JSON.stringify(error));
        }

        this.setState({ dataResponse: data, localLoder: false })
      })
    } else {
      this.setState({ localLoder: true })

      this.props.categoryDetailAPI(data, false).then(result => {
        let data = this.responseOfAPI(result)
        this.setState({ dataResponse: data, localLoder: false })
      })
    }
  }
  randomProductApi = (start, isPagination) => {

   
    let dataReq = {
      [APP_PARAMS.USER_ID]: global[KEY.USER_DATA] != undefined &&
        global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID] != undefined && global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID],
      [APP_PARAMS.REQ_ID]: Utils.getDeviceId(),
      [APP_PARAMS.START]: start,
      [APP_PARAMS.END]: this.end
    }

    if (isPagination) {
      // if(this.end<99){

      this.props.randomProductApiPagination(dataReq, isPagination).then(result => {
        let data = this.responseOfAPI(result)
        let dataTemp = this.state.dataResponse
        console.log("categoryRelated dataTemp:::--",JSON.stringify(dataTemp[APP_PARAMS.CAT_RELEATED_PRODUCT]));
        console.log("categoryRelated data:::--",JSON.stringify(data[APP_PARAMS.CAT_RELEATED_PRODUCT]));
        let newData = [...dataTemp[APP_PARAMS.CAT_RELEATED_PRODUCT], ...data[APP_PARAMS.CAT_RELEATED_PRODUCT]]
        console.log("categoryRelated Final data:::--",JSON.stringify(newData));

        try {
          if (newData)
            data[APP_PARAMS.CAT_RELEATED_PRODUCT] = [...newData]
        } catch (error) {
        }

        this.setState({ dataResponse: data, localLoder: false })
      })
    // }
    } else {
      this.setState({ localLoder: true })
      this.props.randomProductApi(dataReq, false).then(result => {
        let data = this.responseOfAPI(result)
        this.setState({ dataResponse: data, localLoder: false }, () => {
          // console.warn("dataResponse::--Random", JSON.stringify(this.state.dataResponse));
        })
      })
    }

  


  }

  responseOfAPI = (result) => {
    let data = {};
    if (result) {

      if (result.hasOwnProperty(APP_PARAMS.SUCCESS) && result[APP_PARAMS.SUCCESS]) {
        if (result.hasOwnProperty(APP_PARAMS.DATA)) {
          if (this.isFrom == undefined) {
           
            if (result[APP_PARAMS.DATA][APP_PARAMS.CAT_RELEATED_PRODUCT] && result[APP_PARAMS.DATA][APP_PARAMS.CAT_RELEATED_PRODUCT] != '' &&
              result[APP_PARAMS.DATA][APP_PARAMS.CAT_RELEATED_PRODUCT].length > 0) {
              data[APP_PARAMS.CAT_RELEATED_PRODUCT] = result[APP_PARAMS.DATA][APP_PARAMS.CAT_RELEATED_PRODUCT]
            }
            if (result[APP_PARAMS.DATA][APP_PARAMS.CATEGORY] && result[APP_PARAMS.DATA][APP_PARAMS.CATEGORY] != '' &&
            result[APP_PARAMS.DATA][APP_PARAMS.CAT_RELEATED_PRODUCT].length > 0) {
            data[APP_PARAMS.CAT_RELEATED_PRODUCT] = result[APP_PARAMS.DATA][APP_PARAMS.CAT_RELEATED_PRODUCT]
         
          }
          
            if (result[APP_PARAMS.DATA][APP_PARAMS.COMPARABLE] !=undefined) {
              data[APP_PARAMS.COMPARABLE] = result[APP_PARAMS.DATA][APP_PARAMS.COMPARABLE] 
          }
            if (result[APP_PARAMS.DATA][APP_PARAMS.SUB_CAT] && result[APP_PARAMS.DATA][APP_PARAMS.SUB_CAT] != '' &&
              result[APP_PARAMS.DATA][APP_PARAMS.SUB_CAT].length > 0) {
              data[APP_PARAMS.SUB_CAT] = result[APP_PARAMS.DATA][APP_PARAMS.SUB_CAT]
            }
            if (result[APP_PARAMS.DATA][APP_PARAMS.TOTAL_PRODUCT_SIZE]) {
              data[APP_PARAMS.TOTAL_PRODUCT_SIZE] = result[APP_PARAMS.DATA][APP_PARAMS.TOTAL_PRODUCT_SIZE]
            }
            if (result[APP_PARAMS.DATA][APP_PARAMS.TOTAL_PRODUCT_SIZE] && result[APP_PARAMS.DATA][APP_PARAMS.TOTAL_PRODUCT_SIZE] != '') {
              this.productSize = result[APP_PARAMS.DATA][APP_PARAMS.TOTAL_PRODUCT_SIZE]
            }
            if (result[APP_PARAMS.DATA][APP_PARAMS.COMPARABLE] != undefined) {
              data[APP_PARAMS.COMPARABLE] = result[APP_PARAMS.DATA][APP_PARAMS.COMPARABLE]
            }
            if (result[APP_PARAMS.DATA].hasOwnProperty(APP_PARAMS.SORT_LIST) && result[APP_PARAMS.DATA][APP_PARAMS.SORT_LIST]) {
              // data = result[APP_PARAMS.DATA][APP_PARAMS.SORT_LIST]
              let dict = { [APP_PARAMS.SORT_LIST]: result[APP_PARAMS.DATA][APP_PARAMS.SORT_LIST] }
              if (result[APP_PARAMS.DATA].hasOwnProperty(APP_PARAMS.FILTER_LIST) && result[APP_PARAMS.DATA][APP_PARAMS.FILTER_LIST]) {
                dict[APP_PARAMS.FILTER_LIST] = result[APP_PARAMS.DATA][APP_PARAMS.FILTER_LIST]
              }
              data = dict
              return data;
            }
          } else {
            if (result[APP_PARAMS.DATA][APP_PARAMS.PRODUCT_LIST] && result[APP_PARAMS.DATA][APP_PARAMS.PRODUCT_LIST] != '' &&
              result[APP_PARAMS.DATA][APP_PARAMS.PRODUCT_LIST].length > 0) {
              data[APP_PARAMS.CAT_RELEATED_PRODUCT] = result[APP_PARAMS.DATA][APP_PARAMS.PRODUCT_LIST]
            }
            if (result[APP_PARAMS.DATA][APP_PARAMS.RANDOM_PRODUCT] && result[APP_PARAMS.DATA][APP_PARAMS.RANDOM_PRODUCT].length > 0) {
              data[APP_PARAMS.CAT_RELEATED_PRODUCT] = result[APP_PARAMS.DATA][APP_PARAMS.RANDOM_PRODUCT]
            }
            if (result[APP_PARAMS.DATA][APP_PARAMS.TOTAL_PRODUCTS_SIZE] && result[APP_PARAMS.DATA][APP_PARAMS.TOTAL_PRODUCTS_SIZE] != '') {
              this.productSize = result[APP_PARAMS.DATA][APP_PARAMS.TOTAL_PRODUCTS_SIZE]
            }
          }
          return data
        }
      } else if (result[APP_PARAMS.MESSAGE]) {
        showInfoToast(result[APP_PARAMS.MESSAGE])
      }
    } else {
      showInfoToast(translate('MESSAGE_SERVER_ERROR'))
    }
  }
  //ACTION:-
  onPressCategory = (item) => {
    this.props.clearCategoryDetail()
    if (!global[KEY.NEXT])
      global[KEY.NEXT] = 1
    else
      global[KEY.NEXT] = global[KEY.NEXT] + 1
    let screen = 'CategoryDetail' + '_' + global[KEY.NEXT]
   // this.props.navigation.navigate(screen, { [APP_PARAMS.CAT_ID]: item[APP_PARAMS.CAT_U_ID], name: item.value })
    this.props.navigation.push(SCREENS.CATEGORY_DETAIL, { [APP_PARAMS.CAT_ID]: item[APP_PARAMS.CAT_U_ID], name: item.value })
  }
  backHardwareHandler = () => {
    if (global[KEY.NEXT] && global[KEY.NEXT] > 0) {
      global[KEY.NEXT] = global[KEY.NEXT] - 1
    }
    this.props.clearCategoryDetail()
    return false
  }
  onBackhandler = () => {
    if (global[KEY.NEXT] && global[KEY.NEXT] > 0) {
      global[KEY.NEXT] = global[KEY.NEXT] - 1
    }
    this.props.clearCategoryDetail()
    this.props.navigation.goBack()
  }
  goProductDetail = (item) => {
    this.start = 0,
    this.end = END
    this.props.clearCategoryDetail()
  //  this.props.navigation.navigate(SCREENS.CATEGORY_SUB_DETAIL, { [APP_PARAMS.DATA]: item })
    this.props.navigation.push(SCREENS.CATEGORY_SUB_DETAIL, { [APP_PARAMS.DATA]: item })
  }
  selectSortData = (item, index) => {
    let data = this.state.sortData
    data.forEach((element, indx) => {
      if (index === indx) {
        element.isSelected = true
      } else {
        element.isSelected = false
      }
    });
    this.setState({ sortData: data, showSortModalView: false })
    this.start = 0;
    this.end = END;
    if (this.isFrom != undefined && (this.isFrom == 'DealOfTheDay' || this.isFrom == 'OffUpTo')) {
      this.dealsOffUpToAPI(this.start, item.sort)
    } else {
      this.categoryDetailAPI(this.start, item.sort, false)
    }
  }
  cartBtnClk = () => {
    this.props.orderSummaryCallFrom({
      [CONST.IS_FROM]: SCREENS.CART
    })
    this.props.navigation.navigate(SCREENS.ORDER_SUMMARY)
  }
  compareBtnClk = () => {
    this.setState({ isCompare: !this.state.isCompare }, () => {
      let dataTemp = this.state.dataResponse
      let comparedataTemp = this.state.compareProductList
      if(dataTemp&&dataTemp[APP_PARAMS.CAT_RELEATED_PRODUCT]!=undefined){

      dataTemp[APP_PARAMS.CAT_RELEATED_PRODUCT].map((item => {
        let compareTxt = translate('COMPARE')
        if (!this.state.isCompare) {
          comparedataTemp = [];
          compareTxt = ''
        }
        item[APP_PARAMS.COMPARABLE] = compareTxt
      }))
      this.setState({ dataResponse: dataTemp,compareProductList:comparedataTemp })
    }
    })
  }
  compareOrAddedClk = (item, index) => {
      let dataTemp = this.state.dataResponse
      let compareData = this.state.compareProductList ? this.state.compareProductList : []
      let compareDummyARr = this.state.compareArr

      if (item[APP_PARAMS.COMPARABLE] && item[APP_PARAMS.COMPARABLE] === translate('COMPARE')) {
        if (!this.state.compareProductList || this.state.compareProductList.length < 3) {
          item[APP_PARAMS.COMPARABLE] = translate('ADDED')
          compareData.push(item)
          }else{
            showInfoToast(translate('REMOVE_PREV_COMPARE'))
            return;
          }
      } else {
        item[APP_PARAMS.COMPARABLE] = translate('COMPARE')
        compareData.forEach((elemt,index)=>{
          if(elemt[APP_PARAMS.U_UID]===item[APP_PARAMS.U_UID]){
            compareData.splice(index, 1)
          }
        })
      }
      dataTemp[APP_PARAMS.CAT_RELEATED_PRODUCT][index] = item
      this.setState({ dataResponse: dataTemp, compareProductList: compareData })
  }

  goToCompareScrn=()=>{
    let idList = this.state.compareProductList.map(item=>{
      return item[APP_PARAMS.U_UID]
    })
    console.warn("id list::--->>>",JSON.stringify(idList));
    
    this.props.navigation.navigate(SCREENS.COMPARE,{[APP_PARAMS.PRODUCT_ID_LIST]:idList, goBackCompare:(arr)=>{this.comeBackFromCompare(arr)} })
  }

  comeBackFromCompare = (backCompareArr) => {
    let tempArr = this.state.compareProductList;

     let newTempArr =   tempArr.filter((element,index) => {
    //  console.log('index in come back from compare :: ', element.name);
      
        // if(arr.indexOf(element[APP_PARAMS.U_UID]) == -1) {
        //   console.log('item removed ::: '+element.name);
        //   element[APP_PARAMS.COMPARABLE] = translate('COMPARE')
        //     tempArr.splice(index,1)
        // }
        // backCompareArr.forEach(idItem=>{
        //   if(idItem === element[APP_PARAMS.U_UID]){
        //     return element
        //   }
        // })
        element[APP_PARAMS.COMPARABLE] = translate('COMPARE')

        if(backCompareArr. indexOf(element[APP_PARAMS.U_UID]) !== -1){
            element[APP_PARAMS.COMPARABLE] = translate('ADDED')

          console.log("Value exists!"+(element[APP_PARAMS.U_UID]))
          return element                                                                                                                                                                                                                         
          } 
          else{
            console.log("Value does not exists!"+element[APP_PARAMS.U_UID])
         // tempArr.splice(index,1)
          }
         
        });
        console.log('temp Arr after change ::',newTempArr);
        
        this.setState({ compareProductList: newTempArr }, () => {
          console.log('set state')
        });
  }

  applyFilter=(item)=>{
    this.start = 0;
    this.end = END;
    
    this.categoryDetailAPI(this.start,this.sortType,false,item)
  }

  goToFilterScrn=(dataResponse)=>{
    this.props.navigation.navigate(SCREENS.FILTER, {
      item:[... this.state.filterData],
      [APP_PARAMS.TOTAL_PRODUCT_SIZE]: dataResponse.totalProductSize != undefined && dataResponse.totalProductSize,
      applyFilter:(item)=>this.applyFilter(item)
    })
  }
  //RENDER
  renderItem = (item, index) => {
    console.log("render item:;---",item);
    
    return (
      <CommonViewAllItem
        item={item}
        style={{ width: '50%' }}
        onPress={() => this.goProductDetail(item)}
        compareClk={() => this.compareOrAddedClk(item, index)}
      
      />
    )
  }

  renderSortView = () => {
    this.setState({ showSortModalView: true }, () => {
      // console.warn("show sort ",this.state.showSortModalView);
    })
  }

  renderShopByCatProduct = (item, index) => {
    return (
      <View style={{
        alignItems: 'center', justifyContent: 'center', width: WIDTH / 3 - 10,
        margin: DIMENS.px_5,
        borderWidth: .5, borderColor: colors.white,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: .5,
        paddingVertical: DIMENS.px_5
      }}>
        <Ripple style={{}}
          onPress={() => this.onPressCategory(item)}>
          <Image
            source={{ uri: item.imageLocations }}
            style={{
              width: 90,//WIDTH / 3 - 10,
              height: 90,
              resizeMode: 'contain',
            }}
          ></Image>
        </Ripple>
        <Text numberOfLines={1}
          style={{ padding: 5, marginTop: DIMENS.px_5, color: colors.primary, fontSize: DIMENS.txt_size_medium, textAlign: 'center', paddingHorizontal: 2, maxWidth: WIDTH / 3 - 10 }}>
          {(item.value)}</Text>
      </View>
    )
  }

  categoryData = (dataResponse) => {
    //console.warn('categoryData::==',JSON.stringify(dataResponse));
    let isExistProduct = dataResponse[APP_PARAMS.CAT_RELEATED_PRODUCT] && dataResponse[APP_PARAMS.CAT_RELEATED_PRODUCT] != null
      && dataResponse[APP_PARAMS.CAT_RELEATED_PRODUCT].length > 0
    return (
      <View style={{
        borderBottomColor: isExistProduct ? colors.lightGraytransparent : undefined,
        borderBottomWidth: !isExistProduct ? undefined : DIMENS.px_5, flex: isExistProduct ? undefined : 1
      }}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal={isExistProduct ? true : false}
          numColumns={isExistProduct ? undefined : 3}
          data={dataResponse[APP_PARAMS.SUB_CAT]}
          renderItem={({ item, index }) => this.renderShopByCatProduct(item, index)}
          extraData={this.state}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    )
  }
  renderProductfooter = (load) => {
    return (
      <View>
        {
          load &&
          <ActivityIndicator color={colors.primary} size={35} style={{ padding: 10 }} />
        }
      </View>
    )
  }
  reachEndOftblView = (productLength) => {
    // console.warn("productLength::-",productLength,"this.productSize",this.productSize)
    if (this.productSize != productLength) {
      if (this.productSize > this.end) {
        if (this.isFrom != undefined) {
          if (this.isFrom == 'DealsAndOff'){
            this.start = this.start + END
            this.end = this.end + END
            this.dealsOffUpToAPI(this.start, true)
          }
          
        } else {
          this.start = this.start + END
          this.end = this.end + END
          this.categoryDetailAPI(this.start, "popularity", true)
        }
      }
    
    } else {
      //console.warn("productLength::-",productLength,"this.productSize",this.productSize)
    }
     if (this.isFrom == 'Recommanded'){
       if(productLength!=this.productSize){
        this.start = this.start + 1
        this.end = 10
        this.randomProductApi(this.start, true)
       }else
       {
         this.setState({localLoder: false })
        }
    }
  }

  renderCompareItem = (item, index) => {
    return(
      <View style={{ flex: 1, width: WIDTH*0.33, alignItems: 'center', padding: DIMENS.px_10  }}>
        <CommonImage styles={{ height: DIMENS.px_50, width: WIDTH*0.2}} 
        source={item.imageLocations != undefined && item.imageLocations != '' ? { uri: item.imageLocations } :
        PLACEHOLDER_PRODUCT_IMG}/>
        <Text style={{ marginVertical: DIMENS.px_5, fontSize: DIMENS.txt_size_small_12,color:colors.black}}
        numberOfLines={1}>
          {/* {translate('PRODUCT')+" "+(index+1)} */}
          {item.name&&item.name}
          </Text>
        <TouchableOpacity style={{ position: 'absolute', margin: DIMENS.px_5, alignSelf:'flex-end', alignItems: 'center', borderRadius: DIMENS.px_10,
           justifyContent:'center', padding:DIMENS.px_10, height: DIMENS.px_20, width: DIMENS.px_20, right: DIMENS.px_10 }}
           onPress={()=>this.compareOrAddedClk(item)}>
          <Image style={{ height: DIMENS.px_15, width: DIMENS.px_15 }} source={CANCEL} />
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const { loading, data, isLoadMore, sortData, tempData } = this.props
   
    const { dataResponse, localLoder } = this.state
    return (
      <View style={{
        backgroundColor: colors.white,
        flex: 1, width: '100%'
      }}>
        <CommonNavHeader title={this.isFrom != undefined && (this.isFrom == 'DealOfTheDay' || this.isFrom == 'OffUpTo') ? translate('SCREEN_OFFERS') : this.navName != undefined && this.navName}
          rightIcon1={HEART}
          rightIcon={SEARCH}
          rightIcon2={ORDER}
          cartCount={this.state.cartCount}
          wishCount={this.state.wishCount}
          rightIcon1Press={() => this.props.navigation.navigate('Wishlist')}
          searchPress={() => this.props.navigation.navigate('SearchComponent')}
          cartPress={() => this.cartBtnClk()}
          backPress={() =>
            { 
              // this.props.navigation.pop()
              this.props.navigation.goBack()
            }
          } />

        <View style={{flex:1}}>
          {dataResponse != undefined && dataResponse[APP_PARAMS.SUB_CAT] == undefined && this.isFrom != 'Recommanded' &&
            <CompareSortFiltr
              compare={dataResponse && dataResponse[APP_PARAMS.COMPARABLE]}
              onSortPress={() => this.renderSortView()}
              onFilterPress={() =>this.goToFilterScrn(dataResponse)}
              onComparePress={() => this.compareBtnClk()}
            />}
          {
            dataResponse != undefined && dataResponse[APP_PARAMS.SUB_CAT] &&
            dataResponse[APP_PARAMS.SUB_CAT].length > 0 &&
            this.categoryData(dataResponse)
          }
          {dataResponse != undefined && dataResponse[APP_PARAMS.CAT_RELEATED_PRODUCT] && dataResponse[APP_PARAMS.CAT_RELEATED_PRODUCT].length > 0 &&

            <FlatList
            showsVerticalScrollIndicator={false}
              numColumns={2}
              data={dataResponse[APP_PARAMS.CAT_RELEATED_PRODUCT]}
              renderItem={({ item, index }) => this.renderItem(item, index)}
              extraData={this.state}
              keyExtractor={(item, index) => index.toString()}
              onEndReachedThreshold={0.5}
              onEndReached={() => this.reachEndOftblView(dataResponse[APP_PARAMS.CAT_RELEATED_PRODUCT].length)}
              // removeClippedSubviews={false}
              //onRefresh={()=>this.reachEndOftblView(dataResponse[APP_PARAMS.CAT_RELEATED_PRODUCT].length)}

              ListFooterComponent={() => //
                //this.props.isLoadMore &&
                this.props.isLoadMore &&
              <ActivityIndicator color={colors.primary} size={35} style={{ padding: 10 }} />} />
          }
        </View>
        {
          localLoder &&
          <Loader loader={localLoder} />
        }
        {
          this.state.showSortModalView && this.state.sortData != undefined && this.state.sortData != 'null' && this.state.sortData.length > 0 &&
          <SortCompomnent
            data={this.state.sortData}
            modalVisible={this.state.showSortModalView}
            onSelectSort={(item, index) => this.selectSortData(item, index)}
            closePopOver={() => this.setState({ showSortModalView: false })}
          />
        }
        {
          this.state.isCompare &&this.state.compareProductList&&this.state.compareProductList.length >= 1 &&
        <View style={{  bottom: DIMENS.px_0, right: DIMENS.px_0, left: DIMENS.px_0, backgroundColor: colors.white,
                           borderTopColor: colors.lightGrayText, borderTopWidth: DIMENS.px_1 }}>
               <FlatList
               horizontal={true}
               data={this.state.compareProductList}//{this.state.compareArr}
               renderItem={({ item, index }) => this.renderCompareItem(item, index)}
               extraData={this.state}
               keyExtractor={(item, index) => index.toString()}
                /> 
            <Ripple style={{ flexDirection: 'row', backgroundColor:this.state.compareProductList.length==1?colors.grayClr :colors.primary, alignItems: 'center', justifyContent: 'center', padding: DIMENS.px_10}}
            disabled={this.state.compareProductList.length==1?true:false} onPress={()=>this.goToCompareScrn()}>
              <Text style={{ color: colors.white, fontSize: DIMENS.txt_size_medium,paddingVertical:DIMENS.px_5 }} >
                {this.state.compareProductList.length==1?translate('SELECT_ITEM_FOR_COMPARE'):translate('COMPARE_NOW')}</Text>
            </Ripple>
        </View> 
        }
      </View>
    )
  }
}