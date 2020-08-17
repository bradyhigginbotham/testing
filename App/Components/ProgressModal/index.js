import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native-paper';
import { View } from 'react-native-animatable';
import { Portal } from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import styles from './styles';
import colors from '../../Themes/Colors';

const propTypes = {
  title: PropTypes.string,
  isVisible: PropTypes.bool,
};

const defaultProps = {
  title: undefined,
  isVisible: false,
};

/**
 * A modal to indicate background processes need to complete before a user can
 * continue. This uses the internal `Modal` component but is highly restrictive.
 * Child components cannot be provided to create the body an only a title is
 * allowed as an optional property.
 *
 * @param {JSON} param Properties for toggling visibility (`isVisible`) and
 * providing an optional title (`title`).
 */
class ProgressModal extends PureComponent {
  render() {
    const { isVisible } = this.props;
    if (isVisible) {
      return (
        <Portal>
          <View style={styles.container}>
            <ActivityIndicator
              size="large"
              color={colors.white}
              style={styles.loading}
            />
          </View>
        </Portal>
      );
    } else {
      return null;
    }
  }
}

ProgressModal.propTypes = propTypes;
ProgressModal.defaultProps = defaultProps;

export default ProgressModal;
