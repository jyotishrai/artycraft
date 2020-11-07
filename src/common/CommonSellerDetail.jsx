import React, { Component } from 'react';
import { Modal, View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { DIMENS, FONT_FAMILIY, APP_PARAMS, WIDTH, HEIGHT } from '../constants';
import { colors } from '../theme';
import translate from '../i18n/i18n';
import { STAR, CANCEL, CROSS } from '../images';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { RatingView } from './RatingView';
import CommonCircularProgress from './CommonCircularProgress';
// let HEIGHT = Dimensions.get('window').height

export default class CommonSellerDetail extends Component {
    render() {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.props.sellerDetailShow}
                onRequestClose={() => {
                    console.log('Modal has been closed');
                }} >
                <View style={styles.outCont}>
                    <View style={styles.inCont}>
                        <View style={styles.titleCont}>
                            <TouchableOpacity style={styles.cancelBtn}
                            onPress={this.props.onPressCross}>
                                <Image source={CROSS} />
                            </TouchableOpacity>
                            <Text style={styles.titleTxt}>About the Seller</Text>
                        </View>
                        <ScrollView>
                            <View style={{
                                padding: DIMENS.px_20
                             }}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginBottom: DIMENS.px_10
                                }}>
                                    <Text style={styles.subtitleTxt}>{('Brandonn').toUpperCase()}</Text>
                                    <RatingView rating={'4.4'} />
                                </View>
                                <Text style={{
                                    color: colors.black,
                                    fontFamily: FONT_FAMILIY.Roboto_Regular,
                                    fontSize: DIMENS.txt_size_medium  
                                }}
                                numberOfLines={4}
                                 >We are manufacturers of high qualiy products of mens tshirt, payjamas</Text>
                                <TouchableOpacity >
                                    <Text style={styles.btnTxt}>Read more</Text>
                                </TouchableOpacity>
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center', 
                                    marginVertical: DIMENS.px_20
                                }}>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center'
                                    }}>
                                    <Text style={{
                                        color: colors.grayClrForTxt,
                                        fontFamily: FONT_FAMILIY.Roboto_Regular,
                                        fontSize: DIMENS.txt_size_medium_14,
                                        marginRight: DIMENS.px_10
                                    }}>Seller since</Text>
                                    <Text style={{
                                        color: colors.black,
                                        fontFamily: FONT_FAMILIY.Roboto_Regular,
                                        fontSize: DIMENS.txt_size_medium_14,
                                        fontWeight:'bold'
                                    }}>5 year 1 month</Text>
                                    </View>
                                    <TouchableOpacity style={styles.btn}>
                                    <Text style={styles.btnTxt}>Contact Seller</Text>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                <CommonCircularProgress />
                                </View>
                                <Text style={{
                                    color: colors.grayClrForTxt,
                                    fontFamily: FONT_FAMILIY.Roboto_Regular,
                                    fontSize: DIMENS.txt_size_medium_14,
                                    marginVertical: DIMENS.px_15
                                }}>Seller score is calculated by App based on customer feedback and seller's performance</Text>
                            </View>
                        </ScrollView>
                    </View>
                </View>

            </Modal>
        );
    }
}

styles = StyleSheet.create({
    outCont: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0, 0.6)',
    },
    inCont: {
        marginTop: HEIGHT * 0.3,
        backgroundColor: colors.white,
    },
    titleCont: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: DIMENS.px_1,
        borderBottomColor: colors.lightGrayText,
        paddingVertical: DIMENS.px_10,
        paddingHorizontal: DIMENS.px_5,
    },
    cancelBtn: {
        paddingHorizontal: DIMENS.px_5, margin: DIMENS.px_10
    },
    titleTxt: {
        marginLeft: DIMENS.px_10,
        fontFamily: FONT_FAMILIY.Roboto_Regular,
        fontSize: DIMENS.txt_size_large,
        color: colors.grayClr
    },
    contentCont: {
        padding: DIMENS.px_15
    },
    subtitleTxt: {
        // padding: DIMENS.px_5,
        // marginVertical: DIMENS.px_10,
        fontFamily: FONT_FAMILIY.Roboto_Regular,
        fontSize: DIMENS.txt_size_large,
        fontWeight: 'bold',
        marginRight: DIMENS.px_10,
        color: colors.black
    },
    btnCont: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    btnTxt: {
        color: colors.primary,
        fontFamily: FONT_FAMILIY.Roboto_Regular,
        fontSize: DIMENS.txt_size_medium  
    },
    btn: {
        borderWidth: DIMENS.px_1,
        borderColor: colors.lightGrayText,
        paddingVertical: DIMENS.px_8,
        paddingHorizontal: DIMENS.px_15,
        borderRadius: DIMENS.px_5
    }
})