import {ServiceOrderItem} from '../../Domain/Model/ServiceOrderItemModel';

export const SERVICE_ORDERS_ITEMS: ServiceOrderItem[] = [
  {
    id: 1,
    number: '0001784',
    description: 'Orden de servicio de ejemplo 1',
    creationTime: '2023-06-03T22:13:09.329Z',
    priority: 'LOW',
    status: {
      code: 'DONE',
      name: 'Pendiente',
      description: 'La orden de servicio fue finalizada con éxito.',
    },
    type: {
      id: 1,
      name: 'Alta Socio',
      description: 'Alta de un nuevo socio (Luz, Agua y cloacas)',
    },
    customerId: 25,
    destination: {
      address: {
        id: 1,
        description: 'dolore incididunt dolor cillum',
        city: 'Lorem pariatur',
        country: 'fugiat commodo',
        state: 'in officia culpa sed',
        zipCode: 'in',
        latitude: -42.786055,
        longitude: -65.045506,
      },
      referenceInfo: 'Puerta azul',
    },
    execution: {
      executorEmployeId: 2,
      assignedSectorId: 1,
      observations: 'Orden de ejecución de prueba 1',
      assignedTime: '2023-06-03T21:53:49.182Z',
      estimatedResolutionTime: '2023-06-04T10:00:00.000Z',
      resolutionTime: '2023-06-04T11:10:00.000Z',
    },
    detail: null,
  },
  {
    id: 2,
    number: '00024785',
    description: 'Orden de servicio de ejemplo 2',
    creationTime: '2023-06-03T22:13:57.697Z',
    priority: 'MEDIUM',
    status: {
      code: 'CANCELED',
      name: 'Cancelada',
      description: 'La orden de servicio fue cancelada.',
    },
    type: {
      id: 2,
      name: 'Baja Socio',
      description: 'Baja de un socio',
    },
    customerId: 26,
    destination: {
      address: {
        id: 2,
        description: 'dolore incididunt dolor cillum',
        city: 'Lorem pariatur',
        country: 'fugiat commodo',
        state: 'in officia culpa sed',
        zipCode: 'in',
        latitude: -41.605791,
        longitude: -65.363961,
      },
      referenceInfo: 'Porton marron',
    },
    execution: {
      executorEmployeId: 1,
      assignedSectorId: 2,
      observations: 'Orden de ejecución de prueba 2',
      assignedTime: '2023-06-03T21:53:53.680Z',
      estimatedResolutionTime: '2023-06-05T12:00:00.000Z',
      resolutionTime: '2023-08-05T07:00:00.000Z',
    },
    detail: null,
  },
];
