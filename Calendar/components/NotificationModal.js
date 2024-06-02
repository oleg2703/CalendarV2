import React, { useState } from 'react';
import { View, TextInput, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DTPicker = ({ mode, onChange, value, placeholder, label }) => {
  const [show, setShow] = useState(false);

  const handleDate = (event, selectedDate) => {
    const currentDate = selectedDate || value;
    setShow(Platform.OS === 'ios');
    onChange(currentDate);
  };

  return (
    <View>
      <TextInput
        placeholder={placeholder}
        onFocus={() => setShow(true)}
        value={value ? value.toString() : ''}
        style={styles.input}
      />
      {show && (
        <DateTimePicker
          value={value || new Date()}
          mode={mode}
          display="default"
          onChange={handleDate}
        />
      )}
    </View>
  );
};

export default function NotificationModal() {
  const [date, setDate] = useState(new Date());

  return (
    <View style={styles.container}>
      <DTPicker
        mode="date"
        onChange={setDate}
        value={date}
        placeholder="Select Date"
        label="Date"
      />
      {/* Add more components as needed */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});
