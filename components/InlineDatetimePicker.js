import React, { useState } from 'react';
import { View, Platform, Button, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const InlineDateTimePicker = ({ value, mode, is24Hour, display, onChange }) => {
  const [show, setShow] = useState(false);

  const showPicker = () => {
    setShow(true);
  };

  const hidePicker = () => {
    setShow(false);
  };

  const handleChange = (event, selectedDate) => {
    if (event.type === 'set') {
      // User clicked 'OK'
      onChange(event, selectedDate);
    }
    hidePicker();
  };

  return (
    <View>
        {
            Platform.OS === 'ios' 
            ? 
            <DateTimePicker
                value={value}
                mode={mode}
                is24Hour={is24Hour}
                display={display}
                onChange={onChange}
            />
            : 
            <View>
                <Button title="Show Time Picker" onPress={showPicker} />
                {show && (
                      <DateTimePicker
                        value={value}
                        mode={mode}
                        is24Hour={is24Hour}
                        display={display}
                        onChange={handleChange}
                        style={styles.picker}
                      />
                )}
            </View>
        }
    </View>
  );
};

const styles = StyleSheet.create({
    modalBackground: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
      alignItems: 'center',
    },
    picker: {
      width: '100%',
    },
  });

export default InlineDateTimePicker;
