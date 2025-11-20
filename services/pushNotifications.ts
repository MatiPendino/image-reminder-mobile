import * as Notifications from "expo-notifications";
import { getDeviceId } from "../utils/getDeviceId";
import api from "./api";

export const registerPush = async (fcmToken) => {
  const id = await getDeviceId();
  try {
      const response = await api.post("/notifications/fcm_token/", {
          headers: {
            "Device-ID": id,
          },
          device_id: id,
          fcm_token: fcmToken
      })
      return response
  } catch (error) {
      throw error.response.data
  }
}

export const getFCMToken = async () => {
  const token = (await Notifications.getDevicePushTokenAsync()).data;
  return token
}