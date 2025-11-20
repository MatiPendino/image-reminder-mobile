import { useState, useMemo } from "react";
import { View, Platform, StyleSheet, Pressable, Text } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";

interface Props {
  mode: "date" | "time" | "datetime" | "countdown"
  is24Hour: boolean
  display: "spinner" | "default" | "clock" | "calendar"
  value: Date
  onChange: (event: DateTimePickerEvent, selectedDate: Date) => void
}

const InlineDateTimePicker = ({value, mode, is24Hour, display, onChange}: Props) => {
  const [show, setShow] = useState<boolean>(false);

  const formattedTime = useMemo((): string => {
    const hours: number = value.getHours();
    const minutes: number = value.getMinutes();
    const hoursStr: string = hours < 10 ? `0${hours}` : `${hours}`;
    const minutesStr: string = minutes < 10 ? `0${minutes}` : `${minutes}`;

    return `${hoursStr}:${minutesStr}`;
  }, [value]);

  const showPicker = (): void => {
    setShow(true);
  };

  const hidePicker = (): void => {
    setShow(false);
  };

  const handleChange = (event: DateTimePickerEvent, selectedDate: Date) => {
    if (event.type === "set") {
      onChange(event, selectedDate);
    }
    hidePicker();
  };

  return (
    <View>
      {
        Platform.OS === "ios" 
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
          <Pressable style={styles.pickerButton} onPress={showPicker}>
            <Text style={styles.pickerButtonText}>Select time</Text>
            <Text style={styles.pickerButtonValue}>{formattedTime}</Text>
          </Pressable>
          
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
  picker: {
    width: "100%",
  },
  iosPicker: {
    alignSelf: "center",
  },
  pickerButton: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: "#f8fafc",
    marginTop: 10,
    marginBottom: 16,
  },
  pickerButtonText: {
    fontSize: 14,
    color: "#475569",
    fontWeight: "600",
    marginBottom: 6,
  },
  pickerButtonValue: {
    fontSize: 20,
    color: "#111827",
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});

export default InlineDateTimePicker;
