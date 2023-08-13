import { EmployeeOrdersSummary } from '../Model/EmployeeOrdersSummary';

export interface ServiceOrdersRepository {
  getEmployeeOrdersSummary(): Promise<EmployeeOrdersSummary>;
}
