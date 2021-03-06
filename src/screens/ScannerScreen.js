import {Button, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import * as React from "react";
import ScanBarCode from "../components/ScanBarCode";
import {addTrolleyItem} from "../actions";
import {DEFAUL_COUNT, DEFAUL_PRICE} from "../constants/constants";
import {strings} from "../locales/i18n";

function ScannerScreen({ trolley, jwt, dispatch, navigation }) {
  function onBarCodeScanned(type, data) {
    console.log("[BAR CODE SCANNED] type: ", type, " data: ", data);
    dispatch(addTrolleyItem(data.toString(), DEFAUL_PRICE, DEFAUL_COUNT, data.toString(), trolley.trolleyId, jwt));
    navigation.navigate('Shopping');
  }

  return (
      <ScanBarCode onBarCodeScanned={onBarCodeScanned.bind(this)}/>
  );
}

export default ScannerScreen;

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