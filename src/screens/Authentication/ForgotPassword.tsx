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

type ForgotPasswordProps = StackScreenProps<MainParamType, 'ForgotPassword'>;

const ForgotPassword: FunctionComponent<ForgotPasswordProps> = ({
  navigation,
  route,
}) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const insets = useSafeAreaInsets();

  const isEnableSendEmail = () => {
    return email !== '' && emailError === '';
  };

  return (
    <AuthLayout
      title="Password Recovery"
      subtitle="Please enter your email address to recover your password"
      titleContainerStyle={{
        marginTop: SIZES.padding * 2,
      }}>
      {/* Form Input */}
      <View style={styles.container}>
        <FormInput
          label="Email"
          keyboardType="email-address"
          autoComplete="email"
          onChange={value => {
            //validate email
            utils.validateEmail(value, setEmailError);
            setEmail(value);
          }}
          errorMsg={emailError}
          appendComponent={
            <View style={{ justifyContent: 'center' }}>
              <Image
                source={
                  email == '' || (email != '' && emailError == '')
                    ? icons.correct
                    : icons.cancel
                }
                style={[
                  styles.imageCorrect,
                  {
                    tintColor:
                      email == ''
                        ? COLORS.gray
                        : email != '' && emailError == ''
                        ? COLORS.green
                        : COLORS.red,
                  },
                ]}
              />
            </View>
          }
        />
      </View>

      {/* Button */}
      <TextButton
        label="Send Email"
        buttonContainerStyle={{
          ...styles.continueBtn,
          marginBottom: insets.bottom,
          backgroundColor: isEnableSendEmail()
            ? COLORS.primary
            : COLORS.transparentPrimary,
        }}
        disabled={isEnableSendEmail() ? false : true}
        onPress={() => navigation.goBack()}
      />
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: SIZES.padding * 2,
  },
  imageCorrect: {
    height: 20,
    width: 20,
  },
  continueBtn: {
    height: 60,
    alignItems: 'center',
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.primary,
    marginTop: SIZES.padding,
  },
});

export default ForgotPassword;
