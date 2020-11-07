// import React, { Component } from 'react';
// import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { DIMENS, FONT_FAMILIY, APP_PARAMS } from '../constants';
// import { colors } from '../theme';
// import translate from '../i18n/i18n';

// export default class CommonDialog extends Component {
//     render() {
//         return(
//             <Modal
//                 animationType="slide"
//                 transparent={true}
//                 visible={this.props.modalVisible}
//                 onRequestClose={() => {
//                     console.log('Modal has been closed');
//                 }} >
//                     <View style={styles.outCont}>
//                     <View style={styles.inCont}>
//                         <View style={styles.titleCont}>
//                             <Text style={styles.titleTxt}>{translate('APP_NAME')}</Text>
//                         </View>
//                         <View style={styles.contentCont}>
//                         <Text style={styles.subtitleTxt}>{this.props.subtitle}</Text>
//                         <View style={styles.btnCont}>
//                             <TouchableOpacity style={styles.btn} onPress={this.props.okPressed}>
//                                 <Text style={styles.btnTxt}>{(translate('OK')).toUpperCase()}</Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity style={[styles.btn, {marginLeft: DIMENS.px_20}]} onPress={this.props.cancelPressed}>
//                                <Text style={styles.btnTxt}>{translate('CANCEL').toUpperCase()}</Text>
//                             </TouchableOpacity>
//                         </View>
//                         </View>
//                     </View>
//                     </View>

//             </Modal>
//         );
//     }
// }

// styles=StyleSheet.create({
//     outCont: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: 'rgba(0,0,0, 0.6)',
//     },
//     inCont: {
//         marginHorizontal: DIMENS.px_30,
//         backgroundColor: colors.white,
//         borderRadius: DIMENS.px_8,
//     },
//     titleCont: {
//         borderTopLeftRadius: DIMENS.px_8,
//         borderTopRightRadius: DIMENS.px_8,
//         backgroundColor: colors.primary,
//         padding: DIMENS.px_10,
//     },
//     titleTxt: {
//         fontFamily: FONT_FAMILIY.Roboto_Regular, 
//         fontSize: DIMENS.txt_size_large,
//         color: colors.white,
//         fontWeight: 'bold',
//         textAlign: 'center'
//     },
//     contentCont: {
//         padding: DIMENS.px_15
//     },
//     subtitleTxt: {
//         padding: DIMENS.px_5, 
//         marginVertical: DIMENS.px_10,
//         fontFamily: FONT_FAMILIY.Roboto_Regular, 
//         fontSize: DIMENS.txt_size_large,
//     },
//     btnCont: {
//         flexDirection: 'row',
//         justifyContent: 'flex-end',
//         alignItems: 'center'
//     },
//     btnTxt: { 
//         fontFamily: FONT_FAMILIY.Roboto_Regular, 
//         fontSize: DIMENS.txt_size_medium,
//         color: colors.white
//     },
//     btn: {
//         marginTop: DIMENS.px_10,
//         justifyContent: 'center',
//         alignItems: 'center',
//         paddingVertical: DIMENS.px_10,
//         paddingHorizontal: DIMENS.px_15,
//         backgroundColor: colors.primary,
//         borderRadius: DIMENS.px_8
//     }
// })

import React, { Component } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DIMENS, FONT_FAMILIY, APP_PARAMS } from '../constants';
import { colors } from '../theme';
import translate from '../i18n/i18n';

export default class CommonDialog extends Component {
    render() {
        return(
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.props.modalVisible}
                onRequestClose={() => {
                    alert('Modal has been closed');
                }} >
                    <View style={styles.outCont}>
                    <View style={styles.inCont}>
                        <View style={styles.titleCont}>
                            <Text style={styles.titleTxt}>{translate('APP_NAME')}</Text>
                        </View>
                        <View style={styles.contentCont}>
                        <Text style={styles.subtitleTxt}>{this.props.subtitle}</Text>
                        <View style={styles.btnCont}>
                            <TouchableOpacity style={styles.btn} onPress={this.props.okPressed}>
                                <Text style={styles.btnTxt}>{(translate('OK')).toUpperCase()}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.btn, {marginLeft: DIMENS.px_20}]} onPress={this.props.cancelPressed}>
                               <Text style={styles.btnTxt}>{translate('CANCEL').toUpperCase()}</Text>
                            </TouchableOpacity>
                        </View>
                        </View>
                    </View>
                    </View>

            </Modal>
        );
    }
}

styles=StyleSheet.create({
    outCont: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0, 0.6)',
    },
    inCont: {
        marginHorizontal: DIMENS.px_30,
        backgroundColor: colors.white,
        borderRadius: DIMENS.px_8,
    },
    titleCont: {
        borderTopLeftRadius: DIMENS.px_8,
        borderTopRightRadius: DIMENS.px_8,
        backgroundColor: colors.primary,
        padding: DIMENS.px_10,
    },
    titleTxt: {
        fontFamily: FONT_FAMILIY.Roboto_Regular, 
        fontSize: DIMENS.txt_size_large,
        color: colors.white,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    contentCont: {
        padding: DIMENS.px_15
    },
    subtitleTxt: {
        padding: DIMENS.px_5, 
        marginVertical: DIMENS.px_10,
        fontFamily: FONT_FAMILIY.Roboto_Regular, 
        fontSize: DIMENS.txt_size_large,
    },
    btnCont: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    btnTxt: { 
        fontFamily: FONT_FAMILIY.Roboto_Regular, 
        fontSize: DIMENS.txt_size_medium,
        color: colors.white
    },
    btn: {
        marginTop: DIMENS.px_10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: DIMENS.px_10,
        paddingHorizontal: DIMENS.px_15,
        backgroundColor: colors.primary,
        borderRadius: DIMENS.px_8
    }
})