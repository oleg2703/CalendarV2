import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Card } from 'react-native-paper';
import Header from '../components/Header';
import AddEvent from '../components/AddEvent';
import { Ionicons } from '@expo/vector-icons';

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
}

export default function CalendarScreen() {
  const [items, setItems] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(timeToString(new Date()));

  useEffect(() => {
    setSelectedDate(timeToString(new Date()));
  }, []);

  const loadItems = (day) => {
    setTimeout(() => {
      const newItems = { ...items };
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);

        if (!newItems[strTime]) {
          newItems[strTime] = [];
        }
      }
      setItems(newItems);
    }, 1000);
  };

  const addEvent = (title, description, date) => {
    const newItems = { ...items };
    if (!newItems[date]) {
      newItems[date] = [];
    }
    newItems[date].push({
      name: title,
      description: description,
      height: 50,
      day: date
    });
    setItems(newItems);
  };

  const deleteEvent = (day, index) => {
    const newItems = { ...items };
    newItems[day].splice(index, 1);
    setItems(newItems);
  };

  const renderItem = (item, index) => {
    return (
      <TouchableOpacity>
        <Card style={styles.item}>
          <Card.Content>
            <View style={styles.itemContent}>
              <View>
                <Text>{item.name}</Text>
                <Text>{item.description}</Text>
              </View>
              <TouchableOpacity onPress={() => deleteEvent(item.day, index)}>
                <Ionicons name="trash" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={selectedDate}
        renderItem={(item, firstItemInDay, index) => renderItem(item, index)}
        showClosingKnob={true}
        onDayPress={(day) => setSelectedDate(day.dateString)}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Ionicons name="add-circle" size={60} color="blue" />
      </TouchableOpacity>

      <AddEvent
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        addEvent={addEvent}
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
  }
});


