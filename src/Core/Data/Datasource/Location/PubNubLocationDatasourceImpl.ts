import Pubnub from 'pubnub';
import {LocationDatasource, SendLocationOptions} from './LocationDatasource';
import Config from 'react-native-config';
import uuid from 'react-native-uuid';

export class PubNubLocationDatasourceImpl implements LocationDatasource {
  private pubNubClientInstance: Pubnub = new Pubnub({
    publishKey: Config.PUBLISK_KEY ?? '',
    subscribeKey: Config.SUBSCRIBE_KEY ?? '',
    userId: `${uuid.v4()}`,
  });
  constructor() {}

  async sendLocation({
    location: currentLocation,
  }: SendLocationOptions): Promise<void> {
    console.log(
      '🚀 ~ file: PubNubLocationDatasourceImpl.ts:6 ~ PubNubLocationDatasourceImpl ~ sendLocation ~ options:',
      currentLocation,
    );

    this.pubNubClientInstance.publish(
      {
        channel: 'EMPLOYEE_TRACKING',
        message: {currentLocation},
      },
      status => console.log('pubNubPublishStatus', status),
    );
  }
}
