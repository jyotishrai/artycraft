import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View, Image, TouchableHighlight, DeviceEventEmitter
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { colors } from '../theme'
import { LOGO } from '../images'
import { retrieveData, storeData } from '../common/AsyncStorage'
import { connect } from 'react-redux'
import { KEY, CONST } from '../constants';
import NavigationService from '../NavigationService';
import { savUserOnLunch } from '../thunks';
import styles from '../components/Auth/styles'



class AuthLoadingScreen extends React.PureComponent {
  constructor() {
    super();
    this._bootstrapAsync();
    this.linklistner = false
    DeviceEventEmitter.removeListener('linking')
    this.linking = DeviceEventEmitter.addListener('linking', (data) => this.navigateCls(data));
  }
  componentWillUnmount() {

  }
  navigateCls = (data) => {
    this.linklistner = true
    this._bootstrapAsync(data);
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async (linkingData) => {
    let userData = await AsyncStorage.getItem(KEY.USER_DATA);
    userData = JSON.parse(userData)
    global[KEY.USER_DATA] = userData
    this.props.savUserOnLunch(userData)
    if (!this.linklistner) {
      retrieveData(KEY.AS_GUESt_USER, result => {
        if (result != undefined && result) {
          global[KEY.AS_GUESt_USER] = true
          NavigationService.clearStack('Drawer')
        } else {
          NavigationService.clearStack(userData ? 'Drawer' : 'Auth')
        }
      })
    } else {
      this.linklistner = false
      if (!userData) {
        storeData(KEY.AS_GUESt_USER, true)
        global[KEY.AS_GUESt_USER] = true
      }

      NavigationService.clearStack('Drawer')
      DeviceEventEmitter.emit(CONST.DEEP_LINK, linkingData)

    }

  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={{
        alignItems: 'center',
        backgroundColor: colors.white,
        flex: 1,
        justifyContent: 'center',
        width: '100%'
      }}>
        <Image source={LOGO} style={styles.splashLogo} />
        <ActivityIndicator color={colors.white} size="large" />
      </View>
    );
  }
}
const mapStateToProps = ({ AppUsers }) => ({
  loading: AppUsers.loading,

})

const mapDispatchToProps = {
  savUserOnLunch: savUserOnLunch,
}
export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen)
