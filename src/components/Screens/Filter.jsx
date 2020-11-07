import React,{ Component }  from 'react'
import {
  Text, Image, View, FlatList
} from 'react-native'
import Ripple from 'react-native-material-ripple';
import styles from '../Auth/styles'
import { colors } from '../../theme';
import { CHECKBOX, UNCHECK } from '../../images'
import { DIMENS, FONT_FAMILIY, APP_PARAMS } from '../../constants';
import Basecomponents from '../../common/BaseComponent';
import CommonNavHeader from '../../common/CommonNavHeader';
import translate from '../../i18n/i18n';
import * as Utils from '../../utility/Utils'

export default class Filter extends Component {
  constructor(props) {
    super(props)
    this.filterValue = [];
    this.filterCategory = this.props.navigation.state != undefined && this.props.navigation.state.params != undefined &&
    this.props.navigation.state.params.item != undefined && this.props.navigation.state.params.item;
    this.state = {
      filterCat: undefined,
      titleArr: [],
      noOfProduct: this.props.navigation.state != undefined && this.props.navigation.state.params != undefined &&
        this.props.navigation.state.params[APP_PARAMS.TOTAL_PRODUCT_SIZE] != undefined && this.props.navigation.state.params[APP_PARAMS.TOTAL_PRODUCT_SIZE],
      filterSubCatArr: undefined,
      chosenIndex: 0,
    }
  }

  componentDidMount() {
    console.log("filterCat:-",this.state.filterCat);
    this.setState({filterCat:this.filterCategory},()=>{
      this.clearCatData()
     if (this.state.filterCat != undefined && this.state.filterCat.length > 0)
      this.setState({ filterSubCatArr: [...this.state.filterCat[0].data] })
    })
  }
  selectFilterCat = (item, index) => {
    let dataFilter = [...this.state.filterCat];
    let subCatArr = [];
    dataFilter.forEach((element, eltIndex) => {
      if (eltIndex == index) {
        element.isSelected = true
        subCatArr = element.data
      } else {
        element.isSelected = false
      }
    })
    this.setState({ filterCat: [...dataFilter], filterSubCatArr: subCatArr })
  }
  goBack=()=>{
    this.clearCatData()
    this.props.navigation.goBack()
  }
  clearCatData=()=>{
    let dataFilter = [...this.state.filterCat];
    dataFilter.forEach((element, eltIndex) => {
      if (eltIndex == 0) {
        element.isSelected = true
      } else {
        element.isSelected = false
      }
    })
    this.setState({ filterCat:[...dataFilter]})
  }
  selectFilterSubCat = (item, index) => {
    let dataFilter = [...this.state.filterSubCatArr]
    item.isSelected = !item.isSelected
    dataFilter[index] = item
    this.setState({ filterSubCatArr: dataFilter })
  }
  filterData = () => {
    this.filterValue = [];
    this.state.filterCat.map((item) => {
      item[APP_PARAMS.DATA].map((dataItem) => {
        if (dataItem.isSelected != undefined && dataItem.isSelected)
          this.filterValue.push(dataItem[APP_PARAMS.ATTRI_WID_IT])
      })
    })
    this.props.navigation.state.params.applyFilter(this.filterValue)
    this.props.navigation.goBack()
  }
  clearFilter = () => {
    this.filterValue = [];
    let dataFilter = this.state.filterCat.map((item) => {
      item[APP_PARAMS.DATA].map((dataItem) => {
        if (dataItem.isSelected != undefined && dataItem.isSelected)
          dataItem.isSelected = false
      })
      return item
    })
    this.setState({ filterCat: dataFilter })
  }
  renderFilterCategory = (item, index) => {
    return (
      <View style={{}}>
        {
          <Ripple style={{ backgroundColor: item.isSelected ? colors.white : undefined, padding: DIMENS.px_12 }}
            onPress={() => this.selectFilterCat(item, index)}>
            <Text style={{ fontFamily: FONT_FAMILIY.Roboto_Medium, fontSize: DIMENS.txt_size_medium, color: item.isSelected ? colors.blueTextClr : colors.black }}>
              {item.title}
            </Text>
          </Ripple>
        }
      </View>
    )
  }
  renderFilterSubCategory = (item, index) => {

    return (
      <View style={{}}>
        {
          <Ripple style={{ backgroundColor: item.isSelected ? colors.white : undefined, padding: DIMENS.px_15, flexDirection: 'row', alignItems: 'center' }}
            onPress={() => this.selectFilterSubCat(item, index)}>
            {
              item.isSelected != undefined && item.isSelected ?
                <Image style={{ tintColor: colors.primary, height: DIMENS.px_10, width: DIMENS.px_10 }} source={CHECKBOX} /> :
                <Image style={{ height: DIMENS.px_10, width: DIMENS.px_10 }} source={UNCHECK} />
            }
            <Text
              style={{ marginLeft: DIMENS.px_10, fontFamily: FONT_FAMILIY.Roboto_Regular, fontSize: DIMENS.txt_size_medium, color: item.selected ? colors.blueTextClr : colors.black }}>
              {item[APP_PARAMS.ATTRI_VALUE] && item[APP_PARAMS.ATTRI_VALUE]}</Text>
          </Ripple>
        }
        <View style={{ backgroundColor: colors.lightGraytransparent, height: DIMENS.px_05, width: '100%' }} />

      </View>
    )
  }
  render() {
    
    return (
      <View style={{ flex: 1 }}>
        <CommonNavHeader title={translate('SCREEN_FILTER')}
          rightBtnText={translate('CLEAR_FILTER')}
          rightBtnClr={colors.blueTextClr}
          backPress={() => this.goBack()}
          rightBtnPress={() => this.clearFilter()} />
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', flex: .92 }}>

            <View style={{ flex: 4, backgroundColor: colors.whiteBackground, }}>

              {this.state.filterCat != undefined && this.state.filterCat.length > 0 &&
                <FlatList
                  data={this.state.filterCat}
                  renderItem={({ item, index }) => this.renderFilterCategory(item, index)}
                  extraData={this.state.filterCat}
                  keyExtractor={(item, index) => index.toString()}
                />
              }

            </View>
            <View style={{ flex: 6, backgroundColor: colors.white, }}>
              {
                this.state.filterSubCatArr != undefined && this.state.filterSubCatArr.length > 0 &&
                <FlatList
                  data={this.state.filterSubCatArr}
                  renderItem={({ item, index }) => this.renderFilterSubCategory(item, index)}
                  extraData={this.state}
                  keyExtractor={(item, index) => index.toString()}
                />
              }

            </View>


          </View>
          {
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', bottom: 0, position: 'absolute', flex: .1 }}>

              <Ripple style={{ backgroundColor: colors.orange, paddingVertical: 10, flex: 1 }}
                onPress={() => this.filterData()}>
                <Text style={{ textAlign: 'center', color: colors.white, fontFamily: FONT_FAMILIY.Roboto_Medium, fontSize: DIMENS.txt_size_medium_14 }}>
                  {translate('FILTER').toUpperCase()}</Text>
              </Ripple>
            </View>
          }
        </View>

      </View>

    )
  }
}
