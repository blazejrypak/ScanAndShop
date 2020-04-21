let nextTrolleyItemId = 4;
let nextShoppingListItemId = 1;
import {
  ADD_TROLLEY_ITEM,
  UPDATE_TROLLEY_ITEM,
  DELETE_TROLLEY_ITEM,

  ADD_SHOPPING_LIST_ITEM,
  UPDATE_SHOPPING_LIST_ITEM,
  CHANGE_INPUT_ITEM_NAME, DELETE_SHOPPING_LIST_ITEM
} from "../constants/action_types";

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

export function  updateShoppingListItem(id, count) {
  return {
    type: UPDATE_SHOPPING_LIST_ITEM,
    id,
    count
  }
}

export function  deleteShoppingListItem(id) {
  return {
    type: DELETE_SHOPPING_LIST_ITEM,
    id
  }
}

export function  changeInputItemName(text) {
  return {
    type: CHANGE_INPUT_ITEM_NAME,
    inputItemName: text
  }
}