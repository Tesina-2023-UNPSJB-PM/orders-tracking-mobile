import { EmployeeOrdersSummary } from '../../Domain/Model/EmployeeOrdersSummary';
import { ServiceOrderItem } from '../../Domain/Model/ServiceOrderItemModel';
import { ServiceOrdersRepository } from '../../Domain/Repository/ServiceOrdersRepository';
import { ServiceOrdersDatasource } from '../Datasource/ServiceOrders/ServiceOrdersDatasource';
import { AuthDataSource } from '../Datasource/_index';

export class ServiceOrdersRepositoryImpl implements ServiceOrdersRepository {
  constructor(
    private serviceOrdersDatasource: ServiceOrdersDatasource,
    private authDatasource: AuthDataSource,
  ) {}

  private async getEmployeId(): Promise<number> {
    const userInfo = await this.authDatasource.getCurrentUser();

    if (!userInfo?.employeeId) throw new Error('Employee info is undefined');

    return userInfo.employeeId;
  }

  async getEmployeeOrdersSummary(): Promise<EmployeeOrdersSummary> {
    const employeeId = await this.getEmployeId();
    return this.serviceOrdersDatasource.fetchEmployeeOrdersSummary(employeeId);
  }

  async getEmployeeOrders(): Promise<ServiceOrderItem[]> {
    const employeeId = await this.getEmployeId();
    return this.serviceOrdersDatasource
      .fetchEmployeeOrdersSummary(employeeId)
      .then(({ assignedServiceOrders = [] }) => assignedServiceOrders);
  }
}
