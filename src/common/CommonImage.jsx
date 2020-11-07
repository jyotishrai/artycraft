import React from 'react'
import FastImage from 'react-native-fast-image'

import { SHOP_CART } from '../images'

const ImageViewer = ({ styles, source, resizeMode }) => {

  let sourcen = source;
  {

    try {
      source != undefined && String(source.uri).includes("http") && (sourcen.priority = FastImage.priority.high)
      styles != undefined && String(styles.resizeMode).includes("contain") && (sourcen.resizeMode = FastImage.resizeMode.contain)
      styles != undefined && String(styles.resizeMode).includes("center") && (sourcen.resizeMode = FastImage.resizeMode.center)
      styles != undefined && String(styles.resizeMode).includes("cover") && (sourcen.resizeMode = FastImage.resizeMode.cover)
      styles != undefined && String(styles.resizeMode).includes("stretch") && (sourcen.resizeMode = FastImage.resizeMode.stretch)
    } catch (error) {

    }

  }
  return (
    <FastImage
      style={styles}
      source={source}
      resizeMode={resizeMode != undefined ? resizeMode : FastImage.resizeMode.contain}

    />
  )
}



export default ImageViewer