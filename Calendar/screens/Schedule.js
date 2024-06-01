import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { useNavigation, useRoute } from '@react-navigation/native';

function Schedule() {
  const navigation = useNavigation();
  const route = useRoute();
  const { injectedJavaScript, selectedLink } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.buttonContainer}>
        <Button title="Назад до вибору розкладу" onPress={() => navigation.goBack()} />
      </View>
      <WebView
        source={{ uri: selectedLink }}
        style={{ flex: 1 }}
        injectedJavaScript={injectedJavaScript}
        scalesPageToFit={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    height: "10%",
    justifyContent:"flex-end" // Adjust this value as needed
  },
});

export default Schedule;
