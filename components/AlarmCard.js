import { Pressable, View, Text, StyleSheet } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"

export default function AlarmCard({alarm}) {
    console.log(alarm.time)
    return (
        <Pressable 
            onPress={() => alert('Clicked')}
            style={styles.alarmContainer}
        >
            <Text style={[styles.alarmTitle, styles.alarmText]}>{alarm.title}</Text>
            <Text style={[styles.alarmTime, styles.alarmText]}>
                {alarm.time.getHours()}:{alarm.time.getMinutes()}
            </Text>
            <View style={styles.alarmDayContainer}>
                {alarm.days.map((day, i) => (
                    <Text 
                        key={i}
                        style={[styles.alarmText, styles.alarmDayText]}
                    >
                        {day.abbreviation}
                    </Text>
                ))}
            </View>
            <Pressable
                onPress={() => alert('Remove')}
            >
                <MaterialCommunityIcons
                    name='clock-remove'
                    size={26}
                    style={styles.removeIcon}
                    color='#222'
                />    
            </Pressable>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    alarmContainer: {
        flexDirection: 'row',
        backgroundColor: '#eee',
        paddingHorizontal: 10,
        paddingVertical: 15,
        justifyContent: 'space-around',
        borderRadius: 8,
        shadowColor: '#00000077',
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: .8,
        shadowRadius: 3,
        marginBottom: 15
    },
    alarmText: {
        marginVertical: 'auto',
        fontSize: 15,
        marginEnd: 2
    },
    alarmTitle: {
        textTransform: 'uppercase',
        width: '50%',
    },
    alarmTime: {
        width: '15%'
    },
    alarmDayContainer: {
        width: '20%',
        flexDirection: 'row'
    },
    alarmDayText: {
        fontSize: 10,
        borderRadius: '100%',
        borderColor: '#000',
        borderWidth: '1'
    },
    removeIcon: {
        marginVertical: 'auto'
    }
})