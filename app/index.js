import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { ToastProvider } from 'react-native-toast-notifications';
import axios from "axios";
import { getDeviceId } from "../utils/getDeviceId";
import IndexNavbar from '../components/IndexNavbar';
import AlarmCard from '../components/AlarmCard';

export default function App() {
  const [alarms, setAlarms] = useState([
    {
      title: 'Motivation',
      weekdays: [{abbreviation: 'M', full: 'Monday'}, {abbreviation: 'S', full: 'Saturday'}],
      time: "10:36:00",
      image: require('../assets/img/background-image.png')
    }
  ])
  // Get the unique device ID
  useEffect(() => {
    const getAlarms = async () => {
      try {
        const id = await getDeviceId();
          const response = await axios.get('http://192.168.20.51:8000/alarms/', {
            headers: {
              'Device-ID': id
            }
          })
          const data = response.data
          console.log(data)
          console.log(data.length)
          setAlarms([...alarms, ...data])
          console.log([...alarms, ...data])
      } catch (err) {
        console.log(err)
      }
    }

    getAlarms()
  }, [])
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
            />
          )}
        />
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
