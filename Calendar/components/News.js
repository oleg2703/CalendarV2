import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, useWindowDimensions, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import cheerio from 'cheerio';
import Header from '../components/Header';

const News = () => {
  const [newsItems, setNewsItems] = useState([]);
  const contentWidth = useWindowDimensions().width;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedNews = await AsyncStorage.getItem('@newsItems');
        if (storedNews !== null) {
          setNewsItems(JSON.parse(storedNews));
        } else {
          const response = await axios.get('https://fcst.nau.edu.ua/news/');
          const $ = cheerio.load(response.data);

          const items = [];
          $('.elementor-post__text').each((i, element) => {
            const title = $(element).find('.elementor-post__title').text();
            const meta = $(element).find('.elementor-post__meta-data').text();
            const excerpt = $(element).find('.elementor-post__excerpt').text();
            const imageUrl = $(element).find('.elementor-post__thumbnail img').attr('src');

            items.push({ title, meta, excerpt, imageUrl });
          });

          setNewsItems(items);
          await AsyncStorage.setItem('@newsItems', JSON.stringify(items));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={[styles.newsItem, { width: contentWidth * 0.9 }]}>
      <Text style={styles.newsTitle} numberOfLines={7} ellipsizeMode="tail">{item.title}</Text>
      <Text style={styles.newsMeta} numberOfLines={1} ellipsizeMode="tail">{item.meta}</Text>
      <Text style={styles.newsExcerpt} numberOfLines={4} ellipsizeMode="tail">{item.excerpt}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={newsItems}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
      />
      <Header />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flatListContent: {
  marginTop:"5%",
  marginLeft:"3%",
  },
  newsItem: {
    marginBottom: 20,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height: 250, // Fixed height for all items
  },

  newsTitle: {
    color: '#2c3e50',
    fontSize: 14,
    marginBottom: 5,
    textAlign: 'center',
    fontWeight:"bold",
  },
  newsMeta: {
    color: '#95a5a6',
    fontSize: 12,
    marginBottom: 5,
    textAlign: 'center',
  },
  newsExcerpt: {
    color: '#34495e',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default News;
