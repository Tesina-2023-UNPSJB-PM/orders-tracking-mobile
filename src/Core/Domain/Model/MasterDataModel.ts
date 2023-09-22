export interface MasterData {
  serviceOrderStates: ServiceOrderState[];
  serviceOrderTypes: ServiceOrderType[];
  customers: Customer[];
  employees: Employee[];
  reasons: Reason[];
}

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  recordNumber: string;
}

interface Customer {
  id: number;
  customerNumber: string;
  documentNumber: string;
  firstName: string;
  lastName: string;
  businessName?: string;
  email: string;
  phones: string;
}

interface ServiceOrderType {
  id: number;
  name: string;
  description: string;
}

interface ServiceOrderState {
  code: string;
  name: string;
  description: string;
}

export interface Reason {
  id: number;
  name: string;
  description: string;
}
