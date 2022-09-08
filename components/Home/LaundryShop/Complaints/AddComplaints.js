import React, {useState, useContext, useRef} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {Button, Headline, Caption, TextInput} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';
import {launchImageLibrary} from 'react-native-image-picker';
import {UserContext} from '../../../../provider/UserProvider';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';

const AddComplaints = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const user = useContext(UserContext);
  //form
  const [imageUri, setImageUri] = useState('');
  const [imageName, setImageName] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const categoryRef = useRef();
  const openCategory = () => {
    categoryRef.current.focus();
  };
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
    formdata.append('category', category);
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
        // console.log(response.data)
      })
      .catch(e => {
        Alert.alert(
          'Error!',
          'There were some errors in sending the complaints! Please try again later.'
        )
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
          style={styles.pickerContainer}
          onPress={() => {
            openCategory();
          }}>
          <TextInput
            mode="outlined"
            label="Category"
            style={styles.input}
            editable={false}
            value={category}
            outlineColor="#808080"
            activeOutlineColor="#808080"
            onChangeText={setCategory}
          />
        </TouchableOpacity>
        <Picker
          ref={categoryRef}
          style={{opacity: 0, height: 0, display: 'none'}}
          mode="dialog"
          selectedValue={category}
          onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}>
          <Picker.Item label="Back Job" value="Back Job" />
          <Picker.Item label="Missing Items" value="Missing Items" />
          <Picker.Item label="Improper Handling" value="Improper Handling" />
        </Picker>

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
  pickerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    width: '100%',
  },
});

export default AddComplaints;
