import {makeStyles} from '@rneui/themed';
import {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Location} from 'react-native-location';
import {LocationRepository} from '../../Domain/Repository/LocationRepository';
import {TrackingOrdersMapComponent} from '../Components/TrackingOrdersMapComponent';
import {APP_INITIAL_REGION} from '../Constants/MapsConstants';
import {useOrdersMapsModelController} from '../Hook/useOrdersMapsModelController';

type OrdersMapViewOptions = {
  locationRepository: LocationRepository;
};

export function OrdersMapView({locationRepository}: OrdersMapViewOptions) {
  const styles = useStyles();

  const {watchPosition} = useOrdersMapsModelController(locationRepository);

  const [currentLocation, setCurrentLocation] = useState<Location>();

  const [region, setRegion] = useState(APP_INITIAL_REGION);

  useEffect(() => {
    watchPosition({
      success: ([location]: Location[]) => {
        setCurrentLocation(location);
        setRegion({
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0,
          longitudeDelta: 0,
        });
      },
    });
  }, []);

  return (
    <View style={styles.container}>
      <TrackingOrdersMapComponent
        currentLocation={currentLocation}
        region={region}></TrackingOrdersMapComponent>
    </View>
  );
}

const useStyles = makeStyles(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
}));
