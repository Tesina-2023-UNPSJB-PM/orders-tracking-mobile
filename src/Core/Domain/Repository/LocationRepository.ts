import { Location } from 'react-native-location';

export type WatchPositionOptions = {
  success: (locations: Location[]) => void;
};

export interface LocationRepository {
  watchPosition(options: WatchPositionOptions): Promise<void>;
  registerDeviceForMessaging(handler: () => void): Promise<void>;
}
