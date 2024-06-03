import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, useWindowDimensions, StyleSheet } from 'react-native';
import RenderHtml from 'react-native-render-html';
import axios from 'axios';
import cheerio from 'cheerio';
import Header  from '../components/Header'

const News = () => {
  const [newsItems, setNewsItems] = useState([]);
  const contentWidth = useWindowDimensions().width;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://fcst.nau.edu.ua/news/');
        const $ = cheerio.load(response.data);

        const items = [];
        $('.elementor-post__text').each((i, element) => {
          const title = $(element).find('.elementor-post__title').text();
          const meta = $(element).find('.elementor-post__meta-data').text();
          const excerpt = $(element).find('.elementor-post__excerpt').text();

          items.push({ title, meta, excerpt });
        });

        setNewsItems(items);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        {newsItems.map((item, index) => (
          <View key={index} style={styles.newsItem}>
            <Text style={styles.newsTitle}>{item.title}</Text>
            <Text style={styles.newsMeta}>{item.meta}</Text>
            <Text style={styles.newsExcerpt}>{item.excerpt}</Text>
          </View>
        ))}
      </ScrollView>
      <Header/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
  newsItem: {
    marginBottom: 20,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  newsTitle: {
    color: '#2c3e50',
    fontSize: 18,
    marginBottom: 5,
  },
  newsMeta: {
    color: '#95a5a6',
    fontSize: 12,
    marginBottom: 5,
  },
  newsExcerpt: {
    color: '#34495e',
    fontSize: 14,
  },
});

export default News;
