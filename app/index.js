import { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, FlatList, Platform, Pressable, Text } from 'react-native';
import { ToastProvider } from 'react-native-toast-notifications';
import * as Notifications from 'expo-notifications';
import axios from "axios";
import { getDeviceId } from "../utils/getDeviceId";
import IndexNavbar from '../components/IndexNavbar';
import AlarmCard from '../components/AlarmCard';
import {BACKEND_URL} from '@env'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

async function registerForPushNotificationsAsync() {
  let token;
  if (Platform.OS === 'android' || Platform.OS === 'ios') {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus.status;
    if (existingStatus.status !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync({
      projectId: "db0e8d38-cec2-4790-9c4d-cbaa9611efb6",
    })).data
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (token) {
    console.log(token)
    return token; 
  }
}

export default function Home({}) {
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
  const [dataUpdated, setDataUpdated] = useState(false)
  useEffect(() => {
    const getAlarms = async () => {
      try {
        const id = await getDeviceId();
        const response = await axios.get(`${BACKEND_URL}/alarms/`, {
          headers: {
            'Device-ID': id
          }
        })
        const data = response.data
        setAlarms([...data])
      } catch (err) {
        console.log(err)
      } finally {
        setDataUpdated(false)
      }
    }

    getAlarms()
  }, [dataUpdated])

  const sendPushNots = async () => {
    axios.post(
      `${BACKEND_URL}/alarms/sent_nots/`, 
    );
  }

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

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      // Handle notification received
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      // Handle notification response
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <ToastProvider>
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
        <Pressable onPress={() => sendPushNots()}>
          <Text>Testing nots</Text>
        </Pressable>
      </View>  
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
