import { StyleSheet, View, Text } from "react-native";
import ImageViewer from "../components/ImageViewer";
import PhotoRemindNavbar from "../components/PhotoRemindNavbar"
import { getLocalTimeStr } from "../utils/getLocalTimeStr";
import { AlarmProps } from "../types";
import { MAIN_COLOR } from "../constants/appConstants";

const placeholderImage = require("../assets/img/background-image.png")

interface PhotoRemindProps {
    notificationAlarm: AlarmProps
    setNotificationAlarm: React.Dispatch<React.SetStateAction<AlarmProps>>
}

export default function PhotoRemind({
    notificationAlarm, setNotificationAlarm
}: PhotoRemindProps) {

    return (
        <>
            <PhotoRemindNavbar setNotificationAlarm={setNotificationAlarm} />
            <View style={styles.container}>
                <Text style={styles.alarmTitle}>
                    {notificationAlarm.title}
                </Text>
                <View style={styles.imageContainer}>
                    <ImageViewer 
                        placeholderImageSource={placeholderImage} 
                        selectedImage={`${process.env.BACKEND_URL}/${notificationAlarm.image}`}
                    />
                </View>
                <Text style={styles.alarmTime}>
                    {getLocalTimeStr(notificationAlarm.time)}
                </Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 26,
        backgroundColor: "#f8fafc",
        flex: 1,
        paddingHorizontal: 20,
        paddingBottom: 24,
    },
    alarmTitle: {
        fontSize: 32,
        fontWeight: "800",
        textAlign: "center",
        marginBottom: 6,
        color: "#0f172a"
    },
    alarmTime: {
        fontSize: 38,
        fontWeight: "700",
        textAlign: "center",
        marginTop: 26,
        color: MAIN_COLOR
    },
    imageContainer: {
      textAlign: "center",
      alignItems: "center"
    }
  });