import {
  ConfigureOptions,
  RequestPermissionOptions,
} from 'react-native-location';

export const APP_DEFAULT_LOCATION_PERMISSIONS_CONFIG: RequestPermissionOptions =
  {
    ios: 'always',
    android: {
      detail: 'fine',
    },
  };

export const APP_DEFAULT_LOCATION_CONFIG: ConfigureOptions = {
  distanceFilter: 5, // Meters
  desiredAccuracy: {
    ios: 'nearestTenMeters',
    android: 'highAccuracy',
  },
  // Android only
  androidProvider: 'auto',
  interval: 1000, // Milliseconds
  fastestInterval: 1000, // Milliseconds
  maxWaitTime: 1000, // Milliseconds
  // iOS Only
  activityType: 'other',
  allowsBackgroundLocationUpdates: true,
  headingFilter: 1, // Degrees
  headingOrientation: 'portrait',
  pausesLocationUpdatesAutomatically: false,
  showsBackgroundLocationIndicator: true,
};
