import api from "./api";
import { Platform, PermissionsAndroid, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import { getDeviceId } from "../utils/getDeviceId";

const registerForPushNotificationsAsync = async (): Promise<string | null> => {
    let token: string | null
  
    // Check platform and request permissions
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      if (Platform.OS === 'android') {
        // Request POST_NOTIFICATIONS permission for Android 13+
        if (Platform.Version >= 33) { 
          const result = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
          );
          if (result !== PermissionsAndroid.RESULTS.GRANTED) {
            Alert.alert('Permission denied', 'Failed to get push token for push notification!');
            return;
          }
        }
  
        // Set notification channel for Android
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
  
      // Request notification permissions for iOS
      if (Platform.OS === 'ios') {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
  
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
  
        if (finalStatus !== 'granted') {
          Alert.alert('Permission denied', 'Failed to get push token for push notification!');
          return
        }
      }
  
      // Fetch the push token for both platforms
      try {
        const response = await Notifications.getExpoPushTokenAsync({
          projectId: process.env.projectId,
        });
        token = response.data;
      } catch (error) {
        console.error("Failed to get push token:", error);
      }
  
    } else {
      Alert.alert('Unsupported Device', 'Must use physical device for Push Notifications');
    }
  
    return token
}


const handleNotificationResponse = async (alarmId, setNotificationAlarm): Promise<void> => {
    try {
      const alarm = await getNotificationAlarm(alarmId);
      setNotificationAlarm(alarm); 
    } catch (err) {
      console.log("error:", err);
    }
  };

const getNotificationAlarm = async (alarmId) => {
    try {
        const id = await getDeviceId();
        const response = await api.get(`/alarms/alarm/${alarmId}/`, {
            headers: {
                'Device-ID': id
            }
        })
        const data = response.data
        return data
    } catch (err) {
        console.log("error", err)
        throw new Error(err)
    } 
}



export const postToken = async () => {
    const id = await getDeviceId();
    if (id) {
      registerForPushNotificationsAsync()
      .then(token => {
        api.post('/alarms/register_device/', { 
            token: token 
        },
        {
            headers: {
                'Device-ID': id,
            }
        }
        );
      }); 
    }
}


export const checkInitialNotification = async (setNotificationAlarm): Promise<void> => {
    const response = await Notifications.getLastNotificationResponseAsync();
    if (response) {
        console.log("Initial notification response:", response);
        const { alarm_id } = response.notification.request.content.data;
        handleNotificationResponse(alarm_id, setNotificationAlarm);
    }
};