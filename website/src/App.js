import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";

import ClusterList from "./components/cluster-list.component";
import SignUp from "./components/sign-up.component";
import FileUpload from "./components/file-upload.component";
import Header from "./components/header.component";
import ClusterCards from "./components/cluster-cards.component";
import BrowsingList from "./components/browsing-list.component";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <div className="container">
          <Switch>
            <Route path="/" exact component={ClusterList} />
            <Route path="/sign-up" exact component={SignUp} />
            <Route path="/file" exact component={FileUpload} />
            <Route path="/browse" component={BrowsingList} />
          </Switch>
        </div>
      </div>
      {/*       
        <ClusterList />
       */}
    </Router>
  );
}

export default App;
