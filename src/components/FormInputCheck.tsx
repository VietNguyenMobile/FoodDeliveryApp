import { View, Text, Image } from 'react-native';
import React, { FunctionComponent } from 'react';
import { COLORS, icons } from '../constants';

type FormInputCheckProps = {
  value: string;
  error: string;
};

const FormInputCheck: FunctionComponent<FormInputCheckProps> = ({
  value,
  error,
}) => {
  return (
    <View style={{ justifyContent: 'center' }}>
      <Image
        source={
          value === '' || (value !== '' && error === '')
            ? icons.correct
            : icons.cancel
        }
        style={{
          height: 20,
          width: 20,
          tintColor:
            value === ''
              ? COLORS.gray
              : value !== '' && error === ''
              ? COLORS.green
              : COLORS.red,
        }}
      />
    </View>
  );
};

export default FormInputCheck;
