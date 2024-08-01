import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

const DEVICE_ID_KEY = 'DEVICE_ID';

export const getDeviceId = async () => {
  try {
    // Check if a UUID is already stored
    let deviceId = await AsyncStorage.getItem(DEVICE_ID_KEY);
    if (!deviceId) {
      // If not, generate a new UUID
      deviceId = uuid.v4();
      // Store the UUID
      await AsyncStorage.setItem(DEVICE_ID_KEY, deviceId);
    }
    return deviceId;
  } catch (error) {
    console.error("Error getting or generating device ID:", error);
    return null;
  }
};
