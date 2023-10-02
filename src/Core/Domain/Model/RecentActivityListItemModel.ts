import { LargeNumberLike } from "crypto";

export type RecentActivityListItem = {
  title: string;
  subtitle: string;
  statusIcon: 'checkcircle' | 'closecircle';
  statusColor: 'green' | 'red';
  id: number;
};
