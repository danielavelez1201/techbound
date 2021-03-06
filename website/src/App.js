import React, { useContext, useState, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import axios from "axios";
import './App.css';
import ClusterList from "./components/cluster-list.component";
import { createBrowserHistory } from "history";
import SignUpNext from "./components/sign-up-next.component";
import SignUpFirst from "./components/sign-up-first.component";
import FileUpload from "./components/file-upload.component";
import ClusterCards from "./components/cluster-cards.component";
import InternshipPage from "./components/internship-listing-page.component";
import LandingPage from "./components/landing-page.component";
import Header2 from "./components/test-header.component"
import BrowsingList from "./components/browsing-list.component";
import Landing from "./components/landing-page.component";
import FileSave from "./components/file-save-2.component";
import Profile from "./components/profile.component";
import Login from "./components/login.component";
import InternshipListings from "./components/internship-listings.component";
import { SessionContext, getSessionCookie, setSessionCookie } from "./sessions";
import * as Cookies from "js-cookie";
import { Button } from "react-bootstrap";
import Basics from "./components/basics.component";
import store from "./store";
import { Provider } from "react-redux";
import { check_authenticated } from "./actions/action.auth";
import setAuthToken from "./utils/setAuthToken";
import ForgotPassword from "./components/forgot-password.component";
import Sample from "./components/sample.component";
import PrivateRoute from "./routing/PrivateRoutes";
import Resume from "./components/resume-analysis.component";
import HighlightTest from "./components/highlight-test.component.js";

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
              {/* <Route path="/" exact component={Landing} /> */}
              <Route path="/sign-up/more" exact component={SignUpNext} />
              <Route path="/file-save" exact component={FileSave} />
              <Route path="/file" exact component={FileUpload} />
              <Route path="/browse" component={InternshipListings} />
              <Route path="/landing" exact component={LandingPage} />
              <Route path="/profile" exact component={Profile} />
              <Route path="/login" exact component = {Login} />
              <Route path="/resume" exact component = {Resume} />
              <PrivateRoute exact path = '/sample' component= {Sample} />
              <Route path="/sign-up" exact component = {SignUpFirst} />
              <Route path="/forgot-password" exact component = {ForgotPassword} />
              <Route path="/highlight-test" exact component = {HighlightTest} />
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
