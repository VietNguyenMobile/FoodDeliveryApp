import React, { FunctionComponent, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AuthLayout from './AuthLayout';

import { StackScreenProps } from '@react-navigation/stack';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { MainParamType } from '../../navigation';
import { FONTS, SIZES, COLORS, icons } from '../../constants';
import {
  FormInput,
  CustomSwitch,
  TextButton,
  TextIconButton,
} from '../../components';
import { utils } from '../../utils';
import { color } from 'react-native-reanimated';

type OTPProps = StackScreenProps<MainParamType, 'OTP'>;

const Otp: FunctionComponent<OTPProps> = ({ navigation, route }) => {
  const [timer, setTimer] = useState(60);

  const insets = useSafeAreaInsets();

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer > 0) {
          return prevTimer - 1;
        } else {
          return prevTimer;
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AuthLayout
      title="OTP Authentication"
      subtitle="An authentication code has been sent to quocviet.ce@gmail.com"
      titleContainerStyle={{
        marginTop: SIZES.padding * 2,
        // marginBottom: 50
      }}>
      {/* OTP inputs */}
      <View style={styles.containerOTP}>
        <OTPInputView
          pinCount={4}
          style={{ height: 50, width: '100%' }}
          codeInputFieldStyle={styles.codeInputFieldStyle}
          onCodeFilled={code => {
            console.log('code: ', code);
          }}
        />
        {/* Countdown Timer */}
        <View style={styles.countdownTimer}>
          <Text style={{ color: COLORS.darkGray, ...FONTS.body3 }}>
            Didn't receive code?
          </Text>
          <TextButton
            label={`Resend (${timer}s)`}
            disabled={timer === 0 ? false : true}
            buttonContainerStyle={{
              marginLeft: SIZES.base,
              backgroundColor: null,
            }}
            labelStyle={{
              color: COLORS.primary,
              ...FONTS.h3,
            }}
            onPress={() => setTimer(60)}
          />
        </View>
      </View>
      {/* Footer */}
      <View style={{ marginBottom: insets.bottom }}>
        <TextButton
          label="Continue"
          buttonContainerStyle={{
            ...styles.continueBtn,
          }}
          onPress={() => console.log('Continue')}
        />
        <View style={{ marginTop: SIZES.padding, alignItems: 'center' }}>
          <Text style={{ color: COLORS.darkGray, ...FONTS.body3 }}>
            By signing up, you agree to our.
          </Text>
          <TextButton
            label="Terms and Conditions"
            buttonContainerStyle={{
              backgroundColor: null,
            }}
            labelStyle={{
              color: COLORS.primary,
              ...FONTS.body3,
            }}
            onPress={() => console.log('TnC')}
          />
        </View>
      </View>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  containerOTP: {
    flex: 1,
    marginTop: SIZES.padding * 2,
  },
  codeInputFieldStyle: {
    width: 65,
    height: 65,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.lightGray2,
    color: COLORS.black,
    ...FONTS.h3,
  },
  countdownTimer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SIZES.padding,
  },
  continueBtn: {
    height: 60,
    alignItems: 'center',
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.primary,
  },
});

export default Otp;
