import notifee, {
  EventType,
  Notification
} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import Pubnub from 'pubnub';
import Config from 'react-native-config';
import { LocationDatasource, SendLocationOptions } from './LocationDatasource';

var EventEmitter = require('eventemitter3');

export const eventEmitter = new EventEmitter();
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
        message: { ...options },
      },
      status => console.log('pubNubPublishStatus', status),
    );
  }

  async registerDeviceForMessaging(employeeId: string) {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();

    this.pubNubClientInstance.push.addChannels({
      channels: ['notifications', `EMPLOYEE_${employeeId}`],
      device: token,
      pushGateway: 'gcm',
    });

    messaging().setBackgroundMessageHandler(onMessageReceived);
    messaging().onMessage(onMessageReceived);

    notifee.onBackgroundEvent(event => notificationActionHandler(event));

    notifee.onForegroundEvent(event => notificationActionHandler(event));
  }
}

const onMessageReceived = async (message: any) => {
  notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  const notification: Notification = {
    ...message.notification,
    android: {
      channelId: 'default',
      smallIcon: 'ic_notification_icon',
      color: '#4A4E69',
    },
  };

  await notifee.displayNotification(notification);
};

const notificationActionHandler = async ({ type, detail }: any) => {
  const { notification, pressAction } = detail;

  if (type === EventType.PRESS) {
    eventEmitter.emit('notificationReceived', notification);
    const id = notification?.id;
    if (!id) return;
    await notifee.cancelNotification(id);
  }
};
