import { connect } from 'react-redux'

import SignUp from '../../components/Auth/SignUp'
import {
  // connectAndSubscribe,
  // createUser,
  // login,
  SignUpAPI,getAllCountryAPI, appIsFromComingReq
  // updateUser,
} from '../../thunks'

const mapStateToProps = ({ AppUsers}) => ({
  loading: AppUsers.loading,
 

  // || chat.loading || users.loading
})

const mapDispatchToProps = {
  // connectAndSubscribe,
  // createUser,
  // signIn: login,
  SignUpAPI: SignUpAPI,
  appIsFromComingReq:appIsFromComingReq

  // updateUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)