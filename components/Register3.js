import React from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const Register3 = () => {
  const navigation = useNavigation();
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
        />
        <TextInput
          mode="flat"
          label="Password"
          style={styles.input}
          outlineColor="#808080"
          activeOutlineColor="#808080"
          secureTextEntry
        />
        <TextInput
          mode="flat"
          label="Confirm Password"
          style={styles.input}
          outlineColor="#808080"
          activeOutlineColor="#808080"
          secureTextEntry
        />
        <Button
          style={styles.button}
          mode="contained"
          color="#6E85F5"
          onPress={() => {
            Alert.alert(
              'Registered Successfully',
              'Your account has now been registered!',
            );
            navigation.navigate('Login');
          }}>
          <Text style={{color: '#FFF'}}>Continue</Text>
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
});

export default Register3;
