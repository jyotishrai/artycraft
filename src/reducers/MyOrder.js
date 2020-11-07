import {
  MY_ORDER_HISTORY_REQUEST, MY_ORDER_HISTORY_FAIL, MY_ORDER_HISTORY_SUCCESS,MY_ORDER_HISTORY_REQUEST_PAGINATION, APP_PARAMS, MY_ORDER_HISTORY_CLAER
} from '../constants'

const initialState = {
  error: undefined,
  loading: false,
  data:undefined,
  isLoadMore: undefined 
}

export default (state = initialState, action) => {
  switch (action.type) {
    case MY_ORDER_HISTORY_REQUEST:
      return { ...state, error: undefined, loading: true }

    case  MY_ORDER_HISTORY_REQUEST_PAGINATION:
      return { ...state, error: undefined, isLoadMore: true } 
       
    case MY_ORDER_HISTORY_FAIL:
      return { ...state, error: action.error, loading: false,isLoadMore: false }

    case MY_ORDER_HISTORY_SUCCESS:
           let tempData = action.payload;
           console.log('tempData::--',state.data);
           console.log('tempData::--payload::--',action.payload);

           
      try {
        if( state.data && state.data[APP_PARAMS.DATA] ){
          //tempData = state.data

          tempData = state.data
          let payloadData = action.payload.data&&action.payload.data[APP_PARAMS.ORDER_LIST]//[APP_PARAMS.CAT_RELEATED_PRODUCT]
          tempData.data[APP_PARAMS.ORDER_LIST] = [...tempData.data[APP_PARAMS.ORDER_LIST] ,...payloadData]
          console.log('tempData::--final',JSON.stringify(tempData));

          }
      } catch (error) {
        console.warn('category datat:::--error',error);
      }
      return {
        ...state,
        loading: false,
        isLoadMore: false,
        data: tempData//!=undefined?tempData:{...action.payload }
      }
      case MY_ORDER_HISTORY_CLAER:
        return { ...state, error: action.error, loading: false,isLoadMore: false,data:undefined }
  
    default: return state
  }
}