import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import axios from 'axios';
import {useRoute, useNavigation} from '@react-navigation/native';
import moment from 'moment';

const IndividualOrder = () => {
  const route = useRoute();
  const [order, setOrder] = useState([]);
  useEffect(() => {
    const interval = setInterval(() => {
      const orderId = route.params.orderId;
      const formdata = new FormData();
      formdata.append('id', orderId);
      axios
        .post('https://palabaph.com/api/getspecificorder', formdata)
        .then(response => {
          setOrder(response.data);
          console.log(response.data);
        });
    }, 3000)
    const orderId = route.params.orderId;
    const formdata = new FormData();
    formdata.append('id', orderId);
    axios
      .post('https://palabaph.com/api/getspecificorder', formdata)
      .then(response => {
        setOrder(response.data);
        console.log(response.data);
      });
      return () => clearInterval(interval)
  }, []);

  const acceptOrder = id => {
    const orderId = id;
    const formdata = new FormData();
    formdata.append('id', orderId);
    axios
      .post('https://palabaph.com/api/acceptorder', formdata)
      .then(response => {
        Alert.alert(
          'Order Accepted!',
          'Go to the address of the customer and make sure to let them scan the QR Code!',
        );
      });
  };

  return (
    <View style={styles.container}>
      {order.map((item, id) => {
        return (
          <View style={styles.headerContainer}>
            <View style={{paddingVertical: 30}}>
              <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 25}}>
                Ordered By:{' '}
                <Text style={{fontWeight: '400', fontSize: 25}}>
                  {item.first_name} {item.last_name}
                </Text>
              </Text>
              <Text style={{fontWeight: '400', fontSize: 14, color: '#fff'}}>
                {item.street}, Brgy.{item.barangay.substring(9)},{' '}
                {item.city.substring(6)}
              </Text>
              <Text style={{fontWeight: '400', fontSize: 14, color: '#fff'}}>
                {moment(item.created_at).format('LL | hh:mmA')}
              </Text>
            </View>
            <View
              style={{
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                paddingVertical: 30,
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: 18,
                  paddingBottom: 10,
                }}>
                Total Price:{' '}
                <Text style={{fontWeight: '400', fontSize: 18}}>
                  P{item.total_price}
                </Text>
              </Text>
              {item.status == "Accepted" ? (
                <View style={{ backgroundColor: "#6E85F5", paddingVertical: 10, paddingHorizontal: 15 }}>
                  <Text style={{ color: "#fff" }}>Accepted</Text>
                </View>
              ) : (
              <TouchableOpacity
                style={{
                  backgroundColor: '#6E85F5',
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                }}
                onPress={() => acceptOrder(item.id)}>
                <Text style={{color: '#fff'}}>Accept</Text>
              </TouchableOpacity>
              )}
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  headerContainer: {
    flex: 0.3,
    justifyContent: 'flex-start',
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: '#272f56',
  },
  bodyContainer: {
    flex: 0.7,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default IndividualOrder;
