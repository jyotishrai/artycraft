import { connect } from 'react-redux'
import { updateProfileAPi, savUserOnLunch, loginApiUser } from '../../thunks'
import { APP_PARAMS } from '../../constants'
import EditProfile from '../../components/Screens/EditProfile'

const mapStateToProps = ({EditProfile }) => ({
    loading:EditProfile.loading,
    data : EditProfile.data
})

const mapDispatchToProps = {
    updateProfileAPi:updateProfileAPi,
    savUserOnEdit: savUserOnLunch,
    otpFromMobile:loginApiUser
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)