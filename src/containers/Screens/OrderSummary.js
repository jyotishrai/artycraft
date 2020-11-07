import { connect } from 'react-redux'

import OrderSummary from '../../components/Screens/OrderSummary'
import { cartListDataAPi,orderSummaryCallFrom, addUpdateCartQtyDataAPi,
   addressIsFromCall, addCartRemoveCartAPI,addBillingData, changeIsFrom, dataUpdateInProductDetailReq } from '../../thunks'



const mapStateToProps = ({ OrderSummary,CategorySubDetail }) => ({
  loading: OrderSummary.loading,
  data:OrderSummary.data,
  orderIsFrom:OrderSummary.orderIsFrom,
  billData :OrderSummary.billData ,
  cart :CategorySubDetail.cart ,

})

const mapDispatchToProps = {
  cartListDataAPi:cartListDataAPi,
  orderSummaryCallFrom: orderSummaryCallFrom,
  addUpdateCartQtyDataAPi:addUpdateCartQtyDataAPi,
  addressIsFromCall: addressIsFromCall,
  addCartRemoveCartAPI:addCartRemoveCartAPI,
  addBillingData:addBillingData,
  changeIsFromCall:changeIsFrom,

  dataUpdateInProductDetail:dataUpdateInProductDetailReq
 
  // action:()=> bindActionCreators(addBillingData,dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderSummary)