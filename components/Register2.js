import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {Button, TextInput, Dialog, Paragraph} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';

const Register2 = () => {
  const navigation = useNavigation();

  //FORM DETAILS
  const regionRef = useRef();
  const provinceRef = useRef();
  const cityRef = useRef();
  const barangayRef = useRef();
  const [region, setRegion] = useState('');
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [barangay, setBarangay] = useState('');
  const [street, setStreet] = useState('');
  const [availableRegions, setAvailableRegions] = useState([]);
  const [availableProvince, setAvailableProvince] = useState([]);
  const [availableCity, setAvailableCity] = useState([]);
  const [availableBarangay, setAvailableBarangay] = useState([]);
  const openRegion = () => {
    regionRef.current.focus();
  };
  const openProvince = () => {
    provinceRef.current.focus();
  };
  const openCity = () => {
    cityRef.current.focus();
  };
  const openBarangay = () => {
    barangayRef.current.focus();
  };

  //OTHERS
  const [dialog, setDialog] = useState(false);
  const dismissDialog = () => setDialog(false);

  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get('https://isaacdarcilla.github.io/philippine-addresses/region.json')
        .then(response => {
          setAvailableRegions(response.data);
        });
      if (region != '') {
        axios
          .get(
            'https://isaacdarcilla.github.io/philippine-addresses/province.json',
          )
          .then(province => {
            setAvailableProvince(province.data);
          });
      }
      if (province != '') {
        axios
          .get('https://isaacdarcilla.github.io/philippine-addresses/city.json')
          .then(city => {
            setAvailableCity(city.data);
          });
      }
      if (city != '') {
        axios
          .get(
            'https://isaacdarcilla.github.io/philippine-addresses/barangay.json',
          )
          .then(brgy => {
            setAvailableBarangay(brgy.data);
          });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [region, province, city]);

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
          color="#fff"
          mode="text"
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>
          Your <Text style={{color: '#B9C3F7'}}>Address</Text>!
        </Text>
        <Text style={styles.description}>
          Adding your address will allow us to show
        </Text>
        <Text style={styles.description}>nearby laundry shops</Text>
      </View>
      <View style={styles.bodyContainer}>
        <ScrollView style={{width: '100%'}}>
          {/* TRIGGER HERE FOR REGION*/}
          <TouchableOpacity
            style={styles.pickerContainer}
            onPress={() => {
              openRegion();
            }}>
            <TextInput
              mode="flat"
              label="Region"
              style={styles.input}
              editable={false}
              value={region.substring(2, region.length)}
              outlineColor="#808080"
              activeOutlineColor="#808080"
              onChangeText={setRegion}
            />
          </TouchableOpacity>
          {/* TRIGGER HERE FOR PROVINCE*/}
          <TouchableOpacity
            style={styles.pickerContainer}
            onPress={() => {
              openProvince();
            }}>
            <TextInput
              mode="flat"
              label="Province"
              style={styles.input}
              editable={false}
              value={province.substring(4, province.length)}
              outlineColor="#808080"
              activeOutlineColor="#808080"
              onChangeText={setProvince}
            />
          </TouchableOpacity>
          {/* TRIGGER HERE FOR CITY*/}
          <TouchableOpacity
            style={styles.pickerContainer}
            onPress={() => {
              openCity();
            }}>
            <TextInput
              mode="flat"
              label="City"
              style={styles.input}
              editable={false}
              value={city.substring(6, city.length)}
              outlineColor="#808080"
              activeOutlineColor="#808080"
              onChangeText={setCity}
            />
          </TouchableOpacity>
          {/* TRIGGER HERE FOR BARANGAY*/}
          <TouchableOpacity
            style={styles.pickerContainer}
            onPress={() => {
              openBarangay();
            }}>
            <TextInput
              mode="flat"
              label="Barangay"
              style={styles.input}
              editable={false}
              value={barangay.substring(9, barangay.length)}
              outlineColor="#808080"
              activeOutlineColor="#808080"
              onChangeText={setBarangay}
            />
          </TouchableOpacity>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TextInput
              mode="flat"
              label="House No/Street"
              style={styles.input}
              value={street}
              outlineColor="#808080"
              activeOutlineColor="#808080"
              onChangeText={setStreet}
            />
          </View>
          {/* *********************** SUBMIT ************************* */}
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Button
              style={styles.button}
              mode="contained"
              color="#6E85F5"
              onPress={() => {
                navigation.push('Register3');
              }}>
              <Text style={{color: '#FFF'}}>Continue</Text>
            </Button>
          </View>
        </ScrollView>
      </View>
      {/* PICKER FOR REGION */}
      <Picker
        ref={regionRef}
        style={{opacity: 0, height: 0, display: 'none'}}
        mode="dialog"
        selectedValue={region}
        onValueChange={(itemValue, itemIndex) => setRegion(itemValue)}>
        {availableRegions.map((item, id) => {
          return (
            <Picker.Item
              key={id}
              label={item.region_name}
              value={item.region_code + item.region_name}
            />
          );
        })}
      </Picker>
      {/* PICKER FOR PROVINCE */}
      <Picker
        ref={provinceRef}
        style={{opacity: 0, height: 0, display: 'none'}}
        mode="dialog"
        selectedValue={province}
        onValueChange={(itemValue, itemIndex) => setProvince(itemValue)}>
        {availableProvince.map((item, id) => {
          if (item.region_code == region.substring(0, 2)) {
            return (
              <Picker.Item
                key={id}
                label={item.province_name}
                value={item.province_code + item.province_name}
              />
            );
          }
        })}
      </Picker>
      {/* PICKER FOR CITY */}
      <Picker
        ref={cityRef}
        style={{opacity: 0, height: 0, display: 'none'}}
        mode="dialog"
        selectedValue={city}
        onValueChange={(itemValue, itemIndex) => setCity(itemValue)}>
        {availableCity.map((item, id) => {
          if (item.province_code == province.substring(0, 4)) {
            return (
              <Picker.Item
                key={id}
                label={item.city_name}
                value={item.city_code + item.city_name}
              />
            );
          }
        })}
      </Picker>
      {/* PICKER FOR BARANGAY */}
      <Picker
        ref={barangayRef}
        style={{opacity: 0, height: 0, display: 'none'}}
        mode="dialog"
        selectedValue={barangay}
        onValueChange={(itemValue, itemIndex) => setBarangay(itemValue)}>
        {availableBarangay.map((item, id) => {
          if (item.city_code == city.substring(0, 6)) {
            return (
              <Picker.Item
                key={id}
                label={item.brgy_name}
                value={item.brgy_code + item.brgy_name}
              />
            );
          }
        })}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#272f56',
  },
  headerContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    color: '#FFF',
    fontSize: 30,
    fontWeight: 'bold',
  },
  description: {
    color: '#fff',
    fontSize: 15,
    paddingHorizontal: 50,
    textAlign: 'center',
  },

  bodyContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#fff',
    width: '75%',
    marginVertical: 10,
  },
  button: {
    marginVertical: 10,
    width: '50%',
  },

  pickerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    width: '100%',
    backgroundColor: '#272f56',
  },
});

export default Register2;
