import React, { FunctionComponent, useRef, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  Animated,
  StyleSheet,
  Platform,
} from 'react-native';
import TextButton from '../../components/TextButton';
import { constants, images, FONTS, SIZES, COLORS } from '../../constants';
import { StackScreenProps } from '@react-navigation/stack';
import { MainParamType } from '../../navigation';

export type OnBoardingProps = StackScreenProps<MainParamType, 'Onboarding'>;

const OnBoarding: FunctionComponent<OnBoardingProps> = ({
  navigation,
  route,
}) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  const onViewChangeRef = useRef(({ viewableItems, changed }) => {
    // console.log('viewableItems: ', viewableItems);
    setCurrentIndex(viewableItems[0].index);
  });

  const renderHeaderLogo = () => {
    return (
      <View style={styles.headerLogo}>
        <Image
          source={images.logo_02}
          resizeMode="contain"
          style={styles.logo}
        />
      </View>
    );
  };

  const Dots = () => {
    const dotPosition = Animated.divide(scrollX, SIZES.width);
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {constants.onboarding_screens.map((item, index) => {
          const dotColor = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [
              COLORS.lightOrange,
              COLORS.primary,
              COLORS.lightOrange,
            ],
            extrapolate: 'clamp',
          });
          const dotWidth = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [10, 30, 10],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={`dot-${index}`}
              style={[
                styles.dot,
                { width: dotWidth, backgroundColor: dotColor },
              ]}
            />
          );
        })}
      </View>
    );
  };

  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        {/* Pagination / Dots */}
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Dots />
        </View>

        {/* Buttons */}
        {currentIndex < constants.onboarding_screens.length - 1 && (
          <View style={styles.button}>
            <TextButton
              label="Skip"
              buttonContainerStyle={{ backgroundColor: null }}
              labelStyle={{ color: COLORS.darkGray2 }}
              onPress={() => navigation.replace('SignIn')}
            />
            <TextButton
              label="Next"
              buttonContainerStyle={{
                height: 60,
                width: 200,
                borderRadius: SIZES.radius,
              }}
              onPress={() => {
                let index = Math.ceil(Number(scrollX._value / SIZES.width));
                if (index < constants.onboarding_screens.length - 1) {
                  // Scroll to the next item
                  flatListRef?.current?.scrollToIndex({
                    index: index + 1,
                    animated: true,
                  });
                } else {
                  navigation.replace('SignIn');
                }
              }}
            />
          </View>
        )}

        {currentIndex === constants.onboarding_screens.length - 1 && (
          <View
            style={{
              paddingHorizontal: SIZES.padding,
              marginVertical: SIZES.padding,
            }}>
            <TextButton
              label="Let's Get Started"
              buttonContainerStyle={{
                height: 60,
                borderRadius: SIZES.radius,
              }}
              onPress={() => navigation.replace('SignIn')}
            />
          </View>
        )}
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {renderHeaderLogo()}
      <Animated.FlatList
        ref={flatListRef}
        horizontal
        pagingEnabled
        data={constants.onboarding_screens}
        scrollEventThrottle={16}
        snapToAlignment={'center'}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false },
        )}
        onViewableItemsChanged={onViewChangeRef.current}
        keyExtractor={item => `${item.id}`}
        renderItem={({ item, index }) => {
          // console.log('index: ', index);
          return (
            <View style={{ width: SIZES.width }}>
              {/* Header */}
              <View style={{ flex: 3 }}>
                <ImageBackground
                  source={item.backgroundImage}
                  style={[
                    styles.imageBackground,
                    // { height: index === 1 ? '86%' : '100%' },
                    // { height: 80 },
                  ]}>
                  <Image
                    source={item.bannerImage}
                    style={styles.image}
                    resizeMode="contain"
                  />
                </ImageBackground>
              </View>

              {/* Detail */}
              <View style={styles.detailView}>
                <Text style={{ ...FONTS.h1, fontSize: 25, color: 'black' }}>
                  {item.title}
                </Text>
                <Text style={styles.descriptionText}>{item.description}</Text>
              </View>
            </View>
          );
        }}
      />
      {renderFooter()}
    </View>
  );
};

const styles = StyleSheet.create({
  headerLogo: {
    position: 'absolute',
    top: SIZES.height > 800 ? 50 : 25,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: SIZES.width * 0.5,
    height: 100,
  },
  imageBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    // height: '100%',
    width: '100%',
    // backgroundColor: 'red',
  },
  image: {
    width: SIZES.width * 0.8,
    height: SIZES.width * 0.8,
    marginBottom: -SIZES.padding,
    // backgroundColor: 'red',
  },
  detailView: {
    flex: 1,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SIZES.radius,
    // backgroundColor: 'red',
    // backgroundColor: 'transparent',
  },
  descriptionText: {
    marginTop: SIZES.radius,
    textAlign: 'center',
    color: COLORS.darkGray,
    paddingHorizontal: SIZES.padding,
    ...FONTS.body3,
  },
  footer: {
    ...Platform.select({
      android: { height: 90 },
      ios: { height: 160 },
    }),
    // backgroundColor: 'red',
    width: '100%',
  },
  dot: {
    borderRadius: 5,
    marginHorizontal: 6,
    // width: 10,
    height: 10,
    // backgroundColor: COLORS.primary,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // justifyContent: 'space-around',
    // justifyContent: 'space-evenly',
    paddingHorizontal: SIZES.padding,
    marginVertical: SIZES.padding,
    // borderWidth: 2,
    // borderColor: 'red',
    // width: '100%',
    // flex: 1,
  },
});

export default OnBoarding;
