import React, { useState, useEffect } from "react";
import { init } from "ityped"
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import ClusterList, { cardInfo } from "./cluster-list.component";
import { Col, Jumbotron, Row } from "react-bootstrap";
import Basics from "./basics.component";
import { connect } from 'react-redux';

function Landing({isAuthenticated}) {
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

    const loggedinNow = (
        <>
        <h3>You are logged in!</h3>
        </>
    )

    const notLoggedin = (
        <>
        <h3>You are not logged in :(</h3>
        </>
    )

    return (       
    <>
        <div className= 'blue-block landing-block black-text'>
                <div className= 'content'>
                    <h1 className="black-text landing-text">Find a tech internship <br></br>
                    in <b>{" "}
                     <span id="myElement"></span></b>|</h1>
                    <p className="black-text landing-text">Start growing your career in tech by looking in the <br></br>
                    areas you’re most passionate about.</p>
                </div>
        </div>

        <div className= 'white-block black-text'>
            <div className= 'content'>
                <h2>Explore Internships By Mission Cluster</h2>
                <ClusterList />
            </div>
        </div>

        <div className='blue-block'>
            <div className= 'content'>
                <h2 className= 'center-text'>TechBound can help you customize your resume to company mission.</h2>
                <div className= 'image-rows'>
                    <img className= 'three-step' alt='1. Choose the missions that resonate with you most' src='../../images/step1.png' />
                    <img className= 'three-step' alt='2. Share your resume and other work experiences' src='../../images/step2.png' />
                    <img className= 'three-step' alt='3. Learn what to highlight for every mission cluster' src='../../images/step3.png' />
                </div>
            </div>
        </div>

        <div className='white-block'>
            <div className= 'content'>
                <h2>Let us look at your resume and help you tailor it to your dream clusters.</h2>
            </div>
        </div>
            
        <div>
            <div>
                Start growing your career in tech by looking in the areas you're most passionate about.
            </div>
            <>{isAuthenticated ? loggedinNow : notLoggedin}</>
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
    </>
    )
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    };
};

export default connect(mapStateToProps)(Landing);
