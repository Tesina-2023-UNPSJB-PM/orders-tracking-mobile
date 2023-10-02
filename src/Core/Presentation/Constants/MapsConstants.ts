import { Platform } from 'react-native';
import { MapStyleElement } from 'react-native-maps';
import { PERMISSIONS } from 'react-native-permissions';

export const APP_MIN_ZOOM_LEVEL = 10;
export const APP_MAX_ZOOM_LEVEL = 16;
export const APP_INITIAL_REGION = {
  latitude: -42.7692,
  longitude: -65.03851,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

export const APP_MAP_STYLE: MapStyleElement[] = [
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{ visibility: 'off' }],
  },
];

export const APP_LOCATION_PERMISSIONS =
  Platform.OS === 'android'
    ? [
        PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION,
        PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      ]
    : [PERMISSIONS.IOS.LOCATION_ALWAYS];
