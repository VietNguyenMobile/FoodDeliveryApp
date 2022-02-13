import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import { useDispatch, useSelector } from 'react-redux';
import { MainLayout } from '../screens';
import {
  COLORS,
  FONTS,
  SIZES,
  constants,
  icons,
  dummyData,
} from '../constants';

import { RootState, AppDispatch } from '../stores/types';
import { setTabSelected } from '../stores/slices/tabSlice';

export type DrawerParamType = {
  MainLayout: undefined;
};

const Drawer = createDrawerNavigator<DrawerParamType>();

const CustomDrawerItem = ({ label, icon, onPress, isFocused }) => {
  return (
    <TouchableOpacity
      style={[
        styles.drawerItem,
        { backgroundColor: isFocused ? COLORS.transparentBlack1 : null },
      ]}
      onPress={onPress}>
      <Image style={styles.drawerImage} source={icon} />
      <Text style={styles.drawerItemLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

const CustomDrawerContent = ({ navigation }) => {
  const selectedTab = useSelector<RootState, string>(
    state => state.tab.selectedTab,
  );
  const dispatch: AppDispatch = useDispatch();

  return (
    <DrawerContentScrollView
      scrollEnabled={true}
      contentContainerStyle={{ flex: 1 }}>
      <View style={styles.containerContent}>
        {/* Close */}
        <View style={styles.close}>
          <TouchableOpacity
            style={styles.closeBtn}
            onPress={() => navigation.closeDrawer()}>
            <Image source={icons.cross} style={styles.closeImage} />
          </TouchableOpacity>
        </View>
        {/* Profile */}
        <TouchableOpacity
          style={styles.containerProfile}
          onPress={() => console.log('Profile')}>
          <Image
            style={styles.profileImage}
            source={dummyData.myProfile?.profile_image}
          />
          <View style={{ marginLeft: SIZES.radius }}>
            <Text style={styles.profileName}>{dummyData.myProfile?.name}</Text>
            <Text style={styles.profileStatus}>View your profile</Text>
          </View>
        </TouchableOpacity>

        {/* Drawer Items */}

        <View style={styles.containerDrawerItem}>
          <CustomDrawerItem
            label={constants.screens.home}
            icon={icons.home}
            isFocused={selectedTab === constants.screens.home}
            onPress={() => {
              // setSelectedTab(constants.screens.home);
              console.log('setTabSelected: ', constants.screens.home);
              dispatch(setTabSelected(constants.screens.home));
              navigation.navigate('MainLayout');
            }}
          />
          <CustomDrawerItem
            label={constants.screens.myWallet}
            icon={icons.wallet}
            isFocused={selectedTab === constants.screens.myWallet}
            onPress={() => {
              dispatch(setTabSelected(constants.screens.myWallet));
            }}
          />
          <CustomDrawerItem
            label={constants.screens.notification}
            icon={icons.notification}
            isFocused={selectedTab === constants.screens.notification}
            onPress={() => {
              // setSelectedTab(constants.screens.home);
              console.log('setTabSelected: ', constants.screens.notification);
              dispatch(setTabSelected(constants.screens.notification));
              // navigation.navigate('MainLayout');
            }}
          />
          <CustomDrawerItem
            label={constants.screens.favourite}
            icon={icons.favourite}
            isFocused={selectedTab === constants.screens.favourite}
            onPress={() => {
              console.log('setTabSelected: ', constants.screens.favourite);
              dispatch(setTabSelected(constants.screens.favourite));
              // navigation.navigate('MainLayout');
            }}
          />

          {/* Line Divider */}
          <View style={styles.lineDivider} />

          <CustomDrawerItem
            label={'Track Tour Order'}
            icon={icons.location}
            isFocused={selectedTab === constants.screens.home}
            // onPress={() => {
            //   // setSelectedTab(constants.screens.home);
            //   console.log('setTabSelected: ', constants.screens.home);
            //   dispatch(setTabSelected(constants.screens.home));
            //   navigation.navigate('MainLayout');
            // }}
          />
          <CustomDrawerItem
            label={'Coupons'}
            icon={icons.coupon}
            // isFocused={selectedTab === constants.screens.home}
            // onPress={() => {
            //   // setSelectedTab(constants.screens.home);
            //   console.log('setTabSelected: ', constants.screens.home);
            //   dispatch(setTabSelected(constants.screens.home));
            //   navigation.navigate('MainLayout');
            // }}
          />
          <CustomDrawerItem
            label={'Settings'}
            icon={icons.setting}
            // isFocused={selectedTab === constants.screens.home}
            // onPress={() => {
            //   // setSelectedTab(constants.screens.home);
            //   console.log('setTabSelected: ', constants.screens.home);
            //   dispatch(setTabSelected(constants.screens.home));
            //   navigation.navigate('MainLayout');
            // }}
          />
          <CustomDrawerItem
            label={'Invite a Friend'}
            icon={icons.profile}
            // isFocused={selectedTab === constants.screens.home}
            // onPress={() => {
            //   // setSelectedTab(constants.screens.home);
            //   console.log('setTabSelected: ', constants.screens.home);
            //   dispatch(setTabSelected(constants.screens.home));
            //   navigation.navigate('MainLayout');
            // }}
          />
          <CustomDrawerItem
            label={'Help Center'}
            icon={icons.help}
            // isFocused={selectedTab === constants.screens.home}
            // onPress={() => {
            //   // setSelectedTab(constants.screens.home);
            //   console.log('setTabSelected: ', constants.screens.home);
            //   dispatch(setTabSelected(constants.screens.home));
            //   navigation.navigate('MainLayout');
            // }}
          />
        </View>

        <View style={{ marginBottom: SIZES.padding }}>
          <CustomDrawerItem label={'Logout'} icon={icons.logout} />
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

const CustomDrawer = ({ selectedTab, setSelectedTab }) => {
  return (
    <View style={styles.container}>
      <Drawer.Navigator
        useLegacyImplementation
        initialRouteName="MainLayout"
        screenOptions={{
          headerShown: false,
          drawerType: 'slide',
          overlayColor: 'transparent',
          drawerStyle: styles.drawerStyle,
          sceneContainerStyle: styles.bgTransparent,
        }}
        drawerContent={props => {
          return <CustomDrawerContent navigation={props.navigation} />;
        }}>
        <Drawer.Screen name="MainLayout">
          {props => <MainLayout {...props} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  drawerStyle: {
    flex: 1,
    width: '65%',
    paddingRight: 20,
    backgroundColor: 'transparent',
  },
  bgTransparent: {
    backgroundColor: 'transparent',
  },
  containerContent: {
    flex: 1,
    paddingHorizontal: SIZES.radius,
  },
  close: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  closeBtn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeImage: {
    height: 35,
    width: 35,
    tintColor: COLORS.white,
  },
  containerProfile: {
    flexDirection: 'row',
    marginTop: SIZES.radius,
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: SIZES.radius,
  },
  profileName: {
    color: COLORS.white,
    ...FONTS.h3,
  },
  profileStatus: {
    color: COLORS.white,
    ...FONTS.body4,
  },
  containerDrawerItem: {
    flex: 1,
    marginTop: SIZES.padding,
  },
  drawerItem: {
    flexDirection: 'row',
    height: 40,
    marginBottom: SIZES.base,
    alignItems: 'center',
    paddingLeft: SIZES.radius,
    borderRadius: SIZES.base,
  },
  drawerImage: {
    width: 20,
    height: 20,
    tintColor: COLORS.white,
  },
  drawerItemLabel: {
    marginLeft: 15,
    color: COLORS.white,
    ...FONTS.h3,
  },
  lineDivider: {
    height: 1,
    marginVertical: SIZES.radius,
    marginLeft: SIZES.radius,
    backgroundColor: COLORS.lightGray1,
  },
});

export default CustomDrawer;
