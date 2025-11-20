import { StyleSheet, Pressable, Text } from "react-native"
import { ToastType, useToast } from "react-native-toast-notifications";
import {router} from "expo-router"
import { formatDate } from "../utils/formatDatehhmm";
import { AlarmProps, Weekday } from "../types";
import { postAlarm } from "../services/alarmsService";

interface SaveAlarmProps {
    title: string
    currentWeekdays: Weekday[]
    date: Date
    selectedImage: string
    alarm: AlarmProps
}

export default function SaveAlarm({
    title, currentWeekdays, date, selectedImage, alarm
}: SaveAlarmProps) {
    const toast: ToastType = useToast()

    const saveAlarm = async (): Promise<void> => {
        if (title === "") {
            toast.show("You must include a title to continue", {type: "danger"});
            return;
        }
        if (currentWeekdays.length === 0) {
            toast.show("You must include at least one weekday to continue", {type: "danger"});
            return;
        }
        if (selectedImage === null) {
            toast.show("You must include an image to continue", {type: "danger"});
            return;
        }
        try {
            const response = await postAlarm(
                title, currentWeekdays, formatDate(date), selectedImage, alarm
            );
            if (response.status !== 200 && response.status !== 201) {
                toast.show("There was an error processing the alarm", {type: "danger"});
                return;
            }
            toast.show("Photo alarm set successfully!", {type: "success"})
            router.push("/")
        } catch(err) {
            toast.show(err.toString(), {type: "danger"})
        }                    
    }

    return (
        <Pressable onPress={() => saveAlarm()} style={styles.saveButton}>
            <Text style={styles.saveText}>Save Alarm</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    saveButton: {
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: "#5b21b6",
        borderRadius: 10,
        paddingVertical: 14,
        marginHorizontal: "auto",
        width: "90%",
    },
    saveText: {
        fontSize: 18,
        color: "white",
        textAlign: "center",
        fontWeight: "700",
    }
})

