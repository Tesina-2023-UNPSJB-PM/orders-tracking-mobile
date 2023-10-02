export type ServiceOrderHistoryPost = {
  serviceOrderId: number | null;
  executionId: number | null;
  assignedEmployeeId: number | null;
  status: string | null;
  reasonId: number | null;
  observations: string | null;
  attachments: string | null;
};
