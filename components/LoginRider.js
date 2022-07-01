import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {TextInput, Button, Subheading, Headline} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {UserContext} from '../provider/UserProvider';
import axios from 'axios';

const LoginRider = () => {
  const navigation = useNavigation();
  const user = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const login = () => {
    const formdata = new FormData();
    formdata.append('email', email);
    formdata.append('password', pass);
    axios
      .post('https://palabaph.com/api/riderlogin', formdata)
      .then(response => {
        if (response.data.response != true) {
          Alert.alert('Error!', 'Email/Password is incorrect!');
        } else {
          Alert.alert('Success', 'Logged in!');
          console.log(response.data.data.laundry_id);
          user.id = response.data.data.id;
          user.laundryId = response.data.data.laundry_id;
          user.fname = response.data.data.first_name;
          user.mname = response.data.data.middle_name;
          user.lname = response.data.data.last_name;
          user.cnum = response.data.data.contact_no;
          user.email = response.data.data.email;
          navigation.navigate('RiderStack');
        }
      })
      .catch(e => {
        console.log(e);
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
      <View style={styles.headerContainer}>
        <Image
          source={require('../assets/Login1.png')}
          style={{height: '50%', width: '75%'}}
        />
      </View>
      <View style={styles.bodyContainer}>
        <Headline style={{color: '#fff'}}>Laundry Rider Login</Headline>
        <TextInput
          mode="flat"
          style={styles.input}
          label="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          mode="flat"
          style={styles.input}
          label="Password"
          secureTextEntry
          value={pass}
          onChangeText={setPass}
        />
        <Button
          style={styles.button}
          mode="contained"
          color="#6E85F5"
          onPress={() => {
            login();
          }}>
          <Text style={{color: '#FFF'}}>Login</Text>
        </Button>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Subheading style={{color: '#FFF'}}>
            Login as Customer{' '}
            <Subheading
              style={{
                color: '#fff',
                fontWeight: 'bold',
                textDecorationLine: 'underline',
              }}>
              Click Here!
            </Subheading>
          </Subheading>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#272f56',
  },
  headerContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bodyContainer: {
    flex: 0.7,
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

export default LoginRider;
