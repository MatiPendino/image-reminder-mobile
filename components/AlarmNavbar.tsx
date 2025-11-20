import { View, StyleSheet, Pressable, Text } from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import { useNavigation } from "expo-router";
import { MAIN_COLOR } from "../constants/appConstants";

interface AlarmNavbarProps {
    title: string
}

export default function AlarmNavbar({title}: AlarmNavbarProps) {
    const navigation = useNavigation();

    return (
        <View style={styles.navbarContainer}>
            <Pressable 
                onPress={() => navigation.goBack()}
                style={styles.backButton}
            >
                <FontAwesome name="arrow-left" size={22} color="white" />
            </Pressable>
            <Text style={styles.navbarTitle}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    navbarContainer: {
        backgroundColor: MAIN_COLOR,
        width: "100%",
        paddingTop: 50,
        paddingHorizontal: 18,
        paddingBottom: 14,
        flexDirection: "row",
        alignItems: "center",
    },
    backButton: {
        padding: 8,
        marginRight: 10,
    },
    navbarTitle: {
        color: "white",
        fontSize: 18,
        fontWeight: "700"
    }
})