import React, { FunctionComponent, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { MainParamType } from '../../navigation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SwipeListView } from 'react-native-swipe-list-view';
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
  CardItem,
} from '../../components';

type MyCardProps = StackScreenProps<MainParamType, 'MyCard'>;

const MyCard: FunctionComponent<MyCardProps> = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const [selectedCard, setSelectedCard] = useState<null>(null);

  const renderHeader = () => {
    return (
      <HeaderNavigation
        title="My Cards"
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
            onPress={() => navigation.goBack()}
          />
        }
        rightComponent={<View style={{ width: 40 }} />}
      />
    );
  };

  const renderMyCards = () => {
    return (
      <View>
        {dummyData.myCards.map((item, index) => {
          return (
            <CardItem
              key={`MyCards-${index}`}
              item={item}
              isSelected={
                `${selectedCard?.key}-${selectedCard?.id}` ===
                `MyCard-${item.id}`
              }
              onPress={() => setSelectedCard({ ...item, key: 'MyCard' })}
            />
          );
        })}
      </View>
    );
  };

  const renderAddNewCard = () => {
    return (
      <View style={{ marginTop: SIZES.padding }}>
        <Text style={{ ...FONTS.h3, color: COLORS.black }}>Add New Card</Text>
        {dummyData.allCards.map(item => {
          return (
            <CardItem
              key={`NewCard-${item.id}`}
              item={item}
              isSelected={
                `${selectedCard?.key}-${selectedCard?.id}` ===
                `NewCard-${item.id}`
              }
              onPress={() => setSelectedCard({ ...item, key: 'NewCard' })}
            />
          );
        })}
      </View>
    );
  };

  const renderFooter = () => {
    return (
      <View
        style={{
          paddingTop: SIZES.radius,
          paddingBottom: SIZES.padding,
          paddingHorizontal: SIZES.padding,
        }}>
        <TextButton
          disabled={selectedCard === null}
          buttonContainerStyle={{
            height: 60,
            borderRadius: SIZES.radius,
            backgroundColor:
              selectedCard === null ? COLORS.gray : COLORS.primary,
          }}
          label={selectedCard?.key === 'NewCard' ? 'Add' : 'Place your Order'}
          onPress={() => {
            if (selectedCard?.key === 'NewCard') {
              navigation.navigate('AddCard', {
                selectedCard,
              });
            } else {
              navigation.navigate('Checkout', { selectedCard });
            }
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      {renderHeader()}
      {/* Cards */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          marginTop: SIZES.radius,
          paddingHorizontal: SIZES.padding,
          paddingBottom: SIZES.radius,
        }}>
        {/* My Cards */}
        {renderMyCards()}
        {/* Add New Card */}
        {renderAddNewCard()}
      </ScrollView>
      {/* Footer */}
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
});

export default MyCard;
