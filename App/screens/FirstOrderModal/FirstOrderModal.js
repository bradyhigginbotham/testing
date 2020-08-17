import React from 'react';
import { View, ScrollView } from 'react-native';
import { Surface } from 'react-native-paper';
import PropTypes from 'prop-types';
import styles from './styles';
import Button from '../../Components/Button';
import Text from '../../Components/Text';

const FirstOrderModal = ({ navigation }) => (
  <View style={styles.container}>
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>{'Congrats on your\nfirst claim!'}</Text>
      <Surface style={styles.surface}>
        <View style={styles.itemContainer}>
          <View style={styles.leftSide}>
            <View style={styles.block1} />
            <View style={styles.block2} />
          </View>
          <View style={styles.rightSide}>
            <Button
              title="CLAIM"
              style={styles.button}
              titleStyle={styles.titleStyle}
              containerStyle={styles.buttonContainer}
            />
            <View style={styles.block2} />
          </View>
        </View>
      </Surface>
      <Text style={styles.subtitle}>Here’s what you need to know:</Text>
      <Text style={styles.text}>{'1. Double tap `CLAIM` to add the\norder to your route!'}</Text>
      <Text style={styles.text}>
        {
          '2. By claiming an order, you are\nagreeing that you will fulfill the order\nwithin the designated pick up and\ndrop off windows.'
        }
      </Text>
      <Text style={styles.endText}>3. Enjoy</Text>
      <Button
        title="Got It"
        style={styles.startButton}
        titleStyle={styles.startButtonTitleStyle}
        containerStyle={styles.startButtonContainer}
        onPress={() => navigation.goBack()}
      />
    </ScrollView>
  </View>
);

FirstOrderModal.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default FirstOrderModal;
