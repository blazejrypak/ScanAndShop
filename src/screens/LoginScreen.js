import {Button, StyleSheet, Text, TouchableOpacity, View, TextInput, ActivityIndicator} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import * as React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import {useState} from "react";
import {set} from "react-native-reanimated";
import {login} from "../actions/index"

const Tab = createMaterialBottomTabNavigator();

function LoginScreen({ auth, dispatch, navigation }) {
  const [inputs, setInputs] = useState({
    username: '',
    password: ''
  })
  const {username, password} = inputs;
  return (
     <View style={styles.container}>
       <View style={styles.inputView} >
         <TextInput
           style={styles.inputText}
           placeholder="Username..."
           placeholderTextColor="#003f5c"
           autoCompleteType={"username"}
           value={username}
           onChangeText={(text) => setInputs(inputs => ({ ...inputs, username: text}))}
         />
       </View>
       <View style={styles.inputView}>
         <TextInput
           style={styles.inputText}
           placeholder="Password..."
           placeholderTextColor="#003f5c"
           secureTextEntry={true}
           value={password}
           onChangeText={(text) => setInputs(inputs => ({ ...inputs, password: text}))}
         />
       </View>
       <TouchableOpacity style={styles.loginBtn} onPress={() => dispatch(login(username, password))}>
         {auth.loggedIn && <ActivityIndicator size="large" color="#0000ff" />}
         <Text
           style={styles.loginText}
         >LOGIN</Text>
       </TouchableOpacity>
       <TouchableOpacity>
         <Text style={styles.forgot}>Forgot Password?</Text>
       </TouchableOpacity>
       <TouchableOpacity>
         <Text
           style={styles.loginText}
           onPress={() => navigation.navigate('SignUp')}
         >Signup</Text>
       </TouchableOpacity>
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#fb5b5a",
    marginBottom:40
  },
  inputView:{
    width:"80%",
    backgroundColor:"#a1a1a1",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"white"
  },
  forgot:{
    color:"white",
    fontSize:11
  },
  loginText:{
    color:"black",
    fontWeight: "bold",
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#1f8aff",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
});