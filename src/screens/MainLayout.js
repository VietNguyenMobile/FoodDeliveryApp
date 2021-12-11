import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  interpolateNode,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { useDrawerStatus } from '@react-navigation/drawer';

const MainLayout = ({ props }) => {
  //   console.log('drawerAnimatedStyle: ', drawerAnimatedStyle);

  const isDrawerOpen = useDrawerStatus();
  const sv = useSharedValue(0);
  //   console.log('isDrawerOpen: ', isDrawerOpen);
  useEffect(() => {
    if (isDrawerOpen === 'open') {
      sv.value = withTiming(0.6);
    } else {
      sv.value = withTiming(0);
    }
  }, [isDrawerOpen]);

  const screenStyle = useAnimatedStyle(() => {
    const scale = interpolate(sv.value, [0, 0.5, 1], [1, 0.9, 0.85], {
      extrapolateRight: Extrapolate.CLAMP,
    });
    const borderRadius = interpolate(sv.value, [0, 1], [1, 26], {
      extrapolateRight: Extrapolate.CLAMP,
    });

    return {
      borderRadius,
      transform: [{ scale }],
    };
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          // ...drawerAnimatedStyle,
        },
        screenStyle,
      ]}>
      <Text>MainLayout 1</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});

export default MainLayout;
