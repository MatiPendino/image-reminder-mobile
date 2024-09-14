import { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, FlatList, Platform } from 'react-native';
import { ToastProvider } from 'react-native-toast-notifications';
import * as Notifications from 'expo-notifications';
import { useToast } from "react-native-toast-notifications";
import axios from "axios";
import { getDeviceId } from "../utils/getDeviceId";
import IndexNavbar from '../components/IndexNavbar';
import AlarmCard from '../components/AlarmCard';
import PhotoRemind from '../components/PhotoRemind';
const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


async function registerForPushNotificationsAsync() {
  let token;

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
        return;
      }
    }

    // Fetch the push token for both platforms
    try {
      const response = await Notifications.getExpoPushTokenAsync({
        projectId: "4025cfaa-d740-4600-af2a-6fe40f79fc67",
      });
      token = response.data;
      console.log("Push token obtained:", token);
    } catch (error) {
      console.error("Failed to get push token:", error);
    }

  } else {
    Alert.alert('Unsupported Device', 'Must use physical device for Push Notifications');
  }

  return token;
}

export default function Home({}) {
  const toast = useToast()
  const notificationListener = useRef();
  const responseListener = useRef();

  const [alarms, setAlarms] = useState([
    /*{
      title: 'Motivation',
      weekdays: [{abbreviation: 'M', full: 'Monday'}, {abbreviation: 'S', full: 'Saturday'}],
      time: "10:36:00",
      image: require('../assets/img/background-image.png')
    }*/
  ])
  const [notificationAlarm, setNotificationAlarm] = useState(null)
  const [dataUpdated, setDataUpdated] = useState(false)
  useEffect(() => {
    const getAlarms = async () => {
      try {
        const id = await getDeviceId();
        const response = await axios.get(`${BACKEND_URL}/alarms/alarm/`, {
          headers: {
            'Device-ID': id
          }
        })
        const data = response.data
        setAlarms([...data])
      } catch (err) {
        console.log("error:", err)
      } finally {
        setDataUpdated(false)
      }
    }

    getAlarms()
  }, [dataUpdated])

  useEffect(() => {
    const postToken = async () => {
      const id = await getDeviceId();
      if (id) {
        registerForPushNotificationsAsync()
        .then(token => {
          axios.post(
            `${BACKEND_URL}/alarms/register_device/`, 
            { 
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
    postToken()
  }, []);

  useEffect(() => {
    const checkInitialNotification = async () => {
      const response = await Notifications.getLastNotificationResponseAsync();
      if (response) {
        console.log("Initial notification response:", response);
        const { alarm_id } = response.notification.request.content.data;
        handleNotificationResponse(alarm_id);
      }
    };

    checkInitialNotification();
    
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log("Notification received:", notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(async response => {
      console.log("Notification response received:", response);
      const { alarm_id } = response.notification.request.content.data;
      handleNotificationResponse(alarm_id);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const handleNotificationResponse = async (alarmId) => {
    try {
      const alarm = await getNotificationAlarm(alarmId);
      setNotificationAlarm(alarm); 
    } catch (err) {
      console.log("error:", err);
      toast.show(err.message, { type: 'danger' });
    }
  };

  const getNotificationAlarm = async (alarmId) => {
    try {
      const id = await getDeviceId();
      const response = await axios.get(`${BACKEND_URL}/alarms/alarm/${alarmId}/`, {
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

  return (
    <ToastProvider>
      {
        notificationAlarm
        ?
        <PhotoRemind notificationAlarm={notificationAlarm} setNotificationAlarm={setNotificationAlarm} />
        :
        <View style={styles.container}>
          <IndexNavbar />
          <FlatList
            data={alarms}
            contentContainerStyle={styles.listContainer}
            renderItem={({item, index}) => (
              <AlarmCard 
                key={index}
                alarm={item}
                setDataUpdated={setDataUpdated}
              />
            )}
          />
        </View>  
      }
    </ToastProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#666',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    marginTop: 10
  }
});
