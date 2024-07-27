import { StyleSheet, View, Pressable, Text } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function AddPhotoButton({label, onPress}) {

    return (
        <View style={[styles.buttonContainer, { borderWidth: 3, borderColor: "#111", borderRadius: 18 }]}>
            <Pressable
                style={[styles.button, { backgroundColor: "#fff" }]}
                onPress={onPress}
            >
            <FontAwesome
                name="picture-o"
                size={18}
                color="#25292e"
                style={styles.buttonIcon}
            />
            <Text style={[styles.buttonLabel, { color: "#25292e" }]}>{label}</Text>
          </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: '90%',
        height: 68,
        marginHorizontal: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
        marginVertical: 15
    },
    button: {
        borderRadius: 10,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    buttonIcon: {
        paddingRight: 8,
    },
    buttonLabel: {
        color: '#fff',
        fontSize: 16,
    },
})