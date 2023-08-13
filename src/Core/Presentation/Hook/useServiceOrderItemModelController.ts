import { EmployeeOrdersSummary } from '../../Domain/Model/EmployeeOrdersSummary';
import { ServiceOrdersRepository } from '../../Domain/Repository/ServiceOrdersRepository';

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
