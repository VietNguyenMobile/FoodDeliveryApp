import React, { FunctionComponent } from 'react';
import {
  View,
  Text,
  Image,
  ViewStyle,
  ImageStyle,
  TouchableOpacity,
  StyleSheet,
  ImageSourcePropType,
} from 'react-native';
import { COLORS, FONTS, SIZES, icons } from '../constants';

type HorizontalFoodCardProps = {
  containerStyle: ViewStyle;
  imageStyle: ImageStyle;
  item: {
    id: number;
    name: string;
    description: string;
    categories: Array<number>;
    price: number;
    calories: number;
    isFavourite: boolean;
    image: ImageSourcePropType;
  };

  onPress: () => {};
};

const HorizontalFoodCard: FunctionComponent<HorizontalFoodCardProps> = ({
  containerStyle,
  imageStyle,
  item,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightGray2,
        ...containerStyle,
      }}>
      {/* Image */}
      <Image source={item.image} style={imageStyle} />
      {/* Info */}
      <View style={{ flex: 1 }}>
        {/* Name */}
        <Text style={styles.name}>{item.name}</Text>
        {/* Description */}
        <Text style={styles.description}>{item.description}</Text>
        {/* Price */}
        <Text style={styles.price}>${item.price}</Text>
      </View>
      {/* Calories */}
      <View style={styles.calories}>
        <Image source={icons.calories} style={styles.imageCalories} />
        <Text style={styles.textCalories}>{item.calories} Calories</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  name: {
    ...FONTS.h3,
    fontSize: 17,
    color: 'black',
  },
  description: {
    color: COLORS.darkGray2,
    ...FONTS.body4,
  },
  price: {
    marginTop: SIZES.base,
    ...FONTS.h2,
    color: 'black',
  },
  calories: {
    flexDirection: 'row',
    position: 'absolute',
    top: 5,
    right: SIZES.radius,
  },
  imageCalories: {
    width: 30,
    height: 30,
  },
  textCalories: {
    color: COLORS.darkGray2,
    ...FONTS.body5,
  },
});

export default HorizontalFoodCard;
