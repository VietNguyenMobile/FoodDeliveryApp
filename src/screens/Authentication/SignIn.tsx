import React, { FunctionComponent, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AuthLayout from './AuthLayout';

import { StackScreenProps } from '@react-navigation/stack';
import { MainParamType } from '../../navigation';
import { FONTS, SIZES, COLORS, icons } from '../../constants';
import { FormInput } from '../../components';
import { utils } from '../../utils';

export type SignInProps = StackScreenProps<MainParamType, 'SignIn'>;

const SignIn: FunctionComponent<SignInProps> = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  return (
    <AuthLayout
      title="Let's Sign You In"
      subtitle="Welcome back, you've been missed">
      <View style={styles.container}>
        {/* Form Inputs */}
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
            <View style={styles.appendComponentEmail}>
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

        <FormInput
          label="Password"
          autoComplete="password"
          onChange={value => {
            setPassword(value);
          }}
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          secureTextEntry={!showPassword}
          appendComponent={
            <TouchableOpacity
              style={styles.appendComponentPassword}
              onPress={() => setShowPassword(!showPassword)}>
              <Image
                source={showPassword ? icons.eye_close : icons.eye}
                style={{ height: 20, width: 20, tintColor: COLORS.gray }}
              />
            </TouchableOpacity>
          }
        />
        {/* Save me & Forgot Password */}
        {/* Sign In */}
        {/* Sign Up */}
      </View>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: SIZES.padding * 2,
  },
  appendComponentEmail: {
    justifyContent: 'center',
    // borderWidth: 1
  },
  imageCorrect: {
    height: 20,
    width: 20,
    // tintColor: COLORS.green,
  },
  appendComponentPassword: {
    // width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
  },
});

export default SignIn;
