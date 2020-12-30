import React from "react";
import Cookies from "js-cookie";
import { useEffect } from "react";

const Logout = () => {
    Cookies.remove("session");
    return <div>Logging out!</div>;
  };

export default Logout;