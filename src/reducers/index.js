import { combineReducers } from 'redux'


import AppUsers from './AppUsers'
import app from './app'
import GeoLocation from './GeoLocation'
import Home from './Home'
import SearchComponent from './SearchComponent'
import CategoryDetails from './CategoryDetails'
import AddAddress from './AddAddress'
import CategorySubDetail from './CategorySubDetail'
import Wishlist from './Wishlist'
import MyAddress from './MyAddress'
import ReviewRating from './ReviewRating'
import OrderSummary from './OrderSummary'
import Payment from './Payment'
import OrderSummaryWithDetail from './OrderSummaryWithDetail'
import MyOrder from './MyOrder'
import TermsConditon from './TermsConditon'
import EditProfile from './EditProfile'
import ChangePassword from './ChangePassword'
import TrackOrder from './TrackOrder'
import CategoryProductDetail from './CategoryProductDetail'
import Compare from './Compare'
import MyReview from './MyReview'
import Notification from './Notification'




export default combineReducers({
  AppUsers, app,GeoLocation,Home,SearchComponent,CategoryDetails,
  AddAddress,CategorySubDetail,Wishlist,MyAddress,ReviewRating,OrderSummary,Payment,
  OrderSummaryWithDetail, MyOrder,TermsConditon,EditProfile, ChangePassword,TrackOrder, 
  CategoryProductDetail,Compare, MyReview,Notification
})