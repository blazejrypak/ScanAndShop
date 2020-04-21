import 'react-native-gesture-handler';

import * as React from 'react';
import { Provider, connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import store from "./src/store";
import HomeScreen from "./src/screens/HomeScreen";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ScannerScreen from "./src/screens/ScannerScreen";
import TrolleyScreen from "./src/screens/TrolleyScreen";
import ShoppingListScreen from "./src/screens/ShoppingListScreen";
import {Button} from "react-native-elements";
import PayScreen from "./src/screens/PayScreen";


// Connect the screens to Redux
let HomeContainer = connect(state => ({ count: state.count }))(HomeScreen);
// Create our stack navigator
let RootStack = createStackNavigator();

const Tab = createBottomTabNavigator();

let TrolleyContainer = connect(state => ({ trolley: state.trolley }))(TrolleyScreen);
let ShoppingListContainer = connect(state => ({ shoppingList: state.shoppingList }))(ShoppingListScreen);
let PayContainer = connect(state => ({ shoppingList: state.shoppingList }))(PayScreen);
let ScannerContainer = connect(state => ({}))(ScannerScreen);

function ShoppingContainer() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="ShoppingList" component={ShoppingListContainer} />
      <Tab.Screen name="Scan" component={ScannerContainer} />
      <Tab.Screen
        name="Trolley"
        component={TrolleyContainer}
      />
    </Tab.Navigator>
  );
}

// Render the app container component with the provider around it
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootStack.Navigator initialRouteName="Home">
          <RootStack.Screen name="Home" component={HomeContainer} />
          <RootStack.Screen
            name="Shopping"
            component={ShoppingContainer}
          />
          <RootStack.Screen
            name="PayScreen"
            component={PayContainer}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}