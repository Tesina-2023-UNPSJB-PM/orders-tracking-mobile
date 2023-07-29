import {StyleSheet, View} from 'react-native';
import Config from 'react-native-config';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {
  APP_INITIAL_REGION,
  APP_MAP_STYLE,
  APP_MIN_ZOOM_LEVEL,
} from '../Constants/MapsConstants';

import Geolocation from 'react-native-geolocation-service';
import { Icon } from '@rneui/themed';

type TrackingOrdersMapComponentOptions = {
  currentLocation: Geolocation.GeoPosition | undefined;
};

export function TrackingOrdersMapComponent({
  currentLocation,
}: TrackingOrdersMapComponentOptions) {
  const GOOGLE_MAPS_API_KEY = Config.GOOGLE_MAPS_API_KEY ?? '';

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        minZoomLevel={APP_MIN_ZOOM_LEVEL}
        provider={PROVIDER_GOOGLE}
        initialRegion={APP_INITIAL_REGION}
        customMapStyle={APP_MAP_STYLE}>
        {currentLocation && (
          <Marker
            title="Tu posición actual!"
            coordinate={{
              latitude: currentLocation.coords.latitude,
              longitude: currentLocation.coords.longitude,
            }}>
            {/* <Icon name="navigate" type='material-community' size={25}/> */}
          </Marker>
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  map: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    //borderRadius: 10,
  },
  centeredView: {
    flex: 1,
    bottom: '5%',
    position: 'absolute',
  },
});
