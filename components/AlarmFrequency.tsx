import { StyleSheet, View, Pressable, Text } from "react-native"
import { WEEKDAYS } from '../constants/Weekdays';
import { Weekday } from "../types";

interface AlarmFrequencyProps {
    currentWeekdays: Weekday[]
    setCurrentWeekdays: React.Dispatch<React.SetStateAction<Weekday[]>>
}

export default function AlarmFrequency({currentWeekdays, setCurrentWeekdays}: AlarmFrequencyProps) {
    const handleWeekday = (day: Weekday): void => {
        for (let i = 0; i < currentWeekdays.length; i++) {
            if (currentWeekdays[i].full === day.full) {
                setCurrentWeekdays(currentWeekdays.filter((weekday) => (weekday.full !== day.full || weekday.abbreviation !== day.abbreviation)))
                return
            } 
        }
        setCurrentWeekdays([...currentWeekdays, day])
    }

    const isWeekdayActive = (day: Weekday): boolean => {
        for (let i = 0; i < currentWeekdays.length; i++) {
            if (currentWeekdays[i].abbreviation === day.abbreviation && currentWeekdays[i].full === day.full) {
                return true
            }
        }
        return false
    }

    return (
        <View style={styles.daysContainer}>
            {WEEKDAYS.map((weekday, i) => (
                <Pressable
                    key={i}
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
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    daysContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 20
    },
    weekdayButton: {
        height: 40,
        width: 40
    },
    weekdayActiveButton: {
        borderRadius: 300,
        borderColor: '#6600a1',
        borderWidth: 1
    },
    weekdayText: {
        fontSize: 15,
        margin: 'auto'
    },
    weekdayActiveText: {
        color: '#6600a1',
        fontWeight: '700'
    },
})