import {
  ADD_SHOPPING_LIST_ITEM,
  UPDATE_SHOPPING_LIST_ITEM,
  DELETE_SHOPPING_LIST_ITEM,
  CHANGE_INPUT_ITEM_NAME
} from "../constants/action_types";

const initialState = {
  shoppingList: [],
  inputItemName: '',
};

const shoppingListReducer = (state = initialState, action) => {
  if (typeof state === 'undefined') {
    return 0;
  }
  switch (action.type) {
    case ADD_SHOPPING_LIST_ITEM:
      return {
        ...state,
        shoppingList: [...state.shoppingList, {id: action.id, name: action.name, count: action.count}]
      };
    case UPDATE_SHOPPING_LIST_ITEM:
      return {
        ...state,
        shoppingList: state.shoppingList.map(item => item.id === action.id ? {...item, count: action.count} : item),
      };
    case DELETE_SHOPPING_LIST_ITEM:
      return {
        ...state,
        shoppingList: state.shoppingList.filter(item => item.id !== action.id),
      };
    case CHANGE_INPUT_ITEM_NAME:
      return {
        ...state,
        inputItemName: action.inputItemName
      };
    default:
      return state;
  }
};

export default shoppingListReducer;