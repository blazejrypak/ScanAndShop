let nextTrolleyItemId = 4;
let nextShoppingListItemId = 1;
import {
  ADD_TROLLEY_ITEM,
  UPDATE_TROLLEY_ITEM,
  DELETE_TROLLEY_ITEM,

  ADD_SHOPPING_LIST_ITEM,
  UPDATE_SHOPPING_LIST_ITEM,
  CHANGE_INPUT_ITEM_NAME, DELETE_SHOPPING_LIST_ITEM,
} from "../constants/action_types";

import { alertConstants, userConstants } from "../constants/action_types"

export const login = (username, password) => {
  const user = {username: username, email: 'example@example.sk', password: password};
  return dispatch => {
    dispatch(request(user));
    if (username === 'bubo') {
      dispatch(success(user));
      dispatch(alertActions.success("Logged in"));
    } else {
      dispatch(failure('error wrong username'))
      dispatch(alertActions.error("error to log in"));
    }
  };
  function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
  function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
  function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
  return { type: userConstants.LOGOUT };
}

export const register = (user) => {
  return dispatch => {
    dispatch(request(user));
    dispatch(success(user));
    dispatch(alertActions.success('Registration successful'))
  };

  function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
  function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
  function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}
export const addTrolleyItem = (name, price, count) => ({
  type: ADD_TROLLEY_ITEM,
  id: nextTrolleyItemId,
  name,
  price,
  count
});

export function updateTrolleyItem(id, count) {
  return {
    type: UPDATE_TROLLEY_ITEM,
    id,
    count
  }
}

export const addShoppingListItem = (name, count) => ({
  type: ADD_SHOPPING_LIST_ITEM,
  id: nextShoppingListItemId,
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
  return { type: alertConstants.SUCCESS, message };
}

function error(message) {
  return { type: alertConstants.ERROR, message };
}

function clear() {
  return { type: alertConstants.CLEAR };
}