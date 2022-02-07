import React, { FunctionComponent } from 'react';
import {
  ViewStyle,
  StyleSheet,
  View,
  TextStyle,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import { COLORS, FONTS, SIZES, icons } from '../constants';

type RadioButtonProps = {
  containerStyle: ViewStyle;
  label: string;
  labelStyle: TextStyle;
  iconStyle: ViewStyle;
  isSelected: boolean;
  onPress: () => void;
};

const RadioButton: FunctionComponent<RadioButtonProps> = ({
  containerStyle,
  label,
  labelStyle,
  iconStyle,
  isSelected,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        },
        { ...containerStyle },
      ]}
      onPress={onPress}>
      <Image
        source={isSelected ? icons.check_on : icons.check_off}
        style={{ marginLeft: 5, width: 20, height: 20, ...iconStyle }}
      />
      <Text
        style={{
          marginLeft: SIZES.radius,
          color: COLORS.gray,
          ...FONTS.body3,
          ...labelStyle,
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 2,
    width: '100%',
    backgroundColor: COLORS.lightGray2,
  },
});

export default RadioButton;
