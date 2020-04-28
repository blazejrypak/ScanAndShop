import {authHeader} from "../_helpers/auth_header";
import {AsyncStorage} from "react-native";

let DOMAIN = '10.10.10.48'

export function auth_login(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  }
  return fetch(`http://${DOMAIN}:8080/login`, requestOptions)
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(response);
      } else {
        // setAuthToken(response.headers["Authorization"]).then(r => r);
      }
    })
    .catch(err => console.log("ERROR: ", err))
}
export function auth_register(username, password) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  }
  return fetch(`http://${DOMAIN}:8080/user/sign-up`, requestOptions)
    .then((response) => response.json())
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
      return Promise.reject(error);
    })
}