import React, { FunctionComponent, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
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
} from '../../components';

type MyCartProps = StackScreenProps<MainParamType, 'MyCart'>;

const MyCart: FunctionComponent<MyCartProps> = ({ navigation, route }) => {
  const [myCartList, setMyCartList] = useState(dummyData.myCart);
  const insets = useSafeAreaInsets();

  const updateQuantityHandler = (newQty: number, id: string) => {
    const newMyCartList = myCartList.map(cl => {
      return cl.id === id ? { ...cl, qty: newQty } : cl;
    });
    setMyCartList(newMyCartList);
  };

  const removeMyCartHandler = (id: string) => {
    let newMyCartList = [...myCartList];
    const index = newMyCartList.findIndex(cart => cart.id === id);
    newMyCartList.splice(index, 1);
    setMyCartList(newMyCartList);
  };

  const renderHeader = () => {
    return (
      <HeaderNavigation
        title="My Cart"
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
        rightComponent={<CartQuantityButton quantity={3} />}
      />
    );
  };

  const renderCartList = () => {
    return (
      <SwipeListView
        data={myCartList}
        key={item => `${item.id}`}
        contentContainerStyle={{
          marginTop: SIZES.radius,
          paddingHorizontal: SIZES.padding,
          paddingBottom: SIZES.padding * 2,
        }}
        disableRightSwipe={true}
        rightOpenValue={-75}
        renderItem={(data, rowMap) => {
          return (
            <View
              style={{
                height: 100,
                backgroundColor: COLORS.lightGray2,
                // backgroundColor: COLORS.lightGray1,
                // backgroundColor: 'red',
                // borderWidth: 1,
                ...styles.cartItemContainer,
              }}>
              {/* <Text style={{}}> {data.item.name}</Text> */}
              {/* Food Image */}
              <View style={{ width: 90, height: 100, marginLeft: -10 }}>
                <Image
                  source={data.item.image}
                  resizeMode="contain"
                  style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    top: 10,
                  }}
                />
              </View>
              {/* Food Info */}
              <View style={{ flex: 1 }}>
                <Text style={{ ...FONTS.body3, color: COLORS.black }}>
                  {data.item.name}
                </Text>
                <Text style={{ color: COLORS.primary, ...FONTS.h3 }}>
                  ${data.item.price}
                </Text>
              </View>
              {/* Quantity */}
              <StepperInput
                containerStyle={{
                  height: 50,
                  width: 125,
                  backgroundColor: COLORS.white,
                  // backgroundColor: 'red',
                  // borderWidth: 1,
                }}
                value={data.item.qty}
                onAdd={() =>
                  updateQuantityHandler(data.item.qty + 1, data.item.id)
                }
                onMinus={() => {
                  if (data.item.qty > 1) {
                    updateQuantityHandler(data.item.qty - 1, data.item.id);
                  }
                }}
              />
            </View>
          );
        }}
        renderHiddenItem={(data, rowMap) => {
          return (
            <IconButton
              containerStyle={{
                flex: 1,
                justifyContent: 'flex-end',
                backgroundColor: COLORS.primary,
                ...styles.cartItemContainer,
              }}
              icon={icons.deleteIcon}
              iconStyle={{ marginRight: 10 }}
              onPress={() => removeMyCartHandler(data.item.id)}
            />
          );
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      {renderHeader()}
      {/* Cart List */}
      {renderCartList()}
      {/* Footer */}
      <FooterTotal
        subTotal={37.92}
        shippingFee={1.05}
        total={38.97}
        onPress={() => navigation.navigate('MyCard')}
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
  cartItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZES.radius,
    paddingHorizontal: SIZES.radius,
    borderRadius: SIZES.radius,
  },
});

export default MyCart;
