import { connect } from 'react-redux'

import { getOrderDetailAPi, getTrackFullDetailAPi, orderCancelAPi } from '../../thunks'
import OrderSummaryWithDetail from '../../components/Screens/OrderSummaryWithDetail'


const mapStateToProps = ({ OrderSummaryWithDetail,TrackOrder ,MyOrder}) => ({
    loading:OrderSummaryWithDetail.loading,
    data:OrderSummaryWithDetail.data,
    trackOrder:TrackOrder.data,
    tracKLoading:TrackOrder.loading,
    myOrderData:MyOrder.data,

})

const mapDispatchToProps = {
    getOrderDetailAPi:getOrderDetailAPi,
    getTrackFullDetailAPi:getTrackFullDetailAPi,
    orderCancelAPI:orderCancelAPi
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderSummaryWithDetail)