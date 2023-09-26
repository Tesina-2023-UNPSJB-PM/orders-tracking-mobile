export type SendLocationOptions = {
  employeeStatus: 'available' | 'on_duty';
  employee: {
    username: string;
    firstName: string;
    lastName: string;
    id: number;
  };
  location: {
    latitude: number;
    longitude: number;
  };
};

export interface LocationDatasource {
  sendLocation(options: SendLocationOptions): Promise<void>;
  registerDeviceForMessaging(employeeId: string): Promise<void>;
}
