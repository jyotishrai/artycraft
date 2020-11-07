import { connect } from 'react-redux'
import {
  categoryDetailAPI,clearCategoryDetail, getProductsByDealOfTheDayOrOffUpToAPI,getSortFilterApi,
   addPostalCodeAPI, cartListDataAPi, orderSummaryCallFrom, randomProductApi
} from '../../thunks'
import CategoryDetails from '../../components/Screens/CategoryDetails'

const mapStateToProps = ({ CategoryDetails,AddAddress }) => ({
  loading: CategoryDetails.loading,
  isLoadMore:CategoryDetails.isLoadMore,
  data:CategoryDetails.data,
  sortData:CategoryDetails.sortData,
  addressIsFrom:AddAddress.addressIsFrom,
  tempData :CategoryDetails.tempData
})

const mapDispatchToProps = {
  categoryDetailAPI:categoryDetailAPI,
  categoryDetailAPIPagination:categoryDetailAPI,
  clearCategoryDetail:clearCategoryDetail,

  getProductsByDealOfTheDayOrOffUpToAPI:getProductsByDealOfTheDayOrOffUpToAPI,
  getProductsByDealOfTheDayOrOffUpToAPIPagination:getProductsByDealOfTheDayOrOffUpToAPI,

  getSortFilterApi:getSortFilterApi,
  getBuyDataAPi:cartListDataAPi,
  orderSummaryCallFrom: orderSummaryCallFrom,

  randomProductApi:randomProductApi,
  randomProductApiPagination:randomProductApi,
  
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDetails)