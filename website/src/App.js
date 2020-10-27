import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import ClusterList from "./components/cluster-list.component";

function App() {
  return (
    <Router>
      <div className="container">
      <br/>
      <Route path="/" exact component={ClusterList} />
      </div>
    </Router>
  );
}

export default App;