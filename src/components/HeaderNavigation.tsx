import React, { FunctionComponent } from 'react';
import { View, Text, ViewStyle, StyleSheet, TextStyle } from 'react-native';
import { FONTS } from '../constants';

type HeaderNavigationProps = {
  title: string;
  containerStyle: ViewStyle;
  leftComponent: any;
  rightComponent: any;
  titleStyle: TextStyle;
};

const HeaderNavigation: FunctionComponent<HeaderNavigationProps> = ({
  title,
  containerStyle,
  leftComponent,
  rightComponent,
  titleStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {/* Left */}
      {leftComponent}
      {/* Title */}
      <View style={styles.containerTitle}>
        <Text style={[styles.titleStyle, titleStyle]}>{title}</Text>
      </View>
      {/* Right */}
      {rightComponent}
    </View>
  );
};

export default HeaderNavigation;

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
  },
  containerTitle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleStyle: {
    ...FONTS.h3,
    color: 'black',
  },
});
