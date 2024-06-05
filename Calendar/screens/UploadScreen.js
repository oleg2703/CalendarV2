import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';

const { height } = Dimensions.get('window');

const courses = {
  '1 курс': ['110', '111', '112', '115', '116', '118', '130', '131', '132', '135', '136','151','161','162'],
  '2 курс': ['210', '211', '212', '213', '215', '216', '231', '233', '232', '235', '236', '237', '251', '261'],
  '3 курс': ['310', '311', '312', '313', '315', '316', '317', '331', '333', '334', '332', '335', '336', '337', '338', '351', '361', '362'],
  '4 курс': ['411', '413', '414', '415', '416', '431', '433', '434', '432', '435', '436', '437', '451', '461'],
  '5 курс': ['511', '515', '531', '532', '535', '536', '551', '561']
};

const schedules = {
  '110': require('../redux/Shedules/110.json'),
  '111': require('../redux/Shedules/111.json'),
  '112': require('../redux/Shedules/112.json'),
  '115': require('../redux/Shedules/115.json'),
  '116': require('../redux/Shedules/116.json'),
  '118': require('../redux/Shedules/118.json'),
  '130': require('../redux/Shedules/130.json'),
  '131': require('../redux/Shedules/131.json'),
  '132': require('../redux/Shedules/132.json'),
  '135': require('../redux/Shedules/135.json'),
  '151': require('../redux/Shedules/151.json'),
  '161': require('../redux/Shedules/161.json'),
  '162': require('../redux/Shedules/162.json'),
  '136': require('../redux/Shedules/136.json'),
  '210': require('../redux/Shedules/210.json'),
  '211': require('../redux/Shedules/211.json'),
  '212': require('../redux/Shedules/212.json'),
  '213': require('../redux/Shedules/213.json'),
  '215': require('../redux/Shedules/215.json'),
  '216': require('../redux/Shedules/216.json'),
  '231': require('../redux/Shedules/231.json'),
  '233': require('../redux/Shedules/233.json'),
  '232': require('../redux/Shedules/232.json'),
  '235': require('../redux/Shedules/235.json'),
  '236': require('../redux/Shedules/236.json'),
  '237': require('../redux/Shedules/237.json'),
  '251': require('../redux/Shedules/251.json'),
  '261': require('../redux/Shedules/261.json'),
  '310': require('../redux/Shedules/310.json'),
  '311': require('../redux/Shedules/311.json'),
  '312': require('../redux/Shedules/312.json'),
  '313': require('../redux/Shedules/313.json'),
  '315': require('../redux/Shedules/315.json'),
  '316': require('../redux/Shedules/316.json'),
  '317': require('../redux/Shedules/317.json'),
  '331': require('../redux/Shedules/331.json'),
  '333': require('../redux/Shedules/333.json'),
  '334': require('../redux/Shedules/334.json'),
  '332': require('../redux/Shedules/332.json'),
  '335': require('../redux/Shedules/335.json'),
  '336': require('../redux/Shedules/336.json'),
  '337': require('../redux/Shedules/337.json'),
  '338': require('../redux/Shedules/338.json'),
  '351': require('../redux/Shedules/351.json'),
  '361': require('../redux/Shedules/361.json'),
  '362': require('../redux/Shedules/362.json'),
  '411': require('../redux/Shedules/411.json'),
  '413': require('../redux/Shedules/413.json'),
  '414': require('../redux/Shedules/414.json'),
  '415': require('../redux/Shedules/415.json'),
  '416': require('../redux/Shedules/416.json'),
  '431': require('../redux/Shedules/431.json'),
  '433': require('../redux/Shedules/433.json'),
  '434': require('../redux/Shedules/434.json'),
  '432': require('../redux/Shedules/432.json'),
  '435': require('../redux/Shedules/435.json'),
  '436': require('../redux/Shedules/436.json'),
  '437': require('../redux/Shedules/437.json'),
  '451': require('../redux/Shedules/451.json'),
  '461': require('../redux/Shedules/461.json'),
  '511': require('../redux/Shedules/511.json'),
  '515': require('../redux/Shedules/515.json'),
  '531': require('../redux/Shedules/531.json'),
  '532': require('../redux/Shedules/532.json'),
  '535': require('../redux/Shedules/535.json'),
  '536': require('../redux/Shedules/536.json'),
  '551': require('../redux/Shedules/551.json'),
  '561': require('../redux/Shedules/561.json')
};


const ScheduleApp = () => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const loadData = async () => {
      try {
        const course = await AsyncStorage.getItem('@selectedCourse');
        const group = await AsyncStorage.getItem('@selectedGroup');
        if (course) setSelectedCourse(course);
        if (group) setSelectedGroup(group);
      } catch (e) {
        console.error('Error loading data:', e);
      }
    };
    loadData();
  }, []);

  const saveSelection = async (course, group) => {
    try {
      if (course !== null) await AsyncStorage.setItem('@selectedCourse', course);
      if (group !== null) await AsyncStorage.setItem('@selectedGroup', group);
    } catch (e) {
      console.error('Error saving data:', e);
    }
  };

  const handleCourseChange = (course) => {
    setSelectedCourse(course);
    setSelectedGroup(''); // Clear the group selection
    saveSelection(course, '');
  };

  const handleGroupChange = (group) => {
    setSelectedGroup(group);
    saveSelection(null, group);
    const scheduleData = schedules[group];
    if (scheduleData) {
      navigation.navigate('Schedule', { group, scheduleData });
    } else {
      console.error('Error fetching schedule data: Schedule not found');
    }
  };

  const renderCourseButtons = () => {
    return Object.keys(courses).map((course) => (
      <TouchableOpacity key={course} style={styles.button} onPress={() => handleCourseChange(course)}>
        <Text style={styles.buttonText}>{course}</Text>
      </TouchableOpacity>
    ));
  };

  const renderGroupButtons = () => {
    if (!selectedCourse) return null;
    return courses[selectedCourse].map((group) => (
      <TouchableOpacity key={group} style={styles.button} onPress={() => handleGroupChange(group)}>
        <Text style={styles.buttonText}>{group}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.contentContainer}>
          <Text style={styles.title}>Виберіть курс:</Text>
          <View style={styles.buttonContainer}>
            {renderCourseButtons()}
          </View>
          {selectedCourse ? (
            <>
              <Text style={styles.title}>Виберіть групу:</Text>
              <View style={styles.buttonContainer}>
                {renderGroupButtons()}
              </View>
            </>
          ) : null}
        </ScrollView>
      </SafeAreaView>
      <Header style={styles.header} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E1F7F9",
  },
  safeArea: {
    flex: 1,
    marginTop: "5%",
    paddingBottom: 60, // space for the header
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    margin: 5,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
  title: {
    fontSize: 23,
    textAlign: 'center',
    marginBottom: 10,
  },
  header: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 10, // Ensure header is above other content
  },
});

export default ScheduleApp;
