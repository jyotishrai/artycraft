import { connect } from 'react-redux'

import MyReview from '../../components/Screens/MyReview'
import {
    getCommentReviewListAPI, deleteCommentReviewAPI
} from '../../thunks'
import { APP_PARAMS } from '../../constants'

const mapStateToProps = ({ MyReview }) => ({
  loading: MyReview.loading,
  data:MyReview.data,
  error:MyReview.error,
})

const mapDispatchToProps = {
    getCommentReviewListAPI: getCommentReviewListAPI,
    deleteCommentReviewAPI:deleteCommentReviewAPI
    
}

export default connect(mapStateToProps, mapDispatchToProps)(MyReview)