import React from "react";
import Typist from 'react-typist';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import ClusterList from "./cluster-list.component";

export default class Landing extends React.Component {
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

    render() {
        return (
            <div>
                <div>
                    Start growing your career in tech by looking in the areas you're most passionate about.
                </div>
                <br />
                <div>
                    Find a tech internship in
                    <Typist>
                        {this.state.clusters.map(cluster => {
                            <span>
                                cluster
                                <Typist.Backspace count={cluster.length} delay={1000} />
                                <Typist.Delay ms={750} />
                            </span>
                        })}
                    </Typist>
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
}