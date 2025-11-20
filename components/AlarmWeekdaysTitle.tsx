import { View, Text, StyleSheet } from "react-native";
import { Weekday } from "../types";
import { MAIN_COLOR } from "../constants/appConstants";

interface Props {
    alarmTitle: string;
    weekdays: Weekday[];
}

const AlarmWeekdaysTitle = ({alarmTitle, weekdays}: Props) => {
    return (
        <View style={{ flex: 1 }}>
            <Text style={styles.alarmTitle} numberOfLines={1}>
                {alarmTitle}
            </Text>
            <View style={styles.weekdayPills}>
                {weekdays.map((day, i) => (
                    <Text
                        key={`${day.full}-${i}`}
                        style={styles.alarmDayText}
                    >
                        {day.abbreviation}
                    </Text>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    alarmTitle: {
        fontSize: 18,
        color: "#0f172a",
        fontWeight: "700",
        marginBottom: 8,
        maxWidth: 220,
    },
    weekdayPills: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginRight: -8,
    },
    alarmDayText: {
        fontSize: 12,
        backgroundColor: "#ede9fe",
        color: MAIN_COLOR,
        borderRadius: 100,
        textAlign: "center",
        verticalAlign: "middle",
        width: 25,
        height: 25,
        overflow: "hidden",
        fontWeight: "700",
        marginRight: 8,
        marginBottom: 6,
    },
});

export default AlarmWeekdaysTitle;