import React from 'react';
import {View, StyleSheet} from 'react-native';
import { colors } from '../theme';
import { DIMENS } from '../constants';

const CommonCircularProgress = () => {
  return(
    <View style={styles.container}>
        <View style={styles.progressLayer}>
            <View style={styles.offsetLayer}></View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
        container: {
          width: 100,
          height: 100,
          borderWidth: 10,
          borderRadius: 50,
          borderColor: 'grey',
          justifyContent: 'center',
          alignItems: 'center'
        },
        progressLayer: {
          width: 100,
          height: 100,
          borderWidth: 10,
          borderRadius: 50,
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
          borderLeftColor: 'transparent',
          borderBottomColor: 'transparent',
          borderRightColor: '#3498db',
          borderTopColor: '#3498db',
          transform:[{rotateZ: '-45deg'}]
        },
        offsetLayer: {
          width: 100,
          height: 100,
          borderWidth: 10,
          borderRadius: 50,
          borderLeftColor: 'transparent',
          borderBottomColor: 'transparent',
          borderRightColor: 'grey',
          borderTopColor: 'grey',
          transform:[{rotateZ: '-135deg'}]
        }
});

export default CommonCircularProgress;