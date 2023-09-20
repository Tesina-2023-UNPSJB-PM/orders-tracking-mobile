import { PageDto } from '../../../../Common/Model/PaginationModel';
import { EmployeeOrdersSummary } from '../../../Domain/Model/EmployeeOrdersSummary';
import { ServiceOrderDetail } from '../../../Domain/Model/ServiceOrderDetailModel';
import { ServiceOrderHistoryPost } from '../../../Domain/Model/ServiceOrderHistoryPost';
import { ServiceOrderItem } from '../../../Domain/Model/ServiceOrderItemModel';

/**
 * DataSource access interface
 * Assuming network access, all methods are asynchronous.
 */
export interface ServiceOrdersDatasource {
  fetchServiceOrders(
    employeeId: number,
    statusCode: 'DONE' | 'PENDING' | 'CANCELED',
  ): Promise<PageDto<ServiceOrderItem>>;

  fetchEmployeeOrdersSummary(
    employeeId: number,
  ): Promise<EmployeeOrdersSummary>;

  fetchEmployeeOrderDetail(orderId: number): Promise<ServiceOrderDetail>;

  postServiceOrderHistory(
    serviceOrderHistoryPost: ServiceOrderHistoryPost,
  ): Promise<number>;

  postServiceOrderHistoryAttachment(
    historyId: number,
    attachment: string,
  ): Promise<void>;
}
