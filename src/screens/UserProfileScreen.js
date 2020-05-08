import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import React from "react";
import {send_emails, subscribe_news} from "../actions";

function UserProfileScreen({ jwt, userBio, dispatch, navigation }) {
  console.log(userBio);
  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <Image style={styles.avatar} source={{uri: 'https://i.redd.it/cafy9cjeen931.jpg'}}/>
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <Text>R. Hranol</Text>
          <Text style={styles.info}>Mobile developer</Text>
          <Text style={styles.description}>Za všetko môže Radičovej vláda :)</Text>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => dispatch(subscribe_news(jwt, !userBio.subscription))}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{ userBio.subscription ? 'Unsubscribe' : 'Subscribe'}</Text>
          </TouchableOpacity>
          { userBio && userBio.user && userBio.user.admin &&
          <TouchableOpacity onPress={() => dispatch(send_emails(jwt))}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{ 'Send emails' }</Text>
          </TouchableOpacity>
          }
        </View>
      </View>
    </View>
  );
}

export default UserProfileScreen;

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#44b170",
    height:200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  name:{
    fontSize:22,
    fontWeight:'600',
  },
  body:{
    marginTop:40,
  },
  bodyContent: {
    alignItems: 'center',
    padding:30,
  },
  info:{
    fontSize:16,
    color: "#44b170",
    marginTop:10
  },
  description:{
    fontSize:16,
    marginTop:10,
    textAlign: 'center'
  },
  buttonContainer: {
    marginTop:40,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#359258",
  },
});