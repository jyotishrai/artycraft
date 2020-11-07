import { connect } from 'react-redux'

import { placeOrderAPi, placeOrderID, getPaymentMode } from '../../thunks'
import { addBillingData } from '../../actionCreators'
import Payment from '../../components/Screens/Payment'
import { APP_PARAMS } from '../../constants'

const mapStateToProps = ({ Payment,OrderSummary,AddAddress }) => ({
  loading: Payment.loading,
   data:Payment.data,
   paymentMode:Payment.paymentMode,
  billData :OrderSummary.billData ,
  productList:OrderSummary.data[APP_PARAMS.RES_PKT][APP_PARAMS.PRODUCTS],
  address:OrderSummary.data!=undefined?OrderSummary.data[APP_PARAMS.RES_PKT][APP_PARAMS.ADDRESS]:AddAddress.data,
})

const mapDispatchToProps = {
   placeOrder:placeOrderAPi,
   placeOrderID:placeOrderID,
   getPaymnetMode:getPaymentMode
}

export default connect(mapStateToProps, mapDispatchToProps)(Payment)