import dayjs from 'dayjs';

import {ServiceOrdersRepository} from '../../Domain/Repository/ServiceOrdersRepository';

export type RecentActivityListItem = {
  title: string;
  subtitle: string;
  statusIcon: 'checkcircle' | 'closecircle';
  statusColor: 'green' | 'red';
};

export function useServiceOrderItemModelController(
  serviceOrdersRepository: ServiceOrdersRepository,
) {
  const countAssignedPendingOrders = () => {
    return serviceOrdersRepository.countAssignedPendingOrders();
  };

  const getRecentActivity = (): Promise<RecentActivityListItem[]> => {
    return serviceOrdersRepository.getRecentActivity().then(orders =>
      orders.map(({description: title, execution, status}) => ({
        title,
        subtitle: dayjs.utc(execution.resolutionTime).format('HH:mm'),
        statusIcon: status.code === 'DONE' ? 'checkcircle' : 'closecircle',
        statusColor: status.code === 'DONE' ? 'green' : 'red',
      })),
    );
  };

  return {
    countAssignedPendingOrders,
    getRecentActivity,
  };
}
