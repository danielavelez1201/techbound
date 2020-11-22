import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Sidebar from "react-sidebar";
import axios from "axios";
import parse from "html-react-parser";

function BrowsingList() {
  const [open, setOpen] = useState(false);
  const [internships, setInternships] = useState(null);
  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
    console.log(location.state.internships);
    setInternships(location.state.internships);
  });

  function clusterList() {
    return <p>Hello</p>;
  }
  return (
    <div>
      <h3>Explore Internships Based on Mission Cluster</h3>
      <div>
        {internships &&
          internships.map((internship, index) => {
            const title = internship.title;

            var htmlDescription = internship.description;
            var reactDescription = parse(htmlDescription);

            return (
              <div className="internship">
                <h4>{title}</h4>
                {reactDescription}
                <br></br>
              </div>
            );
          })}
      </div>
      <div></div>
    </div>
  );
}

export default BrowsingList;
