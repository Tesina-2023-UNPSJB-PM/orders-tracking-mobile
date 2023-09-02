import { Status, Type } from './ServiceOrderItemModel';

export interface ServiceOrderDetail {
  id: number;

  number: string;

  description: string;

  type: Type;

  status: Status;

  priority: string;

  execution: OrderExecutionDTO;

  customer: CustomerDTO;

  destination: OrderLocationDTO;

  creationTime: Date;

  detail: any;
}

interface OrderLocationDTO {
  id: number;
  address: AddressDTO;
  referenceInfo: string;
}

interface AddressDTO {
  id?: number;
  description: string;
  city: string;
  zipCode?: string;
  state: string;
  country: string;
  latitude?: number;
  longitude?: number;
}

interface OrderExecutionDTO {
  id?: number;
  observations?: string;
  executorEmployeId?: number;
  assignedSectorId?: number;
  assignedTime?: Date;
  estimatedResolutionTime?: Date;
  resolutionTime?: Date;
}

export interface CustomerDTO {
  id?: number;
  customerNumber?: string;
  documentNumber?: string;
  firstName?: string;
  lastName?: string;
  businessName?: string;
  email?: string;
  phones?: string[];
}
