import React from 'react';
import { View } from 'react-native';
import moment from 'moment';

// Components
import Text from '../../Components/Text';
import Button from '../../Components/Button';

// Styles
import styles from './styles';

const Preference = ({ title, children, disabled }) => (
  <View style={styles.singlePreferenceContainer}>
    <Text style={[styles.preferenceType, disabled && styles.disabled]}>{title}: </Text>
    <Text style={[styles.preference, disabled && styles.disabled]}>{children}</Text>
  </View>
);

const PreferenceTitle = ({ title, disabled }) => (
  <Text style={[styles.preferenceTitle, disabled && styles.disabled]}>{title}</Text>
);

const WashingPreferences = ({ orderItem, disabled }) => (
  <View style={styles.preferenceSection}>
    <PreferenceTitle disabled={disabled} title="Washing Preferences" />
    <Preference disabled={disabled} title="Detergent">
      {orderItem.will_provide_detergent ? `Customer's` : `Dropps`}
    </Preference>
    {/* <Preference disabled={disabled} title="Fabric Softener">
      {orderItem.will_provide_fabric_softener ? `Customer's` : `Any`}
    </Preference> */}
    <Preference disabled={disabled} title="Temperature">
      {orderItem.washing_temperature}
    </Preference>
    <Preference disabled={disabled} title="Soil">
      {orderItem.soil}
    </Preference>
    <Preference disabled={disabled} title="Load Type">
      {orderItem.load_type}
    </Preference>
    {orderItem.washing_special_requests &&
      orderItem.washing_special_requests.length && (
      <Text style={styles.washingConsumerNote}>
        {orderItem.washing_special_requests}
      </Text>
    )}
  </View>
);

const DryingPreferences = ({ orderItem, disabled }) => (
  <View style={styles.preferenceSection}>
    <PreferenceTitle disabled={disabled} title="Drying Preferences" />
    <Preference disabled={disabled} title="Temperature">
      {orderItem.drying_temperature}
    </Preference>
    <Preference disabled={disabled} title="Dryer Sheet">
      {orderItem.will_provide_dryer_sheet ? `Supplied` : `No`}
    </Preference>
    {orderItem.drying_special_requests &&
      orderItem.drying_special_requests.length && (
        <Text style={styles.washingConsumerNote}>
          {orderItem.drying_special_requests}
        </Text>
      )}
  </View>
);

const readableOrderItemStatus = (status) => {
  const statusMap = {
    picked_up: `Picked Up`,
    washing: `Washing`,
    drying: `Drying`,
    folding: `Folding`,
    out_for_delivery: `Ready for Drop Off`,
    completed: `Complete`,
  };

  return statusMap[status];
}

const readableCTA = (status) => {
  const statusMap = {
    picked_up: `Start Washing`,
    washing: `Start Drying`,
    drying: `Start Folding`,
    folding: `Finished Folding`,
  };

  return statusMap[status];
}

readableLastUpdatedAt = (orderItem) => {
  const updatedMoment = moment(orderItem.last_updated_at);
  return updatedMoment.format("MMM DD h:mm A");
}

const Instructions = ({ orderItem, onStatusChangePress, hamprIsLoading }) => (
  <>
    <View style={styles.instructionsHeader}>
      <View>
        <Text style={styles.title}>{orderItem.label}</Text>
        <Text style={styles.scanText}>Label: {orderItem.hampr_scan_text}</Text>
      </View>
      <Text style={styles.headerStatus}>
        {readableOrderItemStatus(orderItem.status)}
      </Text>
    </View>
    <View style={styles.preferencesContainer}>
      <WashingPreferences
        orderItem={orderItem}
        disabled={orderItem.status !== `picked_up`}
      />
      <DryingPreferences
        orderItem={orderItem}
        disabled={orderItem.status !== `washing`}
      />
    </View>
    <View style={styles.dateAndButtonContainer}>
      <Text style={styles.status}>{readableOrderItemStatus(orderItem.status) + `\n`
       + readableLastUpdatedAt(orderItem)}</Text>
      <Text />
      {orderItem.status !== `out_for_delivery` && (
        <Button
          title={hamprIsLoading ? `Loading...` : readableCTA(orderItem.status)}
          style={styles.button}
          titleStyle={styles.titleStyle}
          containerStyle={styles.buttonContainer}
          onPress={hamprIsLoading ? null : onStatusChangePress}
        />
      )}
    </View>
  </>
);

export default Instructions;
