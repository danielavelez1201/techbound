import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const cardInfo = [
<<<<<<< HEAD
  { title: "Hi", text: "boop" },
  { title: "Hello", text: "beep" },
  { title: "Dog", text: "bop" },
];

const renderCard = (card, index) => {
  const redirectLink = "/" + card.title;
  return (
    <Card
      key={index}
      className="box"
    >
      <Card.Body>
        <Card.Title>{card.title}</Card.Title>
        <Card.Text>{card.text}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default class ClusterList extends Component {
  constructor(props) {
    super(props);
=======
  { title: "Revolutionize transportation", text: "" },
  { title: "Advance healthcare", text: "" },
  { title: "Reimagine education", text: "" },
  { title: "Empower businesses through advertising", text: "" },
  { title: "Reimagine real estate and property management", text: "" },
  { title: "Empower individuals and businesses financially", text: "" },
  { title: "Advance biotech solutions", text: "" },
  {
    title: "Empower individuals and businesses with data and analytics",
    text: "",
  },
  { title: "Reimagine supply chains and delivery", text: "" },
  { title: "Enable satellite data capture", text: "" },
  { title: "Develop more accessible and efficient technology", text: "" },
  { title: "Revolutionize child care", text: "" },
  { title: "Provide music and video entertainment", text: "" },
  { title: "Enable employment services", text: "" },
  { title: "Enable leisure and recreation", text: "" },
  { title: "Develop social and community platforms", text: "" },
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
>>>>>>> 4200cb916a9676d3744b34d6ea8f6d5ae5ae6aaf

  function handleClick(clusterName) {
    console.log("function");
    history.push("/" + clusterName);
  }

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
          <Card.Text>{card.text}</Card.Text>
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

<<<<<<< HEAD
  clusterList() {
    return <div className="grid">{cardInfo.map(renderCard)}</div>;
  }

  render() {
    return (
      <div>
        {this.clusterList()}
      </div>
    );
  }
=======
  return (
    <div>
      <h3>Explore Internships Based on Mission Cluster</h3>
      <div className="grid">{cardInfo.map(renderCard)}</div>
    </div>
  );
>>>>>>> 4200cb916a9676d3744b34d6ea8f6d5ae5ae6aaf
}

export default ClusterList;
