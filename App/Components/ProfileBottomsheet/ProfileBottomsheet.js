import React from 'react';
import {View} from 'react-native';
import {Portal} from 'react-native-paper';
import PropTypes from 'prop-types';
import Text from '../Text';
import BottomSheet from '../BottomSheet';
import styles from './styles';
import { RippleButton } from '../../screens/ProfileScreen/ProfileScreen';

const SeparatorLine = () => <View style={styles.separator} />;

const ProfileBottomsheet = ({ bottomsheet, saveChanges, discardChanges }) => (
  <Portal>
    <BottomSheet ref={bottomsheet}>
      <View style={styles.bottomsheetContentContainer}>
        <View>
          <Text style={styles.bottomTitle}>Discard Your Changes? </Text>
          <Text style={styles.bottomSubtitle}>
            If you leave this page, you will lose your changes.
          </Text>
        </View>
        <RippleButton
          onPress={() => saveChanges()}
          style={styles.defaultMapOptionContainer}>
          <Text style={styles.saveChangesText}>Save Changes</Text>
        </RippleButton>
        <SeparatorLine />
        <RippleButton
          onPress={() => discardChanges()}
          style={styles.defaultMapOptionContainer}>
          <Text style={styles.discardChangesText}>Discard</Text>
        </RippleButton>
      </View>
    </BottomSheet>
  </Portal>
);

ProfileBottomsheet.propTypes = {
  saveChanges: PropTypes.func.isRequired,
  discardChanges: PropTypes.func.isRequired,
  bottomsheet: PropTypes.string.isRequired,
};

export default ProfileBottomsheet;
