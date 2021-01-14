import React, { useState, useEffect } from "react";

// Importing Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "react-bootstrap";
import { FaMapMarkerAlt } from "react-icons/fa";
import Basics from "./basics.component";
import SignUp from "./sign-up.component";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";

const InternshipListings = () => {
    const [cluster, setCluster] = useState("Language Learning");
    const tempInternships = Array(10).fill({position: "SWE @ Duolingo", location: "Atlanta, GA", description: "An American language-learning website and mobile app, as well as a digital language-proficiency assessment exam."})
    const [internships, setInternships] = useState(null); 

    const location = useLocation();

    useEffect(() => {
        console.log(location.pathname);
        console.log(location.state.internships);
        setInternships(location.state.internships);
      });
    
    function getDomain(str) {
        const str1 = str.split('//').pop();
        return str1.split('/')[0];
    }

    const renderCard = (card, index) => {
        return (
            <div>
                <div key={index} className="card">
                    <div className="row no-gutters">
                        <div className="col-auto">
                            <img src={"https://logo.clearbit.com/" + getDomain(card.link)} class="img-fluid" alt="Logo" width="150" style={{ padding: 10 }} />
                        </div>
                        <div className="col">
                            <div className="card-block px-2">
                                <h3 className="card-title">{card.name}</h3>
                                <h5 className="card-subtitle"><FaMapMarkerAlt />{" "}{card.location}</h5>
                                <br />
                                <p className="card-text">{card.notes}</p>
                                <br />
                                <a href={card.link}> <Button variant="secondary">More info</Button></a>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
            </div>
        );
    };

    return (
        <div>
            <h2>{cluster} Internship Opportunities</h2>
            <br />
            <div className="container" style={{ columnCount: 2 }}>
                {internships && 
                internships.map(renderCard)}</div>
            <br />
            <div>
                <strong>Get more from Techbound</strong>
                <br />
                <Container>
                    <Row>
                        <Col>
                            <ol>
                                <li>
                                    <p>See more internship postings</p>
                                    <img src="https://via.placeholder.com/140x100" alt="" />
                                </li>
                                <br />
                                <li>
                                    <p>Get resume analyzed and tailored to your clusters</p>
                                    <img src="https://via.placeholder.com/140x100" alt="" />
                                </li>
                            </ol>
                        </Col>
                        <Col>
                            <Basics />
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default InternshipListings;