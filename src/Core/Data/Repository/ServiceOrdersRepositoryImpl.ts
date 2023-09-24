import { EmployeeOrdersSummary } from '../../Domain/Model/EmployeeOrdersSummary';
import { MasterData } from '../../Domain/Model/MasterDataModel';
import { ServiceOrderDetail } from '../../Domain/Model/ServiceOrderDetailModel';
import { ServiceOrderHistoryPost } from '../../Domain/Model/ServiceOrderHistoryPost';
import { ServiceOrderItem } from '../../Domain/Model/ServiceOrderItemModel';
import { ServiceOrdersRepository } from '../../Domain/Repository/ServiceOrdersRepository';
import { ServiceOrdersDatasource } from '../Datasource/ServiceOrders/ServiceOrdersDatasource';
import { AuthDataSource } from '../Datasource/_index';
import { setMasterData } from '../Redux/Actions/MasterDataActions';
import store from '../Redux/Store';

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
    return this.serviceOrdersDatasource.postServiceOrderHistory(
      serviceOrderHistoryPost,
    );
  }

  async getMasterData(): Promise<MasterData> {
    const { masterData } = store.getState();

    if (masterData.masterData) return masterData.masterData;

    const fetchedMasterData =
      await this.serviceOrdersDatasource.fetchMasterData();
    setMasterData(fetchedMasterData);
    return fetchedMasterData;
  }

  async setMasterData(masterData: MasterData): Promise<void> {
    store.dispatch(setMasterData(masterData));
  }
}
