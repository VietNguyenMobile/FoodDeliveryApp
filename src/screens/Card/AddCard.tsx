import React, { FunctionComponent, useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Platform,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { MainParamType } from '../../navigation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
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
  FormInput,
  FormInputCheck,
  RadioButton,
} from '../../components';
import { utils } from '../../utils';

type AddCardProps = StackScreenProps<MainParamType, 'AddCard'>;

const AddCard: FunctionComponent<AddCardProps> = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const [selectedCard, setSelectedCard] = useState<null>(null);
  const [cardNumber, setCardNumber] = useState('');
  const [cardNumberError, setCardNumberError] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNameError, setCardNameError] = useState('');
  const [expireDate, setExpireDate] = useState('');
  const [expireDateError, setExpireDateError] = useState('');
  const [cvv, setCvv] = useState('');
  const [cvvError, setCvvError] = useState('');
  const [isRemember, setIsRemember] = useState(false);

  useEffect(() => {
    let { selectedCard } = route.params;
    setSelectedCard(selectedCard);
    console.log('selectedCard: ', selectedCard);
  }, []);

  const renderHeader = () => {
    return (
      <HeaderNavigation
        title="ADD NEW CARD"
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

  const renderCard = () => {
    return (
      <ImageBackground
        source={images.card}
        style={{
          height: 200,
          width: '100%',
          marginTop: SIZES.radius,
          borderRadius: SIZES.radius,
          overflow: 'hidden',
        }}>
        {/* Logo */}
        <Image
          source={selectedCard?.icon}
          resizeMode="contain"
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            height: 40,
            width: 80,
          }}
        />
        {/* Details */}
        <View style={styles.details}>
          <Text style={{ ...FONTS.h3, color: COLORS.white }}>{cardName}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ flex: 1, color: COLORS.white, ...FONTS.body3 }}>
              {cardNumber}
            </Text>
            <Text style={{ color: COLORS.white, ...FONTS.body3 }}>
              {expireDate}
            </Text>
          </View>
        </View>
      </ImageBackground>
    );
  };

  const isEnableAddCard = () => {
    return Boolean(
      cardNumber !== '' &&
        cardName !== '' &&
        expireDate !== '' &&
        cvv !== '' &&
        cardNumberError === '' &&
        cardNameError === '' &&
        expireDateError === '' &&
        cvvError === '',
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
          disabled={!isEnableAddCard()}
          buttonContainerStyle={{
            height: 60,
            borderRadius: SIZES.radius,
            backgroundColor: isEnableAddCard()
              ? COLORS.primary
              : COLORS.transparentPrimary,
          }}
          label={'Add Card'}
          onPress={() => {
            // navigation.goBack();
            navigation.navigate('Checkout', { selectedCard });
          }}
        />
      </View>
    );
  };

  const renderForms = () => {
    return (
      <View style={{ marginTop: SIZES.padding * 2 }}>
        {/* Card Number */}
        <FormInput
          label="Card Number"
          keyboardType="number-pad"
          value={cardNumber}
          onChange={value => {
            setCardNumber(
              value
                .replace(/\s/g, '')
                .replace(/(\d{4})/g, '$1 ')
                .trim(),
            );
            utils.validateInput(
              value,
              Platform.OS === 'android' ? 16 : 19,
              setCardNumberError,
            );
          }}
          maxLength={Platform.OS === 'android' ? 16 : 19}
          errorMsg={cardNumberError}
          appendComponent={
            <FormInputCheck value={cardNumber} error={cardNumberError} />
          }
        />
        {/* Cardholder Name */}
        <FormInput
          label="Cardholder Name"
          value={cardName}
          containerStyle={{ marginTop: SIZES.radius }}
          onChange={value => {
            utils.validateInput(value, 1, setCardNameError);
            setCardName(value);
          }}
          errorMsg={cardNameError}
          appendComponent={
            <FormInputCheck value={cardName} error={cardNumberError} />
          }
        />
        {/* Expire Date & CVV */}
        <View style={{ flexDirection: 'row', marginTop: SIZES.radius }}>
          <FormInput
            label="Expire Date"
            value={expireDate}
            placeholder={'MM/YY'}
            maxLength={5}
            containerStyle={{
              flex: 1,
            }}
            onChange={value => {
              utils.validateInput(value, 5, setExpireDateError);
              setExpireDate(value);
            }}
            appendComponent={
              <FormInputCheck value={expireDate} error={expireDateError} />
            }
          />
          <FormInput
            label="CVV"
            value={cvv}
            // placeholder={'123'}
            keyboardType="number-pad"
            maxLength={3}
            containerStyle={{
              flex: 1,
              marginLeft: SIZES.radius,
            }}
            onChange={value => {
              utils.validateInput(value, 3, setCvvError);
              setCvv(value);
            }}
            appendComponent={<FormInputCheck value={cvv} error={cvvError} />}
          />
        </View>
        {/* Remember */}
        <View style={{ alignItems: 'flex-start', marginTop: SIZES.padding }}>
          <RadioButton
            isSelected={isRemember}
            onPress={() => setIsRemember(!isRemember)}
            label="Remember this card details."
          />
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      {renderHeader()}
      {/* Cards */}
      <KeyboardAwareScrollView
        keyboardDismissMode="on-drag"
        contentContainerStyle={{
          flexGrow: 1,
          // marginTop: SIZES.radius,
          paddingHorizontal: SIZES.padding,
          // paddingBottom: SIZES.radius,
        }}>
        {/* Card */}
        {renderCard()}
        {/* Forms */}
        {renderForms()}
      </KeyboardAwareScrollView>
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
  details: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    paddingHorizontal: SIZES.padding,
  },
});

export default AddCard;
