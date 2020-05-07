import 'react-native-gesture-handler';

import * as React from 'react';
import {Provider, connect} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import store from "./src/store";
import HomeScreen from "./src/screens/HomeScreen";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ScannerScreen from "./src/screens/ScannerScreen";
import ShoppingScreen from "./src/screens/ShoppingScreen";
import ShoppingListScreen from "./src/screens/ShoppingListScreen";
import {Button, Icon} from "react-native-elements";
import PayScreen from "./src/screens/PayScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import {authentication} from "./src/reducers/authReducer";
import {strings} from "./src/locales/i18n";
import CheckoutScreen from "./src/screens/CheckoutScreen";
import UserProfileScreen from "./src/screens/UserProfileScreen";
import {Alert} from "react-native";
import { MenuProvider } from 'react-native-popup-menu';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

// Connect the screens to Redux
let HomeContainer = connect(state => ({auth: state.authentication}))(HomeScreen);
let UserProfileContainer = connect(state => ({jwt: state.authentication.jwt, userBio: state.userBio}))(UserProfileScreen);
let LoginContainer = connect(state => ({auth: state.authentication}))(LoginScreen);
let SignUpContainer = connect(state => ({auth: state.registration}))(SignUpScreen);
// Create our stack navigator
let RootStack = createStackNavigator();

const Tab = createBottomTabNavigator();

let TrolleyContainer = connect(state => ({trolley: state.trolley, jwt: state.authentication.jwt}))(ShoppingScreen);
let CheckoutContainer = connect(state => ({trolley: state.trolley, jwt: state.authentication.jwt}))(CheckoutScreen);
let ShoppingListContainer = connect(state => ({shoppingList: state.shoppingList, jwt: state.authentication.jwt}))(ShoppingListScreen);
let PayContainer = connect(state => ({trolley: state.trolley, jwt: state.authentication.jwt}))(PayScreen);
let ScannerContainer = connect(state => ({trolley: state.trolley, jwt: state.authentication.jwt}))(ScannerScreen);

const deleteTrolley = () =>
  Alert.alert(
    "Delete shopping cart?",
    "Do you like to delete shopping cart?",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "OK", onPress: () => console.log("OK Pressed") }
    ],
    { cancelable: false }
  );


function InitComponent ({auth, dispatch, navigation}) {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        {auth.loggedIn ? (
          <>
            <RootStack.Screen name="Home" component={HomeContainer}/>
            <RootStack.Screen name="Shopping" component={TrolleyContainer}/>
            <RootStack.Screen name="ScannerScreen" component={ScannerContainer}/>
            <RootStack.Screen name="Checkout" component={CheckoutContainer} options={{
              headerRight: () => (
                <Menu>
                  <MenuTrigger text='edit' />
                  <MenuOptions>
                    <MenuOption onSelect={deleteTrolley}/>
                  </MenuOptions>
                </Menu>
              ),
              headerRightContainerStyle: {paddingRight: 5}
            }}/>
            <RootStack.Screen name="UserProfile" component={UserProfileContainer}/>
            <RootStack.Screen
              name="PayScreen"
              component={PayContainer}
            />
          </>
        ) : (
          <>
            <RootStack.Screen name="Login" component={LoginContainer}/>
            <RootStack.Screen name="SignUp" component={SignUpContainer}/>
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const AppWithNavigationState = connect(state => ({auth: state.authentication}))(InitComponent)

// Render the app container component with the provider around it
export default function App() {
  return (
    <Provider store={store}>
      <AppWithNavigationState />
      </Provider>
  );
}