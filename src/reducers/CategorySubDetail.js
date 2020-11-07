import {
 CATEGORY_PRODUCT_DETAIL_REQUEST_SUCCESS,
 CATEGORY_PRODUCT_DETAIL_REQUEST,
 CATEGORY_PRODUCT_DETAIL_REQUEST_FAIL,
  APP_PARAMS,
  ADD_WISH_LIST_REQUEST,
  ADD_WISH_LIST_REQUEST_FAIL,
  ADD_WISH_LIST_REQUEST_SUCCESS,
  ADD_POSTAL_CODE_API_REQ,
  ADD_POSTAL_CODE_API_FAIL,
  ADD_POSTAL_CODE_API_SUCCESS,
  ADD_CART_REMOVE_API_REQ,
  ADD_CART_REMOVE_API_SUCCESS,
  ADD_CART_REMOVE_API_FAIL,
  ORDER_IS_FROM,
  CATEGORY_PRODUCT_DETAIL_UPDATE,
  COMMENT_AND_REVIEWS_REQ,
  COMMENT_AND_REVIEWS_SUCCESS,
  COMMENT_AND_REVIEWS_FAIL,
  CATEGORY_PRODUCT_DETAIL_REQUEST_CLEAR
} from '../constants'

const initialState = {
  error: undefined,
  loading: false,
  data:undefined,
  wishData:undefined,wish:undefined,
  postalCodeData:undefined,
  cartData:undefined,
  cart:undefined,
  dataUpdate:undefined,
  deleteWish:undefined,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CATEGORY_PRODUCT_DETAIL_REQUEST:
      return { ...state, error: undefined, loading: true,dataUpdate:false }
      break;
    case CATEGORY_PRODUCT_DETAIL_REQUEST_FAIL:
      return { ...state, error: action.error, loading: false,dataUpdate:false }
      break;
    case CATEGORY_PRODUCT_DETAIL_REQUEST_SUCCESS:
    return {
        ...state,
        loading: false,
        dataUpdate:false,
        wish:action.payload.data[APP_PARAMS.PRODUCTS][APP_PARAMS.WISH],
        data: {...action.payload }
      }
      break;
      case CATEGORY_PRODUCT_DETAIL_UPDATE:
        let tempdata = undefined
        if(state.data.data){
          try {
           tempdata = Object.assign({},state.data) 
          if(tempdata.data[APP_PARAMS.PRODUCT_VARINET_LIST]){
            let productVariantsIdList = [];
            let data=  tempdata.data[APP_PARAMS.PRODUCT_VARINET_LIST]
            Object.keys(data).map((key) => {
              Object.keys(data[key]).map((k) => {
                if(action.payload.data[APP_PARAMS.PRODUCT_VARIENT_ID_LIST].some(obj=>obj==data[key][k].productVariantsId)){
                  data[key][k].cart = action.payload.data[APP_PARAMS.CART]!=undefined?action.payload.data[APP_PARAMS.CART]:action.payload.data[APP_PARAMS.PRODUCT_VARIENT_CART]
                  data[key][k].wish = action.payload.data[APP_PARAMS.WISH]!=undefined?action.payload.data[APP_PARAMS.WISH]:action.payload.data[APP_PARAMS.PRODUCT_VARIENT_WISH]

                }
              })
            })
            tempdata.data[APP_PARAMS.PRODUCTS][APP_PARAMS.PRODUCT_VARIENT_ID_LIST] = action.payload.data[APP_PARAMS.PRODUCT_VARIENT_ID_LIST]
            tempdata.data[APP_PARAMS.PRODUCTS][APP_PARAMS.PRODUCT_VARIANT_ID] = action.payload.data[APP_PARAMS.PRODUCT_VARIENT_ID_LIST][0]
           }
          
           tempdata.data[APP_PARAMS.PRODUCTS][APP_PARAMS.CART] = action.payload.data[APP_PARAMS.CART]!=undefined?action.payload.data[APP_PARAMS.CART]:tempdata.data[APP_PARAMS.PRODUCTS][APP_PARAMS.CART]
           tempdata.data[APP_PARAMS.PRODUCTS][APP_PARAMS.WISH] = action.payload.data[APP_PARAMS.WISH]!=undefined?action.payload.data[APP_PARAMS.WISH]:tempdata.data[APP_PARAMS.PRODUCTS][APP_PARAMS.WISH]

           console.warn("tempdata::::",JSON.stringify(tempdata.data[APP_PARAMS.PRODUCTS]));
          } catch (error) {
           console.warn("error::::",error);
          }
        }

        
        return {
          ...state,
          loading: false,
          //wish:state.data[APP_PARAMS.PRODUCTS][APP_PARAMS.WISH],
         cart:tempdata.data[APP_PARAMS.PRODUCTS][APP_PARAMS.CART],
         wish:tempdata.data[APP_PARAMS.PRODUCTS][APP_PARAMS.WISH],
         dataUpdate:true,
         data:tempdata,
        // cartData:tempdata
          //data: {...action.payload }
        }
        break;
     case CATEGORY_PRODUCT_DETAIL_REQUEST_CLEAR:
        return {
            ...state,
            loading: false,
            dataUpdate:false,
            wish:undefined,
            data:undefined,
            dataUpdate:undefined,
           
          }
          break;
      case ADD_WISH_LIST_REQUEST:
        return { ...state, error: undefined, loading: false,dataUpdate:false,deleteWish:true }
        break;
      case ADD_WISH_LIST_REQUEST_FAIL:
        return { ...state, error: action.error, loading: false,dataUpdate:false,deleteWish:false }
        break;
      case ADD_WISH_LIST_REQUEST_SUCCESS:
        return {
          ...state,
          loading: false,
          wish:action.payload.data ,
          wishData: {...action.payload },
          dataUpdate:false,
          deleteWish:false
        }
        break;
        case ADD_POSTAL_CODE_API_REQ:
          return { ...state, error: undefined, loading: true }
          break;
        case ADD_POSTAL_CODE_API_FAIL:
          return { ...state, error: action.error, loading: false }
          break;
        case ADD_POSTAL_CODE_API_SUCCESS:
          return {
            ...state,
            loading: false,
            postalCodeData: {...action.payload }
          }
          break;  
//CART ADD
          case ADD_CART_REMOVE_API_REQ:
            return { ...state, error: undefined, loading: true }
            break;
          case ADD_CART_REMOVE_API_FAIL:
            return { ...state, error: action.error, loading: false }
            break;
          case ADD_CART_REMOVE_API_SUCCESS:
            console.warn("state::--remove",JSON.stringify(state));
            // let tempdata = undefined
            //  if(state.data.data){
            //    try {
            //     tempdata = state.data
            //     tempdata.data[APP_PARAMS.PRODUCTS][APP_PARAMS.CART] = action.payload.data[APP_PARAMS.CART]?action.payload.data[APP_PARAMS.CART]:action.payload.data
            //     console.warn("tempdata::::",JSON.stringify(tempdata));
            //    } catch (error) {
            //     console.warn("error::::",error);
            //    }
             
            //  }
            return {
              ...state,
              loading: false,
            //  data:tempdata,
              cartData:action.payload
            }  
            break;
    default: return state
  }
}