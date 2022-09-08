import axios from 'axios';
import { weekdays } from 'moment';
import React, {useState, useEffect, useContext} from 'react';
import {View, Text, StyleSheet, ScrollView, Dimensions} from 'react-native';
import {LineChart, PieChart} from 'react-native-chart-kit';
import {Card, Title, Paragraph} from 'react-native-paper';
import {UserContext} from '../../provider/UserProvider';

const Statistics = () => {
  const screenWidth = Dimensions.get('screen').width;
  const user = useContext(UserContext);

  //Card Datas
  const [totalSales, setTotalSales] = useState(0);
  const [machineCycles, setMachineCycles] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);

  //Pie Chart data
  const [mobileRevenues, setMobileRevenues] = useState(0);
  const [storeRevenues, setStoreRevenues] = useState(0);

  //line graph data
  const [weekDays, setWeekDays] = useState([])
  const [totalPriceDay, setTotalPriceDay] = useState([])
  const withoutDuplicateDays = [...new Set(weekDays)]

  const lineData = {
    labels: weekDays,
    datasets: [
      {
        data: (totalPriceDay.length == 0 ? [0] : totalPriceDay),
        color: (opacity = 1) => `rgba(77, 77, 77, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ['Earnings'], // optional
  };
  const data = [
    {
      name: 'Mobile',
      population: mobileRevenues,
      color: '#4E73DF',
      legendFontColor: '#4E73DF',
      legendFontSize: 15,
    },
    {
      name: 'Store',
      population: storeRevenues,
      color: '#CA0B00',
      legendFontColor: '#CA0B00',
      legendFontSize: 15,
    },
  ];
  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };
  const lineChartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#fff',
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  useEffect(() => {
    const formdata = new FormData();
    formdata.append('laundry_id', user.laundryId);
    axios
      .post('https://palabaph.com/api/getstatistics', formdata)
      .then(response => {
        setTotalSales(response.data.total_sales);
        setMachineCycles(response.data.machine_cycles);
        setCustomerCount(response.data.orders_count);
        setMobileRevenues(response.data.weekly_mobile);
        setStoreRevenues(response.data.weekly_store);
        console.log(response.data.weekly_total)
        response.data.weekly_total.map((item, id) => {
            setWeekDays(oldArray => [...oldArray, item.dayname])
            console.log(weekDays)
            console.log(totalPriceDay.length)
            setTotalPriceDay(oldArray => [...oldArray, parseInt(item.count)])
        }) 
      });
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Statistics Module</Text>
      </View>
      <View style={styles.bodyContainer}>
        <ScrollView style={{width: '95%'}}>
          <View style={{width: '100%', alignItems: 'center'}}>
            <Card style={styles.card1}>
              <Card.Title title="Today's Sales" />
              <Card.Content>
                {totalSales != 0 ? (
                  <Title>P{totalSales}</Title>
                ) : (
                  <Title>P0</Title>
                )}
              </Card.Content>
            </Card>
            <Card style={styles.card2}>
              <Card.Title title="Today's Machine Cycles" />
              <Card.Content>
                {machineCycles != 0 ? (
                  <Title>{machineCycles}</Title>
                ) : (
                  <Title>0</Title>
                )}
              </Card.Content>
            </Card>
            <Card style={styles.card3}>
              <Card.Title title="Today's Customer Count" />
              <Card.Content>
                {customerCount != 0 ? (
                  <Title>{customerCount}</Title>
                ) : (
                  <Title>0</Title>
                )}
              </Card.Content>
            </Card>
          </View>
          <View style={{borderWidth: 1, borderColor: '#c0c0c0'}}>
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: '#c0c0c0',
                paddingHorizontal: 10,
                paddingVertical: 15,
                backgroundColor: '#F7F7F7',
              }}>
              <Title style={{color: '#007BFF'}}>Weekly Revenue Sources</Title>
            </View>
            {mobileRevenues != 0 || storeRevenues != 0 ? (
                <PieChart
                  data={data}
                  width={screenWidth}
                  height={250}
                  chartConfig={chartConfig}
                  accessor={'population'}
                  backgroundColor={'transparent'}
                  paddingLeft={'15'}
                  center={[0, 0]}
                  absolute={false}
                />
            ) : (
                <PieChart
                  data={data}
                  width={screenWidth}
                  height={250}
                  chartConfig={chartConfig}
                  accessor={'population'}
                  backgroundColor={'transparent'}
                  paddingLeft={'15'}
                  center={[0, 0]}
                  absolute={false}
                />
            )}
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#c0c0c0',
              marginVertical: 10,
            }}>
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: '#c0c0c0',
                paddingHorizontal: 10,
                paddingVertical: 15,
                backgroundColor: '#F7F7F7',
              }}>
              <Title style={{color: '#007BFF'}}>Weekly Earnings Review</Title>
            </View>
            <LineChart
              data={lineData}
              width={screenWidth}
              height={220}
              chartConfig={lineChartConfig}
            />
          </View>
        </ScrollView>
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
    flex: 0.15,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  title: {
    color: '#272f56',
    fontSize: 30,
    fontWeight: 'bold',
  },
  bodyContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  card1: {
    width: '100%',
    borderLeftWidth: 2,
    borderStartColor: '#1CC88A',
    borderBottomWidth: 1,
    borderEndWidth: 1,
    borderTopWidth: 1,
    borderBottomColor: '#e0e0e0',
    borderEndColor: '#e0e0e0',
    borderTopColor: '#e0e0e0',
    marginBottom: 10,
  },
  card2: {
    width: '100%',
    borderLeftWidth: 2,
    borderStartColor: '#36B9CC',
    borderBottomWidth: 1,
    borderEndWidth: 1,
    borderTopWidth: 1,
    borderBottomColor: '#e0e0e0',
    borderEndColor: '#e0e0e0',
    borderTopColor: '#e0e0e0',
    marginBottom: 10,
  },
  card3: {
    width: '100%',
    borderLeftWidth: 2,
    borderStartColor: '#F6C23E',
    borderBottomWidth: 1,
    borderEndWidth: 1,
    borderTopWidth: 1,
    borderBottomColor: '#e0e0e0',
    borderEndColor: '#e0e0e0',
    borderTopColor: '#e0e0e0',
    marginBottom: 10,
  },
});

export default Statistics;
