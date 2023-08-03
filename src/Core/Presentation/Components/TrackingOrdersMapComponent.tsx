import {StyleSheet, View} from 'react-native';
import Config from 'react-native-config';
import MapView, {Marker, PROVIDER_GOOGLE, Region} from 'react-native-maps';
import {APP_MAP_STYLE, APP_MIN_ZOOM_LEVEL} from '../Constants/MapsConstants';

import {Icon} from '@rneui/themed';
import {Location} from 'react-native-location';

type TrackingOrdersMapComponentOptions = {
  currentLocation: Location | undefined;
  region: Region;
};

export function TrackingOrdersMapComponent({
  currentLocation,
  region,
}: TrackingOrdersMapComponentOptions) {
  const GOOGLE_MAPS_API_KEY = Config.GOOGLE_MAPS_API_KEY ?? '';

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        minZoomLevel={APP_MIN_ZOOM_LEVEL}
        maxZoomLevel={APP_MIN_ZOOM_LEVEL}
        provider={PROVIDER_GOOGLE}
        region={region}
        customMapStyle={APP_MAP_STYLE}>
        {currentLocation && (
          <Marker
            title="Tu posición actual!"
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}>
            <Icon name="man" type="entypo" size={25} />
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
