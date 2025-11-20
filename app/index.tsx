import { useState, useEffect } from "react";
import { ToastProvider } from "react-native-toast-notifications";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Sentry from "@sentry/react-native";
import PhotoRemind from "../screens/PhotoRemind";
import { getFCMToken, registerPush } from "../services/pushNotifications";
import Home from "../screens/Home";

const HANDLED_NOTIFICATION_KEY = "handledNotificationId";

export default function Index ({}) {
  const [notificationAlarm, setNotificationAlarm] = useState(null);

  useEffect(() => {
    const sendFCMToken = async () => {
      try {
        const existingFCMToken = await AsyncStorage.getItem("FCMToken")
        if (!existingFCMToken) {
          const fcmToken = await getFCMToken()
          const response = await registerPush(fcmToken)    
          await AsyncStorage.setItem("FCMToken", fcmToken)
        }
      } catch (error) {
        Sentry.captureException(error);
      }
    }

    sendFCMToken()
  }, [])

  useEffect(() => {
    const checkInitialNotification = async () => {
      const lastResponse = await Notifications.getLastNotificationResponseAsync();
      if (!lastResponse) return;

      const notificationId = lastResponse.notification.request.identifier;
      const savedId = await AsyncStorage.getItem(HANDLED_NOTIFICATION_KEY);

      // If we have already handled this notification, ignore it
      if (savedId === notificationId) return;

      const data = lastResponse.notification.request.content.data;
      if (data?.type === "alarm") {
        const alarm = {
          id: data.alarm_id,
          title: data.title,
          image: data.image,
          time: data.time,
        };
        setNotificationAlarm(alarm);

        // Mark this notification as handled
        await AsyncStorage.setItem(HANDLED_NOTIFICATION_KEY, notificationId);
      }
    };

    checkInitialNotification();

    // Listener for taps when app is in background/foreground
    const subscription = Notifications.addNotificationResponseReceivedListener(async response => {
      const notificationId = response.notification.request.identifier;
      const data = response.notification.request.content.data;

      if (data?.type === "alarm") {
        const alarm = {
          id: data.alarm_id,
          title: data.title,
          image: data.image,
          time: data.time,
        };
        setNotificationAlarm(alarm);
        await AsyncStorage.setItem(HANDLED_NOTIFICATION_KEY, notificationId);
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <ToastProvider>
      {
        notificationAlarm
        ?
        <PhotoRemind 
          notificationAlarm={notificationAlarm} 
          setNotificationAlarm={setNotificationAlarm} 
        />
        :
        <Home />
      }
    </ToastProvider>
  );
}
