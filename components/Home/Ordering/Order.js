import React, {useEffect, useContext} from 'react';
import {View, Text, Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';
import {UserContext} from '../../../provider/UserProvider';

const Order = () => {
  const user = useContext(UserContext);
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }
  useEffect(() => {
    requestUserPermission();
    messaging()
      .getToken()
      .then(token => {
        const formdata = new FormData();
        formdata.append('id', user.id);
        formdata.append('token', token);

        axios
          .post('http://10.0.2.2:8000/api/updatetoken', formdata)
          .then(response => {
            console.log(response.data);
          });
      });
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  return (
    <View>
      <Text>Orders</Text>
    </View>
  );
};

export default Order;
