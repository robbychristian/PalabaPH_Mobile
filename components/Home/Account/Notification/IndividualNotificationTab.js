import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';

const IndividualNotificationTab = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const mobileOrderId = route.params.mobileOrderId;
  const storeOrderId = route.params.storeOrderId;
  const [mobileOrder, setMobileOrder] = useState([]);
  const [storeOrder, setStoreOrder] = useState([]);

  useEffect(() => {
    if (mobileOrderId != undefined) {
      const formdata = new FormData();
      formdata.append('order_id', mobileOrderId);
      axios
        .post('https://palabaph.com/api/getindividualmobileorder', formdata)
        .then(response => {
          setMobileOrder(response.data);
        });
    } else if (storeOrderId != undefined) {
      const formdata = new FormData();
      formdata.append('order_id', storeOrderId);
      axios
        .post('https://palabaph.com/api/getindividualstoreorder', formdata)
        .then(response => {
          setStoreOrder(response.data);
        });
    }
    console.log(mobileOrderId);
    console.log(storeOrderId);
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
      {mobileOrder.length != 0 ? (
        <View style={styles.bodyContainer}>
          {mobileOrder.map((item, id) => {
            return (
              <View
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 35, marginBottom: 15}}>{item.name}</Text>
                <View style={styles.cardContainer}>
                  <View style={styles.textContainer}>
                    <Text style={styles.keyFont}>Name: </Text>
                    <Text style={styles.valueFont}>{item.first_name} {item.last_name}</Text>
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.keyFont}>Total Price: </Text>
                    <Text style={styles.valueFont}>P{item.total_price}</Text>
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.keyFont}>Mode of Payment: </Text>
                    <Text style={styles.valueFont}>{item.mode_of_payment.charAt(0).toUpperCase() + item.mode_of_payment.slice(1).toLowerCase()}</Text>
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.keyFont}>Commodity Type: </Text>
                    <Text style={styles.valueFont}>{item.commodity_type}</Text>
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.keyFont}>Status: </Text>
                    <Text style={{ fontSize: 20, color: "green" }}>{item.status}</Text>
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.keyFont}>Payment Status: </Text>
                    <Text style={styles.valueFont}>{item.payment_status}</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      ) : (
        <View style={styles.bodyContainer}>
          {storeOrder.map((item, id) => {
            return (
              <View
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 35, marginBottom: 15}}>{item.name}</Text>
                <View style={styles.cardContainer}>
                  <View style={styles.textContainer}>
                    <Text style={styles.keyFont}>Name: </Text>
                    <Text style={styles.valueFont}>{item.first_name} {item.last_name}</Text>
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.keyFont}>Total Price: </Text>
                    <Text style={styles.valueFont}>P{item.total_price}</Text>
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.keyFont}>Mode of Payment: </Text>
                    <Text style={styles.valueFont}>{item.mode_of_payment.charAt(0).toUpperCase() + item.mode_of_payment.slice(1).toLowerCase()}</Text>
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.keyFont}>Commodity Type: </Text>
                    <Text style={styles.valueFont}>{item.commodity_type}</Text>
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.keyFont}>Status: </Text>
                    <Text style={{ fontSize: 20, color: "green" }}>{item.status}</Text>
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.keyFont}>Payment Status: </Text>
                    <Text style={styles.valueFont}>{item.payment_status}</Text>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bodyContainer: {
    flex: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    width: '90%',
    height: '60%',
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 10,
  },
  textContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  keyFont: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  valueFont: {
    fontSize: 20,
  }
});

export default IndividualNotificationTab;
