import { View, Text, StyleSheet, ScrollView, Image, Modal, TouchableOpacity, FlatList, TextInput } from 'react-native';
import React, { useState } from 'react';
import Header from '../components/Header';
import News from '../components/News';
import Icon from 'react-native-vector-icons/FontAwesome';

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
  const [modalVisible, setModalVisible] = useState(false);
  const [reminderModalVisible, setReminderModalVisible] = useState(false);
  const [courseModalVisible, setCourseModalVisible] = useState(false);
  const [groupModalVisible, setGroupModalVisible] = useState(false);
  const [subgroupModalVisible, setSubgroupModalVisible] = useState(false);
  const [weekModalVisible, setWeekModalVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedSubgroup, setSelectedSubgroup] = useState('');
  const [selectedWeek, setSelectedWeek] = useState('');

  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    setCourseModalVisible(false);
    setGroupModalVisible(true);
  };

  const handleGroupSelect = (group) => {
    setSelectedGroup(group);
    setGroupModalVisible(false);
    setSubgroupModalVisible(true);
  };

  const handleSubgroupSelect = (subgroup) => {
    setSelectedSubgroup(subgroup);
    setSubgroupModalVisible(false);
    setWeekModalVisible(true);
  };

  const handleWeekSelect = (week) => {
    setSelectedWeek(week);
    setWeekModalVisible(false);
    setReminderModalVisible(false);
  };

  const handleRemoveSelection = () => {
    setSelectedCourse('');
    setSelectedGroup('');
    setSelectedSubgroup('');
    setSelectedWeek('');
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

        {selectedCourse && (
          <View style={styles.selectionContainer}>
            <Text style={styles.selectionText}>Обраний курс: {selectedCourse}</Text>
            <Text style={styles.selectionText}>Обрана група: {selectedGroup}</Text>
            <Text style={styles.selectionText}>Обрана підгрупа: {selectedSubgroup}</Text>
            <Text style={styles.selectionText}>Поточний тиждень: {selectedWeek}</Text>
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
          data={courses[selectedCourse]}
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
                onChangeText={setSelectedWeek}
              />
              <TouchableOpacity onPress={() => handleWeekSelect(selectedWeek)} style={styles.closeButton}>
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
