import { Pressable, Text, StyleSheet } from "react-native";
import { Weekday } from "../types";

interface Props {
    weekday: Weekday;
    handleWeekday: (day: Weekday) => void;
    isWeekdayActive: (day: Weekday) => boolean;
}

const AlarmFrequencyButton = ({weekday, handleWeekday, isWeekdayActive}: Props) => {
    return (
        <Pressable
            onPress={() => handleWeekday(weekday)}
            style={[
                styles.weekdayButton, 
                isWeekdayActive(weekday) ? styles.weekdayActiveButton : null
            ]}
        >
            <Text style={[
                styles.weekdayText,
                isWeekdayActive(weekday) ? styles.weekdayActiveText : null
            ]}>
                {weekday.abbreviation}
            </Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    weekdayButton: {
        height: 40,
        width: 40,
        borderRadius: 22,
        backgroundColor: "#f1f5f9",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#00000011",
        shadowOpacity: 0.3,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 1 },
        marginHorizontal: 3,
    },
    weekdayActiveButton: {
        backgroundColor: "#5b21b6",
    },
    weekdayText: {
        fontSize: 13,
        color: "#0f172a",
        fontWeight: "600",
    },
    weekdayActiveText: {
        color: "white",
    },
});

export default AlarmFrequencyButton;