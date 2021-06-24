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

    // const { clusters } = formData;

    // useEffect(() => {
    //     axios
    //     .get("http://localhost:5000/clusters/")
    //     .then(response => setClusters(response.data))
    //     .catch(error => console.log(error));
    // }, [])

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

    async function handleSubmit() {
        if (clusters.filter(c => c.selected).length === 3) {
            signup(formData.email, formData.password);
            formData.clusters = clusters.filter(c => c.selected);
            console.log(formData);
            let formDataNew = new FormData();

            formDataNew.append("email", formData.email);
            formDataNew.append("cluster1", formData.clusters[0].title);
            formDataNew.append("cluster2", formData.clusters[1].title);
            formDataNew.append("cluster3", formData.clusters[2].title);
            formDataNew.append("firstname", formData.firstname);
            formDataNew.append("lastname", formData.lastname);
            formDataNew.append("linkedin", formData.linkedin);
            formDataNew.append("password", formData.password);
            formDataNew.append("confirmation", formData.confirmation);
            formDataNew.append("resume", resumeFile);
            for (var pair of formDataNew.entries()) {
                console.log(pair[0]+ ', ' + pair[1]); 
            }

            

            await axios
            .post("http://localhost:5000/signup", formDataNew, {headers: {
                'Content-Type': 'multipart/form-data'
              }})
            .then(res => console.log(res.data))
            try {
                console.log("trying to submit");
                await sendEmail(formData.email);
                console.log('email was successfully added to Mailchimp list');
            } catch (err) {
                console.log(err)
            }

            await login(formData.email, formData.password); 

            setRedirectToHome(true);

            // await axios
            // .post("http://localhost:5000/users/add", formData)
            // .then(res => console.log(res.data))
        }
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
                    <Button variant="primary" onClick={previous}>
                        Previous
                    </Button>
                    <Button variant="primary" onClick={() => handleSubmit()}>
                        Finish
                    </Button>
                </Form.Group>
            </Form>
        </div>
    );
};

export default connect(null, { signup })(ChooseClusters);
