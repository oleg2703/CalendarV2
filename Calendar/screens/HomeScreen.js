import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";

const HomeScreen = ({navigation}) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image
        style={{ width: 200, height: 160, marginBottom: 40 }}
        source={require("../assets/favicon.png")}
      />

      <Text
        style={{
          marginBottom: 30,
          color: "#000",
          fontSize: 42,
          fontWeight: "600",
        }}
      >
        Привіт!
      </Text>
      <TouchableOpacity
      onPress={()=>navigation.navigate("Upload")}
        style={{
          backgroundColor: "#6F9B9B",
          minwidth: "200",
          borderRadius: 15,
          paddingVertical: 15,
          width:"80%",
          alignItems:"center",
          marginTop:10
        }}
      >
        <Text style={{fontSize:18 ,color:"#fff",fontWeight:"600"}}>Розпочати</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({});
