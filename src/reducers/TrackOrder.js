import {  TRACK_ORDER_FULL_DETAIL_REQ, TRACK_ORDER_FULL_DETAIL_FAIL, TRACK_ORDER_FULL_DETAIL_SUCCESS } from '../constants'

const initialState = {
  error: undefined,
  loading: false,
   data:undefined,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case TRACK_ORDER_FULL_DETAIL_REQ:
      return { ...state, error: undefined, loading: true }
    case TRACK_ORDER_FULL_DETAIL_FAIL:
      return { ...state, error: action.error, loading: false }
    case TRACK_ORDER_FULL_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload 
      }
    default: return state
  }
}