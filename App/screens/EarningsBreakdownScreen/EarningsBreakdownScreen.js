import React from 'react';
import { View, SectionList } from 'react-native';
import styles from './styles';
import SeparatorLine from '../../Components/SeparatorLine';
import { HeaderItem, OrderPendingItem, OrderItem } from './ProfileEarningsItems';

const DATA = [
  {
    header: {
      orders: '3',
      date: 'Pending',
    },
    data: [
      {
        hamprs: '5',
        hours: '09:00 AM',
      },
      {
        hamprs: '2',
        hours: '09:00 AM',
      },
      {
        hamprs: '7',
        hours: '09:00 AM',
      },
    ],
  },
  {
    header: {
      orders: '3',
      date: 'July 12',
      totalMoney: '$18.30',
    },
    data: [
      {
        hamprs: '5',
        hours: '09:00 AM',
        money: '$2.30',
      },
      {
        hamprs: '5',
        hours: '09:00 AM',
        money: '$10.00',
      },
      {
        hamprs: '5',
        hours: '09:00 AM',
        money: '$6.00',
      },
    ],
  },
];

const EarningsBreakdownScreen = () => (
  <View style={styles.container}>
    <SectionList
      sections={DATA}
      ItemSeparatorComponent={() => <SeparatorLine style={styles.separatorLine} />}
      renderItem={({ section: { header }, item }) =>
        header.date !== 'Pending' ? <OrderItem data={item} /> : <OrderPendingItem data={item} />
      }
      renderSectionHeader={({ section: { header } }) => <HeaderItem data={header} />}
    />
  </View>
);

export default EarningsBreakdownScreen;
