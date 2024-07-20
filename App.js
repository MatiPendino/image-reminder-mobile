import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Navbar from './components/Navbar';
import AlarmCard from './components/AlarmCard';
import CreateAlarm from './components/CreateAlarm';

export default function App() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [alarms, setAlarms] = useState([
    {
      title: 'Motivation',
      interval: 'Daily',
      time: '06:30'
    }
  ])
  return (
    <View style={styles.container}>
      <Navbar onModalVisible={setIsModalVisible} />
      <FlatList
        data={alarms}
        contentContainerStyle={styles.listContainer}
        renderItem={({item, index}) => (
          <AlarmCard 
            key={index}
            title={item.title}
            interval={item.interval}
            time={item.time}
          />
        )}
      />
      <CreateAlarm
        isVisible={isModalVisible}
        onModal={setIsModalVisible}
      />
      <StatusBar style="dark" />
    </View>
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
