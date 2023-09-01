import { StyleSheet, View } from 'react-native';
import Config from 'react-native-config';
import MapView, { PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { APP_MAP_STYLE, APP_MIN_ZOOM_LEVEL } from '../Constants/MapsConstants';

import { useState } from 'react';
import { Location } from 'react-native-location';
import { ServiceOrderItem } from '../../Domain/Model/ServiceOrderItemModel';
import { AssignedOrdersMarkerPipe } from '../Pipes/AssignedOrdersMarkerPipe';
import { AssignedOrdersMapComponent } from './AssignedOrdersMapComponent';
import { CurrentEmployeeLocationMapComponent } from './CurrentEmployeeLocationMapComponent';
import SelectedOrderCard from './Tracking/SelectedOrderCardComponent';

type TrackingOrdersMapComponentOptions = {
  currentLocation: Location | undefined;
  region: Region;
  assignedServiceOrders: ServiceOrderItem[];
};

export function TrackingOrdersMapComponent({
  currentLocation: coordinate,
  region,
  assignedServiceOrders,
}: TrackingOrdersMapComponentOptions) {
  const GOOGLE_MAPS_API_KEY = Config.GOOGLE_MAPS_API_KEY ?? '';

  const [selectedOrder, setSelectedOrder] = useState<ServiceOrderItem | null>(
    null,
  );

  const onOrderSelected = (orderId: string) => {
    const order =
      assignedServiceOrders.find(({ id }) => id === +orderId) ?? null;
    setSelectedOrder(order);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        minZoomLevel={APP_MIN_ZOOM_LEVEL}
        maxZoomLevel={APP_MIN_ZOOM_LEVEL}
        provider={PROVIDER_GOOGLE}
        region={region}
        customMapStyle={APP_MAP_STYLE}>
        <CurrentEmployeeLocationMapComponent coordinate={coordinate} />
        <AssignedOrdersMapComponent
          assignedOrdersMarkers={AssignedOrdersMarkerPipe(
            assignedServiceOrders,
          )}
          selectedOrderKey={`${selectedOrder?.id}`}
          onOrderSelected={onOrderSelected}
        />
      </MapView>

      {selectedOrder && (
        <View style={styles.centeredView}>
          <SelectedOrderCard
            serviceOrder={selectedOrder}
            onCancel={() => console.log('onCancel')}
            onConfirm={() => console.log('onConfirm')}
            onClose={() => setSelectedOrder(null)}></SelectedOrderCard>
        </View>
      )}
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
  },
  centeredView: {
    flex: 1,
    bottom: '5%',
    position: 'absolute',
  },
});
