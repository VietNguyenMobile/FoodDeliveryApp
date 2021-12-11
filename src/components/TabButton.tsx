import React, { FunctionComponent } from 'react';
import {
  View,
  Text,
  ViewStyle,
  StyleSheet,
  TouchableNativeFeedback,
  Image,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { COLORS, FONTS, SIZES } from '../constants';

type TabButtonProps = {
  label: string;
  icon: string;
  isFocused: boolean;
  outerContainerStyle: ViewStyle;
  innerContainerStyle: ViewStyle;
  onPress: () => {};
};

const TabButton: FunctionComponent<TabButtonProps> = ({
  label,
  icon,
  isFocused,
  onPress,
  outerContainerStyle,
  innerContainerStyle,
}) => {
  // console.log('label: ', label);
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <Animated.View style={[styles.container, outerContainerStyle]}>
        <Animated.View style={[styles.wrapper, innerContainerStyle]}>
          <Image
            source={icon}
            style={[
              styles.image,
              { tintColor: isFocused ? COLORS.white : COLORS.primary },
            ]}
          />
          {isFocused && (
            <Text
              numberOfLines={1}
              style={[
                styles.label,
                { color: isFocused ? COLORS.white : COLORS.gray },
              ]}>
              {label}
            </Text>
          )}
        </Animated.View>
      </Animated.View>
    </TouchableNativeFeedback>
  );
};

export default TabButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
  },
  wrapper: {
    flexDirection: 'row',
    width: '80%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  image: {
    width: 20,
    height: 20,
    tintColor: COLORS.gray,
    // backgroundColor: 'red',
  },
  label: {
    marginLeft: SIZES.base,
    color: COLORS.gray,
    // color: 'red',
    ...FONTS.h3,
  },
});
