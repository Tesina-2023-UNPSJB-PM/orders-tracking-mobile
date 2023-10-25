/* eslint-disable react/react-in-jsx-scope */
import { Dimensions, StyleSheet, View } from 'react-native';

import MapView, { LatLng, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import {
  APP_MAP_STYLE,
  APP_MAX_ZOOM_LEVEL,
  APP_MIN_ZOOM_LEVEL,
} from '../../Constants/MapsConstants';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BottomSheet, Button } from '@rneui/themed';
import { useRef, useState } from 'react';
import { Location } from 'react-native-location';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { ServiceOrderDetail } from '../../../Domain/Model/ServiceOrderDetailModel';
import { ServiceOrderItem } from '../../../Domain/Model/ServiceOrderItemModel';
import { ServiceOrdersRepository } from '../../../Domain/Repository/ServiceOrdersRepository';
import { useServiceOrderItemModelController } from '../../Hook/useServiceOrderItemModelController';
import { AssignedOrdersMarkerPipe } from '../../Pipes/AssignedOrdersMarkerPipe';
import { AssignedOrdersMapComponent } from './AssignedOrdersMapComponent';
import { CurrentEmployeeLocationMapComponent } from './CurrentEmployeeLocationMapComponent';
import SelectedOrderCard from './SelectedOrderCardComponent';
import { TrackingOrdersRouteComponent } from './TrackingOrdersRouteComponent';

type TrackingOrdersMapComponentOptions = {
  currentLocation: Location | undefined;
  region: Region;
  assignedServiceOrders: ServiceOrderItem[];
  serviceOrdersRepository: ServiceOrdersRepository;
};

type RootStackParamList = {
  AssignedServiceOrderEdition: { serviceOrder: ServiceOrderDetail };
};

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 1);

export function TrackingOrdersMapComponent({
  currentLocation: coordinate,
  region,
  assignedServiceOrders,
  serviceOrdersRepository,
}: TrackingOrdersMapComponentOptions) {
  const ref = useRef<any>();
  const mapRef = useRef<any>();
  const [index, setIndex] = useState(0);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [selectedOrder, setSelectedOrder] = useState<ServiceOrderItem | null>(
    null,
  );

  const onOrderSelected = (orderId: string) => {
    const order =
      assignedServiceOrders.findIndex(({ id }) => id === +orderId) ?? null;
    setSelectedOrder(assignedServiceOrders[order]);

    setTimeout(() => {
      setIndex(order);
      ref?.current?.snapToItem(order);
    }, 10);
  };

  const { getEmployeeOrderDetail } = useServiceOrderItemModelController(
    serviceOrdersRepository,
  );

  const goToAssignedOrderDetailModal = async (orderId?: number) => {
    if (!orderId) return;

    setSelectedOrder(null);

    const serviceOrder = await getEmployeeOrderDetail(orderId);

    navigation.navigate('AssignedServiceOrderEdition', {
      serviceOrder,
    });
  };

  const CarouselCardItem = ({ index, item }: any) => {
    return (
      <SelectedOrderCard
        key={index}
        serviceOrder={item}
        onCancel={() => console.log('onCancel')}
        onConfirm={() => goToAssignedOrderDetailModal(item?.id)}
        onClose={() => setSelectedOrder(null)}
      />
    );
  };

  const { latitude = 0, longitude = 0 } = coordinate ?? {
    latitude: 0,
    longitude: 0,
  };

  const mapDirectionsMarkers: LatLng[] = [
    { latitude, longitude },
    ...AssignedOrdersMarkerPipe(assignedServiceOrders).map(
      ({ coordinate }) => coordinate,
    ),
  ];

  setTimeout(() => {
    mapRef?.current?.fitToCoordinates(mapDirectionsMarkers, {
      edgePadding: { top: 2, right: 2, bottom: 2, left: 2 },
      animated: true,
    });
  }, 100);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        zoomControlEnabled={true}
        minZoomLevel={APP_MIN_ZOOM_LEVEL}
        maxZoomLevel={APP_MAX_ZOOM_LEVEL}
        provider={PROVIDER_GOOGLE}
        //region={region}
        customMapStyle={APP_MAP_STYLE}>
        <CurrentEmployeeLocationMapComponent coordinate={coordinate} />
        <AssignedOrdersMapComponent
          assignedOrdersMarkers={AssignedOrdersMarkerPipe(
            assignedServiceOrders,
          )}
          selectedOrderKey={`${selectedOrder?.id}`}
          onOrderSelected={onOrderSelected}
        />
        <TrackingOrdersRouteComponent coordinates={mapDirectionsMarkers} />
      </MapView>

      {selectedOrder && (
        <BottomSheet modalProps={{}} isVisible={selectedOrder != undefined}>
          <Carousel
            ref={ref}
            data={assignedServiceOrders}
            renderItem={CarouselCardItem}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
            onSnapToItem={_index => {
              setIndex(_index);
              onOrderSelected(`${assignedServiceOrders[_index].id}`);
            }}
            useScrollView={true}
            vertical={false}
          />
          <Button
            onPress={() => goToAssignedOrderDetailModal(selectedOrder?.id)}
            containerStyle={styles.buttonStyle}>
            Adjuntar
          </Button>
          <Pagination
            dotsLength={assignedServiceOrders.length}
            activeDotIndex={index}
            carouselRef={ref}
            dotStyle={styles.paginationDotStyle}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            tappableDots={true}
          />
        </BottomSheet>
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
  buttonStyle: {
    width: '60%',
    flex: 1,
    alignSelf: 'center',
    borderRadius: 16,
  },
  paginationDotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.92)',
  },
});
