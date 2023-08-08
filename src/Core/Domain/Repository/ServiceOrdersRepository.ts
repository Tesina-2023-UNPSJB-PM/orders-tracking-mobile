import { EmployeeOrdersSummary } from '../Model/EmployeeOrdersSummary';
import {ServiceOrderItem} from '../Model/ServiceOrderItemModel';

export interface ServiceOrdersRepository {
  getEmployeeOrdersSummary(): Promise<EmployeeOrdersSummary>;
}
