import { View, Text, StyleSheet, ScrollView ,Image} from 'react-native';
import React from 'react';
import Header from '../components/Header';
import News from '../components/News';

const scheduleTimes = [
  { period: "1 пара", start: "08:00", end: "09:35" },
  { period: "2 пара", start: "09:50", end: "11:25" },
  { period: "3 пара", start: "11:40", end: "13:15" },
  { period: "4 пара", start: "13:30", end: "15:05" },
  { period: "5 пара", start: "15:20", end: "16:55" },
  { period: "6 пара", start: "17:10", end: "18:45" },
  { period: "7 пара", start: "19:00", end: "20:35" },
];

const ScheduleRow = ({ period, start, end }) => (
  <View style={styles.scheduleRow}>
    <Text style={styles.scheduleText}>{period}</Text>
    <Text style={styles.scheduleText}>{start}</Text>
    <Text style={styles.scheduleText}>{end}</Text>
  </View>
);

const MenuScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          style={{ width: 100, height: 80, marginTop: "14%" }}
          source={require("../assets/favicon.png")}
        />
        <Text style={{ fontWeight: "600", fontSize: 24 ,marginBottom: 0}}>Щоденник календар ФКНТ</Text>
        <Text style={{ fontWeight: "400", fontSize: 16 }}></Text>
        <Text style={styles.scheduleTitle}>Розклад дзвінків</Text>
        <View style={styles.scheduleContainer}>
          {scheduleTimes.map((time, index) => (
            <ScheduleRow key={index} {...time} />
          ))}
        </View>
        <News />
        </ScrollView>
        
      
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
  scheduleTitle: {
    fontWeight: "600",
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  scheduleContainer: {
    width: '90%',
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
  },
  scheduleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  scheduleText: {
    fontSize: 16,
  },
});

export default MenuScreen;
