import { View, StyleSheet, Pressable, Text } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getLocalTimeStr } from "../utils/getLocalTimeStr";

interface Props {
    alarmTime: string;
    deleteAlarm: () => void;
}

const RemoveAlarm = ({alarmTime, deleteAlarm}: Props) => {
    return (
        <View style={styles.timeWrapper}>
            <Text style={styles.alarmTime}>
                {getLocalTimeStr(alarmTime)}
            </Text>
            <Pressable onPress={deleteAlarm} style={styles.deleteButton}>
                <MaterialCommunityIcons name="clock-remove" size={20} color="#ef4444" />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    timeWrapper: {
        alignItems: "flex-end",
        justifyContent: "space-between",
        marginLeft: 10,
    },
    alarmTime: {
        fontSize: 22,
        color: "#111827",
        fontWeight: "800",
    },
    deleteButton: {
        marginTop: 10,
        padding: 6,
        borderRadius: 999,
        backgroundColor: "#fee2e2",
    },
});

export default RemoveAlarm;