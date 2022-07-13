import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {Button, Headline, Caption, TextInput} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import {UserContext} from '../../../../provider/UserProvider';
import axios from 'axios';

const AddComplaints = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const user = useContext(UserContext);
  //form
  const [imageUri, setImageUri] = useState('');
  const [imageName, setImageName] = useState('');
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
    let imageFile = {
      uri: imageUri,
      type: 'multipart/form-data',
      name: imageName,
    };

    // console.log(typeof laundryId);
    // console.log(typeof userId);
    // console.log(typeof comment);
    // console.log(typeof imageName);
    const formdata = new FormData();
    formdata.append('laundry_id', laundryId);
    formdata.append('user_id', userId);
    formdata.append('comment', comment);
    formdata.append('image_file', imageFile);

    axios
      .post('https://palabaph.com/api/addcomplaints', formdata, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
      .then(response => {
        Alert.alert(
          'Complaint Sent!',
          'The complaint has been sent to the laundry shop!',
        );
        navigation.goBack();
      })
      .catch(e => {
        console.log(e);
      });
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
          Send a Complaint!
        </Headline>
        <Caption
          style={{fontSize: 16, paddingHorizontal: 18, textAlign: 'center'}}>
          We value our customers and so their reports!
        </Caption>
      </View>
      <View style={styles.bodyContainer}>
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

        <TouchableOpacity
          style={{justifyContent: 'center', width: '75%'}}
          onPress={() => uploadPhoto()}>
          <TextInput
            mode="outlined"
            style={styles.inputImage}
            label="Image"
            outlineColor="#272f56"
            activeOutlineColor="#272f56"
            value={imageName}
            disabled
          />
        </TouchableOpacity>
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
  inputImage: {
    backgroundColor: '#fff',
    width: '100%',
    marginVertical: 10,
    justifyContent: 'center',
  },

  button: {
    marginVertical: 10,
    width: '50%',
    backgroundColor: '#272f56',
    color: '#fff',
  },
});

export default AddComplaints;
