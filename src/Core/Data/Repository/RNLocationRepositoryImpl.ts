import RNLocation, {Subscription} from 'react-native-location';
import {
  LocationRepository,
  WatchPositionOptions,
} from '../../Domain/Repository/LocationRepository';
import {
  APP_DEFAULT_LOCATION_CONFIG,
  APP_DEFAULT_LOCATION_PERMISSIONS_CONFIG,
} from '../Constants/RNLocationConstants';
import {LocationDatasource} from '../Datasource/Location/LocationDatasource';

export class RNLocationRepositoryImpl implements LocationRepository {
  private locationSubscription: Subscription | undefined = undefined;

  constructor(private locationDatasource: LocationDatasource) {}

  private removeSubscription(): void {
    this.locationSubscription?.();
  }

  public async watchPosition({success}: WatchPositionOptions): Promise<void> {
    this.removeSubscription();
    const granted = await RNLocation.requestPermission(
      APP_DEFAULT_LOCATION_PERMISSIONS_CONFIG,
    );

    if (!granted) return;

    RNLocation.configure(APP_DEFAULT_LOCATION_CONFIG);

    this.locationSubscription = RNLocation.subscribeToLocationUpdates(
      locations => {
        success(locations);
        this.locationDatasource.sendLocation({location: locations[0]});
      },
    );
  }
}
