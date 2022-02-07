import React, { FunctionComponent } from 'react';
import {
  ViewStyle,
  ImagePropTypes,
  TouchableOpacity,
  Image,
  ImageStyle,
  ImageSourcePropType,
} from 'react-native';
import { COLORS } from '../constants';

type IconButtonProps = {
  containerStyle: ViewStyle;
  icon: ImageSourcePropType;
  iconStyle: ImageStyle;
  onPress: () => void;
};

const IconButton: FunctionComponent<IconButtonProps> = ({
  containerStyle,
  icon,
  iconStyle,
  onPress,
}) => {
  return (
    <TouchableOpacity style={containerStyle} onPress={onPress}>
      <Image
        source={icon}
        style={{ width: 30, height: 30, tintColor: COLORS.white, ...iconStyle }}
      />
    </TouchableOpacity>
  );
};

export default IconButton;
