import { View, StyleSheet, Pressable, Text } from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import { ParamListBase, NavigationProp } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { AlarmProps } from "../types";
import { MAIN_COLOR } from "../constants/appConstants";

interface RootStackParamList extends ParamListBase {
    alarm: AlarmProps
}

export default function IndexNavbar({}) {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    return (
        <View style={styles.navbarContainer}>
            <View>
                <Text style={styles.appTitle}>Photo alarms</Text>
                <Text style={styles.appSubtitle}>Keep your memories on schedule</Text>
            </View>

            <Pressable 
                onPress={() => navigation.navigate("alarm")}
                style={styles.addButton}
            >
                <FontAwesome name="plus" size={24} color="white" />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    navbarContainer: {
        backgroundColor: MAIN_COLOR,
        width: "100%",
        paddingTop: 52,
        paddingHorizontal: 18,
        paddingBottom: 14,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
    },
    appTitle: {
        color: "white",
        fontSize: 22,
        fontWeight: "800"
    },
    appSubtitle: {
        color: "#e9d5ff",
        fontSize: 13,
        marginTop: 2,
    },
    addButton: {
        backgroundColor: "#7c3aed",
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        shadowColor: "#00000044",
        shadowOpacity: 0.5,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
    }
})