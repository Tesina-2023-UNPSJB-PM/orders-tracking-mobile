import {ServiceOrderItem} from '../../Domain/Model/ServiceOrderItemModel';
import {ServiceOrdersRepository} from '../../Domain/Repository/ServiceOrdersRepository';
import {SERVICE_ORDERS_ITEMS} from '../Constants/ServiceOrders';

export class ServiceOrdersRepositoryImpl implements ServiceOrdersRepository {
  async countAssignedPendingOrders(): Promise<number> {
    return 5;
  }

  async getRecentActivity(): Promise<ServiceOrderItem[]> {
    return SERVICE_ORDERS_ITEMS;
  }
}
