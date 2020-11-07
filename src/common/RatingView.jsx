import React, { Component } from 'react';
import { Modal, View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { DIMENS, FONT_FAMILIY, APP_PARAMS } from '../constants';
import { colors } from '../theme';
import translate from '../i18n/i18n';
import { STAR } from '../images';

export const RatingView = (props) => {
    return(
        <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: DIMENS.px_3,
            paddingHorizontal: DIMENS.px_10,
            backgroundColor: colors.primary,
            borderRadius: DIMENS.px_15
        }}>
            <Text style={{
                color: colors.white,
                fontFamily: FONT_FAMILIY.Roboto_Regular, 
                fontSize: DIMENS.txt_size_small_12,
                marginRight: DIMENS.px_5,

            }}>{props.rating}</Text>
            <Image source={STAR} 
            style={{
                tintColor: colors.white,
                height: DIMENS.px_10,
                width: DIMENS.px_10
            }} />
        </View>
    );
}
 