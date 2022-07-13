import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Button, Headline, Caption, FAB} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';
import {UserContext} from '../../../../provider/UserProvider';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Feedbacks = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const user = useContext(UserContext);

  const [feedbacks, setFeedbacks] = useState([]);
  const [feedbackStatus, setFeedbackStatus] = useState(false);

  useEffect(() => {
    const formdata = new FormData();
    formdata.append('laundry_id', route.params.laundryId);
    formdata.append('user_id', user.id);
    axios
      .post('https://palabaph.com/api/getcustomerfeedbacks', formdata)
      .then(response => {
        setFeedbacks(response.data);
        if (feedbacks.length == 0) {
          setFeedbackStatus(false);
        } else {
          setFeedbackStatus(true);
        }
      });
  }, [feedbacks]);
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
        <Headline
          style={{
            fontSize: 32,
            fontWeight: 'bold',
            color: '#272f56',
            paddingHorizontal: 20,
            textAlign: 'center',
          }}>
          Enjoyed our service?
        </Headline>
        <Caption
          style={{fontSize: 16, paddingHorizontal: 18, textAlign: 'center'}}>
          Don't forget to leave a feedback on our service so we can improve!
        </Caption>
      </View>
      <View style={styles.bodyContainer}>
        <ScrollView>
          {feedbackStatus ? (
            <View>
              {feedbacks.map((item, id) => {
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
                    onPress={() =>
                      navigation.push('IndividualFeedbacks', {
                        feedbackId: item.id,
                      })
                    }>
                    <View
                      style={{
                        justifyContent: 'space-between',
                        width: '80%',
                        flexDirection: 'row',
                      }}>
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Icon name="star" size={30} color="#272f56" />
                        <Text>{item.rating}/5</Text>
                      </View>
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
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text>You haven't left any feedbacks yet!</Text>
            </View>
          )}
        </ScrollView>
      </View>
      <FAB
        style={styles.fabGroupStyle}
        icon="plus"
        onPress={() =>
          navigation.navigate('AddFeedback', {
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
});

export default Feedbacks;
