import RNLocation, { Subscription } from 'react-native-location';
import {
  LocationRepository,
  WatchPositionOptions,
} from '../../Domain/Repository/LocationRepository';
import {
  APP_DEFAULT_LOCATION_CONFIG,
  APP_DEFAULT_LOCATION_PERMISSIONS_CONFIG,
} from '../Constants/RNLocationConstants';
import { LocationDatasource } from '../Datasource/Location/LocationDatasource';
import { AuthDataSource } from '../Datasource/_index';

export class RNLocationRepositoryImpl implements LocationRepository {
  private locationSubscription: Subscription | undefined = undefined;

  constructor(
    private locationDatasource: LocationDatasource,
    private authDatasource: AuthDataSource,
  ) {}

  public async registerDeviceForMessaging(handler: () => void) {
    const currentUser = this.authDatasource.getCurrentUser();
    if (!currentUser) return;
    const { id } = currentUser.userProfile;
    await this.locationDatasource.registerDeviceForMessaging(`${id}`, handler);
  }

  public removeSubscription(): void {
    this.locationSubscription?.();
  }

  public async watchPosition({ success }: WatchPositionOptions): Promise<void> {
    this.removeSubscription();
    const granted = await RNLocation.requestPermission(
      APP_DEFAULT_LOCATION_PERMISSIONS_CONFIG,
    );

    if (!granted) return;

    RNLocation.configure(APP_DEFAULT_LOCATION_CONFIG);

    this.locationSubscription = RNLocation.subscribeToLocationUpdates(
      locations => {
        success(locations);
        const [location] = locations;
        const currentUser = this.authDatasource.getCurrentUser();
        if (currentUser) {
          const { username, firstName, lastName, id } = currentUser.userProfile;
          this.locationDatasource.sendLocation({
            location: {
              latitude: location.latitude,
              longitude: location.longitude,
            },
            employee: { id, username, firstName, lastName },
            employeeStatus: 'on_duty',
          });
        }
      },
    );
  }
}
