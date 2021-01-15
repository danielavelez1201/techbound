import React, { useContext, useState, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import axios from "axios";
import './App.css';
import ClusterList from "./components/cluster-list.component";
import { createBrowserHistory } from "history";
import SignUp from "./components/sign-up.component";
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
          <Header2 />
          <div className="container">
            <Switch>
              {/* <Route path="/" exact component={Landing} /> */}
              <Route path="/sign-up" exact component={SignUp} />
              <Route path="/file-save" exact component={FileSave} />
              <Route path="/file" exact component={FileUpload} />
              <Route path="/browse" component={InternshipListings} />
              <Route path="/landing" exact component={LandingPage} />
              <Route path="/profile" exact component={Profile} />
              <Route path="/login" exact component = {Login} />
              <Route path="/basics" exact component = {Basics} />
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
