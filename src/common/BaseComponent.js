import React, { PureComponent, Component } from 'react';
import { strings } from '../i18n/i18n';
import { Platform } from 'react-native';

import { colors } from '../theme'
import { DIMENS } from '../constants'
import translate from '../i18n/i18n'

//import DeviceInfo from 'react-native-device-info';

class Basecomponents extends Component {

  static navigationOptions = () => ({
    header: null,
    gesturesEnabled: false

  });
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  // getFontsizeMediumForBtn = () => {
  //   var fontSizeMe = responsiveFontSize(2.4);

  //   // if(fontSizeMe<=0)
  //   // fontSizeMe=30;
  //   return Dimens.txt_size_medium;
  // }
  // getFontsizeSmallForBtn = () => {
  //   // var fontSizeMe = responsiveFontSize(1.8);
  //   return Dimens.txt_size_small;
  // }

  strings(name, params = {}) {
    return strings(name, params);
  };

  // getDeviceType = () => {
  //   return Platform.OS;
  // }
  // getDeviceId = () => {
  //   return DeviceInfo.getUniqueID();
  // }

}
export default Basecomponents;
