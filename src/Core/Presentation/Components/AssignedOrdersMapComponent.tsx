import { Icon } from '@rneui/themed';
import { Marker } from 'react-native-maps';
import { IMarker } from '../../../Common/Interfaces/IMarker';

type AssignedOrdersMapComponentProps = {
  assignedOrdersMarkers?: IMarker[];
};

export function AssignedOrdersMapComponent({
  assignedOrdersMarkers,
}: AssignedOrdersMapComponentProps) {
  return assignedOrdersMarkers?.map(({ iconName, ...markerProps }) => (
    <Marker {...markerProps}>
      <Icon name={iconName} size={14} type="material-community"></Icon>
    </Marker>
  ));
}
