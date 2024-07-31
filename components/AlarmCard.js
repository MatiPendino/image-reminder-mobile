import { Pressable, View, Text, StyleSheet } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useNavigation } from 'expo-router';


export default function AlarmCard({alarm}) {
    const navigation = useNavigation();

    return (
        <Pressable 
            onPress={() => navigation.navigate('alarm', {
                alarm: alarm
            })}
            style={styles.alarmContainer}
        >
            <Text style={[styles.alarmTitle, styles.alarmText]}>{alarm.title}</Text>
            <Text style={[styles.alarmTime, styles.alarmText]}>
                {alarm.time.slice(0, 5)}
            </Text>
            <View style={styles.alarmDayContainer}>
                {alarm.weekdays.map((day, i) => (
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
        borderRadius: 100,
        borderColor: '#00000084',
        textAlign: 'center',
        width: 16,
        height: 16,
        borderWidth: 1
    },
    removeIcon: {
        marginVertical: 'auto'
    }
})