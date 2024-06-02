const axios = require('axios');
const cheerio = require('cheerio');

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

    return newsItems;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};

fetchNews().then((newsItems) => {
  console.log(newsItems);
});

