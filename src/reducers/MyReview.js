import { GET_COMMENT_REVIEW_LIST_FAIL, GET_COMMENT_REVIEW_LIST_SUCCESS, GET_COMMENT_REVIEW_LIST_REQ, DELETE_COMMENT_REVIEW_REQ, DELETE_COMMENT_REVIEW_FAIL, DELETE_COMMENT_REVIEW_SUCCESS } from '../constants'
  
  const initialState = {
    error: undefined,
    loading: false,
    data:undefined,
    isLoadMore: undefined 
  }
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case GET_COMMENT_REVIEW_LIST_REQ:
        return { ...state, error: undefined, loading: true }
         
      case GET_COMMENT_REVIEW_LIST_FAIL:
        return { ...state, error: action.error, loading: false}
  
      case GET_COMMENT_REVIEW_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload 
              }
              case DELETE_COMMENT_REVIEW_REQ:
                return { ...state, error: undefined, loading: true }
                 
              case DELETE_COMMENT_REVIEW_FAIL:
                return { ...state, error: action.error, loading: false}
          
              case DELETE_COMMENT_REVIEW_SUCCESS:
                    return {
                        ...state,
                        loading: false,
                        data: action.payload 
                      }
      default: return state
    }
  }