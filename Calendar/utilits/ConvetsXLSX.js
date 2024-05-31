import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import creds from './path-to-your-credentials.json'; // шлях до JSON-файлу з обліковими даними

const Schedule = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const doc = new GoogleSpreadsheet('1TPLB77WK_BDVY2J6SFNBTvDMhzH6am_b');
      await doc.useServiceAccountAuth(creds);
      await doc.loadInfo(); // Завантажити метадані таблиці

      const sheet = doc.sheetsById[1238846972]; // використовуйте ID вашого листа
      const rows = await sheet.getRows(); // Отримати всі рядки

      const rowData = rows.map(row => ({
        para: row['Пара'], // замініть на ваші назви колонок
        subject1: row['Назва предмету (Підгрупа 1)'],
        audit1: row['Аудит. (Підгрупа 1)'],
        type1: row['Вид занять (Підгрупа 1)'],
        lecturer1: row['Викладач (Підгрупа 1)'],
        subject2: row['Назва предмету (Підгрупа 2)'],
        audit2: row['Аудит. (Підгрупа 2)'],
        type2: row['Вид занять (Підгрупа 2)'],
        lecturer2: row['Викладач (Підгрупа 2)'],
      }));

      setData(rowData);
    };

    fetchData();
  }, []);

  return (
    <ScrollView>
      {data.map((item, index) => (
        <View key={index} style={styles.row}>
          <Text>{`Пара ${item.para}`}</Text>
          <Text>{`Підгрупа 1: ${item.subject1} - ${item.audit1} - ${item.type1} - ${item.lecturer1}`}</Text>
          <Text>{`Підгрупа 2: ${item.subject2} - ${item.audit2} - ${item.type2} - ${item.lecturer2}`}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  row: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
});

export default Schedule;
