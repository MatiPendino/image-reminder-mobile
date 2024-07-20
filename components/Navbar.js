import { View, Pressable, StyleSheet } from "react-native"
import { FontAwesome } from "@expo/vector-icons"

export default function Navbar({onModalVisible}) {

    return (
        <View style={styles.navbarContainer}>
            <Pressable onPress={() => onModalVisible(true)}>
                <FontAwesome
                    name='plus'
                    size={30}
                    color='#fff'
                    style={styles.plusIcon}
                />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    navbarContainer: {
        backgroundColor: '#333',
        width: '100%',
        paddingTop: 30,
        alignItems: "flex-end"
    },
    plusIcon: {
        paddingEnd: 15,
        paddingBottom: 5
    }
})