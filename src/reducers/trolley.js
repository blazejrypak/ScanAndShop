import {
  GET_TROLLEY,
  ADD_TROLLEY_ITEM,
  UPDATE_TROLLEY_ITEM,
  DELETE_TROLLEY_ITEM, DELETE_SHOPPING_LIST_ITEM
} from "../constants/action_types";

const initialState = {
  trolleyId: null,
  trolleyItems: [],
  trolleySum: 0,
  trolleyWeight: 0,
};


function sum(prev, next){
  return prev + next;
}
function price(item){
  return item.product.price;
}

const trolleyReducer = (state = initialState, action) => {
  if (typeof state === 'undefined') {
    return 0;
  }
  switch (action.type) {
    case ADD_TROLLEY_ITEM:
      let newState = {
        ...state,
        trolleyItems: [...state.trolleyItems, action.item]
      };
      let newSum = 0;
      for (let i = 0; i < newState.trolleyItems.length; i++) {
        if (newState.trolleyItems[i] !== undefined) {
          newSum += (newState.trolleyItems[i].product.price * newState.trolleyItems[i].quantity);
        }
      }
      newState.trolleySum = newSum;
      return newState;
    case UPDATE_TROLLEY_ITEM:
      let newSt = {
        ...state,
        trolleyItems: state.trolleyItems.map(item => item.id === action.id ? {...item, quantity: action.count} : item),
      };
      let sum = 0;
      for (let i = 0; i < newSt.trolleyItems.length; i++) {
        if (newSt.trolleyItems[i] !== undefined) {
          sum += newSt.trolleyItems[i].product.price * newSt.trolleyItems[i].quantity;
        }
      }
      newSt.trolleySum = sum;
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
    default:
      return state;
  }
};

export default trolleyReducer;