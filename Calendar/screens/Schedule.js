import React from 'react';
import { View, Button, StyleSheet, Text, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const renderSchedule = (schedule) => {
  if (!schedule) {
    return <Text>No schedule available</Text>;
  }

  const weeks = Object.keys(schedule);
  return weeks.map((week) => (
    <View key={week}>
      <Text style={styles.weekTitle}>Тиждень 1</Text>
      {Object.keys(schedule[week]).map((day) => (
        <View key={day} style={styles.dayContainer}>
          <Text style={styles.dayTitle}>{day}</Text>
          {Object.keys(schedule[week][day]).map((subgroup) => (
            <View key={subgroup} style={styles.subgroupContainer}>
              <Text style={styles.subgroupTitle}>{subgroup}</Text>
              {schedule[week][day][subgroup].map((lesson, index) => (
                <View key={index} style={styles.lessonContainer}>
                  <Text style={styles.lessonText}>
                    {lesson.number}. {lesson.subject} ({lesson.type}) - {lesson.room} ({lesson.teacher})
                  </Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      ))}
    </View>
  ));
};

function Schedule() {
  const navigation = useNavigation();
  const route = useRoute();
  const { scheduleData, group } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.buttonContainer}>
        <Button title="Назад до вибору розкладу" onPress={() => navigation.goBack()} />
      </View>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.groupTitle}>Розклад для групи {group}</Text>
        {scheduleData && scheduleData.schedule
          ? renderSchedule(scheduleData.schedule)
          : <Text>No schedule data available</Text>}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    height: "10%",
    justifyContent: "flex-end",
  },
  scrollView: {
    flex: 1,
    padding: 10,
  },
  groupTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  weekTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  dayContainer: {
    marginTop: 5,
  },
  dayTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subgroupContainer: {
    marginLeft: 10,
  },
  subgroupTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  lessonContainer: {
    marginLeft: 20,
  },
  lessonText: {
    fontSize: 14,
  },
});

export default Schedule;
