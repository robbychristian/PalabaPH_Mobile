import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {Title, Subheading, TextInput, Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {RegisterContext} from '../provider/RegisterProvider';

const Register = () => {
  const navigation = useNavigation();

  //FOR USE CONTEXT REGISTER
  const register = useContext(RegisterContext);

  //FORM FIELDS
  const [fname, setFname] = useState('');
  const [mname, setMname] = useState('');
  const [lname, setLname] = useState('');
  const [cnum, setCnum] = useState('');

  const submit = () => {
    if (fname == '' || mname == '' || lname == '' || cnum == '') {
      Alert.alert(
        'Some inputs are empty!',
        'Please fill in the fields that are empty.',
      );
    } else {
      register.fname = fname;
      register.mname = mname;
      register.lname = lname;
      register.cnum = cnum;
      navigation.push('Register2');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
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
          Join <Text style={{color: '#B9C3F7'}}>PalabaPH</Text> Today!
        </Text>
        <Text style={styles.description}>
          Complete your details and make sure
        </Text>
        <Text style={styles.description}>to provide correct information</Text>
      </View>
      <View style={styles.bodyContainer}>
        <TextInput
          mode="flat"
          style={styles.input}
          value={fname}
          onChangeText={setFname}
          label="First name"
        />
        <TextInput
          mode="flat"
          style={styles.input}
          value={mname}
          onChangeText={setMname}
          label="Middle name"
        />
        <TextInput
          mode="flat"
          style={styles.input}
          value={lname}
          onChangeText={setLname}
          label="Last name"
        />
        <TextInput
          mode="flat"
          style={styles.input}
          value={cnum}
          onChangeText={setCnum}
          label="Phone"
        />
        <Button
          style={styles.button}
          mode="contained"
          color="#6E85F5"
          onPress={() => {
            submit();
          }}>
          <Text style={{color: '#FFF'}}>Continue</Text>
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#272f56',
  },
  headerContainer: {
    flex: 0.4,
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
    marginBottom: 80,
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
});

export default Register;
