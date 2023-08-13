import { IMarker } from '../../../Common/Interfaces/IMarker';
import { ServiceOrderItem } from '../../Domain/Model/ServiceOrderItemModel';

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

export function AssignedOrdersMarkerPipe(
  serviceOrdersItems: ServiceOrderItem[],
): IMarker[] {
  if (!serviceOrdersItems) return [];
  return serviceOrdersItems.map(
    ({ id, description, destination, number, status, type }) => {
      const { latitude, longitude } = destination.address;
      const { code } = status;
      const iconName = getIconName(code);
      const iconColor = getIconColor(code);
      return {
        key: `${id}`,
        title: `#${number}`,
        description,
        coordinate: { latitude, longitude },
        iconName,
        iconColor,
      };
    },
  );
}
