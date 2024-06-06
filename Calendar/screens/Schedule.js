import React, { useState } from 'react';
import { View, Button, StyleSheet, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const renderSchedule = (schedule, selectedSubgroup) => {
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
            (selectedSubgroup === subgroup || selectedSubgroup === '') && (
              <View key={subgroup} style={styles.subgroupContainer}>
                <Text style={styles.subgroupTitle}>{subgroupTranslation[subgroup] || subgroup}</Text>
                {schedule[week][day][subgroup].map((lesson, index) => (
                  <View key={index} style={styles.lessonContainer}>
                    <Text style={styles.lessonText}>
                      {lesson.number}. {lesson.subject}
                    </Text>
                    <Text style={styles.lessonSubText}>{lesson.type} {lesson.room} {lesson.teacher}</Text>
                  </View>
                ))}
              </View>
            )
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

  const [selectedSubgroup, setSelectedSubgroup] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleConfirmSchedule = async () => {
    try {
      await AsyncStorage.setItem('@confirmedGroup', group);
      await AsyncStorage.setItem('@confirmedSubgroup', selectedSubgroup);
      setIsConfirmed(true);
      Alert.alert("Розклад підтверджено", `Розклад для групи ${group} підтверджено`);
    } catch (e) {
      console.error('Error confirming schedule:', e);
    }
  };

  const handleSubgroupChange = (subgroup) => {
    setSelectedSubgroup(subgroup);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.buttonContainer}>
        <Button title="Назад до вибору розкладу" onPress={() => navigation.goBack()} />
      </View>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.groupTitle}>Розклад для групи {group}</Text>
        <View style={styles.subgroupButtonContainer}>
          {Object.keys(subgroupTranslation).map((subgroup) => (
            <TouchableOpacity
              key={subgroup}
              style={[
                styles.subgroupButton,
                selectedSubgroup === subgroup ? styles.selectedSubgroupButton : null,
              ]}
              onPress={() => handleSubgroupChange(subgroup)}
            >
              <Text style={styles.subgroupButtonText}>{subgroupTranslation[subgroup]}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {scheduleData && scheduleData.schedule
          ? renderSchedule(scheduleData.schedule, selectedSubgroup)
          : <Text>No schedule data available</Text>}
      </ScrollView>
      {!isConfirmed && (
        <View style={styles.confirmButtonContainer}>
          <Button title="Підтвердити розклад" onPress={handleConfirmSchedule} />
        </View>
      )}
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
    backgroundColor: '#fdfdfd',
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
    backgroundColor: '#fdfdfd',
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
    fontSize: 16,
    fontWeight:"600"
  },
  lessonSubText:{
    fontSize:12,
    fontStyle:"italic"
  },
  confirmButtonContainer: {
    padding: 10,
    backgroundColor: '#fff',
  },
  subgroupButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  subgroupButton: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    backgroundColor: '#007BFF',
  },
  selectedSubgroupButton: {
    backgroundColor: '#0056b3',
  },
  subgroupButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default Schedule;
