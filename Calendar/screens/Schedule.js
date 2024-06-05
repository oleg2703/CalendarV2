import React from 'react';
import { View, Button, StyleSheet, Text, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const weekTranslation = {
  'week1': 'Тиждень 1',
  'week2': 'Тиждень 2'
};

const dayTranslation = {
  'Monday': 'Понеділок',
  'Tuesday': 'Вівторок',
  'Wednesday': 'Середа',
  'Thursday': 'Четвер',
  'Friday': "П'ятниця",
  'Saturday': 'Субота',
  'Sunday': 'Неділя'
};

const subgroupTranslation = {
  'subgroup1': 'Підгрупа 1',
  'subgroup2': 'Підгрупа 2'
};

const renderSchedule = (schedule) => {
  if (!schedule) {
    return <Text>No schedule available</Text>;
  }

  const weeks = Object.keys(schedule);
  return weeks.map((week) => (
    <View key={week} style={styles.weekContainer}>
      <Text style={styles.weekTitle}>{weekTranslation[week] || week}</Text>
      {Object.keys(schedule[week]).map((day) => (
        <View key={day} style={styles.dayContainer}>
          <Text style={styles.dayTitle}>{dayTranslation[day] || day}</Text>
          {Object.keys(schedule[week][day]).map((subgroup) => (
            <View key={subgroup} style={styles.subgroupContainer}>
              <Text style={styles.subgroupTitle}>{subgroupTranslation[subgroup] || subgroup}</Text>
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
    textAlign: 'center',
  },
  weekContainer: {
    marginBottom: 20,
  },
  weekTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
    backgroundColor: '#f0f0f0',
    padding: 5,
  },
  dayContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#e9e9e9',
    borderRadius: 5,
  },
  dayTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  subgroupContainer: {
    marginLeft: 10,
    marginTop: 5,
    padding: 5,
    backgroundColor: '#d9d9d9',
    borderRadius: 5,
  },
  subgroupTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  lessonContainer: {
    marginLeft: 20,
    marginBottom: 5,
  },
  lessonText: {
    fontSize: 14,
  },
});

export default Schedule;
