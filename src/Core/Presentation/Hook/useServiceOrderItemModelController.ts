import dayjs from 'dayjs';

import {ServiceOrdersRepository} from '../../Domain/Repository/ServiceOrdersRepository';
import {EmployeeOrdersSummary} from '../../Domain/Model/EmployeeOrdersSummary';

export type RecentActivityListItem = {
  title: string;
  subtitle: string;
  statusIcon: 'checkcircle' | 'closecircle';
  statusColor: 'green' | 'red';
};

export function useServiceOrderItemModelController(
  serviceOrdersRepository: ServiceOrdersRepository,
) {
  const getEmployeeOrdersSummary = (): Promise<EmployeeOrdersSummary> => {
    return serviceOrdersRepository.getEmployeeOrdersSummary();
  };

  return {
    getEmployeeOrdersSummary,
  };
}
