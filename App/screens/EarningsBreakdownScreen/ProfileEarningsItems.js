import React from 'react';
import { View, Image } from 'react-native';
import { List as PaperList, TouchableRipple } from 'react-native-paper';
import PropTypes from 'prop-types';
import Text from '../../Components/Text';
import styles from './styles';
import images from '../../Themes/Images';
import colors from '../../Themes/Colors';

export const HeaderItem = ({ children, data }) => (
  <View style={{ flexDirection: 'column' }}>
    <PaperList.Section style={styles.pendingContainer}>
      <PaperList.Subheader style={styles.pendingTitle}>{data.date}</PaperList.Subheader>
      <PaperList.Subheader style={styles.pendingTitle}>
        {data.totalMoney ? `${data.orders} orders: ${data.totalMoney}` : `${data.orders} orders`}
      </PaperList.Subheader>
    </PaperList.Section>
    {children}
  </View>
);

export const OrderItem = ({ data, onPress }) => (
  <TouchableRipple style={styles.itemContainer} rippleColor={colors.ripple} onPress={onPress}>
    <PaperList.Item
      style={styles.orderPendingContainer}
      left={() => (
        <View>
          <Text style={styles.orderHamprs}>{data.hamprs} hamprs</Text>
          <Text style={styles.orderTime}>{data.hours}</Text>
        </View>
      )}
      right={() => (
        <View style={styles.rightOrderContainer}>
          <Text style={styles.orderMoney}>{data.money}</Text>
          <Image style={styles.orderImage} source={images.forwardArrow} />
        </View>
      )}
    />
  </TouchableRipple>
);

export const OrderPendingItem = ({ data, onPress }) => (
  <TouchableRipple style={styles.itemContainer} rippleColor={colors.ripple} onPress={onPress}>
    <PaperList.Item
      style={styles.orderPendingContainer}
      left={() => (
        <View>
          <Text style={styles.orderPendingHamprs}>{data.hamprs} hamprs</Text>
          <Text style={styles.orderPendingHours}>{data.hours}</Text>
        </View>
      )}
    />
  </TouchableRipple>
);

HeaderItem.defaultProps = {
  data: {},
  children: undefined,
};

HeaderItem.propTypes = {
  data: PropTypes.shape({
    date: PropTypes.string,
    money: PropTypes.string,
    orders: PropTypes.string,
    totalMoney: PropTypes.string,
  }),
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};

OrderPendingItem.defaultProps = {
  data: {},
  onPress: () => {},
};

OrderPendingItem.propTypes = {
  onPress: PropTypes.func,
  data: PropTypes.shape({
    hamprs: PropTypes.string,
    hours: PropTypes.string,
  }),
};

OrderItem.defaultProps = {
  data: {},
  onPress: () => {},
};

OrderItem.propTypes = {
  onPress: PropTypes.func,
  data: PropTypes.shape({
    hours: PropTypes.string,
    money: PropTypes.string,
    hamprs: PropTypes.string,
  }),
};
