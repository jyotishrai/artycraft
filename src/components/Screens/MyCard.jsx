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
import { NOTIFICATION, HEART, SEARCH, ORDER, PLUS,CANCEL } from '../../images'
import HeaderButton from '../HeaderButton'
import translate from '../../i18n/i18n';
import { DIMENS, FONT_FAMILIY, WIDTH, HEIGHT, CURRENCY } from '../../constants';
import Basecomponents from '../../common/BaseComponent';
import CommonNavHeader from '../../common/CommonNavHeader';
import { CommonBillingView, CommonMyOrder } from '../../common/CommonProductRow';
import CommonMsgDialog from '../Dialogs/CommonMsgDialog';

export default class MyCard extends Basecomponents {
    constructor(props) {
        super(props)
        this.indexDlt = undefined;
        this.itemDlt = undefined;

        this.state={
            cardArr:[{uri:require('../../assets/images/card.png')},{uri:require('../../assets/images/card.png')}],
            deleteView:false
        }
    }
    //ACTION
    deletedCard=(item,index)=>{
      this.indexDlt = index
      this.itemDlt = item
      this.setState({deleteView:true})
    }
    deletedCardPopver=()=>{
        let list = [...this.state.cardArr]
        list(this.indexDlt,1)
        this.setState({cardArr:[...list]})
    }

    renderItem = (item,index) => {
        return(
            <View style={{paddingLeft:DIMENS.px_5,paddingVertical:10}} onPress={(item,index)=>this.setState({isSelectCard:true})}>
                <View style={{borderRadius:DIMENS.px_3}}>
                <Image source={item.uri} style={{width:WIDTH/2-DIMENS.px_10,height:100,resizeMode:'contain'}}/>
                </View>
                <Ripple style={{position:'absolute',right:-5,top:0,width:30,height:30,alignItems:'center',justifyContent:'center'}}
                onPress={()=>this.deletedCard(item,index)}>
                <Image source={CANCEL} style={{width:25,height:25,position:'absolute'}}resizeMode={'center'}/>
                </Ripple>
            </View>
        )
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <CommonNavHeader title={translate('SCREEN_CARD')}
                    rightIcon={SEARCH}
                    rightIcon2={ORDER}
                    searchPress={() => this.props.navigation.navigate('SearchComponent')}
                    backPress={() => this.props.navigation.goBack()} />

                <View style={{}}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between',alignItems:'center',padding:DIMENS.px_10}}>
                        <Text style={{
                            fontFamily: FONT_FAMILIY.Roboto_Medium,
                            fontSize: DIMENS.txt_size_large_extra, color: colors.primary,
                        }}>
                            {translate('SAVE_CARD').toUpperCase()}</Text>
                        <Ripple style={{ alignItems: 'center', flexDirection: 'row', backgroundColor: colors.bgOfTxt, padding: DIMENS.px_8,borderRadius:DIMENS.px_2 }}
                        onPress={()=>this.props.navigation.navigate('AddNewCard')}>
                            <Image source={PLUS} style={{ tintColor: colors.black, resizeMode: 'contain', width: 10, height: 10, marginRight: DIMENS.px_2 }} />
                            <Text style={{
                                fontFamily: FONT_FAMILIY.Roboto_Regular,
                                fontSize: DIMENS.txt_size_medium, color: colors.black,
                            }}>
                                {translate('ADD_NEW_CARD')}</Text>
                        </Ripple>
                    </View>
                    {this.state.cardArr!= undefined && this.state.cardArr.length > 0&&
                        <FlatList
                         style={{marginTop:DIMENS.px_15}}
                            horizontal={true}
                            data={this.state.cardArr}
                            renderItem={({ item, index }) => this.renderItem(item, index)}
                            extraData={this.state}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    }   
                    {
                        this.state.deleteView &&
                        <CommonMsgDialog 
                        yesTxt={translate('YES')}
                        noTxts={translate('NO')}
                        title={'Delete Cards?'}
                        yesPopverPress={()=>this.deletedCardPopver()}
                        onClosePopover={()=>this.setState({deleteView:false})}/>
                    } 
                 <View style={{height:DIMENS.px_05,width:'100%',marginTop:DIMENS.px_20,backgroundColor:colors.lightGraytransparent}}/>
                </View>
            </View>
        )
    }
}