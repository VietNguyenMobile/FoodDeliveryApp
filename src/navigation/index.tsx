import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { MainLayout } from '../screens';

import CustomDrawer from './CustomDrawer';

export type MainParamType = {
  MainLayout: undefined;
  Home: undefined;
  Search: undefined;
  CartTab: undefined;
  Favourite: undefined;
  Notification: undefined;
};

const MainStack = createStackNavigator<MainParamType>();

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={'Home'}>
        <Stack.Screen name="Home" component={CustomDrawer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
