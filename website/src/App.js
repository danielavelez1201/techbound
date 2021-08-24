import React, { useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import './App.css';
import SignUpNext from "./components/sign-up-next.component";
import SignUpFirst from "./components/sign-up-first.component";
import LandingPage from "./components/landing-page.component";
import Profile from "./components/profile.component";
import Login from "./components/login.component";
import store from "./store";
import { Provider } from "react-redux";
import { check_authenticated } from "./actions/action.auth";
import setAuthToken from "./utils/setAuthToken";
import ForgotPassword from "./components/forgot-password.component";
import PrivateRoute from "./routing/PrivateRoutes";
import RecruiterPage from "./components/recruiter-page.component";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {

  useEffect(() => {
    store.dispatch(check_authenticated());
    }, []);
    return (
    <Provider store={store}>
      <Router>
        <div>
          <div className="container">
            <Switch>
              <Route path="/signup" exact component={SignUpNext} />
              <Route path="/" exact component={LandingPage} />
              <Route path="/profile" exact component={Profile} />
              <Route path="/login" exact component = {Login} />
              <Route path="/sign-up" exact component = {SignUpFirst} />
              <Route path="/forgot-password" exact component = {ForgotPassword} />
              <Route path="/recruiters" exact component= {RecruiterPage} />
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
