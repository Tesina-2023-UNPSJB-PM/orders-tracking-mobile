import { IMarker } from '../../../Common/Interfaces/IMarker';
import {
  Priority,
  ServiceOrderItem,
} from '../../Domain/Model/ServiceOrderItemModel';

const getIconColor = (code: string) => {
  switch (code) {
    case 'DONE':
      return 'green';
    case 'PENDING':
      return 'yellow';
    case 'CANCELED':
      return 'red';
    default:
      return '';
  }
};

const getIconName = (code: string) => {
  switch (code) {
    case 'DONE':
      return 'clipboard-check';
    case 'PENDING':
      return 'clipboard-clock';
    case 'CANCELED':
      return 'clipboard-remove';
    default:
      return '';
  }
};

export const getIconNameByPriority = (code: Priority) => {
  switch (code) {
    case 'HIGH':
      return {
        iconName: 'alert-octagon',
        iconColor: '#eb445a',
        iconText: 'Prioridad Alta',
      };
    case 'MEDIUM':
      return {
        iconName: 'alert-octagon',
        iconColor: '#ffc409',
        iconText: 'Prioridad Media',
      };
    case 'LOW':
      return {
        iconName: 'alert-octagon',
        iconColor: '#4A4E69',
        iconText: 'Prioridad Baja',
      };
    default:
      return {
        iconName: 'alert-octagon',
        iconColor: '#4A4E69',
        iconText: 'Prioridad Baja',
      };
  }
};

export function AssignedOrdersMarkerPipe(
  serviceOrdersItems: ServiceOrderItem[],
): IMarker[] {
  if (!serviceOrdersItems) return [];
  return serviceOrdersItems.map(({ id, destination, priority }) => {
    const { latitude, longitude } = destination.address;
    const { iconName, iconColor } = getIconNameByPriority(priority);
    return {
      key: `${id}`,
      title: ``,
      description: '',
      coordinate: { latitude, longitude },
      iconName,
      iconColor,
    };
  });
}
