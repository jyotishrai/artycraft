import { connect } from 'react-redux'
import {
  orderHistoryAPi, changeIsFrom, orderSummaryCallFrom,clearMyOrderData
} from '../../thunks'
import MyOrder from '../../components/Screens/MyOrder'

const mapStateToProps = ({ MyOrder }) => ({
  loading: MyOrder.loading,
  data:MyOrder.data,
  isLoadMore:MyOrder.isLoadMore
  
  // || chat.loading || users.loading
})

const mapDispatchToProps = {
  orderHistoryAPi:orderHistoryAPi,
  myOrderHistoryApiReqOnPagination:orderHistoryAPi,
  changeIsFromCall:changeIsFrom,
  orderSummaryCallFrom: orderSummaryCallFrom,
  clearMyOrderData:clearMyOrderData
}

export default connect(mapStateToProps, mapDispatchToProps)(MyOrder)