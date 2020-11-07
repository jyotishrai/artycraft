import React from 'react'
import {
    Text, Image, StyleSheet,
    SectionList, FlatList,
    View, Dimensions, TextInput
} from 'react-native'
import Ripple from 'react-native-material-ripple';
import styles from '../Auth/styles'
import { colors } from '../../theme';
import { } from '../../images'
import translate from '../../i18n/i18n';
import Basecomponents from '../../common/BaseComponent';
import { WIDTH, DIMENS, FONT_FAMILIY, HEIGHT } from '../../constants';
   

export default class ProductSpecification extends Basecomponents {
constructor(props){
    super(props)
    this.state = {

        specificationArrData:[],
        showIndicator: false
    }
}
componentDidMount() {
    if(this.props.data!=undefined && this.props.data.responsePacket!=undefined &&
         this.props.data.responsePacket.productGroupSpecification!=undefined) {
            this.parserObj( this.props.data.responsePacket.productGroupSpecification);

    }
}
parserObj = (data) => {
    let tempDataHolder = [];
    let tempDataArr = [];
    Object.keys(data).forEach((key) =>{
       let dataTemp = [];
       Object.keys(data[key]).forEach(intElt => {
       
        let desc = ''
        data[key][intElt].forEach(descriptElt=>{
           desc = desc != ''? desc + ', ' + descriptElt :descriptElt
        })
        dataTemp.push({"title":intElt,description:desc})
        })
        tempDataArr.push({"title":key,"data":dataTemp})

    })
  try {
    this.setState({specificationArrData:tempDataArr})
  } catch (error) {
    //   alert(error)
  }
   
  }

  renderSpec = (item, index) => { 
    return (
        <View style={{padding:DIMENS.px_8}}>
        <View style={{flexDirection:item.description!=undefined?'row':"column", flex: 1 }}>
            {
                item.title!=undefined&&
                <View style={{flexDirection:item.description!=undefined?'column':'row',flex:item.description!=undefined?.4:1}}>
                <Text style={{ color: colors.grayClr, 
                fontFamily: FONT_FAMILIY.Roboto_Regular,
                 fontSize: DIMENS.txt_size_medium,
                }}>
                {item.title}
                </Text> 
                </View>
            }
                {
                item.description!=undefined&&
                <View style={{flex:.6 }}>
                <Text style={{ color: colors.grayClr, 
                fontFamily: FONT_FAMILIY.Roboto_Regular, 
                 fontSize: DIMENS.txt_size_small_12 }}>
                {item.description}
                </Text>
                </View> 
                  }         
             
          </View>
          {
          item.description!=undefined&&
          <View style={{width:'100%',backgroundColor:colors.lightGraytransparent,height:DIMENS.px_05,marginTop:DIMENS.px_10}}/>
          }
        </View>
    )
  }


renderHeader = (section) => {
  return ( <View style={{padding:10}}>
        <Text style={{ color: colors.black,
             fontFamily: FONT_FAMILIY.Roboto_Medium,
              fontSize: DIMENS.txt_size_medium_14 }}>
            {section.title}
        </Text>
    </View>)
}


render() {
   
    return (
        <View style={{ flex: 1,padding:DIMENS.px_10 }}>
        { this.state.specificationArrData &&    
            <SectionList
                showsVerticalScrollIndicator={false}
                stickySectionHeadersEnabled={false}
                sections={this.state.specificationArrData}
                stickySectionHeadersEnabled={false}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item, index }) => this.renderSpec(item, index)}
                renderSectionHeader={({ section }) => this.renderHeader(section)}
            />
        }
        </View>
    )
}
}


