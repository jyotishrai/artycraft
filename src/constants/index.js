import { Dimensions } from 'react-native'

//export const BASE_URL = 'http://139.162.29.56:3080/api/v1/';
//export const BASE_URL = 'http://192.168.1.189:8080/admin/api/mob/v1/ptmSimilarUser/'//shruti
//export const BASE_URL = 'http://172.104.160.243:8080/admin/api/mob/v1/ptmSimilarUser/'//live
//export const BASE_URL = 'http://192.168.1.68:8082/admin/api/mob/v1/ptmSimilarUser/'//Mukesh
 //export const BASE_URL = 'http://192.168.1.132:8080/admin/api/mob/v1/ptmSimilarUser/'//Pritam

//shopikuchbhi
//export const BASE_URL = 'http://172.105.43.113:8080/admin/api/mob/v1/ptmSimilarUser/'//Shoikuchbhi Live

//export const BASE_URL = 'http://172.105.50.222:8080/admin/api/mob/v1/ptmSimilarUser/'//TEST URl SHOPIKUCH
 
// export const BASE_URL_LOGO  = 'http://172.105.50.222:8080/user/assets/images/logo.png'//Shoikuchbhi 
//  export const APP_NAME  = 'Shoikuchbhi'

//Artycrafts
// export const BASE_URL = 'http://192.1668.1.132:8080/admin/api/mob/v1/ptmSimilarUser/'//Articraft Testing
 //export const BASE_URL = 'http://172.104.160.243:8080/admin/api/mob/v1/ptmSimilarUser/'//Articraft Live
 
 
 
 export const BASE_URL = 'http://artycraftsessentials.com/admin/api/mob/v1/ptmSimilarUser/'  //Client

 //export const BASE_URL = 'http://172.105.49.143:8080/admin/api/mob/v1/ptmSimilarUser/'//Articraft NEW
 export const BASE_URL_LOGO  = 'http://172.104.160.243:8080/artycraftsUser/assets/images/logo.png'//Articraft Live
 export const APP_NAME  = 'Artycrafts'//Articraft Live

export const BASE_URL_GEOCODE = 'https://maps.googleapis.com/maps/api/geocode/json?';
export const BASE_URL_WEB = 'http://172.105.50.222:8080/user/content/';//'http://172.105.43.113:8080/user/mainpage/content/';

export const BASE_URL_RESTRO = BASE_URL + 'restro/';
export const BASE_URL_DRIVER = BASE_URL + 'driver/';
export const BASE_URL_PRODUCT = BASE_URL + 'product/';
export const BASE_URL_ORDER = BASE_URL + 'order/';
export const BASE_URL_OFFICE = BASE_URL + 'office/';

export const BASE_URL_RAZOR_PAY_ORDER_ID  = 'http://172.105.43.113:8080/admin/'


export const RAZOR_PAY_KEY = 'rzp_test_51xc4i0MhDappc';

export const LEGACY_SERVER_KEY = 'AIzaSyASFwiTkWBtPIMqo21IAyxXV4566c_87mw'


export const API = {
    SEND_OTP: BASE_URL_RESTRO + 'sendOtp',
    LOGIN_EMIAL: 'signInWithEmail',
    LOGIN_PHONE: 'sendOtpByMobileNumber',
    ADDRESS_FROM_GOOGLE: 'address=',
    SIGN_UP: 'signUp',
    OTP_VERIFICATION: 'otpVerification',
    HOME_PAGE_DATA: 'getHomePageData',
    PRODUCT_SEARCH: 'getProductCategorySearchList/',
    CAT_DETAIL: 'getCategoryRelatedProducts',
    CAT_PRODUCT_DETAIL: 'getProductById',
    ADD_WISH_UN_WISH_PRODUCT: "wishUnWishProduct",
    WISH_LIST: 'getWishProductListByCustomer',
    GET_PRODUCT_DEAL_OFF_UP_TO: 'getProductsByDealOfTheDayOrOffUpTo',
    GET_ALL_COUNTRY: 'getAllCountries',
    GET_ALL_STATE: 'getAllStatesByCountryId/',
    GET_ALL_CITY: 'getAllCitiesByStateId/',
    ADD_UPDATE_ADDRESS: 'addUpdateAddressByCustomerId/',
    LIST_ADDRESS: 'getAddressList/',
    DELETE_ADDRESS_ById: 'deleteAddressById',
    // SORT_FILTER_LIST: 'getSortAndFilterList',
    SORT_FILTER_LIST: 'getSortAndFilterListByCatId',
    REVIEW_RATING: 'addOrUpdateCommentAndReviewsByCustomer',
    ADD_POST_CODE: 'addUpdatePostCodeOrActiveAddress',//'addUpdatePostCode',
    ADD_REMOVE_CART: 'addCartRemoveCartProduct',
    CART_LIST: 'getCartProductList',
    ADD_ORDER_QTY:'addUpdateOrderQty',
    PLACE_ORDER:'placeOrder',
    //PLACE_ORDER_ID:'postOrder',
    PLACE_ORDER_ID:'orderPayPost',
    // Neha
    ORDER_DETAIL: 'getOrderByOrderId/',
    MY_ORDER_HISTORY:'getOrderListByCustomerId',
    CAHNGE_PASSWORD_LOGIN_USER:'changePasswordLoginUser',
    GET_PRODUCT_DETAILS_BY_ID: 'getProductDetailsByProductIdAndUser',
    
    CONTACT_US:'contact-us',
    HELP:'help',
    TERMS_CONDITION:'policy/termsAndConditions',
    FAQ:'help/faq',
   CLEAR_ALL_WISH :'clearAllWish'    ,
   UPDATE_PROFILE :'updateProfile',
   PAYMENT_MODE:'getPaymentMode',//http://172.105.43.113:8080/admin/getPaymentMode,
   RANDOM_PRODUCT:'getHomePageProducts',
   RESEND_OTP: 'resendOtp/',
   ACTIVE_CUSTOMER_ADDRESS: 'activeCustomerAddress/',
   TRACK_ORDER_FULL_DETAIL: 'trackOrderFullDetails/',
   GET_TRACK_ID: 'getTracking/',
   GET_COMPARE_PROD_LIST: 'getCompareProducsListByProductIdList',
   ORDER_CANCEL:'cancelOrder/',//returnOrExchange->true
   ORDER_RETURN_EXCHANGE:'exchangeOrReturn/',
   GET_ORDER_CANCEL_SUB:'getOrderCancelSub/',//0->cancel// 1-return/exchange
   GET_COMMENT_REVIEW_LIST: 'getCommentsAndReviewsListByCustomerId/',
   DELETE_COMMENT_REVIEW : 'deleteCommentsAndReviewsByRecordId/',
   GET_NOTIFICATION_LIST: 'getNotificationList/',
   LOGOUT_API: 'userLogout/',

}

export const APP_PARAMS = {
    ONE: "one",
    ALL: "all",
    ID: "id",
    PAGE_TYPE: "PAGE_TYPE",
    ROLE: "role",
    SUPER_ADMIN: 'superAdmin',

    LAT: 'lat',
    LNG: 'lng',
    COUNTRY_LONG_NAME: 'COUNTRY_LONG_NAME',
    COUNTRY_SHORT_NAME: 'COUNTRY_SHORT_NAME',
    STATE_LONG_NAME: 'STATE_LONG_NAME',
    STATE_SHORT_NAME: 'STATE_SHORT_NAME',
    CITY_LONG_NAME: 'CITY_LONG_NAME',
    CITY_SHORT_NAME: 'CITY_SHORT_NAME',
    POSTAL_CODE: 'postCode',
    FORMATED_ADDRESS: 'FORMATED_ADDRESS',
    //SIGN Up
    FULL_NAME: 'fullName',
    PHONE: 'phone',
    ALTER_NATE_PHONE: 'alterNatePhoneNumber',
    EMAIL: 'email',
    PASSWORD: 'password',
    OLD_PASSWORD: 'oldPassword',
    PHONE_CODE: 'phonecode',
    COUNTRY_ID: 'countryId',
    STATE_ID: 'stateId',
    CITY_ID: 'cityId',
    //HOME
    USER_ID: "userId",
    REQ_ID: "requestId",
    SUCCESS: 'success',
    MESSAGE: 'message',
    DATA: 'data',
    URL: 'url',
    SHARE_URL: 'url',
    ERROR: 'error',
    CUSTOMER_ID: 'customerId',
    OTP: 'otp',

    CAT_ID: 'categoryId',
    START: "start",
    END: "end",
    id: "uid",
    _id: "id",
    CAT_RELEATED_PRODUCT: 'categoryRelatedProductList',
    SUB_CAT: 'subCategories',
    TOTAL_PRODUCT_SIZE: 'totalProductSize',
    TOTAL_PRODUCTS_SIZE: 'totalProductsSize',
    CAT_U_ID: 'categoryUuid',
    PRODUCT_ID: 'productId',
    RELATED_PRODUCT_LIST: 'relatedProductList',
    PRODUCTS: 'products',
    COMNT_REVIEW_LIST: 'commentReviewsList',
    IMG_LOC: 'imageLocations',
    IMG_URl: 'imageUrl',
    IMG_LOC_LIST: 'imageLocationsList',
    NAME: 'name',
    TOTAL_REVIEW: "totalReviews",
    TOTAL_RATING: "totalRating",
    DISCOUNT_PRICE: "discountPrice",
    PRICE: "price",
    PAY_PRICE: "payPrice",
    DISCOUNT: 'discount',
    OFF: 'off',
    U_UID: 'uuid',
    WISH: "wish",
    CART: "cart",
    ORDER_PRODUCT_ID: "orderProductId", 

    OFF_TYPE: 'offerType',
    PRODUCT_LIST: 'productList',
    OFF_IN_PER: 'offInPercentage',
    RES_PKT: "responsePacket",
    APARTMENT_SUIT: 'apartmentSuit',
    STREET_ADDRESS: 'streetAddress',
    LANDMARK: 'landMark',
    CITY: 'city',
    STATE: 'state',
    ADDRESS_TYPE: 'addressType',
    HOME: 'home',
    WORK: 'work',
    FIRST_NAME: 'firstName',
    ADDRESS_ID: 'addressId',
    SORT_LIST: 'sortList',
    FILTER_TYPE: 'filterType',
    FILTER_VALUES: 'filterValues',
    FILTER_LIST: 'filterList',
    BUYED_BY_ME: 'buyedByMe',
    ORDER_ID: 'orderId',
    TITLE: 'title',
    DESRCIPTION: 'description',
    STAR: 'star',
    DELIVERY_TIME: 'deliveredTime',
    DESTINATION: 'destination',
    DELIVERY_MZG: 'deliveryMessage',
    LAST_ORDER_NO: 'lastOrderNumber',
    LAST_ORDER_ID: 'lastOrderId',
    SHIPPING_CAHNGES: "shippingChanges",
    INSTALL_DETAIL: "installationDetails",
    SHIPPING_CHARGE: 'shippingCharge',
    IS_ACTIVE_CART: 'isAddedToCart',
    IS_FROM_NAV: 'isFromNav',
    ORDER_QTY:'orderQty',

    ADDRESS:'address',
    STORE_NAME:'storeName',
    PAYMENT_OPTION:'paymentOption',
    SELLER_NAME:'sellerName',
    PAYMENT_MODE:'paymentMode',
    PAYMENT_MODES:'payModes',
    BEAN_ORDER_PRODUCT:'beanOrderProductArrayList',
    PRODUCT_U_UID:'productUuid',
    QTY:'qty',
    LoaderIndx:'qtyLoaderIndex',

    PRODUCT_ORDER_QTY:'productOrderQty',
    TOTAL_AMOUNT:'totAmount',
    SUBL_AMOUNT:'subAmount',
    BILLING_ADDRESS:'billingAddress',
    ORDER_NUMBER:'orderNumber',
    ORDER_STATUS_RECEIVED:'Received',
    ORDER_STATUS_PROCESSING:'Processing',
    ORDER_STATUS_SHIPPED:'Shipped',
    ORDER_STATUS_DELIVERED:'Delivered',

    SHIPPING_ADDRESS:'shippingAddress',
    AMOUNT:'amount',
    CURRENCY:'currency',
    PAYMENT_CAPTURE:'payment_capture',
    INR_CURRENCY:'INR',
    IN_STOCK:'inStock',
    RANDOM_PRODUCT:'randomProducts',
    ORDER_LIST:'orderList',
    LSIT_SIZE:'listSize',
    CART_LIST:'CartList',
    CUSTOMER_KEY_ID: 'customerKeyId',
    WISH_LIST:'WishList',
    NOTIFICATION_COUNT:'unReadNotifications',
    CATEGORY_NAME: 'categoryName',
    CREATED_TIME:'createTime',
    PAYMENT_ORDER_ID:'paymentOrderId',
    TRACKING_ID:'trackingId',
    STATUS_ARRAY:'status_array',
    STATUS_BODY:'status_body',
    STATUS_LOC:'status_location',
    STATUS_TIME:'status_time',
    TRACK_ARR:'track_arr',
    FULL_DESC: 'fullDescription',
    PROD_SUMMARY_ARR_LIST : 'productSummaryArrayList',
    PROD_HIGHLIGHT : 'productHighlights',
    DELIVERY_DATE: 'deleveryDate',
    COMPARABLE:'comparable',
    CATEGORY: 'category',
    PRODUCT_ID_LIST:"productIdList",
    ATTRI_VALUE:"attributeValue",
    ATTRI_WID_IT:"attributeWithIds",
    PRODUCT_GROUP_SPEC:'productGroupSpecification',
    PRODUCT_SPECIFIACTION: 'productSpecification',
    IMAGE:'image',
    CURRENT_STATUS_TYPE:'current_status_type',
    RETUEN_OR_EXCHANGE:'returnOrExchange',
    COMMENTS:'comments',
    SUBJECT:'subject',
    CUSTOMER_NAME: 'customerName',
    APPROVE: 'approve',
    IS_REVIEWED_BY_ME: 'isReviewedByMe',
    SHORT_DESCRIPTION: 'shortDescription',
    REVIEWED_BY_ME: 'reviewedByMe',
    PRODUCT_CURNT_STATUS_OBJ: 'productCurrentStatusObj',
    MIN_ORDR_QTY: 'minOrderQuantity',
    MAX_ORDR_QTY: 'maxOrderQuantity',
    USER_REIEW:'userReviews',
    PRODUCT_NAME:'productName',
    PRODUCT_VARINET_LIST:'productVariantsList',
    DEF_VARIENT:'defVariant',
    PRODUCT_VARIANT_IMG:'productVariantsImage',
    QUANTITY:'quantity',
    PRODUCT_VARIENT_ID_LIST:'productVariantIdList',
    PRODUCT_VARIENT_CART:'productVariantCart',
    PRODUCT_VARIENT_WISH:'productVariantWish',
    ATTR_VALUE_ID:'attrValueId',
    PRODUCT_VARIANT_ID:'productVariantsId',
    PRODUCT_ATTRIB_ID:'productAttrId',
    PRODUCT_ATT_ID:'productAttId',
    AMOUNT_WITHOUT_DISCOUNT:'amountWithoutDiscount',
    PRODUCT_VARIANTS:'productVariants',
    PRODUCT_VARIANTS_PRICE:'productVariantsPrice',
    DEVICE_TOKEN:'deviceToken',
    TYPE:'type',
    NOTIFICATION:'notifications',

    

}

export const SCREEN = {
    MY_ACCOUNT: "MyAccount",
  
}
export const KEY = {
    USER_DATA: "userdata",
    NAME: "name",
    AS_GUESt_USER: "AS_GUESt_USER",
    NEXT: "next",
    COUNTRY_LIST: "COUNTRY_LIST",
    POSTAL_CODE:'POSTAL_CODE',
    FAQ:'FAQ',
    IS_LOGIN:'IS_LOGIN',
    RAZOR_ORDER_ID:'RAZOR_ORDER_ID',
    CART_COUNT:'CART_COUNT',
    WISH_COUNT:'WISH_COUNT',
    NOTICATION_COUNT:'NOTICATION_COUNT',

    //lisner
    COME_BACK_FROM_LOGIN:'comBackFromLogin',
    COME_BACK_FROM_CATEGORY:'comBackFromCategory',
    COD:'Cash_on_delivery',
    ONLINE_PAY:'OnlinePay',
    IMAGE:'image',

    FCM_TOKEN:"fcmToken"




}
export const CONST = {
    IS_FROM:'isFrom',
    TO:'to',
    DATA:'data',
    PRODUCT_VARIENT_ID_LIST:'productVariantIdList',
    
    ORDER_PLACE:'OP',
    ORDER_MANIFEST:'OM',
    ORDER_CANCEL:'OC',
    ORDER_PICKED_UP:'PP',
    ORDER_DELIVERD:'DL',
    ORDER_DISPATCH:'OD',
    ORDER_OUT_FOR_DELIVRY:'OO',
    ORDER_IN_TRANSIT:'OT',
    ORDER_RETURN:'RTO',
    ORDER_RETURN_TRANSIT:'RTO-OT',
    ORDER_RETURN_OUT_FOR_DELIVRY:'RTO-OO',
    ORDER_REACHED_PICKER_WAREHOUSE:'RTP',
    ORDER_RETURN_TO_CONSIGNEE:'RTD',
    ORDER_STATUS_DELIVEY_FAIL:'NDR',
    CANCEL_ORDER:'CANCEL_ORDER',
    RETURN_ORDER:'RETURN_ORDER',
    REPLACE_ORDER:'REPLACE_ORDER',
    DEEP_LINK:'DEEP_LINK',
    NOTYFY_MOVE:'NOTYFY_MOVE',
    NOTYFY_COUNT:'NOTYFY_COUNT',

}

export const LOCALES = {
    ENGLISH: { id: 1, name: "en", label: "ENGLISH" },
    HINDI: { id: 2, name: "hi", label: "हिंदी" }
};
export const FONT_FAMILIY = {
    Roboto_Black: 'Roboto-Black',
    Roboto_Bold: 'Roboto-Bold',
    Roboto_Light: 'Roboto-Light',
    Roboto_Medium: 'Roboto-Medium',
    Roboto_Regular: 'Roboto-Regular',
    Ittalian: 'roboto.light-italic',
    gt: 'GT-Walsheim-Medium',
}

export const DIMENS = {
    px_0: 0,
    px_05: 0.5,
    px_1: 1,
    px_2: 2,
    px_3: 3,
    px_5: 5,
    px_8: 8,
    px_10: 10,
    px_12: 12,
    px_300: 300,
    px_14: 14,
    px_15: 15,
    px_16: 16,
    px_18: 18,
    px_20: 20,
    px_22: 22,
    px_23: 23,
    px_24: 24,
    px_25: 25,
    px_28: 28,
    px_30: 30,
    px_32: 32,
    px_35: 35,
    px_40: 40,
    px_45: 45,
    px_50: 50,
    px_60: 60,
    px_70: 70,
    px_75: 75,
    px_80: 80,
    px_90: 90,
    px_100: 100,
    px_130: 130,
    px_140: 140,
    px_150: 150,

    px_200: 200,
    px_250: 250,

    btn_font_size: 16,
    btn_h: 40,
    devider_h: 1,
    devider_h_half: 0.5,
    devider_h_1: 1,
    txt_size_small_small: 10,
    txt_size_small: 11,
    txt_size_small_12: 12,
    txt_size_min_small: 8,
    txt_size_medium: 13,
    txt_size_medium_14: 14,
    txt_size_medium_1: 15,
    txt_size_large: 16,
    txt_size_large_extra: 18,
    txt_size_large_extra_20: 20,
    row_h: 50,
    minHeight: 50,
    row_img_w: 60,
    row_img_big: 70,
    row_img_w_2: 50,
    tab_width: 24,

    //Category Size
    cat_img_width: 55,
    cat_img_height: 55,
    cat_img_radius: 27.5
}


export const CURRENCY = {
    RUPEES: '\u20B9',
    DOLLER: '\u0024',
    EURO: '\u20AC',
    JAPANES_YEN: '\u00A5',
    POUND_STERLING: '\u00A3'
}
export const SCREENS={
    CATEGORY_SUB_DETAIL :'CategorySubDetail',
    ADD_ADDRESS:'AddAddress',
    ORDER_SUMMARY:'OrderSummary',
    MY_ACCOUNT:'MyAccount',
    CART:'CART',
    MY_ADDRESS : 'MyAddress',
    TRACK_ORDER : 'TrackOrder',
    DRAWER:'Drawer',
    ORDER_DETAIL:'OrderSummaryWithDetail',
    MY_ORDER:'My Order',
    TERMS_CONDITION:'TermsCondition',
    WISHLIST:'Wishlist',
    SIGN_UP:'SignUp',
    EDIT_PROFILE:'EditProfile',
    CHANGE_PASSWORD: 'ChangePassword',
    CATEGORY_DETAIL: 'CategoryDetail',
    REVIEW_RATING: 'ReviewRating',
    PRODUCT_SPECIFIACTION: 'ProductSpecification',
    CATEGORY_PRODUCT_DETAIL: 'CategoryProductDetail',
    COMPARE: 'Compare',
    FILTER:'Filter',
    CANCEL_ORDER:'CancelOrder',
    PAYMENT:'Payment',
    MY_REVIEW:'MyReview',
    COLOR_VARIENT:'ColorVarient',
    NOTIFICATION:'Notification'
}




//HEIGHT AND WIDTH
export const WIDTH = Dimensions.get('screen').width
export const HEIGHT = Dimensions.get('screen').height

//API OF QUIKSHOP

export const APP_IS_FROM_TERMS= 'APP_IS_FROM_TERMS'


export const APP_LOGIN_REQUEST = 'APP_LOGIN_REQUEST'
export const APP_LOGIN_SUCCESS = 'APP_LOGIN_SUCCESS'
export const APP_LOGIN_FAIL = 'APP_LOGIN_FAIL'
export const APP_USER_DATA_SAVE_ON_LOUNCH = 'APP_USER_DATA_SAVE_ON_LOUNCH'
export const APP_IS_FROM_FOR_LOGIN = 'APP_IS_FROM_FOR_LOGIN'

export const APP_LOGOUT_REQUEST = 'APP_LOGOUT_REQUEST'
export const APP_LOGOUT_SUCCESS = 'APP_LOGOUT_SUCCESS'
export const APP_LOGOUT_FAIL = 'APP_LOGOUT_FAIL'

export const APP_UPDATE_REQUEST = 'APP_UPDATE_REQUEST'
export const APP_UPDATE_SUCCESS = 'APP_UPDATE_SUCCESS'

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_FAIL = 'SIGNUP_FAIL'

export const OTP_REQUEST = 'OTP_REQUEST'
export const OTP_SUCCESS = 'OTP_SUCCESS'
export const OTP_FAIL = 'OTP_FAIL'

export const RESEND_OTP_REQUEST = 'RESEND_OTP_REQUEST'
export const RESEND_OTP_SUCCESS = 'RESEND_OTP_SUCCESS'
export const RESEND_OTP_FAIL = 'RESEND_OTP_FAIL'

export const ACTIVE_CUSTOMER_ADDRESS_REQ = 'ACTIVE_CUSTOMER_ADDRESS_REQ'
export const ACTIVE_CUSTOMER_ADDRESS_SUCCESS = 'ACTIVE_CUSTOMER_ADDRESS_SUCCESS'
export const ACTIVE_CUSTOMER_ADDRESS_FAIL = 'ACTIVE_CUSTOMER_ADDRESS_FAIL'

export const HOME_REQUEST = 'HOME_REQUEST'
export const HOME_SUCCESS = 'HOME_SUCCESS'
export const HOME_FAIL = 'HOME_FAIL'

export const SEARCH_REQUEST = 'SEARCH_REQUEST'
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS'
export const SEARCH_FAIL = 'SEARCH_FAIL'

export const CATEGORY_DETAIL_REQUEST = 'CATEGORY_DETAIL_REQUEST'
export const CATEGORY_DETAIL_REQUEST_PAGINATION = 'CATEGORY_DETAIL_REQUEST_PAGINATION'

export const CATEGORY_DETAIL_SUCCESS = 'CATEGORY_DETAIL_SUCCESS'
export const CATEGORY_DETAIL_FAIL = 'CATEGORY_DETAIL_FAIL'

export const CATEGORY_PRODUCT_DETAIL_REQUEST = 'CATEGORY_PRODUCT_DETAIL_REQUEST'
export const CATEGORY_PRODUCT_DETAIL_REQUEST_FAIL = 'CATEGORY_PRODUCT_DETAIL_REQUEST_FAIL'
export const CATEGORY_PRODUCT_DETAIL_REQUEST_SUCCESS = 'CATEGORY_PRODUCT_DETAIL_REQUEST_SUCCESS'
export const CATEGORY_PRODUCT_DETAIL_REQUEST_CLEAR = 'CATEGORY_PRODUCT_DETAIL_REQUEST_CLEAR'

export const CATEGORY_PRODUCT_DETAIL_UPDATE = 'CATEGORY_PRODUCT_DETAIL_UPDATE'


export const ADD_WISH_LIST_REQUEST = 'ADD_WISH_LIST_REQUEST'
export const ADD_WISH_LIST_REQUEST_FAIL = 'ADD_WISH_LIST_REQUEST_FAIL'
export const ADD_WISH_LIST_REQUEST_SUCCESS = 'ADD_WISH_LIST_REQUEST_SUCCESS'

export const WISH_LIST_REQUEST = 'WISH_LIST_REQUEST'
export const WISH_LIST_REQUEST_FAIL = 'WISH_LIST_REQUEST_FAIL'
export const WISH_LIST_REQUEST_SUCCESS = 'WISH_LIST_REQUEST_SUCCESS'

export const CLEAR_WISH_LIST_REQUEST = 'CLEAR_WISH_LIST_REQUEST'
export const CLEAR_LIST_REQUEST_FAIL = 'CLEAR_LIST_REQUEST_FAIL'
export const CLEAR_WISH_LIST_REQUEST_SUCCESS = 'CLEAR_WISH_LIST_REQUEST_SUCCESS'

export const DEAL_OFF_LIST_REQUEST = 'DEAL_OFF_LIST_REQUEST'
export const DEAL_OFF_LIST_REQUEST_PAGINATION = 'DEAL_OFF_LIST_REQUEST_PAGINATION'
export const DEAL_OFF_REQUEST_FAIL = 'DEAL_OFF_LIST_REQUEST_FAIL'
export const DEAL_OFF_REQUEST_SUCCESS = 'DEAL_OFF_LIST_REQUEST_SUCCESS'

//RANDOM
export const RANDOM_PRODUCT_REQUEST = 'RANDOM_PRODUCT_REQUEST'
export const RANDOM_PRODUCT_REQUEST_PAGINATION = 'RANDOM_PRODUCT_REQUEST_PAGINATION'
export const RANDOM_PRODUCT_REQUEST_FAIL = 'RANDOM_PRODUCT_REQUEST_FAIL'
export const RANDOM_PRODUCT_REQUEST_SUCCESS = 'RANDOM_PRODUCT_REQUEST_SUCCESS'

//GEO Location API
export const ADDRESS_FROM_GOOGLE_REQ = 'ADDRESS_FROM_GOOGLE_REQ'
export const ADDRESS_FROM_GOOGLE_FAIL = 'ADDRESS_FROM_GOOGLE_FAIL'
export const ADDRESS_FROM_GOOGLE_SUCCESS = 'ADDRESS_FROM_GOOGLE_SUCCESS'


export const CITY_API_REQ = 'CITY_API_REQ'
export const CITY_API_FAIL = 'CITY_API_FAIL'
export const CITY_API_SUCCESS = 'CITY_API_SUCCESS'

export const STATE_API_REQ = 'STATE_API_REQ'
export const STATE_API_FAIL = 'STATE_API_FAIL'
export const STATE_API_SUCCESS = 'STATE_API_SUCCESS'

export const COUNTRY_API_REQ = 'COUNTRY_API_REQ'
export const COUNTRY_API_FAIL = 'COUNTRY_API_FAIL'
export const COUNTRY_API_SUCCESS = 'COUNTRY_API_SUCCESS'

export const ADD_ADDRESS_API_REQ = 'ADD_ADDRESS_API_REQ'
export const ADD_ADDRESS_API_FAIL = 'ADD_ADDRESS_API_FAIL'
export const ADD_ADDRESS_API_SUCCESS = 'ADD_ADDRESS_API_SUCCESS'
export const ADDRESS_IS_FROM = 'ADDRESS_IS_FROM'


export const DELETE_ADDRESS_API_REQ = 'DELETE_ADDRESS_API_REQ'
export const DELETE_ADDRESS_API_FAIL = 'DELETE_ADDRESS_API_FAIL'
export const DELETE_ADDRESS_API_SUCCESS = 'DELETE_ADDRESS_API_SUCCESS'


export const LIST_ADDRESS_API_REQ = 'LIST_ADDRESS_API_REQ'
export const LIST_ADDRESS_API_FAIL = 'LIST_ADDRESS_API_FAIL'
export const LIST_ADDRESS_API_SUCCESS = 'LIST_ADDRESS_API_SUCCESS'

export const SORT_FILTER_API_REQ = 'SORT_FILTER_API_REQ'
export const SORT_FILTER_API_FAIL = 'SORT_FILTER_API_FAIL'
export const SORT_FILTER_API_SUCCESS = 'SORT_FILTER_API_SUCCESS'

export const REVIEW_RATING_API_REQ = 'REVIEW_RATING_API_REQ'
export const REVIEW_RATING_API_FAIL = 'REVIEW_RATING_API_FAIL'
export const REVIEW_RATING_API_SUCCESS = 'REVIEW_RATING_API_SUCCESS'

export const ADD_POSTAL_CODE_API_REQ = 'ADD_POSTAL_CODE_API_REQ'
export const ADD_POSTAL_CODE_API_FAIL = 'ADD_POSTAL_CODE_API_FAIL'
export const ADD_POSTAL_CODE_API_SUCCESS = 'ADD_POSTAL_CODE_API_SUCCESS'

export const ADD_CART_REMOVE_API_REQ = 'ADD_CART_REMOVE_API_REQ'
export const ADD_CART_REMOVE_API_FAIL = 'ADD_CART_REMOVE_API_FAIL'
export const ADD_CART_REMOVE_API_SUCCESS = 'ADD_CART_REMOVE_API_SUCCESS'

export const CART_LIST_API_REQ = 'CART_LIST_API_REQ'
export const CART_LIST_API_FAIL = 'CART_LIST_API_FAIL'
export const CART_LIST_API_SUCCESS = 'CART_LIST_API_SUCCESS'
export const ORDER_IS_FROM = 'ORDER_IS_FROM'

export const ADD_CART_QTY_API_REQ = 'ADD_CART_QTY_API_REQ'
export const ADD_CART_QTY_API_FAIL = 'ADD_CART_QTY_API_FAIL'
export const ADD_CART_QTY_API_SUCCESS = 'ADD_CART_QTY_API_SUCCESS'

export const ADD_BILL_DATA = 'ADD_BILL_DATA'

export const PLACE_ORDER_REQ = 'PLACE_ORDER_REQ'
export const PLACE_ORDER_FAIL = 'PLACE_ORDER_FAIL'
export const PLACE_ORDER_SUCCESS = 'PLACE_ORDER_SUCCESS'

export const PLACE_ORDER_ID_REQ = 'PLACE_ORDER_ID_REQ'
export const PLACE_ORDER_ID_FAIL = 'PLACE_ORDER_ID_FAIL'
export const PLACE_ORDER_ID_SUCCESS = 'PLACE_ORDER_ID_SUCCESS'

export const ORDER_DETAIL_REQ = 'ORDER_DETAIL_REQ'
export const ORDER_DETAIL_FAIL = 'ORDER_DETAIL_FAIL'
export const ORDER_DETAIL_SUCCESS = 'ORDER_DETAIL_SUCCESS'

export const ORDER_CANCEL_REQ = 'ORDER_CANCEL_REQ'
export const ORDER_CANCEL_FAIL = 'ORDER_CANCEL_FAIL'
export const ORDER_CANCEL_SUCCESS = 'ORDER_CANCEL_SUCCESS'

export const ORDER_RETUEN_EXCHANGE_REQ = 'ORDER_RETUEN_EXCHANGE_REQ'
export const ORDER_RETUEN_EXCHANGE_FAIL = 'ORDER_RETUEN_EXCHANGE_FAIL'
export const ORDER_RETUEN_EXCHANGE_SUCCESS = 'ORDER_RETUEN_EXCHANGE_SUCCESS'

export const GET_ORDR_CANCEL_LIST_REQ = 'GET_ORDR_CANCEL_LIST_REQ'
export const GET_ORDR_CANCEL_LIST_FAIL = 'GET_ORDR_CANCEL_LIST_FAIL'
export const GET_ORDR_CANCEL_LIST_SUCCESS = 'GET_ORDR_CANCEL_LIST_SUCCESS'

export const MY_ORDER_HISTORY_REQUEST = 'MY_ORDER_HISTORY_REQUEST'
export const MY_ORDER_HISTORY_SUCCESS = 'MY_ORDER_HISTORY_SUCCESS'
export const MY_ORDER_HISTORY_FAIL = 'MY_ORDER_HISTORY_FAIL'
export const MY_ORDER_HISTORY_REQUEST_PAGINATION = 'MY_ORDER_HISTORY_REQUEST_PAGINATION'
export const MY_ORDER_HISTORY_CLAER = 'MY_ORDER_HISTORY_CLAER'

export const UPDATE_PROFILE_REQ = 'UPDATE_PROFILE_REQ'
export const UPDATE_PROFILE_FAIL = 'UPDATE_PROFILE_FAIL'
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS'

export const PAYMENT_MODE_REQ = 'PAYMENT_MODE_REQ'
export const PAYMENT_MODE_FAIL = 'PAYMENT_MODE_FAIL'
export const PAYMENT_MODE_SUCCESS = 'PAYMENT_MODE_SUCCESS'


export const TRACK_ORDER_FULL_DETAIL_REQ = 'TRACK_ORDER_FULL_DETAIL_REQ'
export const TRACK_ORDER_FULL_DETAIL_FAIL = 'TRACK_ORDER_FULL_DETAIL_FAIL'
export const TRACK_ORDER_FULL_DETAIL_SUCCESS = 'TRACK_ORDER_FULL_DETAIL_SUCCESS'

export const GET_PRODUCT_DETAILS_BY_ID_REQ = 'GET_PRODUCT_DETAILS_BY_ID_REQ'
export const GET_PRODUCT_DETAILS_BY_ID_FAIL = 'GET_PRODUCT_DETAILS_BY_ID_FAIL'
export const GET_PRODUCT_DETAILS_BY_ID_SUCCESS = 'GET_PRODUCT_DETAILS_BY_ID_SUCCESS'

export const GET_TRACKING_REQ = 'GET_TRACKING_REQ'
export const GET_TRACKING_FAIL = 'GET_TRACKING_FAIL'
export const GET_TRACKING_SUCCESS = 'GET_TRACKING_SUCCESS'
// Change Password
export const CHANGE_PASSWORD_REQ = 'CHANGE_PASSWORD_REQ'
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS'
export const CHANGE_PASSWORD_FAIL = 'CHANGE_PASSWORD_FAIL'

export const GET_COMPARE_PROD_LIST_REQ = 'GET_COMPARE_PROD_LIST_REQ'
export const GET_COMPARE_PROD_LIST_SUCCESS = 'GET_COMPARE_PROD_LIST_SUCCESS'
export const GET_COMPARE_PROD_LIST_FAIL = 'GET_COMPARE_PROD_LIST_FAIL'

export const GET_COMMENT_REVIEW_LIST_REQ = 'GET_COMMENT_REVIEW_LIST_REQ'
export const GET_COMMENT_REVIEW_LIST_SUCCESS = 'GET_COMMENT_REVIEW_LIST_SUCCESS'
export const GET_COMMENT_REVIEW_LIST_FAIL = 'GET_COMMENT_REVIEW_LIST_FAIL'

export const DELETE_COMMENT_REVIEW_REQ = 'DELETE_COMMENT_REVIEW_REQ'
export const DELETE_COMMENT_REVIEW_SUCCESS = 'DELETE_COMMENT_REVIEW_SUCCESS'
export const DELETE_COMMENT_REVIEW_FAIL = 'DELETE_COMMENT_REVIEW_FAIL'

export const NOTIFICATION_REQ = 'NOTIFICATION_REQ'
export const NOTIFICATION_SUCCESS = 'NOTIFICATION_SUCCESS'
export const NOTIFICATION_FAIL = 'NOTIFICATION_FAIL'
export const NOTIFICATION_CLEAR = 'NOTIFICATION_CLEAR'


// QB initialization
export const INIT_QB_REQUEST = 'INIT_QB_REQUEST'
export const INIT_QB_REQUEST_SUCCESS = 'INIT_QB_REQUEST_SUCCESS'
export const INIT_QB_REQUEST_FAIL = 'INIT_QB_REQUEST_FAIL'
// Internet connection state
export const CONNECTION_STATE_CHANGE = 'CONNECTION_STATE_CHANGE'
// User authentication
export const AUTH_LOGIN_REQUEST = 'AUTH_LOGIN_REQUEST'
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS'
export const AUTH_LOGIN_FAIL = 'AUTH_LOGIN_FAIL'
export const AUTH_LOGOUT_REQUEST = 'AUTH_LOGOUT_REQUEST'
export const AUTH_LOGOUT_SUCCESS = 'AUTH_LOGOUT_SUCCESS'
export const AUTH_LOGOUT_FAIL = 'AUTH_LOGOUT_FAIL'
export const AUTH_GET_SESSION_REQUEST = 'AUTH_GET_SESSION_REQUEST'
export const AUTH_GET_SESSION_SUCCESS = 'AUTH_GET_SESSION_SUCCESS'
export const AUTH_GET_SESSION_FAIL = 'AUTH_GET_SESSION_FAIL'
// QB chat authentication
export const CHAT_IS_CONNECTED_REQUEST = 'CHAT_IS_CONNECTED_REQUEST'
export const CHAT_IS_CONNECTED_SUCCESS = 'CHAT_IS_CONNECTED_SUCCESS'
export const CHAT_IS_CONNECTED_FAIL = 'CHAT_IS_CONNECTED_FAIL'
export const CHAT_CONNECT_REQUEST = 'CHAT_CONNECT_REQUEST'
export const CHAT_CONNECT_SUCCESS = 'CHAT_CONNECT_SUCCESS'
export const CHAT_CONNECT_FAIL = 'CHAT_CONNECT_FAIL'
export const CHAT_DISCONNECT_REQUEST = 'CHAT_DISCONNECT_REQUEST'
export const CHAT_DISCONNECT_SUCCESS = 'CHAT_DISCONNECT_SUCCESS'
export const CHAT_DISCONNECT_FAIL = 'CHAT_DISCONNECT_FAIL'
export const CHAT_PING_USER_REQUEST = 'CHAT_PING_USER_REQUEST'
export const CHAT_PING_USER_SUCCESS = 'CHAT_PING_USER_SUCCESS'
export const CHAT_PING_USER_FAIL = 'CHAT_PING_USER_FAIL'
export const CHAT_PING_SERVER_REQUEST = 'CHAT_PING_SERVER_REQUEST'
export const CHAT_PING_SERVER_SUCCESS = 'CHAT_PING_SERVER_SUCCESS'
export const CHAT_PING_SERVER_FAIL = 'CHAT_PING_SERVER_FAIL'
// QB Users
export const USERS_CREATE_REQUEST = 'USERS_CREATE_REQUEST'
export const USERS_CREATE_SUCCESS = 'USERS_CREATE_SUCCESS'
export const USERS_CREATE_FAIL = 'USERS_CREATE_FAIL'
export const USERS_UPDATE_REQUEST = 'USERS_UPDATE_REQUEST'
export const USERS_UPDATE_SUCCESS = 'USERS_UPDATE_SUCCESS'
export const USERS_UPDATE_FAIL = 'USERS_UPDATE_FAIL'
export const USERS_GET_REQUEST = 'USERS_GET_REQUEST'
export const USERS_GET_SUCCESS = 'USERS_GET_SUCCESS'
export const USERS_GET_FAIL = 'USERS_GET_FAIL'
export const USERS_SELECT = 'USERS_SELECT'
export const USERS_BULK_SELECT = 'USERS_BULK_SELECT'
export const USERS_SET_FILTER = 'USERS_SET_FILTER'
export const USERS_SET_PAGE = 'USERS_SET_PAGE'
// QB Dialogs
export const DIALOGS_SET_FILTER = 'DIALOGS_SET_FILTER'
export const DIALOGS_UNREAD_COUNT_INCREMENT = 'DIALOGS_UNREAD_COUNT_INCREMENT'
export const DIALOGS_UNREAD_COUNT_DECREMENT = 'DIALOGS_UNREAD_COUNT_DECREMENT'
export const DIALOGS_GET_REQUEST = 'DIALOGS_GET_REQUEST'
export const DIALOGS_GET_SUCCESS = 'DIALOGS_GET_SUCCESS'
export const DIALOGS_GET_FAIL = 'DIALOGS_GET_FAIL'
export const DIALOGS_CREATE_REQUEST = 'DIALOGS_CREATE_REQUEST'
export const DIALOGS_CREATE_SUCCESS = 'DIALOGS_CREATE_SUCCESS'
export const DIALOGS_CREATE_FAIL = 'DIALOGS_CREATE_FAIL'
export const DIALOGS_CREATE_CANCEL = 'DIALOGS_CREATE_CANCEL'
export const DIALOGS_EDIT_REQUEST = 'DIALOGS_EDIT_REQUEST'
export const DIALOGS_EDIT_SUCCESS = 'DIALOGS_EDIT_SUCCESS'
export const DIALOGS_EDIT_FAIL = 'DIALOGS_EDIT_FAIL'
export const DIALOGS_EDIT_CANCEL = 'DIALOGS_EDIT_CANCEL'
export const DIALOGS_JOIN_REQUEST = 'DIALOGS_JOIN_REQUEST'
export const DIALOGS_JOIN_SUCCESS = 'DIALOGS_JOIN_SUCCESS'
export const DIALOGS_JOIN_FAIL = 'DIALOGS_JOIN_FAIL'
export const DIALOGS_LEAVE_REQUEST = 'DIALOGS_LEAVE_REQUEST'
export const DIALOGS_LEAVE_SUCCESS = 'DIALOGS_LEAVE_SUCCESS'
export const DIALOGS_LEAVE_FAIL = 'DIALOGS_LEAVE_FAIL'
export const DIALOGS_DELETE_REQUEST = 'DIALOGS_DELETE_REQUEST'
export const DIALOGS_DELETE_SUCCESS = 'DIALOGS_DELETE_SUCCESS'
export const DIALOGS_DELETE_FAIL = 'DIALOGS_DELETE_FAIL'
export const DIALOGS_SELECT = 'DIALOGS_SELECT'
export const DIALOGS_SELECT_RESET = 'DIALOGS_SELECT_RESET'
// QB Messages
export const MESSAGES_GET_REQUEST = 'MESSAGES_GET_REQUEST'
export const MESSAGES_GET_SUCCESS = 'MESSAGES_GET_SUCCESS'
export const MESSAGES_GET_FAIL = 'MESSAGES_GET_FAIL'
export const MESSAGES_MARK_READ_REQUEST = 'MESSAGES_MARK_READ_REQUEST'
export const MESSAGES_MARK_READ_SUCCESS = 'MESSAGES_MARK_READ_SUCCESS'
export const MESSAGES_MARK_READ_FAIL = 'MESSAGES_MARK_READ_FAIL'
export const MESSAGES_MARK_DELIVERED_REQUEST = 'MESSAGES_MARK_DELIVERED_REQUEST'
export const MESSAGES_MARK_DELIVERED_SUCCESS = 'MESSAGES_MARK_DELIVERED_SUCCESS'
export const MESSAGES_MARK_DELIVERED_FAIL = 'MESSAGES_MARK_DELIVERED_FAIL'
export const MESSAGES_SEND_REQUEST = 'MESSAGES_SEND_REQUEST'
export const MESSAGES_SEND_SUCCESS = 'MESSAGES_SEND_SUCCESS'
export const MESSAGES_SEND_FAIL = 'MESSAGES_SEND_FAIL'
export const MESSAGES_SYSTEM_SEND_REQUEST = 'MESSAGES_SYSTEM_SEND_REQUEST'
export const MESSAGES_SYSTEM_SEND_SUCCESS = 'MESSAGES_SYSTEM_SEND_SUCCESS'
export const MESSAGES_SYSTEM_SEND_FAIL = 'MESSAGES_SYSTEM_SEND_FAIL'
// QB file
export const FILE_UPLOAD_REQUEST = 'FILE_UPLOAD_REQUEST'
export const FILE_UPLOAD_SUCCESS = 'FILE_UPLOAD_SUCCESS'
export const FILE_UPLOAD_FAIL = 'FILE_UPLOAD_FAIL'
export const FILE_GET_INFO_REQUEST = 'FILE_GET_INFO_REQUEST'
export const FILE_GET_INFO_SUCCESS = 'FILE_GET_INFO_SUCCESS'
export const FILE_GET_INFO_FAIL = 'FILE_GET_INFO_FAIL'
export const FILE_PUBLIC_URL_REQUEST = 'FILE_PUBLIC_URL_REQUEST'
export const FILE_PUBLIC_URL_SUCCESS = 'FILE_PUBLIC_URL_SUCCESS'
export const FILE_PUBLIC_URL_FAIL = 'FILE_PUBLIC_URL_FAIL'
export const FILE_PRIVATE_URL_REQUEST = 'FILE_PRIVATE_URL_REQUEST'
export const FILE_PRIVATE_URL_SUCCESS = 'FILE_PRIVATE_URL_SUCCESS'
export const FILE_PRIVATE_URL_FAIL = 'FILE_PRIVATE_URL_FAIL'

// QB Info
export const GET_INFO_REQUEST = 'GET_INFO_REQUEST'
export const GET_INFO_SUCCESS = 'GET_INFO_SUCCESS'
export const GET_INFO_FAIL = 'GET_INFO_FAIL'
// Device UDID for Push notifications
export const DEVICE_UDID_SET = 'DEVICE_UDID_SET'
export const DEVICE_UDID_REMOVE = 'DEVICE_UDID_REMOVE'


export const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
export const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/
export const passRegex = /^.*(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$#%])(^[a-zA-Z0-9@$#%]+$)/
////?-i)(?=^.{8,}$)((?!.*\s)(?=.*[A-Z])(?=.*[a-z]))((?=(.*\d){1,})|(?=(.*\W){1,}))^.*$/



