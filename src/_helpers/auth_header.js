import {AsyncStorage} from "react-native";

export function authTescoHeader() {
  return { 'Ocp-Apim-Subscription-Key' : '74251a762e3e408098daecd133f56f2e'};
}

export const AUTH_TOKEN_KEY = 'AUTH_TOKEN'


export const _storeData = async (key, value) => {
  try {
    console.log(`Saving data(${key} ${value}) to Async Storage`);
    await AsyncStorage.setItem(`@MySuperStore:${key}`, value.toString());
  } catch (error) {
    console.log("Error: ", error);
  }
};

export const _retrieveData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(`@MySuperStore:${key}`);
    if (value !== null) {
      console.log(`Retrieve data: ${value}`);
      return value;
    }
  } catch (error) {
    console.log('Error: ', error);
  }
};

export function authHeader() {
  return { 'Authorization' : _retrieveData(AUTH_TOKEN_KEY)};
}