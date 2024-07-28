import { View, StyleSheet } from "react-native"
import { Link } from "expo-router"
import { FontAwesome } from "@expo/vector-icons"

export default function IndexNavbar({}) {
    return (
        <View style={styles.navbarContainer}>
            <Link href="/alarm">
                <FontAwesome
                    name='plus'
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
        paddingEnd: 10,
        paddingBottom: 5,
        alignItems: "flex-end"
    },
})