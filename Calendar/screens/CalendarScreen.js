import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Card } from 'react-native-paper';
import Header from '../components/Header';
import AddEvent from '../components/AddEvent';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { addEvent, deleteEvent, setReminder, removeReminder } from '../redux/eventsSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};

const CalendarScreen = ({ route }) => {
  const items = useSelector((state) => state.events.items);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(timeToString(new Date()));
  const [refresh, setRefresh] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    loadEvents();
    setSelectedDate(timeToString(new Date()));
  }, []);

  const saveEventsToStorage = async (events) => {
    try {
      const jsonValue = JSON.stringify(events);
      await AsyncStorage.setItem('@events', jsonValue);
    } catch (e) {
      console.error('Error saving events to storage:', e);
    }
  };

  const loadEvents = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@events');
      if (jsonValue != null) {
        dispatch(setEvents(JSON.parse(jsonValue)));
      } else {
        dispatch(setEvents({}));
      }
    } catch (e) {
      console.error('Error loading events from storage:', e);
    }
  };

  const handleAddEvent = (title, description, date) => {
    const newEvent = { name: title, description, height: 50, day: date, reminder: null };
    dispatch(addEvent({ title, description, date }));
    const updatedItems = { ...items, [date]: [...(items[date] || []), newEvent] };
    saveEventsToStorage(updatedItems);
    setRefresh(!refresh);
  };

  const handleDeleteEvent = (day, index) => {
    const updatedItems = { ...items };
    updatedItems[day] = updatedItems[day].filter((_, i) => i !== index);
    if (updatedItems[day].length === 0) {
      delete updatedItems[day];
    }
    dispatch(deleteEvent({ date: day, index }));
    saveEventsToStorage(updatedItems);
    setRefresh(!refresh);
  };

  const handleSetReminder = (event, date, index) => {
    setSelectedEvent({ event, date, index });
    setShowDatePicker(true);
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const reminder = selectedDate.toISOString();
      dispatch(setReminder({ date: selectedEvent.date, index: selectedEvent.index, reminder }));
      const updatedItems = { ...items };
      updatedItems[selectedEvent.date][selectedEvent.index].reminder = reminder;
      saveEventsToStorage(updatedItems);
      setRefresh(!refresh);
    }
  };

  const handleRemoveReminder = (date, index) => {
    dispatch(removeReminder({ date, index }));
    const updatedItems = { ...items };
    updatedItems[date][index].reminder = null;
    saveEventsToStorage(updatedItems);
    setRefresh(!refresh);
  };

  const renderItem = (item, firstItemInDay, index) => (
    <TouchableOpacity key={index}>
      <Card style={styles.item}>
        <Card.Content>
          <View style={styles.itemContent}>
            <View>
              <Text>{item.name}</Text>
              <Text>{item.description}</Text>
            </View>
            <View style={styles.icons}>
              <TouchableOpacity onPress={() => item.reminder ? handleRemoveReminder(item.day, index) : handleSetReminder(item, item.day, index)}>
                <Ionicons name="notifications" size={24} color={item.reminder ? "green" : "gray"} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteEvent(item.day, index)}>
                <Ionicons name="trash" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  const renderEmptyDate = () => (
    <View style={styles.emptyDate}>
      <Text style={styles.emptyMessage}>No events planned for this day</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Agenda
        items={items}
        loadItemsForMonth={() => {}}
        selected={selectedDate}
        renderItem={(item, firstItemInDay) => renderItem(item, firstItemInDay, items[item.day].indexOf(item))}
        renderEmptyDate={renderEmptyDate}
        showClosingKnob={true}
        onDayPress={(day) => setSelectedDate(day.dateString)}
        key={refresh}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Ionicons name="add-circle" size={60} color="blue" />
      </TouchableOpacity>

      <AddEvent
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        addEvent={handleAddEvent}
        selectedDate={selectedDate}
      />

      <Header style={styles.header} />

      {showDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode="time"
          display="default"
          onChange={handleDateChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: "10%",
    paddingBottom: 60,
  },
  header: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 10,
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
    justifyContent: 'center',
    alignItems: 'center',
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
    bottom: 80,
  },
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emptyMessage: {
    fontSize: 18,
    color: 'gray',
  },
});

export default CalendarScreen;
