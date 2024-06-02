// NotificationScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import * as Notifications from 'expo-notifications';
import NotificationModal from '../components/NotificationModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NotificationScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [completedNotifications, setCompletedNotifications] = useState([]);

  useEffect(() => {
    loadNotifications();
    const interval = setInterval(() => {
      const now = new Date();
      setNotifications(prev => {
        const active = [];
        const completed = [];
        prev.forEach(notification => {
          if (new Date(notification.dateTime) <= now) {
            completed.push(notification);
          } else {
            active.push(notification);
          }
        });
        if (completed.length > 0) {
          setCompletedNotifications(prevCompleted => [...prevCompleted, ...completed]);
        }
        saveNotifications(active); // Save active notifications
        return active;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const loadNotifications = async () => {
    try {
      const storedNotifications = await AsyncStorage.getItem('notifications');
      if (storedNotifications) {
        setNotifications(JSON.parse(storedNotifications));
      }
    } catch (error) {
      console.error('Failed to load notifications.', error);
    }
  };

  const saveNotifications = async (newNotifications) => {
    try {
      await AsyncStorage.setItem('notifications', JSON.stringify(newNotifications));
    } catch (error) {
      console.error('Failed to save notifications.', error);
    }
  };

  const handleScheduleNotification = async (notification) => {
    const trigger = {
      seconds: Math.ceil((new Date(notification.dateTime).getTime() - new Date().getTime()) / 1000),
    };

    await Notifications.scheduleNotificationAsync({
      content: {
        title: notification.title,
        body: notification.body,
      },
      trigger,
    });

    const newNotifications = [...notifications, notification];
    setNotifications(newNotifications);
    saveNotifications(newNotifications);
    alert('Notification scheduled!');
  };

  const renderNotificationItem = ({ item }) => (
    <View style={styles.notificationItem}>
      <Text style={styles.notificationTitle}>{item.title}</Text>
      <Text>{item.body}</Text>
      <Text>{new Date(item.dateTime).toLocaleString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Active Notifications</Text>
      <FlatList
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={item => item.id}
      />
      
      <NotificationModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSchedule={handleScheduleNotification}
      />
    </View>
  );
}

const styles = StyleSheet.create({
 
});
