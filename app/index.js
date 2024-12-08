import { useState, useEffect, useRef } from 'react';
import { ToastProvider } from 'react-native-toast-notifications';
import * as Notifications from 'expo-notifications';
import PhotoRemind from '../screens/PhotoRemind';
import Home from '../screens/Home';
import { checkInitialNotification, postToken } from '../services/pushNotifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function Index({}) {
  const notificationListener = useRef();
  const responseListener = useRef();

  const [notificationAlarm, setNotificationAlarm] = useState(null)

  useEffect(() => {
    postToken()
  }, []);

  useEffect(() => {
    checkInitialNotification(setNotificationAlarm);
    
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log("Notification received:", notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(async response => {
      console.log("Notification response received:", response);
      const { alarm_id } = response.notification.request.content.data;
      handleNotificationResponse(alarm_id, setNotificationAlarm);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <ToastProvider>
      {
        notificationAlarm
        ?
        <PhotoRemind notificationAlarm={notificationAlarm} setNotificationAlarm={setNotificationAlarm} />
        :
        <Home />
      }
    </ToastProvider>
  );
}
