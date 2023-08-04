import Pubnub from 'pubnub';
import {LocationDatasource, SendLocationOptions} from './LocationDatasource';
import Config from 'react-native-config';

export class PubNubLocationDatasourceImpl implements LocationDatasource {
  private pubNubClientInstance: Pubnub = new Pubnub({
    publishKey: Config.PUBLISK_KEY ?? '',
    subscribeKey: Config.SUBSCRIBE_KEY ?? '',
    userId: `OrdersTrackingMobileApp`,
  });
  constructor() {}

  async sendLocation(options: SendLocationOptions): Promise<void> {

    this.pubNubClientInstance.publish(
      {
        channel: 'EMPLOYEE_TRACKING',
        message: {...options},
      },
      status => console.log('pubNubPublishStatus', status),
    );
  }
}
