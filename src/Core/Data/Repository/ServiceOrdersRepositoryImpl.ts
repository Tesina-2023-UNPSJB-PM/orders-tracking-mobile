import { EmployeeOrdersSummary } from '../../Domain/Model/EmployeeOrdersSummary';
import { ServiceOrderItem } from '../../Domain/Model/ServiceOrderItemModel';
import { ServiceOrdersRepository } from '../../Domain/Repository/ServiceOrdersRepository';
import { ServiceOrdersDatasource } from '../Datasource/ServiceOrders/ServiceOrdersDatasource';

export class ServiceOrdersRepositoryImpl implements ServiceOrdersRepository {
  constructor(private serviceOrdersDatasource: ServiceOrdersDatasource) {}

  async getEmployeeOrdersSummary(): Promise<EmployeeOrdersSummary> {
    return this.serviceOrdersDatasource.fetchEmployeeOrdersSummary(2);
  }

  async getEmployeeOrders(): Promise<ServiceOrderItem[]> {
    return this.serviceOrdersDatasource
      .fetchEmployeeOrdersSummary(2)
      .then(({ assignedServiceOrders = [] }) => assignedServiceOrders);
  }
}
