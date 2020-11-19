import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Sidebar from "react-sidebar";

function BrowsingList() {
  const [open, setOpen] = useState(false);

  const links = [];

  useEffect(() => {
    for (let ind = 0; ind < 10; ind++) {
      links.push(
        <a key={ind} href="#">
          Mock menu item {ind}
        </a>
      );
    }
  }, []);

  function clusterList() {
    return <p>Hello</p>;
  }
  return (
    <div>
      <h3>Explore Internships Based on Mission Cluster</h3>
      <Sidebar
        className="Sidebar"
        sidebar={links}
        styles={{ sidebar: { background: "white" } }}
        open={true}
        docked={true}
        defaultSidebarWidth={1}
      ></Sidebar>
    </div>
  );
}

export default BrowsingList;
