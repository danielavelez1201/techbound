import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { login } from '../actions/action.auth';

// Importing Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

// Importing a few elements from react-bootstrap for design aesthetics
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";

import { cardInfo } from "./cluster-list.component";
import axios from "axios";
import { signup } from "../actions/action.auth";
import { connect } from 'react-redux';
import { sendEmail } from "../api/public"

const ChooseClusters = ({ setForm, formData, navigation, resume }) => {
    const [clusters, setClusters] = useState(cardInfo);
    const { previous } = navigation;
    console.log('in choose clusters', formData);
    const [resumeFile, _] = useState(resume);
    let history = useHistory();
    
    console.log('in choose clusters resume', resume);

    const [redirectToHome, setRedirectToHome] = useState(false);

    if (redirectToHome) {
        history.push("/landing");
    }

    const toggleSelect = cluster => {
        setClusters(
            clusters.map(c => {
                if (cluster === c) {
                    if (c.selected === false && clusters.filter(c => c.selected).length === 3) {
                        console.log("cannot select more than 3 clusters")
                    } else {
                        c.selected = !c.selected;
                    }
                }
                return c;
            }),
        );
    };

    const renderCard = (card, index) => {
        return (
            <Card key={index} className="box transition" onClick={() => toggleSelect(card)} style={card.selected ? { borderColor: "green", width: '18rem', breakInside: "avoid" } : { width: '18rem', breakInside: "avoid" }}>
                <Card.Body>
                    <Card.Title>{card.title}</Card.Title>
                    <Card.Text>{card.subtitle}</Card.Text>
                </Card.Body>
            </Card>
        );
    };

    async function handleSubmit(skip) {
        let body = {
            ...formData
        };
        if (clusters.filter(c => c.selected).length === 3 && !skip) {
            let selectedClusters = clusters.filter(c => c.selected);
            body['cluster1'] = selectedClusters[0].title;
            body['cluster2'] = selectedClusters[1].title;
            body['cluster3'] = selectedClusters[2].title;
        } else {
           body.clusters = [];
        }

        await axios
            .post("/signup", body)
            .then(res => console.log(res.data))
            .then(() => sendEmail(formData.email))
            .then(() => login(formData.email, formData.password)) //not working
            .finally(() => setRedirectToHome(true));       
            // signup(formData.email, formData.password)};
    }


    return (
        <div>
            <Form>
                <Form.Group>
                    Choose 3 mission clusters that you're interested in
                    We can help you find what you should highlight when you apply to clusters.
                    <Alert variant="success">You have selected {clusters.filter(c => c.selected).length} out of  your 3 clusters.</Alert>
                    <div className="container" style={{ columnCount: 3 }}>{cardInfo.map(renderCard)}</div>
                </Form.Group>
                <Form.Group>
                    <Alert.Link onClick={() => handleSubmit(true)}>Not sure yet? Choose clusters later.</Alert.Link>
                </Form.Group>
                <Form.Group>
                    <Button variant="primary" onClick={previous}>
                        Previous
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmit(false)}>
                        Finish
                    </Button>
                </Form.Group>
            </Form>
        </div>
    );
};

export default connect(null, { signup })(ChooseClusters);
