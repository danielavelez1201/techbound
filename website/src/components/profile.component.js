import React, { useState, useMemo, useEffect } from "react";
import { useLocation, useHistory } from 'react-router-dom';
import { useForm } from "react-hooks-helper";
import axios from "axios";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import pdf from "../sample.pdf";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from "react-bootstrap/esm/Card";
import { OverlayTrigger, Tooltip } from "react-bootstrap";


function Profile() {

    let history = useHistory();
    const [userInfo, setUserInfo] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmation: "",
        resume: "",
        linkedin: "",
        github: "",
        clusters: "",
    });

    const location = useLocation(); 

    useEffect(() => {
        async function getUserData() {
            const response = await axios.post('http://localhost:5000/users/getByEmail', {
                "email": location.state.userEmail
            })
            const userData = response.data
            const user = {
            firstname: userData.firstname,
            lastname: userData.lastname,
            email: userData.email,
            password: userData.password,
            confirmation: userData.confirmation,
            resume: userData.resume,
            linkedin: userData.linkedin,
            github: userData.github,
            clusters: userData.clusters,
            }
            setUserInfo(user);
        }
        getUserData()
    }, [])    


    const [editMode, setEditMode] = useState(false);
    
    const [formData, setForm] = useForm(userInfo);

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    const textRenderer = (textItem) => {
        if (textItem.str.includes("extensions")) {
            return (
                <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip>Hi this is an annotation!</Tooltip>}
                >
                    <span className="highlight">{textItem.str}</span>
                </OverlayTrigger>
            )
        }
    };

    function removeTextLayerOffset() {
        const textLayers = document.querySelectorAll(".react-pdf__Page__textContent");
            textLayers.forEach(layer => {
            const { style } = layer;
            style.top = "0";
            style.left = "0";
            style.transform = "";
        });
    }

    const updateProfile = () => {
        setUserInfo(formData);
        setEditMode(false);
    }

    switch(editMode){
        case true:
            return (
                <div className = "profile-dashboard">
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
                                            <Form.Control type="text" name="firstname" value={userInfo.firstname} onChange={setForm} placeholder={"test"} /><br />
                                        </Col>
                                        <Col>
                                            <h6>Last Name</h6>
                                            <Form.Control type="text" name="lastname" value={userInfo.lastname} onChange={setForm} /><br />
                                        </Col>
                                    </Row>
                                    <h6>Email</h6>
                                    <Form.Control type="text" name="email" value={userInfo.email} onChange={setForm} /><br />
                                    <Row>
                                        <Col>
                                            <h6>Password</h6>
                                            <Form.Control type="password" name="password" value={userInfo.password} onChange={setForm} /><br />
                                        </Col>
                                        <Col>
                                            <h6>Confirm Password</h6>
                                            <Form.Control type="password" name="confirmation" value={userInfo.confirmation} onChange={setForm} /><br />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col>
                                    <h6>Resume</h6>
                                    <Form.Control type="file" name="resume"  onChange={setForm} /><br />
                                    <h6>LinkedIn</h6>
                                    <Form.Control type="text" name="linkedin" value={userInfo.linkedin} onChange={setForm} /><br />
                                    <h6>GitHub</h6>
                                    <Form.Control type="text" name="github" value={userInfo.github} onChange={setForm} /><br />
                                </Col>
                            </Row>
                            <h6>Clusters</h6>

                        </Container>
                    </Form>
                </div>
            );
        default:
            return (
                <div className = "profile-dashboard">
                    <div>
                        <h3>Profile{" "}
                            <Button variant="primary" style={{display: "inline-block"}} onClick={() => setEditMode(true)}>Edit</Button>
                            <Button variant="primary" style={{display: "inline-block"}} onClick={() => history.push('/landing')}>Home</Button>
                        </h3>
                    </div>
                    <Container>
                        <Row>
                            <Col>
                                <Row>
                                    <Col>
                                        {userInfo.firstname + ' '}
                                        {userInfo.lastname}<br /><br />
                                        
                                        <br /><br />
                                <h6>Email</h6>
                                {userInfo.email}
                                <h6>Password</h6>
                                {userInfo.password && '*'.repeat(userInfo.password.length)}<br /><br />
                                </Col>
                                </Row>
                            </Col>
                            <Col>
                                <h6>Resume</h6>
                                {userInfo.resume}<br /><br />
                                <h6>LinkedIn</h6>
                                <a href={userInfo.linkedin}>{userInfo.linkedin}</a><br /><br />
                                <h6>GitHub</h6>
                                <a href={userInfo.github}>{userInfo.github}</a><br /><br />
                            </Col>
                            <Col>
                                <h6>Clusters</h6>
                                {userInfo.clusters && userInfo.clusters.map(c => <div><Card body>{c}</Card><br /></div>)}
                            
                            </Col>
                        </Row>
                    </Container>
                    
                </div>
            );
    };

    
};


export default Profile;