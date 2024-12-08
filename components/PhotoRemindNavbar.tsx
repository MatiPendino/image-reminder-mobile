import { StyleSheet, View, Pressable } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { AlarmProps } from '../types';

interface PhotoRemindNavbarProps {
    setNotificationAlarm: React.Dispatch<React.SetStateAction<AlarmProps>>
}

export default function PhotoRemindNavbar({setNotificationAlarm}: PhotoRemindNavbarProps) {

    return (
        <View style={styles.navbarContainer}>
            <Pressable 
                onPress={() => setNotificationAlarm(null)}
                style={styles.navbarClose}
            >
                <AntDesign 
                    name="close" 
                    size={30} 
                    color="#fff" 
                />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    navbarContainer: {
        backgroundColor: '#333',
        width: '100%',
        paddingTop: 40,
        paddingStart: 5,
        paddingBottom: 5,
        textAlign: 'right',
        marginStart: 'auto'
    },
    navbarClose: {
        marginStart: 'auto',
        paddingEnd: 10
    },
})