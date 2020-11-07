import React from 'react'
import { Image, TouchableOpacity, View, Text, FlatList } from 'react-native'
import { SHOP_CART, MENU, NOTIFICATION, ORDER, RADIO_POINT, CIRCLE } from '../images'
import styles from '../components/Auth/styles'
import Ripple from 'react-native-material-ripple'
import Modal from 'react-native-modal'
import { colors } from '../theme'
import { DIMENS, FONT_FAMILIY, APP_PARAMS } from '../constants'
import translate from '../i18n/i18n';
import Basecomponents from './BaseComponent'


export default class CommonAddressView extends Basecomponents {
    constructor(props) {
        super(props)
        this.state = {
            modalAddressVisible: this.props.modalAddressVisible,
            dataList: this.props.data
        }
    }
    componentDidMount = () => {
        console.log('props data:-',JSON.stringify(this.props.data));
        
        if (this.props.dataList != undefined && this.props.dataList.length > 0) {
            let dataListTemp = this.props.dataList
            dataListTemp.forEach(element => {
                element.isSelected = false
            });
            this.setState({ dataList: dataListTemp })
        }
    }
    selectItem = (item, index) => {
        let dataListTemp = this.state.dataList
        dataListTemp.forEach((element, eltIndx) => {
            if (index === eltIndx)
                element.isSelected = true
            else
                element.isSelected = false
        });
        this.setState({ dataList: [...dataListTemp] },
            this.props.selectItem(item),
            this.closePopOver() )
    }
    renderItem = (item, index) => {
        return (
            <View style={{ backgroundColor: colors.white, padding: 5, flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: colors.lightGray, borderBottomWidth: DIMENS.px_05 }}>
                <Text style={{ padding: 5, fontFamily: FONT_FAMILIY.Roboto_Regular, fontSize: DIMENS.txt_size_medium,flex:.9 }}>
                    {item[APP_PARAMS.PHONE_CODE]?`${item.name} +${item[APP_PARAMS.PHONE_CODE]}`:item.name}</Text>
                <Ripple style={{ paddingHorizontal: 15, paddingVertical: 5,flex:.1}} onPress={()=>this.selectItem(item,index)}>
                    <Image source={item.isSelected ? RADIO_POINT : CIRCLE} style={{ width: 18, height: 18, padding: 10 }} />
                    {/* item.isSelected ? RADIO_POINT :  */}
                </Ripple>
            </View>
        )
    }
    headerView = () => {
        return (
            <View style={{ backgroundColor: colors.white, padding: 5, flexDirection: 'row', justifyContent: 'space-between', borderBottomColor: colors.lightGray, borderBottomWidth: DIMENS.px_05 }}>
                <Text style={{ padding: 5, fontFamily: FONT_FAMILIY.Roboto_Regular, fontSize: DIMENS.txt_size_medium_14 }}>
                    {this.props.title}</Text>
            </View>
        )
    }
    closePopOver = () => {
        this.setState({ modalAddressVisible: false })
        this.props.closePopOver()
    }
    render() {
        const { data, onPress } = this.props
        console.log('data :---->>>', JSON.stringify(data));

        return (
            <Modal
                animationType="slide"
                style={{ backgroundColor: colors.blackTransparent, margin: 0 }}
                transparent={true}
                isVisible={this.state.modalAddressVisible}
                onBackdropPress={this.closePopOver}
                onDismiss={this.closePopOver}
                onRequestClose={() => this.closePopOver}
            >
                {this.state.dataList != undefined && this.state.dataList.length > 0 &&
                    <View style={{ marginVertical: DIMENS.px_70, marginHorizontal: DIMENS.px_25 }}>
                        <FlatList
                            data={this.state.dataList}
                            renderItem={({ item, index }) => this.renderItem(item, index)}
                            extraData={this.state}
                            keyExtractor={(item, index) => index.toString()}
                            ListHeaderComponent={() => this.headerView()}
                            stickyHeaderIndices={[0]} />
                    </View>}
            </Modal>
        )
    }
}