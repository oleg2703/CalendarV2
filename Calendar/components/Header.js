import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.menuContainer}>
        <View style={styles.menuItem}>
          <FontAwesome
            name="home"
            size={24}
            color="#000"
            onPress={() => navigation.navigate('menu')}
          />
          <Text style={styles.menuText}>Головна</Text>
        </View>
        <View style={styles.menuItem}>
          <FontAwesome
            name="clipboard"
            size={24}
            color="#000"
            onPress={() => navigation.navigate('Upload')}
          />
          <Text style={styles.menuText}>Розклад</Text>
        </View>
        <View style={styles.menuItem}>
          <FontAwesome
            name="calendar"
            size={24}
            color="#000"
            onPress={() => navigation.navigate('CalendarScreen')}
          />
          <Text style={styles.menuText}>Календар</Text>
        </View>
        <View style={styles.menuItem}>
          <FontAwesome
            name="address-book"
            size={24}
            color="#000"
            onPress={() => navigation.navigate('teacher')}
          />
          <Text style={styles.menuText}>Контакти</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#f8f8f8',
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f8f8f8',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  menuItem: {
    alignItems: 'center',
  },
  menuText: {
    marginTop: 5,
    fontSize: 12,
    color: '#000',
  },
});

export default Header;
