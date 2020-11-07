import { connect } from 'react-redux'

import AddAddress from '../../components/Screens/AddAddress'
import {
  geoLocationAPI,getAllCountryAPI,getAllStateAPI,getAllCityAPI,addAdressUpdateAPi,cleaData
} from '../../thunks'

const mapStateToProps = ({ GeoLocation,AddAddress }) => ({
  loading: GeoLocation.loading,
  data:GeoLocation.data,
  error:GeoLocation.error,

  loading:AddAddress.loading,
  country:AddAddress.country,
  state:AddAddress.state,
  city:AddAddress.city,
  dataOfAdrs:AddAddress.data,
  addressIsFrom:AddAddress.addressIsFrom,

  // || chat.loading || users.loading
})

const mapDispatchToProps = {

  geoLocationAPI:geoLocationAPI,
  getAllCountryAPI:getAllCountryAPI,
  getAllStateAPI:getAllStateAPI,
  getAllCityAPI:getAllCityAPI,
  addAddressUpdateApi:addAdressUpdateAPi,
  cleaData:cleaData,
}

export default connect(mapStateToProps, mapDispatchToProps)(AddAddress)