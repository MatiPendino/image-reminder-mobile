import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { ToastProvider } from 'react-native-toast-notifications';
import IndexNavbar from '../components/IndexNavbar';
import AlarmCard from '../components/AlarmCard';
import CreateAlarm from '../components/CreateAlarm';

export default function App() {
  const [alarms, setAlarms] = useState([
    {
      title: 'Motivation',
      days: [{abbreviation: 'M', full: 'Monday'}, {abbreviation: 'S', full: 'Saturday'}],
      time: new Date(2024, 6, 27, 11, 50),
      image: require('../assets/img/background-image.png')
    }
  ])
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
        {/*<CreateAlarm
          isVisible={isModalVisible}
          onModal={setIsModalVisible}
          alarms={alarms}
          setAlarms={setAlarms}
        />*/}
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
