export type SendLocationOptions = {
  employeeStatus: 'available' | 'on_duty';
  employee: {
    username: string;
    firstName: string;
    lastName: string;
  };
  location: {
    latitude: number;
    longitude: number;
  };
};

export interface LocationDatasource {
  sendLocation(options: SendLocationOptions): Promise<void>;
}
