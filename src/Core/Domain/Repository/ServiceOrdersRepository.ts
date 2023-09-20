import { EmployeeOrdersSummary } from '../Model/EmployeeOrdersSummary';
import { ServiceOrderDetail } from '../Model/ServiceOrderDetailModel';
import { ServiceOrderHistoryPost } from '../Model/ServiceOrderHistoryPost';
import { ServiceOrderItem } from '../Model/ServiceOrderItemModel';

export interface ServiceOrdersRepository {
  getEmployeeOrderDetail(orderId: number): Promise<ServiceOrderDetail>;
  getEmployeeOrders(): Promise<ServiceOrderItem[]>;
  getEmployeeOrdersSummary(): Promise<EmployeeOrdersSummary>;
  addServiceOrderHistoryRecord(
    serviceOrderHistoryPost: ServiceOrderHistoryPost,
  ): Promise<number>;
}
