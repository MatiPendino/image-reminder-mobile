import { useState, useEffect } from 'react';
import { ToastProvider } from 'react-native-toast-notifications';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import PhotoRemind from '../screens/PhotoRemind';
import { getFCMToken, registerPush } from '../services/pushNotifications';
import Home from '../screens/Home';

export default function Index ({}) {
  const [notificationAlarm, setNotificationAlarm] = useState(null);

  useEffect(() => {
    const sub = Notifications.addNotificationResponseReceivedListener(async response => {      
      console.log("Notification response received:", response);
      const { alarm_id } = response.notification.request.content.data;
      handleNotificationResponse(alarm_id, setNotificationAlarm);
    });
    return () => Notifications.removeNotificationSubscription(sub);
  }, []);

  useEffect(() => {
    const sendFCMToken = async () => {
      try {
        const existingFCMToken = await AsyncStorage.getItem('FCMToken')
        if (!existingFCMToken) {
          const fcmToken = await getFCMToken()
          const response = await registerPush(fcmToken)    
          await AsyncStorage.setItem('FCMToken', fcmToken)
      }
      } catch (error) {
        console.log(error)
      }
    }

    sendFCMToken()
  })

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
