import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import {Surface, Headline, Caption} from 'react-native-paper';
import axios from 'axios';
import moment from 'moment';

const IndividualComplaints = () => {
  const route = useRoute();
  const [data, setData] = useState([]);
  const [replyStatus, setReplyStatus] = useState(false);
  useEffect(() => {
    const formdata = new FormData();
    formdata.append('id', route.params.complaintId);
    axios
      .post('https://palabaph.com/api/getindividualcomplaint', formdata)
      .then(response => {
        console.log(response.data);
        setData(response.data);
        if (data[0].reply == '') {
          setReplyStatus(false);
        } else {
          setReplyStatus(true);
        }
      });
  }, [data]);
  return (
    <View style={styles.container}>
      {data.map((item, id) => {
        return (
          <Surface style={styles.surface} key={id}>
            <Image
              source={require('../../../../assets/AccountDetails1.png')}
              style={{height: 125, width: '100%', flex: 0.5}}
            />
            <View style={{flex: 0.5, width: '100%'}}>
              <View
                style={{
                  width: '100%',
                  paddingHorizontal: 15,
                  paddingVertical: 5,
                }}>
                <Headline style={{fontWeight: 'bold', color: '#272f56'}}>
                  Comment
                </Headline>
                <Caption style={{fontSize: 15}}>{item.comment}</Caption>
              </View>
              <View
                style={{
                  width: '100%',
                  paddingHorizontal: 15,
                  paddingVertical: 5,
                }}>
                <Headline style={{fontWeight: 'bold', color: '#272f56'}}>
                  Status
                </Headline>
                {item.status == 'Pending' ? (
                  <Caption style={{fontSize: 15, color: '#FACC15'}}>
                    Pending
                  </Caption>
                ) : (
                  <Caption style={{fontSize: 15, color: 'green'}}>
                    Resolved
                  </Caption>
                )}
              </View>
              {replyStatus == true ? (
                <View
                  style={{
                    width: '100%',
                    paddingHorizontal: 15,
                    paddingVertical: 5,
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
                    paddingVertical: 5,
                  }}>
                  <Headline style={{fontWeight: 'bold', color: '#272f56'}}>
                    Reply
                  </Headline>
                  <Caption style={{fontSize: 15}}>No replies yet!</Caption>
                </View>
              )}
            </View>
            <Text>
              Date Created: {moment(item.created_at).format('LL | hh:mmA')}
            </Text>
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
    height: '65%',
    width: '80%',
    alignItems: 'center',
    elevation: 12,
  },
});

export default IndividualComplaints;
