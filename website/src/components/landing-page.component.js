import React, { useState, useEffect } from "react";
import { init } from "ityped"
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import ClusterList, { cardInfo } from "./cluster-list.component";
import { Col, Jumbotron, Row } from "react-bootstrap";
import Basics from "./basics.component";

function Landing(props) {
    const clusterTitles = cardInfo.map(cluster => cluster.title.toLowerCase())
   
    useEffect(() => {
        const myElement = document.querySelector('#myElement')
        init(myElement, { showCursor: false, strings: clusterTitles, loop: true })
    }, [])
    
    // const [clusters, setClusters] = useState([])

    // useEffect(() => {
    //     axios
    //     .get("http://localhost:5000/clusters/")
    //     .then(response => setClusters(response.data))
    //     .catch(error => console.log(error));
    // }, [])

    return (
        <div>
            <div>
                Start growing your career in tech by looking in the areas you're most passionate about.
            </div>
            <br />
            <div>
                Find a tech internship in {" "}
                <span id="myElement"></span>
            </div>
            <br />
            <div>
                Explore Internships Based on Mission Cluster
            </div>
            <ClusterList />
            <br />
            <Jumbotron fluid>
                TechBound can help you customize your resume to company mission.
                <br />
                <div>
                    <Row>
                        <Col><img src="https://via.placeholder.com/120x150" alt="" /></Col>
                        <Col><img src="https://via.placeholder.com/120x150" alt="" /></Col>
                        <Col><img src="https://via.placeholder.com/120x150" alt="" /></Col>
                    </Row>
                </div>
            </Jumbotron>
            <br />
            <div>
                Let us look at your resume and help you tailor it to your dream clusters.
                <br />
                <Basics />
            </div>
        </div>
    )
}

export default Landing;