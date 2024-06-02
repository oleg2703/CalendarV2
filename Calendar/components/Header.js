import { View, Text } from 'react-native';
import React from 'react';
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';

export default function Header({ headerText, headerIcon }) {
  const navigation = useNavigation();

  return (
    <View style={{
      flexDirection: 'row',
      width: "100%",
      paddingTop: "15%",
      paddingBottom: "3%",
      backgroundColor: '#B1E5E5',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5,
    }}>
      <Text style={{ flex: 1, fontSize: 15,marginLeft:10 }}>{headerText}</Text>
      <FontAwesome
        name={headerIcon}
        size={24}
        color="#000"
        onPress={() => navigation.navigate('Notification')}
      />
      <FontAwesome
        name="bars"
        size={24}
        color="#000"
        style={{ marginHorizontal: "7%" }}
        onPress={() => navigation.navigate("News")}
      />
    </View>
  );
}
