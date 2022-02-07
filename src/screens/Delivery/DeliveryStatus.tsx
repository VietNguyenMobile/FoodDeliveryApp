import {
  View,
  Text,
  BackHandler,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, { FunctionComponent, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
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
  TextIconButton,
} from '../../components';

type DeliveryStatusProps = StackScreenProps<MainParamType, 'DeliveryStatus'>;

const DeliveryStatus: FunctionComponent<DeliveryStatusProps> = ({
  navigation,
  route,
}) => {
  const insets = useSafeAreaInsets();

  const [currentStep, setCurrentStep] = useState(2);

  const renderHeader = () => {
    return (
      <HeaderNavigation
        title="DELIVERY STATUS"
        containerStyle={{
          height: 50,
          // marginHorizontal: SIZES.padding,
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

        // rightComponent={<CartQuantityButton quantity={3} />}
      />
    );
  };

  const renderInfo = () => {
    return (
      <View
        style={{ marginTop: SIZES.radius, paddingHorizontal: SIZES.padding }}>
        <Text
          style={{ textAlign: 'center', color: COLORS.gray, ...FONTS.body4 }}>
          Estimated Delivery
        </Text>

        <Text style={{ textAlign: 'center', ...FONTS.h2, color: COLORS.black }}>
          21 Sep 2021 / 12:30PM
        </Text>
      </View>
    );
  };

  const renderTrackOrder = () => {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          paddingVertical: SIZES.padding,
          borderRadius: SIZES.radius,
          borderWidth: 2,
          borderColor: COLORS.lightGray2,
          backgroundColor: COLORS.white2,
          // backgroundColor: 'red',
        }}>
        {/* Tracking Order */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 20,
            paddingHorizontal: SIZES.padding,
          }}>
          <Text style={{ ...FONTS.h3, color: COLORS.black }}>Track Order</Text>
          <Text style={{ color: COLORS.gray, ...FONTS.body3 }}>NY012345</Text>
        </View>
        <LineDivider
        // lineStyle={{
        //   // marginHorizontal: SIZES.padding,
        //   backgroundColor: 'red',
        //   marginLeft: SIZES.padding,
        //   marginRight: SIZES.padding,
        //   width: '86%',
        // }}
        />
        {/* Status */}
        <View
          style={{
            marginTop: SIZES.padding,
            paddingHorizontal: SIZES.padding,
          }}>
          {constants.track_order_status.map((item, index) => {
            return (
              <View key={`StatusList-${index}`} style={{}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: -5,
                  }}>
                  <Image
                    source={icons.check_circle}
                    style={{
                      width: 40,
                      height: 40,
                      tintColor:
                        index <= currentStep
                          ? COLORS.primary
                          : COLORS.lightGray1,
                    }}
                  />
                  <View style={{ marginLeft: SIZES.radius }}>
                    <Text style={{ ...FONTS.h3, color: COLORS.black }}>
                      {item.title}
                    </Text>
                    <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>
                      {item.sub_title}
                    </Text>
                  </View>
                </View>
                {index < constants.track_order_status.length - 1 && (
                  <View>
                    {index < currentStep && (
                      <View
                        style={{
                          height: 50,
                          width: 3,
                          marginLeft: 18,
                          backgroundColor: COLORS.primary,
                          zIndex: -1,
                        }}
                      />
                    )}
                    {index >= currentStep && (
                      <Image
                        source={icons.dotted_line}
                        style={{ width: 4, height: 50, marginLeft: 17 }}
                        resizeMode="cover"
                      />
                    )}
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </View>
    );
  };

  const renderFooter = () => {
    return (
      <View style={{ marginTop: SIZES.radius, marginBottom: SIZES.padding }}>
        {currentStep < constants.track_order_status.length - 1 && (
          <View style={{ flexDirection: 'row', height: 55 }}>
            {/* Cancel */}
            <TextButton
              buttonContainerStyle={{
                width: '40%',
                borderRadius: SIZES.base,
                backgroundColor: COLORS.lightGray2,
              }}
              label="Cancel"
              labelStyle={{ color: COLORS.primary }}
              onPress={() => navigation.navigate('FoodDetail')}
            />
            {/* MapView*/}
            <TextIconButton
              containerStyle={{
                flex: 1,
                marginLeft: SIZES.radius,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.primary,
              }}
              label="Map View"
              labelStyle={{ color: COLORS.white, ...FONTS.h3 }}
              icon={icons.map}
              iconPosition="LEFT"
              iconStyle={{
                width: 25,
                height: 25,
                marginRight: SIZES.base,
                tintColor: COLORS.white,
              }}
              onPress={() => navigation.navigate('Map')}
            />
          </View>
        )}
        {currentStep === constants.track_order_status.length - 1 && (
          <TextButton
            buttonContainerStyle={{ height: 55, borderRadius: SIZES.radius }}
            label="DONE"
            onPress={() => navigation.navigate('FoodDetail')}
          />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      {renderHeader()}
      {/* Info */}
      {renderInfo()}
      {/* Track Order */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderTrackOrder()}
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
    paddingHorizontal: SIZES.padding,
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

export default DeliveryStatus;
