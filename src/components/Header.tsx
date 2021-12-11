import React, { FunctionComponent } from 'react';
import { View, Text, ViewStyle, StyleSheet } from 'react-native';
import { FONTS } from '../constants';

type HeaderProps = {
  title: string;
  containerStyle: ViewStyle;
  leftComponent: Element;
  rightComponent: Element;
};

const Header: FunctionComponent<HeaderProps> = ({
  title,
  containerStyle,
  leftComponent,
  rightComponent,
}) => {
  return (
    <View style={{ ...containerStyle }}>
      {/* Left */}
      {leftComponent}
      {/* Title */}
      <View style={styles.containerTitle}>
        <Text style={{ ...FONTS.h3, color: 'black' }}>{title}</Text>
      </View>
      {/* Right */}
      {rightComponent}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  containerTitle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
  },
});
