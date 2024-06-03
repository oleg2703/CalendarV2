import React, { useState } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const AddEvent = ({ modalVisible, setModalVisible, addEvent, selectedDate }) => {
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');

  const handleAddEvent = () => {
    if (!eventTitle || !eventDescription) return;
    addEvent(eventTitle, eventDescription, selectedDate);
    setEventTitle('');
    setEventDescription('');
    setModalVisible(false);
  };

  return (
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
        <Text style={styles.dateText}>Date: {selectedDate}</Text>
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
  );
};

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    height:"60%",
    backgroundColor: 'white',
    borderRadius: 30,
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
  dateText: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold'
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

export default AddEvent;
