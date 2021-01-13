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

  function getDomain(str) {
    const str1 = str.split('//').pop();
    return str1.split('/')[0];
  }

  return (
    <div>
      <h3>Explore Internships Based on Mission Cluster</h3>
      <div>
        {internships &&
          internships.map((internship, index) => {

            const domain = getDomain(internship.link);

            return (
              <div className="internship">
                {internship.name}
                <a href = {internship.link} >Link</a>
                {internship.notes}
                

                <img src={"https://logo.clearbit.com/" + domain}></img>
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
