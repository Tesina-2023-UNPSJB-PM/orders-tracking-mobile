import { EmployeeOrdersSummary } from '../../Domain/Model/EmployeeOrdersSummary';
import { ServiceOrderDetail } from '../../Domain/Model/ServiceOrderDetailModel';
import { ServiceOrderHistoryPost } from '../../Domain/Model/ServiceOrderHistoryPost';
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

  async getEmployeeOrderDetail(orderId: number): Promise<ServiceOrderDetail> {
    return this.serviceOrdersDatasource.fetchEmployeeOrderDetail(orderId);
  }

  async addServiceOrderHistoryRecord(
    serviceOrderHistoryPost: ServiceOrderHistoryPost,
  ): Promise<number> {
    const _attach = serviceOrderHistoryPost.attachments ?? '';
    return this.serviceOrdersDatasource
      .postServiceOrderHistory(serviceOrderHistoryPost)
      .then(historyNumber => {
        // if (historyNumber > 0 && _attach.length > 0) {
        //   this.serviceOrdersDatasource.postServiceOrderHistoryAttachment(
        //     historyNumber,
        //     _attach,
        //   );
        // }

        return historyNumber;
      });
  }
}
