import { StyleSheet, View, Pressable, Text } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { AlarmProps } from "../types";
import { MAIN_COLOR } from "../constants/appConstants";

interface PhotoRemindNavbarProps {
    setNotificationAlarm: React.Dispatch<React.SetStateAction<AlarmProps>>
}

export default function PhotoRemindNavbar({setNotificationAlarm}: PhotoRemindNavbarProps) {
    return (
        <View style={styles.navbarContainer}>
            <Text style={styles.title}>Alarm reminder</Text>
            <Pressable 
                onPress={() => setNotificationAlarm(null)}
                style={styles.navbarClose}
            >
                <AntDesign name="close" size={28} color="white" />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    navbarContainer: {
        backgroundColor: MAIN_COLOR,
        width: "100%",
        paddingTop: 50,
        paddingStart: 18,
        paddingBottom: 12,
        paddingEnd: 10,
        textAlign: "right",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    navbarClose: {
        paddingEnd: 10
    },
    title: {
        color: "white",
        fontSize: 18,
        fontWeight: "700"
    }
})