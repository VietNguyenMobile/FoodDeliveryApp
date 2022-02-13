import React, { FunctionComponent, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MainParamType } from '../../navigation';
import { StackScreenProps } from '@react-navigation/stack';
import {
  FONTS,
  COLORS,
  constants,
  SIZES,
  images,
  dummyData,
  icons,
} from '../../constants';
import {
  HeaderNavigation,
  IconButton,
  CartQuantityButton,
  IconLabel,
  TextButton,
  LineDivider,
  Rating,
  StepperInput,
  FooterTotal,
} from '../../components';

type FoodDetailProps = StackScreenProps<MainParamType, 'FoodDetail'>;

const FoodDetail: FunctionComponent<FoodDetailProps> = ({
  navigation,
  route,
}) => {
  const insets = useSafeAreaInsets();

  const [foodItem, setFoodItem] = useState(dummyData.vegBiryani);
  const [selectedSize, setSelectedSize] = useState('');
  const [qty, setQty] = useState(1);

  const renderHeader = () => {
    console.log('insets.top: ', insets.top);
    return (
      <HeaderNavigation
        title="DETAILS"
        containerStyle={{
          height: 50,
          marginHorizontal: SIZES.padding,
          marginTop: insets.top,
        }}
        titleStyle={{}}
        leftComponent={
          <IconButton
            icon={icons.back}
            containerStyle={styles.leftIconButton}
            iconStyle={{
              width: 16,
              height: 20,
              ...Platform.select({
                android: { marginRight: 4 },
              }),
              tintColor: COLORS.gray2,
            }}
            onPress={() => navigation.navigate('Home')}
          />
        }
        rightComponent={<CartQuantityButton quantity={3} />}
      />
    );
  };

  const renderDetails = () => {
    return (
      <View style={styles.details}>
        {/* Food Card */}
        <View style={styles.foodCard}>
          {/* Calories &  Favourite*/}
          <View style={styles.caloriesAndFavourite}>
            {/* Calories */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={icons.calories}
                style={{ height: 30, width: 30 }}
              />
              <Text
                style={{
                  color: COLORS.darkGray2,
                  ...FONTS.body4,
                  ...Platform.select({
                    android: { marginBottom: 4 },
                  }),
                }}>
                {foodItem?.calories} calories
              </Text>
            </View>
            {/* Favourite */}
            <Image
              source={icons.love}
              style={{
                width: 20,
                height: 20,
                tintColor: foodItem?.isFavourite ? COLORS.primary : COLORS.gray,
              }}
            />
          </View>
          {/* Food Image */}
          <Image
            source={foodItem?.image}
            resizeMode="contain"
            style={{ height: 170, width: '100%' }}
          />
        </View>
        {/* Food Info */}
        <View style={{ marginTop: SIZES.padding }}>
          {/* Name & description */}
          <Text style={{ ...FONTS.h1, color: COLORS.black }}>
            {foodItem?.name}
          </Text>
          <Text style={styles.foodItemDescription}>
            {foodItem?.description}
          </Text>
          {/* Ratings, Duration & Shipping */}
          <View style={styles.ratingsView}>
            {/* Ratings */}
            <IconLabel
              containerStyle={{ backgroundColor: COLORS.primary }}
              icon={icons.star}
              label="4.5"
              labelStyle={{ color: COLORS.white }}
            />
            {/* Duration */}
            <IconLabel
              containerStyle={{
                marginLeft: SIZES.radius,
                paddingHorizontal: 0,
              }}
              icon={icons.clock}
              label="30 Mins"
              iconStyle={{ tintColor: COLORS.black }}
              labelStyle={{ color: COLORS.black }}
            />
            {/* Shipping */}
            <IconLabel
              containerStyle={{
                marginLeft: SIZES.radius,
                paddingHorizontal: 0,
              }}
              icon={icons.dollar}
              label="Free Shipping"
              iconStyle={{ tintColor: COLORS.black }}
              labelStyle={{ color: COLORS.black }}
            />
          </View>
          {/* Sizes */}
          <View style={styles.sizeView}>
            <Text style={{ ...FONTS.h3, color: COLORS.black }}>Sizes:</Text>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginLeft: SIZES.padding,
              }}>
              {dummyData.sizes.map((item, index) => {
                return (
                  <TextButton
                    key={`Sizes-${index}`}
                    buttonContainerStyle={{
                      ...styles.containerSize,
                      borderColor:
                        selectedSize === item.id.toString()
                          ? COLORS.primary
                          : COLORS.gray2,
                      backgroundColor:
                        selectedSize === item.id.toString()
                          ? COLORS.primary
                          : 'transparent',
                    }}
                    label={item.label}
                    labelStyle={{
                      color:
                        selectedSize === item.id.toString()
                          ? COLORS.white
                          : COLORS.gray2,
                      ...FONTS.body2,
                    }}
                    onPress={() => setSelectedSize(item.id.toString())}
                  />
                );
              })}
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderRestaurant = () => {
    return (
      <View style={[styles.restaurant]}>
        <Image
          source={images.profile}
          style={{ width: 50, height: 50, borderRadius: SIZES.radius }}
        />
        {/* Info */}
        <View
          style={{
            flex: 1,
            marginLeft: SIZES.radius,
            justifyContent: 'center',
          }}>
          <Text style={{ ...FONTS.h3, color: COLORS.black }}>
            Mountain Retreat
          </Text>
          <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>
            1.2 KM away from you
          </Text>
        </View>
        <Rating rating={4} iconStyle={{ marginLeft: 3 }} />
      </View>
    );
  };

  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        {/* Stepper Input */}
        <StepperInput
          value={qty}
          onAdd={() => setQty(qty + 1)}
          onMinus={() => {
            if (qty > 1) {
              setQty(qty - 1);
            }
          }}
          containerStyle={{}}
        />
        {/* Text Button */}
        <TextButton
          buttonContainerStyle={{
            flex: 1,
            flexDirection: 'row',
            height: 60,
            marginLeft: SIZES.radius,
            paddingHorizontal: SIZES.radius,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.primary,
          }}
          label="Buy Now"
          labelStyle={{}}
          label2={`$${15.99}`}
          labelStyle2={{ color: COLORS.white }}
          onPress={() => navigation.navigate('MyCart')}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      {renderHeader()}
      {/* Body */}
      <ScrollView
      // style={{ flex: 1 }}
      >
        {/* Food Detail */}
        {renderDetails()}
        <LineDivider />
        {/* Restaurant */}
        {renderRestaurant()}
      </ScrollView>
      {/* Footer */}
      <LineDivider />
      {renderFooter()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  leftIconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: SIZES.radius,
    borderColor: COLORS.gray2,
  },
  details: {
    marginTop: SIZES.radius,
    marginBottom: SIZES.padding,
    paddingHorizontal: SIZES.padding,
  },
  foodCard: {
    height: 190,
    borderRadius: 15,
    backgroundColor: COLORS.lightGray2,
  },
  caloriesAndFavourite: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SIZES.base,
    paddingHorizontal: SIZES.radius,
  },
  foodItemDescription: {
    marginTop: SIZES.base,
    color: COLORS.darkGray,
    textAlign: 'justify',
    ...FONTS.body3,
  },
  ratingsView: {
    flexDirection: 'row',
    marginTop: SIZES.padding,
  },
  sizeView: {
    flexDirection: 'row',
    marginTop: SIZES.padding,
    alignItems: 'center',
  },
  containerSize: {
    width: 55,
    height: 55,
    margin: SIZES.base,
    borderWidth: 1,
    borderRadius: SIZES.radius,
    borderColor: COLORS.gray2,
    backgroundColor: 'transparent',
  },
  restaurant: {
    flexDirection: 'row',
    marginVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding,
    alignItems: 'center',
  },
  footer: {
    flexDirection: 'row',
    height: 120,
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
    paddingBottom: SIZES.radius,
  },
});

export default FoodDetail;
