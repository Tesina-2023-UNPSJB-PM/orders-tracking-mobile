import { ServiceOrderItem } from './ServiceOrderItemModel';

export type EmployeeOrdersSummary = {
  assignedServiceOrders: ServiceOrderItem[];
  recentActivity: ServiceOrderItem[];
};
