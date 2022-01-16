import React, { FunctionComponent } from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants';

type CustomSwitchProps = {
  value: boolean;
  onChange: () => void;
};

const CustomSwitch: FunctionComponent<CustomSwitchProps> = ({
  value,
  onChange,
}) => {
  return (
    <TouchableWithoutFeedback onPress={() => onChange(!value)}>
      <View style={styles.row}>
        {/* Switch */}
        <View
          style={value ? styles.switchOnContainer : styles.switchOffContainer}>
          <View
            style={{
              ...styles.dot,
              backgroundColor: value ? COLORS.white : COLORS.gray,
            }}
          />
        </View>
        {/* Text */}
        <Text
          style={{
            color: value ? COLORS.primary : COLORS.gray,
            marginLeft: SIZES.base,
            ...FONTS.body4,
          }}>
          Save Me
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  switchOnContainer: {
    width: 40,
    height: 20,
    paddingRight: 4,
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderRadius: 10,
    backgroundColor: COLORS.primary,
  },
  switchOffContainer: {
    width: 40,
    height: 20,
    paddingLeft: 4,
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    borderColor: COLORS.gray
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});

export default CustomSwitch;
