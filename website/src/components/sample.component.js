import React from "react";

const Sample = ({ isAuthenticated }) => {

  const loggedinNow = (
    <>
    <h3>You are logged in!</h3>
    </>
)

const notLoggedin = (
    <>
    <h3>You are not logged in :(</h3>
      <>{isAuthenticated ? loggedinNow : notLoggedin}</>
    </>
    
)

  return <div>Sample Private Route</div>;
};

export default Sample;