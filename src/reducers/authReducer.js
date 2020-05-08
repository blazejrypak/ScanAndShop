import {userConstants} from "../constants/action_types";

const initialState = {
  user: null,
  jwt: null,
  loggingIn: false,
  loggedIn: false
}

export const authentication = (state=initialState, action) =>  {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        loggingIn: false,
        user: action.user,
        jwt: action.jwt
      };
    case userConstants.LOGIN_FAILURE:
      return {
        user: null,
        loggingIn: false,
        loggedIn: false
      };
    case userConstants.LOGOUT:
      return initialState;
    default:
      return state
  }
}

export const registration = (state = {}, action) => {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return { registering: true, user: action.user};
    case userConstants.REGISTER_SUCCESS:
      return {registering: false, user: action.user};
    case userConstants.REGISTER_FAILURE:
      return {registering: false, user: null};
    default:
      return state
  }
}

const userBioInitialState = {
  subscription: false,
  user: null
}

export const userBioReducer = (state = userBioInitialState, action) => {
  switch (action.type) {
    case userConstants.SUBSCRIBE:
      return {
        ...state,
        subscription: action.subscription
      }
    case userConstants.UPDATE_USER_BIO:
      return {
        ...state,
        user: action.user
      }
    default:
      return state;
  }
}

