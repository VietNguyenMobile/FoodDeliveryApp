import React, { FunctionComponent } from 'react';
import {
  ViewStyle,
  ImagePropTypes,
  TouchableOpacity,
  Image,
  Text,
  TextStyle,
} from 'react-native';
import { COLORS, FONTS } from '../constants';

type TextIconButtonProps = {
  containerStyle: ViewStyle;
  icon: ImagePropTypes;
  iconStyle: ViewStyle;
  onPress: () => void;
  label: string;
  labelStyle: TextStyle;
};

const TextIconButton: FunctionComponent<TextIconButtonProps> = ({
  containerStyle,
  icon,
  iconStyle,
  label,
  labelStyle,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        ...containerStyle,
      }}
      onPress={onPress}>
      <Text style={{ ...FONTS.body3, ...labelStyle }}>{label}</Text>
      <Image
        source={icon}
        style={{
          width: 20,
          height: 20,
          tintColor: COLORS.black,
          marginLeft: 5,
          ...iconStyle,
        }}
      />
    </TouchableOpacity>
  );
};

export default TextIconButton;
