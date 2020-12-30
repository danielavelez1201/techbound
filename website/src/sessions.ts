import React from 'react';
import * as Cookies from "js-cookie";

export const setSessionCookie = (session: any): void => {
  console.log("SETTING SESSION HERE")
  Cookies.remove("session");
  Cookies.set("session", session, { expires: 14 });
};

export const getSessionCookie: any = () => {
  const sessionCookie = Cookies.get("session");
  if (sessionCookie == "undefined" || sessionCookie == undefined) {
    return {};
  } else {
    return JSON.parse(sessionCookie);
  }
};

export const SessionContext = React.createContext(getSessionCookie());
