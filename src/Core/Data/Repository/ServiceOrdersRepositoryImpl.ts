import {EmployeeOrdersSummary} from '../../Domain/Model/EmployeeOrdersSummary';
import {ServiceOrderItem} from '../../Domain/Model/ServiceOrderItemModel';
import {ServiceOrdersRepository} from '../../Domain/Repository/ServiceOrdersRepository';
import {SERVICE_ORDERS_ITEMS} from '../Constants/ServiceOrders';
import {ServiceOrdersDatasource} from '../Datasource/ServiceOrders/ServiceOrdersDatasource';

export class ServiceOrdersRepositoryImpl implements ServiceOrdersRepository {
  constructor(private serviceOrdersDatasource: ServiceOrdersDatasource) {}

  async getEmployeeOrdersSummary(): Promise<EmployeeOrdersSummary> {
    return this.serviceOrdersDatasource.fetchEmployeeOrdersSummary(2);
  }
}
