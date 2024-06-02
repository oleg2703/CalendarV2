import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Card } from 'react-native-paper'; // Import Card from react-native-paper

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
}

export default function CalendarScreen() {
  const [items, setItems] = useState({});

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

  

  return (
    <Agenda
      items={items}
      loadItemsForMonth={loadItems}
      selected={'2024-06-02'}
      renderItem={renderItem}
     
      showClosingKnob={true}
    />
  );
}

const styles = StyleSheet.create({
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
  }
});
