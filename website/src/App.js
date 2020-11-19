import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import './App.css';

import ClusterList from "./components/cluster-list.component";
import Basics from "./components/basics.component";
import MoreDeets from "./components/more-deets.component";
import ChooseClusters from "./components/choose-clusters.component";
import SignUp from "./components/sign-up.component";
import ClusterCards from "./components/cluster-cards.component";
import ClusterPage from "./cluster-page.component";

function App() {
  return (
    <Router>
      <div className="container">
        <br />
        <Route path="/sign-up" exact component={SignUp} />
        {/* <Route path="/basics" exact component={Basics} />
        <Route path="/more-deets" exact component={MoreDeets} />
        <Route path="/choose-clusters" exact component={ChooseClusters} /> */}
        <ClusterPage />
      </div>
    </Router>
  );
}

export default App;
