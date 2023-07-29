import {Platform} from 'react-native';
import {request, PERMISSIONS} from 'react-native-permissions';
import Geolocation, {
  SuccessCallback,
  ErrorCallback,
  GeoWatchOptions,
} from 'react-native-geolocation-service';
export function useOrdersMapsModelController() {
  const requestIosPermission = () => {
    return request(PERMISSIONS.IOS.LOCATION_ALWAYS);
  };

  const requestAndroidPermission = () => {
    return request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
  };

  const requestPermissions = () => {
    if (Platform.OS === 'ios') return requestIosPermission();
    return requestAndroidPermission();
  };

  const watchPosition = (
    successCallback: SuccessCallback,
    errorCallback: ErrorCallback,
    options: GeoWatchOptions,
  ) => {
    requestPermissions().then(permissionStatus => {
      if (permissionStatus === 'granted') {
        Geolocation.watchPosition(successCallback, errorCallback, options);
      }
    });
  };

  return {watchPosition};
}
