import { EmployeeOrdersSummary } from '../../Domain/Model/EmployeeOrdersSummary';
import { ServiceOrderDetail } from '../../Domain/Model/ServiceOrderDetailModel';
import { ServiceOrdersRepository } from '../../Domain/Repository/ServiceOrdersRepository';

export function useServiceOrderItemModelController(
  serviceOrdersRepository: ServiceOrdersRepository,
) {
  const getEmployeeOrdersSummary = (): Promise<EmployeeOrdersSummary> => {
    return serviceOrdersRepository.getEmployeeOrdersSummary();
  };

  const getEmployeeOrderDetail = (orderId: number): Promise<ServiceOrderDetail> => {
    return serviceOrdersRepository.getEmployeeOrderDetail(orderId);
  };

  return {
    getEmployeeOrdersSummary,
    getEmployeeOrderDetail
  };
}
