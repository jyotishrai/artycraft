import { connect } from 'react-redux'
import {
  wishListAPI, addProductInWishListAPI, clearWishData, changeIsFrom, orderSummaryCallFrom, dataUpdateInProductDetailReq
} from '../../thunks'
import Wishlist from '../../components/Screens/Wishlist'

const mapStateToProps = ({Wishlist,CategorySubDetail }) => ({
  loading: Wishlist.loading,
  data:Wishlist.data,
  deletLoading:CategorySubDetail.deleteWish,
  deleteData:CategorySubDetail.data
})

const mapDispatchToProps = {
  wishListAPI:wishListAPI,
  removeProductInWishListAPI:addProductInWishListAPI,
  clearWishData:clearWishData,
  changeIsFromCall:changeIsFrom,
  orderSummaryCallFrom: orderSummaryCallFrom,
  dataUpdateInProductDetail:dataUpdateInProductDetailReq
}

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist)