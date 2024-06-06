import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Modal, TouchableOpacity, FlatList, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { setCourse, setGroup, setSubgroup, setWeek, resetSelection } from '../redux/scheduleSclice';
import { scheduleTimes, courses } from '../redux/Shedules/schedules'; // Import schedules, scheduleTimes, and courses

import Header from '../components/Header';
import News from '../components/News';
import Icon from 'react-native-vector-icons/FontAwesome';

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
    navigation.navigate('CalendarScreen', { group, subgroup, week });
  };

  const handleRemoveSelection = () => {
    dispatch(resetSelection());
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
        <Text style={styles.usefulInfoTitle}></Text>
        
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
