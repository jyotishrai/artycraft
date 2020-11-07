import 'react-native-gesture-handler' // TODO: remove when bug will be fixed https://github.com/kmagiera/react-native-gesture-handler/issues/320
import { AppRegistry,DeviceEventEmitter } from 'react-native';
import App from './src';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import { KEY, CONST } from './src/constants';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);

    global[KEY.NOTICATION_COUNT] = global[KEY.NOTICATION_COUNT]!=undefined?global[KEY.NOTICATION_COUNT] + 1 : 1
    console.log("background:::::::--",global[KEY.NOTICATION_COUNT]);
    
    DeviceEventEmitter.emit(CONST.NOTYFY_COUNT)
  });

AppRegistry.registerComponent(appName, () => App);
