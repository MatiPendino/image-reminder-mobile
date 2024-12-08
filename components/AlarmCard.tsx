import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { Pressable, View, Text, StyleSheet } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useNavigation } from 'expo-router';
import { getDeviceId } from "../utils/getDeviceId";
import { useToast } from "react-native-toast-notifications";
import api from '../services/api'
import { getLocalTimeStr } from "../utils/getLocalTimeStr";
import { AlarmProps } from "../types";

interface AlarmCardProps {
    alarm: AlarmProps
    setIsDataUpdated: React.Dispatch<React.SetStateAction<boolean>>
}

interface RootStackParamList extends ParamListBase {
    alarm: {alarm: AlarmProps}
}

export default function AlarmCard({alarm, setIsDataUpdated}: AlarmCardProps) {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const toast = useToast()

    const deleteAlarm = async (): Promise<void> => {
        try {
            const id = await getDeviceId();
            const response = await api.delete(`/alarms/alarm/${alarm.id}/`, {
                headers: {
                    'Device-ID': id,
                }
            })
            if (response.status === 204) {
                setIsDataUpdated(true)
            }
        } catch (err) {
            console.log(err)
            toast.show('There was an error deleting this alarm', {type: 'danger'})
        }
        
    }

    return (
        <Pressable 
            onPress={() => navigation.navigate('alarm', {
                alarm: alarm
            })}
            style={styles.alarmContainer}
        >
            <Text style={[styles.alarmTitle, styles.alarmText]}>{alarm.title}</Text>
            <Text style={[styles.alarmTime, styles.alarmText]}>
                {getLocalTimeStr(alarm.time)}
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
                onPress={() => deleteAlarm()}
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
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 'auto',
    },
    alarmDayText: {
        fontSize: 10,
        borderRadius: 100,
        borderColor: '#00000084',
        textAlign: 'center',
        width: 16,
        height: 16,
        borderWidth: 1,
        marginVertical: 1
    },
    removeIcon: {
        marginVertical: 'auto'
    }
})