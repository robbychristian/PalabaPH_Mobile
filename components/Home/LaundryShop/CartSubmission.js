import React, {useEffect, useState, useContext, useRef} from 'react';
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {Subheading, Button, RadioButton, TextInput} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';
import {UserContext} from '../../../provider/UserProvider';
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';
import moment from 'moment';

const CartSubmission = () => {
  //FOR RESERVATIONS
  const timeSlotRef = useRef();
  const machineWash = useRef();
  const machineDry = useRef();
  const openTimeSlot = () => {
    timeSlotRef.current.focus();
  };
  const openMachineWash = () => {
    machineWash.current.focus();
  };
  const openMachineDry = () => {
    machineDry.current.focus();
  };
  const [timeSlot, setTimeSlot] = useState('');
  const [chosenMachineWash, setChosenMachineWash] = useState('');
  const [chosenMachineDry, setChosenMachineDry] = useState('');

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
  const [availableTimeSlot, setAvailableTimeSlot] = useState([]);

  // GET ALL Machines
  const [availableMachines, setAvailableMachines] = useState([]);

  // GET ALL RESERVATIONS
  const [allReservation, setAllReservation] = useState([]);
  //MODAL PAYMENT
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    const formdata = new FormData();
    formdata.append('id', laundryId);
    axios
      .post('https://palabaph.com/api/gettimeslots', formdata)
      .then(response => {
        setAvailableTimeSlot(response.data);
      });

    axios
      .get('https://palabaph.com/api/getallmachines/' + laundryId)
      .then(response => {
        setAvailableMachines(response.data);
      });
  }, []);

  const submitReservation = () => {
    const getAllReservationForm = new FormData();
    getAllReservationForm.append('laundry_id', laundryId);
    axios
      .post('https://palabaph.com/api/getallreservation', getAllReservationForm)
      .then(response => {
        setAllReservation(response.data);
      });
    if (allReservation.length != 0) {
      allReservation.map((item, id) => {
        if (
          timeSlot.substring(0, 7) == item.time_start &&
          timeSlot.substring(10, 17) == item.time_end &&
          chosenMachineWash.substring(0, 1) == item.machine_id &&
          moment().add(1, 'days').format('MM-DD-YYYY') == item.reservation_date
        ) {
          Alert.alert(
            'Error!',
            'Washing Machine reservation slot is already occupied!',
          );
        } else if (
          timeSlot.substring(0, 7) == item.time_start &&
          timeSlot.substring(10, 17) == item.time_end &&
          chosenMachineDry.substring(0, 1) == item.machine_id &&
          moment().add(1, 'days').format('MM-DD-YYYY') == item.reservation_date
        ) {
          Alert.alert(
            'Error!',
            'Drying Machine reservation slot is already occupied!',
          );
        } else {
          if (id == 1) {
            Alert.alert(
              'Success!',
              'The slot has been reserved! Please make sure you come on the given time frame!',
            );
            const washReservation = new FormData();
            washReservation.append('laundry_id', laundryId);
            washReservation.append('user_id', user.id);
            washReservation.append(
              'machine_id',
              chosenMachineWash.substring(0, 1),
            );
            washReservation.append(
              'reservation_date',
              moment().add(1, 'days').format('MM-DD-YYYY'),
            );
            washReservation.append('time_start', timeSlot.substring(0, 7));
            washReservation.append('time_end', timeSlot.substring(10, 17));
            washReservation.append('status', 'Pending');
            axios
              .post(
                'https://palabaph.com/api/createreservation',
                washReservation,
              )
              .then(response => {
                console.log(response.data);
              });

            const dryReservation = new FormData();
            dryReservation.append('laundry_id', laundryId);
            dryReservation.append('user_id', user.id);
            dryReservation.append(
              'machine_id',
              chosenMachineDry.substring(0, 1),
            );
            dryReservation.append(
              'reservation_date',
              moment().add(1, 'days').format('MM-DD-YYYY'),
            );
            dryReservation.append('time_start', timeSlot.substring(0, 7));
            dryReservation.append('time_end', timeSlot.substring(10, 17));
            dryReservation.append('status', 'Pending');
            axios
              .post(
                'https://palabaph.com/api/createreservation',
                dryReservation,
              )
              .then(response => {
                console.log(response.data);
              });
          }
        }
      });
    } else {
      Alert.alert(
        'Success!',
        'The slot has been reserved! Please make sure you come on the given time frame!',
      );
      const washReservation = new FormData();
      washReservation.append('laundry_id', laundryId);
      washReservation.append('user_id', user.id);
      washReservation.append('machine_id', chosenMachineWash.substring(0, 1));
      washReservation.append(
        'reservation_date',
        moment().add(1, 'days').format('MM-DD-YYYY'),
      );
      washReservation.append('time_start', timeSlot.substring(0, 7));
      washReservation.append('time_end', timeSlot.substring(10, 17));
      washReservation.append('status', 'Pending');
      axios
        .post('https://palabaph.com/api/createreservation', washReservation)
        .then(response => {
          console.log(response.data);
        });

      const dryReservation = new FormData();
      dryReservation.append('laundry_id', laundryId);
      dryReservation.append('user_id', user.id);
      dryReservation.append('machine_id', chosenMachineDry.substring(0, 1));
      dryReservation.append(
        'reservation_date',
        moment().add(1, 'days').format('MM-DD-YYYY'),
      );
      dryReservation.append('time_start', timeSlot.substring(0, 7));
      dryReservation.append('time_end', timeSlot.substring(10, 17));
      dryReservation.append('status', 'Pending');
      axios
        .post('https://palabaph.com/api/createreservation', dryReservation)
        .then(response => {
          navigation.navigate('Home');
        });
    }
  };

  const submitPickUp = () => {
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
      .post('https://palabaph.com/api/ordermobile', orderForm)
      .then(response => {
        console.log(response.data);
        const itemData = [];
        for (let i = 0; i <= itemNames.length - 1; i++) {
          itemData[i] = new FormData();
          itemData[i].append('order_id', response.data);
          itemData[i].append('item_name', itemNames[i]);
          itemData[i].append('item_price', itemPrices[i]);
          axios
            .post('https://palabaph.com/api/ordereditems', itemData[i])
            .then(response => {
              setLoading(false);
              Alert.alert(
                'Success!',
                'Wait for a rider to pick up your order!',
              );
              navigation.navigate('Home');
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
          <ScrollView>
            <View>
              <Subheading>Reservation Content</Subheading>
              <TouchableOpacity
                style={styles.pickerContainer}
                onPress={() => {
                  openTimeSlot();
                }}>
                <TextInput
                  mode="flat"
                  label="Time Slot"
                  style={styles.input}
                  editable={false}
                  value={timeSlot}
                  outlineColor="#808080"
                  activeOutlineColor="#808080"
                  onChangeText={setTimeSlot}
                />
              </TouchableOpacity>

              {/* WASH MACHINE OPTIONS */}
              <View>
                <Subheading>Wash Machines</Subheading>
                <TouchableOpacity
                  style={styles.pickerContainer}
                  onPress={() => {
                    openMachineWash();
                  }}>
                  <TextInput
                    mode="flat"
                    label="Machine Name"
                    style={styles.input}
                    editable={false}
                    value={chosenMachineWash.substring(1)}
                    outlineColor="#808080"
                    activeOutlineColor="#808080"
                    onChangeText={setChosenMachineWash}
                  />
                </TouchableOpacity>
              </View>

              {/* DRY MACHINE OPTIONS */}
              <View>
                <Subheading>Dry Machines</Subheading>
                <TouchableOpacity
                  style={styles.pickerContainer}
                  onPress={() => {
                    openMachineDry();
                  }}>
                  <TextInput
                    mode="flat"
                    label="Machine Name"
                    style={styles.input}
                    editable={false}
                    value={chosenMachineDry.substring(1)}
                    outlineColor="#808080"
                    activeOutlineColor="#808080"
                    onChangeText={setChosenMachineDry}
                  />
                </TouchableOpacity>
              </View>

              {/* HIDDEN PICKER REFERENCE */}
              <Picker
                ref={timeSlotRef}
                style={{opacity: 0, height: 0, display: 'none'}}
                mode="dialog"
                selectedValue={timeSlot}
                onValueChange={(itemValue, itemIndex) =>
                  setTimeSlot(itemValue)
                }>
                {availableTimeSlot.map((item, id) => {
                  return (
                    <Picker.Item
                      key={id}
                      label={item.time_start + ' - ' + item.time_end}
                      value={item.time_start + ' - ' + item.time_end}
                    />
                  );
                })}
              </Picker>
              <Picker
                ref={machineWash}
                style={{opacity: 0, height: 0, display: 'none'}}
                mode="dialog"
                selectedValue={chosenMachineWash}
                onValueChange={(itemValue, itemIndex) =>
                  setChosenMachineWash(itemValue)
                }>
                {availableMachines.map((item, id) => {
                  if (item.machine_service == 'Wash') {
                    return (
                      <Picker.Item
                        key={id}
                        label={item.machine_name}
                        value={item.id + item.machine_name}
                      />
                    );
                  }
                })}
              </Picker>
              <Picker
                ref={machineDry}
                style={{opacity: 0, height: 0, display: 'none'}}
                mode="dialog"
                selectedValue={chosenMachineDry}
                onValueChange={(itemValue, itemIndex) =>
                  setChosenMachineDry(itemValue)
                }>
                {availableMachines.map((item, id) => {
                  if (item.machine_service == 'Dry') {
                    return (
                      <Picker.Item
                        key={id}
                        label={item.machine_name}
                        value={item.id + item.machine_name}
                      />
                    );
                  }
                })}
              </Picker>
            </View>
          </ScrollView>
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
            onPress={() => {
              submitReservation();
            }}
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
  pickerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    width: '100%',
    backgroundColor: '#fff',
  },
  input: {
    backgroundColor: '#fff',
    width: '90%',
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
