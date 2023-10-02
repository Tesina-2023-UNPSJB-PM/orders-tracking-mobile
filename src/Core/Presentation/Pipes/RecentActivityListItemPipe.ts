import dayjs from 'dayjs';
import { RecentActivityListItem } from '../../Domain/Model/RecentActivityListItemModel';
import { ServiceOrderItem } from '../../Domain/Model/ServiceOrderItemModel';

export function RecentActivityListItemPipe(recentActivity: ServiceOrderItem[]): RecentActivityListItem[] {
  return recentActivity.map(({description: title, execution, status, id, number}) => ({
    title,
    subtitle: `#${number} \n ${dayjs.utc(execution.resolutionTime).format('DD/MM/YYYY HH:mm')}`,
    statusIcon: status.code === 'DONE' ? 'checkcircle' : 'closecircle',
    statusColor: status.code === 'DONE' ? 'green' : 'red',
    id
  }));
}
