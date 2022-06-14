import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  Caption,
  Headline,
  Subheading,
  Modal,
  FAB,
  Badge,
} from 'react-native-paper';
import moment from 'moment';
import axios from 'axios';

const ItemComponent = props => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
      }}>
      <Subheading>{props.name}</Subheading>
      <Subheading>P{props.price}</Subheading>
    </View>
  );
};

const IndividualLaundryShop = () => {
  const route = useRoute();
  const navigation = useNavigation();

  //FETCHING DATA
  const [laundryData, setLaundryData] = useState([]);
  const [mainService, setMainService] = useState([]);
  const [additionalProducts, setAdditionalProducts] = useState([]);
  const [additionalServices, setAdditionalServices] = useState([]);
  const [machines, setMachines] = useState([]);

  //Modal
  const [itemNumber, setItemNumber] = useState(0);
  const [visible, setVisible] = useState(false);
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [cartArray, setCartArray] = useState([]);

  // for (let i = 0; i < itemNumber; i++) {
  //   cartArray.push(<ItemComponent key={i} name={itemName} price={itemPrice} />);
  // }

  useEffect(() => {
    axios
      .get(
        'http://10.0.2.2:8000/api/getindividuallaundry/' +
          route.params.laundryId,
      )
      .then(response => {
        setLaundryData(response.data);
      });

    axios
      .get('http://10.0.2.2:8000/api/getmainservices/' + route.params.laundryId)
      .then(response => {
        setMainService(response.data);
      });
    axios
      .get(
        'http://10.0.2.2:8000/api/getadditionalproducts/' +
          route.params.laundryId,
      )
      .then(response => {
        setAdditionalProducts(response.data);
      });
    axios
      .get(
        'http://10.0.2.2:8000/api/getadditionalservices/' +
          route.params.laundryId,
      )
      .then(response => {
        setAdditionalServices(response.data);
      });

    axios
      .get('http://10.0.2.2:8000/api/getallmachines/' + route.params.laundryId)
      .then(response => {
        console.log(response.data);
        setMachines(response.data);
      });

    console.log(cartArray);
  }, [itemNumber]);

  // ============================FUNCTIONS============================ //

  const addToCart = (id, name, price, weight) => {
    setItemNumber(count => count + 1);
    setItemName(name);
    setItemPrice(price);
    cartArray.push(
      <ItemComponent key={id} name={name} price={price} weight={weight} />,
    );
  };

  const submitCart = () => {
    navigation.navigate('CartSubmission', {
      allItems: cartArray,
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {laundryData.map((item, id) => {
          return (
            <View style={styles.headerContainer}>
              <Image
                source={require('../../../assets/Laundry1.jpg')}
                style={{height: 200, width: '100%'}}
              />
              <View style={{paddingHorizontal: 30, paddingVertical: 20}}>
                <Headline style={{fontWeight: '700', fontSize: 30}}>
                  {item.name}
                </Headline>
                <Caption style={{fontSize: 12}}>
                  {item.street}, Barangay {item.barangay.substring(9)},{' '}
                  {item.city.substring(6)}
                </Caption>
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}>
                  <Caption style={{fontSize: 14, color: '#000'}}>
                    {item.type_of_laundry}
                  </Caption>
                  <Caption style={{fontSize: 14, color: '#000'}}>
                    {moment(item.opening_time).format('hh:MMA')} -{' '}
                    {moment(item.closing_time).format('hh:MMA')}
                  </Caption>
                </View>
              </View>
            </View>
          );
        })}
        {/* ======================= MAIN SERVICE START ======================= */}
        <View style={styles.servicesContainer}>
          <Headline style={{fontWeight: '700', fontSize: 25}}>
            Main Services
          </Headline>
          {mainService.map((item, id) => {
            return (
              <View
                style={{
                  paddingVertical: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'column'}}>
                  <Subheading style={{fontSize: 20}}>
                    {item.main_serv_name}
                  </Subheading>
                  <Caption>
                    P{item.main_serv_price} - {item.main_serv_max_kg}KG
                  </Caption>
                </View>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() =>
                    addToCart(
                      id,
                      item.main_serv_name,
                      item.main_serv_price,
                      item.main_serv_max_kg,
                    )
                  }>
                  <Subheading style={{color: '#fff'}}>Add</Subheading>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
        {/* ======================= MAIN SERVICE END ======================= */}

        {/* ======================= ADDITIONAL SERVICES START ======================= */}
        <View style={styles.servicesContainer}>
          <Headline style={{fontWeight: '700', fontSize: 25}}>
            Additional Services
          </Headline>
          {additionalServices.map((item, id) => {
            return (
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{paddingVertical: 10, flexDirection: 'row'}}>
                  <Image
                    source={require('../../../assets/AccountDetails1.png')}
                    style={{height: 75, width: 75}}
                  />
                  <View
                    style={{flexDirection: 'column', paddingHorizontal: 15}}>
                    <Subheading style={{fontSize: 20}}>
                      {item.add_serv_name}
                    </Subheading>
                    <Caption>P{item.add_serv_price}</Caption>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.servicesButton}
                  onPress={() =>
                    addToCart(
                      id,
                      item.add_serv_name,
                      item.add_serv_price,
                      item.add_serv_max_kg,
                    )
                  }>
                  <Subheading style={{color: '#fff'}}>Add</Subheading>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
        {/* ======================= ADDITIONAL SERVICE END ======================= */}

        {/* ======================= ADDITIONAL SERVICES START ======================= */}
        <View style={styles.servicesContainer}>
          <Headline style={{fontWeight: '700', fontSize: 25}}>
            Additional Products
          </Headline>
          {additionalProducts.map((item, id) => {
            return (
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{paddingVertical: 10, flexDirection: 'row'}}>
                  <Image
                    source={require('../../../assets/AccountDetails1.png')}
                    style={{height: 75, width: 75}}
                  />
                  <View
                    style={{flexDirection: 'column', paddingHorizontal: 15}}>
                    <Subheading style={{fontSize: 20}}>
                      {item.add_prod_name}
                    </Subheading>
                    <Caption>P{item.add_prod_price}</Caption>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.servicesButton}
                  onPress={() =>
                    addToCart(id, item.add_prod_name, item.add_prod_price)
                  }>
                  <Subheading style={{color: '#fff'}}>Add</Subheading>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
        {/* ======================= ADDITIONAL SERVICE END ======================= */}
        {/* ======================= MACHINE AVAILABILITY START ======================= */}

        <View style={styles.servicesContainer}>
          <Headline style={{fontWeight: '700', fontSize: 25}}>
            Machines
          </Headline>
          {machines.map((item, id) => {
            return (
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'column'}}>
                  <Subheading>{item.machine_name}</Subheading>
                  <Caption>{item.machine_service}</Caption>
                </View>
                {item.status ? (
                  <Badge
                    style={{
                      backgroundColor: '#66ff66',
                      width: '30%',
                      height: '45%',
                      alignSelf: 'center',
                    }}>
                    <Caption>Not Available</Caption>
                  </Badge>
                ) : (
                  <Badge
                    style={{
                      backgroundColor: '#66ff66',
                      width: '30%',
                      height: '45%',
                      alignSelf: 'center',
                    }}>
                    <Caption>Available</Caption>
                  </Badge>
                )}
              </View>
            );
          })}
        </View>

        {/* ======================= MACHINE AVAILABILITY END ======================= */}
      </ScrollView>

      {/* MODAL */}
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.modalView}>
        <Headline style={{fontWeight: '700', padding: 20}}>Your Cart</Headline>
        {cartArray.length === 0 ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 20,
              paddingHorizontal: 20,
            }}>
            <Subheading>No items have been added.</Subheading>
          </View>
        ) : (
          <View>{cartArray}</View>
        )}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 20,
            paddingHorizontal: 20,
          }}>
          <TouchableOpacity
            onPress={() => {
              setItemNumber(0);
              cartArray.splice(0, cartArray.length);
              hideModal();
            }}>
            <Subheading style={{fontWeight: '700'}}>Clear</Subheading>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              submitCart();
            }}>
            <Subheading style={{fontWeight: '700'}}>Submit</Subheading>
          </TouchableOpacity>
        </View>
      </Modal>
      <FAB
        style={styles.fab}
        color="#fff"
        icon="cart"
        onPress={() => showModal()}
      />
      {cartArray.length === 0 ? null : (
        <Badge
          size={20}
          style={{position: 'absolute', margin: 30, right: -10, bottom: 20}}>
          {cartArray.length}
        </Badge>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  headerContainer: {
    flex: 0.3,
    justifyContent: 'center',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 10,
  },
  servicesContainer: {
    flex: 0.3,
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  bodyContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#272f56',
    width: '20%',
    borderRadius: 10,
  },
  servicesButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#272f56',
    width: '20%',
    borderRadius: 10,
    height: '60%',
    alignSelf: 'center',
  },

  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#272f56',
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default IndividualLaundryShop;
