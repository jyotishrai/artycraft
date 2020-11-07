import { connect } from 'react-redux';
import ChangePassword from '../../components/Screens/ChangePassword';

import { changePasswordAPI } from '../../thunks'

const mapStateToProps = ({ ChangePassword }) => ({
  
  loading: ChangePassword.loading,
  data:ChangePassword.data,
})

const mapDispatchToProps = {
  changePasswordApi: changePasswordAPI
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)