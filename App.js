import 'react-native-gesture-handler';

import * as React from 'react';
import {Provider, connect} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import store from "./src/store";
import HomeScreen from "./src/screens/HomeScreen";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ScannerScreen from "./src/screens/ScannerScreen";
import TrolleyScreen from "./src/screens/TrolleyScreen";
import ShoppingListScreen from "./src/screens/ShoppingListScreen";
import {Button} from "react-native-elements";
import PayScreen from "./src/screens/PayScreen";
import LoginScreen from "./src/screens/LoginScreen";
import SignUpScreen from "./src/screens/SignUpScreen";
import {authentication} from "./src/reducers/authReducer";
import {strings} from "./src/locales/i18n";

// Connect the screens to Redux
let HomeContainer = connect(state => ({auth: state.authentication}))(HomeScreen);
let LoginContainer = connect(state => ({auth: state.authentication}))(LoginScreen);
let SignUpContainer = connect(state => ({auth: state.registration}))(SignUpScreen);
// Create our stack navigator
let RootStack = createStackNavigator();

const Tab = createBottomTabNavigator();

let TrolleyContainer = connect(state => ({trolley: state.trolley, jwt: state.authentication.jwt}))(TrolleyScreen);
let ShoppingListContainer = connect(state => ({shoppingList: state.shoppingList, jwt: state.authentication.jwt}))(ShoppingListScreen);
let PayContainer = connect(state => ({trolley: state.trolley, jwt: state.authentication.jwt}))(PayScreen);
let ScannerContainer = connect(state => ({trolley: state.trolley, jwt: state.authentication.jwt}))(ScannerScreen);

function ShoppingContainer() {
  return (
    <Tab.Navigator>
      <Tab.Screen name={strings('ShoppingContainer.shopping_list' )} component={ShoppingListContainer}/>
      <Tab.Screen name={strings('ShoppingContainer.scan' )} component={ScannerContainer}/>
      <Tab.Screen
        name={strings('ShoppingContainer.shopping_cart' )}
        component={TrolleyContainer}
      />
    </Tab.Navigator>
  );
}
function InitComponent ({auth, dispatch, navigation}) {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        {auth.loggedIn ? (
          <>
            <RootStack.Screen name="Home" component={HomeContainer}/>
            <RootStack.Screen
              name="Shopping"
              component={ShoppingContainer}
            />
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