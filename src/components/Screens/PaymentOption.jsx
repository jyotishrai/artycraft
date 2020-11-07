import React from 'react'
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text, Image,
    TouchableOpacity, FlatList,
    View, Dimensions, TextInput, SectionList
} from 'react-native'
import Ripple from 'react-native-material-ripple';
import styles from '../Auth/styles'
import { colors } from '../../theme';
import { EMI, EMI_GRAY, COD_BLUE, COD_GRAY, N_EMI_BLUE, DOWN_ARROW } from '../../images'
import translate from '../../i18n/i18n';
import { DIMENS, FONT_FAMILIY, WIDTH, HEIGHT, CURRENCY } from '../../constants';
import Basecomponents from '../../common/BaseComponent';
import CommonNavHeader from '../../common/CommonNavHeader';
import { CommonBillingView } from '../../common/CommonProductRow';

export default class PaymentOption extends Basecomponents {
    constructor(props) {
        super(props)
        this.state = {
            selectNOEMI: true,
            selectEMI: false,
            selectCOD: false,
            paymentOptionArr: [
                { bankname: 'Axis Bank', isExpandable: true, secIndex: 0, data: [{ month: '3', emi: '33333(12%)', cost: '10200' }, { month: '3', emi: '33333(12%)', cost: '10200' }, { month: '3', emi: '33333(12%)', cost: '10200' }] },
                { bankname: 'ICICI Bank', isExpandable: false, secIndex: 1, data: [{ month: '3', emi: '33333(12%)', cost: '10200' }, { month: '3', emi: '33333(12%)', cost: '10200' }] },
                { bankname: 'HDFC Bank', isExpandable: false, secIndex: 2, data: [{ month: '3', emi: '33333(12%)', cost: '10200' }] }
            ]
        }
    }
    //Action
    selectEMIOption = (flag) => {
        if (flag == 1) {
            this.setState({
                selectNOEMI: true,
                selectEMI: false,
                selectCOD: false,
            })
        } else if (flag == 2) {
            this.setState({
                selectNOEMI: false,
                selectEMI: true,
                selectCOD: false,
            })
        } else if (flag == 3) {
            this.setState({
                selectNOEMI: false,
                selectEMI: false,
                selectCOD: true,
            })
        }
    }
    expandableView = (section) => {
        let list = [...this.state.paymentOptionArr]
        list.map((elt, index) => {
            if (index === section.secIndex)
                list[index].isExpandable = !list[index].isExpandable
            else
                list[index].isExpandable = false
        })
        this.setState({ paymentOptionArr: [...list] })
    }
    //RENDER ITEM
    renderItem = (item, index, section) => {
        return (
            <View style={{}}>
                {
                    index === 0 && section.isExpandable &&
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: DIMENS.px_12 }}>
                        <View style={{ width: WIDTH / 3 - 34 }}>
                            <Text style={{ color: colors.primary, fontSize: DIMENS.px_12, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                                {translate('MONTH')}</Text>
                        </View>
                        <View style={{ width: WIDTH / 3 - 34 }}>
                            <Text style={{ textAlign: 'center', color: colors.primary, fontSize: DIMENS.px_12, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                                {translate('EMI')}</Text></View>
                        <View style={{ width: WIDTH / 3 - 34 }}>
                            <Text style={{ textAlign: 'right', color: colors.primary, fontSize: DIMENS.px_12, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                                {translate('OVERALL_COST')}</Text>
                        </View>
                    </View>
                }
                {
                    section.isExpandable &&
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: DIMENS.px_12, marginTop: DIMENS.px_5, marginBottom: DIMENS.px_10 }}>
                        <View style={{ width: WIDTH / 3 - 24 }}>
                            <Text style={{ color: colors.black, textAlign: 'left', fontSize: DIMENS.px_12, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                                {item.month}</Text>
                        </View>
                        <View style={{ width: WIDTH / 3 - 24 }}>
                            <Text style={{ color: colors.black, textAlign: 'left', fontSize: DIMENS.px_12, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                                {CURRENCY.RUPEES + item.emi}</Text>
                        </View>
                        <View style={{ width: WIDTH / 3 - 24 }}>
                            <Text style={{ color: colors.black, textAlign: 'right', fontSize: DIMENS.px_12, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                                {CURRENCY.RUPEES + item.cost}</Text>
                        </View>
                    </View>

                }
            </View>
        )
    }
    renderHeaderItem = (section) => {
        return (
            <Ripple style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: colors.primary, padding: DIMENS.px_10, marginBottom: 10 }}
                onPress={() => this.expandableView(section)}>
                <Text style={{ color: colors.white, fontSize: DIMENS.px_12, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                    {section.bankname}</Text>
                <Image source={section.isExpandable ? DOWN_ARROW : DOWN_ARROW} style={{ tintColor: colors.white, width: DIMENS.px_12, height: DIMENS.px_8 }} />

            </Ripple>
        )
    }
    renderFooterItem = () => {
        return (
            <View style={{ marginTop: DIMENS.px_20 }}>
                <Ripple style={{ paddingVertical: DIMENS.px_3 }} onPress={() => alert('term')}>
                    <Text style={{ color: colors.black, fontSize: DIMENS.px_12, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                        {'- ' + translate('TERMS_CONDITION')}</Text>
                </Ripple>
                <Ripple style={{ paddingVertical: DIMENS.px_10 }} onPress={() => alert('credit')}>
                    <Text style={{ color: colors.primary, fontSize: DIMENS.px_12, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                        {'- ' + translate('CREDIT_DEBIT_NO_COST')}</Text>
                </Ripple>
            </View>
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <CommonNavHeader title={translate('SCREEN_PAYMENT_OPTION')}
                    backPress={() => this.props.navigation.goBack()} />
                <View>
                    {/*Upper View */}
                    {
                        <View style={{
                            borderBottomColor: colors.lightGraytransparent,
                            borderBottomWidth: DIMENS.px_1,
                            justifyContent: 'space-evenly',
                            flexDirection: 'row',
                        }}>
                            <Ripple style={{ paddingVertical: DIMENS.px_10, width: WIDTH / 3, flexDirection: 'row', backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center', }}
                                onPress={() => this.selectEMIOption(1)}>
                                <Image source={N_EMI_BLUE} style={{ marginLeft: DIMENS.px_10, marginRight: DIMENS.px_5, resizeMode: 'contain', tintColor: this.state.selectNOEMI ? colors.primary : colors.lightGrayText }} />
                                <Text style={{ color: this.state.selectNOEMI ? colors.primary : colors.lightGrayText, fontSize: DIMENS.px_12, fontFamily: FONT_FAMILIY.Roboto_Regular, textAlign: 'center' }}>{translate('NO_EMI')}</Text>
                            </Ripple>
                            <Ripple style={{ paddingVertical: DIMENS.px_10, width: WIDTH / 3, flexDirection: 'row', backgroundColor: colors.white, alignItems: 'center', borderRadius: 2, justifyContent: 'center', }}
                                onPress={() => this.selectEMIOption(2)}>
                                <Image source={EMI_GRAY} style={{ marginLeft: DIMENS.px_10, marginRight: DIMENS.px_5, resizeMode: 'contain', tintColor: this.state.selectEMI ? colors.primary : colors.lightGrayText }} />
                                <Text style={{ color: this.state.selectEMI ? colors.primary : colors.lightGrayText, fontSize: DIMENS.px_12, fontFamily: FONT_FAMILIY.Roboto_Regular, textAlign: 'center' }}>{translate('EMI')}</Text>
                            </Ripple>
                            <Ripple style={{ paddingVertical: DIMENS.px_10, width: WIDTH / 3, flexDirection: 'row', backgroundColor: colors.white, alignItems: 'center', borderRadius: 2, justifyContent: 'center' }}
                                onPress={() => this.selectEMIOption(3)}>
                                <Image source={COD_GRAY} style={{ marginLeft: DIMENS.px_10, marginRight: DIMENS.px_5, resizeMode: 'contain', tintColor: this.state.selectCOD ? colors.primary : colors.lightGrayText }} />
                                <Text style={{ color: this.state.selectCOD ? colors.primary : colors.lightGrayText, fontSize: DIMENS.px_12, fontFamily: FONT_FAMILIY.Roboto_Regular, textAlign: 'center' }}>{translate('COD')}</Text>
                            </Ripple>
                        </View>
                    }
                    {/* NO_COSE EMI VIEW */}

                    {
                        // this.state.selectNOEMI &&
                        <ScrollView>
                            <View style={{ padding: DIMENS.px_10, }}>
                                {/*Header*/}
                                <Text style={{ marginBottom: DIMENS.px_20, color: colors.black, fontSize: DIMENS.px_12, fontFamily: FONT_FAMILIY.Roboto_Regular }}>
                                    {'NO Coast EMI'}</Text>
                                {
                                    !this.state.selectCOD &&
                                    <View>
                                        <SectionList
                                            scrollEnabled={false}
                                            showsVerticalScrollIndicator={false}
                                            sections={this.state.paymentOptionArr}
                                            keyExtractor={(item, index) => item + index}
                                            renderItem={({ item, index, section }) => this.renderItem(item, index, section)}
                                            renderSectionHeader={({ section }) => this.renderHeaderItem(section)}
                                        />
                                        {/* Footer*/}
                                       { this.renderFooterItem()}
                                    </View>
                                }

                            </View>
                        </ScrollView>
                    }

                </View>
            </View>

        )
    }
}