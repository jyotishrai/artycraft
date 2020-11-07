import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator,Header } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer';

import CheckAuth from './containers/CheckAuth'
import Login from './containers/Auth/Login'
import SignUp from './containers/Auth/SignUp'
import Home from './containers/Screens/Home'
import { navigationHeader } from './theme'
import CustomDrawer from './common/CustomDrawer';
import Otp from './containers/Auth/OTP';
import translate from './i18n/i18n'
import MyAccount from './components/Screens/MyAccount';
import EditProfile from './containers/Screens/EditProfile';
import SearchComponent from './containers/Screens/SearchComponent';
import CategoryDetails from './containers/Screens/CategoryDetails';
import Filter from './components/Screens/Filter';
import Compare from './containers/Screens/Compare';
import CategorySubDetail from './containers/Screens/CategorySubDetail';
import ColorVarient from './components/Screens/ColorVarient';
import CategoryProductDetail from './containers/Screens/CategoryProductDetail';
import ReviewRating from './containers/Screens/ReviewRating';
import OrderSummary from './containers/Screens/OrderSummary';
import Payment from './containers/Screens/Payment';
import Wishlist from './containers/Screens/Wishlist';
import Notification from './containers/Screens/Notification';
import MyOrder from './containers/Screens/MyOrder';
import AddNewCard from './components/Screens/AddNewCard';
import MyCard from './components/Screens/MyCard';
import MyAddress from './containers/Screens/MyAddress';
import AddAddress from './containers/Screens/AddAddress';
import PaymentOption from './components/Screens/PaymentOption';
import MyReview from './containers/Screens/MyReview';
import DeliveryInstallationDetails from './components/Screens/DeliveryInstallationDetails';
import OrderSummaryWithDetail from './containers/Screens/OrderSummaryWithDetail';
import TermsCondition from './components/Screens/TermsCondition';
import ViewAllProduct from './components/Screens/ViewAllProduct';
import ProductList from './components/Screens/ProductList';
import  AuthLoadingScreen  from './common/AuthLoadingScreen';
import LocationSearch from './components/Screens/LocationSearch';
import TrackOrder from './containers/Screens/TrackOrder';
import ChangePassword from './containers/Screens/ChangePassword';
import ProductSpecification from './components/Screens/ProductSpecification';
import CancelOrder from './containers/Screens/CancelOrder';

global.HeaderHeight = Header.HEIGHT;
const DrawerNavigator = createDrawerNavigator({
  Home: {
    screen: Home,
    navigationOptions:{
      // drawerLockMode:'locked-closed',
      // gesturesEnabled:'false'
    },
  }
},{
  initialRouteName:'Home',
  contentComponent:CustomDrawer

});
const AppNavigator1 = createStackNavigator({
  Auth: {screen:Login, navigationOptions:{header:null}},
  SignUp: {screen: SignUp,navigationOptions:{ }},
  Login_As_GUEST: {screen:Login, navigationOptions:{header:null}},
  Otp:{screen:Otp, navigationOptions:{header:null}},
  MyAccount:{screen:MyAccount, navigationOptions:{header:null}},
  EditProfile:{screen:EditProfile, navigationOptions:{header:null}},
  SearchComponent:{screen:SearchComponent, navigationOptions:{header:null}},
  
  CategoryDetail:{screen:CategoryDetails, navigationOptions:{header:null}},
  CategoryDetail_1:{screen:CategoryDetails, navigationOptions:{header:null}},
  CategoryDetail_2:{screen:CategoryDetails, navigationOptions:{header:null}},
  CategoryDetail_3:{screen:CategoryDetails, navigationOptions:{header:null}},
  CategoryDetail_4:{screen:CategoryDetails, navigationOptions:{header:null}},
  CategoryDetail_5:{screen:CategoryDetails, navigationOptions:{header:null}},
  CategoryDetail_6:{screen:CategoryDetails, navigationOptions:{header:null}},
  
  CategoryDetail_7:{screen:CategoryDetails, navigationOptions:{header:null}},

  Filter:{screen:Filter, navigationOptions:{header:null}},
  Compare:{screen:Compare, navigationOptions:{header:null}},
  CategorySubDetail:{screen:CategorySubDetail, navigationOptions:{header:null}},
  ColorVarient:{screen:ColorVarient, navigationOptions:{header:null}},
  CategoryProductDetail:{screen:CategoryProductDetail, navigationOptions:{header:null}},
  ReviewRating:{screen:ReviewRating, navigationOptions:{header:null}},
  OrderSummary:{screen:OrderSummary, navigationOptions:{header:null}},
  Payment:{screen:Payment, navigationOptions:{header:null}},
  Wishlist:{screen:Wishlist, navigationOptions:{header:null}},
  Notification:{screen:Notification, navigationOptions:{header:null}},
  MyOrder:{screen:MyOrder, navigationOptions:{header:null}},
  AddNewCard:{screen:AddNewCard, navigationOptions:{header:null}},
  MyCard:{screen:MyCard, navigationOptions:{header:null}},
  MyAddress:{screen:MyAddress, navigationOptions:{header:null}},
  AddAddress:{screen:AddAddress, navigationOptions:{header:null}},
  PaymentOption:{screen:PaymentOption, navigationOptions:{header:null}},
  MyReview:{screen:MyReview, navigationOptions:{header:null}},
  DeliveryInstallationDetails:{screen:DeliveryInstallationDetails, navigationOptions:{header:null}},
  OrderSummaryWithDetail:{screen:OrderSummaryWithDetail, navigationOptions:{header:null}},
  TermsCondition:{screen:TermsCondition, navigationOptions:{header:null}},
  ViewAllProduct:{screen:ViewAllProduct, navigationOptions:{header:null}},
  ProductList:{screen:ProductList, navigationOptions:{header:null}},
  LocationSearch:{screen:LocationSearch, navigationOptions:{header:null}},
  TrackOrder:{screen: TrackOrder, navigationOptions: {header: null}},
  ChangePassword:{screen: ChangePassword, navigationOptions: {header: null}},
  ProductSpecification:{screen: ProductSpecification, navigationOptions: {header: null}},
  CancelOrder:{screen: CancelOrder, navigationOptions: {header: null}},

  Drawer:{
    screen:DrawerNavigator,
    navigationOptions: {
      header: null,
    }
  }
}, {
  initialRouteName: 'Auth',
  defaultNavigationOptions: navigationHeader,

});
const AppNavigator = (createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    AppStack: AppNavigator1,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));





 
export default createAppContainer(AppNavigator)
