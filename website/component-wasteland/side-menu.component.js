import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { IoLanguage } from "react-icons/io5";

function Menu() {
  const tempClusters = Array(20).fill({icon: <IoLanguage />, title: "Language Learning"})
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    
    const main = document.getElementById("main-internships");
    if (isOpen) {
      main.style.marginLeft = "0";
    } else {
      main.style.marginLeft = "17%";
    };
  };

  return (
    <React.Fragment>
      <button 
        className={isOpen ? "sidenav-button sidenav-open-button" : "sidenav-button"} 
        onClick={handleToggle}
      >
        {isOpen ? "Hide" : "View"} All Clusters
      </button>
      <div id="side-nav" className="sidenav-container" style={ isOpen ? {} : { display: "none" } }>
        {tempClusters.map(cluster =>
          <div><Link to="/" className="sidenav-links">{cluster.icon} {cluster.title}</Link></div>
        )}
      </div>
    </React.Fragment>
  );
}

export default Menu;


