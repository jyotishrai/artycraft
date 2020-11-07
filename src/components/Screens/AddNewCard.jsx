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
import { CommonBillingView, CommonMyOrder } from '../../common/CommonProductRow';
import { Dropdown } from 'react-native-material-dropdown';


export default class AddNewCard extends Basecomponents {
    constructor(props) {
        super(props)
        this.state = {
            cardDetails: '',
            monthArr : undefined,
            yearArr :undefined,
            monthNo:undefined,yearNo:undefined,
            cardLblTxt:'',cardNoTxt:''
        }
    }
    componentDidMount() {
        let tempMonthArr = [];
        let tempYearArr = [];
        var year = new Date().getFullYear();
        for (let index = 1; index < 12; index++) {
            const element = {value:index}
            tempMonthArr.push(element)
        }
        for (let index = 0; index < 30; index++) {
            const element = {value:year+index}
            tempYearArr.push(element)
        }
        this.setState({monthArr:tempMonthArr,yearArr:tempYearArr})
    }
  
    render() {
        return (
            
            <View style={{ flex: 1 }}>
                <CommonNavHeader title={translate('SCREEN_ADD_CARD')}
                    rightIcon={SEARCH}
                    rightIcon2={ORDER}
                    searchPress={() => this.props.navigation.navigate('SearchComponent')}
                    backPress={() => this.props.navigation.goBack()} />
                     {/* <KeyboardAvoidingView
            behavior={Platform.select({ ios: 'padding' })}
            style={{flex:1}}
          > */}
               <ScrollView contentContainerStyle={{paddingVertical:10}}> 
               <View>
                <View style={{ padding:DIMENS.px_15}}>
                    <View style={{ borderBottomWidth: DIMENS.px_05, borderBottomColor: colors.lightGrayClr, }}>
                        <Text style={{ fontSize: DIMENS.txt_size_medium_14, fontFamily: FONT_FAMILIY.Roboto_Regular, color: colors.primary }}>
                            {translate('ENTER_CARD_DETAILS')}
                        </Text>
                        <TextInput style={{height: DIMENS.px_35 }}
                           // keyboardType={'number-pad'}
                            value={this.state.cardDetails}
                            onChangeText={(text) => { this.setState({ cardDetails: text }) }}
                        />
                    </View>
                    <View style={{ flexDirection: 'row',justifyContent:'space-between',marginTop:-5 }}>
                        <View style={{ flex: .45}}>
                            {
                            this.state.monthArr != undefined && this.state.monthArr.length > 0 &&
                            <Dropdown
                                label={translate('MM')}
                                onChangeText={(txt)=>this.setState({monthNo:txt})}
                                data={this.state.monthArr}
                            />}
                        </View>
                        <View style={{ flex: .45}}>
                            {
                            this.state.yearArr != undefined && this.state.yearArr.length > 0 &&
                            <Dropdown
                               label={translate('YYYY')}
                                onChangeText={(txt)=>this.setState({yearNo:txt})}
                                data={this.state.yearArr}
                            />}
                        </View>

                    </View>
                    <View style={{ borderBottomWidth: DIMENS.px_05, borderBottomColor: colors.lightGrayClr,marginVertical:DIMENS.px_10 }}>
                        <Text style={{ fontSize: DIMENS.txt_size_medium_14, fontFamily: FONT_FAMILIY.Roboto_Regular, color: colors.lightGrayClr }}>
                            {translate('CARD_NUMBER')}
                        </Text>
                        <TextInput style={{height: DIMENS.px_35 }}
                            keyboardType={'number-pad'}
                            value={this.state.cardNoTxt}
                            onChangeText={(text) => { this.setState({ cardNoTxt: text }) }}
                        />
                    </View>
                    <View style={{ borderBottomWidth: DIMENS.px_05, borderBottomColor: colors.lightGrayClr, }}>
                        <Text style={{ fontSize: DIMENS.txt_size_medium_14, fontFamily: FONT_FAMILIY.Roboto_Regular, color: colors.lightGrayClr }}>
                            {translate('CARD_LABEL')}
                        </Text>
                        <TextInput style={{ height: DIMENS.px_35}}
                          //  keyboardType={'number-pad'}
                            value={this.state.cardLblTxt}
                            onChangeText={(text) => { this.setState({ cardLblTxt: text }) }}
                        />
                    </View>
                
                </View>
                <View style={{bottom:DIMENS.px_5,width:'100%'}}>
                    <Ripple style={[styles.submitBtn]}>
                        <Text style={[styles.submitBtnText]}>
                            {translate('HOME_save').toUpperCase()}
                        </Text>

                    </Ripple>
                </View>
                </View>
                </ScrollView>
                 {/* </KeyboardAvoidingView> */}
            </View>
        )
    }
}