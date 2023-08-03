export type SendLocationOptions = {
  location: {
    latitude: number;
    longitude: number;
  };
};

export interface LocationDatasource {
  sendLocation(options: SendLocationOptions): Promise<void>;
}
