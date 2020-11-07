

import React from 'react';
import Toast from 'react-native-tiny-toast';
import {colors} from '../../src/theme'

let toast;
export default function showToast(message, type, duration = 2000) {
    Toast.show(message, {
        position:-1,
        duration: duration,
        textColor: colors.white,
        containerStyle: {
            backgroundColor:  colors.primary_fade,
            // type == 'success' ? colors.green
            //     : type == 'error' ? colors.primary_fade : type == 'info'
            //         ? colors.primary_fade : 'white',
            
            width:'100%',
            padding: 15,
            borderRadius:0,
            marginBottom: -1,
            borderTopLeftRadius:15,
            borderTopRightRadius:15,
        },
    });
}



export function hideLoading() {
    Toast.hide(toast);
}



export function showLoading(message = '') {
    toast = Toast.showLoading(message, {
        position: 'absolute',
        containerStyle: {
            padding: 20,
            backgroundColor: colors.primary,
        },
        textColor: 'white',
        textstyle: { fontSize: 16 },
    });

}



export function showErrorToast(message) {
    Toast.show(message, {
        position:-1,
        duration: 1000,
        textColor: colors.white,
        containerStyle: {
            backgroundColor: colors.primary,
            width:'100%',

            padding: 15,
            borderRadius:0,
            marginBottom: -1,
           // borderTopLeftRadius:15,
            //borderTopRightRadius:15,
        },
    });
 //showToast(message, 'error');
}
export function showErrorFailToast(message) {
    alert(message);
}



export function showSuccessToast(message) {
    showToast(message, 'success');
}

export function showInfoToast(message, duration) {
    if (duration != undefined) {
        showToast(message, 'info', 3000);
    } else {
        showToast(message, 'info');
    }
}

