import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Image,
  FlatList,
  Platform,
} from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  interpolateNode,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { useDrawerStatus } from '@react-navigation/drawer';
import { RootState, AppDispatch } from '../stores/types';
import { setTabSelected } from '../stores/slices/tabSlice';
import { Home, Search, CartTab, Favourite, Notification } from '../screens';
import Header from '../components/Header';
import TabButton from '../components/TabButton';
import {
  COLORS,
  FONTS,
  SIZES,
  icons,
  constants,
  dummyData,
} from '../constants';

const MainLayout = ({ navigation }) => {
  const flatListRef = useRef<FlatList<any>>();
  const isDrawerOpen = useDrawerStatus();
  const sv = useSharedValue(0);

  useEffect(() => {
    if (isDrawerOpen === 'open') {
      sv.value = withTiming(0.6, { duration: 50 });
    } else {
      sv.value = withTiming(0, { duration: 200 });
    }
  }, [isDrawerOpen]);

  const screenStyle = useAnimatedStyle(() => {
    const scale = interpolate(sv.value, [0, 0.5, 1], [1, 0.9, 0.85], {
      extrapolateRight: Extrapolate.CLAMP,
    });
    const borderRadius = interpolate(sv.value, [0, 1], [1, 26], {
      extrapolateRight: Extrapolate.CLAMP,
    });

    return {
      borderRadius,
      transform: [{ scale }],
    };
  });

  useEffect(() => {
    dispatch(setTabSelected(constants.screens.home));
  }, []);

  const selectedTab = useSelector<RootState, string>(
    state => state.tab.selectedTab,
  );
  // console.log('selectedTab: ', selectedTab)
  const dispatch: AppDispatch = useDispatch();
  console.log('selectedTab 000: ', selectedTab);

  // Reanimated Shared Value
  const homeTabFlex = useSharedValue(1);
  const homeTabColor = useSharedValue(COLORS.white);
  const searchTabFlex = useSharedValue(1);
  const searchTabColor = useSharedValue(COLORS.white);
  const cartTabFlex = useSharedValue(1);
  const cartTabColor = useSharedValue(COLORS.white);
  const favouriteTabFlex = useSharedValue(1);
  const favouriteTabColor = useSharedValue(COLORS.white);
  const notificationTabFlex = useSharedValue(1);
  const notificationTabColor = useSharedValue(COLORS.white);

  // Reanimated Animated Style
  const homeFlexStyle = useAnimatedStyle(() => {
    return {
      flex: homeTabFlex.value,
    };
  });
  const homeColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: homeTabColor.value,
    };
  });

  const searchFlexStyle = useAnimatedStyle(() => {
    return {
      flex: searchTabFlex.value,
    };
  });
  const searchColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: searchTabColor.value,
    };
  });

  const cartFlexStyle = useAnimatedStyle(() => {
    return {
      flex: cartTabFlex.value,
    };
  });
  const cartColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: cartTabColor.value,
    };
  });

  const favouriteFlexStyle = useAnimatedStyle(() => {
    return {
      flex: favouriteTabFlex.value,
    };
  });
  const favouriteColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: favouriteTabColor.value,
    };
  });

  const notificationFlexStyle = useAnimatedStyle(() => {
    return {
      flex: notificationTabFlex.value,
    };
  });
  const notificationColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: notificationTabColor.value,
    };
  });

  useEffect(() => {
    if (selectedTab == constants.screens.home) {
      flatListRef?.current?.scrollToIndex({ index: 0, animated: false });
      homeTabFlex.value = withTiming(4, { duration: 500 });
      homeTabColor.value = withTiming(COLORS.primary, {
        duration: 500,
      });
    } else {
      homeTabFlex.value = withTiming(1, { duration: 500 });
      homeTabColor.value = withTiming(COLORS.white, {
        duration: 500,
      });
    }

    if (selectedTab == constants.screens.search) {
      flatListRef?.current?.scrollToIndex({ index: 1, animated: false });
      searchTabFlex.value = withTiming(4, { duration: 500 });
      searchTabColor.value = withTiming(COLORS.primary, { duration: 500 });
    } else {
      searchTabFlex.value = withTiming(1, { duration: 500 });
      searchTabColor.value = withTiming(COLORS.white, { duration: 500 });
    }

    if (selectedTab == constants.screens.cart) {
      flatListRef?.current?.scrollToIndex({ index: 2, animated: false });
      cartTabFlex.value = withTiming(4, { duration: 500 });
      cartTabColor.value = withTiming(COLORS.primary, { duration: 500 });
    } else {
      cartTabFlex.value = withTiming(1, { duration: 500 });
      cartTabColor.value = withTiming(COLORS.white, { duration: 500 });
    }

    if (selectedTab == constants.screens.favourite) {
      flatListRef?.current?.scrollToIndex({ index: 3, animated: false });
      favouriteTabFlex.value = withTiming(4, { duration: 500 });
      favouriteTabColor.value = withTiming(COLORS.primary, { duration: 500 });
    } else {
      favouriteTabFlex.value = withTiming(1, { duration: 500 });
      favouriteTabColor.value = withTiming(COLORS.white, { duration: 500 });
    }

    if (selectedTab == constants.screens.notification) {
      flatListRef?.current?.scrollToIndex({ index: 4, animated: false });
      notificationTabFlex.value = withTiming(4, { duration: 500 });
      notificationTabColor.value = withTiming(COLORS.primary, {
        duration: 500,
      });
    } else {
      notificationTabFlex.value = withTiming(1, { duration: 500 });
      notificationTabColor.value = withTiming(COLORS.white, { duration: 500 });
    }
  }, [selectedTab, flatListRef]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          // ...drawerAnimatedStyle,
        },
        screenStyle,
      ]}>
      {/* Header */}
      <Header
        containerStyle={styles.containerStyle}
        title={selectedTab.toUpperCase()}
        leftComponent={
          <TouchableOpacity
            style={styles.leftComponent}
            onPress={() => navigation.openDrawer()}>
            <Image source={icons.menu} />
          </TouchableOpacity>
        }
        rightComponent={
          <TouchableOpacity style={styles.rightComponent}>
            <Image
              source={dummyData.myProfile.profile_image}
              style={styles.imageProfile}
            />
          </TouchableOpacity>
        }
      />

      {/* Content */}
      <View style={styles.content}>
        <FlatList
          ref={flatListRef}
          horizontal
          scrollEnabled={false}
          snapToInterval={SIZES.width}
          snapToAlignment="center"
          showsHorizontalScrollIndicator={false}
          data={constants.bottom_tabs}
          keyExtractor={item => `${item.id}`}
          renderItem={({ item, index }) => {
            return (
              <View style={{ height: SIZES.height, width: SIZES.width }}>
                {item.label === constants.screens.home && (
                  <Home navigation={navigation} />
                )}
                {item.label === constants.screens.search && <Search />}
                {item.label === constants.screens.cart && <CartTab />}
                {item.label === constants.screens.favourite && <Favourite />}
                {item.label === constants.screens.notification && (
                  <Notification />
                )}
              </View>
            );
          }}
        />
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        {/* Shadow */}
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 4 }}
          colors={[COLORS.transparent, COLORS.lightGray1]}
          // colors={[COLORS.white2, COLORS.lightGray1]}
          style={styles.shadow}
        />

        {/* Tabs */}
        <View style={styles.tabs}>
          <TabButton
            label={constants.screens.home}
            icon={icons.home}
            isFocused={selectedTab === constants.screens.home}
            onPress={() => dispatch(setTabSelected(constants.screens.home))}
            outerContainerStyle={homeFlexStyle}
            innerContainerStyle={homeColorStyle}
          />

          <TabButton
            label={constants.screens.search}
            icon={icons.search}
            isFocused={selectedTab === constants.screens.search}
            onPress={() => dispatch(setTabSelected(constants.screens.search))}
            outerContainerStyle={searchFlexStyle}
            innerContainerStyle={searchColorStyle}
          />

          <TabButton
            label={constants.screens.cart}
            icon={icons.cart}
            isFocused={selectedTab === constants.screens.cart}
            onPress={() => dispatch(setTabSelected(constants.screens.cart))}
            outerContainerStyle={cartFlexStyle}
            innerContainerStyle={cartColorStyle}
          />

          <TabButton
            label={constants.screens.favourite}
            icon={icons.favourite}
            isFocused={selectedTab === constants.screens.favourite}
            onPress={() =>
              dispatch(setTabSelected(constants.screens.favourite))
            }
            outerContainerStyle={favouriteFlexStyle}
            innerContainerStyle={favouriteColorStyle}
          />

          <TabButton
            label={constants.screens.notification}
            icon={icons.notification}
            isFocused={selectedTab === constants.screens.notification}
            onPress={() =>
              dispatch(setTabSelected(constants.screens.notification))
            }
            outerContainerStyle={notificationFlexStyle}
            innerContainerStyle={notificationColorStyle}
          />
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
  },
  containerStyle: {
    height: 50,
    paddingHorizontal: SIZES.padding,
    marginTop: 40,
    alignItems: 'center',
    // borderWidth: 1,
    flexDirection: 'row',
  },
  leftComponent: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.gray2,
    borderRadius: SIZES.radius,
  },
  rightComponent: {
    borderRadius: SIZES.radius,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageProfile: {
    width: 40,
    height: 40,
    borderRadius: SIZES.radius,
  },
  footer: {
    height: 100,
    justifyContent: 'flex-end',
    // backgroundColor: 'red',
    // borderWidth: 1,
  },
  shadow: {
    position: 'absolute',
    top: -20,
    left: 0,
    right: 0,
    height: 100,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    // backgroundColor: 'red',
  },
  tabs: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: SIZES.radius,
    ...Platform.select({
      android: { paddingBottom: 0 },
      ios: { paddingBottom: 10 },
    }),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: COLORS.white,
  },
});

export default MainLayout;
