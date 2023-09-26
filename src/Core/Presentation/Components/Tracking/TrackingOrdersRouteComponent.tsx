import Config from 'react-native-config';
import MapViewDirections from 'react-native-maps-directions';
import { ServiceOrderItem } from '../../../Domain/Model/ServiceOrderItemModel';
import { LatLng } from 'react-native-maps';
import { IMarker } from '../../../../Common/Interfaces/IMarker';
import { useState } from 'react';
import { makeStyles } from '@rneui/themed';

export type TrackingOrdersRouteComponentProps = {
    coordinates: LatLng[];
};

const getMapsInfo = (coordinates: LatLng[]) => {
  //const coordinates: LatLng[] = coordinates;
  const _length = coordinates.length;
  const origin: LatLng = coordinates[0];
  const destination: LatLng = coordinates[_length - 1];
  let waypoints: LatLng[] = [];
  if (coordinates.length > 2) waypoints = coordinates.slice(1, _length - 1);
  return { origin, destination, waypoints, coordinates };
};

export function TrackingOrdersRouteComponent({
    coordinates,
}: TrackingOrdersRouteComponentProps) {
  const styles = useStyles();
  const mapsInfo = getMapsInfo(coordinates);
  const GOOGLE_MAPS_API_KEY = Config.GOOGLE_MAPS_API_KEY ?? '';

  return (
    <MapViewDirections
      origin={mapsInfo.origin}
      destination={mapsInfo.destination}
      waypoints={mapsInfo.waypoints}
      apikey={GOOGLE_MAPS_API_KEY}
      mode='DRIVING'
      strokeColor={styles.stroke.color}
      strokeWidth={styles.stroke.width}
    />
  );
}

const useStyles = makeStyles(theme => ({
  stroke: {
    color: theme.colors.primary,
    width: 4
  },
}));
