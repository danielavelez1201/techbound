import React, { Component } from "react";
import Header from "./components/header.component";
import ClusterList from "./components/cluster-list.component";

export default class ClusterPage extends Component {
    render() {
        return(
            <div>
                <Header />
                <div>
                    <h1>Find a tech internship.</h1>
                    <h3>This is a subtitle that I will be shocked that it works.</h3>
                </div>
                <ClusterList />
            </div>
        )
    }

}