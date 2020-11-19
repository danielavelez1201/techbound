import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const cardInfo = [
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

    this.state = { clusters: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/clusters/")
      .then((response) => {
        this.setState({ clusters: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
}
