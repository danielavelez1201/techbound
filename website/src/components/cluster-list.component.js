import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const cardInfo = [
  {
    title: "Transportation",
    subtitle: "Revolutionize transportation",
    text: "",
  },
  { title: "Healthcare", subtitle: "Advance healthcare", text: "" },
  { title: "Education", subtitle: "Reimagine education", text: "" },
  {
    title: "Advertising",
    subtitle: "Empower businesses through advertising",
    text: "",
  },
  {
    title: "Real estate & property management",
    subtitle: "Reimagine real estate and property management",
    text: "",
  },
  {
    title: "Financial technology",
    subtitle: "Empower individuals and businesses financially",
    text: "",
  },
  { title: "Biotechnology", subtitle: "Advance biotech solutions", text: "" },
  {
    title: "Data and analytics",
    subtitle: "Empower individuals and businesses with data and analytics",
    text: "",
  },
  {
    title: "Supply chains & delivery",
    subtitle: "Reimagine supply chains and delivery",
    text: "",
  },
  {
    title: "Satellite data capture",
    subtitle: "Enable satellite data capture",
    text: "",
  },
  {
    title: "Technology",
    subtitle: "Develop more accessible and efficient technology",
    text: "",
  },
  { title: "Child care", subtitle: "Revolutionize child care", text: "" },
  {
    title: "Music & entertainment",
    subtitle: "Provide music and video entertainment",
    text: "",
  },
  {
    title: "Employment services",
    subtitle: "Enable employment services",
    text: "",
  },
  {
    title: "Leisure & recreation",
    subtitle: "Enable leisure and recreation",
    text: "",
  },
  {
    title: "Social & community platforms",
    subtitle: "Develop social and community platforms",
    text: "",
  },
];

function enlargen(e) {
  e.target.style.width = "110%";
}

function shrink(e) {
  e.target.style.width = "90%";
}
function ClusterList() {
  const [clusters, setClusters] = useState([]);
  let history = useHistory();

  const handleClick = async (clusterName) => {
    console.log("function");

    const apiURL =
      "https://jobs.github.com/positions.json?description=" + clusterName;
    const response = await axios.get(apiURL);
    history.push({
      pathname: "/browse/" + clusterName,
      state: { internships: response.data },
    });
  };

  const renderCard = (card, index) => {
    return (
      <Card
        onMouseLeave={shrink}
        onMouseOver={enlargen}
        key={index}
        className="box transition"
        onClick={() => handleClick(card.title)}
      >
        <Card.Body>
          <Card.Title>{card.title}</Card.Title>
          <Card.Text>{card.subtitle}</Card.Text>
        </Card.Body>
      </Card>
    );
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/clusters/")
      .then((response) => {
        setClusters(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return (
    <div>
      <h3>Explore Internships Based on Mission Cluster</h3>
      <div className="grid">{cardInfo.map(renderCard)}</div>
    </div>
  );
}

export { cardInfo };
export default ClusterList;
