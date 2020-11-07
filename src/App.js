import React from 'react'
import { connect } from 'react-redux'
import { AppState, StatusBar, StyleSheet, View, Platform, SafeAreaView, Text, Linking, DeviceEventEmitter } from 'react-native'
import NetInfo from '@react-native-community/netinfo'
import FlashMessage from 'react-native-flash-message'

import Navigator from './Navigation'
import NavigationService from './NavigationService'
import Loading from './components/Loading'
import { connectionStateChanged } from './actionCreators'
import { appStartThunk, trackAppState, connectionStateHandler } from './thunks'
import { colors } from './theme'
import CommonStatusBar from './common/CommonStatusBar'
import { CONST, APP_PARAMS, KEY } from './constants'

import messaging, { AuthorizationStatus } from '@react-native-firebase/messaging';
import { storeData } from './common/AsyncStorage'
console.disableYellowBox = true;
import PushNotificationAndroid from 'react-native-push-notification'

import PushNotificationIOS from "@react-native-community/push-notification-ios";
var PushNotification = require("react-native-push-notification");



const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.colorPrimarydark,
    flex: 1,
    justifyContent: 'center',
    //width: '100%',
  },
  navigatorView: {
    flex: 1,
    width: '100%',
  },
})
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;
class App extends React.Component {

  NO_INTERNET = 'Seems like there is no internet connection'


  constructor(props) {
    super(props)


    try {
      this.foregroundUnsubscribe = undefined
      props.appStartThunk()
    } catch (e) {

    }

    // let userDetail = await Utils.getUserDetail()
  }
  componentDidMount() {
    try {
      this.deeplinking()
    } catch (e) {

    }

    try {
      const {
        //appStateHandler,
        connectionState,
        netInfoHandler,
      } = this.props
      NetInfo.fetch().then(netInfoState => {
        connectionState(netInfoState.isConnected)
      })


      AppState.addEventListener('change', this.appStateHandler)
      this.netInfoUnsubscribe = NetInfo.addEventListener(netInfoHandler)
      //  NotificationHandler.requestUserPermission()
      this.requestUserPermission()
      PushNotification.cancelAllLocalNotifications()
    } catch (e) {

    }

  }
  componentWillUnmount() {
    AppState.removeEventListener('change', this.appStateHandler)
    Linking.removeEventListener('url', this.handleOpenURL);
    this.netInfoUnsubscribe && this.netInfoUnsubscribe()
    this.foregroundUnsubscribe && this.foregroundUnsubscribe.remove()
    PushNotification.cancelAllLocalNotifications()
    DeviceEventEmitter.removeListener('linking')
  }
  appStateHandler = (appState) => {
    if (appState == "active") {
      DeviceEventEmitter.emit(CONST.NOTYFY_COUNT)
    }
  }
  //Deep linking
  deeplinking = async () => {
    try {
      // if (Platform.OS === 'android') {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl != undefined) this.navigate(initialUrl);

      // Linking.getInitialURL().then(url => {
      //   console.log("android::--url", url);

      //   if (url != undefined) this.navigate(url);
      // });
      // } else {
      Linking.addEventListener('url', this.handleOpenURL);
      //}
    } catch (error) {
      alert("error:--" + error)
    }
  }
  handleOpenURL = (event) => {
    this.navigate(event.url);
  }
  navigate = (url) => {
    let productId = url.substring(url.lastIndexOf('/') + 1)
    DeviceEventEmitter.emit('linking', { [APP_PARAMS.PRODUCT_U_UID]: productId })
  }
  //Notification
  token = () => {
    // Get the device token
    messaging().getToken().then(token => {
      console.log('token:', token);
      storeData(KEY.FCM_TOKEN, token)
      global[KEY.FCM_TOKEN] = token
    });

    // Listen to whether the token changes
    return messaging().onTokenRefresh(token => {
      console.log('token:', token);
      storeData(KEY.FCM_TOKEN, token)
      global[KEY.FCM_TOKEN] = token

    });

  }
  requestUserPermission = async () => {
    if (Platform.OS == 'ios') {
      this.checkIOSApplicationPermission()
    } else if (Platform.OS == 'android') {
      this.checkAndroidApplicationPermission()
    }
  }
  checkAndroidApplicationPermission = async () => {
    const enabled = await messaging().hasPermission();
    if (enabled) {
      this.token()
      this.notificationService()
    } else {
      const authStatus = await messaging().requestPermission();
      this.token()
      this.notificationService()
    }
  }
  checkIOSApplicationPermission = async () => {
    const authorizationStatus = await messaging().requestPermission();
    if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
      console.log('User has notification permissions enabled.');
      //this.token()
      //this.notificationService()
    } else if (authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL) {
      console.log('User has provisional notification permissions.');
      this.token()
      this.notificationService()
    } else {
      console.log('User has notification permissions disabled');
    }
  }
  notificationService = () => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage,
      );
      DeviceEventEmitter.emit(CONST.NOTYFY_MOVE, remoteMessage)
    });
    // Check whether an initial notification is available
    messaging().getInitialNotification().then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage,
        );
      }
    });
    //foreground state
    this.foregroundUnsubscribe = messaging().onMessage(async remoteMessage => {
      global[KEY.NOTICATION_COUNT] = global[KEY.NOTICATION_COUNT] != undefined ? global[KEY.NOTICATION_COUNT] + 1 : 1
      console.log('Notification caused app to open from foreground state:', remoteMessage);
      DeviceEventEmitter.emit(CONST.NOTYFY_COUNT)
      let data = remoteMessage.data
      this.notificationConfigure(remoteMessage.data)
      PushNotification.configure({
        onNotification: this.onNotification.bind(this),
      })
    });
  }
  onNotification(notification) {
    if (notification.ignoreInForeground != undefined) {
      DeviceEventEmitter.emit(CONST.NOTYFY_MOVE, notification)
    }
  }
  notificationConfigure = (data) => {
    PushNotification.localNotification({

      /* Android Only Properties */
      // id: 0, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
      // ticker: "My Notification Ticker", // (optional)
      autoCancel: true, // (optional) default: true
      largeIcon: "ic_launcher", // (optional) default: "ic_launcher"
      smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher"
      // bigText: "My big text that will be shown when notification is expanded", // (optional) default: "message" prop
      // subText: "This is a subText", // (optional) default: none
      color: colors.primary, // (optional) default: system default
      vibrate: true, // (optional) default: true
      vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      tag: "some_tag", // (optional) add tag to message
      group: "group", // (optional) add group to message
      ongoing: false, // (optional) set whether this is an "ongoing" notification
      priority: "high", // (optional) set notification priority, default: high
      visibility: "private", // (optional) set notification visibility, default: private
      importance: "high", // (optional) set notification importance, default: high
      allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
      ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear)

      // image:"https://files.allaboutbirds.net/wp-content/uploads/2015/06/prow-featured.jpg",
      picture: "https://files.allaboutbirds.net/wp-content/uploads/2015/06/prow-featured.jpg",
      /* iOS only properties */
      alertAction: "view", // (optional) default: view
      category: "", // (optional) default: empty string
      userInfo: { id: '123' }, // (optional) default: {} (using null throws a JSON value '<null>' error)

      /* iOS and Android properties */
      title: data.title, // (optional)
      message: data.body ? data.body : '', // (required)
      soundName: "default", // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
      //actions: '["Accept"]', // (Android only) See the doc for notification actions to know more

    });

  }
  render() {
    const { online } = this.props
    return (

      <SafeAreaView style={{ backgroundColor: colors.colorPrimarydark, flex: 1, width: '100%' }}>
        <View style={styles.container}>
          <StatusBar
            backgroundColor={colors.colorPrimarydark}
            barStyle='light-content'
          />
          <View style={styles.navigatorView}>
            <Navigator ref={NavigationService.init} />
            {
              !online &&
              <Loading message={this.NO_INTERNET} online={!online} />
            }
          </View>
          {/* {online ? (
          <View style={styles.navigatorView}>
            <Navigator ref={NavigationService.init} />
          </View>
        ) : (
            <Loading message={this.NO_INTERNET} />
          )} */}
          <FlashMessage position="bottom" />
        </View>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = ({ app }) => ({
  online: app.online
})

const mapDispatchToProps = {
  appStartThunk,
  connectionState: connectionStateChanged,
  netInfoHandler: connectionStateHandler,
  // appStateHandler: trackAppState,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)


