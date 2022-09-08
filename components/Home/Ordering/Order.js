import React, {useEffect, useContext, useState, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  Alert,
  StyleSheet,
  PermissionsAndroid,
  Image,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';
import {UserContext} from '../../../provider/UserProvider';
import {DataTable, Headline, Modal, Caption, Button} from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';
import moment from 'moment';

const optionsPerPage = [5, 10];

const requestPhotosPermission = () => {
  try {
    const granted = PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'Permission to access Gallery',
        message: 'Allow PalabaPH to access gallery for photo submissions.',
        buttonPositive: 'OK',
        buttonNegative: 'No',
      },
    );
  } catch (e) {
    console.log(e);
  }
};

const Order = () => {
  // FOR MODAL
  const [modalVisible, setModalVisible] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [laundryId, setLaundryId] = useState('');
  const [gcashUri, setGcashUri] = useState('');
  const show = (id, laundryId) => {
    setModalVisible(true);
    setOrderId(id);
    const formdata = new FormData();
    formdata.append('laundry_id', laundryId);
    axios
      .post('https://palabaph.com/api/getqrcode', formdata)
      .then(response => {
        setGcashUri(response.data.laundryQr);
        setLaundryId(response.data.laundryId);
      });
  };

  const cancelStatus = () => {
    setImageStatus(false);
  };

  const hide = () => {
    setModalVisible(false);
    setGcashUri('');
    setLaundryId('');
  };
  const [imageStatus, setImageStatus] = useState(false);
  const [imageUri, setImageUri] = useState('');
  const [imageName, setImageName] = useState('');
  //FOR DataTable
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
  const [orders, setOrders] = useState([]);

  const user = useContext(UserContext);

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }
  const uploadPhoto = () => {
    const options = {
      storageOptions: {
        saveToPhotos: true,
        mediaType: 'photo',
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled uploading Valid ID');
      } else if (response.error) {
        console.log('error uploading: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        console.log(response.assets[0]);
        setImageUri(response.assets[0].uri);
        setImageName(response.assets[0].fileName);
        setImageStatus(true);
      }
    });
  };

  useEffect(() => {
    requestUserPermission();
    requestPhotosPermission();
    messaging()
      .getToken()
      .then(token => {
        const formdata = new FormData();
        formdata.append('id', user.id);
        formdata.append('token', token);

        axios
          .post('https://palabaph.com/api/updatetoken', formdata)
          .then(response => {
            console.log(response.data);
          });
      });
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    axios
      .get('https://palabaph.com/api/showcustomerorder/' + user.id)
      .then(response => {
        setOrders(response.data);
        console.log(response.data);
      });
      
    const interval = setInterval(() => {
      axios
      .get('https://palabaph.com/api/showcustomerorder/' + user.id)
      .then(response => {
        setOrders(response.data);
        console.log(response.data);
      });
    }, 2500)

    setPage(0);

    return () => {
      unsubscribe
      clearInterval(interval)
    };
  }, [gcashUri]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     axios
  //     .get('https://palabaph.com/api/showcustomerorder/' + user.id)
  //     .then(response => {
  //       setOrders(response.data);
  //       console.log(response.data);
  //     });
  //   }, 2500)
  //   return () => clearInterval(interval)
  // }, [])

  const submitPayment = () => {
    let file = {
      uri: imageUri,
      type: 'multipart/form-data',
      name: imageName,
    };
    const formdata = new FormData();
    formdata.append('mobile_order_id', orderId);
    formdata.append('user_id', user.id);
    formdata.append('imageFile', file);
    formdata.append('status', 'paid');
    axios
      .post('https://palabaph.com/api/updatepaymentstatus', formdata)
      .then(response => {
        Alert.alert(
          'Image Uploaded!',
          'The cashless receipt has been uploaded!',
        );
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Headline style={{fontWeight: '700', fontSize: 30, color: '#fff'}}>
          Your Orders
        </Headline>
      </View>
      <View style={styles.bodyContainer}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Date</DataTable.Title>
            <DataTable.Title>Commodity</DataTable.Title>
            <DataTable.Title>Price</DataTable.Title>
            <DataTable.Title>Status</DataTable.Title>
          </DataTable.Header>
          {orders.map((items, id) => {
            if (items.payment_status == 'Paid') {
              return (
                <DataTable.Row key={id}>
                  <DataTable.Cell>
                    {moment(items.created_at).format('hh:mmA')}
                  </DataTable.Cell>
                  <DataTable.Cell>{items.commodity_type}</DataTable.Cell>
                  <DataTable.Cell>{items.total_price}</DataTable.Cell>
                  <DataTable.Cell>{items.payment_status}</DataTable.Cell>
                </DataTable.Row>
              );
            } /*else if (items.payment_status == 'Accepted') {
              return (
              <DataTable.Row key={id}>
                <DataTable.Cell>
                  {moment(items.created_at).format('hh:mmA')}
                </DataTable.Cell>
                <DataTable.Cell>{items.commodity_type}</DataTable.Cell>
                <DataTable.Cell>{items.total_price}</DataTable.Cell>
                <DataTable.Cell>{items.status}</DataTable.Cell>
              </DataTable.Row>
              );
            } */ else {
              return (
                <View>
                  <TouchableOpacity
                    onPress={() => show(items.id, items.laundry_id)}>
                    <DataTable.Row key={id}>
                      <DataTable.Cell>
                        {moment(items.created_at).format('hh:mmA')}
                      </DataTable.Cell>
                      <DataTable.Cell>{items.commodity_type}</DataTable.Cell>
                      <DataTable.Cell>{items.total_price}</DataTable.Cell>
                      <DataTable.Cell>Upload here</DataTable.Cell>
                    </DataTable.Row>
                  </TouchableOpacity>
                </View>
              );
            }
          })}
        </DataTable>
        {imageStatus ? (
          <Modal
            visible={modalVisible}
            onDismiss={() => hide()}
            contentContainerStyle={{
              backgroundColor: '#fff',
              width: '80%',
              paddingVertical: 30,
              paddingHorizontal: 20,
              alignSelf: 'center',
              height: '80%',
            }}>
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => uploadPhoto()}>
              <Image
                source={{uri: imageUri}}
                style={{
                  height: '100%',
                  width: '100%',
                  marginTop: 20,
                }}></Image>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Button onPress={() => submitPayment()}>
                  <Caption style={{color: '#000'}}>Submit</Caption>
                </Button>
                <Button onPress={() => cancelStatus()}>
                  <Caption style={{color: 'red'}}>Cancel</Caption>
                </Button>
              </View>
            </TouchableOpacity>
          </Modal>
        ) : (
          <Modal
            visible={modalVisible}
            onDismiss={() => hide()}
            contentContainerStyle={{
              backgroundColor: '#fff',
              width: '80%',
              padding: 30,
              alignSelf: 'center',
              height: '80%',
            }}>
            <TouchableOpacity
              onPress={() => uploadPhoto()}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={{
                  uri:
                    'https://palabaph.com/PalabaPH_New_v2-main/storage/app/gcash_image/' +
                    laundryId +
                    '/' +
                    gcashUri,
                }}
                style={{
                  height: '95%',
                  width: '95%',
                  margin: 15,
                }}></Image>
            </TouchableOpacity>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Caption>Click the QR to submit the receipt</Caption>
            </View>
          </Modal>
        )}
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
    width: '100%',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#272f56',
  },
  bodyContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default Order;
