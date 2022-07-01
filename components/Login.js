import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {TextInput, Button, Subheading} from 'react-native-paper';
import {useNavigation, CommonActions} from '@react-navigation/native';
import axios from 'axios';
import {UserContext} from '../provider/UserProvider';

const Login = () => {
  const navigation = useNavigation();
  const user = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const submit = () => {
    if (email == '' || pass == '') {
      Alert.alert(
        'Invalid Input!',
        'Please make sure all input fields are filled!',
      );
    } else {
      setLoading(true);
      const formdata = new FormData();
      formdata.append('email', email);
      formdata.append('password', pass);
      axios
        .post('https://palabaph.com/api/logincustomer', formdata)
        .then(response => {
          if (response.data.response === true) {
            setLoading(false);
            console.log(response.data);
            user.id = response.data.data[0].customer_id;
            user.fname = response.data.data[0].first_name;
            user.mname = response.data.data[0].middle_name;
            user.lname = response.data.data[0].last_name;
            user.cnum = response.data.data[0].contact_no;
            user.region = response.data.data[0].region;
            user.province = response.data.data[0].state;
            user.city = response.data.data[0].city;
            user.barangay = response.data.data[0].barangay;
            user.street = response.data.data[0].street;
            user.email = response.data.data[0].email;
            user.pass = response.data.data[0].pass;
            navigation.navigate('HomeStack');
          } else {
            setLoading(false);
            console.log(response.data);
            Alert.alert('Credentials error!', 'Incorrect email or password!');
          }
        })
        .catch(e => {
          setLoading(false);
          console.log(e);
        });
    }
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
            submit();
          }}>
          <Text style={{color: '#FFF'}}>Login</Text>
        </Button>
        <TouchableOpacity onPress={() => navigation.push('Register')}>
          <Subheading style={{color: '#FFF'}}>
            Don't have an account yet?{' '}
            <Subheading
              style={{
                color: '#fff',
                fontWeight: 'bold',
                textDecorationLine: 'underline',
              }}>
              Register Now!
            </Subheading>
          </Subheading>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.push('LoginOwner')}>
          <Subheading style={{color: '#FFF'}}>
            Laundry Owner?{' '}
            <Subheading
              style={{
                color: '#fff',
                fontWeight: 'bold',
                textDecorationLine: 'underline',
              }}>
              Login Here
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

export default Login;
