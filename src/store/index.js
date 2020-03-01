import {combineReducers, createStore} from "redux";
import trolleyReducer from "../reducers/trolley";
import shoppingListReducer from "../reducers/shoppingList";

let store = createStore(combineReducers({
  trolley: trolleyReducer,
  shoppingList: shoppingListReducer
}));
export default store;