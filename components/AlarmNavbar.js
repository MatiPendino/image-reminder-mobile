import { View, StyleSheet } from "react-native"
import { Link } from "expo-router"
import { FontAwesome } from "@expo/vector-icons"

export default function AlarmNavbar({}) {
    return (
        <View style={styles.navbarContainer}>
            <Link href="/">
                <FontAwesome
                    name='arrow-left'
                    size={30}
                    color='#fff'
                />
            </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    navbarContainer: {
        backgroundColor: '#333',
        width: '100%',
        paddingTop: 40,
        paddingStart: 5,
        paddingBottom: 5,
    },
})