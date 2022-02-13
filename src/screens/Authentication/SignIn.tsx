import React, { FunctionComponent, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AuthLayout from './AuthLayout';

import { StackScreenProps } from '@react-navigation/stack';
import { AuthParamType } from '../../navigation';
import { FONTS, SIZES, COLORS, icons } from '../../constants';
import {
  FormInput,
  CustomSwitch,
  TextButton,
  TextIconButton,
} from '../../components';
import { utils } from '../../utils';

type SignInProps = StackScreenProps<AuthParamType, 'SignIn'>;

const SignIn: FunctionComponent<SignInProps> = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [saveMe, setSaveMe] = useState(false);

  const isEnableSignIn = () => {
    return email !== '' && password !== '' && emailError === '';
  };

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
        <View style={styles.row}>
          <CustomSwitch value={saveMe} onChange={value => setSaveMe(value)} />
          <TextButton
            label="Forgot Password?"
            buttonContainerStyle={{ backgroundColor: null }}
            labelStyle={{ color: COLORS.gray, ...FONTS.body4 }}
            onPress={() => navigation.navigate('ForgotPassword')}
          />
        </View>
        {/* Sign In */}
        <TextButton
          label="Sign In"
          disabled={isEnableSignIn() ? false : true}
          buttonContainerStyle={{
            height: 55,
            alignItems: 'center',
            marginTop: SIZES.padding,
            borderRadius: SIZES.radius,
            backgroundColor: isEnableSignIn()
              ? COLORS.primary
              : COLORS.transparentPrimary,
          }}
          onPress={() => navigation.navigate('Main')}
        />
        {/* Sign Up */}
        <View style={styles.rowSignUp}>
          <Text
            style={{
              color: COLORS.darkGray,
              ...FONTS.body3,
            }}>
            Don't have an account?
          </Text>
          <TextButton
            label=" Sign Up"
            buttonContainerStyle={{
              backgroundColor: null,
            }}
            labelStyle={{
              color: COLORS.primary,
              ...FONTS.h3,
            }}
            onPress={() => navigation.navigate('SignUp')}
          />
        </View>
        {/* Footer */}
        <View>
          {/* Facebook */}
          <TextIconButton
            containerStyle={styles.facebook}
            icon={icons.fb}
            iconPosition="LEFT"
            iconStyle={{
              tintColor: COLORS.white,
            }}
            label="Continue With Facebook"
            labelStyle={{
              marginLeft: SIZES.radius,
              color: COLORS.white,
            }}
            onPress={() => console.log('FB')}
          />
          {/* Google */}
          <TextIconButton
            containerStyle={{
              ...styles.facebook,
              backgroundColor: COLORS.lightGray2,
              marginTop: SIZES.base,
            }}
            icon={icons.google}
            iconPosition="LEFT"
            iconStyle={{
              tintColor: null,
            }}
            label="Continue With Google"
            labelStyle={{
              marginLeft: SIZES.radius,
              color: COLORS.black,
            }}
            onPress={() => console.log('Google')}
          />
        </View>
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
  row: {
    flexDirection: 'row',
    marginTop: SIZES.radius,
    justifyContent: 'space-between',
  },
  rowSignUp: {
    flexDirection: 'row',
    marginTop: SIZES.radius,
    justifyContent: 'center',
  },
  facebook: {
    height: 50,
    alignItems: 'center',
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.blue,
    marginTop: SIZES.base,
  },
});

export default SignIn;
