import React, {useState} from 'react';
import { View, Text } from 'react-native'
import { BottomNavigation } from 'react-native-paper';

import Accounts from './Accounts';
import Statistics from './Statistics';

const HomeOwner = () => {
    const [index, setIndex] = useState(0)
    const [routes] = useState([
        {key: 'statistics', title: "Statistics", icon: 'chart-bar'},
        {key: 'account', title: "Account", icon: 'account'}
    ]);

    const renderScene = BottomNavigation.SceneMap({
        statistics: Statistics,
        account: Accounts,
    })

    return (
        <BottomNavigation 
            shifting
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
            barStyle={{ backgroundColor: "#272f56" }}
        />
    );
}

export default HomeOwner;