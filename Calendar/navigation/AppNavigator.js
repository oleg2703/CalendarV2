import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StyleSheet,Text,View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import UploadScreen from "../screens/UploadScreen";

const Stack = createNativeStackNavigator();

const AppNavigator=()=> {
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown:false}}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Upload" component={UploadScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}
export default AppNavigator;
const styles=StyleSheet.create({});