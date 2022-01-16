import React, { FunctionComponent } from 'react';
import {
  View,
  Text,
  ViewStyle,
  ViewComponent,
  StyleSheet,
  Image,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { images, FONTS, SIZES, COLORS } from '../../constants';

type AuthLayoutProps = {
  title: string;
  subtitle: string;
  titleContainerStyle?: ViewStyle;
  children: any;
};

const AuthLayout: FunctionComponent<AuthLayoutProps> = ({
  title,
  subtitle,
  titleContainerStyle,
  children,
}) => {
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        scrollEnabled={true}
        style={{
          flex: 1,
          backgroundColor: COLORS.white,
          // borderTopColor: colors.SHADOW,
          // borderTopWidth: 1,
        }}
        enableAutomaticScroll={true}
        keyboardDismissMode="on-drag"
        enableOnAndroid={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flex: 1,
          paddingHorizontal: SIZES.padding,
        }}>
        {/* App Icon */}
        <View style={{ alignItems: 'center' }}>
          <Image
            source={images.logo_02}
            resizeMode="contain"
            style={styles.logo}
          />
        </View>
        {/* Title & Subtitle */}
        <View style={{ marginTop: SIZES.padding, ...titleContainerStyle }}>
          <Text style={{ textAlign: 'center', ...FONTS.h2, color: 'black' }}>
            {title}
          </Text>
          <Text
            style={{
              textAlign: 'center',
              color: COLORS.darkGray,
              marginTop: SIZES.base,
              ...FONTS.body3,
            }}>
            {subtitle}
          </Text>
        </View>
        {/* Content / Children */}
        {children}
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingVertical: SIZES.padding,
    paddingTop: SIZES.padding,
    backgroundColor: COLORS.white,
    // backgroundColor: 'red',
  },
  logo: {
    height: 100,
    width: 200,
  },
});

export default AuthLayout;
