import { useState } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'
import * as ImagePicker from 'expo-image-picker'
import * as MediaLibrary from 'expo-media-library'
import { useToast } from 'react-native-toast-notifications';
import AlarmFrequency from '../../components/AlarmFrequency';
import AddPhotoButton from '../../components/AddPhotoButton';
import ImageViewer from '../../components/ImageViewer';
import AlarmNavbar from '../../components/AlarmNavbar';
import InlineDateTimePicker from '../../components/InlineDatetimePicker';

const placeholderImage = require('../../assets/img/background-image.png')

export default function Alarm({}) {
    const toast = useToast()

    const [title, setTitle] = useState('')
    const [date, setDate] = useState(new Date())
    const [currentWeekdays, setCurrentWeekdays] = useState([])
    const [status, requestPermission] = MediaLibrary.usePermissions()
    const [selectedImage, setSelectedImage] = useState(null)

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
        if (title !== '') {
            if (currentWeekdays.length > 0) {
                if (selectedImage !== null) {
                    const newAlarm = {
                        title: title,
                        days: currentWeekdays,
                        time: date,
                        image: selectedImage
                    }
                    //setAlarms([...alarms, newAlarm])
                    toast.show('Photo alarm set successfully!', {type: 'success'})
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

                {/*<DateTimePicker
                    value={date}
                    mode='time'
                    is24Hour={false}
                    display='spinner'
                    onChange={onChange}
                />*/}
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