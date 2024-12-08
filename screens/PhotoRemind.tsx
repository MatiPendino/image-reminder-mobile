import { StyleSheet, View, Text } from 'react-native';
import ImageViewer from '../components/ImageViewer';
import PhotoRemindNavbar from '../components/PhotoRemindNavbar'
import { getLocalTimeStr } from '../utils/getLocalTimeStr';
import { AlarmProps } from '../types';

const placeholderImage = require('../assets/img/background-image.png')

interface PhotoRemindProps {
    notificationAlarm: AlarmProps
    setNotificationAlarm: React.Dispatch<React.SetStateAction<AlarmProps>>
}

export default function PhotoRemind({notificationAlarm, setNotificationAlarm}: PhotoRemindProps) {

    return (
        <>
            <PhotoRemindNavbar setNotificationAlarm={setNotificationAlarm} />
            <View style={styles.container}>
                <Text style={styles.alarmTitle}>{notificationAlarm.title}</Text>
                <View style={styles.imageContainer}>
                    <ImageViewer 
                        placeholderImageSource={placeholderImage} 
                        selectedImage={notificationAlarm.image}
                    />
                </View>
                <Text style={styles.alarmTime}>{getLocalTimeStr(notificationAlarm.time)}</Text>
            </View>
        </>
        
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 26
    },
    alarmTitle: {
        fontSize: 34,
        fontWeight: '400',
        textAlign: 'center',
        marginBottom: 20
    },
    alarmTime: {
        fontSize: 54,
        fontWeight: '300',
        textAlign: 'center',
        marginTop: 26
    },
    imageContainer: {
      textAlign: 'center',
      alignItems: 'center'
    }
  });