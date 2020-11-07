import React from 'react'
import { Image, TouchableOpacity, View, Text ,FlatList} from 'react-native'
import { COMPARE, SORT, FILTER, UNCHECK, RADIO_POINT, CIRCLE } from '../images'
import styles from '../components/Auth/styles'
import Ripple from 'react-native-material-ripple'
import translate from '../i18n/i18n';
import Modal from 'react-native-modal'

import { colors } from '../theme'
import { DIMENS, FONT_FAMILIY, WIDTH } from '../constants'
import Basecomponents from './BaseComponent'

export default ({ onComparePress, onSortPress, onFilterPress, compare, textHeader, alignItems, imageSource, height, justifyContent, text, }) => (
    <View style={{
        borderBottomColor: colors.lightGraytransparent,
        borderBottomWidth: DIMENS.px_1,
        justifyContent: 'space-evenly',
        flexDirection: 'row',
    }}>
        {
            compare &&
            <Ripple style={{ paddingVertical: DIMENS.px_10, width: WIDTH / 3, flexDirection: 'row', backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', borderRightColor: colors.lightGrayText, borderRightWidth: 1, flex: 1 }} onPress={onComparePress}>
                <Image source={COMPARE} style={{ marginLeft: DIMENS.px_10, marginRight: DIMENS.px_5, height: DIMENS.px_15, width: DIMENS.px_15, resizeMode: 'contain' }} />
                <Text style={{ color: colors.black, fontSize: DIMENS.txt_size_medium_14, fontFamily: FONT_FAMILIY.Roboto_Regular }}>{translate('COMPARE')}</Text>
            </Ripple>
        }
        <Ripple style={{ paddingVertical: DIMENS.px_10, width: WIDTH / 3, flexDirection: 'row', backgroundColor: colors.white, alignItems: 'center', borderRadius: 2, justifyContent: 'center', borderRightColor: colors.lightGrayText, borderRightWidth: 1, flex: 1 }} onPress={onSortPress}>
            <Image source={SORT} style={{ marginLeft: DIMENS.px_10, marginRight: DIMENS.px_5, height: DIMENS.px_15, width: DIMENS.px_15, resizeMode: 'contain' }} />
            <Text style={{ color: colors.black, fontSize: DIMENS.txt_size_medium_14, fontFamily: FONT_FAMILIY.Roboto_Regular }}>{translate('SORT')}</Text>
        </Ripple>
        <Ripple style={{ paddingVertical: DIMENS.px_10, width: WIDTH / 3, flexDirection: 'row', backgroundColor: colors.white, alignItems: 'center', borderRadius: 2, justifyContent: 'center', flex: 1 }} onPress={onFilterPress}>
            <Image source={FILTER} style={{ marginLeft: DIMENS.px_10, marginRight: DIMENS.px_5, height: DIMENS.px_15, width: DIMENS.px_15, resizeMode: 'contain' }} />
            <Text style={{ color: colors.black, fontSize: DIMENS.txt_size_medium_14, fontFamily: FONT_FAMILIY.Roboto_Regular }}>{translate('FILTER')}</Text>
        </Ripple>

    </View>
)

export const SortCompomnent = (props) => {
    const {data} = props
    return (
        <Modal
            animationType="slide"
            style={{
                backgroundColor: colors.blackTransparent_bG,
                margin: 0,// bottom: 0
            }}
            transparent={true}
            isVisible={props.modalVisible}
            onBackdropPress={props.closePopOver}
            onDismiss={props.closePopOver}
            onRequestClose={() => props.closePopOver}
        >
            <View style={{backgroundColor:colors.white,bottom:0,position:'absolute',width:'100%'}}>
            <Text style={{color: colors.lightGrayClr,
                          fontSize: DIMENS.txt_size_large, fontFamily: FONT_FAMILIY.Roboto_Regular,
                          borderBottomColor:colors.lightGrayText ,borderBottomWidth:DIMENS.px_05,padding:DIMENS.px_10}}>
                                        {translate('SORT_BY')}
                    </Text>
                {
                    data.map((item,index) => {
                        return (
                                <View style={{ flexDirection: 'row',alignItems:'center',justifyContent:'space-between',width:'100%' }}>
                                    <Text style={{flex:9,marginHorizontal:DIMENS.px_15,color: colors.black,
                                         fontSize: DIMENS.txt_size_medium_14, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                                        {(item.sort.split('_').join(' ')).charAt(0).toUpperCase()+ (item.sort.split('_').join(' ')).slice(1).toLowerCase()}
                                    </Text>
                                    <Ripple style={{flex:1,justifyContent:'flex-end',backgroundColor:'green',right:10,marginHorizontal:DIMENS.px_10,paddingVertical: DIMENS.px_10, width: WIDTH / 3, flexDirection: 'row', backgroundColor: colors.white, alignItems: 'center', borderRadius: 2, justifyContent: 'center', flex: 1 }}
                                     onPress={()=>props.onSelectSort(item,index)}>
                                        <Image source={item.isSelected ?RADIO_POINT: CIRCLE} style={{ height: DIMENS.px_20, width: DIMENS.px_20, 
                                            resizeMode: 'contain' }} />
                                    </Ripple>
                                </View>
                        )
                    })
                }
            </View>
        </Modal>
    )
}