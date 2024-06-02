import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Modal, FlatList, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [events, setEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [dateTime, setDateTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const storedEvents = await AsyncStorage.getItem('events');
      if (storedEvents) {
        setEvents(JSON.parse(storedEvents));
      }
    } catch (error) {
      console.error('Failed to load events.', error);
    }
  };

  const saveEvents = async (newEvents) => {
    try {
      await AsyncStorage.setItem('events', JSON.stringify(newEvents));
      setEvents(newEvents);
    } catch (error) {
      console.error('Failed to save events.', error);
    }
  };

  const addEvent = () => {
    const newEvent = {
      id: Math.random().toString(),
      title,
      body,
      dateTime: dateTime.toString(),
    };
    const updatedEvents = [...events, newEvent];
    saveEvents(updatedEvents);
    setModalVisible(false);
    setTitle('');
    setBody('');
    setDateTime(new Date());
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const showTimePickerModal = () => {
    setShowTimePicker(true);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateTime;
    setShowDatePicker(Platform.OS === 'ios');
    setDateTime(currentDate);
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || dateTime;
    setShowTimePicker(Platform.OS === 'ios');
    setDateTime(currentTime);
  };

  return (
    <View style={styles.container}>
      <Button title="Add Event" onPress={() => setModalVisible(true)} color="#6200EE" />
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.eventItem}>
            <Text style={styles.eventTitle}>{item.title}</Text>
            <Text style={styles.eventBody}>{item.body}</Text>
            <Text style={styles.eventDateTime}>{new Date(item.dateTime).toLocaleString()}</Text>
          </View>
        )}
      />
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.label}>Title:</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Enter title"
              placeholderTextColor="#999"
            />
            <Text style={styles.label}>Description:</Text>
            <TextInput
              style={styles.input}
              value={body}
              onChangeText={setBody}
              placeholder="Enter description"
              placeholderTextColor="#999"
            />
            <Text style={styles.label}>Date:</Text>
            <Button title="Pick Date" onPress={showDatePickerModal} color="#6200EE" />
            {showDatePicker && (
              <DateTimePicker
                value={dateTime}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
            <Text style={styles.label}>Time:</Text>
            <Button title="Pick Time" onPress={showTimePickerModal} color="#6200EE" />
            {showTimePicker && (
              <DateTimePicker
                value={dateTime}
                mode="time"
                display="default"
                onChange={handleTimeChange}
              />
            )}
            <Button title="Save Event" onPress={addEvent} color="#6200EE" />
            <Button title="Cancel" onPress={() => setModalVisible(false)} color="red" />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  eventItem: {
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginVertical: 5,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventBody: {
    fontSize: 14,
  },
  eventDateTime: {
    fontSize: 12,
    color: '#555',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
    color: '#333',
  },
});
