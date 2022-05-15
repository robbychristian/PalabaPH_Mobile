import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Title} from 'react-native-paper';
const LaundryShop = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}></View>
      <View style={styles.bodyContainer}>
        <ScrollView style={{width: '100%'}}>
          <TouchableOpacity style={styles.cardContainer}>
            <Image
              source={require('../../../assets/Laundry1.jpg')}
              style={{height: 350, width: 350, borderRadius: 30}}
            />
            <View style={{width: 350}}>
              <Text style={{fontWeight: 'bold', fontSize: 18, color: '#000'}}>
                Laundryhan Name
              </Text>
              <Text style={{fontWeight: '300', fontSize: 16}}>
                6:00AM - 9:00PM
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cardContainer}>
            <Image
              source={require('../../../assets/Laundry1.jpg')}
              style={{height: 350, width: 350, borderRadius: 30}}
            />
            <View style={{width: 350}}>
              <Text style={{fontWeight: 'bold', fontSize: 18, color: '#000'}}>
                Laundryhan Name
              </Text>
              <Text style={{fontWeight: '300', fontSize: 16}}>
                6:00AM - 9:00PM
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
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
    flex: 0.2,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  bodyContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  cardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
  },
});

export default LaundryShop;
