import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useRoute, useNavigation} from '@react-navigation/native';
import {Surface, Headline, Caption} from 'react-native-paper';
import axios from 'axios';
import moment from 'moment';
import {Rating, AirbnbRating} from 'react-native-ratings';

const IndividualFeedbacks = () => {
  const route = useRoute();
  const [data, setData] = useState([]);
  const [stars, setStars] = useState(0);
  const rating = [];
  const [replyStatus, setReplyStatus] = useState(false);

  useEffect(() => {
    const formdata = new FormData();
    formdata.append('id', route.params.feedbackId);
    axios
      .post('https://palabaph.com/api/getindividualfeedback', formdata)
      .then(response => {
        console.log(response.data);
        setData(response.data);
        if (response.data[0].reply == 'none') {
          setReplyStatus(false);
          setStars(parseInt(response.data[0].rating));
        } else {
          setReplyStatus(true);
        }
      })
      .catch(e => {
        console.log(e);
      });
  }, []);
  return (
    <View style={styles.container}>
      {data.map((item, id) => {
        return (
          <Surface style={styles.surface} key={id}>
            <View>
              <AirbnbRating
                count={5}
                reviews={['Terrible', 'Bad', 'Okay', 'Good', 'Excellent']}
                defaultRating={stars}
                size={30}
                selectedColor="#272f56"
                reviewColor="#272f56"
              />
            </View>
            <View style={{flex: 0.5, width: '100%'}}>
              <View
                style={{
                  width: '100%',
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                }}>
                <Headline style={{fontWeight: 'bold', color: '#272f56'}}>
                  Comment
                </Headline>
                <Caption style={{fontSize: 15}}>{item.comment}</Caption>
              </View>
              {replyStatus == true ? (
                <View
                  style={{
                    width: '100%',
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                  }}>
                  <Headline style={{fontWeight: 'bold', color: '#272f56'}}>
                    Reply
                  </Headline>
                  <Caption style={{fontSize: 15}}>{item.reply}</Caption>
                </View>
              ) : (
                <View
                  style={{
                    width: '100%',
                    paddingHorizontal: 15,
                    paddingVertical: 10,
                  }}>
                  <Headline style={{fontWeight: 'bold', color: '#272f56'}}>
                    Reply
                  </Headline>
                  <Caption style={{fontSize: 15}}>No replies yet!</Caption>
                </View>
              )}
              <View
                style={{
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  height: '80%',
                }}>
                <Text>
                  Date Created: {moment(item.created_at).format('LL | hh:mmA')}
                </Text>
              </View>
            </View>
          </Surface>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  surface: {
    padding: 15,
    height: '50%',
    width: '80%',
    alignItems: 'center',
    elevation: 12,
  },
});

export default IndividualFeedbacks;
