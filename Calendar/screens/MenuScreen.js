import { View, Text, StyleSheet ,Image} from 'react-native';
import React from 'react';
import Header from '../components/Header';
import News from '../components/News';

const MenuScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        style={{ width: 170, height: 120,marginTop:"14%"}}
        source={require("../assets/favicon.png")}
      />
      <Text style={{fontWeight:"600", fontSize:24}}>Щоденник календар ФКНТ</Text>
      <Text style={{fontWeight:"400", fontSize:16}}></Text>
      <News/>
      <Header style={styles.header} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent:"center",
    alignItems:"center",
    
  },
  header: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 10,
  },
});

export default MenuScreen;
