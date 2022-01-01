import React, { FunctionComponent, useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ScrollView,
  TouchableNativeFeedback,
  Modal,
  Platform,
} from 'react-native';
// import TwoPointSlider from '@ptomasroos/react-native-multi-slider';
import TwoPointSlider from '../../components/TwoPointSlider';
import TextIconButton from '../../components/TextIconButton';

import {
  FONTS,
  SIZES,
  COLORS,
  icons,
  dummyData,
  constants,
} from '../../constants';
import IconButton from '../../components/IconButton';
import TextButton from '../../components/TextButton';

type FilterModalProps = {
  isVisible: Boolean;
  onClose: () => void;
};

const Section = ({ containerStyle, title, children }) => {
  return (
    <View style={{ marginTop: SIZES.padding, ...containerStyle }}>
      <Text style={{ ...FONTS.h3, color: 'black' }}>{title}</Text>
      {children}
    </View>
  );
};

const FilterModal: FunctionComponent<FilterModalProps> = ({
  isVisible,
  onClose,
}) => {
  const modalAnimatedValue = useRef(new Animated.Value(0)).current;
  const [showFilterModal, setShowFilter] = useState(isVisible);
  const [deliveryTime, setDeliveryTime] = useState('1');
  const [ratings, setRatings] = useState('4');
  const [tags, setTags] = useState('1');

  useEffect(() => {
    // if (!showFilterModal) {
    //   onClose();
    // }
    if (showFilterModal) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start(() => onClose());
    }
  }, [showFilterModal]);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SIZES.height, SIZES.height - SIZES.height * 0.85],
  });

  const renderDistance = () => {
    return (
      <Section title={'Distance'}>
        <View style={{ alignItems: 'center' }}>
          <TwoPointSlider
            values={[3, 10]}
            min={1}
            max={20}
            postfix={'km'}
            onValuesChange={value => console.log('values: ', value)}
          />
        </View>
      </Section>
    );
  };

  const renderDeliveryTime = () => {
    return (
      <Section title={'Delivery Time'} containerStyle={{ marginTop: 40 }}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: SIZES.radius,
          }}>
          {constants.delivery_time.map((item, index) => {
            return (
              <TextButton
                key={`delivery-time-${index}`}
                label={item.label}
                labelStyle={{
                  color: item.id == deliveryTime ? COLORS.white : COLORS.gray,
                  ...FONTS.body3,
                }}
                buttonContainerStyle={{
                  width: '30%',
                  height: 50,
                  margin: 5,
                  alignItems: 'center',
                  borderRadius: SIZES.base,
                  backgroundColor:
                    item.id == deliveryTime
                      ? COLORS.primary
                      : COLORS.lightGray2,
                }}
                onPress={() => setDeliveryTime(item.id)}
              />
            );
          })}
        </View>
      </Section>
    );
  };

  const renderPricingRange = () => {
    return (
      <Section title={'Pricing Range'}>
        <View style={{ alignItems: 'center' }}>
          <TwoPointSlider
            values={[10, 50]}
            min={1}
            max={100}
            prefix="$"
            postfix=""
            onValuesChange={values => console.log('values: ', values)}
          />
        </View>
      </Section>
    );
  };

  const renderRatings = () => {
    return (
      <Section
        title={'Ratings'}
        containerStyle={{
          marginTop: 40,
        }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {constants.ratings.map((item, index) => {
            return (
              <TextIconButton
                key={`Ratings-${index}`}
                label={item.label}
                labelStyle={{
                  color: item.id == ratings ? COLORS.white : COLORS.gray,
                }}
                icon={icons.star}
                iconStyle={{
                  tintColor: item.id == ratings ? COLORS.white : COLORS.gray,
                }}
                containerStyle={{
                  flex: 1,
                  height: 50,
                  margin: 5,
                  alignItems: 'center',
                  borderRadius: SIZES.base,
                  backgroundColor:
                    item.id == ratings ? COLORS.primary : COLORS.lightGray2,
                }}
                onPress={() => setRatings(item.id)}
              />
            );
          })}
        </View>
      </Section>
    );
  };

  const renderTags = () => {
    return (
      <Section title={'Tags'}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {constants.tags.map((item, index) => {
            return (
              <TextButton
                key={`Tags-${index}`}
                label={item.label}
                labelStyle={{
                  color: item.id == tags ? COLORS.white : COLORS.gray,
                  ...FONTS.body3,
                }}
                buttonContainerStyle={{
                  height: 50,
                  margin: 5,
                  paddingHorizontal: SIZES.padding,
                  alignItems: 'center',
                  borderRadius: SIZES.base,
                  backgroundColor:
                    item.id == tags ? COLORS.primary : COLORS.lightGray2,
                }}
                onPress={() => setTags(item.id)}
              />
            );
          })}
        </View>
      </Section>
    );
  };

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={styles.container}>
        {/* Transparent Background */}
        <TouchableNativeFeedback onPress={() => setShowFilter(false)}>
          <View style={styles.shadowTransparentBackground} />
        </TouchableNativeFeedback>
        <Animated.View style={[styles.containerFilter, { top: modalY }]}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.textFilter}>Filter Your Search</Text>
            <IconButton
              containerStyle={styles.iconButtonContainer}
              icon={icons.cross}
              iconStyle={{ tintColor: COLORS.gray2 }}
              onPress={() => setShowFilter(false)}
            />
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 250 }}>
            {/* Distance */}
            {renderDistance()}

            {/* Delivery Time */}
            {renderDeliveryTime()}

            {/* Pricing Range */}
            {renderPricingRange()}

            {/* Ratings */}
            {renderRatings()}

            {/* Tags */}
            {renderTags()}
          </ScrollView>

          {/* Apply Button */}
          <View style={styles.applyButton}>
            <TextButton
              label="Apply Filters"
              buttonContainerStyle={{
                height: 50,
                borderRadius: SIZES.base,
                backgroundColor: COLORS.primary,
              }}
              onPress={() => console.log('Apply Filters')}
            />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.transparentBlack7,
  },
  shadowTransparentBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  containerFilter: {
    position: 'absolute',
    left: 0,
    width: '100%',
    height: '100%',
    padding: SIZES.padding,
    borderTopRightRadius: SIZES.padding,
    borderTopLeftRadius: SIZES.padding,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'red'
  },
  textFilter: {
    flex: 1,
    ...FONTS.h3,
    fontSize: 18,
    color: 'black',
  },
  iconButtonContainer: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: COLORS.gray2,
  },
  applyButton: {
    position: 'absolute',
    ...Platform.select({
      android: { bottom: 100, height: 100 },
      ios: { bottom: 150, height: 110 },
    }),
    left: 0,
    right: 0,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.radius,
    backgroundColor: COLORS.white,
  },
});

export default FilterModal;
