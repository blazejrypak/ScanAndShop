const axios = require('axios');

const cheerio = require('react-native-cheerio')
import {
  ADD_SHOPPING_LIST_ITEM,
  ADD_TROLLEY_ITEM,
  alertConstants,
  CHANGE_INPUT_ITEM_NAME,
  DELETE_SHOPPING_LIST_ITEM,
  DELETE_TROLLEY_ITEM,
  GET_TROLLEY, GET_TROLLEY_ITEM_DETAILS,
  UPDATE_SHOPPING_LIST_ITEM,
  UPDATE_TROLLEY_ITEM,
  userConstants,
} from "../constants/action_types";
import Axios from "axios";

let nextTrolleyItemId = 24522;
let nextShoppingListItemId = 24621;

let DOMAIN = '10.10.10.48:5000'

export const login = (username, password) => {
  const user_json = {
    "username": username,
    "password": password
  }
  const user = {username: username, password: password};
  return dispatch => {
    dispatch(request(user));
    Axios.post(`http://${DOMAIN}/login`, user_json)
      .then((response) => {
        dispatch(success(user, response.token));
        dispatch(alertActions.success("Logged in"));
      })
      .catch(error => {
        dispatch(failure(error.response.msg));
        dispatch(alertActions.error(error.response.msg));
      });
  }

  function request(user) {
    return {type: userConstants.LOGIN_REQUEST, user}
  }

  function success(user, jwt) {
    return {type: userConstants.LOGIN_SUCCESS, user, jwt}
  }

  function failure(error) {
    return {type: userConstants.LOGIN_FAILURE, error}
  }
}

export function logout() {
  return {type: userConstants.LOGOUT};
}

export const register = (user) => {
  const user_json = {
    "username": user.username,
    "password": user.password
  }
  return dispatch => {
    dispatch(request(user));
    Axios.post(`http://${DOMAIN}/register`, user_json)
      .then((response) => {
        dispatch(success(user));
        dispatch(alertActions.success('Registration successful'));
      })
      .catch(error => {
        dispatch(failure(error.response.msg));
        dispatch(alertActions.error(error.response.msg));
      });
  }

  function request(user) {
    return {type: userConstants.REGISTER_REQUEST, user}
  }

  function success(user) {
    return {type: userConstants.REGISTER_SUCCESS, user}
  }

  function failure(error) {
    return {type: userConstants.REGISTER_FAILURE, error}
  }
}

export const getTrolley = (jwt) => {
  return dispatch => {
    const requestOptions = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `${jwt}`
      }
    }
    Axios.get(`http://${DOMAIN}/shopping_cart`, requestOptions)
      .then((response) => {
        dispatch(alertActions.success('Request successful'));
        dispatch(get_trolley(response.data.id));
        dispatch(getTrolleyItems(response.data.id, jwt));
      })
      .catch(err => {
        console.log(err);
        dispatch(alertActions.error("error to get trolley" + err));
      });
  }
  function get_trolley(id) {
    return {
      type: GET_TROLLEY,
      trolleyId: id,
    }
  }
}

export function getAuthHeaders(jwt) {
  return {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `${jwt}`
    }
  }
}

export const getTrolleyItems = (trolleyId, jwt) => {
  return dispatch => {
    const requestOptions = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `${jwt}`
      }
    }
    Axios.get(`http://${DOMAIN}/cart/${trolleyId}/items`, requestOptions)
      .then((response) => {
        dispatch(alertActions.success('Request successful'));
        dispatch(get_trolley_items(dispatch, response.data))
      })
      .catch(err => {
        console.log(err);
        dispatch(alertActions.error("error to get trolley" + err));
      });
  }
  function get_trolley_items(dispatch, trolleyItemsList) {
    console.log(trolleyItemsList);
    if (trolleyItemsList) {
      trolleyItemsList.map((item) => {
        console.log('item: ', item);
        dispatch({
            type: ADD_TROLLEY_ITEM,
            item: {
              'id': item.id,
              'quantity': item.quantity,
              'product': item.product
            }
        })
      })
    }
  }
}

export const pushTrolleyItem = (item, trolleyId, jwt) => {
  let product = {
    "id": item.id,
    "name": item.product.name,
    "description": item.product.description,
    "price": item.product.price,
    "store": {
      "id": item.product.store.id,
      "name": item.product.store.name,
      "description": item.product.store.description
    }
  }
  Axios.post(`http://${DOMAIN}/stores/1/products`, product, getAuthHeaders(jwt))
    .then((response) => {
      console.log(response.data);
      dispatch(alertActions.success('Request successful'));
    })
    .catch(err => {
      console.log(err);
    })
    .then(() => {
      pushItemToCart({"product": product, "quantity": item.quantity});
      });

  function pushItemToCart(item) {
    console.log(item);
    Axios.post(`http://${DOMAIN}/cart/${trolleyId}/items`, item, getAuthHeaders(jwt))
      .then((response) => {
        console.log(response.data);
        dispatch(alertActions.success('Request successful'));
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export const addTrolleyItem = (name, price, count, barcode, trolleyId, jwt) => {
  nextTrolleyItemId += 1;
  let item = {
    "id": nextTrolleyItemId,
    "quantity": count,
    "product": {
      "description": null,
      "id": 1,
      "name": `Item ${nextTrolleyItemId}`,
      "price": price,
      "store": {
        "description": "Vtipalek store",
        "id": 1,
        "name": "Bubo",
      },
    }
  }
  return dispatch => {
    Axios.get(`http://www.nasepotraviny.info/${barcode}/`)
      .then((response) => {
        const $ = cheerio.load(response.data)
        let product_name = $('html body div#obsah form.formSearch div.obsah.detail h2').text();
        if (typeof product_name === "string") {
          item.product.name = product_name;
          item.product.price = 10;
          item.quantity = 1;
        }
      })
      .catch(error => {
        console.log(error);
      })
      .then(() => {
        dispatch(add_product(item));
        dispatch(pushTrolleyItem(item, trolleyId, jwt));
      })
  }
  function add_product(item) {
    return {
      type: ADD_TROLLEY_ITEM,
      item: item
    }
  }
};

export function updateTrolleyItem(id, count) {
  return {
    type: UPDATE_TROLLEY_ITEM,
    id,
    count
  }
}

export function getTrolleyItemDetails(id) {
  return {
    type: GET_TROLLEY_ITEM_DETAILS,
    id
  }
}

export const addShoppingListItem = (name, count) => ({
  type: ADD_SHOPPING_LIST_ITEM,
  id: nextShoppingListItemId++,
  name,
  count
});

export function updateShoppingListItem(id, count) {
  return {
    type: UPDATE_SHOPPING_LIST_ITEM,
    id,
    count
  }
}

export function deleteShoppingListItem(id) {
  return {
    type: DELETE_SHOPPING_LIST_ITEM,
    id
  }
}

export function deleteTrolleyListItem(id) {
  return {
    type: DELETE_TROLLEY_ITEM,
    id
  }
}

export function changeInputItemName(text) {
  return {
    type: CHANGE_INPUT_ITEM_NAME,
    inputItemName: text
  }
}

export const alertActions = {
  success,
  error,
  clear
};

function success(message) {
  return {type: alertConstants.SUCCESS, message};
}

function error(message) {
  return {type: alertConstants.ERROR, message};
}

function clear() {
  return {type: alertConstants.CLEAR};
}