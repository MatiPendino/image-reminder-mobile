import { View, StyleSheet, Pressable } from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import { useNavigation } from 'expo-router';


export default function AlarmNavbar({}) {
    const navigation = useNavigation();

    return (
        <View style={styles.navbarContainer}>
            <Pressable 
                onPress={() => navigation.goBack()}
            >
                <FontAwesome
                    name='arrow-left'
                    size={30}
                    color='#fff'
                />
            </Pressable>
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