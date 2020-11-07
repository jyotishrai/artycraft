import { connect } from 'react-redux'
import {
  categoryProductDetailAPI,addProductInWishListAPI, addPostalCodeAPI, addCartRemoveCartAPI,
   addressIsFromCall,
   cartListDataAPi,
   orderSummaryCallFrom,addressListAPi, changeIsFrom, clearCategorySubDetail, dataUpdateInProductDetailReq
} from '../../thunks'
import CategorySubDetail from '../../components/Screens/CategorySubDetail'

const mapStateToProps = ({ CategorySubDetail,MyAddress }) => ({
  loading: CategorySubDetail.loading,
  data:CategorySubDetail.data,
  wish:CategorySubDetail.wish,
  postalCodeData:CategorySubDetail.postalCodeData,
  adrsData:MyAddress.data,
  cartData:CategorySubDetail.cartData,
  dataUpdate:CategorySubDetail.dataUpdate,
})

const mapDispatchToProps = {
  categoryProductDetailAPI:categoryProductDetailAPI,
  addProductInWishListAPI:addProductInWishListAPI,
  addPostalCodeAPI:addPostalCodeAPI,
  addCartRemoveCartAPI:addCartRemoveCartAPI,
  addressIsFromCall:addressIsFromCall,
  getBuyDataAPi:cartListDataAPi,
  orderSummaryCallFrom: orderSummaryCallFrom,
  getAddressListApi:addressListAPi,
  changeIsFromCall:changeIsFrom,
  clearCategorySubDetail:clearCategorySubDetail,
  dataUpdateInProductDetail:dataUpdateInProductDetailReq

  

  //wish:
  //clearCategoryDetail:clearCategoryDetail
}

export default connect(mapStateToProps, mapDispatchToProps)(CategorySubDetail)