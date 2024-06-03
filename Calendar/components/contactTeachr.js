import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import cheerio from 'cheerio';
import * as FileSystem from 'expo-file-system';
import Header from '../components/Header';

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fileUri = FileSystem.documentDirectory + 'contactTeachers.json';
        const fileExists = await FileSystem.getInfoAsync(fileUri);
        
        if (fileExists.exists) {
          const fileContents = await FileSystem.readAsStringAsync(fileUri);
          setTeachers(JSON.parse(fileContents));
        } else {
          const response = await axios.get('http://ccs.nau.edu.ua/pro-kafedry/teachers');
          const $ = cheerio.load(response.data);

          const items = [];
          const contentSections = $('.entry-content').children('p, div');

          let currentTeacher = null;

          contentSections.each((i, element) => {
            if ($(element).is('p') && $(element).find('strong').length) {
              if (currentTeacher) {
                items.push(currentTeacher);
              }

              const name = $(element).find('strong').text().trim();
              let textNodes = $(element).contents().filter(function () {
                return this.nodeType === 3; // 3 is the nodeType for text nodes
              });

              const positionText = textNodes.toArray().map(node => node.nodeValue).join(' ').trim();
              const positionMatch = positionText.match(/Посада:([^,]*)/);
              const degreeMatch = positionText.match(/Науковий ступінь, вчене звання:([^,]*)/);

              const position = positionMatch ? positionMatch[1].trim() : '';
              const degree = degreeMatch ? degreeMatch[1].trim() : '';

              currentTeacher = { name, position, degree, email: '' };
            } else if ($(element).is('p') && $(element).text().includes('@')) {
              if (currentTeacher) {
                currentTeacher.email = $(element).text().trim();
              }
            }
          });

          if (currentTeacher) {
            items.push(currentTeacher);
          }

          setTeachers(items);
          await saveDataToFile(items);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const saveDataToFile = async (data) => {
    const fileUri = FileSystem.documentDirectory + 'contactTeachers.json';
    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(data));
  };

  const renderTeacherItem = (item) => (
    <View style={styles.teacherItem} key={item.name}>
      <Text style={styles.teacherName}>{item.name}</Text>
      <Text style={styles.teacherPosition}>{item.position}</Text>
      {item.degree && <Text style={styles.teacherDegree}>{item.degree}</Text>}
      {item.email && <Text selectable={true} style={styles.teacherEmail}>{item.email}</Text>}
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {loading ? (
          <Text>Loading...</Text>
        ) : teachers.length > 0 ? (
          teachers.map(renderTeacherItem)
        ) : (
          <Text>No data available.</Text>
        )}
      </ScrollView>
      <Header style={styles.header} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:"5%",
    backgroundColor: '#fff',
    paddingBottom: 60, // space for the header
  },
  scrollView: {
    flex: 1,
  },
  teacherItem: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  teacherName: {
    color: '#2c3e50',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  teacherPosition: {
    color: '#95a5a6',
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center',
  },
  teacherDegree: {
    color: '#34495e',
    fontSize: 14,
    marginBottom: 5,
    textAlign: 'center',
  },
  teacherEmail: {
    color: 'blue',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
  header: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});

export default Teachers;
