import { IMarker } from '../../../Common/Interfaces/IMarker';
import {
  Priority,
  ServiceOrderItem,
} from '../../Domain/Model/ServiceOrderItemModel';

export const getIconNameByPriority = (code: Priority) => {
  switch (code) {
    case 'HIGH':
      return {
        iconName: 'alert-octagon',
        iconColor: '#eb445a',
        iconText: 'Prioridad Alta',
        iconSrc:
          'https://firebasestorage.googleapis.com/v0/b/movies-60eaa.appspot.com/o/home-map-high.png?alt=media&token=f35fb59b-11f7-4b66-854f-f0cf459e5d36&_gl=1*1flj5so*_ga*MzMyODQ1MDU5LjE2OTQyNjU0MzY.*_ga_CW55HF8NVT*MTY5NzcyMjk0OC4zMi4xLjE2OTc3MjY0NjguMzAuMC4w',
      };
    case 'MEDIUM':
      return {
        iconName: 'alert-octagon',
        iconColor: '#ffc409',
        iconText: 'Prioridad Media',
        iconSrc:
          'https://firebasestorage.googleapis.com/v0/b/movies-60eaa.appspot.com/o/home-map-medium.png?alt=media&token=50f5a812-2013-4be5-bc8e-d439d627e6fe&_gl=1*64qghw*_ga*MzMyODQ1MDU5LjE2OTQyNjU0MzY.*_ga_CW55HF8NVT*MTY5NzcyMjk0OC4zMi4xLjE2OTc3MjY1OTEuMjMuMC4w',
      };
    case 'LOW':
      return {
        iconName: 'alert-octagon',
        iconColor: '#4A4E69',
        iconText: 'Prioridad Baja',
        iconSrc:
          'https://firebasestorage.googleapis.com/v0/b/movies-60eaa.appspot.com/o/home-map-low.png?alt=media&token=3f97daf3-6964-47c1-b74f-8bd7c62159a4&_gl=1*hcvoor*_ga*MzMyODQ1MDU5LjE2OTQyNjU0MzY.*_ga_CW55HF8NVT*MTY5NzcyMjk0OC4zMi4xLjE2OTc3MjY1NTQuNjAuMC4w',
      };
    default:
      return {
        iconName: 'alert-octagon',
        iconColor: '#4A4E69',
        iconText: 'Prioridad Baja',
        iconSrc:
          'https://firebasestorage.googleapis.com/v0/b/movies-60eaa.appspot.com/o/home-map-low.png?alt=media&token=3f97daf3-6964-47c1-b74f-8bd7c62159a4&_gl=1*hcvoor*_ga*MzMyODQ1MDU5LjE2OTQyNjU0MzY.*_ga_CW55HF8NVT*MTY5NzcyMjk0OC4zMi4xLjE2OTc3MjY1NTQuNjAuMC4w',
      };
  }
};

export function AssignedOrdersMarkerPipe(
  serviceOrdersItems: ServiceOrderItem[],
): IMarker[] {
  if (!serviceOrdersItems) return [];
  return serviceOrdersItems.map(({ id, destination, priority }) => {
    const { latitude, longitude } = destination.address;
    const { iconName, iconColor, iconSrc } = getIconNameByPriority(priority);
    return {
      key: `${id}`,
      title: ``,
      description: '',
      coordinate: { latitude, longitude },
      iconName,
      iconColor,
      iconSrc,
    };
  });
}
