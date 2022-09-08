import React, {useState, useEffect, useContext} from 'react';
import {View, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {Button, Headline, Caption} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {UserContext} from '../../../../provider/UserProvider';

const NotificationTab = () => {
  const navigation = useNavigation();
  const user = useContext(UserContext);

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const formdata = new FormData();
    formdata.append('user_id', user.id);
    axios
      .post('https://palabaph.com/api/getallorders', formdata)
      .then(response => {
        setNotifications(response.data);
        // console.log(response.data.length);
      });
    axios
      .post('https://palabaph.com/api/getstoreorders', formdata)
      .then(response => {
        setNotifications(oldValues => [...oldValues, response.data[0]]);
        // console.log(response.data);
      })
      .then(() => {
        console.log(notifications);
      });
  }, []);
  return (
    <View style={styles.container}>
      <View style={{width: '10%'}}>
        <Button
          icon="arrow-left"
          labelStyle={{
            fontSize: 25,
            fontWeight: 'bold',
            flex: 1,
          }}
          color="#272f56"
          mode="text"
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.headerContainer}>
        <Headline style={{fontSize: 32, fontWeight: 'bold', color: '#272f56'}}>
          Navigation Tab
        </Headline>
        <Caption
          style={{fontSize: 16, paddingHorizontal: 18, textAlign: 'center'}}>
          Your processed orders can be seen here for both platforms!
        </Caption>
      </View>
      <View style={styles.bodyContainer}>
        <ScrollView style={{width: '100%'}}>
          {notifications.length != 0 ? (
            <View>
              {notifications.map((item, id) => {
                if (item.mobile_order_id != undefined) {
                  return (
                    <TouchableOpacity
                      style={styles.notificationTab}
                      onPress={() => {
                        navigation.push('IndividualNotificationTab', {
                          mobileOrderId: item.mobile_order_id,
                        });
                      }}>
                      <Headline>{item.name}</Headline>
                      <Caption>
                        P{item.total_price} - {item.commodity_type}
                      </Caption>
                    </TouchableOpacity>
                  );
                } else {
                  if (item.status != 'Voided') {
                    return (
                      <TouchableOpacity
                        style={styles.notificationTab}
                        onPress={() => {
                          navigation.push('IndividualNotificationTab', {
                            storeOrderId: item.order_id,
                          });
                        }}>
                        <Headline>{item.name}</Headline>
                        <Caption>
                          P{item.total_price} - {item.commodity_type}
                        </Caption>
                      </TouchableOpacity>
                    );
                  }
                }
              })}
            </View>
          ) : (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Caption
                style={{fontSize: 15, color: '#272f56', fontWeight: 'bold'}}>
                Nothing to show here yet
              </Caption>
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  bodyContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  notificationTab: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#DBE5F0',
  },
});

export default NotificationTab;
