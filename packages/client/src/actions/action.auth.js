
import axios from "axios";
import {
  LOGIN_SUCESS,
  LOGIN_FAILED,
  AUTHENTICATION_SUCESS,
  AUTHENTICATION_FAILED,
  SIGNUP_FAILED,
  SIGNUP_SUCESS,
  LOGOUT_USER,
} from "./action.types";

import setAuthToken from "../utils/setAuthToken";

//Action checks for authentication
export const check_authenticated = () => async (dispatch) => {
  if (localStorage.access) {
    setAuthToken(localStorage.access);
  }
  console.log("in action to check for authentication");

  try {
    const res = await axios.get("/users/authenticate");
    console.log("authentication worked!")
    dispatch({
      type: AUTHENTICATION_SUCESS,
      payload: res.data,
    });
    
  } catch (e) {
    dispatch({
      type: AUTHENTICATION_FAILED,
    });
  }
};


export function login(email, password) {
  return dispatch => {
    console.log("in login dispatch");
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({email, password });
    console.log(body);
    axios.post("/users/signin", body, config)
    .then(
      res => {
        console.log(res.data);
        const dispatchResult = dispatch({
          type: LOGIN_SUCESS,
          payload: res.data,
        });
        console.log(dispatchResult)
        dispatch(check_authenticated());
        console.log("user logged in!");
      },
      error => {
        dispatch({
          type: LOGIN_FAILED,
        })
      }
    )
  }
}

export const login2 = (email, password) => async (dispatch) => {
  console.log("IN LOGIN ACTION");
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({email, password });
  console.log(body);
  try {
    const res = await axios.post("/users/signin", body, config);
    console.log(res.data);
    dispatch({
      type: LOGIN_SUCESS,
      payload: res.data,
    });
    dispatch(check_authenticated());
    console.log("user logged In!");
  } catch (err) {
    dispatch({
      type: LOGIN_FAILED,
    });
  }
};

export const signup = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({email, password });

  try {
    // This route does not exist.
    const res = await axios.post("/users/add", body, config);
    dispatch({
      type: SIGNUP_SUCESS,
      payload: res.data,
    });
    dispatch(check_authenticated());
    console.log("user created!");
  } catch (err) {
    dispatch({
      type: SIGNUP_FAILED,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT_USER,
  });
};
