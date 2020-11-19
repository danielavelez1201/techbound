import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import './App.css';

import ClusterList from "./components/cluster-list.component";
import SignUp from "./components/sign-up.component";
<<<<<<< HEAD
import ClusterCards from "./components/cluster-cards.component";
import ClusterPage from "./cluster-page.component";
=======
import FileUpload from "./components/file-upload.component";
import Header from "./components/header.component";
import ClusterCards from "./components/cluster-cards.component";
import BrowsingList from "./components/browsing-list.component";
>>>>>>> 4200cb916a9676d3744b34d6ea8f6d5ae5ae6aaf

function App() {
  return (
    <Router>
<<<<<<< HEAD
      <div className="container">
        <br />
        <Route path="/sign-up" exact component={SignUp} />
        {/* <Route path="/basics" exact component={Basics} />
        <Route path="/more-deets" exact component={MoreDeets} />
        <Route path="/choose-clusters" exact component={ChooseClusters} /> */}
        <ClusterPage />
=======
      <div>
        <Header />
        <div className="container">
          <Switch>
            <Route path="/" exact component={ClusterList} />
            <Route path="/sign-up" exact component={SignUp} />
            <Route path="/file" exact component={FileUpload} />
          </Switch>
        </div>
>>>>>>> 4200cb916a9676d3744b34d6ea8f6d5ae5ae6aaf
      </div>
      {/*       
        <ClusterList />
       */}
    </Router>
  );
}

export default App;
