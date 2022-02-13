import React, { FunctionComponent } from 'react';
import {
  View,
  Text,
  ViewStyle,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import { COLORS, FONTS, icons, SIZES } from '../constants';

// id: 1,
//     name: 'Master Card',
//     icon: require('../assets/icons/mastercard.png'),
//     card_no: '1234',

type CardItemProps = {
  item: {
    name: string;
    id: number;
    icon: string;
    card_no: string;
  };
  isSelected: boolean;
  key: string;
  onPress: () => void;
};

const CardItem: FunctionComponent<CardItemProps> = ({
  item,
  isSelected,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        borderColor: isSelected ? COLORS.primary : COLORS.lightGray2,
      }}
      onPress={onPress}>
      {/* Card Image */}
      <View>
        <Image
          source={item.icon}
          resizeMode="center"
          style={{
            width: 35,
            height: 35,
          }}
        />
      </View>
      {/* Name */}
      <Text style={styles.name}>{item.name}</Text>
      {/* Radio Button */}
      <Image
        source={isSelected ? icons.check_on : icons.check_off}
        style={{
          width: 25,
          height: 25,
        }}
      />
    </TouchableOpacity>
  );
};

export default CardItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 100,
    alignItems: 'center',
    marginTop: SIZES.radius,
    paddingHorizontal: SIZES.padding,
    borderWidth: 2,
    borderRadius: SIZES.radius,
  },
  imageContainer: {
    width: 60,
  },
  name: {
    flex: 1,
    marginLeft: SIZES.radius,
    ...FONTS.h3,
    color: COLORS.black,
  },
});
