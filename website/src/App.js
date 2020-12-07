import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import SignUp from "./components/sign-up.component";
import FileUpload from "./components/file-upload.component";
import Header from "./components/header.component";
import ClusterCards from "./components/cluster-cards.component";
import BrowsingList from "./components/browsing-list.component";
import Landing from "./components/landing-page.component";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <div className="container">
          <Switch>
            <Route path="/" exact component={Landing} />
            <Route path="/sign-up" exact component={SignUp} />
            <Route path="/file" exact component={FileUpload} />
            <Route path="/browse" component={BrowsingList} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
