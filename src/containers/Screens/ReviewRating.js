import { connect } from 'react-redux'
import ReviewRating from '../../components/Screens/ReviewRating'
import { reviewRatingAPi, changeIsFrom, categoryProductDetailAPI } from '../../thunks'

const mapStateToProps = ({ReviewRating, CategorySubDetail }) => ({
  loading: ReviewRating.loading,
  data:ReviewRating.data,
  error:ReviewRating.error,
  categoryDetail: CategorySubDetail.data
})

const mapDispatchToProps = {
  reviewRatingAPI:reviewRatingAPi,
  changeIsFromCall: changeIsFrom,
  categoryProductDetailAPI: categoryProductDetailAPI
}

export default connect(mapStateToProps, mapDispatchToProps)(ReviewRating)