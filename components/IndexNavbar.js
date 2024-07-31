import { View, StyleSheet, Pressable } from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import { useNavigation } from 'expo-router';

export default function IndexNavbar({}) {
    const navigation = useNavigation();

    return (
        <View style={styles.navbarContainer}>
            <Pressable 
                onPress={() => navigation.navigate('alarm')}
            >
                <FontAwesome
                    name='plus'
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
        paddingEnd: 10,
        paddingBottom: 5,
        alignItems: "flex-end"
    },
})