import { StyleSheet, View, Pressable, Text } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { MAIN_COLOR } from "../constants/appConstants";

interface AddPhotoButtonProps {
    label: string
    onPress: () => Promise<void>
}

export default function AddPhotoButton({label, onPress}: AddPhotoButtonProps) {

    return (
        <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={onPress}>
                <FontAwesome
                    name="picture-o"
                    size={18}
                    color={MAIN_COLOR}
                    style={styles.buttonIcon}
                />
                <Text style={styles.buttonLabel}>{label}</Text>
          </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: "92%",
        height: 68,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
        marginVertical: 15,
        borderRadius: 16,
        backgroundColor: "#ede9fe",
        borderColor: "#c4b5fd",
        borderWidth: 1,
    },
    button: {
        borderRadius: 14,
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "white",
    },
    buttonIcon: {
        paddingRight: 8,
    },
    buttonLabel: {
        color: "#1f2937",
        fontSize: 16,
        fontWeight: "700",
    },
})