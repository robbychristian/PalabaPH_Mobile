import React, {useEffect, useContext, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {
  Card,
  Headline,
  Subheading,
  Paragraph,
  Button,
} from 'react-native-paper';
import {UserContext} from '../../../provider/UserProvider';
import axios from 'axios';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';

const RiderOrders = () => {
  const user = useContext(UserContext);
  const navigation = useNavigation();
  const [pendingOrders, setPendingOrders] = useState([]);
  useEffect(() => {
    const formdata = new FormData();
    formdata.append('laundry_id', user.laundryId);
    axios
      .post('http://10.0.2.2:8000/api/getlaundryorders', formdata)
      .then(response => {
        console.log(response.data);
        setPendingOrders(response.data);
      });
    const interval = setInterval(() => {
      axios
        .post('http://10.0.2.2:8000/api/getlaundryorders', formdata)
        .then(response => {
          console.log(response.data);
          setPendingOrders(response.data);
        });
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const acceptOrder = id => {
    navigation.navigate('IndividualOrder', {
      orderId: id,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={{flexDirection: 'row'}}>
          <Headline style={{fontWeight: 'bold', color: '#fff'}}>
            Welcome,{' '}
          </Headline>
          <Headline style={{color: '#fff'}}>{user.fname}</Headline>
        </View>
        <Subheading style={{color: '#fff'}}>
          Choose an order to accept issued by customers
        </Subheading>
      </View>
      {/* BODY CONTAINER */}
      <View style={styles.bodyContainer}>
        <ScrollView style={{width: '100%'}}>
          {pendingOrders.length == 0 ? (
            <View style={{alignItems: 'center', paddingVertical: 10}}>
              <Card elevation={5} mode="elevated" style={{width: '90%'}}>
                <Card.Title title="No orders are placed yet!" />
              </Card>
            </View>
          ) : (
            <View style={{alignItems: 'center', paddingVertical: 10}} key={id}>
              {pendingOrders.map((item, id) => {
                return (
                  <Card elevation={5} mode="elevated" style={{width: '90%'}}>
                    <Card.Title
                      title={item.first_name + ' ' + item.last_name}
                    />
                    <Card.Content>
                      <Paragraph>Price: P{item.total_price}</Paragraph>
                      <Paragraph>
                        Segregation: {item.segregation_type}
                      </Paragraph>
                      <Paragraph>
                        Mode of Payment: {item.mode_of_payment}
                      </Paragraph>
                      <Paragraph>
                        Date Issued:{' '}
                        {moment(item.created_at).format('LL | hh:mmA')}
                      </Paragraph>
                    </Card.Content>
                    <Card.Actions>
                      <View style={{alignItems: 'flex-end', width: '100%'}}>
                        <Button
                          mode="contained"
                          onPress={() => acceptOrder(item.id)}>
                          View
                        </Button>
                      </View>
                    </Card.Actions>
                  </Card>
                );
              })}
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
    backgroundColor: '#FFF',
  },
  headerContainer: {
    flex: 0.2,
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#272f56',
  },
  bodyContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default RiderOrders;
