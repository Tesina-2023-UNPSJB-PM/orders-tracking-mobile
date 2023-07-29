import {makeStyles} from '@rneui/themed';
import {View} from 'react-native';
import {TrackingOrdersMapComponent} from '../Components/TrackingOrdersMapComponent';
import {LocationRepository} from '../../Domain/Repository/LocationRepository';
import {useEffect, useState, useTransition} from 'react';
import Geolocation from 'react-native-geolocation-service';
import {requestMultiple, PERMISSIONS} from 'react-native-permissions';
import {APP_LOCATION_PERMISSIONS} from '../Constants/MapsConstants';
import {useOrdersMapsModelController} from '../Hook/useOrdersMapsModelController';

type OrdersMapViewOptions = {
  locationRepository: LocationRepository;
};

export function OrdersMapView({locationRepository}: OrdersMapViewOptions) {
  const styles = useStyles();

  const {watchPosition} = useOrdersMapsModelController();

  const [currentLocation, setCurrentLocation] =
    useState<Geolocation.GeoPosition>();

  useEffect(() => {
    watchPosition(
      position => {
        console.log(position);
        setCurrentLocation(position);
      },
      error => console.error(error),
      {
        enableHighAccuracy: true,
      },
    );
  });

  return (
    <View style={styles.container}>
      <TrackingOrdersMapComponent
        currentLocation={currentLocation}></TrackingOrdersMapComponent>
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
