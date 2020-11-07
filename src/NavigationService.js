import {
  NavigationActions,
  StackActions,
} from 'react-navigation'

/**
 * @typedef {Object} NavigationNavigateActionPayload
 * @property {string} routeName
 * @property {Object} params optional key value object
 * @property {'Navigation/NAVIGATE'} action The action to run inside the sub-router (optional)
 * @property {string} key optional
 */

let _navigator

export function init(navigatorRef) {
  _navigator = navigatorRef
}

/**
 * Navigate to route
 * @param {NavigationNavigateActionPayload} params 
 */
export function navigate(params) {
  _navigator.dispatch(
    NavigationActions.navigate(params)
  )
}
/* Clear Stack */
export function clearStack(screenName, params) {
  const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: screenName, params })],
  });
  let navigation = _navigator._navigation;
  navigation.dispatch(resetAction);
}

/**
 * Push route to stack
 * @param {NavigationNavigateActionPayload} params
 */
export function push(params) {
  
  _navigator.dispatch(StackActions.push(params))
}

/**
 * Navigate back to previous route in history
 */
export function back() {
  _navigator.dispatch(NavigationActions.back())
}

/**
 * Navigate to the top route of stack
 */
export function popToTop() {
  _navigator.dispatch(StackActions.popToTop())
}
export function popToScren(number){
  const popAction = StackActions.pop({
    n: number,
    });
    _navigator.dispatch (popAction) ;
}

export function getCurrentRoute(route) {
  if (!route) {
    if (!_navigator || !_navigator.state) return
    route = _navigator.state.nav
  }
  if (route.routes && route.routes.length) {
    return getCurrentRoute(route.routes[route.index])
  } else {
    return route
  }
}

export default {
  back,
  getCurrentRoute,
  init,
  navigate,
  popToTop,
  push,
  clearStack,
  popToScren
}