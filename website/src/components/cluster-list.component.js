import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";

function enlargen(e) {
  e.target.style.width = "110%";
}

function shrink(e) {
  e.target.style.width = "90%";
}

const renderCard = (card, index) => {
  const redirectLink = "/" + card.title;
  return (
    <Button onClick={() => history.push("/Products")}>
      <Card
        onMouseLeave={shrink}
        onMouseOver={enlargen}
        key={index}
        className="box"
      >
        <Card.Body>
          <Card.Title>{card.title}</Card.Title>
          <Card.Text>{card.text}</Card.Text>
        </Card.Body>
      </Card>
    </Button>
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
    return <div className="grid">{this.state.clusters.map(renderCard)}</div>;
  }

  render() {
    return (
      <div>
        <h3>Explore Internships Based on Mission Cluster</h3>
        {this.clusterList()}
      </div>
    );
  }
}
