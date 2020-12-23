import React, { useState } from "react";
import { setSessionCookie } from "../sessions";

const Login = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async e => {
    console.log("submitting");
    e.preventDefault();
    setLoading(true);
    // NOTE request to api login here instead of this fake promise
    //await new Promise(r => setTimeout(r(), 1000));
    setSessionCookie(e.target.value);
    setLoading(false);
  };

  const actionSetEmail = (event) => {
      setEmail(event.target.value);
  }

  if (loading) {
    return <h4>Logging in...</h4>;
  }

  return (
    <div style={{ marginTop: "1rem" }}>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter email address"
        />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;