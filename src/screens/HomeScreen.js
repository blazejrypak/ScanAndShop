import {ActivityIndicator, Button, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import * as React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import {logout} from "../actions";
import { strings } from '../locales/i18n';

const Tab = createMaterialBottomTabNavigator();

function HomeScreen({auth, dispatch, navigation}) {
    return (
      <View style={styles.container}>
        {auth.loggedIn &&
        <TouchableOpacity style={styles.logoutBtn} onPress={() => dispatch(logout())}>
          <Text style={styles.logoutText}>{strings('auth.logout' )}</Text>
        </TouchableOpacity>
        }
        {auth.loggedIn &&
        <TouchableOpacity style={styles.logoutBtn} onPress={() => navigation.navigate('UserProfile')}>
          <Text style={styles.logoutText}>Profile</Text>
        </TouchableOpacity>

        }
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,0.2)',
            alignItems: 'center',
            justifyContent: 'center',
            width: 200,
            height: 200,
            backgroundColor: '#fff',
            borderRadius: 100,
          }}
          onPress={() => navigation.navigate('Shopping')}
        >
          <Text style={styles.button}>GO</Text>
          {/*<MaterialCommunityIcons name="qrcode-scan" size={80}/>*/}
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
    logoutText: {
      color: "black",
      fontWeight: "bold",
    },
    logoutBtn: {
      width: "80%",
      backgroundColor: "#1f8aff",
      borderRadius: 25,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 40,
      marginBottom: 10
    },
    button: {
      fontSize: 90,
    }
  });