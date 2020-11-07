import { connect } from 'react-redux'

import SearchComponent from '../../components/Screens/SearchComponent'
import {
  SearchComponentAPI
} from '../../thunks'

const mapStateToProps = ({ SearchComponent }) => ({
  loading: SearchComponent.loading
  // || chat.loading || users.loading
})

const mapDispatchToProps = {
  searchAPi:SearchComponentAPI
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchComponent)