import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Card } from 'react-native-paper';
import Header from '../components/Header';
import { Ionicons } from '@expo/vector-icons';

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
}

export default function CalendarScreen() {
  const [items, setItems] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const loadItems = (day) => {
    setTimeout(() => {
      const newItems = { ...items };
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);

        if (!newItems[strTime]) {
          newItems[strTime] = [];

          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            newItems[strTime].push({
              name: 'Item for ' + strTime + ' #' + j,
              height: Math.max(50, Math.floor(Math.random() * 150)),
              day: strTime
            });
          }
        }
      }
      setItems(newItems);
    }, 1000);
  };

  const renderItem = (item) => {
    return (
      <TouchableOpacity>
        <Card style={styles.item}>
          <Card.Content>
            <View>
              <Text>{item.name}</Text>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  const handleAddEvent = () => {
    if (!eventTitle || !eventDescription || !selectedDate) return;

    const newItems = { ...items };
    if (!newItems[selectedDate]) {
      newItems[selectedDate] = [];
    }

    newItems[selectedDate].push({
      name: eventTitle,
      description: eventDescription,
      height: 50,
      day: selectedDate
    });

    setItems(newItems);
    setModalVisible(false);
    setEventTitle('');
    setEventDescription('');
    setSelectedDate('');
  };

  return (
    <View style={styles.container}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={'2024-06-02'}
        renderItem={renderItem}
        showClosingKnob={true}
        onDayPress={(day) => setSelectedDate(day.dateString)}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Ionicons name="add-circle" size={60} color="blue" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Add Event</Text>
          <TextInput
            placeholder="Event Title"
            style={styles.input}
            value={eventTitle}
            onChangeText={setEventTitle}
          />
          <TextInput
            placeholder="Event Description"
            style={styles.input}
            value={eventDescription}
            onChangeText={setEventDescription}
          />
          <TextInput
            placeholder="Event Date (YYYY-MM-DD)"
            style={styles.input}
            value={selectedDate}
            onChangeText={setSelectedDate}
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.modalButton, styles.addButton]} onPress={handleAddEvent}>
              <Text style={styles.buttonText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Header style={styles.header} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: "10%",
    paddingBottom: 60, // Space for the header
  },
  header: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 10, // Ensure header is above other content
  },
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  },
  customDay: {
    margin: 10,
    fontSize: 24,
    color: 'green'
  },
  dayItem: {
    marginLeft: 34
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 80, // Adjusted to be above the header
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  modalButton: {
    flex: 1,
    padding: 10,
    margin: 5,
    borderRadius: 5,
    alignItems: 'center'
  },
  addButton: {
    backgroundColor: 'blue'
  },
  cancelButton: {
    backgroundColor: 'red'
  },
  buttonText: {
    color: 'white',
    fontSize: 16
  }
});


