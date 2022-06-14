import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Subheading, Button, RadioButton} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';
import {UserContext} from '../../../provider/UserProvider';

const CartSubmission = () => {
  const route = useRoute();
  const user = useContext(UserContext);
  const navigation = useNavigation();
  const allItems = route.params.allItems;

  //Service RadioButton
  const [serviceChecked, setServiceChecked] = useState('first');

  useEffect(() => {
    console.log(allItems[0]);
  }, []);
  return (
    <View style={styles.container}>
      <View
        style={{width: '100%', backgroundColor: '#272f56', marginBottom: 20}}>
        <View style={{width: '10%'}}>
          <Button
            icon="arrow-left"
            labelStyle={{
              fontSize: 25,
              fontWeight: 'bold',
              flex: 1,
            }}
            color="#fff"
            mode="text"
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
      <View style={styles.headerContainer}>
        <ScrollView>
          <View
            style={{
              alignItems: 'center',
              width: '100%',
            }}>
            <Subheading style={{fontSize: 25, fontWeight: '700'}}>
              All items
            </Subheading>
          </View>
          <View style={{justifyContent: 'center'}}>{allItems}</View>
        </ScrollView>
      </View>

      {/* BODY CONTAINER */}
      {/* BODY CONTAINER */}
      {/* BODY CONTAINER */}

      <View style={styles.bodyContainer}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <RadioButton
            value="first"
            status={serviceChecked === 'first' ? 'checked' : 'unchecked'}
            onPress={() => setServiceChecked('first')}
          />
          <Subheading>Pick-up and Delivery</Subheading>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <RadioButton
            value="second"
            status={serviceChecked === 'second' ? 'checked' : 'unchecked'}
            onPress={() => setServiceChecked('second')}
          />
          <Subheading>Reservation</Subheading>
        </View>
        {serviceChecked === 'first' ? (
          <View
            style={{paddingVertical: 10, flexDirection: 'row', width: '60%'}}>
            <Subheading style={{fontWeight: 'bold'}}>
              Pick Up Location:
            </Subheading>
            <Subheading>
              {' '}
              {user.street}, {user.barangay.substring(9)},{' '}
              {user.city.substring(6)}, {user.province.substring(4)}
            </Subheading>
          </View>
        ) : (
          <View>
            <Subheading>Reservation Content</Subheading>
          </View>
        )}
      </View>
      <View
        style={{
          height: '5%',
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 10,
        }}>
        {serviceChecked === 'first' ? (
          <TouchableOpacity
            style={{
              width: '90%',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              backgroundColor: '#272f56',
            }}>
            <Subheading style={{color: '#fff'}}>Confirm Pick Up</Subheading>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              width: '90%',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              backgroundColor: '#272f56',
            }}>
            <Subheading style={{color: '#fff'}}>Reserve</Subheading>
          </TouchableOpacity>
        )}
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
    flex: 0.3,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 10,
  },
  bodyContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default CartSubmission;
