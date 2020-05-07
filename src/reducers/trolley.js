import {
  GET_TROLLEY,
  ADD_TROLLEY_ITEM,
  UPDATE_TROLLEY_ITEM,
  DELETE_TROLLEY_ITEM, DELETE_SHOPPING_LIST_ITEM, GET_TROLLEY_ITEM_DETAILS, CHECKOUT
} from "../constants/action_types";

const initialState = {
  trolleyId: null,
  trolleyItems: [],
  trolleySum: 0,
  itemDetails_id: 0,
}

const trolleyReducer = (state = initialState, action) => {
  if (typeof state === 'undefined') {
    return 0;
  }
  switch (action.type) {
    case ADD_TROLLEY_ITEM:
      let newState = {
        ...state,
        trolleyItems: [...state.trolleyItems, action.item],
        itemDetails_id: action.item.id,
      };
      let newSum = 0;
      for (let i = 0; i < newState.trolleyItems.length; i++) {
        if (newState.trolleyItems[i] !== undefined) {
          newSum += (newState.trolleyItems[i].price - newState.trolleyItems[i].discount) * newState.trolleyItems[i].quantity;
        }
      }
      newState.trolleySum = newSum.toFixed(2);
      return newState;
    case UPDATE_TROLLEY_ITEM:
      let newSt = {
        ...state,
        trolleyItems: state.trolleyItems.map(item => item.id === action.id ? {...item, quantity: action.count} : item),
      };
      let sum = 0;
      for (let i = 0; i < newSt.trolleyItems.length; i++) {
        if (newSt.trolleyItems[i] !== undefined) {
          sum += (newSt.trolleyItems[i].price - newSt.trolleyItems[i].discount) * newSt.trolleyItems[i].quantity;
        }
      }
      newSt.trolleySum = sum.toFixed(2);
      return newSt;
    case DELETE_TROLLEY_ITEM:
      return  {
        ...state,
        trolleyItems: state.trolleyItems.filter(item => item.id !== action.id),
      };
    case GET_TROLLEY:
      return {
        ...state,
        trolleyId: action.trolleyId,
      }
    case GET_TROLLEY_ITEM_DETAILS:
      return {
        ...state,
        itemDetails_id: action.id,
      }
    case CHECKOUT:
      return initialState;
    default:
      return state;
  }
};

export default trolleyReducer;