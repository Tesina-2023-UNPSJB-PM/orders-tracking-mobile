import { makeStyles } from '@rneui/themed';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Location } from 'react-native-location';
import { ServiceOrderItem } from '../../Domain/Model/ServiceOrderItemModel';
import { LocationRepository } from '../../Domain/Repository/LocationRepository';
import { ServiceOrdersRepository } from '../../Domain/Repository/ServiceOrdersRepository';
import { TrackingOrdersMapComponent } from '../Components/Tracking/TrackingOrdersMapComponent';
import { APP_INITIAL_REGION } from '../Constants/MapsConstants';
import { useOrdersMapsModelController } from '../Hook/useOrdersMapsModelController';
import { useNavigationState } from '@react-navigation/native';

type OrdersMapViewOptions = {
  locationRepository: LocationRepository;
  serviceOrdersRepository: ServiceOrdersRepository;
};

export function OrdersMapView({
  locationRepository,
  serviceOrdersRepository,
}: OrdersMapViewOptions) {
  const styles = useStyles();

  const { watchPosition } = useOrdersMapsModelController(locationRepository);

  const [currentLocation, setCurrentLocation] = useState<Location>();

  const [region, setRegion] = useState(APP_INITIAL_REGION);

  const [assignedServiceOrders, setAssignedServiceOrders] = useState<
    ServiceOrderItem[]
  >([]);

  const index = useNavigationState(state => state.index);

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

  useEffect(() => {
    if (index !== 1) return;

    serviceOrdersRepository
      .getEmployeeOrders()
      .then(orders => setAssignedServiceOrders(orders));
  }, [index]);

  return (
    <View style={styles.container}>
      <TrackingOrdersMapComponent
        assignedServiceOrders={assignedServiceOrders}
        serviceOrdersRepository={serviceOrdersRepository}
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
