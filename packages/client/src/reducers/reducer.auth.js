
import {
    LOGIN_SUCESS,
    LOGIN_FAILED,
    AUTHENTICATION_SUCESS,
    AUTHENTICATION_FAILED,
    SIGNUP_SUCESS,
    SIGNUP_FAILED,
    LOGOUT_USER,
  } from "../actions/action.types";
  
  const initialState = {
    access: localStorage.getItem("access"),
    isAuthenticated: null,
    loading: true,
    user: {
      "firstname": "",
      "lastname": "",
      "email": "",
      "password": "",
      "confirmation": "",
      "resume": "",
      "linkedin": "",
      "github": "",
      "clusters": [{
        "title": "",
        "subtitle": "",
        "text": "",
        "selected": ""
      },
      {
        "title": "",
        "subtitle": "",
        "text": "",
        "selected": ""
      }, 
      {
        "title": "",
        "subtitle": "",
        "text": "",
        "selected": ""
      }]},
  };
  
  export default function (state = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case AUTHENTICATION_SUCESS:
        return {
          ...state,
          isAuthenticated: true,
          loading: false,
          user: payload,
        };
      case SIGNUP_SUCESS:
      case LOGIN_SUCESS:
        localStorage.setItem("access", payload.token);
        console.log("login success");
        console.log("token:", payload.token);
        state.user = payload.user;
        return {
          ...state,
          isAuthenticated: true,
          access: payload.token,
          loading: false,
        };
      case LOGIN_FAILED:
      case SIGNUP_FAILED:
      case LOGOUT_USER:
      case AUTHENTICATION_FAILED:
        localStorage.removeItem("access");
        return {
          ...state,
          access: null,
          loading: false,
          isAuthenticated: false,
          user: null,
        };
      default:
        return state;
    }
  }