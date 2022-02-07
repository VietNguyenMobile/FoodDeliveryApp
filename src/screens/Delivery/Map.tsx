import {
  View,
  Text,
  BackHandler,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { FunctionComponent, useState, useEffect, useRef } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { MainParamType } from '../../navigation';
import { utils } from '../../utils';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import LinearGradient from 'react-native-linear-gradient';
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

type MapProps = StackScreenProps<MainParamType, 'Map'>;

const Map: FunctionComponent<MapProps> = ({ navigation, route }) => {
  const mapView = useRef();
  const [region, setRegion] = useState(null);
  const [toLoc, setToLoc] = useState(null);
  const [fromLoc, setFromLoc] = useState(null);
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    let initialRegion = {
      latitude: 1.5496614931250685,
      longitude: 110.36381866919922,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    };

    let destination = {
      latitude: 1.5496614931250685,
      longitude: 110.36381866919922,
    };

    setToLoc(destination);
    setFromLoc(dummyData.fromLocs[1]);
    setRegion(initialRegion);
  }, []);

  const renderMap = () => {
    return (
      <MapView
        ref={mapView}
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        initialRegion={region}>
        {fromLoc && (
          <Marker
            key={'FromLoc'}
            coordinate={fromLoc}
            tracksViewChanges={false}
            icon={icons.navigator1}
            rotation={angle}
            anchor={{ x: 0.5, y: 0.5 }}
          />
        )}
        {toLoc && (
          <Marker
            key={'ToLoc'}
            coordinate={toLoc}
            tracksViewChanges={false}
            icon={icons.location_pin}
            anchor={{ x: 0.5, y: 0.5 }}
          />
        )}
      </MapView>
    );
  };

  return (
    <View style={styles.container}>
      {/* Map */}
      {renderMap()}
      {/* Header Buttons */}
      {/* Footer / Info */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Map;
