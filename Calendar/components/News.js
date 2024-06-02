import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import axios from 'axios';
import cheerio from 'cheerio';
import RNFS from 'react-native-fs';

const { width: screenWidth } = Dimensions.get('window');

const fetchNews = async () => {
  try {
    const { data } = await axios.get('https://fcst.nau.edu.ua/news/');
    const $ = cheerio.load(data);
    const newsItems = [];

    $('.news-item').each((i, element) => {
      const title = $(element).find('.news-title').text().trim();
      const description = $(element).find('.news-description').text().trim();
      const date = $(element).find('.news-date').text().trim();

      newsItems.push({ title, description, date });
    });

    // Збереження новин у файл
    const filePath = `${RNFS.DocumentDirectoryPath}/news.json`;
    await RNFS.writeFile(filePath, JSON.stringify(newsItems, null, 2), 'utf8');
    console.log('News saved to', filePath);

    return newsItems;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};

const News = () => {
  const [newsItems, setNewsItems] = useState([]);

  useEffect(() => {
    const getNewsItems = async () => {
      const newsData = await fetchNews();
      setNewsItems(newsData);
    };

    getNewsItems();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.date}>{item.date}</Text>
    </View>
  );

  return (
    <Carousel
      data={newsItems}
      renderItem={renderItem}
      sliderWidth={screenWidth}
      itemWidth={screenWidth - 60}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    marginTop: 10,
  },
  date: {
    fontSize: 12,
    marginTop: 5,
    color: 'gray',
  },
});

export default News;
