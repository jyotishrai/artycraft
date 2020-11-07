import { connect } from 'react-redux'

import Login from '../../components/Auth/Login'
import {
  // connectAndSubscribe,
  // createUser,
  // login,
  loginApiUser, getAllCountryAPI, changeIsFrom, appIsFromComingReq
  // updateUser,
} from '../../thunks'

const mapStateToProps = ({ AppUsers, AddAddress }) => ({
  loading: AppUsers.loading,
  isFromApp: AppUsers.isFromApp,
  data: AppUsers.user,
  isFromApp: AppUsers.isFromApp,
  error: AppUsers.error,

  country: AddAddress.country,
  countryLoader: AddAddress.loading
})

const mapDispatchToProps = {
  loginAppUser: loginApiUser,
  changeIsFrom: changeIsFrom,
  getAllCountries: getAllCountryAPI,
  appIsFromComingReq:appIsFromComingReq,

}

export default connect(mapStateToProps, mapDispatchToProps)(Login)