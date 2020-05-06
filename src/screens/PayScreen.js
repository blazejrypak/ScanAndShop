import {Button, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import * as React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import QRCode from 'react-native-qrcode-svg'

const Tab = createMaterialBottomTabNavigator();

function PayScreen({ trolley, dispatch, navigation }) {
  return (
     <View style={styles.container}>
       <Text style={{ fontSize: 20, textAlign:'center', paddingBottom: 30, color: 'green' }}>Show the QR code below to cashier</Text>
       <QRCode
         value={JSON.stringify(trolley)}
         color={'black'}
         backgroundColor={'white'}
         size={300}
         logoMargin={2}
         logoBorderRadius={10}
         logoBackgroundColor={'transparent'}
        />
    </View>
  );
}

export default PayScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});