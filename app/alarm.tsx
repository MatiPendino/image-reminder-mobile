import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, ImageSourcePropType } from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import * as MediaLibrary from 'expo-media-library'
import { useRoute, RouteProp } from '@react-navigation/native';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import AlarmFrequency from '../components/AlarmFrequency';
import AddPhotoButton from '../components/AddPhotoButton';
import ImageViewer from '../components/ImageViewer';
import AlarmNavbar from '../components/AlarmNavbar';
import InlineDateTimePicker from '../components/InlineDatetimePicker';
import SaveAlarm from '../components/SaveAlarm';
import { AlarmProps, Weekday } from '../types';

const placeholderImage: ImageSourcePropType = require('../assets/img/background-image.png')

interface RouteParams {
    alarm: AlarmProps
}

export default function Alarm({}) {
    const route = useRoute<RouteProp<{params: RouteParams}, 'params'>>();
    let alarm = undefined
    if (route.params) {
        alarm = route.params.alarm
    } 

    const [title, setTitle] = useState<string>(alarm ? alarm.title : '')
    const [date, setDate] = useState<Date>(alarm ? new Date(2024, 10, 10, alarm.time.substring(0, 2), alarm.time.substring(3, 5)) : new Date())
    const [currentWeekdays, setCurrentWeekdays] = useState<Weekday[]>(alarm ? alarm.weekdays : [])
    const [selectedImage, setSelectedImage] = useState<string>(alarm ? alarm.image : null)
    const [status, requestPermission] = MediaLibrary.usePermissions()

    if (status === null) {
        requestPermission()
    }

    const pickImageAsync = async (): Promise<void> => {
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

    const onChange = (event: DateTimePickerEvent, selectedDate: Date) => {
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

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
                
                <SaveAlarm
                    title={title}
                    currentWeekdays={currentWeekdays}
                    date={date}
                    selectedImage={selectedImage}
                    alarm={alarm}
                />
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
    }
})