import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {Title, Paragraph, Modal} from 'react-native-paper';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import { UserContext } from '../../provider/UserProvider';

const Accounts = () => {
  const navigation = useNavigation();
  const user = useContext(UserContext);
  const [termsAndCondition, setTermsAndCondition] = useState(false);

  const showTerms = () => setTermsAndCondition(true);
  const hideTerms = () => setTermsAndCondition(false);
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={{
            width: '85%',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginVertical: 10,
          }}>
          <Image
            source={require('../../assets/AccountDetails1.png')}
            style={{height: 50, width: 50}}></Image>
        </TouchableOpacity>
        <View
          style={{
            width: '85%',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <Text style={styles.title}>Profile Settings</Text>
        </View>
      </View>
      <View style={styles.bodyContainer}>
        <TouchableOpacity
          style={styles.optionContainer}
          onPress={() => {
            navigation.navigate('Login');
          }}>
          <Icon name="logout" size={30} color="#272f56" style={{flex: 0.2}} />
          <Paragraph style={{flex: 0.7, color: '#272f56'}}>Logout</Paragraph>
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
    flex: 0.18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#272f56',
    fontSize: 30,
    fontWeight: 'bold',
  },
  bodyContainer: {
    flex: 0.8,
    backgroundColor: '#fff',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  optionContainer: {
    backgroundColor: '#f5f5f5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '15%',
    paddingHorizontal: 15,
    borderRadius: 15,
  },

  containerStyle: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    padding: 30,
  },
});

export default Accounts;
