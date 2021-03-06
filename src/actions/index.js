import {
  ADD_SHOPPING_LIST_ITEM,
  ADD_TROLLEY_ITEM,
  alertConstants,
  CHANGE_INPUT_ITEM_NAME,
  CHECKOUT,
  DELETE_SHOPPING_LIST_ITEM,
  DELETE_TROLLEY_ITEM,
  GET_TROLLEY,
  GET_TROLLEY_ITEM_DETAILS,
  UPDATE_SHOPPING_LIST_ITEM,
  UPDATE_TROLLEY_ITEM,
  userConstants,
} from "../constants/action_types";
import Axios from "axios";

import {DOMAIN, nextShoppingListItemId} from '../_helpers/config'

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
        dispatch(success(user, response.data[0].token));
        dispatch(update_user_bio(response.data[0].user))
        dispatch(alertActions.success("Logged in"));
      })
      .catch(error => {
        dispatch(failure(error.response.msg));
        dispatch(alertActions.error(error.response.msg));
      });
  }

  function update_user_bio(user) {
    return {
      type: userConstants.UPDATE_USER_BIO,
      user
    }
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
    "email": user.email,
    "password": user.password,
    "subscription": user.subscription
  }
  return dispatch => {
    dispatch(request(user));
    Axios.post(`http://${DOMAIN}/user/register`, user_json)
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

export const subscribe_news = (jwt, subscribe_value) => {
  return dispatch => {
    const requestOptions = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `${jwt}`
      }
    }
    const data = {
      "subs": subscribe_value
    }
    Axios.post(`http://${DOMAIN}/user/subscription`, data, requestOptions)
      .then((response) => {
        dispatch(alertActions.success('Request successful'));
        dispatch(subscribe(subscribe_value));
      })
      .catch(err => {
        console.log(err);
        dispatch(alertActions.error("error to get trolley" + err));
      });
  }

  function subscribe(value) {
    return {
      type: userConstants.SUBSCRIBE,
      subscription: value,
    }
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
    Axios.get(`http://${DOMAIN}/shopping/cart/new`, requestOptions)
      .then((response) => {
        dispatch(alertActions.success('Request successful'));
        dispatch(get_trolley(response.data.id));
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

export const checkout = (jwt, trolley) => {
  return dispatch => {
    const requestOptions = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `${jwt}`
      }
    }
    const trolleyItems = [];
    for (let i = 0; i < trolley.trolleyItems.length; i++) {
      trolleyItems.push({
        "code": trolley.trolleyItems[i].code,
        "quantity": trolley.trolleyItems[i].quantity,
        "price": trolley.trolleyItems[i].price
      })
    }
    const data = {
      "shopping_cart_id": trolley.trolleyId,
      "items": trolleyItems
    }
    Axios.put(`http://${DOMAIN}/shopping/cart`, data, requestOptions)
      .then((response) => {
        dispatch(alertActions.success('Request successful'));
        dispatch(checkout_order());
      })
      .catch(err => {
        console.log(err);
        dispatch(alertActions.error("error to get trolley" + err));
      });
  }

  function checkout_order() {
    return {
      type: CHECKOUT
    }
  }
}

export const send_emails = jwt => {
  return dispatch => {
    const requestOptions = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `${jwt}`
      }
    }
    Axios.post(`http://${DOMAIN}/email/katalog`, {}, requestOptions)
      .then((response) => {
        dispatch(alertActions.success('Request successful'));
      })
      .catch(err => {
        console.log(err);
        dispatch(alertActions.error("error to get trolley" + err));
      });
  }
}

export const addTrolleyItem = (name, price, count, barcode, trolleyId, jwt) => {
  const requestOptions = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `${jwt}`
    },
  }
  const data = {
    "code": `${barcode}`
  }
  console.log(barcode);
  return dispatch => {
    Axios.post(`http://${DOMAIN}/warehouse/item`, data, requestOptions)
      .then((response) => {
        dispatch(alertActions.success('Request successful'));
        let product = response.data;
        product["quantity"] = 1;
        dispatch(add_product(product));
      })
      .catch(err => {
        console.log(err);
        dispatch(alertActions.error("error to get item" + err));
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