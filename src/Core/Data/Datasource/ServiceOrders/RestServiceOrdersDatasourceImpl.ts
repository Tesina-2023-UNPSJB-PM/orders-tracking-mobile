import axios from 'axios';
import { PageDto } from '../../../../Common/Model/PaginationModel';
import { EmployeeOrdersSummary } from '../../../Domain/Model/EmployeeOrdersSummary';
import { ServiceOrderItem } from '../../../Domain/Model/ServiceOrderItemModel';
import { ServiceOrdersDatasource } from './ServiceOrdersDatasource';
import { ServiceOrderDetail } from '../../../Domain/Model/ServiceOrderDetailModel';
import { ServiceOrderHistoryPost } from '../../../Domain/Model/ServiceOrderHistoryPost';

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
      return data;
    });
  }

  async postServiceOrderHistory(
    serviceOrderHistoryPost: ServiceOrderHistoryPost,
  ): Promise<number> {
    console.log(
      '🚀 ~ file: RestServiceOrdersDatasourceImpl.ts:48 ~ serviceOrderHistoryPost:',
      serviceOrderHistoryPost,
    );
    //const url = `http://localhost:8090/api/tracking-so/execution-history`;
    const url = `http://vps-3107443-x.dattaweb.com/api/tracking-so/execution-history`;
    return axios
      .post<number>(url, serviceOrderHistoryPost)
      .then(({ data }) => {
        //console.log('postServiceOrderHistory - ', data);
        return data;
      })
      .catch(err => {
        console.log('postServiceOrderHistory err', JSON.stringify(err));
        return -1;
      });
  }

  async postServiceOrderHistoryAttachment(
    historyId: number,
    attachment: string,
  ): Promise<void> {
    //const url = `http://localhost:8090/api/tracking-so/execution-history/${historyId}/attachment`;
    const url = `http://vps-3107443-x.dattaweb.com/api/tracking-so/execution-history/${historyId}/attachment`;
    return axios.post<void>(url, attachment).then(({ data }) => data);
  }
}
