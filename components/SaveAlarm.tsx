import { StyleSheet, Pressable, Text } from "react-native"
import { useToast } from 'react-native-toast-notifications';
import {router} from 'expo-router'
import api from '../services/api'
import { getDeviceId } from '../utils/getDeviceId'
import { formatDate } from '../utils/formatDatehhmm';
import { AlarmProps, Weekday } from "../types";

interface SaveAlarmProps {
    title: string
    currentWeekdays: Weekday[]
    date: Date
    selectedImage: string
    alarm: AlarmProps
}

export default function SaveAlarm({
    title, currentWeekdays, date, selectedImage, alarm
}: SaveAlarmProps) {
    const toast = useToast()

    const saveAlarm = async (): Promise<void> => {
        const newAlarm = {
            title: title,
            weekdays: currentWeekdays,
            time: formatDate(date),
            image: selectedImage
        }
        const postAlarm = async () => {
            try {
                const id: string = await getDeviceId()
                const formData = new FormData()
                formData.append('title', newAlarm.title)
                formData.append('weekdays', JSON.stringify(newAlarm.weekdays))
                formData.append('time', newAlarm.time)
                const imageFile = {
                    uri: selectedImage,
                    name: selectedImage.split('/').pop(),
                    type: 'image/jpeg', 
                }
                // @ts-ignore
                formData.append('image', imageFile)

                // If no alarm is retrieved from the params, create a new one
                if (!alarm) {
                    const response = await api.post('/alarms/alarm/', 
                        formData, 
                        {
                            headers: {
                                'Device-ID': id,
                                'Content-Type': 'multipart/form-data'
                            }
                        }
                    )
                    console.log(response)
                    return response
                } else {
                    const response = await api.put(`/alarms/alarm/${alarm.id}/`, 
                        formData, 
                        {
                            headers: {
                                'Device-ID': id,
                                'Content-Type': 'multipart/form-data'
                            }
                        }
                    ) 
                    return response
                }
                
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
                        toast.show(err.toString(), {type: 'danger'})
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

