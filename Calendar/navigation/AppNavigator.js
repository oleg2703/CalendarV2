import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StyleSheet,Text,View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import HomeScreen from "../screens/HomeScreen";
import UploadScreen from "../screens/UploadScreen";
import Schedule from "../screens/Schedule";

const Stack = createNativeStackNavigator();

const AppNavigator=()=> {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Upload" component={UploadScreen} />
          <Stack.Screen name="Schedule" component={Schedule} />
        </Stack.Navigator>
    </NavigationContainer>
    </GestureHandlerRootView>
  );
}
export default AppNavigator;
const styles=StyleSheet.create({});