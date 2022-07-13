import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {RegisterContext} from '../provider/RegisterProvider';
import axios from 'axios';

const Register3 = () => {
  const navigation = useNavigation();
  const register = useContext(RegisterContext);

  //FORM FIELDS
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [repass, setRepass] = useState('');

  const [loading, setLoading] = useState(false);

  const submit = () => {
    setLoading(true);
    if (email == '' || pass == '' || repass == '') {
      Alert.alert(
        'Some inputs are empty!',
        'Please fill in the fields that are empty.',
      );
      setLoading(false);
    } else if (pass != repass) {
      Alert.alert(
        'Password Mismatch!',
        'Please make sure your passwords match.',
      );
      setLoading(false);
    } else {
      const formdata = new FormData();
      formdata.append('fname', register.fname);
      formdata.append('mname', register.mname);
      formdata.append('lname', register.lname);
      formdata.append('cnum', register.cnum);
      formdata.append('region', register.region);
      formdata.append('province', register.province);
      formdata.append('city', register.city);
      formdata.append('barangay', register.barangay);
      formdata.append('street', register.street);
      formdata.append('email', email);
      formdata.append('pass', pass);
      formdata.append('customer', true);
      axios
        .post('https://palabaph.com/api/registercustomer', formdata)
        .then(response => {
          setLoading(false);
          Alert.alert('Success!', 'You have now registered your account!');
          console.log(response.data);
          navigation.navigate('Login');
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
          Add your <Text style={{color: '#B9C3F7'}}>Credentials</Text>
        </Text>
        <Text style={styles.description}>
          By adding your email and password, you will be
        </Text>
        <Text style={styles.description}>able to login to your account</Text>
      </View>
      <View style={styles.bodyContainer}>
        <TextInput
          mode="flat"
          label="Email"
          style={styles.input}
          outlineColor="#808080"
          activeOutlineColor="#808080"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          mode="flat"
          label="Password"
          style={styles.input}
          outlineColor="#808080"
          activeOutlineColor="#808080"
          secureTextEntry
          value={pass}
          onChangeText={setPass}
        />
        <TextInput
          mode="flat"
          label="Confirm Password"
          style={styles.input}
          outlineColor="#808080"
          activeOutlineColor="#808080"
          secureTextEntry
          value={repass}
          onChangeText={setRepass}
        />
        <Button
          style={styles.button}
          mode="contained"
          color="#6E85F5"
          onPress={() => {
            submit();
            // navigation.navigate('Login');
          }}>
          <Text style={{color: '#FFF'}}>Submit</Text>
        </Button>
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
    fontSize: 14,
  },

  bodyContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
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

export default Register3;
