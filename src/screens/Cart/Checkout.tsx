import React, { FunctionComponent, useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';
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

type CheckoutProps = StackScreenProps<MainParamType, 'Checkout'>;

const Checkout: FunctionComponent<CheckoutProps> = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    let { selectedCard } = route.params;
    console.log('selectedCard useEffect: ', selectedCard);
    setSelectedCard(selectedCard);
  }, []);

  console.log('selectedCard: ', selectedCard);

  const renderHeader = () => {
    return (
      <HeaderNavigation
        title="CHECKOUT"
        containerStyle={{
          height: 50,
          marginHorizontal: SIZES.padding,
          marginTop: insets.top,
        }}
        titleStyle={{}}
        leftComponent={
          <IconButton
            icon={icons.back}
            containerStyle={styles.leftIconButton}
            iconStyle={{
              width: 16,
              height: 20,
              ...Platform.select({
                android: { marginRight: 4 },
              }),
              tintColor: COLORS.gray2,
            }}
            onPress={() => navigation.goBack()}
          />
        }
        // rightComponent={<CartQuantityButton quantity={3} />}
      />
    );
  };

  const renderMyCards = () => {
    return (
      <View>
        {selectedCard &&
          dummyData.myCards.map((item, index) => {
            return (
              <CardItem
                key={`MyCard-${item.id}`}
                item={item}
                isSelected={
                  `${selectedCard?.key}-${selectedCard?.id}` ===
                  `MyCard-${item.id}`
                }
                onPress={() => setSelectedCard({ ...item, key: 'MyCard' })}
              />
            );
          })}
      </View>
    );
  };

  const renderDeliveryAddress = () => {
    return (
      <View style={{ marginTop: SIZES.padding }}>
        <Text style={{ ...FONTS.h3, color: COLORS.black }}>
          Delivery Address
        </Text>
        <View style={styles.containerAddress}>
          <Image source={icons.location1} style={{ width: 40, height: 40 }} />
          <Text
            style={{
              marginLeft: SIZES.radius,
              width: '85%',
              ...FONTS.body3,
              color: COLORS.black,
            }}>
            300 Post Street San Francisco, CA
          </Text>
        </View>
      </View>
    );
  };

  const renderCoupon = () => {
    return (
      <View style={{ marginTop: SIZES.padding }}>
        <Text style={{ ...FONTS.h3, color: COLORS.black }}>Add Coupon</Text>
        <FormInput
          inputContainerStyle={{
            marginTop: 0,
            paddingLeft: SIZES.padding,
            paddingRight: 0,
            borderWidth: 2,
            borderColor: COLORS.lightGray2,
            backgroundColor: COLORS.white,
            overflow: 'hidden',
            ...Platform.select({
              android: { height: 60 },
            }),
          }}
          placeholder="Coupon Code"
          appendComponent={
            <View
              style={{
                width: 60,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.primary,
              }}>
              <Image
                source={icons.discount}
                style={{
                  width: 40,
                  height: 40,
                }}
              />
            </View>
          }
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      {renderHeader()}
      {/* Body */}
      <KeyboardAwareScrollView
        keyboardDismissMode="on-drag"
        extraScrollHeight={-200}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: SIZES.padding,
          paddingBottom: 20,
        }}>
        {/* My Cards */}
        {renderMyCards()}
        {/* Delivery Address */}
        {renderDeliveryAddress()}
        {/* Coupon */}
        {renderCoupon()}
      </KeyboardAwareScrollView>
      <FooterTotal
        subTotal={37.9}
        shippingFee={0.07}
        total={37.97}
        onPress={() => navigation.replace('Success')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  leftIconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: SIZES.radius,
    borderColor: COLORS.gray2,
  },
  containerAddress: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZES.radius,
    paddingVertical: SIZES.radius,
    paddingHorizontal: SIZES.padding,
    borderWidth: 2,
    borderRadius: SIZES.radius,
    borderColor: COLORS.lightGray2,
  },
});

export default Checkout;
