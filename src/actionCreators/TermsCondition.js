import {
  APP_IS_FROM_TERMS
} from '../constants'

export function appIsFromComing(data) {
  return { type: APP_IS_FROM_TERMS, payload: data }
}
