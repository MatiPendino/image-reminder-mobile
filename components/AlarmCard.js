import { Pressable, View, Text, StyleSheet } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"

export default function AlarmCard({title, interval, time}) {

    return (
        <Pressable 
            onPress={() => alert('Clicked')}
            style={styles.alarmContainer}
        >
            <Text style={[styles.alarmTitle, styles.alarmText]}>{title}</Text>
            <Text style={[styles.alarmTime, styles.alarmText]}>{time}</Text>
            <Text style={[styles.alarmInterval, styles.alarmText]}>{interval}</Text>
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
        //width: '90%',
        backgroundColor: '#eee',
        paddingHorizontal: 10,
        paddingVertical: 15,
        justifyContent: 'space-around',
        borderRadius: 8
    },
    alarmText: {
        marginVertical: 'auto',
        fontSize: 15
    },
    alarmTitle: {
        textTransform: 'uppercase',
        width: '50%',
    },
    alarmTime: {
        width: '15%'
    },
    alarmInterval: {
        width: '20%'
    },
    removeIcon: {
        marginVertical: 'auto'
    }
})