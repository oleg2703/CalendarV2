import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Modal, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { setCourse, setGroup, setSubgroup, setWeek, resetSelection } from '../redux/scheduleSclice';
import { setEvents } from '../redux/eventsSlice';
import Header from '../components/Header';
import News from '../components/News';
import Icon from 'react-native-vector-icons/FontAwesome';

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

const scheduleTimes = [
  { period: "1 пара", start: "08:00", end: "09:35" },
  { period: "2 пара", start: "09:50", end: "11:25" },
  { period: "3 пара", start: "11:40", end: "13:15" },
  { period: "4 пара", start: "13:30", end: "15:05" },
  { period: "5 пара", start: "15:20", end: "16:55" },
  { period: "6 пара", start: "17:10", end: "18:45" },
  { period: "7 пара", start: "19:00", end: "20:35" },
];

const courses = {
  '1 курс': ['110', '111', '112', '115', '116', '118', '130', '131', '132', '135', '136', '151', '161', '162'],
  '2 курс': ['210', '211', '212', '213', '215', '216', '231', '233', '232', '235', '236', '237', '251', '261'],
  '3 курс': ['310', '311', '312', '313', '315', '316', '317', '331', '333', '334', '332', '335', '336', '337', '338', '351', '361', '362'],
  '4 курс': ['411', '413', '414', '415', '416', '431', '433', '434', '432', '435', '436', '437', '451', '461'],
  '5 курс': ['511', '515', '531', '532', '535', '536', '551', '561']
};

const ScheduleRow = ({ period, start, end }) => (
  <View style={styles.scheduleRow}>
    <Text style={styles.scheduleText}>{period}</Text>
    <Text style={styles.scheduleText}>{start}</Text>
    <Text style={styles.scheduleText}>{end}</Text>
  </View>
);

const SelectionModal = ({ title, data, onSelect, onClose }) => (
  <Modal animationType="slide" transparent={true} visible={true} onRequestClose={onClose}>
    <View style={styles.modalView}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>{title}</Text>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.selectionButton} onPress={() => onSelect(item)}>
              <Text style={styles.selectionText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

const MenuScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { course, group, subgroup, week } = useSelector((state) => state.selectedGroup);

  const [modalVisible, setModalVisible] = useState(false);
  const [reminderModalVisible, setReminderModalVisible] = useState(false);
  const [courseModalVisible, setCourseModalVisible] = useState(false);
  const [groupModalVisible, setGroupModalVisible] = useState(false);
  const [subgroupModalVisible, setSubgroupModalVisible] = useState(false);
  const [weekModalVisible, setWeekModalVisible] = useState(false);

  const handleCourseSelect = (course) => {
    dispatch(setCourse(course));
    setCourseModalVisible(false);
    setGroupModalVisible(true);
  };

  const handleGroupSelect = (group) => {
    dispatch(setGroup(group));
    setGroupModalVisible(false);
    setSubgroupModalVisible(true);
  };

  const handleSubgroupSelect = (subgroup) => {
    dispatch(setSubgroup(subgroup));
    setSubgroupModalVisible(false);
    setWeekModalVisible(true);
  };

  const handleWeekSelect = (week) => {
    dispatch(setWeek(week));
    setWeekModalVisible(false);
    setReminderModalVisible(false);
    generateEvents();
  };

  const handleRemoveSelection = () => {
    dispatch(resetSelection());
  };

  const generateEvents = () => {
    const newItems = {};
    const scheduleData = schedules[group];
    if (scheduleData && scheduleData[week]) {
      scheduleData[week].forEach((daySchedule, index) => {
        daySchedule.classes.forEach((classInfo) => {
          const eventDate = new Date();
          eventDate.setDate(eventDate.getDate() + index); // Adjust based on actual schedule date
          const dateStr = eventDate.toISOString().split('T')[0];
          const event = {
            name: classInfo.name,
            description: classInfo.description,
            start: classInfo.start,
            end: classInfo.end,
            day: dateStr,
            reminder: null
          };
          if (!newItems[dateStr]) {
            newItems[dateStr] = [];
          }
          newItems[dateStr].push(event);
        });
      });
    }
    dispatch(setEvents(newItems));
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          style={{ width: 100, height: 80, marginTop: "14%" }}
          source={require("../assets/favicon.png")}
        />
        <Text style={{ fontWeight: "600", fontSize: 24, marginBottom: 0 }}>Щоденник календар ФКНТ</Text>
        <News />
        <Text style={styles.usefulInfoTitle}>Корисні данні</Text>
        
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.button}>
          <Text style={styles.buttonText}>Дзвінки</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => setReminderModalVisible(true)} style={styles.addButton}>
          <Icon name="plus" size={16} color="#fff" />
          <Text style={styles.buttonText}> Додати нагадування про пари</Text>
        </TouchableOpacity>

        {course && (
          <View style={styles.selectionContainer}>
            <Text style={styles.selectionText}>Обраний курс: {course}</Text>
            <Text style={styles.selectionText}>Обрана група: {group}</Text>
            <Text style={styles.selectionText}>Обрана підгрупа: {subgroup}</Text>
            <Text style={styles.selectionText}>Поточний тиждень: {week}</Text>
            <TouchableOpacity onPress={handleRemoveSelection} style={styles.removeButton}>
              <Text style={styles.removeButtonText}>Видалити вибір</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Розклад дзвінків</Text>
            {scheduleTimes.map((time, index) => (
              <ScheduleRow key={index} {...time} />
            ))}
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {reminderModalVisible && (
        <SelectionModal
          title="Оберіть курс"
          data={Object.keys(courses)}
          onSelect={handleCourseSelect}
          onClose={() => setReminderModalVisible(false)}
        />
      )}

      {groupModalVisible && (
        <SelectionModal
          title="Оберіть групу"
          data={courses[course]}
          onSelect={handleGroupSelect}
          onClose={() => setGroupModalVisible(false)}
        />
      )}

      {subgroupModalVisible && (
        <SelectionModal
          title="Оберіть підгрупу"
          data={['1', '2']}
          onSelect={handleSubgroupSelect}
          onClose={() => setSubgroupModalVisible(false)}
        />
      )}

      {weekModalVisible && (
        <Modal animationType="slide" transparent={true} visible={true} onRequestClose={() => setWeekModalVisible(false)}>
          <View style={styles.modalView}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Оберіть тиждень</Text>
              <TextInput
                style={styles.input}
                placeholder="Введіть номер тижня"
                keyboardType="numeric"
                onChangeText={(text) => dispatch(setWeek(text))}
              />
              <TouchableOpacity onPress={() => handleWeekSelect(week)} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Підтвердити</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      <Header style={styles.header} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    alignItems: "center",
    paddingBottom: 20,
  },
  header: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 10,
  },
  usefulInfoTitle: {
    fontWeight: "600",
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  usefulInfoText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#2196F3",
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#4CAF50",
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
  },
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: '90%',
    alignItems: "center",
  },
  modalTitle: {
    fontWeight: "600",
    fontSize: 20,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#2196F3",
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  scheduleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    width: '100%',
  },
  scheduleText: {
    fontSize: 16,
  },
  selectionContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  selectionText: {
    fontSize: 16,
    marginVertical: 5,
  },
  selectionButton: {
    backgroundColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
  removeButton: {
    backgroundColor: "#f44336",
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
  },
  removeButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '80%',
    textAlign: 'center',
  },
});

export default MenuScreen;
