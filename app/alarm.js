import { useState } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import * as MediaLibrary from 'expo-media-library'
import { useToast } from 'react-native-toast-notifications';
import { useRoute } from '@react-navigation/native';
import {router} from 'expo-router'
import axios from "axios";
import { getDeviceId } from '../utils/getDeviceId'
import { formatDate } from '../utils/formatDatehhmm';
import AlarmFrequency from '../components/AlarmFrequency';
import AddPhotoButton from '../components/AddPhotoButton';
import ImageViewer from '../components/ImageViewer';
import AlarmNavbar from '../components/AlarmNavbar';
import InlineDateTimePicker from '../components/InlineDatetimePicker';

const placeholderImage = require('../assets/img/background-image.png')

export default function Alarm({}) {
    const route = useRoute();
    let alarm = undefined
    if (route.params) {
        alarm = route.params.alarm
        console.log(alarm)
    } 
    const toast = useToast()

    const [title, setTitle] = useState(alarm ? alarm.title : '')
    const [date, setDate] = useState(alarm ? new Date(2024, 10, 10, alarm.time.substring(0, 2), alarm.time.substring(3, 5)) : new Date())
    const [currentWeekdays, setCurrentWeekdays] = useState(alarm ? alarm.weekdays : [])
    const [selectedImage, setSelectedImage] = useState(alarm ? alarm.image : null)
    const [status, requestPermission] = MediaLibrary.usePermissions()

    if (status === null) {
        requestPermission()
    }

    const pickImageAsync = async() => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1
        })

        if(!result.canceled) {
            setSelectedImage(result.assets[0].uri)
        } else {
            alert('You did not select any image.')
        }
    }

    const onChange = (e, selectedDate) => {
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    const saveAlarm = () => {
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
                        `${process.env.BACKEND_URL}/alarms/`, 
                        formData, 
                        {
                            headers: {
                                'Device-ID': id,
                                'Content-Type': 'multipart/form-data'
                            }
                        }
                    )
                } else {
                    response = await axios.put(
                        `${process.env.BACKEND_URL}/alarms/${alarm.id}/`, 
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
                        const response = postAlarm()
                        console.log(response)
                        toast.show('Photo alarm set successfully!', {type: 'success'})
                        router.push('/')
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
        <>
            <AlarmNavbar />

            <ScrollView style={styles.container}>
                <Text style={styles.title}>Set Alarm</Text>

                <InlineDateTimePicker
                    value={date}
                    mode="time"
                    is24Hour={false}
                    display="spinner"
                    onChange={onChange}
                />
                
                <TextInput
                    style={styles.input}
                    placeholder="Enter alarm title..."
                    value={title}
                    onChangeText={setTitle}
                />

                <AlarmFrequency
                    currentWeekdays={currentWeekdays}
                    setCurrentWeekdays={setCurrentWeekdays}
                />

                <View style={styles.imageContainer}>
                    <ImageViewer 
                        placeholderImageSource={placeholderImage} 
                        selectedImage={selectedImage}
                    />
                </View>

                <AddPhotoButton
                    onPress={pickImageAsync}
                    label="Add Photo"
                />
                
                <Pressable
                    onPress={() => saveAlarm()}
                    style={styles.saveButton}
                >
                    <Text style={styles.saveText}>
                        Save
                    </Text>
                </Pressable>
            </ScrollView>   
        </>
         
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        width: '100%',
        height: '90%',
        marginHorizontal: 'auto',
        marginVertical: 'auto',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 6
    },
    title: {
        fontSize: 20,
        paddingTop: 10
    },
    input: {
        fontSize: 19,
        paddingHorizontal: 5,
        marginVertical: 15,
        paddingBottom: 3,
        borderBottomWidth: 1,
    },
    imageContainer: {
        textAlign: 'center',
        alignItems: 'center'
    },
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