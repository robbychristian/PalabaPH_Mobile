import React, {useEffect, useContext, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, Headline, Caption, TextInput} from 'react-native-paper';
import {useRoute, useNavigation} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import {UserContext} from '../../../../provider/UserProvider';
import axios from 'axios';
import {Rating, AirbnbRating} from 'react-native-ratings';

const AddFeedback = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const user = useContext(UserContext);

  //form
  const [rating, setRating] = useState('');
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const laundryId = route.params.laundryId;
  const userId = user.id;
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
        setImageName(response.assets[0].fileName);
        setImageUri(response.assets[0].uri);
      }
    });
  };

  const submit = () => {
    if (title == '' || comment == '' || rating == 0) {
      Alert.alert('Error!', 'Please make sure all the fields are filled!');
    } else {
      const formdata = new FormData();
      formdata.append('laundry_id', route.params.laundryId);
      formdata.append('user_id', user.id);
      formdata.append('rating', rating);
      formdata.append('comment', comment);
      axios
        .post('https://palabaph.com/api/addfeedback', formdata)
        .then(response => {
          navigation.navigate('Feedback');
        })
        .catch(e => {
          console.log(e);
        });
    }
  };
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
      <View style={styles.headerContainer}>
        <Headline style={{fontSize: 32, fontWeight: 'bold', color: '#272f56'}}>
          Send a Feedback!
        </Headline>
        <Caption
          style={{fontSize: 16, paddingHorizontal: 18, textAlign: 'center'}}>
          Your support will come a long way to help us grow!
        </Caption>
      </View>
      <View style={styles.bodyContainer}>
        <AirbnbRating
          count={5}
          reviews={['Terrible', 'Bad', 'Okay', 'Good', 'Excellent']}
          defaultRating={5}
          size={30}
          selectedColor="#272f56"
          reviewColor="#272f56"
          onFinishRating={setRating}
        />
        <TextInput
          mode="outlined"
          style={styles.input}
          label="Title"
          outlineColor="#272f56"
          activeOutlineColor="#272f56"
          onChangeText={setTitle}
          value={title}
        />
        <TextInput
          mode="outlined"
          style={styles.input}
          label="Comment"
          outlineColor="#272f56"
          activeOutlineColor="#272f56"
          multiline={true}
          numberOfLines={5}
          onChangeText={setComment}
          value={comment}
        />
        <Button
          mode="outlined"
          color="#fff"
          style={styles.button}
          onPress={() => submit()}>
          Submit
        </Button>
      </View>
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

  input: {
    backgroundColor: '#fff',
    width: '75%',
    marginVertical: 10,
    justifyContent: 'center',
  },
  button: {
    marginVertical: 25,
    width: '50%',
    backgroundColor: '#272f56',
    color: '#fff',
  },
});

export default AddFeedback;
