import axios from 'axios';
import { PageDto } from '../../../../Common/Model/PaginationModel';
import { EmployeeOrdersSummary } from '../../../Domain/Model/EmployeeOrdersSummary';
import { ServiceOrderItem } from '../../../Domain/Model/ServiceOrderItemModel';
import { ServiceOrdersDatasource } from './ServiceOrdersDatasource';
import { ServiceOrderDetail } from '../../../Domain/Model/ServiceOrderDetailModel';

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
      .then(({ data }) => data);
  }

  async fetchEmployeeOrderDetail(orderId: number): Promise<ServiceOrderDetail> {
    const url = `http://vps-3107443-x.dattaweb.com/api/tracking-so/orders/${orderId}`;
    return axios.get<ServiceOrderDetail>(url).then(({ data }) => {
      console.log('fetchEmployeeOrderDetail - ', data.description);
      return data;
    });
  }
}
