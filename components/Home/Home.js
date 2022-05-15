import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {BottomNavigation} from 'react-native-paper';

import Account from './Account/Account';
import LaundryShop from './LaundryShop/LaundryShop';
import Order from './Ordering/Order';

const Home = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'laundry', title: 'Laundry', icon: 'tshirt-crew'},
    {key: 'order', title: 'Order', icon: 'clipboard'},
    {key: 'account', title: 'Account', icon: 'account'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    account: Account,
    laundry: LaundryShop,
    order: Order,
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

export default Home;
