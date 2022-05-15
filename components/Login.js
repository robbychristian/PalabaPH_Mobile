import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {TextInput, Button, Subheading} from 'react-native-paper';
import {useNavigation, CommonActions} from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={require('../assets/Login1.png')}
          style={{height: '50%', width: '75%'}}
        />
      </View>
      <View style={styles.bodyContainer}>
        <TextInput mode="flat" style={styles.input} label="Email" />
        <TextInput
          mode="flat"
          style={styles.input}
          label="Password"
          secureTextEntry
        />
        <Button
          style={styles.button}
          mode="contained"
          color="#6E85F5"
          onPress={() => {
            navigation.push('HomeStack');
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
});

export default Login;
