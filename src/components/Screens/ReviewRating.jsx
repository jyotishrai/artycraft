import React from 'react'
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text, Image, StyleSheet,
    TouchableOpacity, FlatList,
    View, Dimensions, TextInput,ActionSheetIOS, DeviceEventEmitter
} from 'react-native'
import Ripple from 'react-native-material-ripple';
import { colors } from '../../theme';
import { STAR, CAMERA, CROSS, PLACEHOLDER_PRODUCT, NEXT, PLACEHOLDER_PRODUCT_IMG, CANCEL } from '../../images'
import translate from '../../i18n/i18n';
import Basecomponents from '../../common/BaseComponent';
import { WIDTH, DIMENS, FONT_FAMILIY, HEIGHT, APP_PARAMS, KEY, SCREENS, CONST } from '../../constants';
import { Rating, AirbnbRating } from 'react-native-ratings';
// import ViewPager from '@react-native-community/viewpager';
import { Pages, Indicator } from 'react-native-pages';
import CommonNavHeader from '../../common/CommonNavHeader';
import { CommonEmptyView } from '../../common/CommonEmptyView'
import NavigationService from '../../NavigationService';
import ActionSheet from '../../common/ActionSheet/index';
import ImagePicker from 'react-native-image-crop-picker';
import CustomActionSheet from '../../common/CustomActionSheet';
import * as Utils from '../../utility/Utils'
import * as Toast from '../../utility/Toast'
import Loader from '../../common/Loader';



const ratingData = ["Terrible", "Bad", "Average", "Good", "Excellent"]

export default class ReviewRating extends Basecomponents {
    constructor(props) {
        super(props)
        // console.log('navigation state:--', this.props.navigation.state);
        // console.warn('rating::--',global[KEY.USER_DATA]);

        this.comeFromLoginLtsner = DeviceEventEmitter.addListener(KEY.COME_BACK_FROM_LOGIN,this.goBackLogin)
        this.isPurched =global[KEY.USER_DATA] != undefined && global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID]!= undefined&&  this.props.navigation.state != undefined && this.props.navigation.state.params != undefined &&
            this.props.navigation.state.params[APP_PARAMS.BUYED_BY_ME] != undefined && this.props.navigation.state.params[APP_PARAMS.BUYED_BY_ME]
        this.product =   this.props.navigation.state != undefined && this.props.navigation.state.params != undefined &&
            this.props.navigation.state.params.product != undefined && this.props.navigation.state.params.product
        this[APP_PARAMS.USER_REIEW] = this.props.navigation.state.params != undefined &&this.props.navigation.state.params[APP_PARAMS.USER_REIEW] ;
        this[CONST.IS_FROM] = this.props.navigation.state.params != undefined &&this.props.navigation.state.params[CONST.IS_FROM] ;
        
        this.state = {
            Default_Rating: this.props.navigation.state != undefined && this.props.navigation.state.params != undefined &&
            this.props.navigation.state.params.Default_Rating!=undefined ? this.props.navigation.state.params.Default_Rating : 0,
            Max_Rating: 5,
            reviewText: this[APP_PARAMS.USER_REIEW]?this[APP_PARAMS.USER_REIEW][APP_PARAMS.DESRCIPTION]:'',
            imageBtnClk:undefined,
            isPurched: this.isPurched ,
            imgDataArr:this[APP_PARAMS.USER_REIEW]?this[APP_PARAMS.USER_REIEW].imageLocationsList:[],
            titleRating:undefined,
        }
        this.pageRef = undefined
        this.Star = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';

        //Empty Star. You can also give the path from local
        this.Star_With_Border = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';
    }
    componentDidMount() {
        console.warn('product::---',  JSON.stringify(this.product));

        //console.warn('product review::::',  this[APP_PARAMS.USER_REIEW]);
        if(this[APP_PARAMS.USER_REIEW]){
            let arrOfImg = [];
            if(this[APP_PARAMS.USER_REIEW].imageLocationsList&&this[APP_PARAMS.USER_REIEW].imageLocationsList.length>0){
                 arrOfImg = this[APP_PARAMS.USER_REIEW].imageLocationsList.map(item=>{
                    let imageName = item.toString().split('/')
                     let nameOfImage =  imageName[imageName.length-1]
                     let mimeTypelength = nameOfImage.split('.')
                     let mimeType = mimeTypelength[mimeTypelength.length-1]
                    return { uri:item, type:'image/'+mimeType, name:nameOfImage}
                    })
            }
            console.log("arrOfImg::--",arrOfImg);
            
           this.setState({imgDataArr:arrOfImg})


            this.UpdateRating(this[APP_PARAMS.USER_REIEW][APP_PARAMS.STAR],this[APP_PARAMS.USER_REIEW][APP_PARAMS.TITLE])

        }
    }
    //Action.
    reviewRating = () => {
        let data = undefined;
        if(this.product[APP_PARAMS.IS_REVIEWED_BY_ME]!=undefined && this.product[APP_PARAMS.IS_REVIEWED_BY_ME]==true ) {
            
            data = {
                [APP_PARAMS.U_UID]: this[APP_PARAMS.USER_REIEW]&&this[APP_PARAMS.USER_REIEW][APP_PARAMS.U_UID],
                [APP_PARAMS.CUSTOMER_ID]: global[KEY.USER_DATA]!=undefined?global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID]:'',
                [APP_PARAMS.ORDER_ID]: this[APP_PARAMS.USER_REIEW]&&this[APP_PARAMS.USER_REIEW][APP_PARAMS.ORDER_ID],//this.product[APP_PARAMS.LAST_ORDER_ID]!=undefined?this.product[APP_PARAMS.LAST_ORDER_ID]:  this.product[APP_PARAMS.ORDER_PRODUCT_ID],
                [APP_PARAMS.PRODUCT_ID]: this.product[APP_PARAMS.U_UID]!=undefined? this.product[APP_PARAMS.U_UID]: this.product[APP_PARAMS.PRODUCT_U_UID],
                [APP_PARAMS.TITLE]: this.state.titleRating,
                [APP_PARAMS.DESRCIPTION]: this.state.reviewText,
                [APP_PARAMS.STAR]:this.state.Default_Rating,
                [APP_PARAMS.IMAGE]:this.state.imgDataArr
            } 
        } else if(this[CONST.IS_FROM]&&this[CONST.IS_FROM]==SCREENS.MY_REVIEW){
            data = {
                [APP_PARAMS.U_UID]: this.product[APP_PARAMS.U_UID],
                [APP_PARAMS.CUSTOMER_ID]: global[KEY.USER_DATA]!=undefined?global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID]:'',
                [APP_PARAMS.ORDER_ID]: this.product[APP_PARAMS.ORDER_ID],//this.product[APP_PARAMS.LAST_ORDER_ID]!=undefined?this.product[APP_PARAMS.LAST_ORDER_ID]:  this.product[APP_PARAMS.ORDER_PRODUCT_ID],
                [APP_PARAMS.PRODUCT_ID]: this.product[APP_PARAMS.PRODUCT_ID]&&this.product[APP_PARAMS.PRODUCT_ID],
                [APP_PARAMS.TITLE]: this.state.titleRating,
                [APP_PARAMS.DESRCIPTION]: this.state.reviewText,
                [APP_PARAMS.STAR]:this.state.Default_Rating,
                [APP_PARAMS.IMAGE]:this.state.imgDataArr//&&this.state.imgDataArr.length>0?this.state.imgDataArr:''
            } 
            
        }else {
            data = {
                [APP_PARAMS.CUSTOMER_ID]: global[KEY.USER_DATA]!=undefined?global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID]:'',
                [APP_PARAMS.ORDER_ID]: this.product[APP_PARAMS.LAST_ORDER_ID]!=undefined?this.product[APP_PARAMS.LAST_ORDER_ID]:  this.product[APP_PARAMS.ORDER_PRODUCT_ID]?this.product[APP_PARAMS.ORDER_PRODUCT_ID]:this.product[APP_PARAMS.ORDER_ID]&&this.product[APP_PARAMS.ORDER_ID],
                [APP_PARAMS.PRODUCT_ID]: this.product[APP_PARAMS.U_UID]!=undefined? this.product[APP_PARAMS.U_UID]: this.product[APP_PARAMS.PRODUCT_U_UID],
                [APP_PARAMS.TITLE]: this.state.titleRating,
                [APP_PARAMS.DESRCIPTION]: this.state.reviewText,
                [APP_PARAMS.STAR]:this.state.Default_Rating,
                [APP_PARAMS.IMAGE]:this.state.imgDataArr
            } 
        }
        if(data!=undefined) {
            this.props.reviewRatingAPI(data).then(result=>{
                this.responseAPI(result)
                
            })
        }
    }
    
    productDetailAPI = () => {
            let data = {
                [APP_PARAMS.CUSTOMER_ID]: global[KEY.USER_DATA] != undefined && 
                global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID] ? global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID]:'',
                [APP_PARAMS.PRODUCT_ID]: this.product!=undefined && this.product[APP_PARAMS.U_UID],
                [APP_PARAMS.REQ_ID]: Utils.getDeviceId()
            }
            this.props.categoryProductDetailAPI(data).then(result=>{
                console.warn('result product in review rating', JSON.stringify(result));
               if (result) {
                if (result.hasOwnProperty(APP_PARAMS.SUCCESS) && result[APP_PARAMS.SUCCESS]) {
                    if (result.hasOwnProperty(APP_PARAMS.DATA)) {
                        if (result[APP_PARAMS.DATA][APP_PARAMS.PRODUCTS] && result[APP_PARAMS.DATA][APP_PARAMS.PRODUCTS] != null) {
                            console.warn('result product in review rating', JSON.stringify(result[APP_PARAMS.DATA][APP_PARAMS.PRODUCTS]));
                            result[APP_PARAMS.DATA][APP_PARAMS.PRODUCTS][APP_PARAMS.BUYED_BY_ME] &&
                            this.setState({  isPurched : result[APP_PARAMS.DATA][APP_PARAMS.PRODUCTS][APP_PARAMS.BUYED_BY_ME] })
                        }
                       
                } else if (result[APP_PARAMS.MESSAGE]) {
                    Toast.showErrorToast(result[APP_PARAMS.MESSAGE])
                }
            } else {
                Toast.showErrorToast(translate('MESSAGE_SERVER_ERROR'))
            }

        }  else {
            Toast.showErrorToast(translate('MESSAGE_SERVER_ERROR'))
        }

            })
        
    }

    selectOptionFromAndroid=(index)=>{
        if (index === 0) {
            this.openCamera()
        }else if (index === 1) {
            this.openGallery()
        }
        this.setState({imageBtnClk:false})
    }
    //oepnCamera
    openCamera=()=>{
        ImagePicker.openCamera({
            width: 300,
            height: 400,
           // cropping: true,
            compressImageQuality:0,
            size:1024,
            compressImageMaxWidth:300,
            compressImageMaxHeight:400
          }).then(image => {
            console.log("camera::-",image);
            this.imageSelect(image, "camera")
          });
    }

    openGallery=()=>{
        ImagePicker.openPicker({
            width: 300,
            height: 400,
           // cropping: true,
            multiple:true,
            compressImageQuality:0
          }).then(image => {
            console.log("gallery::-",image);
            this.imageSelect(image, "gallery")
          });
    }

    imageSelect=(image, source)=>{
        if(source=="camera") {
            let imageName = image.path.split('/')
            let nameOfImage =  imageName[imageName.length-1]
            let imgData = { uri:image.path, type:image.mime, name:nameOfImage}
            let tempArr = this.state.imgDataArr!=undefined?this.state.imgDataArr:[];
            tempArr.push(imgData);
            this.setState({
                // imgDataArr :{...imgData}
                imgDataArr: tempArr
            }, () => {
                console.warn('image arrr:::  ', imgData);
            })
        } else if(source=="gallery") {
            let imageName = image[0].path.split('/')
            let nameOfImage = imageName[imageName.length-1]
            let imgData = { uri:image[0].path, type:image[0].mime, name:nameOfImage}
            let tempArr = this.state.imgDataArr;
            tempArr.push(imgData);
            this.setState({
                // imgDataArr :{...imgData}
                imgDataArr: tempArr
            }, () => {
                console.warn('image arrr:::  ', imgData);
            })
        }  
    }

    showActionSheet = () => {
        ActionSheetIOS.showActionSheetWithOptions({
          options:  [translate('TAKE_PHOTO'), translate('CHOOSE_FRM_LIB'),translate('CANCEL')],
          cancelButtonIndex: 2,
          //destructiveButtonIndex: 0,
        },
        (buttonIndex) => {
            if (buttonIndex === 0) {
                this.openCamera()
            }else if (buttonIndex === 1) {
                this.openGallery()
            }
        });
    }
    
    addImage=()=>{
        if(this.state.imgDataArr&&this.state.imgDataArr.length==5){
            Toast.showInfoToast(translate('LIMIT_OF_IMG'))
        }else{
            if(Platform.OS=='ios')
            this.showActionSheet()
          else
             this.setState({imageBtnClk:true}) 
        }
        
    }
    //API

    UpdateRating(key,txt) {
        this.setState({ Default_Rating: key,titleRating:txt });
    }

    removeImage = (name) => {
        let filteredArr =  this.state.imgDataArr.filter(item => item.name !==name )
        this.setState({ imgDataArr: filteredArr })
    }

    //Response API
    responseAPI = (result) => {
        if (result) {
            if (result.hasOwnProperty(APP_PARAMS.SUCCESS) && result[APP_PARAMS.SUCCESS]) {
               
                if(result[APP_PARAMS.SUCCESS]){
                    if(result.hasOwnProperty(APP_PARAMS.DATA)&&result[APP_PARAMS.DATA][APP_PARAMS.USER_REIEW]){
                        console.log("result of review ratting::-",JSON.stringify(result[APP_PARAMS.DATA]));
                        console.log("result of review ratting::-",JSON.stringify(result[APP_PARAMS.DATA][APP_PARAMS.USER_REIEW]));

                        let data = result[APP_PARAMS.DATA][APP_PARAMS.USER_REIEW]
                        this.props.navigation.state.params&&this.props.navigation.state.params.goBackFromReviewRattting&&
                        this.props.navigation.state.params.goBackFromReviewRattting(data)
                    }
                  this.props.navigation.goBack()
                }
                result[APP_PARAMS.MESSAGE]&&
                Toast.showErrorToast(result[APP_PARAMS.MESSAGE])
            } else {
                Toast.showErrorToast(translate('MESSAGE_SERVER_ERROR'))
            }
        }else{
            Toast.showErrorToast(translate('MESSAGE_SERVER_ERROR'))
        }
    }
    goBackLogin = () => {
        this.productDetailAPI();
    }

    goToLogin=()=>{
        this.props.changeIsFromCall({ [APP_PARAMS.PAGE_TYPE]: SCREENS.REVIEW_RATING })
        this.props.navigation.navigate('Login_As_GUEST',{goBackLogin:()=>this.goBackLogin()})
    }

    renderReviewImages = (item) => {
        if(item !=undefined && item!=null) {
            return(
                <View style={{ padding: DIMENS.px_8,width:WIDTH/5-2 }}>
                    <TouchableOpacity style={{ height: DIMENS.px_24, width: DIMENS.px_24, position: 'absolute', right: DIMENS.px_0,
                     zIndex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: DIMENS.px_16, }}
                     onPress={() => this.removeImage(item.name)}>
                    <Image style={{ height: DIMENS.px_15, width: DIMENS.px_15}} 
                    source={CANCEL} />
                    </TouchableOpacity>
                <Image style={{borderWidth:DIMENS.px_1,borderColor:colors.lightGrayClr,height: HEIGHT*0.12-20,width:WIDTH/5-15,resizeMode:'contain'}} 
                    source={ item.uri!=undefined &&  item.uri!=null &&  item.uri!='' ? {uri: item.uri} : PLACEHOLDER_PRODUCT_IMG} /> 
                </View>
            );
        }
    }

    page1View = () => {
        let React_Native_Rating_Bar = [];
        //Array to hold the filled or empty Stars
        for (var i = 1; i <= this.state.Max_Rating; i++) {
            React_Native_Rating_Bar.push(
                <TouchableOpacity
                    activeOpacity={0.7}
                    key={i}
                    style={{ justifyContent: 'center', alignItems: 'center', padding: 8 }}
                    onPress={this.UpdateRating.bind(this, i,ratingData[i - 1])}>
                    <Image
                        style={[styles.StarImage, { tintColor: i <= this.state.Default_Rating ? colors.primary : colors.lightGraytransparent }]}
                        source={
                            i <= this.state.Default_Rating
                                ? { uri: this.Star }
                                : { uri: this.Star }
                        }
                    />
                    <Text style={{ fontSize: 11, marginTop: DIMENS.px_5, color: i <= this.state.Default_Rating ? colors.primary : colors.grayClr }}>
                        {ratingData[i - 1]}</Text>
                </TouchableOpacity>
            );
        }
        return (
            <ScrollView contentContainerStyle={{ paddingHorizontal: 10, paddingVertical: 0, width: '100%' }}>
                {
                    this.product &&
                    <View>
                        <Image source={this.product != undefined ? ( this[CONST.IS_FROM]&&this[CONST.IS_FROM]==SCREENS.MY_REVIEW?this.product.productImageLocations&&{uri:this.product.productImageLocations} :    this.product[APP_PARAMS.IMG_LOC] != undefined ? 
                        { uri: this.product[APP_PARAMS.IMG_LOC] } : this.product[APP_PARAMS.IMG_URl]!=undefined ? { uri: this.product[APP_PARAMS.IMG_URl]}: PLACEHOLDER_PRODUCT_IMG ) 
                        : PLACEHOLDER_PRODUCT_IMG }
                            style={{ width: WIDTH - 20, height: HEIGHT * 30 / 100, marginVertical: DIMENS.px_15, resizeMode: 'contain' }} />
                        <Text style={{
                            color: colors.black,
                            fontFamily: FONT_FAMILIY.Roboto_Regular,
                            fontSize: DIMENS.txt_size_large,
                            textAlign: 'center'
                        }}>
                            {this.product != undefined && this.product[APP_PARAMS.NAME]}
                        </Text>
                        <Text style={{
                            color: colors.black,
                            fontFamily: FONT_FAMILIY.Roboto_Medium,
                            fontSize: DIMENS.txt_size_large_extra,
                            textAlign: 'center', marginTop: DIMENS.px_35
                        }}>
                            {'Rate the Product'}
                        </Text>
                        <Text style={{
                            color: colors.black,
                            fontFamily: FONT_FAMILIY.Roboto_Regular,
                            fontSize: DIMENS.txt_size_medium_14,
                            textAlign: 'center', marginTop: DIMENS.px_10,
                            marginHorizontal: DIMENS.px_10
                        }}>
                            {'How did you find this product based on your usage?'}
                        </Text>
                        <View>
                            <View style={styles.childView}>{React_Native_Rating_Bar}</View>
                        </View>
                    </View>
                }
            </ScrollView>
        )
    }
    page2View = () => {
        let React_Native_Rating_Bar = [];
        for (var i = 1; i <= this.state.Max_Rating; i++) {
            React_Native_Rating_Bar.push(
                <Image
                    style={{
                        tintColor: i <=
                            this.state.Default_Rating ? colors.primary : colors.lightGraytransparent,
                        width: DIMENS.px_20, height: DIMENS.px_20
                    }}
                    source={
                        i <= this.state.Default_Rating
                            ? { uri: this.Star }
                            : { uri: this.Star }
                    }
                />
            );
        }
        
        return (
            <View style={{ width: WIDTH, paddingVertical: 10, }}>
                {/* behavior={Platform.select({ ios: 'padding' })}> */}
                    {
                        this.product&&
                    <>
                {/* // <ScrollView> */}
                    <View style={{ flexDirection: 'row', marginRight: 0 }}>
                        <Image source={this.product != undefined && this[CONST.IS_FROM]&&this[CONST.IS_FROM]==SCREENS.MY_REVIEW?
                        this.product.productImageLocations&&{uri:this.product.productImageLocations}:
                         this.product[APP_PARAMS.IMG_LOC] != undefined ?
                            { uri: this.product[APP_PARAMS.IMG_LOC] } : PLACEHOLDER_PRODUCT_IMG}
                            style={{ resizeMode: 'contain', height: 60, flex: .3 }} />
                        <View style={{ flex: .7 }}>
                            <Text style={{
                                color: colors.black,
                                fontFamily: FONT_FAMILIY.Roboto_Regular,
                                fontSize: DIMENS.txt_size_medium_14,
                            }}>
                                {this.product != undefined && this.product[APP_PARAMS.NAME]}
                            </Text>
                            <View>
                                <View style={{ flexDirection: 'row', marginTop: DIMENS.px_10 }}>{React_Native_Rating_Bar}</View>
                            </View>
                        </View>
                    </View>
                    <View style={{
                        backgroundColor: colors.lightGrayClr,
                        height: DIMENS.px_05, //width: '100%',
                        marginTop: DIMENS.px_10
                    }} />
                    <View style={{ padding: DIMENS.px_10 }}>
                        <TextInput
                            style={{
                                width: '100%', height: HEIGHT * 0.4,
                                textAlign: 'left', textAlignVertical: 'top'
                            }}
                            multiline={true}
                            value={this.state.reviewText}
                            placeholderTextColor={colors.lightGrayClr}
                            placeholder={translate('REVIEW_PLACEHOLDER')}
                            onChangeText={(text) => this.setState({ reviewText: text })}
                        />
                       
                    </View>
                    
                    {/* </View> */}
</>
         }
                 {
                       <View style={{ paddingVertical: DIMENS.px_10,width:'100%' }}>
                       { this.state.imgDataArr!=undefined && this.state.imgDataArr!=null && 
                       this.state.imgDataArr.length>0 &&
                            <FlatList 
                            alwaysBounceHorizontal={false}
                            style={{flexGrow:1}}
                            scrollEnabled={true}
                            horizontal={ true }
                            pagingEnabled={true}

                        data={this.state.imgDataArr}
                        extraData={this.state.imgDataArr}
                        renderItem={({item}) => this.renderReviewImages(item)}
                        keyExtractor={(item,index) => index.toString()}
                        />
                            }
                        </View>
                     }
                        {
                         <View style={{ justifyContent: 'space-between', flexDirection: 'row', bottom: 0 }}>
                         <Ripple onPress={() =>this.addImage()} style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                             <Image source={CAMERA} />
                             <Text style={{ color: colors.grayClr, fontSize: DIMENS.txt_size_medium_1, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                                 {' ' + translate('ADD_IMAGES')}</Text>
                         </Ripple>
                         <Ripple onPress={() => this.reviewRating()} style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
     
                             <Text style={{ color: colors.grayClr, fontSize: DIMENS.txt_size_medium_1, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                                 {' ' + translate('SKIP_FINISH')}</Text>
                         </Ripple>
                         </View>
                         }
               
                </View>
            /* </KeyboardAvoidingView> */
        )
    }
    render() {
        const {loading} = this.props
        
        return (
            <View style={{ flex: 1 }}>
                <CommonNavHeader title={translate('SCREEN_REVIEW_PRODUCTL')}
                    backImg={CROSS}
                    backPress={() => this.props.navigation.goBack()} />
                <View style={{ flex: 1 }}>
                    {
                        this.state.isPurched  ?

                            <Pages ref={(refs) => this.pageRef = refs}
                                style={{ flex: 1 }} initialPage={0}
                                indicatorPosition={'bottom'} indicatorColor={colors.primary}
                            >
                                <View style={{ flex: 1 }} key="1">
                                    {
                                        this.page1View()}
                                </View>
                                <View key="2" style={{ flex: 1 }}>
                                    {this.page2View()}
                                </View>
                            </Pages> :
                            <View style={{ flex: 1 }}>
                                <CommonEmptyView
                                    image={PLACEHOLDER_PRODUCT}
                                    title={global[KEY.USER_DATA] != undefined && global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID]!= undefined?
                                        translate('TITLE_NOT_PURCHED') : translate('TITLE_MISSING_ITEM') }
                                    subtitle={global[KEY.USER_DATA] != undefined && global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID]!= undefined?
                                        translate('SUB_TITLE_NOT_PURCHED') :  translate('SUB_TITLE_RATE_ITEM')}
                                    btntext1={global[KEY.USER_DATA] != undefined && global[KEY.USER_DATA][APP_PARAMS.CUSTOMER_ID]!= undefined?undefined: translate('LOGIN')  }
                                    onPress1={() => this.goToLogin() } //this.props.navigation.navigate('Auth')
                                    btntext2={translate('CONTINUE_SHOPPING')}
                                    onPress2={() => NavigationService.clearStack('Drawer')}
                                    btntextImg2={NEXT}
                                     />
                            </View>
                    }
                    {
                      this.state.imageBtnClk&&
                        <CustomActionSheet 
                        visible={this.state.imageBtnClk}
                        selectOption={(index)=>this.selectOptionFromAndroid(index)}/>
                        
                    }
                    
                 </View>        
                    
                {
                     loading &&
                     <Loader loader={loading} />
                }
            </View>
        )
    }

}
const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Platform.OS === 'ios' ? 20 : 0,
    },
    childView: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: DIMENS.px_35,
    },
    button: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 30,
        padding: 15,
        backgroundColor: '#8ad24e',
    },
    StarImage: {
        width: 35,
        height: 35,
        resizeMode: 'contain',

    },
    textStyle: {
        textAlign: 'center',
        fontSize: 23,
        color: '#000',
        marginTop: 15,
    },
    textStyleSmall: {
        textAlign: 'center',
        fontSize: 16,

        color: '#000',
        marginTop: 15,
    },
});