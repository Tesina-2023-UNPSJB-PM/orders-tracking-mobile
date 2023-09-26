import Pubnub from 'pubnub';
import Config from 'react-native-config';
import { LocationDatasource, SendLocationOptions } from './LocationDatasource';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import { PermissionsAndroid, Platform } from 'react-native';
import { PERMISSIONS, request } from 'react-native-permissions';
import notifee, {
  EventType,
  AndroidImportance,
  TriggerType,
  Trigger,
  Notification,
} from '@notifee/react-native';

var EventEmitter = require('eventemitter3');

export const eventEmitter = new EventEmitter();
export class PubNubLocationDatasourceImpl implements LocationDatasource {
  private pubNubClientInstance: Pubnub = new Pubnub({
    publishKey: Config.PUBLISK_KEY ?? '',
    subscribeKey: Config.SUBSCRIBE_KEY ?? '',
    userId: `OrdersTrackingMobileApp`,
  });
  constructor() {
    //this.requestFCMPermission();
    this.registerDeviceForMessaging();
  }

  async sendLocation(options: SendLocationOptions): Promise<void> {
    this.pubNubClientInstance.publish(
      {
        channel: 'EMPLOYEE_TRACKING',
        message: { ...options },
      },
      status => console.log('pubNubPublishStatus', status),
    );
  }

  async registerDeviceForMessaging() {
    try {
      await messaging().registerDeviceForRemoteMessages();
      const token = await messaging().getToken();
  
      console.log('FCM Token: ', token);
  
      this.pubNubClientInstance.push.addChannels({
        channels: ['notifications', 'default'],
        device: token,
        pushGateway: 'gcm',
      });
  
      messaging().setBackgroundMessageHandler(onMessageReceived);
      messaging().onMessage(onMessageReceived);
  
      notifee.onBackgroundEvent(async event => notificationActionHandler(event));
  
      notifee.onForegroundEvent(async event => notificationActionHandler(event));
    } catch (error) {
      console.log('FCM ERROR', error);
      
    }
  }
}

const onMessageReceived = async (message: any) => {
  notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  const notification: Notification = {
    ...message.notification,
    android: { channelId: 'default', smallIcon: 'ic_notification_icon', color: '#4A4E69' },
  };

  await notifee.displayNotification(notification);
};

const notificationActionHandler = async ({ type, detail }: any) => {
  const { notification, pressAction } = detail;

  if (type === EventType.PRESS) {
    eventEmitter.emit('notificationReceived', notification);

    const id = notification?.id;

    if (!id) return;

    // Remove the notification
    await notifee.cancelNotification(id);
  }
};
