// NavigationService.js

import { NavigationActions, StackActions } from 'react-navigation';
// import BugSnagService from './BugSnagService';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function goBack() {
  const popAction = StackActions.pop({
    n: 1,
  });
  _navigator.dispatch(popAction);
}

function reset(routeName, params) {
  const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName, params })],
  });
  _navigator.dispatch(resetAction);
}

function resetRoutes(routes) {
  const resetAction = StackActions.reset({
    index: routes.length - 1,
    actions: routes.map(route => {
      return NavigationActions.navigate({
        routeName: route.routeName,
        params: route.params,
      });
    }),
  });

  _navigator.dispatch(resetAction);
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

function popToTop() {
  _navigator.dispatch(StackActions.popToTop());
}

function popBack() {
  _navigator.dispatch(NavigationActions.back());
}

function popToTopWithBack() {
  _navigator.dispatch(StackActions.popToTop());
  _navigator.dispatch(NavigationActions.back());
}

function getCurrentRoute(nav) {
    if( Array.isArray(nav.routes) && nav.routes.length > 0 ){
      return getCurrentRoute(nav.routes[nav.index])
    } else {
      return nav.routeName
    }
}

function currentRouteName() {
  return getCurrentRoute(_navigator.state.nav);
}

export default {
  navigate,
  goBack,
  popBack,
  reset,
  resetRoutes,
  setTopLevelNavigator,
  popToTop,
  popToTopWithBack,
  currentRouteName,
  // resetToServiceCheckAfterLogout,
  // resetToHomeAfterAuth,
  // resetCheckoutToOrderStatus,
  // resetGroupToMenuScreen,
  // resetGroupMemberToOrderReview,
  // resetOrderAgainToOrderReview,
  // resetProfileToProfileToHome,
  // popToTopToHome,
};
