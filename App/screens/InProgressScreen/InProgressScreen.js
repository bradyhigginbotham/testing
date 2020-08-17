import React from 'react';
import { View, ActivityIndicator, FlatList, Text} from 'react-native';
import { connect } from 'react-redux';

// Components
import InProgressItem from '../../Components/InProgressItem';
import InProgressFabButton from './InProgressFabButton';
import OrdersCreators from '../../Redux/OrdersRedux';

// Styles
import colors from '../../Themes/Colors';
import styles from './styles';

const renderLoading = (
  <View>
    <ActivityIndicator
      size="large"
      color={colors.light_grey_green}
      style={styles.loading}
    />
  </View>
);

const InProgressScreen = ({
  inProgressOrders,
  deliveryOrdersLoading,
  fetchDeliveryOrders, 
  navigation,
}) => {
  _renderEmptyState = () => {
    if (inProgressOrders.length) {
      return null;
    }

    return (
      <Text style={styles.emptyState}>
        You have no orders in progress right now.
      </Text>
    );
  };

  _renderFab = () => {
    return;
    
    if (inProgressOrders.length) {
      return <InProgressFabButton />;
    }
  }

  if (deliveryOrdersLoading && !inProgressOrders.length) {
    return renderLoading;
  }

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.contentContainer}
        data={inProgressOrders}
        onRefresh={fetchDeliveryOrders}
        refreshing={deliveryOrdersLoading}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <InProgressItem
            item={item}
            onPress={() => navigation.navigate('MyOrdersDetail', {order: item})}
          />
        )}
      />
      {_renderEmptyState()}
      {_renderFab()}
    </View>
  );
};

const mapStateToProps = ({ orders: { inProgressOrdersList, deliveryOrdersLoading }}) => ({
  inProgressOrders: inProgressOrdersList,
  deliveryOrdersLoading,
});

const mapDispatchToProps = {
  fetchInProgressOrders: OrdersCreators.fetchDeliveryOrders,
  fetchDeliveryOrders: OrdersCreators.fetchDeliveryOrders,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InProgressScreen);
