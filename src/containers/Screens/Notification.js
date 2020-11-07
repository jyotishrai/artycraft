import { connect } from 'react-redux'

import Notification from '../../components/Screens/Notification';

import { getNotificationAPi } from '../../thunks/Notification';

const mapStateToProps = ({ Notification }) => ({
  loading: Notification.loading,
  data:Notification.data
})

const mapDispatchToProps = {
  getNotificationAPi:getNotificationAPi
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification)