import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import {TextInput, Button, Subheading, Headline} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

const LoginRider = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
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
            console.log('login as rider');
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
