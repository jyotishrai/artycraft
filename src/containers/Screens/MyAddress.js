import { connect } from 'react-redux'

import MyAddress from '../../components/Screens/MyAddress'
import {
  addressListAPi,deleteAddressAPi, addPostalCodeAPI, activeCustomerAddressAPI
} from '../../thunks'
import { APP_PARAMS } from '../../constants'

const mapStateToProps = ({ MyAddress,CategorySubDetail }) => ({
  loading: MyAddress.loading,
  data:MyAddress.data,
  error:MyAddress.error,
  productID:CategorySubDetail.data&&CategorySubDetail.data.data[APP_PARAMS.PRODUCTS][APP_PARAMS.U_UID],
  activeAddress: MyAddress.activeAddress
})

const mapDispatchToProps = {
   getAddressListApi:addressListAPi,
   deleteAddressAPi:deleteAddressAPi,
   addressActiveAPI:addPostalCodeAPI,
  activeCustomerAddressAPI: activeCustomerAddressAPI

}

export default connect(mapStateToProps, mapDispatchToProps)(MyAddress)