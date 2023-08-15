import { EmployeeOrdersSummary } from '../Model/EmployeeOrdersSummary';
import { ServiceOrderItem } from '../Model/ServiceOrderItemModel';

export interface ServiceOrdersRepository {
  getEmployeeOrders(): Promise<ServiceOrderItem[]>;
  getEmployeeOrdersSummary(): Promise<EmployeeOrdersSummary>;
}
