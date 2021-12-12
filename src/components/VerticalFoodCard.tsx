import React, { FunctionComponent } from 'react';
import {
  View,
  Text,
  Image,
  ViewStyle,
  ImageStyle,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { COLORS, FONTS, SIZES, icons } from '../constants';

type VerticalFoodCardProps = {
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
    image: string;
  };

  onPress: () => {};
};

const VerticalFoodCard: FunctionComponent<VerticalFoodCardProps> = ({
  containerStyle,
  imageStyle,
  item,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        // flexDirection: 'row',
        width: 200,
        padding: SIZES.radius,
        alignItems: 'center',
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightGray2,
        ...containerStyle,
      }}>
      {/* Calories and Favourite */}
      <View style={styles.caloriesAndFavourite}>
        {/* Calories */}
        <View style={styles.calories}>
          <Image source={icons.calories} style={styles.imageCalories} />
          <Text style={styles.textCalories}>{item.calories} Calories</Text>
        </View>
        {/* Favourite */}
        <Image
          source={icons.love}
          style={{
            width: 20,
            height: 20,
            tintColor: item.isFavourite ? COLORS.primary : COLORS.gray,
          }}
        />
      </View>
      {/* Image */}
      <View
        style={{
          height: 150,
          width: 150,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={item.image}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </View>

      {/* Info */}
      <View style={{ marginTop: -20, alignItems: 'center' }}>
        {/* Name */}
        <Text style={styles.name}>{item.name}</Text>
        {/* Description */}
        <Text style={styles.description}>{item.description}</Text>
        {/* Price */}
        <Text style={styles.price}>${item.price}</Text>
      </View>

      {/* Info */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  caloriesAndFavourite: {
    flexDirection: 'row',
    // borderWidth: 1,
  },
  calories: {
    flex: 1,
    flexDirection: 'row',
  },
  imageCalories: {
    width: 30,
    height: 30,
  },
  name: {
    ...FONTS.h3,
    // fontSize: 17,
  },
  description: {
    color: COLORS.darkGray2,
    textAlign: 'center',
    ...FONTS.body5,
  },
  price: {
    marginTop: SIZES.radius,
    ...FONTS.h2,
  },

  textCalories: {
    color: COLORS.darkGray2,
    ...FONTS.body5,
  },
});

export default VerticalFoodCard;
