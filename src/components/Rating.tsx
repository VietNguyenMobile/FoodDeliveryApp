import React, { FunctionComponent } from 'react';
import {
  ViewStyle,
  ImagePropTypes,
  TouchableOpacity,
  Image,
  ImageStyle,
  ImageSourcePropType,
  StyleSheet,
  View,
  Text,
  TextStyle,
} from 'react-native';
import { COLORS, FONTS, icons, SIZES } from '../constants';

type RatingProps = {
  rating: number;
  iconStyle?: ImageStyle;
  activeColor?: string;
  inactiveColor?: string;
};

const Rating: FunctionComponent<RatingProps> = ({
  rating,
  iconStyle,
  activeColor = COLORS.orange,
  inactiveColor = COLORS.lightOrange3,
}) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <Image
        source={icons.star}
        style={{
          tintColor: rating >= 1 ? activeColor : inactiveColor,
          ...styles.rateIcon,
          ...iconStyle,
        }}
      />
      <Image
        source={icons.star}
        style={{
          tintColor: rating >= 2 ? activeColor : inactiveColor,
          ...styles.rateIcon,
          ...iconStyle,
        }}
      />
      <Image
        source={icons.star}
        style={{
          tintColor: rating >= 3 ? activeColor : inactiveColor,
          ...styles.rateIcon,
          ...iconStyle,
        }}
      />
      <Image
        source={icons.star}
        style={{
          tintColor: rating >= 4 ? activeColor : inactiveColor,
          ...styles.rateIcon,
          ...iconStyle,
        }}
      />
      <Image
        source={icons.star}
        style={{
          tintColor: rating >= 5 ? activeColor : inactiveColor,
          ...styles.rateIcon,
          ...iconStyle,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rateIcon: {
    height: 15,
    width: 15,
  },
});

export default Rating;
