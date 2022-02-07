import React, { FunctionComponent } from 'react';
import { ViewStyle, StyleSheet, View } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants';

type LineDividerProps = {
  lineStyle?: ViewStyle;
};

const LineDivider: FunctionComponent<LineDividerProps> = ({ lineStyle }) => {
  return <View style={[styles.container, { ...lineStyle }]} />;
};

const styles = StyleSheet.create({
  container: {
    height: 2,
    width: '100%',
    backgroundColor: COLORS.lightGray2,
  },
});

export default LineDivider;
