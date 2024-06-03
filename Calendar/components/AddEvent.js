import React, { useState } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { addEvent } from '../redux/eventsSlice';

const AddEvent = ({ modalVisible, setModalVisible, selectedDate }) => {
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState(selectedDate);
  const dispatch = useDispatch();

  const handleAddEvent = () => {
    if (!eventTitle || !eventDescription || !eventDate) return;
    dispatch(addEvent({ title: eventTitle, description: eventDescription, date: eventDate }));
    setEventTitle('');
    setEventDescription('');
    setEventDate(selectedDate);
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
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Додати Подію</Text>
          <TextInput
            placeholder="Назва події"
            style={styles.input}
            value={eventTitle}
            onChangeText={setEventTitle}
          />
          <TextInput
            placeholder="Опис події"
            style={styles.input}
            value={eventDescription}
            onChangeText={setEventDescription}
          />
          <TextInput
            placeholder="Введіть дату (YYYY-MM-DD)"
            style={styles.input}
            value={eventDate}
            onChangeText={setEventDate}
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.modalButton, styles.addButton]} onPress={handleAddEvent}>
              <Text style={styles.buttonText}>Додати</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Вихід</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    padding: 10,
    margin: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: 'blue',
  },
  cancelButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default AddEvent;
