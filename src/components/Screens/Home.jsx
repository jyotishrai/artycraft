import React from 'react'
import {
  ScrollView,
  Text, Image,
  RefreshControl, FlatList,
  View, Dimensions, DeviceEventEmitter
} from 'react-native'
import Ripple from 'react-native-material-ripple';
import styles from '../Auth/styles'
import { colors } from '../../theme';
import { SHOP_CART } from '../../images'
import CommonHeaderHome from '../../common/CommonHeaderHome'
import translate from '../../i18n/i18n';
import CommonSearch from '../../common/CommonSearch';
import ImageSlider from 'react-native-image-slider';
import { DIMENS, FONT_FAMILIY, WIDTH, HEIGHT, APP_PARAMS, KEY, CONST, SCREENS } from '../../constants';
import CommonButton from '../../common/CommonButton';
import CommonProductRow, { CommonHorizontailList, CommonSimmilarItem } from '../../common/CommonProductRow';
import * as Utils from '../../utility/Utils'
import Loader from '../../common/Loader'
import CommonImage from '../../common/CommonImage'

const { width, height } = Dimensions.get('window')

export default class Home extends React.PureComponent {
  constructor(props) {
    super(props)
    this.focusHomeListener = this.props.navigation.addListener('didFocus', this.onDidFoucs);
    this.linkerListner = DeviceEventEmitter.addListener(CONST.DEEP_LINK, this.navigateProductDetail)
    this.notifyListner = DeviceEventEmitter.addListener(CONST.NOTYFY_MOVE, this.notificationMoveScren)
    this.notifyListnerCount = DeviceEventEmitter.addListener(CONST.NOTYFY_COUNT, this.updateNotificationCount)

    // this.sliderData = [{ bannerImages: require('../../assets/images/image1.png'),iamge:'1' },
    // { bannerImages: require('../../assets/images/image1.png'),iamge:'1' },
    // { bannerImages: require('../../assets/images/image1.png'),iamge:'1' }]
    this.state = {
      homeDataArr: undefined,
      isPullRefresh: false,

      // shopByCatArr: [{ uri: SHOP_CART, cat_name: 'Mobiles' }, { uri: SHOP_CART, cat_name: "Men's" },
      // { uri: SHOP_CART, cat_name: "Women's" }, { uri: SHOP_CART, cat_name: 'Electronics' }, { uri: SHOP_CART, cat_name: 'Electronics' },
      //  { uri: SHOP_CART, cat_name: 'Electronics' }],
      adDataArr: [{ uri: SHOP_CART }, { uri: SHOP_CART }],
      dealsdataArr:
        [{ uri: require('../../assets/images/shoe.png'), price: '799', name: 'Nike,Asics & more' }, { uri: require('../../assets/images/shoe.png'), price: '799', name: 'Nike,Asics & more' },
        { uri: require('../../assets/images/micro.png'), price: '799', name: 'Nike,Asics & more' }, { uri: require('../../assets/images/shoe.png'), price: '799', name: 'Nike,Asics & more' }],
      updateHome: false,
      cartCount: undefined,
      wishCount: undefined,
      notificationCount: undefined,
      // TradingOfferArr:[{ uri: require('../../assets/images/shoe.png'),discountPrice:'799',price:'1500',offer:'30%',name:'Nike,Asics & more'},{ uri: require('../../assets/images/shoe.png'),discountPrice:'799',price:'1500',offer:'30%',name:'Nike,Asics & more'},
      // { uri: require('../../assets/images/micro.png'),discountPrice:'799',price:'1500',offer:'30%',name:'Nike,Asics & more'},{ uri: require('../../assets/images/shoe.png'),discountPrice:'799',price:'1500',offer:'30%',name:'Nike,Asics & more'}],

    }

    if (this.props.navigation.state.params != undefined && this.props.navigation.state.params[APP_PARAMS.PAGE_TYPE] != undefined && this.props.navigation.state.params[APP_PARAMS.PAGE_TYPE] != '') {
      this.props.navigation.navigate(this.props.navigation.state.params[APP_PARAMS.PAGE_TYPE])
    }
  }
  componentDidMount() {
    //this.setState({ isPullRefresh: false })
    global[KEY.NEXT] = 0
    this.homeListData();
  }
  componentWillUnmount(){
    this.focusHomeListener.remove()
    this.linkerListner.remove()
    this.notifyListner.remove()
    DeviceEventEmitter.removeListener(CONST.NOTYFY_MOVE, this.notificationMoveScren)
  }
  //Deep linking
  navigateProductDetail = (data) => {
    console.log("navigateProductDetail:::-home-",data);

    DeviceEventEmitter.removeListener(CONST.DEEP_LINK, this.navigateProductDetail)
    this.props.navigation.navigate(SCREENS.CATEGORY_SUB_DETAIL, {[APP_PARAMS.DATA]: data })
  }
  notificationMoveScren=(data)=>{
    // DeviceEventEmitter.removeListener(CONST.NOTYFY_MOVE, this.notificationMoveScren)
   // this.notifyListner.remove()
    console.log("data::--",data);
    this.props.navigation.navigate(SCREENS.NOTIFICATION,{data:data})
    //  if(data[APP_PARAMS.TYPE]==CONST.ORDER_REQ){
      
    //  }
  }
  updateNotificationCount=()=>{
    this.setState({
      notificationCount:global[KEY.NOTICATION_COUNT]
    })
  }
  onDidFoucs = () => {
    this.setState({ updateHome: !this.state.updateHome })
    global[KEY.CART_COUNT] != undefined &&
      this.setState({ cartCount: global[KEY.CART_COUNT] })
    global[KEY.WISH_COUNT] != undefined &&
      this.setState({ wishCount: global[KEY.WISH_COUNT] })
  }
  homeListData = async () => {
    const { homeApiReq } = this.props
    let userDetailId = global[KEY.USER_DATA] != undefined ? global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID] : ''
    let dataReq = { [APP_PARAMS.USER_ID]: userDetailId, [APP_PARAMS.REQ_ID]: Utils.getDeviceId() }
    homeApiReq(dataReq).then(result => {
      if (result) {
        if (!result.hasOwnProperty(APP_PARAMS.ERROR) || result.hasOwnProperty(APP_PARAMS.SUCCESS)
          && result[APP_PARAMS.SUCCESS]) {
          if (result.hasOwnProperty(APP_PARAMS.DATA)) {
            if (result[APP_PARAMS.DATA][APP_PARAMS.CART_LIST]) {
              global[KEY.CART_COUNT] = result[APP_PARAMS.DATA][APP_PARAMS.CART_LIST]
            }
            if (result[APP_PARAMS.DATA][APP_PARAMS.CART_LIST]) {
              global[KEY.CART_COUNT] = result[APP_PARAMS.DATA][APP_PARAMS.CART_LIST]
            }
            
            if (result[APP_PARAMS.DATA][APP_PARAMS.WISH_LIST]) {
              global[KEY.WISH_COUNT] = result[APP_PARAMS.DATA][APP_PARAMS.WISH_LIST]
            }
            if (result[APP_PARAMS.DATA][APP_PARAMS.NOTIFICATION_COUNT]) {
              global[KEY.NOTICATION_COUNT] = result[APP_PARAMS.DATA][APP_PARAMS.NOTIFICATION_COUNT]

            }
            this.setState({ homeDataArr: result[APP_PARAMS.DATA], wishCount: global[KEY.WISH_COUNT], cartCount: global[KEY.CART_COUNT],notificationCount:global[KEY.NOTICATION_COUNT] })
          }
        } else if (result[APP_PARAMS.MESSAGE]) {
          Utils.showInfoToast([APP_PARAMS.MESSAGE])
        }
      } else {
        Utils.showInfoToast(translate('MESSAGE_SERVER_ERROR'))
      }
    })
  }
  cartBtnClk = () => {
    this.props.orderSummaryCallFrom({
      [CONST.IS_FROM]: SCREENS.CART
    })
    this.props.navigation.navigate(SCREENS.ORDER_SUMMARY)
  }
  renderShopByCatProduct = (item) => {
    console.log("render shop by cat:::", item.imageLocations);

    return (
      <View style={{ width: DIMENS.cat_img_width + 10, justifyContent: 'center', alignItems: 'center', marginTop: DIMENS.px_20 }}>
        <Ripple style={styles.catImgBackgroundView}
          onPress={() => this.props.navigation.navigate(SCREENS.CATEGORY_DETAIL, { [APP_PARAMS.CAT_ID]: item[APP_PARAMS.id], name: item.categoryName })}>
          {/* <Image source={{ uri: item.imageLocations }} style={styles.catImg} /> */}
          <CommonImage
            source={{ uri: item.imageLocations }}
            styles={styles.catImg}
          ></CommonImage>
        </Ripple>
        <Text numberOfLines={1} style={{ marginTop: DIMENS.px_5, color: colors.primary, fontSize: DIMENS.txt_size_medium, textAlign: 'center', paddingHorizontal: 2 }}>
          {item.categoryName}</Text>
      </View>
    )
  }
  renderAdView = () => {
    return (
      <View style={{ width: width / 2, marginHorizontal: 1 }}>
        <Image source={require('../../assets/images/advertise.png')} style={{ width: width / 2 - DIMENS.px_8, height: (height * 20) / 100 }} resizeMode={'stretch'} />
      </View>
    )
  }
  renderDealsProduct = (item) => {
    return (
      <CommonProductRow
        onPress={() => {
          //   console.log('item' + item[APP_PARAMS.U_UID]),
          this.props.navigation.navigate('CategorySubDetail', { [APP_PARAMS.DATA]: item })
        }}
        item={item}
        style={{
          width: this.state.homeDataArr != undefined && this.state.homeDataArr['dealOfTheDayProducts'] != undefined &&
            this.state.homeDataArr['dealOfTheDayProducts'].length > 0 ? (this.state.homeDataArr['dealOfTheDayProducts'].length > 1 ? '50%' : '100%') : '50%'
        }}
      />
    )
  }
  renderTreadingView = (item) => {
    return (
      <CommonHorizontailList
        item={item}
        style={{
          width: this.state.homeDataArr != undefined && this.state.homeDataArr['offUptoProducts'] != undefined &&
            this.state.homeDataArr['offUptoProducts'].length > 0 &&
            this.state.homeDataArr['offUptoProducts'].length > 1 ? WIDTH / 2 - 10 : '100%'
        }}
        onPress={() => this.props.navigation.navigate('CategorySubDetail', { [APP_PARAMS.DATA]: item })}
      />
    )
  }
  renderRandomProduct = (item) => {
    return (
      <CommonSimmilarItem
        item={item}
        onPress={() => this.props.navigation.navigate('CategorySubDetail', { [APP_PARAMS.DATA]: item })} />

    )
  }
  render() {
    const { loading } = this.props
    console.log(' this.state.homeDataArr::---loading', loading);

    return (
      <View style={{
        backgroundColor: colors.white,
        flex: 1, width: '100%',
      }}>
        {/* Navigation */}
        <CommonHeaderHome
          cartCount={this.state.cartCount}
          wishCount={this.state.wishCount}
          notificationCount={this.state.notificationCount}
          wishlistPress={() => this.props.navigation.navigate(SCREENS.WISHLIST)}
          notificationPress={()=>this.props.navigation.navigate(SCREENS.NOTIFICATION )}
          cartPress={() => this.cartBtnClk()}
          menuPress={() => this.props.navigation.openDrawer()} />
        {/* Search */}
        <CommonSearch onSearchPress={() => this.props.navigation.navigate('SearchComponent')} />
        {/*Spier Image*/}
        {
          this.state.homeDataArr != undefined &&
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={this.state.isPullRefresh && this.props.loading}
                onRefresh={() => {
                  this.setState({ isPullRefresh: false }, () => this.homeListData())
                }} />}>
            <View>
              {
                this.state.homeDataArr != undefined && this.state.homeDataArr['bannersList'] != undefined && this.state.homeDataArr['bannersList'].length > 0 &&
                <View style={{ height: (height * 25) / 100, width: width, marginVertical: DIMENS.px_10 }}>
                  <ImageSlider
                    loopBothSides
                    autoPlayWithInterval={2000}
                    images={this.state.homeDataArr['bannersList']}//{this.sliderData}
                    style={{ backgroundColor: colors.white }}
                    customSlide={({ index, item, width }) => (
                      // It's important to put style here because it's got offset inside
                      <View key={index} style={{ marginHorizontal: 5, overflow: 'hidden' }} >
                        <CommonImage
                          source={{ uri: item.bannerImages }}
                          styles={{ width: width - 10, height: ((height * 25) / 100), resizeMode: 'stretch', borderRadius: 4 }}
                          resizeMode={'stretch'}></CommonImage>
                      </View>
                    )}
                  />
                </View>
              }

              {/*Shop Category View*/}
              {
                this.state.homeDataArr != undefined && this.state.homeDataArr['randomCategories'] != undefined &&
                <View style={{ marginVertical: 10, }}>
                  <Text style={{ marginHorizontal: DIMENS.px_10, fontSize: DIMENS.txt_size_large, color: colors.primary, fontFamily: FONT_FAMILIY.Roboto_Regular, fontWeight: '100' }}>
                    {translate('SHOP_BY_CAT')}
                  </Text>
                  <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={this.state.homeDataArr['randomCategories']}//{this.state.shopByCatArr}
                    renderItem={({ item, index }) => this.renderShopByCatProduct(item, index)}
                    extraData={this.state}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </View>
              }
              {/*Separator View */}
              <View style={{
                backgroundColor: colors.lightGraytransparent,
                height: DIMENS.px_10, width: '100%',
                marginTop: DIMENS.px_10
              }} />
              {/* Recommanded product */}
              {
                this.state.homeDataArr != undefined && this.state.homeDataArr['randomProducts'] != undefined &&

                <View style={{ marginBottom: 5 }}>
                  <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={[{ marginVertical: DIMENS.px_10, marginRight: 5 }, styles.homePageTitle]}>
                      {translate('RECOMMANDED')}</Text>
                    <CommonButton style={styles.viewBtn} textStyle={{ paddingVertical: DIMENS.px_5, paddingHorizontal: DIMENS.px_12, fontSize: DIMENS.txt_size_medium }}
                      onPress={() => this.props.navigation.navigate('CategoryDetail', { isFrom: 'Recommanded' })} />
                  </View>
                  <View style={{ backgroundColor: colors.white, marginTop: DIMENS.px_5, marginHorizontal: DIMENS.px_10 }}>
                    <FlatList
                      showsHorizontalScrollIndicator={false}
                      numColumns={2}
                      data={this.state.homeDataArr['randomProducts']}
                      renderItem={({ item, index }) => this.renderRandomProduct(item, index)}
                      extraData={this.state}
                      keyExtractor={(item, index) => index.toString()}
                    />
                  </View>
                </View>
              }
              {/** DISCUNT Product */}
              {
                this.state.homeDataArr != undefined && this.state.homeDataArr['discountProducts'] != undefined && this.state.homeDataArr['discountProducts'].length > 0 &&
                <View style={{ marginBottom: 5 }}>
                  <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={[{ marginVertical: DIMENS.px_10, marginRight: 5 }, styles.homePageTitle]}>{this.state.homeDataArr[APP_PARAMS.OFF_IN_PER] != undefined && this.state.homeDataArr[APP_PARAMS.OFF_IN_PER] != ''
                      && this.state.homeDataArr[APP_PARAMS.OFF_IN_PER] != 0 ? `${translate('TREND_OFFER_TITLE')} Upto ${this.state.homeDataArr[APP_PARAMS.OFF_IN_PER]}% ${translate('OFF')}` : translate('TREND_OFFER_TITLE')}</Text>
                    <CommonButton style={styles.viewBtn} textStyle={{ paddingVertical: DIMENS.px_5, paddingHorizontal: DIMENS.px_12, fontSize: DIMENS.txt_size_medium }}
                      onPress={() => this.props.navigation.navigate('CategoryDetail', { isFrom: 'OffUpTo' })} />
                  </View>
                  <View style={{ backgroundColor: colors.white, marginTop: DIMENS.px_5, marginHorizontal: DIMENS.px_10 }}>
                    <FlatList
                      horizontal={this.state.homeDataArr != undefined && this.state.homeDataArr['discountProducts'] != undefined &&
                        this.state.homeDataArr['discountProducts'].length > 0 &&
                        this.state.homeDataArr['discountProducts'].length > 1 ? true : false}
                      showsHorizontalScrollIndicator={false}
                      data={this.state.homeDataArr['discountProducts']}//{this.state.TradingOfferArr}
                      renderItem={({ item, index }) => this.renderTreadingView(item, index)}
                      extraData={this.state}
                      keyExtractor={(item, index) => index.toString()}
                    />
                  </View>
                </View>
              }

              {/* Ad View*/}

              <View style={{ marginHorizontal: DIMENS.px_8, marginTop: DIMENS.px_10 }}>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  scrollEnabled={false}
                  data={this.state.adDataArr}
                  renderItem={({ item, index }) => this.renderAdView(item, index)}
                  extraData={this.state}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>

              {/*Separator View */}
              <View style={{ backgroundColor: colors.lightGraytransparent, height: DIMENS.px_10, width: '100%', marginTop: DIMENS.px_10 }} />


              {/*Product view*/}
              <View style={{ backgroundColor: colors.whiteBackground }}>
                {/*Deals view*/}
                {
                  this.state.homeDataArr != undefined && this.state.homeDataArr['dealOfTheDayProducts'] != undefined && this.state.homeDataArr['dealOfTheDayProducts'].length > 0 &&
                  <View>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={[{ margin: DIMENS.px_10 }, styles.homePageTitle]}>{translate('DEEL_OF_DAY')}</Text>
                      <CommonButton style={styles.viewBtn} textStyle={{ paddingVertical: DIMENS.px_5, paddingHorizontal: DIMENS.px_12, fontSize: DIMENS.txt_size_medium }}
                        onPress={() => this.props.navigation.navigate('CategoryDetail', { isFrom: 'DealOfTheDay' })} />
                    </View>
                    <View style={{ backgroundColor: colors.white, marginTop: DIMENS.px_5, marginHorizontal: DIMENS.px_10 }}>
                      <FlatList
                        numColumns={this.state.homeDataArr['dealOfTheDayProducts'].length > 1 ? 2 : 1}
                        showsHorizontalScrollIndicator={false}
                        data={this.state.homeDataArr['dealOfTheDayProducts']}//{this.state.dealsdataArr}//
                        renderItem={({ item, index }) => this.renderDealsProduct(item, index)}
                        extraData={this.state}
                        keyExtractor={(item, index) => index.toString()}
                      />
                    </View>
                  </View>
                }
                {/* Ad PROMOView */}
                <View style={{ margin: DIMENS.px_10, }}>
                  <Image style={{ width: WIDTH - 20, height: HEIGHT * 18 / 100, resizeMode: 'stretch', borderRadius: DIMENS.px_5 }} source={require('../../assets/images/adImg.png')} />
                </View>

                {/*Trending Offers*/}
                {
                  // this.state.homeDataArr != undefined && this.state.homeDataArr['discountProducts'] != undefined && this.state.homeDataArr['discountProducts'].length > 0 &&
                  this.state.homeDataArr != undefined && this.state.homeDataArr['offUptoProducts'] != undefined && this.state.homeDataArr['offUptoProducts'].length > 0 &&
                  <View style={{ marginBottom: 5 }}>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={[{ marginVertical: DIMENS.px_10, marginRight: 5 }, styles.homePageTitle]}>{this.state.homeDataArr[APP_PARAMS.OFF_IN_PER] != undefined && this.state.homeDataArr[APP_PARAMS.OFF_IN_PER] != ''
                        && this.state.homeDataArr[APP_PARAMS.OFF_IN_PER] != 0 ? `${translate('TREND_OFFER_TITLE')} Upto ${this.state.homeDataArr[APP_PARAMS.OFF_IN_PER]}% ${translate('OFF')}` : translate('TREND_OFFER_TITLE')}</Text>
                      <CommonButton style={styles.viewBtn} textStyle={{ paddingVertical: DIMENS.px_5, paddingHorizontal: DIMENS.px_12, fontSize: DIMENS.txt_size_medium }}
                        onPress={() => this.props.navigation.navigate('CategoryDetail', { isFrom: 'OffUpTo' })} />
                    </View>
                    <View style={{ backgroundColor: colors.white, marginTop: DIMENS.px_5, marginHorizontal: DIMENS.px_10 }}>
                      <FlatList
                        horizontal={this.state.homeDataArr != undefined && this.state.homeDataArr['offUptoProducts'] != undefined &&
                          this.state.homeDataArr['offUptoProducts'].length > 0 &&
                          this.state.homeDataArr['offUptoProducts'].length > 1 ? true : false}
                        showsHorizontalScrollIndicator={false}
                        data={this.state.homeDataArr['offUptoProducts']}//{this.state.TradingOfferArr}
                        renderItem={({ item, index }) => this.renderTreadingView(item, index)}
                        extraData={this.state}
                        keyExtractor={(item, index) => index.toString()}
                      />
                    </View>
                  </View>
                }

                {/* Top Selection */}
                {/*                 
                <View>
                  <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={[{ margin: DIMENS.px_10 }, styles.homePageTitle]}>{translate('TOP_SELECTION')}</Text>
                    <CommonButton style={styles.viewBtn} textStyle={{ paddingVertical: DIMENS.px_5, paddingHorizontal: DIMENS.px_12, fontSize: DIMENS.txt_size_medium }} />
                  </View>
                  <View style={{ backgroundColor: colors.white, marginTop: DIMENS.px_5, marginHorizontal: DIMENS.px_10 }}>
                    <FlatList
                      numColumns={2}
                      showsHorizontalScrollIndicator={false}
                      data={this.state.dealsdataArr}
                      renderItem={({ item, index }) => this.renderDealsProduct(item, index)}
                      extraData={this.state}
                      keyExtractor={(index) => index.toString()}
                    />
                  </View>
                </View> */}
              </View>
            </View>
          </ScrollView>
        }
        {
        !this.state.isPullRefresh && loading &&
          <Loader loader={true} />
        }
      </View>
    )
  }
}