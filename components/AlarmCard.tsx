import { Pressable, StyleSheet } from "react-native";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { ToastType, useToast } from "react-native-toast-notifications";
import * as Sentry from "@sentry/react-native";
import { useNavigation } from "expo-router";
import { getDeviceId } from "../utils/getDeviceId";
import api from "../services/api";
import { AlarmProps } from "../types";
import RemoveAlarm from "./RemoveAlarm";
import AlarmWeekdaysTitle from "./AlarmWeekdaysTitle";

interface AlarmCardProps {
  alarm: AlarmProps;
  onDeleted: () => void;
}

interface RootStackParamList extends ParamListBase {
  alarm: { alarm: AlarmProps };
}

export default function AlarmCard({ alarm, onDeleted }: AlarmCardProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const toast: ToastType = useToast();

  const deleteAlarm = async (): Promise<void> => {
    try {
      const id = await getDeviceId();
      const response = await api.delete(`/alarms/alarm/${alarm.id}/`, {
        headers: {
          "Device-ID": id,
        },
      });
      if (response.status === 204) {
        toast.show("Alarm removed", { type: "success" });
        onDeleted();
      }
    } catch (err) {
      toast.show("There was an error deleting this alarm", { type: "danger" });
      Sentry.captureException(err);
    }
  };

  return (
    <Pressable
      onPress={() =>
        navigation.navigate("alarm", {alarm: alarm})
      }
      style={styles.alarmContainer}
    >
      {/* Left side: title + weekdays */}
      <AlarmWeekdaysTitle alarmTitle={alarm.title} weekdays={alarm.weekdays} />

      {/* Right side: time + delete */}
      <RemoveAlarm alarmTime={alarm.time} deleteAlarm={deleteAlarm} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  alarmContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingHorizontal: 14,
    paddingVertical: 16,
    justifyContent: "space-between",
    borderRadius: 12,
    shadowColor: "#00000010",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    marginBottom: 12,
    width: "94%",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
});
