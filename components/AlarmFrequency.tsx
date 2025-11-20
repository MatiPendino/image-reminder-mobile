import { StyleSheet, View } from "react-native"
import { WEEKDAYS } from "../constants/Weekdays";
import { Weekday } from "../types";
import AlarmFrequencyButton from "./AlarmFrequencyButton";

interface AlarmFrequencyProps {
    currentWeekdays: Weekday[]
    setCurrentWeekdays: React.Dispatch<React.SetStateAction<Weekday[]>>
}

export default function AlarmFrequency({
    currentWeekdays, setCurrentWeekdays
}: AlarmFrequencyProps) {
    const handleWeekday = (day: Weekday): void => {
        for (let i = 0; i < currentWeekdays.length; i++) {
            if (currentWeekdays[i].full === day.full) {
                setCurrentWeekdays(
                    currentWeekdays.filter((weekday) => (
                        weekday.full !== day.full || weekday.abbreviation !== day.abbreviation
                    )
                ));
                return
            } 
        }
        setCurrentWeekdays([...currentWeekdays, day])
    }

    const isWeekdayActive = (day: Weekday): boolean => {
        for (let i = 0; i < currentWeekdays.length; i++) {
            if (
                currentWeekdays[i].abbreviation === day.abbreviation && 
                currentWeekdays[i].full === day.full
            ) {
                return true
            }
        }
        return false
    }

    return (
        <View style={styles.daysContainer}>
            {WEEKDAYS.map((weekday, i) => (
                <AlarmFrequencyButton key={i}
                    weekday={weekday}
                    handleWeekday={handleWeekday}
                    isWeekdayActive={isWeekdayActive}
                />
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    daysContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginBottom: 20,
        paddingHorizontal: 6,
    },
})