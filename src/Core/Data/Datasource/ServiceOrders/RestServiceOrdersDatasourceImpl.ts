import axios from 'axios';
import { PageDto } from '../../../../Common/Model/PaginationModel';
import { EmployeeOrdersSummary } from '../../../Domain/Model/EmployeeOrdersSummary';
import { ServiceOrderItem } from '../../../Domain/Model/ServiceOrderItemModel';
import { ServiceOrdersDatasource } from './ServiceOrdersDatasource';

export class RestServiceOrdersDatasourceImpl
  implements ServiceOrdersDatasource
{
  async fetchServiceOrders(
    employeeId: number,
    statusCode: 'DONE' | 'PENDING' | 'CANCELED',
  ): Promise<PageDto<ServiceOrderItem>> {
    const url = 'http://vps-3107443-x.dattaweb.com/api/tracking-so/orders';
    return axios.get(url, {
      params: {
        employeeId,
        statusCode,
      },
    });
  }

  async fetchEmployeeOrdersSummary(
    employeeId: number,
  ): Promise<EmployeeOrdersSummary> {
    const url = `http://vps-3107443-x.dattaweb.com/api/tracking-so/orders/summary`;
    return axios
      .get<EmployeeOrdersSummary>(url, {
        params: {
          employeeId,
        },
      })
      .then(({ data }) => {
        console.log("🚀 ~ file: RestServiceOrdersDatasourceImpl.ts:35 ~ .then ~ data:", data)
        return data
      });
  }
}
