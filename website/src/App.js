import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";

import ClusterList from "./components/cluster-list.component";
import FileUpload from "./components/file-upload.component";
import Header from "./components/header.component";
import ClusterCards from "./components/cluster-cards.component";

function App() {
  return (
    <Router>
      <div className="container">
        <br />
        <Header />
        <br></br>
        <br></br>
        <br></br>
        <ClusterList />
        <Route path="/file" exact component={FileUpload} />
      </div>
    </Router>
  );
}

export default App;
