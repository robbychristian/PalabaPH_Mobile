import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {BottomNavigation} from 'react-native-paper';

import RiderOrders from './Orders/RiderOrders';
import RiderOrdersHistory from './Orders/RiderOrdersHistory';

const HomeRider = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'orders', title: 'Orders', icon: 'tshirt-crew'},
    {key: 'history', title: 'History', icon: 'tshirt-crew'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    orders: RiderOrders,
    history: RiderOrdersHistory,
  });
  return (
    <BottomNavigation
      shifting
      navigationState={{index, routes}}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={{backgroundColor: '#272f56'}}
    />
  );
};

export default HomeRider;
