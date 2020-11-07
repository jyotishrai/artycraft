import React from 'react'
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text, Image,
    TouchableOpacity, FlatList,
    View, Dimensions, TextInput, SectionList
} from 'react-native'
import Ripple from 'react-native-material-ripple';
import styles from '../Auth/styles'
import { colors } from '../../theme';
import { DELETE, STAR, DELTE_BG, EDIT_BG, PLACEHOLDER_PRODUCT_IMG, PLACEHOLDER_PRODUCT, NEXT } from '../../images'
import translate from '../../i18n/i18n';
import { DIMENS, FONT_FAMILIY, WIDTH, HEIGHT, CURRENCY, APP_PARAMS, SCREENS, CONST, KEY } from '../../constants';
import Basecomponents from '../../common/BaseComponent';
import CommonNavHeader from '../../common/CommonNavHeader';
import { CommonBillingView } from '../../common/CommonProductRow';
import * as Utils from '../../utility/Utils';
import * as Toast from '../../utility/Toast';
import CommonDialog from '../../common/CommonDialog';
import Loader from '../../common/Loader';
import { CommonEmptyView } from '../../common/CommonEmptyView';
import NavigationService from '../../NavigationService';

export default class MyReview extends Basecomponents {
    constructor(props) {
        super(props)
        this.item = undefined,
        this.index = undefined
        this.state = {
            isSelectPendig: false,
            reviewListArr: undefined,
            deleteReview:false
            // [
            //     { title: 'Product Reviews written by you...', uri: require('../../assets/images/phone.png'), subtitle: 'Flipkart SmaryBuy 1000 W Dry Iron', ratting: '3.3', date: '7 DEC 2019', desc: 'It is Long established fact that a reader It is Long established fact that a reader It is Long established fact that a reader' },
            //     { title: 'Product Reviews written by you...', uri: require('../../assets/images/phone.png'), subtitle: 'Flipkart SmaryBuy 1000 W Dry Iron', ratting: '3.3', date: '7 DEC 2019', desc: 'It is Long established fact that a reader It is Long established fact that a reader It is Long established fact that a reader' },
            //     { title: 'Product Reviews written by you...', uri: require('../../assets/images/phone.png'), subtitle: 'Flipkart SmaryBuy 1000 W Dry Iron', ratting: '3.3', date: '7 DEC 2019', desc: 'It is Long established fact that a reader It is Long established fact that a reader It is Long established fact that a reader' },
            //     { title: 'Product Reviews written by you...', uri: require('../../assets/images/phone.png'), subtitle: 'Flipkart SmaryBuy 1000 W Dry Iron', ratting: '3.3', date: '7 DEC 2019', desc: 'It is Long established fact that a reader It is Long established fact that a reader It is Long established fact that a reader' }]
        }
    }

    componentDidMount() {
        this.commentReviewListAPI()
      }

    //Action
    selectReviewOption = (flag) => {
        let reviewTapOne = flag == 1 ? true : false
        this.setState({ isSelectPendig: reviewTapOne })
    }
    goBackFromReviewRattting=(item)=>{
        console.log("goBackFromReviewRattting:::item::--"+JSON.stringify(item))
        if(this.state.reviewListArr&&this.state.reviewListArr.length>0){
            let newArr = this.state.reviewListArr
            newArr.map((newItem,index)=>{
                if(newItem[APP_PARAMS.U_UID]===item[APP_PARAMS.U_UID]){
                    newArr[index] = item
                }
            })
            this.setState({reviewListArr:newArr})
        }
    }
    editReviewRatting=(item)=>{
        this.props.navigation.navigate(SCREENS.REVIEW_RATING,
            { 
                [APP_PARAMS.BUYED_BY_ME]:true,// this.state.productDetail[APP_PARAMS.IS_REVIEWED_BY_ME]!=undefined &&  this.state.productDetail[APP_PARAMS.IS_REVIEWED_BY_ME]==true?true:false, 
                product: item,
                Default_Rating: item[APP_PARAMS.STAR],
                [APP_PARAMS.USER_REIEW]:item,
                [CONST.IS_FROM]:SCREENS.MY_REVIEW,
                goBackFromReviewRattting:(item)=>this.goBackFromReviewRattting(item)
             })
    }
    deleteReviewRattingAPI=()=>{
        this.setState({ deleteReview: false })
        this.item&&
        this.props.deleteCommentReviewAPI(this.item[APP_PARAMS.U_UID]).then(result=>{
            console.warn("delete review::--",JSON.stringify(result));
            
            if (result) {
                if (result.hasOwnProperty(APP_PARAMS.SUCCESS) && result[APP_PARAMS.SUCCESS]) {
                    if (result.hasOwnProperty(APP_PARAMS.DATA)) {
                        if(result.data==true){
                            let newArr = this.state.reviewListArr
                            newArr.splice(this.index ,1)
                            this.setState({ reviewListArr: newArr })

                        }
                        result[APP_PARAMS.MESSAGE]&&
                            Toast.showErrorToast(result[APP_PARAMS.MESSAGE])
                        
                    } else if (result[APP_PARAMS.MESSAGE]) {
                        Toast.showErrorToast(result[APP_PARAMS.MESSAGE])
                    }
                } else {
                    Toast.showErrorToast(translate('MESSAGE_SERVER_ERROR'))
                }

            } else {
                Toast.showErrorToast(translate('MESSAGE_SERVER_ERROR'))
            }
        })
    }
    commentReviewListAPI = () => {

        this.props.getCommentReviewListAPI().then(result => {
            console.warn('result review rating list api', JSON.stringify(result));
            if (result) {
                if (result.hasOwnProperty(APP_PARAMS.SUCCESS) && result[APP_PARAMS.SUCCESS]) {
                    if (result.hasOwnProperty(APP_PARAMS.DATA)) {
                        this.setState({ reviewListArr: result[APP_PARAMS.DATA] })

                    } else if (result[APP_PARAMS.MESSAGE]) {
                        Toast.showErrorToast(result[APP_PARAMS.MESSAGE])
                    }
                } else {
                    Toast.showErrorToast(translate('MESSAGE_SERVER_ERROR'))
                }

            } else {
                Toast.showErrorToast(translate('MESSAGE_SERVER_ERROR'))
            }
        })

    }

    //RENDER Item
    renderItem = (item, index) => {
        return (
            <View style={{ borderBottomColor: colors.lightGraytransparent, borderBottomWidth: DIMENS.px_5, width: '100%', }}>
                <View style={{ paddingHorizontal: DIMENS.px_10, paddingVertical: DIMENS.px_10 }}>
                    {/* <Text style={{
                    color: colors.black, fontSize: DIMENS.txt_size_medium_1,
                    fontFamily: FONT_FAMILIY.Roboto_Regular, marginLeft: WIDTH * 20 / 100 //DIMENS.px_15
                }}>
                    {item.title}</Text> */}
                    <View style={{ flexDirection: 'row', flex: 1 }}>

                        <View style={{ flexDirection: 'row', flex: !this.state.isSelectPendig ? .85 : 1, paddingHorizontal: DIMENS.px_5 }}>
                            <Ripple onPress={() => this.props.navigation.navigate(SCREENS.CATEGORY_SUB_DETAIL, { [APP_PARAMS.DATA]: item,[CONST.IS_FROM] :SCREENS.MY_REVIEW })
                            }>
                                <Image source={item.productImageLocations&&item.productImageLocations!=''?{uri:item.productImageLocations}:PLACEHOLDER_PRODUCT_IMG} //item.imageLocations&&item.imageLocations!=''?{uri:item.imageLocations}:
                                    style={{ width: WIDTH * 25 / 100, height: DIMENS.px_90, flex: 2, resizeMode: 'contain', borderColor: colors.lightGrayClr, borderWidth: DIMENS.px_1 }} />
                            </Ripple>
                            <View style={{ paddingHorizontal: 15, flex: 8 }}>
                                {/* <Text style={{
                                color: colors.lightGrayClr, fontSize: DIMENS.txt_size_medium,
                                fontFamily: FONT_FAMILIY.Roboto_Regular,
                            }}>
                                {translate('RATE_PRODUCT')}</Text> */}
                                <Text style={{
                                    color: colors.black, fontSize: DIMENS.txt_size_medium,
                                    fontFamily: FONT_FAMILIY.Roboto_Regular,
                                }}>
                                    {item[APP_PARAMS.PRODUCT_NAME]}</Text>
                                {
                                    item.description != undefined && //this.state.isSelectPendig === true &&
                                    <View style={{ marginTop: DIMENS.px_5 }}>
                                        <Text style={{ color: colors.lightGrayClr, fontSize: DIMENS.txt_size_small_12, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                                            {item.description}</Text>
                                    </View>
                                }
                                {
                                    item[APP_PARAMS.STAR] != undefined &&
                                    <View style={{ flexDirection: 'row', marginTop: DIMENS.px_5, alignItems: 'flex-start' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={{ color: colors.green, fontSize: DIMENS.txt_size_medium, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                                                {item[APP_PARAMS.STAR]}</Text>
                                            <Image source={STAR} style={{ width: DIMENS.px_5, height: DIMENS.px_5, marginHorizontal: DIMENS.px_2 }} />
                                        </View>
                                        <Text style={{ color: colors.lightGrayClr, fontSize: DIMENS.txt_size_small_12, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                                            {item.createTime}</Text>
                                    </View>}
                            </View>
                        </View>
                        {
                            !this.state.isSelectPendig === true &&
                            <View style={{
                                position: 'absolute', //paddingVertical: DIMENS.px_15,
                                flex: .15, right: 5, flexDirection: 'row'
                            }}>
                                <Ripple style={{
                                    width: 30, //height: 30,
                                }} onPress={() => this.editReviewRatting(item)}>
                                    <Image source={EDIT_BG} style={{ width: 30, height: 20 }} resizeMode={'contain'} />
                                </Ripple>
                                <Ripple style={{
                                    width: 30, //height: 50,
                                }} onPress={() => {
                                    this.item = item;
                                    this.index = index;
                                    this.setState({deleteReview:true})
                                }}>
                                    <Image source={DELTE_BG} style={{ width: 30, height: 20 }} resizeMode={'contain'} />
                                </Ripple>
                            </View>
                        }
                    </View>
                    {
                        item.description != undefined && this.state.isSelectPendig === true &&
                        <View style={{ flex: 1, marginLeft: WIDTH * 20 / 100, marginTop: -DIMENS.px_20 }}>
                            <Text style={{ color: colors.black, fontSize: DIMENS.txt_size_small_12, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                                {item.description}</Text>
                        </View>
                    }

                    {
                        //this.state.isSelectPendig === true && 
                        // <Ripple style={{
                        //     backgroundColor:!this.state.isSelectPendig?colors.primary:undefined,
                        //     borderRadius: DIMENS.px_2,
                        //     justifyContent: 'center',marginVertical:!this.state.isSelectPendig?DIMENS.px_20:undefined
                        //    }}
                        //    onPress={()=>!this.state.isSelectPendig&&this.props.navigation.navigate('ReviewRating')}>
                        //      <Text style={{color:!this.state.isSelectPendig?colors.white:colors.primary,fontFamily:FONT_FAMILIY.Roboto_Regular,fontSize:DIMENS.txt_size_medium,textAlign:'center',
                        //      paddingVertical:DIMENS.px_15,fontWeight:'500'}}>
                        //         {this.state.isSelectPendig?translate('MORE').toUpperCase():
                        //         translate('WRITE_IMAGE').toUpperCase()}</Text>
                        // </Ripple>
                    }
                </View>
            </View>
        )
    }
    render() {
        const {loading} = this.props

        return (
            <View style={{ flex: 1 }}>
                <CommonNavHeader title={translate('SCREEN_MY_REVIEW')}
                    backPress={() => this.props.navigation.goBack()} />
                <View style={{ flex: 1 }}>
                    {/*Upper View */}
                    {/* {
                        <View style={{
                            borderBottomColor: colors.lightGraytransparent,
                            borderBottomWidth: DIMENS.px_1,
                            justifyContent: 'space-evenly',
                            flexDirection: 'row'
                        }}>
                            <Ripple style={{ paddingVertical: DIMENS.px_15, width: WIDTH / 2, flexDirection: 'row', backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', }}
                                onPress={() => this.selectReviewOption(1)}>
                                <Text style={{ color: this.state.isSelectPendig ? colors.primary : colors.lightGrayText, fontSize: DIMENS.px_14, fontFamily: FONT_FAMILIY.Roboto_Regular, textAlign: 'center' }}>{translate('PENDING')}</Text>
                            </Ripple>
                            <Ripple style={{ paddingVertical: DIMENS.px_15, width: WIDTH / 2, flexDirection: 'row', backgroundColor: colors.white, alignItems: 'center', borderRadius: 2, justifyContent: 'center', }}
                                onPress={() => this.selectReviewOption(2)}>
                                <Text style={{ color: !this.state.isSelectPendig ? colors.primary : colors.lightGrayText, fontSize: DIMENS.px_14, fontFamily: FONT_FAMILIY.Roboto_Regular, textAlign: 'center' }}>{translate('PUBLISHED')}</Text>
                            </Ripple>
                        </View>
                    } */}
                    {
                        /*isPending*/
                        // this.state.isSelectPendig ?
                        this.state.reviewListArr && this.state.reviewListArr.length > 0 ?

                        <FlatList style={{}}
                            showsVerticalScrollIndicator={false}
                            data={this.state.reviewListArr}
                            renderItem={({ item, index }) => this.renderItem(item, index)}
                            extraData={this.state}
                            keyExtractor={(item, index) => index.toString()}
                        />:
                        <CommonEmptyView
                        image={PLACEHOLDER_PRODUCT}
                        title={
                            translate('REVIEW_MZG_EMPTY')  }
                        // subtitle={global[KEY.USER_DATA] != undefined && global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID]!= undefined?
                        //     translate('SUB_TITLE_NOT_PURCHED') :  translate('SUB_TITLE_RATE_ITEM')}
                        //btntext1={global[KEY.USER_DATA] != undefined && global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID]!= undefined?undefined: translate('LOGIN')  }
                        //onPress1={() => this.goToLogin() } //this.props.navigation.navigate('Auth')
                        btntext2={translate('CONTINUE_SHOPPING')}
                        onPress2={() => NavigationService.clearStack('Drawer')}
                        btntextImg2={NEXT}
                         />
                      
                    }
                    {
                        this.state.deleteReview&&
                        <CommonDialog
                        modalVisible={this.state.deleteReview}
                        subtitle={ translate('DELETE_REVIEW_ITEM_HINT') }
                        okPressed={() =>this.deleteReviewRattingAPI() }
                        cancelPressed={() => this.setState({ deleteReview: false })}
                   />

                    }
                    {
                       loading&&
                       <Loader loader={loading} />
                    }

                </View>
            </View>
        )
    }

}