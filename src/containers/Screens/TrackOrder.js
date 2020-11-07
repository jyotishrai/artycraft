import { connect } from 'react-redux'

import {  getTrackFullDetailAPi, getTrackIDAPi } from '../../thunks'
import TrackOrder from '../../components/Screens/TrackOrder'


const mapStateToProps = ({ TrackOrder }) => ({
    loading:TrackOrder.loading,
    data:TrackOrder.data
})

const mapDispatchToProps = {
    getTrackFullDetailAPi:getTrackFullDetailAPi,
    getTrackIdAPi:getTrackIDAPi
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackOrder)