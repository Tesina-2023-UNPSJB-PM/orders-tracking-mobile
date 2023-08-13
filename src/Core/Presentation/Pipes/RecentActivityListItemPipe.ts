import dayjs from 'dayjs';
import {ServiceOrderItem} from '../../Domain/Model/ServiceOrderItemModel';
import { RecentActivityListItem } from '../Hook/useServiceOrderItemModelController';

export function RecentActivityListItemPipe(recentActivity: ServiceOrderItem[]): RecentActivityListItem[] {
  return recentActivity.map(({description: title, execution, status}) => ({
    title,
    subtitle: dayjs.utc(execution.resolutionTime).format('DD/MM/YYYY HH:mm'),
    statusIcon: status.code === 'DONE' ? 'checkcircle' : 'closecircle',
    statusColor: status.code === 'DONE' ? 'green' : 'red',
  }));
}
