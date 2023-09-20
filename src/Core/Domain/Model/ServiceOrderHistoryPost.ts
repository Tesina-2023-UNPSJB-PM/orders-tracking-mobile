export type ServiceOrderHistoryPost = {
  serviceOrderId: number | null;
  executionId: number | null;
  assignedEmployeeId: number | null;
  newStatus: string | null;
  reasonId: number | null;
  observations: string | null;
  attachments: string | null;
};
