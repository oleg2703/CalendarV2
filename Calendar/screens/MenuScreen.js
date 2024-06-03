import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Header from '../components/Header';

const MenuScreen = () => {
  return (
    <View style={styles.container}>
      <Text>MenuScreen</Text>
      <Header style={styles.header} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E1F7F9",
  },
  header: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 10,
  },
});

export default MenuScreen;
