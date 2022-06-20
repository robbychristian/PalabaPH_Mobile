import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {Subheading, Button, RadioButton} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';
import {UserContext} from '../../../provider/UserProvider';
import axios from 'axios';

const CartSubmission = () => {
  const route = useRoute();
  const user = useContext(UserContext);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const allItems = route.params.allItems;
  const itemNames = route.params.itemNames;
  const itemPrices = route.params.itemPrices;
  const laundryId = route.params.laundryId;
  const totalPrice = route.params.totalPrice;

  //Service RadioButton
  const [serviceChecked, setServiceChecked] = useState('Pick-up');
  //Segregation RadioButton
  const [segregation, setSegregation] = useState('Whites');

  //MODAL PAYMENT
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    console.log(itemNames);
    console.log(itemPrices);
    console.log(totalPrice);
  }, []);

  const submitPickUp = () => {
    setLoading(true);
    const orderForm = new FormData();
    orderForm.append('laundry_id', laundryId);
    orderForm.append('user_id', user.id);
    orderForm.append('first_name', user.fname);
    orderForm.append('middle_name', user.mname);
    orderForm.append('last_name', user.lname);
    orderForm.append('total_price', totalPrice);
    orderForm.append('mode_of_payment', 'cashless');
    orderForm.append('commodity_type', serviceChecked);
    orderForm.append('segregation_type', segregation);
    orderForm.append('status', 'Pending');
    axios
      .post('http://10.0.2.2:8000/api/ordermobile', orderForm)
      .then(response => {
        console.log(response.data);
        const itemData = [];
        for (let i = 0; i <= itemNames.length - 1; i++) {
          itemData[i] = new FormData();
          itemData[i].append('order_id', response.data);
          itemData[i].append('item_name', itemNames[i]);
          itemData[i].append('item_price', itemPrices[i]);
          axios
            .post('http://10.0.2.2:8000/api/ordereditems', itemData[i])
            .then(response => {
              console.log(response.data);
              setLoading(false);
            })
            .catch(e => {
              console.log(e);
              setLoading(false);
            });
        }
      })
      .catch(e => {
        console.log(e);
        setLoading(false);
      });
  };
  return (
    <View style={styles.container}>
      <Modal transparent={true} visible={loading}>
        <View style={styles.modalBackground}>
          <View style={styles.activityIndicatorWrapper}>
            <ActivityIndicator animating={loading} color="blue" />
          </View>
        </View>
      </Modal>
      <Modal
        transparent={true}
        visible={showQR}
        animationType="fade"
        onRequestClose={() => setShowQR(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalQrWrapper}>
            <View style={{width: '100%', alignItems: 'flex-end'}}>
              <Button icon="close" onPress={() => setShowQR(false)} />
            </View>
            <Image
              source={require('../../../assets/Gcash_QR.jpg')}
              style={{height: '80%', width: '90%'}}
            />
            <Button style={{width: '80%', marginVertical: 10}} mode="contained">
              Submit
            </Button>
          </View>
        </View>
      </Modal>
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
        <View>
          <Subheading>Commodity Type</Subheading>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <RadioButton
              value="Pick-up"
              status={serviceChecked === 'Pick-up' ? 'checked' : 'unchecked'}
              onPress={() => setServiceChecked('Pick-up')}
            />
            <Subheading>Pick-up and Delivery</Subheading>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <RadioButton
              value="Reservation"
              status={
                serviceChecked === 'Reservation' ? 'checked' : 'unchecked'
              }
              onPress={() => setServiceChecked('Reservation')}
            />
            <Subheading>Reservation</Subheading>
          </View>
        </View>
        <View>
          <Subheading>Segregation</Subheading>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <RadioButton
              value="Whites"
              status={segregation === 'Whites' ? 'checked' : 'unchecked'}
              onPress={() => setSegregation('Whites')}
            />
            <Subheading>Whites</Subheading>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <RadioButton
              value="Delicates"
              status={segregation === 'Delicates' ? 'checked' : 'unchecked'}
              onPress={() => setSegregation('Delicates')}
            />
            <Subheading>Delicates</Subheading>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <RadioButton
              value="Colors"
              status={segregation === 'Colors' ? 'checked' : 'unchecked'}
              onPress={() => setSegregation('Colors')}
            />
            <Subheading>Colors</Subheading>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <RadioButton
              value="Mixed"
              status={segregation === 'Mixed' ? 'checked' : 'unchecked'}
              onPress={() => setSegregation('Mixed')}
            />
            <Subheading>Mixed</Subheading>
          </View>
        </View>
        {serviceChecked === 'Pick-up' ? (
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
        {serviceChecked === 'Pick-up' ? (
          <TouchableOpacity
            style={{
              width: '90%',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              backgroundColor: '#272f56',
            }}
            onPress={() => submitPickUp()}>
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

  modalQrWrapper: {
    backgroundColor: '#FFFFFF',
    height: '70%',
    width: '90%',
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 50,
    width: 50,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default CartSubmission;
