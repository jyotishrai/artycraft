import { connect } from 'react-redux'

import Home from '../../components/Screens/Home'
import {
  homeAPi, orderSummaryCallFrom
} from '../../thunks'

const mapStateToProps = ({ Home }) => ({
  loading: Home.loading,
  
  // || chat.loading || users.loading
})

const mapDispatchToProps = {
  homeApiReq:homeAPi,
  orderSummaryCallFrom:orderSummaryCallFrom
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)