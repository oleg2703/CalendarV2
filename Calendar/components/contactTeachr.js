import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, Image, StyleSheet, Dimensions } from 'react-native';
import axios from 'axios';
import cheerio from 'cheerio';
import * as FileSystem from 'expo-file-system';

const { width: screenWidth } = Dimensions.get('window');

const Teachers = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://ccs.nau.edu.ua/pro-kafedry/teachers');
        const $ = cheerio.load(response.data);

        const items = [];
        $('.entry-content p').each((i, element) => {
          const name = $(element).find('strong').text().trim();
          const position = $(element).find('br').first().next().text().trim();
          const degree = $(element).find('br').nextAll().eq(1).text().trim();
          const imgUrl = $(element).find('img.alignnone').attr('src');
          const contact = $(element).find('a').text().trim();

          if (name && position) {
            items.push({ name, position, degree, imgUrl, contact });
          }
        });

        setTeachers(items);
        await saveDataToFile(items);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const saveDataToFile = async (data) => {
    const fileUri = FileSystem.documentDirectory + 'contactTeachers.json';
    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(data));
    console.log('Data saved to:', fileUri);
  };

  const renderItem = ({ item }) => (
    <View style={styles.teacherItem}>
      {item.imgUrl ? (
        <Image source={{ uri: item.imgUrl }} style={styles.teacherImage} />
      ) : (
        <View style={[styles.teacherImage, styles.placeholderImage]} />
      )}
      <Text style={styles.teacherName}>{item.name}</Text>
      <Text style={styles.teacherPosition}>{item.position}</Text>
      <Text style={styles.teacherDegree}>{item.degree}</Text>
      <Text style={styles.teacherContact}>{item.contact}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
        {teachers.length > 0 ? (
          <Carousel
            data={teachers}
            renderItem={renderItem}
            sliderWidth={screenWidth}
            itemWidth={screenWidth * 0.8}
            layout={'default'}
          />
        ) : (
          <Text>Loading...</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  teacherItem: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  teacherImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  placeholderImage: {
    backgroundColor: '#e1e1e1',
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
  teacherContact: {
    color: '#2980b9',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default Teachers
