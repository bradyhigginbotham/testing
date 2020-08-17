import React from 'react';
import { ScrollView, View } from 'react-native';
import { Surface } from 'react-native-paper';
import PropTypes from 'prop-types';
import Text from '../../Components/Text';
import styles from './styles';

const Item = ({ money, date, orders }) => (
  <Surface style={styles.itemContainer}>
    <View>
      <Text style={styles.itemText}>{date}</Text>
      <Text style={styles.money}>${money}</Text>
    </View>
    <Text style={styles.itemText}>{orders} orders</Text>
  </Surface>
);

const EarningsOverviewScreen = () => (
  <View style={styles.container}>
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <Item money="87.65" date="Today so far" orders="6" />
      <Item money="102.78" date="Yesterday" orders="5" />
      <Item money="562.32" date="This Week (Sun-Sat)" orders="20" />
    </ScrollView>
  </View>
);

Item.defaultProps = {
  money: '',
  date: '',
  orders: '',
};

Item.propTypes = {
  money: PropTypes.string,
  date: PropTypes.string,
  orders: PropTypes.string,
};

export default EarningsOverviewScreen;
