import React from 'react'
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text, Image, StyleSheet,
    TouchableOpacity, SectionList, FlatList,
    View, Dimensions, TextInput
} from 'react-native'
import Ripple from 'react-native-material-ripple';
import styles from '../Auth/styles'
import { colors } from '../../theme';
import { PLACEHOLDER_PRODUCT_IMG } from '../../images'
import translate from '../../i18n/i18n';
import Basecomponents from '../../common/BaseComponent';
import CommonNavHeader from '../../common/CommonNavHeader';
import { CommonInfoProduct } from '../../common/CommonProductRow';
import { TabView, SceneMap } from 'react-native-tab-view';
import Animated from 'react-native-reanimated';
import { WIDTH, DIMENS, FONT_FAMILIY, APP_PARAMS } from '../../constants';

export default class ColorVarient extends Basecomponents {
    constructor(props) {
        super(props)
        this.selectVarintObj = this.props.navigation.state.params.selectVarintObj
        this.state = {
            dataAreColor:undefined,
            productVarintDetail:undefined,
            productInfo:this.props.navigation.state.params.product,
            selectVarient:undefined
        }
    }

    componentDidMount(){

      let data = Array.from(this.selectVarintObj);
      let object = undefined
      let tempData =  data.map(item=>{
          const newArray = [];
          item.data.forEach(obj=>{
              if(obj[APP_PARAMS.DEF_VARIENT]==true){
                obj.select = true
                object = obj
              }
            if (!newArray.some(o => o.value === obj.value)) {
                let tempVaritArr = []
                if(Array.isArray(obj.pair)){
                    
                    tempVaritArr = obj.prodVariant&& [...obj.prodVariant]
                    if(tempVaritArr.some(tmpObj=>tmpObj.productVariantsId!=obj.productVariantsId)){
                        tempVaritArr.push({
                            pair:obj.pair,
                            "discountPrice": obj.discountPrice,
                            "productVariantsId": obj.productVariantsId,
                            "quantity": obj.quantity,
                            "price":obj.price,
                            "cart": obj.cart,
                           "wish": obj.wish,
                           [APP_PARAMS.DEF_VARIENT]:obj[APP_PARAMS.DEF_VARIENT]})
                       
                    }
                    obj.pair = [...obj.pair]
                       
                    
                }else{
                    tempVaritArr.push({
                        pair:obj.pair,
                        "discountPrice": obj.discountPrice,
                        "productVariantsId": obj.productVariantsId,
                        "quantity": obj.quantity,
                        "price":obj.price,
                        "cart": obj.cart,
                       "wish": obj.wish,
                       [APP_PARAMS.DEF_VARIENT]:obj[APP_PARAMS.DEF_VARIENT]})
                    obj.pair = [obj.pair]
                }
               
                obj.prodVariant = tempVaritArr
                newArray.push({ ...obj })
                
              }else{
                newArray.forEach(itemmm=>{
                    if(itemmm.value === obj.value){
                        if(itemmm.pair != 0){
                            let tempVaritArr = []
                            if(typeof itemmm.pair === 'object'){
                                itemmm.pair = [...itemmm.pair,obj.pair]

                                tempVaritArr = itemmm.prodVariant&& [...itemmm.prodVariant]
                                if(tempVaritArr.some(tmpObj=>tmpObj.productVariantsId!=obj.productVariantsId)){

                                tempVaritArr.push({
                                    pair:obj.pair,
                                    "discountPrice": obj.discountPrice,
                                    "productVariantsId": obj.productVariantsId,
                                    "quantity": obj.quantity,
                                    "price":obj.price,
                                    "cart": obj.cart,
                                   "wish": obj.wish,
                                   [APP_PARAMS.DEF_VARIENT]:obj[APP_PARAMS.DEF_VARIENT]})

                                }

                            }
                            itemmm.prodVariant = tempVaritArr
                            
                        }
                    }
                })
              }
          })
          return({type:item.type,data:newArray})
      })
      
      this.setState({dataAreColor:tempData,productVarintDetail:object})
    }
  
    //Action
    applySelectVarient=()=>{
      console.log('select varinet:;-tempDataSelect apply',JSON.stringify(this.state.selectVarient));
        this.state.selectVarient&&
        this.props.navigation.state.params.selectVarient(this.state.selectVarient)
        this.props.navigation.goBack()
    }
   
     compressArray=(original,listLength)=> {
        var compressed = [];
        // make a copy of the input array
        var copy = original.slice(0);
     
        // first loop goes over every element
        for (var i = 0; i < original.length; i++) {
     
            var myCount = 0;	
            // loop over every element in the copy and see if it's the same
            for (var w = 0; w < copy.length; w++) {
                if (original[i].pair == copy[w].pair) {
                    // increase amount of times duplicate is found
                    myCount++;
                    // sets item to undefined
                   // delete copy[w];
                }
            }
     
            if (myCount > 0) {
            if(myCount==listLength){
                var a = new Object();
                a.value = original[i];
                a.count = myCount;
                compressed.push(a.value);
            }  
            }
        }
        let arr = compressed

        var flags = [], output = [], l = arr.length, i;
        for( i=0; i<l; i++) {
            if( flags[arr[i].productVariantsId]) continue;
            flags[arr[i].productVariantsId] = true;
            output.push(arr[i]);
        }
         const compressDuplicate = this.reduceDatafindDuplicate(output,'productVariantsId')
        
        return compressDuplicate;
    };
    reduceDatafindDuplicate=(pairingArr,key)=>{
        const lookup = pairingArr.reduce((a, e) => {
            a[e.pair] = (++a[e.pair] || 0) 
            return a;
            }, {});
            return pairingArr.filter(e => lookup[e.pair])
    }
    selectVarinetOfPrductPrev=(item,index,data,secIndex)=>{
        let list = [...this.state.dataAreColor]
        let pairingArr = []
        let selectedProduct =  []
     
        list.forEach((listElt,listIndex)=>{
           //let pairingArr = []
              listElt.data.forEach((elt,eltIndex)=>{
                if(listIndex===secIndex){
                if(eltIndex ===index){
                   elt.select = true
                }
                else{
                    elt.select = false
                }
                }
                ///////Tommorow/////////

                // if(elt.select===true){
                    //console.log("elt Index Parent::--",eltIndex,"elemnt::--",elt.pair,'select',JSON.stringify(item.pair));

                    // elt.pair.forEach((object,objectIndex)=>{
                    //     if(item.pair.some(pairObj=>pairObj==object)){
                    //         if(elt.prodVariant.some(productVarintElt=>productVarintElt.pair==object)){
                    //             let indexOfPair = elt.prodVariant.findIndex(p => p.pair == object)
                    //             let data = elt.prodVariant[indexOfPair]
                    //             data.value = elt.value
                    //             data.attrName = elt.attrName
                    //             pairingArr.push(data)
                    //         }

                    //     }else{
                    //         console.log('not exist:',object)

                    //     }
                    // })
                    // console.log('exist:pairingArr',pairingArr)
                    //     if( pairingArr&&pairingArr.length>0){

                    //         let selectedProductDatat =  this.compressArray(pairingArr)
                    //       //  let selectedProductDatat =  this.reduceDatafindDuplicate(pairingArr,'pair')
                    //         //selectedProduct = this.compressArray(selectedProductDatat)
                    //         console.log("selectedProduct final",  selectedProductDatat);
                    
                    //     }

                //    let dataTemp = []
                //     pairingArr&&pairingArr.length>0&&pairingArr.reduce(function(a, b){
                //          console.log('exist:pairingArr a prev',a)
                //          console.log('exist:pairingArr b prev',b)

                //         if(a&&a.pair&&b&&b.pair){
                //             if(a.pair === b.pair){
                //                 if(dataTemp.length>0&& dataTemp.some(obj=>obj.productVariantsId!=a.productVariantsId&&obj.productVariantsId!=b.productVariantsId)){
                //                     dataTemp.push(a)
                //                     dataTemp.push(b)
                //                 }else{
                //                     dataTemp.push(a)
                //                     dataTemp.push(b) 
                //                 }
                               
                //                 console.log('exist:pairingArr a',JSON.stringify(dataTemp))
                //             }else{
                //                 console.log('exist:pairingArr a else1',a)

                //                 console.log('exist:pairingArr b',b);
                                

                //             }
                //         }else{
                //             if(dataTemp.length>0&& dataTemp.some(obj=>b&&obj.pair==b.pair&&obj.productVariantsId!=b&&b.productVariantsId)){
                //                 dataTemp.push(b)
                //                 console.log('exist:pairingArr b else',b);
                //                 //obj.productVariantsId!=a&&a.productVariantsId&&
                                
                //             }else{
                //                 dataTemp.push(b) 
                //             }
                //             if(dataTemp.length>0&& dataTemp.some(obj=>a&&obj.pair==a.pair&&obj.productVariantsId!=a&&a.productVariantsId)){
                //                 dataTemp.push(a)
                //                 console.log('exist:pairingArr a else',a)
                              
                //             }else{
                //                 a&&
                //                 dataTemp.push(a)
                //             }

                           
                           
                //         }
                       
                //     //      return (a.pair !== b.pair) ?   
                //     //     console.log('exist:pairingArr a',a)
                //     // : console.log('exist:pairingArr b',b);
                //  });
                // console.log('exist:pairingArr final',JSON.stringify(dataTemp))


                // }
                ///////Tommorow/////////
               
                 //////Final yesterday /////////////////////
                  // let pairingArr = []

                if(elt.select == true){
                    console.log("elt Index Parent::--",eltIndex,"elemnt::--",elt);
                    //selectedProduct = []

                    // pairingArr = []
                    // selectedProduct = []
                    for (let itemIndex = 0; itemIndex < item.pair.length; itemIndex++) {
                       //  pairingArr = []
                        const pairObj = item.pair[itemIndex];
                        // pairingArr = [pairObj]
          
                         let returnLoop = false


                         elt.pair.forEach( (pairELt, pairIndex)=> {
                            console.log('selectVarintObj::---object  selct',item.pair,"selct index",itemIndex,"obj::",pairObj,"elt pair::::",elt.pair)
                            console.log('selectVarintObj::---pair elt index',pairIndex,"pair elt::",pairELt,"with Pair:-",pairObj)
                            if(pairingArr.length>0&&pairingArr[0]==pairELt){//&&listIndex!=secIndex

                                pairingArr.push(pairELt)
                                // console.log('selectVarintObj::---elt  selct two',elt,"pair obj::--two",pairELt)
                                elt.prodVariant.some(function (prodVariantELt, pairIndex, _arr) {
                                    if(prodVariantELt.pair==pairELt){
                                        // console.log('selectVarintObj::--- add::-selectedProduct2 elemrnt',JSON.stringify(prodVariantELt))

                                        let dataTemp = {...prodVariantELt}
                                        dataTemp.value = elt.value
                                        dataTemp.attrName = elt.attrName
                                        selectedProduct.push(dataTemp)
                                       // console.log('selectVarintObj::--- add::-selectedProduct2',JSON.stringify(selectedProduct))
                                    
                                   // return true;
                                    }
                                })
                               //  selectedProduct.push(elt)
                                 returnLoop = true
                                // return true;
                            }
                            else if(pairObj==pairELt&&pairingArr.length==0){
                                    pairingArr.push(pairObj)
                                    console.log('selectVarintObj::---elt  selct one',elt,"pair obj::--one",pairObj)
                                    elt.prodVariant.some(function (prodVariantELt, pairIndex, _arr) {
                                        if(prodVariantELt.pair==pairObj){
                                            // console.log('selectVarintObj::--- add::-selectedProduct1 elemrnt',JSON.stringify(prodVariantELt),"PAIR OBJ:::",pairObj)

                                            let dataTemp = {...prodVariantELt}
                                            dataTemp.value = elt.value
                                            dataTemp.attrName = elt.attrName
                                            selectedProduct.push(dataTemp)
                                            // console.log('selectVarintObj::--- add::-selectedProduct1',JSON.stringify(selectedProduct))
                                         return true;
                                        }
                                    })
                                    //selectedProduct.push(elt)

                                   returnLoop = true
                                    //return true;
                                //}
                                // if(returnLoop){
                                //     return true;
                                // }
                                
                            }
                            else{
                                console.log('selectVarintObj::---not exist',JSON.stringify(pairELt))
                             }
                            
                        });
                   
                        if(returnLoop){
                            break;
                        }
                    }
                }
             //////Final yesterday /////////////////////

            })
           
          })
          console.log('selectVarintObj::---selectedProduct',selectedProduct)

          let object = undefined
          let detail = this.state.productInfo
          if(selectedProduct.length == list.length){
              if(selectedProduct.length > 0 ){
                object = selectedProduct[0]
                detail[APP_PARAMS.PRICE] = selectedProduct[0][APP_PARAMS.PRICE]
                detail[APP_PARAMS.DISCOUNT_PRICE] = selectedProduct[0][APP_PARAMS.DISCOUNT_PRICE]
                detail[APP_PARAMS.IMG_LOC] = selectedProduct[0][APP_PARAMS.PRODUCT_VARIANT_IMG]
    
              }
           
              //alert('exit'+pairingArr.length+'list:'+list.length)
          }else{
            //alert('not exit'+pairingArr.length+'list:'+list.length)
          }

           this.setState({dataAreColor:list,productVarintDetail:object,productInfo:object?detail:this.state.productInfo,selectVarient:selectedProduct})
    }
    selectVarinetOfPrduct=(item,index,data,secIndex)=>{
        let list = [...this.state.dataAreColor]
        let pairingArr = []
        let selectedProduct =  []
     
        list.forEach((listElt,listIndex)=>{
           //let pairingArr = []
              listElt.data.forEach((elt,eltIndex)=>{
                if(listIndex===secIndex){
                if(eltIndex ===index){
                   elt.select = true
                }
                else{
                    elt.select = false
                }
                }
             
                 //////Final yesterday /////////////////////
                  // let pairingArr = []

                if(elt.select == true){
                    console.log("elt Index Parent::--",eltIndex,"elemnt::--",elt);
                    pairingArr = []
                    for (let itemIndex = 0; itemIndex < item.pair.length; itemIndex++) {
                        const pairObj = item.pair[itemIndex];
                       
                         let returnLoop = false

                            elt.pair.forEach( (pairELt, pairIndex)=> {
                                console.log('selectVarintObj::---object  selct2',item.pair,"selct index",itemIndex,"obj::",pairObj,"elt pair::::",elt.pair)
                                console.log('selectVarintObj::---pair elt index2',pairIndex,"pair elt::",pairELt,"with pair:-",pairObj)
                        if(elt.pair.some(object=>object==pairObj)&&(item.pair.some(object=>object==pairELt))){

                               
                               if(pairingArr.length>0&&pairObj==pairELt){//&&listIndex!=secIndex
   
                                   pairingArr.push(pairELt)
                                   console.log('selectVarintObj::---elt  selct two',elt,"pair obj::--two",pairELt)
                                   elt.prodVariant.some(function (prodVariantELt, pairIndex, _arr) {
                                       if(prodVariantELt.pair==pairELt){
                                           let dataTemp = {...prodVariantELt}
                                           dataTemp.value = elt.value
                                           dataTemp.attrName = elt.attrName
                                           selectedProduct.push(dataTemp)
                                      return true;
                                       }
                                   })
                                
                               }
                               else if(pairObj==pairELt&&pairingArr.length==0){
                                       pairingArr.push(pairObj)
                                       
                                       elt.prodVariant.some(function (prodVariantELt, pairIndex, _arr) {
                                           if(prodVariantELt.pair==pairObj){
                                            
   
                                               let dataTemp = {...prodVariantELt}
                                               dataTemp.value = elt.value
                                               dataTemp.attrName = elt.attrName
                                               selectedProduct.push(dataTemp)
                                              
                                            return true;
                                           }
                                       })
                                   
                               }
                               else{
                                   console.log('selectVarintObj::---not exist',JSON.stringify(pairELt))
                                }
                            }else{
                                console.log('selectVarintObj::---not exist else',JSON.stringify(pairELt))
                            }
                               
                           });
                       if(returnLoop){
                            break;
                        }
                    }
                }

            })
           
          })
            selectedProduct = this.reduceDatafindDuplicate(selectedProduct)
            
             if(selectedProduct.length>3){
                selectedProduct = this.compressArray(selectedProduct,list.length)
                selectedProduct = this.reduceDatafindDuplicate(selectedProduct)
             }

          let object = undefined
          let detail = this.state.productInfo
          if(selectedProduct.length == list.length){
              if(selectedProduct.length > 0 ){
                object = selectedProduct[0]
                detail[APP_PARAMS.PRICE] = selectedProduct[0][APP_PARAMS.PRICE]
                detail[APP_PARAMS.DISCOUNT_PRICE] = selectedProduct[0][APP_PARAMS.DISCOUNT_PRICE]
                detail[APP_PARAMS.IMG_LOC] = selectedProduct[0][APP_PARAMS.PRODUCT_VARIANT_IMG]
              }
          }

           this.setState({dataAreColor:list,productVarintDetail:object,productInfo:object?detail:this.state.productInfo,selectVarient:selectedProduct})
    }
  
    renderItemList = (item,index,data,secIndex) => {
        return (
            <View style={{ marginTop:DIMENS.px_10,marginRight:DIMENS.px_10 }}>
              {
                item[APP_PARAMS.PRODUCT_VARIANT_IMG] != undefined && secIndex==0&&
                  <Image source={item[APP_PARAMS.PRODUCT_VARIANT_IMG]!=''?{uri:item[APP_PARAMS.PRODUCT_VARIANT_IMG]}:PLACEHOLDER_PRODUCT_IMG} 
                  style={{ width: WIDTH * 28 / 100, height: 80, resizeMode: 'contain', }} />
              }
              <Ripple style={{marginTop:DIMENS.px_10,borderStyle:item.uri== undefined ?'dashed':undefined,
             // borderColor:item.uri== undefined ?item[APP_PARAMS.DEF_VARIENT]&&item[APP_PARAMS.DEF_VARIENT]===true ? colors.Blue : colors.grayClr:undefined,
              borderColor:item.uri== undefined ?item.select&&item.select===true ? colors.Blue : colors.grayClr:undefined,
              borderRadius:item.uri== undefined ?1:0,borderWidth:item.uri== undefined ?1:0,
              //backgroundColor:item[APP_PARAMS.DEF_VARIENT]&&item[APP_PARAMS.DEF_VARIENT]===true ?colors.orange:undefined}} 
              backgroundColor:item.select&&item.select===true ?colors.orange:undefined}} 
              onPress={()=>this.selectVarinetOfPrduct(item,index,data,secIndex)}
              >
              <Text style={{padding: 10, color: colors.blueTextClr, textAlign:'center',
                    fontFamily: FONT_FAMILIY.Roboto_Regular, fontSize: DIMENS.txt_size_medium_14,
                    borderStyle:'dashed', borderRadius:2}} >
                   { item.value}
                </Text>
            </Ripple>
        </View>
               
        )
    }
    renderItem = (item1,secIndex) => {
        return (
            <View style={{paddingVertical:10,paddingHorizontal:15}}>
                <Text style={{ color: colors.black, fontFamily: FONT_FAMILIY.Roboto_Regular, fontSize: DIMENS.txt_size_medium_14 }}>
                    {item1.type }
                </Text>
                <FlatList
                showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={item1.data}
                    renderItem={({ item, index }) => this.renderItemList(item, index,item1.data,secIndex)}
                    keyExtractor={(item, index) => item + index}
                    extraData={this.state} />
            </View>
        )
    }
    footerList=()=>{
        return(
            <View style={{marginBottom:10}}>
                <Text style={{
                    marginHorizontal:15,
                    fontSize:DIMENS.txt_size_medium_1,
                    fontFamily:FONT_FAMILIY.Roboto_Medium,
                    color:colors.primary
                }}>
                 {this.state.productVarintDetail?this.state.productVarintDetail[APP_PARAMS.QUANTITY]&&`${this.state.productVarintDetail[APP_PARAMS.QUANTITY]} item  available in stock`:translate('COMBINATION_NOT_AVAILBLE')}
                </Text>
            </View>
        )
    }
    render() {
        
        return (
            <View style={{ flex: 1 }}>
                <CommonNavHeader title={translate('SCREEN_COLOR_VARIENT')}
                    backPress={() => this.props.navigation.goBack()} />
                    <ScrollView>
                <View style={{ flex: 1 }}>
                    {
                        this.state.productInfo&&
                        <CommonInfoProduct
                        data = {this.state.productInfo}
                    />
                    }
                   
                    <View>
                        <FlatList
                            data={this.state.dataAreColor}
                            renderItem={({ item, index }) => this.renderItem(item, index)}
                            keyExtractor={(item, index) => item + index}
                            extraData={this.state}
                            ListFooterComponent={()=>this.footerList()} />
                    </View>
                </View>
               
                </ScrollView>
                <View style={{bottom:0,flexDirection:'row',backgroundColor:colors.primary}}>
                            <Ripple style={{flex:0.5}} onPress={()=>this.props.navigation.goBack()}>
                                <View style={{backgroundColor:colors.primary,borderTopWidth:0.3,borderTopColor:colors.lightGraytransparent}}>
                                <Text style={{padding:15,textAlign:'center',fontSize:DIMENS.txt_size_medium_1,fontFamily:FONT_FAMILIY.Roboto_Medium,color:colors.white}}>
                                    {translate('CANCEL')}</Text>
                                </View>
                                </Ripple>
                                <Ripple 
                                 disabled={this.state.productVarintDetail!=undefined?false:true}
                                style={{flex:0.5,backgroundColor:this.state.productVarintDetail!=undefined?colors.orange:colors.grayClrForTxt}} onPress={()=>this.applySelectVarient()} >
                                <Text style={{padding:15,textAlign:'center',fontSize:DIMENS.txt_size_medium_1,fontFamily:FONT_FAMILIY.Roboto_Medium,color:colors.white}}>
                                    {translate('APPLY')}</Text>
                                {/* </View> */}
                                </Ripple>
                            </View>
            </View>
        )
    }
}
const style = StyleSheet.create({
    scene: {
        flex: 1,
    },
    indicator: {
        backgroundColor: 'green',
    },
    container: {
        // marginTop: 100,
        backgroundColor: 'red',

    },
    tabItem: {
        flex: 1,
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'red',
    },
});

// // for (let itemIndex = 0; itemIndex < item.pair.length; itemIndex++) {
                    //     const pairObj = item.pair[itemIndex];
                    //      let returnLoop = false
                       
                    //     elt.pair.some(function (pairELt, pairIndex, _arr) {
                    //         if(pairingArr.length>0&&pairingArr[0]===pairELt){//&&listIndex!=secIndex
                    //             pairingArr.push(pairELt)
                    //             elt.prodVariant.some(function (eltProductIdELt, eltProductIdIndex, _arr) {
                    //                 let dataTemp = {...eltProductIdELt}
                    //                 dataTemp.value = elt.value
                    //                 dataTemp.attrName = elt.attrName
                                   
                    //                 if(pairingArr.some(pair=>pair==eltProductIdELt.pair)){
                    //                     console.log('selectVarintObj::---pair2',eltProductIdELt.pair)

                    //                      selectedProduct.push(dataTemp)
                    //                      console.log('selectVarintObj::---add2',eltProductIdELt)

                    //                 }
                    //             })
                    //             returnLoop = true
                    //             return true;
                    //         }else 
                    //         if(pairObj===pairELt&&pairingArr.length==0){
                    //                 pairingArr.push(pairObj)
                                   
                    //                 elt.prodVariant.some(function (eltProductIdELt, eltProductIdIndex, _arr) {
                    //                     console.log('selectVarintObj::---prodVariant1',eltProductIdELt,"pair obj",item.prodVariant)
                    //                     if(pairingArr.some(pair=>pair==eltProductIdELt.pair)){
                    //                         console.log('selectVarintObj::---pair1',eltProductIdELt.pair)

                    //                         let dataTemp = {...eltProductIdELt}
                    //                          dataTemp.value = elt.value
                    //                          dataTemp.attrName = elt.attrName
                                            

                    //                         selectedProduct.push(dataTemp)
                    //                         console.log('selectVarintObj::---add1',eltProductIdELt)

                    //                     }
                    //                 })
                    //                 returnLoop = true
                    //                 return true;
                                
                    //         }else{
                    //           //  console.log('selectVarintObj::---not exist',JSON.stringify(pairELt))
                    //          }
                    //     });