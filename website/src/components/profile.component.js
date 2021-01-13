import React, { useState, useEffect } from "react";
import { useForm } from "react-hooks-helper";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from "react-bootstrap/esm/Card";

const Profile = props => {
    const sampleUser = {
        firstname: "Johnny",
        lastname: "Appleseed",
        email: "johnny@college.edu",
        password: "johnny",
        confirmation: "johnny",
        resume: "filename.png",
        linkedin: "www.linkedin.com/in/johnnyappleseed",
        github: "www.github.com/johnny",
        clusters: [
            {
                title: "Employment services",
                subtitle: "Enable employment services",
                text: "",
                selected: false
            },
            {
                title: "Leisure & recreation",
                subtitle: "Enable leisure and recreation",
                text: "",
                selected: false
            },
            {
                title: "Social & community platforms",
                subtitle: "Develop social and community platforms",
                text: "",
                selected: false
            }
        ],
    };

    const [user, setUser] = useState(sampleUser);
    const [editMode, setEditMode] = useState(false);
    const [formData, setForm] = useForm(user);

    // useEffect(() => {
    //     axios
    //     .get("http://localhost:5000/users/:id")
    //     .then(response => setUser(response.data))
    //     .catch(error => console.log(error));
    // }, [])

    const updateProfile = () => {
        setUser(formData);
        setEditMode(false);
    }

    switch(editMode){
        case true:
            return (
                <div>
                    <div>
                        <h3>Profile{" "}
                            <Button variant="primary" style={{display: "inline-block"}} onClick={updateProfile}>Update</Button>
                        </h3>
                    </div>
                    <Form>
                        <Container>
                            <Row>
                                <Col>
                                    <Row>
                                        <Col>
                                            <h6>First Name</h6>
                                            <Form.Control type="text" name="firstname" value={formData.firstname} onChange={setForm} /><br />
                                        </Col>
                                        <Col>
                                            <h6>Last Name</h6>
                                            <Form.Control type="text" name="lastname" value={formData.lastname} onChange={setForm} /><br />
                                        </Col>
                                    </Row>
                                    <h6>Email</h6>
                                    <Form.Control type="text" name="email" value={formData.email} onChange={setForm} /><br />
                                    <Row>
                                        <Col>
                                            <h6>Password</h6>
                                            <Form.Control type="password" name="password" value={formData.password} onChange={setForm} /><br />
                                        </Col>
                                        <Col>
                                            <h6>Confirm Password</h6>
                                            <Form.Control type="password" name="confirmation" value={formData.confirmation} onChange={setForm} /><br />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col>
                                    <h6>Resume</h6>
                                    <Form.Control type="text" name="resume" value={formData.resume} onChange={setForm} /><br />
                                    <h6>LinkedIn</h6>
                                    <Form.Control type="text" name="linkedin" value={formData.linkedin} onChange={setForm} /><br />
                                    <h6>GitHub</h6>
                                    <Form.Control type="text" name="github" value={formData.github} onChange={setForm} /><br />
                                </Col>
                            </Row>
                            <h6>Clusters</h6>

                        </Container>
                    </Form>
                </div>
            );
        default:
            return (
                <div>
                    <div>
                        <h3>Profile{" "}
                            <Button variant="primary" style={{display: "inline-block"}} onClick={() => setEditMode(true)}>Edit</Button>
                        </h3>
                    </div>
                    <Container>
                        <Row>
                            <Col>
                                <Row>
                                    <Col>
                                        <h6>First Name</h6>
                                        {user.firstname}<br /><br />
                                    </Col>
                                    <Col>
                                        <h6>Last Name</h6>
                                        {user.lastname}<br /><br />
                                    </Col>
                                </Row>
                                <h6>Email</h6>
                                {user.email}<br /><br />
                                <h6>Password</h6>
                                {'*'.repeat(user.password.length)}<br /><br />
                            </Col>
                            <Col>
                                <h6>Resume</h6>
                                {user.resume}<br /><br />
                                <h6>LinkedIn</h6>
                                <a href={user.linkedin}>{user.linkedin}</a><br /><br />
                                <h6>GitHub</h6>
                                <a href={user.github}>{user.github}</a><br /><br />
                            </Col>
                            <Col>
                                <h6>Clusters</h6>
                                {user.clusters.map(c => <div><Card body>{c.title}</Card><br /></div>)}
                            </Col>
                        </Row>
                    </Container>
                </div>
            );
    };

    
};

export default Profile;