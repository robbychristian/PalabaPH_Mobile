import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Title, ToggleButton} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import moment from 'moment';
const LaundryShop = () => {
  const navigation = useNavigation();
  const [laundryShops, setLaundryShops] = useState([]);
  const [walkIn, setWalkIn] = useState('checked');
  const [dropOff, setDropOff] = useState('checked');
  const [pickup, setPickup] = useState('checked');
  const [reservation, setReservation] = useState('checked');
  const onWalkInToggle = value => {
    setWalkIn(walkIn === 'checked' ? 'unchecked' : 'checked');
  };
  const onDropOffToggle = value => {
    setDropOff(dropOff === 'checked' ? 'unchecked' : 'checked');
  };
  const onPickupToggle = value => {
    setPickup(pickup === 'checked' ? 'unchecked' : 'checked');
  };
  const onReservationToggle = value => {
    setReservation(reservation === 'checked' ? 'unchecked' : 'checked');
  };
  useEffect(() => {
    axios.get('http://10.0.2.2:8000/api/getlaundries').then(response => {
      setLaundryShops(response.data.data);
      console.log(response.data.data);
    });
  }, [walkIn, dropOff, pickup, reservation]);

  const individualLaundry = id => {
    navigation.navigate('IndividualLaundry', {
      laundryId: id,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View
          style={{
            width: '85%',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            marginHorizontal: 30,
          }}>
          <Text style={styles.title}>Laundries Nearby</Text>
        </View>
        <View
          style={{
            width: '100%',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <ToggleButton
              icon="walk"
              value="walkIn"
              size={25}
              status={walkIn}
              onPress={onWalkInToggle}
            />
            <Text>Walk Ins</Text>
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <ToggleButton
              icon="package-down"
              value="dropoff"
              size={25}
              status={dropOff}
              onPress={onDropOffToggle}
            />
            <Text>Drop Off</Text>
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <ToggleButton
              icon="car-pickup"
              value="pickup"
              size={25}
              status={pickup}
              onPress={onPickupToggle}
            />
            <Text>Pick Up</Text>
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <ToggleButton
              icon="calendar-check-outline"
              value="reservation"
              size={25}
              status={reservation}
              onPress={onReservationToggle}
            />
            <Text>Reservation</Text>
          </View>
        </View>
      </View>
      {/* ========================BODY========================== */}
      <View style={styles.bodyContainer}>
        <ScrollView style={{width: '100%'}}>
          {laundryShops.map((item, id) => {
            if (
              (walkIn == 'checked' && item.self_service == true) ||
              (dropOff == 'checked' && item.full_service) ||
              (pickup == 'checked' && item.pick_up) ||
              (reservation == 'checked' && item.reservations)
            ) {
              return (
                <TouchableOpacity
                  key={id}
                  style={styles.cardContainer}
                  onPress={() => {
                    individualLaundry(item.id);
                  }}>
                  <Image
                    source={require('../../../assets/Laundry1.jpg')}
                    style={{height: 350, width: 350, borderRadius: 30}}
                  />
                  <View style={{width: 350}}>
                    <Text
                      style={{fontWeight: 'bold', fontSize: 18, color: '#000'}}>
                      {item.name}
                    </Text>
                    <Text style={{fontWeight: '300', fontSize: 16}}>
                      {item.type_of_laundry}
                    </Text>
                    <Text style={{fontWeight: '300', fontSize: 16}}>
                      {moment(item.opening_time).format('h:mmA') +
                        ' - ' +
                        moment(item.closing_time).format('h:mmA')}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            } else {
              return (
                <TouchableOpacity style={styles.cardContainer}>
                  <Image
                    source={require('../../../assets/Laundry1.jpg')}
                    style={{height: 350, width: 350, borderRadius: 30}}
                  />
                  <View style={{width: 350}}>
                    <Text
                      style={{fontWeight: 'bold', fontSize: 18, color: '#000'}}>
                      Laundryhan Name
                    </Text>
                    <Text style={{fontWeight: '300', fontSize: 16}}>
                      6:00AM - 9:00PM
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }
          })}
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
    flex: 0.3,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  title: {
    color: '#272f56',
    fontSize: 30,
    fontWeight: 'bold',
  },
  bodyContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  cardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
  },
});

export default LaundryShop;
