import React from 'react';
import NavigationService from '../Services/NavigationService';
import AppNavigation from './AppNavigation';

class WrapNavigation extends React.Component {
  render() {
    return (
      <AppNavigation
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
}

export default WrapNavigation;
