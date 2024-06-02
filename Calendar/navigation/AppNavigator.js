import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StyleSheet,Text,View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import HomeScreen from "../screens/HomeScreen";
import UploadScreen from "../screens/UploadScreen";
import Schedule from "../screens/Schedule";
import NotificationScreen from "../screens/NotificationScreen";
import CalendarScreen from "../screens/CalendarScreen";
import News from '../components/News'
import contactTeachr from '../components/contactTeachr'

const Stack = createNativeStackNavigator();

const AppNavigator=()=> {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Upload" component={UploadScreen} />
          <Stack.Screen name="Schedule" component={Schedule} />
          <Stack.Screen name="Notification" component={NotificationScreen} />
          <Stack.Screen name="News" component={News} />
          <Stack.Screen name="teacher" component={contactTeachr} />
          <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
        </Stack.Navigator>
    </NavigationContainer>
    </GestureHandlerRootView>
  );
}
export default AppNavigator;
const styles=StyleSheet.create({});