import {
  ADD_TROLLEY_ITEM,
  UPDATE_TROLLEY_ITEM,
  DELETE_TROLLEY_ITEM
} from "../constants/action_types";

const initialState = {
  trolleyItems: [
    {
      id: 1,
      name: "Mrkva",
      price: 20,
      count: 3,
      barcode: 54654,
    },
    {
      id: 2,
      name: "Jablko",
      price: 15,
      count: 1,
      barcode: 54654,
    },
    {
      id: 3,
      name: "Hraskok",
      price: 30,
      count: 5,
      barcode: 54654,
    }
  ],
  trolleySum: 58,
  trolleyWeight: 4500,
};


function sum(prev, next){
  return prev + next;
}
function price(item){
  return item.price;
}

const trolleyReducer = (state = initialState, action) => {
  if (typeof state === 'undefined') {
    return 0;
  }
  switch (action.type) {
    case ADD_TROLLEY_ITEM:
      let newState = {
        ...state,
        trolleyItems: [...state.trolleyItems, {id: action.id, name: action.name, price: action.price, count: action.count, barcode: 456}]
      };
      let newSum = 0;
      for (let i = 0; i < newState.trolleyItems.length; i++) {
        newSum += (newState.trolleyItems[i].price * newState.trolleyItems[i].count);
      }
      newState.trolleySum = newSum;
      return newState;
    case UPDATE_TROLLEY_ITEM:
      let newSt = {
        ...state,
        trolleyItems: state.trolleyItems.map(item => item.id === action.id ? {...item, count: action.count} : item),
      };
      let sum = 0;
      for (let i = 0; i < newSt.trolleyItems.length; i++) {
        sum += newSt.trolleyItems[i].price * newSt.trolleyItems[i].count;
      }
      newSt.trolleySum = sum;
      return newSt;
    default:
      return state;
  }
};

export default trolleyReducer;