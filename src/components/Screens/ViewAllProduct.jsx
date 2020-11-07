import React from 'react'
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text, Image,
    TouchableOpacity, FlatList,
    View, Dimensions, TextInput
} from 'react-native'
import Ripple from 'react-native-material-ripple';
import styles from '../Auth/styles'
import { colors } from '../../theme';
import { NOTIFICATION, HEART, SEARCH, ORDER } from '../../images'
import HeaderButton from '../HeaderButton'
import translate from '../../i18n/i18n';
import { DIMENS, FONT_FAMILIY, WIDTH, HEIGHT, CURRENCY } from '../../constants';
import Basecomponents from '../../common/BaseComponent';
import CommonNavHeader from '../../common/CommonNavHeader';
import { CommonBillingView, CommonViewAllItem, CommonALlOffer } from '../../common/CommonProductRow';
import CommonOrderSummaryProduct from '../../common/CommonOrderSummaryProduct'
import CommonDropDown from '../../common/CommonDropDown';
import CompareSortFiltr from '../../common/CompareSortFiltr';


export default class ViewAllProduct extends Basecomponents {
    constructor(props) {
        super(props)

        this.state = {
            productArr: [
                { imageLocations: require('../../assets/images/shoe.png'), discountPrice: '799', price: '1500', name: 'Realme 3i(Diamond Blue, 32GB)', rating: '3.3', ratingCount: '2,333' },
                { imageLocations: require('../../assets/images/shoe.png'), discountPrice: '799', price: '1500', name: 'Realme 3i(Diamond Blue, 32GB)', rating: '3.3', ratingCount: '2,333' },
                { imageLocations: require('../../assets/images/micro.png'), discountPrice: '799', price: '1500', name: 'Realme 3i(Diamond Blue, 32GB)', rating: '3.3', ratingCount: '2,333' },
                { imageLocations: require('../../assets/images/shoe.png'), discountPrice: '799', price: '1500', name: 'Realme 3i(Diamond Blue, 32GB)', rating: '3.3', ratingCount: '2,333' }
            ]
        }
    }
    componentDidMount() {

    }

    renderItem = (item, index) => {
        return (
            <CommonALlOffer
            item={item}
            onPress={()=>this.props.navigation.navigate('CategorySubDetail')}/>

        )
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <CommonNavHeader title={'Shoes'}
                      rightIcon1={HEART}
                      rightIcon={SEARCH}
                      rightIcon2={ORDER}
                      searchPress={() => this.props.navigation.navigate('SearchComponent')}
                      backPress={() => this.props.navigation.goBack()} />
                <View style={{ flex: 1 }}>
                    <View>
                        {
                            this.state.productArr != undefined && this.state.productArr.length > 0&&
                         <View style={{ backgroundColor: colors.white, marginTop: DIMENS.px_0, marginHorizontal: DIMENS.px_10 }}>
                            <FlatList
                                numColumns={this.state.productArr.length > 1 ? 2 : 1}
                                showsVerticalScrollIndicator={false}
                                data={this.state.productArr}
                                renderItem={({ item, index }) => this.renderItem(item, index)}
                                extraData={this.state}
                                keyExtractor={(item,index) => index.toString()}
                            />
                        </View>
                        }
                    </View>

                </View>
            </View>
        )
    }
}