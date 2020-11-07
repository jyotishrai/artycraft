const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

import { StyleSheet, View, Platform, StatusBar } from "react-native";
import React from "react";
import {colors} from '../theme'

const MyStatusBar = ({ backgroundColor, ...props }) => (
<View style={ [styles.statusBar, {backgroundColor:colors.colorPrimarydark}] }>
<StatusBar hidden={false} translucent backgroundColor={colors.colorPrimarydark}  barStyle='light-content' {...props} />
</View>
);

const CommonStatusBar = (props) => {
return (
<MyStatusBar backgroundColor={colors.colorPrimarydark} />
);
}
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;
const styles = StyleSheet.create({
statusBar: {
height: STATUSBAR_HEIGHT,
},
})
export default CommonStatusBar;