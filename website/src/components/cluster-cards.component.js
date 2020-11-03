import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "../Box.css";
const cardInfo = [
  { title: "Hi", text: "boop" },
  { title: "Hello", text: "beep" },
  { title: "Dog", text: "bop" },
];

const renderCard = (card, index) => {
  return (
    <Card key={index} className="box">
      <Card.Body>
        <Card.Title>{card.title}</Card.Title>
        <Card.Text>{card.text}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default class ClusterCards extends Component {
  render() {
    return <div className="grid">{cardInfo.map(renderCard)}</div>;
  }
}
