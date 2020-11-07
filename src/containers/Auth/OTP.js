import { connect } from 'react-redux'

import Home from '../../components/Screens/Home'
import {
  otpAPI, changeIsFrom, resendOtpApi, updateProfileAPi, savUserOnLunch
} from '../../thunks'
import Otp from '../../components/Screens/Otp'

const mapStateToProps = ({ AppUsers }) => ({
  loading: AppUsers.loading,
  isFromApp: AppUsers.isFromApp,

  // || chat.loading || users.loading
})

const mapDispatchToProps = {
  otpAPI: otpAPI,
  changeIsFrom: changeIsFrom, 
  resendOtpApi: resendOtpApi,
  updateProfileAPi:updateProfileAPi,
  savUserOnEdit: savUserOnLunch


  // connectAndSubscribe,
  // createUser,
  // signIn: login,
  // loginAppUser: loginApp,
  // updateUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(Otp)