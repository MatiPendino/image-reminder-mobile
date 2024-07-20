import { useState } from 'react';
import { Modal, View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'
import { WEEKDAYS } from '../constants/Weekdays';

export default function CreateAlarm({onModal, isVisible}) {
    const [title, setTitle] = useState('')
    const [interval, setInterval] = useState('')
    const [date, setDate] = useState(new Date())
    const [weekdays, setWeekdays] = useState({
        isMonday: false,
        isTuesday: false,
        isWednesday: false,
        isThursday: false,
        isFriday: false,
        isSaturday: false,
        isSunday: false
    })

    const handleWeekday = (weekday) => {
        switch (weekday) {
            case 'Monday':
                setWeekdays({...weekdays, isMonday: true})
                break
            case 'Tuesday':
                setWeekdays({...weekdays, isTuesday: true})
                break
            case 'Wednesday':
                setWeekdays({...weekdays, isWednesday: true})
                break
            case 'Thursday':
                setWeekdays({...weekdays, isThursday: true})
                break
            case 'Friday':
                setWeekdays({...weekdays, isFriday: true})
                break
            case 'Saturday':
                setWeekdays({...weekdays, isSaturday: true})
                break
            case 'Sunday':
                setWeekdays({...weekdays, isSunday: true})
                break
        }
        console.log(weekdays)
    }

    const isWeekdayActive = (weekday) => {
        if (weekdays[weekday] == true) {
            return true
        }
        return false
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
    };

    return (
        <Modal 
            animationType='slide' 
            transparent={true} 
            visible={isVisible}
        >
            <View style={styles.modalContent}>
                <Text style={styles.title}>Set Alarm</Text>

                <DateTimePicker
                    value={date}
                    mode='time'
                    is24Hour={false}
                    display='spinner'
                    onChange={onChange}
                />
                
                <TextInput
                    style={styles.input}
                    placeholder="Title"
                    value={title}
                    onChangeText={setTitle}
                />

                <View style={styles.daysContainer}>
                    {WEEKDAYS.map((weekday, i) => (
                        <Pressable
                            key={i}
                            onPress={() => handleWeekday(weekday.full)}
                            style={[
                                styles.weekdayButton, 
                                isWeekdayActive() ? styles.weekdayActiveButton : ''
                            ]}
                        >
                            <Text style={styles.weekdayText}>{weekday.abbreviation}</Text>
                        </Pressable>
                    ))}
                </View>
                
                <Pressable
                    onPress={() => onModal(false)}
                    style={styles.saveButton}
                >
                    <Text style={styles.saveText}>
                        SAVE
                    </Text>
                </Pressable>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContent: {
        backgroundColor: '#fff',
        width: '90%',
        marginHorizontal: 'auto',
        marginVertical: 'auto'
    },
    daysContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    weekdayButton: {
        paddingVertical: 10
    },
    weekdayActiveButton: {
        backgroundColor: '#000'
    },
    weekdayText: {
        fontSize: 15
    },
    saveButton: {
        backgroundColor: '#253487',
    },
    saveText: {
        fontSize: 15
    }
})