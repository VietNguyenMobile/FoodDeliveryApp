import { View, Text, BackHandler, Image, StyleSheet } from 'react-native';
import React, { FunctionComponent, useEffect } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { MainParamType } from '../../navigation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SwipeListView } from 'react-native-swipe-list-view';
import {
  FONTS,
  COLORS,
  constants,
  SIZES,
  images,
  dummyData,
  icons,
} from '../../constants';
import {
  HeaderNavigation,
  IconButton,
  CartQuantityButton,
  IconLabel,
  TextButton,
  LineDivider,
  Rating,
  StepperInput,
  FooterTotal,
  FormInputCheck,
  CardItem,
  FormInput,
} from '../../components';

type SuccessProps = StackScreenProps<MainParamType, 'Success'>;

const Success: FunctionComponent<SuccessProps> = ({ navigation, route }) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        return true;
      },
    );
    return backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={images.success}
          resizeMode="contain"
          style={{ width: 150, height: 150 }}
        />
        <Text
          style={{
            marginTop: SIZES.padding,
            ...FONTS.h1,
            color: COLORS.black,
          }}>
          Congratulations!
        </Text>
        <Text
          style={{
            textAlign: 'center',
            marginTop: SIZES.base,
            color: COLORS.darkGray,
            ...FONTS.h3,
          }}>
          Payment was successfully made!
        </Text>
      </View>
      <TextButton
        label="Done"
        buttonContainerStyle={{
          height: 55,
          marginBottom: SIZES.padding,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.primary,
        }}
        onPress={() => navigation.navigate('DeliveryStatus')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.padding,
    backgroundColor: COLORS.white,
  },
});

export default Success;
