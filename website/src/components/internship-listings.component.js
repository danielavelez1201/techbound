import React, { useState } from "react";

// Importing Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "react-bootstrap";
import { FaMapMarkerAlt } from "react-icons/fa";
import Basics from "./basics.component";
import SignUp from "./sign-up.component";

import axios from "axios";


const InternshipListings = () => {
    const [cluster, setCluster] = useState("Language Learning");

    const tempInternships = Array(10).fill({position: "SWE @ Duolingo", location: "Atlanta, GA", description: "An American language-learning website and mobile app, as well as a digital language-proficiency assessment exam."})
    const [internships, setInternships] = useState(tempInternships);

    // useEffect(() => {
    //     axios
    //     .get("http://localhost:5000/clusters/:id")
    //     .then(response => setInternships(response.data))
    //     .catch(error => console.log(error));
    // }, [])

    const renderCard = (card, index) => {
        return (
            <div>
                <div key={index} className="card">
                    <div className="row no-gutters">
                        <div className="col-auto">
                            <img src="https://play-lh.googleusercontent.com/hSyebBlYwtE2aMjzSIHasUO9cQv9HgNAw9owy6ADO0szOKYO3rDk60r7jcyXu82Fbq1M" class="img-fluid" alt="Duolingo Logo" width="150" style={{ padding: 10 }} />
                        </div>
                        <div className="col">
                            <div className="card-block px-2">
                                <h3 className="card-title">{card.position}</h3>
                                <h5 className="card-subtitle"><FaMapMarkerAlt />{" "}{card.location}</h5>
                                <br />
                                <p className="card-text">{card.description}</p>
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
            <div className="container" style={{ columnCount: 2 }}>{internships.map(renderCard)}</div>
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