import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider as PaperProvider} from 'react-native-paper';

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

//RIDER STACK
import HomeRider from './components/Riders/HomeRider';
import IndividualOrder from './components/Riders/Orders/IndividualOrder';

const WelcomeStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const RiderStack = createNativeStackNavigator();

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
      </WelcomeStack.Navigator>
    </RegisterProvider>
  );
};

const App = () => {
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
