import { connect } from 'react-redux'
import { getCompareProductListAPI, addCartRemoveCartAPI, orderSummaryCallFrom } from '../../thunks'
import { APP_PARAMS } from '../../constants'
import Compare from '../../components/Screens/Compare'

const mapStateToProps = ({ Compare }) => ({
    loading:Compare.loading,
    data : Compare.data
})

const mapDispatchToProps = {
    getCompareProductListAPI : getCompareProductListAPI,
    addCartRemoveCartAPI:addCartRemoveCartAPI,
    orderSummaryCallFrom: orderSummaryCallFrom

}

export default connect(mapStateToProps, mapDispatchToProps)(Compare)