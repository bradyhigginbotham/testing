import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { connect } from 'react-redux';
import { Portal } from 'react-native-paper';
import PropTypes from 'prop-types';
import Config from 'react-native-config';
import stripe from 'tipsi-stripe';

import WrapNavigation from '../Navigation/WrapNavigation';
import StartupActions from '../Redux/StartupRedux';
import ReduxPersist from '../Config/ReduxPersist';
import styles from './RootContainerStyles';
import colors from '../Themes/Colors';

class RootContainer extends Component {
  componentDidMount() {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      const { startup } = this.props;
      startup();
    }

    stripe.setOptions({
      publishableKey: Config.STRIPE_PUBLISHABLE_KEY,
    });
  }

  render() {
    return (
      <Portal.Host>
        <View style={styles.applicationView}>
          <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
          <WrapNavigation />
        </View>
      </Portal.Host>
    );
  }
}

RootContainer.propTypes = {
  startup: PropTypes.func.isRequired,
};

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = dispatch => ({
  startup: () => dispatch(StartupActions.startup()),
});

export default connect(
  null,
  mapDispatchToProps
)(RootContainer);
