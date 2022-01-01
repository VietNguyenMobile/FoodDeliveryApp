import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
// import { MainLayout } from '../screens';

import CustomDrawer from './CustomDrawer';
import OnBoarding from '../screens/OnBoarding/OnBoarding';
import SignUp from '../screens/Authentication/SignUp';
import SignIn from '../screens/Authentication/SignIn';

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
};

const MainStack = createStackNavigator<MainParamType>();

const Navigation = () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Onboarding">
        <MainStack.Screen name="Home" component={CustomDrawer} />
        <MainStack.Screen name="Onboarding" component={OnBoarding} />
        <MainStack.Screen name="SignUp" component={SignUp} />
        <MainStack.Screen name="SignIn" component={SignIn} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
