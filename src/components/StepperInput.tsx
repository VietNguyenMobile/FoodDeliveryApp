import React, { FunctionComponent } from 'react';
import { ViewStyle, StyleSheet, View, Text } from 'react-native';
import { COLORS, FONTS, icons, SIZES } from '../constants';
import { IconButton } from '../components';

type StepperInputProps = {
  containerStyle: ViewStyle;
  value: number;
  onAdd: () => void;
  onMinus: () => void;
};

const StepperInput: FunctionComponent<StepperInputProps> = ({
  containerStyle,
  value = 1,
  onAdd,
  onMinus,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <IconButton
        containerStyle={{
          width: 50,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        icon={icons.minus}
        iconStyle={{
          height: 25,
          width: 25,
          tintColor: value > 1 ? COLORS.primary : COLORS.gray,
        }}
        onPress={onMinus}
      />

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ ...FONTS.h2, color: COLORS.black }}>{value}</Text>
      </View>

      <IconButton
        containerStyle={{
          width: 50,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        icon={icons.plus}
        iconStyle={{
          height: 25,
          width: 25,
          tintColor: COLORS.primary,
        }}
        onPress={onAdd}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    width: 130,
    backgroundColor: COLORS.lightGray2,
    borderRadius: SIZES.radius,
  },
});

export default StepperInput;
