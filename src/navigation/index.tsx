import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
// import { MainLayout } from '../screens';

import CustomDrawer from './CustomDrawer';
import OnBoarding from '../screens/OnBoarding/OnBoarding';
import SignUp from '../screens/Authentication/SignUp';
import SignIn from '../screens/Authentication/SignIn';
import ForgotPassword from '../screens/Authentication/ForgotPassword';
import OTP from '../screens/Authentication/Otp';
import FoodDetail from '../screens/Food/FoodDetail';
import MyCart from '../screens/Cart/MyCart';
import MyCard from '../screens/Card/MyCard';
import AddCard from '../screens/Card/AddCard';
import Checkout from '../screens/Cart/Checkout';
import Success from '../screens/Cart/Success';
import DeliveryStatus from '../screens/Delivery/DeliveryStatus';
import Map from '../screens/Delivery/Map';

export type MainParamType = {
  // MainLayout: undefined;
  Home: undefined;
  // Search: undefined;
  // CartTab: undefined;
  // Favourite: undefined;
  // Notification: undefined;
  SignUp: undefined;
  SignIn: undefined;
  Onboarding: undefined;
  ForgotPassword: undefined;
  OTP: undefined;
  FoodDetail: undefined;
  MyCart: undefined;
  MyCard: undefined;
  AddCard: {
    selectedCard: {
      name: string;
      id: number;
      icon: string;
      card_no: string;
    };
  };
  Checkout: {
    selectedCard: {
      name: string;
      id: number;
      icon: string;
      card_no: string;
    };
  };
  Success: undefined;
  DeliveryStatus: undefined;
  Map: undefined;
};

const MainStack = createStackNavigator<MainParamType>();

const Navigation = () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="MyCard">
        <MainStack.Screen name="Home" component={CustomDrawer} />
        <MainStack.Screen name="Onboarding" component={OnBoarding} />
        <MainStack.Screen name="SignUp" component={SignUp} />
        <MainStack.Screen name="SignIn" component={SignIn} />
        <MainStack.Screen name="ForgotPassword" component={ForgotPassword} />
        <MainStack.Screen name="OTP" component={OTP} />
        <MainStack.Screen name="FoodDetail" component={FoodDetail} />
        <MainStack.Screen name="MyCart" component={MyCart} />
        <MainStack.Screen name="MyCard" component={MyCard} />
        <MainStack.Screen name="AddCard" component={AddCard} />
        <MainStack.Screen name="Checkout" component={Checkout} />
        <MainStack.Screen
          name="Success"
          component={Success}
          options={{ gestureEnabled: false }}
        />
        <MainStack.Screen
          name="DeliveryStatus"
          component={DeliveryStatus}
          options={{ gestureEnabled: false }}
        />
        <MainStack.Screen name="Map" component={Map} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
