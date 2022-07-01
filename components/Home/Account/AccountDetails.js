import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {UserContext} from '../../../provider/UserProvider';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

const AccountDetails = () => {
  const user = useContext(UserContext);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  // EDIT PERSONAL INFO FORM
  const [fname, setFname] = useState(user.fname);
  const [mname, setMname] = useState(user.mname);
  const [lname, setLname] = useState(user.lname);
  const [cnum, setCnum] = useState(user.cnum);

  // EDIT CREDENTIALS
  const [pass, setPass] = useState('');
  const [cpass, setCpass] = useState('');

  useEffect(() => {
    console.log(user.id);
  }, []);

  const submit = () => {
    if (pass === '' || cpass === '') {
      Alert.alert('Error!', 'Password Fields should not be empty!');
    } else if (pass != cpass) {
      Alert.alert('Error!', 'Passwords does not match!');
    } else {
      setLoading(true);
      const formdata = new FormData();
      formdata.append('email', user.email);
      formdata.append('first_name', fname);
      formdata.append('middle_name', mname);
      formdata.append('last_name', lname);
      formdata.append('contact_no', cnum);
      formdata.append('pass', pass);
      axios
        .post('https://palabaph.com/api/editcustomerprofile', formdata)
        .then(response => {
          setLoading(false);
          console.log(response.data);
          user.fname = response.data.first_name;
          user.mname = response.data.middle_name;
          user.lname = response.data.last_name;
          user.cnum = response.data.contact_no;
          user.pass = response.data.pass;
          Alert.alert('Success!', 'Your account has been updated!');
        })
        .catch(e => {
          setLoading(false);
          Alert.alert('An error has occurred!');
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
      <ScrollView>
        <View style={{width: '10%'}}>
          <Button
            icon="arrow-left"
            labelStyle={{
              fontSize: 25,
              fontWeight: 'bold',
              flex: 1,
            }}
            color="#000"
            mode="text"
            onPress={() => navigation.goBack()}
          />
        </View>
        {/*============================== EDIT PERSONAL INFO HEADER CONTAINER ==============================*/}
        {/*============================== EDIT PERSONAL INFO HEADER CONTAINER ==============================*/}
        {/*============================== EDIT PERSONAL INFO HEADER CONTAINER ==============================*/}
        <View style={styles.headerContainer}>
          <View
            style={{
              width: '85%',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}>
            <Text style={styles.title}>Edit personal info</Text>
          </View>
        </View>
        {/*============================== EDIT PERSONAL INFO BODY CONTAINER ==============================*/}
        {/*============================== EDIT PERSONAL INFO BODY CONTAINER ==============================*/}
        {/*============================== EDIT PERSONAL INFO BODY CONTAINER ==============================*/}
        <View style={styles.bodyContainer}>
          <TextInput
            mode="outlined"
            label="First Name"
            style={styles.input}
            outlineColor="#808080"
            value={fname}
            onChangeText={setFname}
            activeOutlineColor="#808080"
          />
          <TextInput
            mode="outlined"
            label="Middle Name"
            style={styles.input}
            outlineColor="#808080"
            value={mname}
            onChangeText={setMname}
            activeOutlineColor="#808080"
          />
          <TextInput
            mode="outlined"
            label="Last Name"
            style={styles.input}
            outlineColor="#808080"
            value={lname}
            onChangeText={setLname}
            activeOutlineColor="#808080"
          />
          <TextInput
            mode="outlined"
            label="Contact Number"
            style={styles.input}
            outlineColor="#808080"
            value={cnum}
            onChangeText={setCnum}
            activeOutlineColor="#808080"
          />
        </View>
        {/*============================== EDIT CREDENTIALS HEADER CONTAINER ==============================*/}
        {/*============================== EDIT CREDENTIALS HEADER CONTAINER ==============================*/}
        {/*============================== EDIT CREDENTIALS HEADER CONTAINER ==============================*/}
        <View style={styles.headerContainer}>
          <View
            style={{
              width: '85%',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}>
            <Text style={styles.title}>Edit credentials</Text>
          </View>
        </View>
        {/*============================== EDIT CREDENTIALS BODY CONTAINER ==============================*/}
        {/*============================== EDIT CREDENTIALS BODY CONTAINER ==============================*/}
        {/*============================== EDIT CREDENTIALS BODY CONTAINER ==============================*/}
        <View style={styles.bodyContainer}>
          <TextInput
            mode="outlined"
            label="Email"
            style={styles.input}
            outlineColor="#808080"
            value={user.email}
            activeOutlineColor="#808080"
            editable={false}
          />
          <TextInput
            mode="outlined"
            label="Password"
            style={styles.input}
            outlineColor="#808080"
            activeOutlineColor="#808080"
            value={pass}
            onChangeText={setPass}
            secureTextEntry
          />
          <TextInput
            mode="outlined"
            label="Confirm Password"
            style={styles.input}
            outlineColor="#808080"
            activeOutlineColor="#808080"
            value={cpass}
            onChangeText={setCpass}
            secureTextEntry
          />
        </View>
      </ScrollView>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: 20,
          borderTopWidth: 1,
          borderTopColor: '#d0d0d0',
        }}>
        <TouchableOpacity style={styles.button} onPress={() => submit()}>
          <Text style={{fontSize: 15, color: '#fff', fontWeight: 'bold'}}>
            Save
          </Text>
        </TouchableOpacity>
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
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#272f56',
    fontSize: 25,
    fontWeight: '500',
  },

  bodyContainer: {
    flex: 0.8,
    backgroundColor: '#fff',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#fff',
    width: '80%',
    marginVertical: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#272f56',
    width: '80%',
    borderRadius: 5,
    height: 50,
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

export default AccountDetails;
