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
import { COLORS, FONTS, SIZES } from '../constants';

type IconLabelProps = {
  containerStyle: ViewStyle;
  icon: ImageSourcePropType;
  iconStyle?: ImageStyle;
  label: string;
  labelStyle: TextStyle;
};

const IconLabel: FunctionComponent<IconLabelProps> = ({
  containerStyle,
  icon,
  iconStyle,
  label,
  labelStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Image source={icon} style={{ width: 20, height: 20, ...iconStyle }} />
      <Text style={{ marginLeft: SIZES.base, ...FONTS.body3, ...labelStyle }}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: SIZES.base,
    paddingHorizontal: SIZES.radius,
    borderRadius: SIZES.radius,
  },
});

export default IconLabel;
