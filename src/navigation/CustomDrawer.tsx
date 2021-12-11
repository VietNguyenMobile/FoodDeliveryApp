import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
// import Animated, {
//   interpolateNode,
//   Value,
//   useSharedValue,
//   useAnimatedStyle,
// } from 'react-native-reanimated';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  useDrawerProgress,
} from '@react-navigation/drawer';
import { useDispatch, useSelector } from 'react-redux';
// import { connect } from 'react-redux';
// import { setSelectedTab } from '../stores/tab/tabActions';
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

const CustomDrawerItem = ({ label, icon, onPress }) => {
  return (
    <TouchableOpacity style={styles.drawerItem} onPress={onPress}>
      <Image style={styles.drawerImage} source={icon} />
      <Text style={styles.drawerItemLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

const CustomDrawerContent = ({
  navigation,
  //  selectedTab, setSelectedTab
}) => {
  // const progress = useDrawerProgress();
  // console.log('progress: ', progress);

  const selectedTab = useSelector<RootState, string>(
    state => state.tab.selectedTab,
  );
  const dispatch: AppDispatch = useDispatch();

  console.log('selectedTab: ', selectedTab);

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
          />
          <CustomDrawerItem
            label={constants.screens.notification}
            icon={icons.notification}
          />
          <CustomDrawerItem
            label={constants.screens.favourite}
            icon={icons.favourite}
          />

          {/* Line Divider */}
          <View style={styles.lineDivider} />

          <CustomDrawerItem label={'Track Tour Order'} icon={icons.location} />
          <CustomDrawerItem label={'Coupons'} icon={icons.coupon} />
          <CustomDrawerItem label={'Settings'} icon={icons.setting} />
          <CustomDrawerItem label={'Invite a Friend'} icon={icons.profile} />
          <CustomDrawerItem label={'Help Center'} icon={icons.help} />
        </View>

        <View style={{ marginBottom: SIZES.padding }}>
          <CustomDrawerItem label={'Logout'} icon={icons.logout} />
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

const CustomDrawer = ({ selectedTab, setSelectedTab }) => {
  // const [progress, setProgress] = useState(new Animated.Value(0));

  // const scale = Animated.interpolateNode(progress, {
  //   inputRange: [0, 1],
  //   outputRange: [1, 0.8],
  // });

  // const borderRadius = Animated.interpolateNode(progress, {
  //   inputRange: [0, 1],
  //   outputRange: [0, 26],
  // });

  // const animatedStyle = { borderRadius, transform: [{ scale }] };
  // console.log('animatedStyle: ', animatedStyle);

  // const progress = useSharedValue(0);
  // const scale = interpolateNode(progress.value, {
  //   inputRange: [0, 1],
  //   outputRange: [1, 0.8],
  // });
  // const borderRadius = interpolateNode(progress.value, {
  //   inputRange: [0, 1],
  //   outputRange: [0, 26],
  // });
  // const animatedStyles = useAnimatedStyle(() => {
  //   return {
  //     borderRadius,
  //     transform: [{ scale }],
  //   };
  // }, []);
  // const animatedStyle = { borderRadius, transform: [{ scale }] };

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
          // console.log('progress 1111: ', props.progress);
          // setTimeout(() => {
          //   // console.log('props,: ', props);
          //   // setProgress(props.progress);
          //   // useSharedValue()
          // }, 0);

          return (
            <CustomDrawerContent
              navigation={props.navigation}
              // selectedTab={selectedTab}
              // setSelectedTab={setSelectedTab}
            />
          );
        }}>
        <Drawer.Screen name="MainLayout">
          {props => (
            <MainLayout
              {...props}
              // drawerAnimatedStyle={animatedStyle}
            />
          )}
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

function mapStateToProps(state) {
  return {
    selectedTab: state.tabReducer.selectedTab,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setSelectedTab: selectedTab => {
      return dispatch(setSelectedTab(selectedTab));
    },
  };
}

// export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawer);
