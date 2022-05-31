import React, {useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Title, Paragraph} from 'react-native-paper';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {UserContext} from '../../../provider/UserProvider';

const Account = () => {
  const navigation = useNavigation();
  const user = useContext(UserContext);
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
            source={require('../../../assets/AccountDetails1.png')}
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
          onPress={() => navigation.push('AccountDetails')}>
          <Icon name="account" size={30} color="#272f56" style={{flex: 0.2}} />
          <Paragraph style={{flex: 0.7, color: '#272f56'}}>
            Account Details
          </Paragraph>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionContainer}>
          <Icon name="history" size={30} color="#272f56" style={{flex: 0.2}} />
          <Paragraph style={{flex: 0.7, color: '#272f56'}}>
            Transaction History
          </Paragraph>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionContainer}>
          <Icon
            name="office-building"
            size={30}
            color="#272f56"
            style={{flex: 0.2}}
          />
          <Paragraph style={{flex: 0.7, color: '#272f56'}}>
            Current Laundry
          </Paragraph>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionContainer}>
          <Icon name="book" size={30} color="#272f56" style={{flex: 0.2}} />
          <Paragraph style={{flex: 0.7, color: '#272f56'}}>
            Terms and Conditions
          </Paragraph>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionContainer}>
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
    justifyContent: 'space-around',
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
});

export default Account;
