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
import {UserContext} from '../../../provider/UserProvider';

const Account = () => {
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
        <TouchableOpacity
          style={styles.optionContainer}
          onPress={() => showTerms()}>
          <Icon name="book" size={30} color="#272f56" style={{flex: 0.2}} />
          <Paragraph style={{flex: 0.7, color: '#272f56'}}>
            Terms and Conditions
          </Paragraph>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionContainer}
          onPress={() => {
            navigation.navigate('Login');
          }}>
          <Icon name="logout" size={30} color="#272f56" style={{flex: 0.2}} />
          <Paragraph style={{flex: 0.7, color: '#272f56'}}>Logout</Paragraph>
        </TouchableOpacity>
      </View>
      <Modal
        visible={termsAndCondition}
        onDismiss={hideTerms}
        contentContainerStyle={styles.containerStyle}>
        <View style={{flex: 1}}>
          <ScrollView>
            <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
              PALABA PH PRIVACY POLICY
            </Text>
            <Text style={{textAlign: 'justify'}}>
              This outlines our practices for collecting, using, and disclosing
              Personal Information we receive from users. Kindly read this
              guideline thoroughly. The collection and use of your Personal
              Information are only for the purpose of providing and improving
              the application. By using the application, you consent to the
              collection and use of the information you give in accordance with
              this policy.
            </Text>
            <Text
              style={{textAlign: 'center', fontWeight: 'bold', marginTop: 10}}>
              SECURITY
            </Text>
            <Text style={{textAlign: 'justify'}}>
              We place a high value on the security of your Personal
              Information, but please keep in mind that no method of
              transmission over the Internet, or system of electronic storage,
              is guaranteed to be completely secure. While we make every effort
              to secure your Personal Information via the use of commercially
              reasonable safeguards, we cannot guarantee its ultimate security.
            </Text>
            <Text
              style={{textAlign: 'center', fontWeight: 'bold', marginTop: 10}}>
              PALABA PH TERMS OF USAGE
            </Text>
            <Text style={{textAlign: 'justify'}}>
              Before using our application, please take the time to carefully
              read the following terms and conditions. Acceptance and compliance
              with these terms are required for access to and use of all the
              services included within the application. All users, from laundry
              shop owners in addition to their riders and not to mention the
              customer who use the application provided service features are
              subject to these terms. You agree to be bound by these said terms
              by accessing or using our application. You may not access these
              aforementioned services if you disagree with any element or
              aspects of these terms.
            </Text>
            <Text
              style={{textAlign: 'center', fontWeight: 'bold', marginTop: 10}}>
              CUSTOMER PAYMENT USER AGREEMENT
            </Text>
            <Text style={{textAlign: 'justify'}}>
              Upon agreement of prior terms of the application, it is adamant
              information that we provide the customer end users of a possible
              account blocking and deletion when they make runaway from payment
              settlements through the online payment feature of the system. All
              customers shall comply to this strict rule to avoid their accounts
              for being terminated. Moreover, this is to aid laundry shops from
              false users or customers who won’t follow through with their
              payment selection.
            </Text>
          </ScrollView>
        </View>
      </Modal>
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

  containerStyle: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    padding: 30,
  },
});

export default Account;
