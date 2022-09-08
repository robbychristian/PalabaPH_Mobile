import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider as PaperProvider} from 'react-native-paper';
import {LogBox} from 'react-native';

//REGISTER PROVIDER
import {RegisterContext, RegisterProvider} from './provider/RegisterProvider';
import {UserContext, UserProvider} from './provider/UserProvider';

import Login from './components/Login';
import LoginOwner from './components/LoginOwner';
import LoginRider from './components/LoginRider';
import Register from './components/Register';
import Register2 from './components/Register2';
import Register3 from './components/Register3';

//CUSTOMER STACK
import Home from './components/Home/Home';
import AccountDetails from './components/Home/Account/AccountDetails';
import IndividualLaundryShop from './components/Home/LaundryShop/IndividualLaundryShop';
import CartSubmission from './components/Home/LaundryShop/CartSubmission';
import Complaints from './components/Home/LaundryShop/Complaints/Complaints';
import AddComplaints from './components/Home/LaundryShop/Complaints/AddComplaints';
import IndividualComplaints from './components/Home/LaundryShop/Complaints/IndividualComplaints';
import Feedbacks from './components/Home/LaundryShop/Feedback/Feedbacks';
import IndividualFeedbacks from './components/Home/LaundryShop/Feedback/IndividualFeedbacks';
import NotificationTab from './components/Home/Account/Notification/NotificationTab';

//RIDER STACK
import HomeRider from './components/Riders/HomeRider';
import IndividualOrder from './components/Riders/Orders/IndividualOrder';
import AddFeedback from './components/Home/LaundryShop/Feedback/AddFeedback';

//OWNER STACK
import HomeOwner from './components/Owner/HomeOwner';
import IndividualNotificationTab from './components/Home/Account/Notification/IndividualNotificationTab';

const WelcomeStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const RiderStack = createNativeStackNavigator();
const OwnerStack = createNativeStackNavigator();

LogBox.ignoreAllLogs();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="AccountDetails" component={AccountDetails} />
      <HomeStack.Screen
        name="IndividualLaundry"
        component={IndividualLaundryShop}
      />
      <HomeStack.Screen name="CartSubmission" component={CartSubmission} />
      <HomeStack.Screen name="Complaints" component={Complaints} />
      <HomeStack.Screen name="AddComplaints" component={AddComplaints} />
      <HomeStack.Screen
        name="IndividualComplaints"
        component={IndividualComplaints}
      />
      <HomeStack.Screen name="Feedbacks" component={Feedbacks} />
      <HomeStack.Screen name="AddFeedback" component={AddFeedback} />
      <HomeStack.Screen
        name="IndividualFeedbacks"
        component={IndividualFeedbacks}
      />
      <HomeStack.Screen name="NotificationTab" component={NotificationTab} />
      <HomeStack.Screen name="IndividualNotificationTab" component={IndividualNotificationTab} />
    </HomeStack.Navigator>
  );
};

const RiderStackScreen = () => {
  return (
    <RiderStack.Navigator screenOptions={{headerShown: false}}>
      <RiderStack.Screen name="HomeRider" component={HomeRider} />
      <RiderStack.Screen name="IndividualOrder" component={IndividualOrder} />
    </RiderStack.Navigator>
  );
};

const OwnerStackScreen = () => {
  return (
    <OwnerStack.Navigator screenOptions={{ headerShown: false }}>
      <OwnerStack.Screen name="HomeOwner" component={HomeOwner} />
    </OwnerStack.Navigator>
  )
}
const WelcomeStackScreen = () => {
  return (
    <RegisterProvider>
      <WelcomeStack.Navigator screenOptions={{headerShown: false}}>
        <WelcomeStack.Screen name="Login" component={Login} />
        <WelcomeStack.Screen name="LoginOwner" component={LoginOwner} />
        <WelcomeStack.Screen name="LoginRider" component={LoginRider} />
        <WelcomeStack.Screen name="Register" component={Register} />
        <WelcomeStack.Screen name="Register2" component={Register2} />
        <WelcomeStack.Screen name="Register3" component={Register3} />
        <WelcomeStack.Screen name="HomeStack" component={HomeStackScreen} />
        <WelcomeStack.Screen name="RiderStack" component={RiderStackScreen} />
        <WelcomeStack.Screen name="OwnerStack" component={OwnerStackScreen} />
      </WelcomeStack.Navigator>
    </RegisterProvider>
  );
};

const App = () => {
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs(); //Ignore all log notifications
  return (
    <PaperProvider>
      <UserProvider>
        <NavigationContainer>
          <WelcomeStackScreen />
        </NavigationContainer>
      </UserProvider>
    </PaperProvider>
  );
};

export default App;
