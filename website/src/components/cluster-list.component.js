import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' })

const cardInfo = [
  {
    title: "Transportation",
    subtitle: "Revolutionize transportation",
    text: "",
    selected: false
  },
  { title: "Healthcare", subtitle: "Advance healthcare", text: "",
    selected: false },
  { title: "Education", subtitle: "Reimagine education", text: "",
    selected: false },
  {
    title: "Advertising",
    subtitle: "Empower businesses through advertising",
    text: "",
    selected: false
  },
  {
    title: "Real estate & property management",
    subtitle: "Reimagine real estate and property management",
    text: "",
    selected: false
  },
  {
    title: "Financial technology",
    subtitle: "Empower individuals and businesses financially",
    text: "",
    selected: false
  },
  { title: "Biotechnology", subtitle: "Advance biotech solutions", text: "",
    selected: false },
  {
    title: "Data and analytics",
    subtitle: "Empower individuals and businesses with data and analytics",
    text: "",
    selected: false
  },
  {
    title: "Supply chains & delivery",
    subtitle: "Reimagine supply chains and delivery",
    text: "",
    selected: false
  },
  {
    title: "Satellite data capture",
    subtitle: "Enable satellite data capture",
    text: "",
    selected: false
  },
  {
    title: "Technology",
    subtitle: "Develop more accessible and efficient technology",
    text: "",
    selected: false
  },
  { title: "Child care", subtitle: "Revolutionize child care", text: "",
    selected: false },
  {
    title: "Music & entertainment",
    subtitle: "Provide music and video entertainment",
    text: "",
    selected: false
  },
  {
    title: "Employment services",
    subtitle: "Enable employment services",
    text: "",
    selected: false
  },
  {
    title: "Leisure & recreation",
    subtitle: "Enable leisure and recreation",
    text: "",
    selected: false
  },
  {
    title: "Social & community platforms",
    subtitle: "Develop social and community platforms",
    text: "",
    selected: false
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

  const [internships, setInternships] = useState([{
    "last-updated": "",
    notes: "", 
    name: "", 
    link: "", 
    location: ""
  }])


  useEffect(() => {
    const internships = async () => {
      const response = await axios.get("http://localhost:5000/internships");
      setInternships(response.data);
    }
    internships();
  }, []);

  console.log(internships)


  const handleClick = async (clusterName) => {
    const response = await axios.get("http://localhost:5000/internships")
    history.push({
      pathname: "/browse/" + clusterName,
      state: { internships: internships },
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

 // useEffect(() => {
   // axios
     // .get("http://localhost:5000/clusters/")
      //.then((response) => {
       // setClusters(response.data);
      //})
      //.catch((error) => {
        //console.log(error);
      //});
  //});

  return (
    <div>
      <div className="grid">{cardInfo.map(renderCard)}</div>
    </div>
  );
}

export { cardInfo };
export default ClusterList;
