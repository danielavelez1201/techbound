import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Cluster = props => (
  <tr>
    <td>{props.cluster.title}</td>
  </tr>
)

export default class ClusterList extends Component {
  constructor(props) {
    super(props);

    this.state = {clusters: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/clusters/')
      .then(response => {
        this.setState({ clusters: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteCluster(id) {
    axios.delete('http://localhost:5000/clusters/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      clusters: this.state.clusters.filter(el => el._id !== id)
    })
  }

  clusterList() {
    return this.state.clusters.map(currentcluster => {
      return <Cluster cluster={currentcluster} deleteCluster={this.deleteCluster} key={currentcluster._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Clusters</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            { this.clusterList() }
          </tbody>
        </table>
      </div>
    )
  }
}