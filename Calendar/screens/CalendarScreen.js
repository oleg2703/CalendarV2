import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Card } from 'react-native-paper';
import Header from '../components/Header';
import AddEvent from '../components/AddEvent';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { setEvents, addEvent, deleteEvent } from '../redux/eventsSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};

export default function CalendarScreen() {
  const items = useSelector((state) => state.events.items);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(timeToString(new Date()));
  const [refresh, setRefresh] = useState(false);  // State to trigger re-render

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
    const newEvent = { name: title, description, height: 50, day: date };
    dispatch(addEvent({ title, description, date }));
    const updatedItems = { ...items, [date]: [...(items[date] || []), newEvent] };
    saveEventsToStorage(updatedItems);
    setRefresh(!refresh); // Trigger re-render
  };

  const handleDeleteEvent = (day, index) => {
    console.log('Deleting event:', day, index); // Debug statement
    if (typeof index !== 'number') {
      console.error('Index is not a number:', index);
      return;
    }
    const updatedItems = { ...items };
    updatedItems[day] = updatedItems[day].filter((_, i) => i !== index);
    if (updatedItems[day].length === 0) {
      delete updatedItems[day];
    }
    console.log('Updated items after deletion:', updatedItems); // Debug statement
    dispatch(deleteEvent({ date: day, index }));
    saveEventsToStorage(updatedItems);
    setRefresh(!refresh); // Trigger re-render
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
            <TouchableOpacity onPress={() => handleDeleteEvent(item.day, index)}>
              <Ionicons name="trash" size={24} color="red" />
            </TouchableOpacity>
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
        key={refresh} // Add this line to re-render the component on refresh state change
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
    bottom: 80, // Adjusted to be above the header
  },
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  emptyMessage: {
    fontSize: 18,
    color: 'gray',
  },
});
