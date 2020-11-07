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
import { NOTIFICATION, HEART, SEARCH, ORDER,PLACEHOLDER_PRODUCT } from '../../images'
import HeaderButton from '../HeaderButton'
import translate from '../../i18n/i18n';
import { DIMENS, FONT_FAMILIY, WIDTH, HEIGHT, CURRENCY, API, BASE_URL_WEB, KEY, APP_PARAMS } from '../../constants';
import Basecomponents from '../../common/BaseComponent';
import CommonNavHeader from '../../common/CommonNavHeader';
import { WebView } from 'react-native-webview';
import { appIsFromComing } from '../../actionCreators/TermsCondition';
import { connect } from 'react-redux'
import Loader from '../../common/Loader';

class TermsCondition extends Basecomponents{
    constructor(props){
        super(props)
        this.state={
            loading : true
        }
    }
    componentDidMount(){
      //  this.setState({loading:true})
    }
    render(){
        const {data} = this.props
        //console.warn('data::--',BASE_URL_WEB + API.FAQ);
        return(
            <View style={{ flex: 1 }}>
            <CommonNavHeader title={data&&data[APP_PARAMS.PAGE_TYPE]==KEY.FAQ? translate('SCREEN_FAQ'):translate('SCREEN_TERM_CONDITION')}
                backPress={() => this.props.navigation.goBack()} />
            <WebView source={{ uri: data&&data[APP_PARAMS.PAGE_TYPE]==KEY.FAQ ?
            'http://172.105.43.113:8080/admin/api/mob/v1/ptmSimilarUser/' + API.FAQ : BASE_URL_WEB + API.TERMS_CONDITION}} 
            onLoadEnd={()=>this.setState({loading:false})}/>
            {
               this.state.loading&&
                <Loader loading={ this.state.loading}/>
            }
            </View>
        )
    }
}

const mapStateToProps = ({ TermsConditon }) => ({
  data:TermsConditon.data
})

const mapDispatchToProps = {
}
export default connect(mapStateToProps, mapDispatchToProps)(TermsCondition)