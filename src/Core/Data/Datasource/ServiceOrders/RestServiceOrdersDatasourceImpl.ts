import axios from 'axios';
import { PageDto } from '../../../../Common/Model/PaginationModel';
import { EmployeeOrdersSummary } from '../../../Domain/Model/EmployeeOrdersSummary';
import { ServiceOrderItem } from '../../../Domain/Model/ServiceOrderItemModel';
import { EMPLOYEE_ORDERS_SUMMARY } from '../../Constants/EmployeeServiceOrdersSummary';
import { ServiceOrdersDatasource } from './ServiceOrdersDatasource';

export class RestServiceOrdersDatasourceImpl
  implements ServiceOrdersDatasource
{
  async fetchServiceOrders(
    employeeId: number,
    statusCode: 'DONE' | 'PENDING' | 'CANCELED',
  ): Promise<PageDto<ServiceOrderItem>> {
    const url = 'http://vps-3107443-x.dattaweb.com/api/tracking-so/orders';
    return axios
      .get(url, {
        params: {
          employeeId,
          statusCode,
        },
      })
  }

  async fetchEmployeeOrdersSummary(
    employeeId: number,
  ): Promise<EmployeeOrdersSummary> {
    /** @todo add endpoint invocation */
    return EMPLOYEE_ORDERS_SUMMARY;
  }
}
