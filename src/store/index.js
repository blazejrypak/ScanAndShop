import {applyMiddleware, combineReducers, createStore} from "redux";
import trolleyReducer from "../reducers/trolley";
import shoppingListReducer from "../reducers/shoppingList";
import {authentication, registration, userBioReducer} from "../reducers/authReducer";
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'


const rootReducer = combineReducers({
  trolley: trolleyReducer,
  shoppingList: shoppingListReducer,
  authentication: authentication,
  registration: registration,
  userBio: userBioReducer,
})

const loggerMiddleware = createLogger();

let store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    // loggerMiddleware
  )
);
export default store;