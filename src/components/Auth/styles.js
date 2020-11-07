import { StyleSheet, Dimensions } from 'react-native'

import { colors } from '../../theme'
import {
  FONT_FAMILIY, DIMENS, WIDTH, HEIGHT
} from '../../constants'

//const {width,height}= Dimensions.get('screen')

export default StyleSheet.create({

  topView: {
    backgroundColor: colors.header,
    flex: 1,
    width: '100%',
  },
  scrollView: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.white
  },
  formControlView: {
    paddingBottom: 5,
    paddingHorizontal: 16,
    width: '100%',
    marginTop: DIMENS.px_10
  },
  formControlWithoutWithView: {
    paddingBottom: 5,
    paddingLeft: 10,
    marginTop: DIMENS.px_10
  },
  header: {
    color: colors.label,

    //fontSize: DIMENS.px_15,
  },
  label: {
    color: colors.label,
    fontSize: 13,
    opacity: 0.5,
    paddingBottom: 11,
    // fontFamily:FONT_FAMILIY.Roboto_Bold
  },
  textInput: {
    backgroundColor: colors.white,
    borderColor: colors.lightGray,
    borderRadius: 4,
    borderWidth: 1,//StyleSheet.hairlineWidth,
    color: colors.black,
    // elevation: 3,
    fontSize: 20,
    paddingHorizontal: 10,
    // paddingVertical: 10,
    shadowColor: colors.inputShadow,
    //  shadowOffset: { height: 4, width: 0 },
    // shadowOpacity: 1,
    // shadowRadius: 2,
  },
  textInputActive: {
    backgroundColor: colors.white,
    borderColor: colors.white,
    borderRadius: 4,
   // borderWidth: StyleSheet.hairlineWidth,
    color: colors.black,
    elevation: 14,
    fontSize: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    shadowColor: colors.primaryDisabled,
    shadowOffset: { height: 8, width: 0 },
    shadowOpacity: 1,
    shadowRadius: 6,

  },
  elevationView:{
  //  borderRadius: 4,
    backgroundColor: colors.white,
    borderColor:colors.white,
    // borderWidth: StyleSheet.hairlineWidth,
     elevation: 14,
     shadowColor: colors.primaryDisabled,
     shadowOffset: { height: 8, width: 0 },
     shadowOpacity: 1,
     shadowRadius: 6,
  },

  submitBtn: {
    backgroundColor: colors.primary,
    borderRadius: 2,
    justifyContent: 'center',
    marginTop: 20,
    marginHorizontal: DIMENS.px_15,
    borderRadius:DIMENS.px_5
  },
  submitBtnDisabled: {
    backgroundColor: colors.primaryDisabled
  },
  submitBtnText: {
    color: colors.white,
    fontSize: DIMENS.txt_size_large,
    fontWeight: 'bold',
    padding: DIMENS.px_12,
    textAlign: 'center'
    // fontWeight: '600',
    // lineHeight: 20,
  },
  submitBtnTextWithoutBorder: {
    color: colors.primary,
    fontSize: DIMENS.txt_size_large,
    fontWeight: 'bold',
    padding: DIMENS.px_15,
    textAlign: 'center'
    // fontWeight: '600',
    // lineHeight: 20,
  },
  headerText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: DIMENS.txt_size_large,

  },
  catImg:
  {
    width: DIMENS.cat_img_width,
    height: DIMENS.cat_img_height,
    //resizeMode: 'contain',
    borderRadius: DIMENS.cat_img_width / 2,
    //   borderWidth:4,borderColor:'red'
    backgroundColor: colors.imgBackground,
  },
  catImgBackgroundView:
  {
    borderRadius: DIMENS.cat_img_width / 2,
    width: DIMENS.cat_img_width, height: DIMENS.cat_img_height,
    alignItems: 'center', justifyContent: 'center',
    backgroundColor: colors.imgBackground,
    overflow: 'hidden',
    marginHorizontal:DIMENS.px_10
    // borderWidth:4,borderColor:'red'
  },
  homePageTitle: {
    marginHorizontal:
      DIMENS.px_10, fontSize:
      DIMENS.txt_size_large,
    color: colors.primary,
    fontFamily: FONT_FAMILIY.Roboto_Regular,
    fontWeight: '100',
    flex: .95
  },
  productImgView: {
    width: WIDTH / 2 - 10,
  },
  viewBtn:
  {
    marginTop: DIMENS.px_10,
    width: 88
  },
  catTitle:
  {
    color: colors.black,
    fontSize: DIMENS.txt_size_medium_14,
    fontFamily: FONT_FAMILIY.Roboto_Medium
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    opacity: 0.4,
    backgroundColor: '#000'
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row'
  },
  body: {
    flex: 1,
    alignSelf: 'flex-end',
    backgroundColor: '#e5e5e5'
  },
  titleBox: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  titleText: {
    color: '#757575',
    fontSize: 14
  },
  messageBox: {
    height: 30,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  messageText: {
    color: '#9a9a9a',
    fontSize: 12
  },
  buttonBox: {
    height: 50,
   // marginTop: hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  buttonText: {
    fontSize: 18
  },
  cancelButtonBox: {
    height: 50,
    marginTop: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  addressText: {
    fontSize: DIMENS.txt_size_medium, 
    fontFamily: FONT_FAMILIY.Roboto_Regular,
    marginRight: DIMENS.px_5,
    color: colors.black
  },
  nameText: {
    fontSize: DIMENS.txt_size_large, 
    fontFamily: FONT_FAMILIY.Roboto_Medium,
    marginRight: DIMENS.px_5, 
    fontWeight: '500',
    color: colors.black

  },
  headerTitleOfOrderView:{
    fontSize: DIMENS.txt_size_medium,
    fontFamily: FONT_FAMILIY.Roboto_Medium,
    marginRight: DIMENS.px_5,
    fontWeight: '500',
    paddingHorizontal: DIMENS.px_10,
    paddingVertical: DIMENS.px_15,
    color:colors.grayClrForTxt
},
//SHOPI KUCH BHI
// headerHomeLogo:{ 
//   resizeMode: 'contain',
//    marginHorizontal: DIMENS.px_20,
//    width:90,
//    height:85 
// },
// splashLogo:{ 
//   resizeMode: 'contain',
//   width:180, 
//   height: 156 
// },
// headerAuthImgLogo: {
//   width:180,
//   height:50,
//   resizeMode:'contain',
// },

//ARTICRAFT
headerHomeLogo:{ 
  resizeMode: 'contain',
   marginHorizontal: DIMENS.px_20,
   width:150,
   height:120 
 },
 splashLogo:{ 
  resizeMode: 'contain',
   width:150, 
   height: 90
},
headerAuthImgLogo: {
  width:180,
  height:50,
  resizeMode:'contain'
}
})