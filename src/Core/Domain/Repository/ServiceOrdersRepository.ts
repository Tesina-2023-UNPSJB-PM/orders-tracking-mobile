import {ServiceOrderItem} from '../Model/ServiceOrderItemModel';

export interface ServiceOrdersRepository {
  /**
   *
   *
   * @return {number of user's assigned pending orders}  {Promise<number>}
   * @memberof ServiceOrdersRepository
   */
  countAssignedPendingOrders(): Promise<number>;

  /**
   *
   *
   * @return {Recent orders }  {Promise<ServiceOrderItem[]>}
   * @memberof ServiceOrdersRepository
   */
  getRecentActivity(): Promise<ServiceOrderItem[]>;
}
