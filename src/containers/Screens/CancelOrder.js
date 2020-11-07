import { connect } from 'react-redux'
import { orderCancelAPi, getCancelOrderList ,orderReturnExchangeAPI} from '../../thunks'
import CancelOrder from '../../components/Screens/CancelOrder'


const mapStateToProps = ({ OrderSummaryWithDetail }) => ({
    loading:OrderSummaryWithDetail.loading,
    data:OrderSummaryWithDetail.dataCancel,
    dataOrder:OrderSummaryWithDetail.data,

})

const mapDispatchToProps = {
    orderCancelAPI:orderCancelAPi,
    orderReturnExchangeAPI:orderReturnExchangeAPI,
    getCancelOrderList:getCancelOrderList
}

export default connect(mapStateToProps, mapDispatchToProps)(CancelOrder)