import React, { useState, useEffect } from "react";
import { init } from "ityped"
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import ClusterList, { cardInfo } from "./cluster-list.component";

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
            <div>
                TechBound can help you customize your resume to company mission.
            </div>
        </div>
    )
}

export default Landing;