import React, { FunctionComponent, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AuthLayout from './AuthLayout';

import { StackScreenProps } from '@react-navigation/stack';
import { MainParamType } from '../../navigation';
import { FONTS, SIZES, COLORS, icons } from '../../constants';
import {
  FormInput,
  CustomSwitch,
  TextButton,
  TextIconButton,
} from '../../components';
import { utils } from '../../utils';

type SignUpProps = StackScreenProps<MainParamType, 'SignUp'>;

const SignUp: FunctionComponent<SignUpProps> = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const [saveMe, setSaveMe] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [usernameError, setUserNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const isEnableSignUp = () => {
    return (
      email !== '' &&
      password !== '' &&
      username !== '' &&
      emailError === '' &&
      passwordError === '' &&
      usernameError === ''
    );
  };

  return (
    <AuthLayout
      title="Getting Started"
      subtitle="Create an account to continue!"
      titleContainerStyle={{
        marginTop: SIZES.radius,
      }}>
      {/* Form Input And Sign Up */}
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
          label="User Name"
          keyboardType="default"
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          autoComplete="username"
          onChange={value => {
            //validate email
            // utils.validateEmail(value, setEmailError);
            setUserName(value);
          }}
          errorMsg={usernameError}
          appendComponent={
            <View style={styles.appendComponentEmail}>
              <Image
                source={
                  username == '' || (username != '' && usernameError == '')
                    ? icons.correct
                    : icons.cancel
                }
                style={[
                  styles.imageCorrect,
                  {
                    tintColor:
                      username == ''
                        ? COLORS.gray
                        : username != '' && usernameError == ''
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
            utils.validatePassword(value, setPasswordError);
            setPassword(value);
          }}
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          secureTextEntry={!showPassword}
          errorMsg={passwordError}
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
        {/* Sign Up */}
        <TextButton
          label="Sign Up"
          disabled={isEnableSignUp() ? false : true}
          buttonContainerStyle={{
            height: 55,
            alignItems: 'center',
            marginTop: SIZES.padding,
            borderRadius: SIZES.radius,
            backgroundColor: isEnableSignUp()
              ? COLORS.primary
              : COLORS.transparentPrimary,
          }}
          onPress={() => navigation.navigate('OTP')}
        />
        {/* Sign Up */}

        {/* <TextButton
          label=" Sign Up"
          buttonContainerStyle={{
            backgroundColor: null,
          }}
          labelStyle={{
            color: COLORS.primary,
            ...FONTS.h3,
          }}
          onPress={() => navigation.navigate('OTP')}
        /> */}

        {/* Footer */}
        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.radius,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: COLORS.darkGray,
              ...FONTS.body3,
            }}>
            Already have an account?
          </Text>
          <TextButton
            label=" Sing In"
            buttonContainerStyle={{
              backgroundColor: null,
            }}
            labelStyle={{
              color: COLORS.primary,
              ...FONTS.h3,
            }}
            onPress={() => navigation.goBack()}
          />
        </View>
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
            marginTop: SIZES.base * 2,
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
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: SIZES.padding,
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
    height: 60,
    alignItems: 'center',
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.blue,
    // marginTop: SIZES.base,
    marginTop: SIZES.base * 2,
  },
});

export default SignUp;
