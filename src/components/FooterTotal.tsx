import React, { FunctionComponent } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  StyleSheet,
  Platform,
} from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants';
import { TextButton, LineDivider } from '../components';
import LinearGradient from 'react-native-linear-gradient';

type FooterTotalProps = {
  subTotal: number;
  shippingFee: number;
  total: number;
  onPress: () => void;
};

const FooterTotal: FunctionComponent<FooterTotalProps> = ({
  subTotal,
  shippingFee,
  total,
  onPress,
}) => {
  return (
    <View>
      {/* Shadow */}
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={[COLORS.transparent, COLORS.lightGray1]}
        style={{
          position: 'absolute',
          top: -15,
          left: 0,
          right: 0,
          height: Platform.OS === 'ios' ? 200 : 50,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        }}
      />
      {/* Order Details */}
      <View
        style={{
          padding: SIZES.padding,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: COLORS.white,
        }}>
        {/* Subtotal */}
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Text style={{ flex: 1, ...FONTS.body3, color: COLORS.black }}>
            Subtotal
          </Text>
          <Text style={{ ...FONTS.h3, color: COLORS.black }}>
            ${subTotal.toFixed(2)}
          </Text>
        </View>
        {/* Shipping Fee */}
        <View style={styles.shippingFee}>
          <Text style={{ flex: 1, ...FONTS.body3, color: COLORS.black }}>
            Shipping Fee
          </Text>
          <Text style={{ ...FONTS.h3, color: COLORS.black }}>
            ${shippingFee.toFixed(2)}
          </Text>
        </View>
        {/* Line */}
        <LineDivider />

        {/* Total */}
        <View style={{ flexDirection: 'row', marginTop: SIZES.padding }}>
          <Text style={{ flex: 1, ...FONTS.h2, color: COLORS.black }}>
            Total:
          </Text>
          <Text style={{ ...FONTS.h2, color: COLORS.black }}>
            ${total.toFixed(2)}
          </Text>
        </View>
        {/* Button Order */}
        <TextButton
          buttonContainerStyle={styles.order}
          label="Place your Order"
          onPress={onPress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  shippingFee: {
    flexDirection: 'row',
    marginTop: SIZES.base,
    marginBottom: SIZES.padding,
  },
  order: {
    height: 60,
    marginTop: SIZES.padding,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.primary,
  },
});

export default FooterTotal;
