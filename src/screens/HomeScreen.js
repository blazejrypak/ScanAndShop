import {Button, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import * as React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";

const Tab = createMaterialBottomTabNavigator();

function HomeScreen({ count, dispatch, navigation }) {
  return (
     <View style={styles.container}>
      {/*<Text style={styles.paragraph}>{count}</Text>*/}
      {/*<Button*/}
      {/*  title="Increment"*/}
      {/*  onPress={() => dispatch({ type: 'INCREMENT' })}*/}
      {/*/>*/}
      {/*<Button*/}
      {/*  title="Decrement"*/}
      {/*  onPress={() => dispatch({ type: 'DECREMENT' })}*/}
      {/*/>*/}

      {/*<Button*/}
      {/*  title="Go to static count screen"*/}
      {/*  onPress={() => navigation.navigate('StaticCounter')}*/}
      {/*/>*/}
    {/*  <Button*/}
    {/*    title="Scan the barcode"*/}
    {/*    onPress={() => navigation.navigate('Shopping')}*/}
    {/*  />*/}
      <TouchableOpacity
        style={{
          borderWidth:1,
          borderColor:'rgba(0,0,0,0.2)',
          alignItems:'center',
          justifyContent:'center',
          width:200,
          height:200,
          backgroundColor:'#fff',
          borderRadius:100,
        }}
        onPress={() => navigation.navigate('Shopping')}
      >
        <MaterialCommunityIcons name="qrcode-scan" size={80}/>
      </TouchableOpacity>
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});