import React from 'react'
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text, Image, StyleSheet,
    TouchableOpacity, FlatList,
    View, Dimensions, TextInput
} from 'react-native'
import Ripple from 'react-native-material-ripple';
import CommonImage from '../../common/CommonImage';
import styles from '../Auth/styles'
import { colors } from '../../theme';
import { PLACEHOLDER_PRODUCT_IMG } from '../../images'
import translate from '../../i18n/i18n';
import Basecomponents from '../../common/BaseComponent';
import { WIDTH, DIMENS, FONT_FAMILIY, HEIGHT, APP_PARAMS } from '../../constants';
import * as Utils from '../../utility/Utils';

export default class ProductDescription extends Basecomponents {
    constructor(props) {
        super(props)
       this.state = {
            descriptionArr: [],
            showIndicator: false
        }
    }

    componentDidMount() {
        if(this.props[APP_PARAMS.DATA]!=undefined && this.props[APP_PARAMS.DATA][APP_PARAMS.RES_PKT]!=undefined && this.props[APP_PARAMS.DATA][APP_PARAMS.RES_PKT][APP_PARAMS.PROD_SUMMARY_ARR_LIST]!=undefined) {
            this.setState({ descriptionArr: this.props[APP_PARAMS.DATA][APP_PARAMS.RES_PKT][APP_PARAMS.PROD_SUMMARY_ARR_LIST] })
        }
       }

    renderItem = (item, index) => {
        return (
            item!=undefined &&
                <View style={{ paddingHorizontal: DIMENS.px_10, marginTop: DIMENS.px_2}}>
                <Text style={{ color: colors.black,
                            fontFamily: FONT_FAMILIY.Roboto_Medium,
                             fontSize: DIMENS.txt_size_medium_14 }}>
                           {item.title}
                       </Text>
                       <CommonImage source={item[APP_PARAMS.IMG_LOC]!=undefined ? {uri: item[APP_PARAMS.IMG_LOC]} : PLACEHOLDER_PRODUCT_IMG} 
                       styles={{width:WIDTH-20,height:HEIGHT*28/100, marginVertical:DIMENS.px_10,borderRadius:DIMENS.px_5}}/>
                           <Text style={{
                                color: colors.grayClr,
                                fontFamily: FONT_FAMILIY.Roboto_Regular,
                                fontSize: DIMENS.txt_size_small_12,
                            }}>
                                {Utils.convertHtmlToText(item[APP_PARAMS.FULL_DESC])}
                            </Text>
            </View>   
        )
    }

    separatorComponent = () => {
        return( <View style={{ height: DIMENS.px_1, backgroundColor: colors.lightGrayText, width: '100%' }} />);
    }

    render() {
        return (
            <View style={{ flex: 1,paddingVertical:10}}>
                 <FlatList
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={this.separatorComponent}
                    data={this.state.descriptionArr}
                    renderItem={({ item, index }) => this.renderItem(item, index)}
                    keyExtractor={(item, index) => item + index}
                    extraData={this.state} />
            </View>
        )
    }
}


    
