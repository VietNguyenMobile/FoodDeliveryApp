import React, { FunctionComponent } from 'react';
import {
  View,
  Text,
  ViewStyle,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { COLORS, FONTS, icons, SIZES } from '../constants';

type CartQuantityButtonProps = {
  containerStyle?: ViewStyle;
  iconStyle?: ViewStyle;
  quantity: number;
  onPress?: () => void;
};

const CartQuantityButton: FunctionComponent<CartQuantityButtonProps> = ({
  containerStyle,
  iconStyle,
  quantity,
  onPress,
}) => {
  console.log('quantity: ', quantity);
  return (
    <TouchableOpacity
      style={[styles.container, { ...containerStyle }]}
      onPress={onPress}>
      <Image style={[styles.icon, { ...iconStyle }]} source={icons.cart} />
      <View style={styles.badge}>
        <Text style={styles.quantityNumber}>{quantity}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CartQuantityButton;

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.lightOrange2,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: COLORS.black,
  },
  badge: {
    position: 'absolute',
    top: 5,
    right: 5,
    height: 15,
    width: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.primary,
  },
  quantityNumber: {
    color: COLORS.white,
    ...FONTS.body5,
    ...Platform.select({
      android: { lineHeight: 17 },
      ios: { lineHeight: 0 },
    }),
    fontSize: 10,
  },
});
