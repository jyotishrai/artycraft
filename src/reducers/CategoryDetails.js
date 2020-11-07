import {
  CATEGORY_DETAIL_REQUEST,
  CATEGORY_DETAIL_FAIL,
  CATEGORY_DETAIL_SUCCESS,
  CATEGORY_DETAIL_REQUEST_PAGINATION,
  APP_PARAMS,
  DEAL_OFF_LIST_REQUEST,
  DEAL_OFF_REQUEST_FAIL,
  DEAL_OFF_REQUEST_SUCCESS,
  DEAL_OFF_LIST_REQUEST_PAGINATION,
  SORT_FILTER_API_REQ,
  SORT_FILTER_API_FAIL,
  SORT_FILTER_API_SUCCESS,
  RANDOM_PRODUCT_REQUEST,
  RANDOM_PRODUCT_REQUEST_PAGINATION,
  RANDOM_PRODUCT_REQUEST_FAIL,
  RANDOM_PRODUCT_REQUEST_SUCCESS
} from '../constants'

const initialState = {
  error: undefined,
  loading: false,
  isLoadMore: false,
  data: undefined,
  sortData: undefined,
  filterData: undefined,
  tempData: undefined,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CATEGORY_DETAIL_REQUEST:
      return { ...state, error: undefined, loading: true,isLoadMore: false  }

    case CATEGORY_DETAIL_REQUEST_PAGINATION:
      return { ...state, error: undefined, isLoadMore: true }

    case CATEGORY_DETAIL_FAIL:
      return { ...state, error: action.error, loading: false, isLoadMore: false }

    case CATEGORY_DETAIL_SUCCESS:

      //   let tempData = {};
      // try {
      //   if( state.data && state.data[APP_PARAMS.DATA]&&state.data[APP_PARAMS.DATA][APP_PARAMS.CAT_RELEATED_PRODUCT]  ){
      //     tempData = action.payload
      //     let relatedProduct = state.data[APP_PARAMS.DATA][APP_PARAMS.CAT_RELEATED_PRODUCT]
      //     let payloadData = action.payload.data&&action.payload.data[APP_PARAMS.CAT_RELEATED_PRODUCT]
      //     tempData.data[APP_PARAMS.CAT_RELEATED_PRODUCT] = [...relatedProduct,...payloadData]
      //     }
      // } catch (error) {
      //   console.warn('category datat:::--error',error);
      // }
      return {
        ...state,
        loading: false,
        isLoadMore: false,
        data: { ...action.payload },
        // tempData:tempData
        //data: {...tempData }
      }
    //DEAL
    case DEAL_OFF_LIST_REQUEST:
      return { ...state, error: undefined, loading: true,isLoadMore: false  }

    case DEAL_OFF_LIST_REQUEST_PAGINATION:
      return { ...state, error: undefined, isLoadMore: true }

    case DEAL_OFF_REQUEST_FAIL:
      return { ...state, error: action.error, loading: false, isLoadMore: false }

    case DEAL_OFF_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        isLoadMore: false ,
        data: { ...action.payload }
      }
    //SORT
    case SORT_FILTER_API_REQ:
      return { ...state, error: undefined, loading: true }

    case SORT_FILTER_API_FAIL:
      return { ...state, error: action.error, loading: false }

    case SORT_FILTER_API_SUCCESS:
      return {
        ...state,
        loading: false,
        sortData: { ...action.payload }
      }
    //RANDOM
    case RANDOM_PRODUCT_REQUEST:
      return { ...state, error: undefined, loading: true,isLoadMore: false  }

    case RANDOM_PRODUCT_REQUEST_PAGINATION:
      return { ...state, error: undefined, isLoadMore: true }

    case RANDOM_PRODUCT_REQUEST_FAIL:
      return { ...state, error: action.error, loading: false, isLoadMore: false }

    case RANDOM_PRODUCT_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        isLoadMore: false ,
        data: { ...action.payload }
      }
    default: return state
  }
}