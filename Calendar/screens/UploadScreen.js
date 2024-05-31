import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Header from '../components/Header';
import * as Linking from 'expo-linking';

const courses = {
  '1 курс': {
    '110': 'https://docs.google.com/spreadsheets/d/1TPLB77WK_BDVY2J6SFNBTvDMhzH6am_b/edit#gid=1238846972',
    '111': 'link_to_pdf_or_excel_for_111',
    // Додайте інші спеціальності
  },
  '2 курс': {
    '210': 'link_to_pdf_or_excel_for_210',
    '211': 'link_to_pdf_or_excel_for_211',
    // Додайте інші спеціальності
  },
  // Додайте інші курси
};

const ScheduleApp = () => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

  const handleCourseChange = (course) => {
    setSelectedCourse(course);
    setSelectedSpecialty(''); // Очистити вибір спеціальності
  };

  const handleSpecialtyChange = (specialty) => {
    setSelectedSpecialty(specialty);
  };

  const openLink = () => {
    const link = courses[selectedCourse][selectedSpecialty];
    if (link) {
      Linking.openURL(link);
    } else {
      alert('Посилання не знайдено.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header headerText={"Щоденник-Календар ФКНТ"} headerIcon={"bell-o"} />

      <Text>Виберіть курс:</Text>
      <Picker
        selectedValue={selectedCourse}
        onValueChange={handleCourseChange}
        style={styles.picker}
      >
        <Picker.Item label="Виберіть курс" value="" />
        {Object.keys(courses).map((course) => (
          <Picker.Item key={course} label={course} value={course} />
        ))}
      </Picker>

      {selectedCourse ? (
        <>
          <Text>Виберіть спеціальність:</Text>
          <Picker
            selectedValue={selectedSpecialty}
            onValueChange={handleSpecialtyChange}
            style={styles.picker}
          >
            <Picker.Item label="Виберіть спеціальність" value="" />
            {Object.keys(courses[selectedCourse]).map((specialty) => (
              <Picker.Item key={specialty} label={specialty} value={specialty} />
            ))}
          </Picker>
        </>
      ) : null}

      <Button title="Відкрити розклад" onPress={openLink} disabled={!selectedSpecialty} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  picker: {
    height: 50,
    width: '100%',
  },
});

export default ScheduleApp;
