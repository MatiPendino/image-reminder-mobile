import { StyleSheet, Pressable, Text } from "react-native"
import { useToast } from 'react-native-toast-notifications';
import {router} from 'expo-router'
import axios from "axios";
import { getDeviceId } from '../utils/getDeviceId'
import {BACKEND_URL} from '@env'
import { formatDate } from '../utils/formatDatehhmm';


export default function SaveAlarm({title, currentWeekdays, date, selectedImage, alarm}) {
    const toast = useToast()

    const saveAlarm = async () => {
        const newAlarm = {
            title: title,
            weekdays: currentWeekdays,
            time: formatDate(date),
            image: selectedImage
        }
        const postAlarm = async () => {
            try {
                const id = await getDeviceId();
                const formData = new FormData();
                formData.append('title', newAlarm.title);
                formData.append('weekdays', JSON.stringify(newAlarm.weekdays));
                formData.append('time', newAlarm.time);
                const imageFile = {
                    uri: selectedImage,
                    name: selectedImage.split('/').pop(),
                    type: 'image/jpeg', 
                };
                formData.append('image', imageFile);

                // If no alarm is retrieved from the params, create a new one
                let response = ''
                if (!alarm) {
                    response = await axios.post(
                        `${BACKEND_URL}/alarms/alarm/`, 
                        formData, 
                        {
                            headers: {
                                'Device-ID': id,
                                'Content-Type': 'multipart/form-data'
                            }
                        }
                    )
                    console.log(response)
                } else {
                    response = await axios.put(
                        `${BACKEND_URL}/alarms/alarm/${alarm.id}/`, 
                        formData, 
                        {
                            headers: {
                                'Device-ID': id,
                                'Content-Type': 'multipart/form-data'
                            }
                        }
                    )
                }
                
                return response
            } catch (err) {
                throw new Error(err)
            }
        }
        if (title !== '') {
            if (currentWeekdays.length > 0) {
                if (selectedImage !== null) {
                    try {
                        const response = await postAlarm()
                        if (response.status === 201 || response.status === 200) {
                            toast.show('Photo alarm set successfully!', {type: 'success'})
                            router.push('/')   
                        } else {
                            toast.show('There was an error processing the alarm', {type: 'danger'})
                        }
                    } catch(err) {
                        toast.show(str(err), {type: 'danger'})
                    }                    
                } else {
                    toast.show('You must include an image to continue', {type: 'danger'})
                }
            } else {
                toast.show('You must include at least one weekday to continue', {type: 'danger'})
            }
        } else {
            toast.show('You must include a title to continue', {type: 'danger'})
        }
    }

    return (
        <Pressable
            onPress={() => saveAlarm()}
            style={styles.saveButton}
        >
            <Text style={styles.saveText}>
                Save
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    saveButton: {
        flex: 1,
        justifyContent: 'flex-end',
        textAlign: 'right',
        marginEnd: 10,
        marginBottom: 15
    },
    saveText: {
        fontSize: 20,
        textAlign: 'right',
        fontWeight: '500'
    }
})

