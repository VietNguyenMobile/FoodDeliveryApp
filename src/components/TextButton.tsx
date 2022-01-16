import React, { FunctionComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextStyle,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import { COLORS, FONTS } from '../constants';

type TextButtonProps = {
  label: string;
  labelStyle: TextStyle;
  buttonContainerStyle: ViewStyle;
  onPress: () => void;
  disabled: boolean;
};

const TextButton: FunctionComponent<TextButtonProps> = ({
  label,
  labelStyle,
  buttonContainerStyle,
  onPress,
  disabled
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        ...buttonContainerStyle,
      }}>
      <Text style={{ color: COLORS.white, ...FONTS.h3, ...labelStyle }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default TextButton;
