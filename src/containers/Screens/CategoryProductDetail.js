import { connect } from 'react-redux'
import { getProductDetailByIdAPI } from '../../thunks'
import { APP_PARAMS } from '../../constants'
import CategoryProductDetail from '../../components/Screens/CategoryProductDetail'

const mapStateToProps = ({ CategoryProductDetail, CategorySubDetail }) => ({
    loading:CategoryProductDetail.loading,
    data : CategoryProductDetail.data,
    productData: CategorySubDetail[APP_PARAMS.DATA]!=undefined &&  CategorySubDetail[APP_PARAMS.DATA][APP_PARAMS.DATA] &&   CategorySubDetail[APP_PARAMS.DATA][APP_PARAMS.DATA][APP_PARAMS.PRODUCTS]
})

const mapDispatchToProps = {
   getProductDetailByIdAPI: getProductDetailByIdAPI
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryProductDetail)