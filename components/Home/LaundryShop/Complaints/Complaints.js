import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Button, Caption, Headline, FAB, Modal} from 'react-native-paper';
import {useRoute, useNavigation} from '@react-navigation/native';
import {UserContext} from '../../../../provider/UserProvider';
import axios from 'axios';

const Complaints = () => {
  const user = useContext(UserContext);
  const navigation = useNavigation();
  const route = useRoute();
  const [complaints, setComplaints] = useState([]);
  const [complaintsStatus, setComplaintsStatus] = useState(false);
  const [complaintsModal, setComplaintsModal] = useState(false);
  const showComplaintsModal = () => setComplaintsModal(true);
  const hideComplaintsModal = () => setComplaintsModal(false);
  useEffect(() => {
    const formdata = new FormData();
    formdata.append('user_id', user.id);
    formdata.append('laundry_id', route.params.laundryId);
    axios
      .post('https://palabaph.com/api/getcustomercomplaints', formdata)
      .then(response => {
        setComplaints(response.data);
        if (complaints.length == 0) {
          setComplaintsStatus(false);
        } else {
          setComplaintsStatus(true);
        }
      });
  }, [complaints]);
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
          color="#272f56"
          mode="text"
          onPress={() => navigation.goBack()}
        />
      </View>
      {/* COMPLAINTS MODAL */}
      <Modal
        visible={complaintsModal}
        onDismiss={hideComplaintsModal}
        contentContainerStyle={styles.modalContainer}>
        <Text>Example Modal. Click outside this area to dismiss.</Text>
      </Modal>
      <View style={styles.headerContainer}>
        <Headline style={{fontSize: 32, fontWeight: 'bold', color: '#272f56'}}>
          Have a complaint?
        </Headline>
        <Caption
          style={{fontSize: 16, paddingHorizontal: 18, textAlign: 'center'}}>
          Send us the complaint and we'll see through it immediately!
        </Caption>
      </View>
      <View style={styles.bodyContainer}>
        <ScrollView>
          {complaintsStatus ? (
            <View>
              {complaints.map((item, id) => {
                return (
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      width: '100%',
                      borderBottomWidth: 1,
                      paddingVertical: 10,
                    }}
                    key={id}
                    onPress={() => {
                      navigation.navigate('IndividualComplaints', {
                        complaintId: item.id,
                      });
                    }}>
                    <View
                      style={{
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        width: '85%',
                      }}>
                      <Image
                        source={require('../../../../assets/AccountDetails1.png')}
                        style={{height: 75, width: 75}}
                      />
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text>{item.comment}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : (
            <View>
              <Text>Nothing to show here</Text>
            </View>
          )}
        </ScrollView>
      </View>
      <FAB
        style={styles.fabGroupStyle}
        icon="plus"
        onPress={() =>
          navigation.navigate('AddComplaints', {
            laundryId: route.params.laundryId,
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  bodyContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  fabGroupStyle: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#272f56',
  },

  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 20,
  },
});

export default Complaints;
