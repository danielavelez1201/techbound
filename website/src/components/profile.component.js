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

    useEffect(async () => {
        const result = await axios.post('http://localhost:5000/users/getByEmail', {
                "email": location.state.userEmail
            }
        )
        const userData = result.data
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
        };
        setUserInfo(user);
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
                <div>
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
                                        <h6>First Name</h6>
                                        {userInfo.firstname}<br /><br />
                                    </Col>
                                    <Col>
                                        <h6>Last Name</h6>
                                        {userInfo.lastname}<br /><br />
                                    </Col>
                                </Row>
                                <h6>Email</h6>
                                {userInfo.email}<br /><br />
                                <h6>Password</h6>
                                {userInfo.password && '*'.repeat(userInfo.password.length)}<br /><br />
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
                    <Container>
                        <div><b>Resume Analysis Results</b></div>
                        <Row>
                            <Col>
                                <Document
                                    file={pdf}
                                    onLoadSuccess={onDocumentLoadSuccess}
                                >
                                    <Page onLoadSuccess={removeTextLayerOffset} pageNumber={pageNumber} customTextRenderer={textRenderer} />
                                </Document>
                            </Col>
                            <Col>
                                <div><b>Here's what we saw:</b></div>
                                <br />
                                <div>
                                    <img height="50px" width="50px" src="data:image/png;base64,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" />
                                    {" "} You have more experience with big data than the average applicant
                                </div>
                                <br />
                                <div>
                                    <img height="50px" width="50px" src="data:image/png;base64,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" />
                                    {" "} Your coursework combines mathematical thinking with the social sciences
                                </div>
                                <br />
                                <div>
                                    <img height="50px" width="50px" src="data:image/png;base64,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" />
                                    {" "} Your previous work tends to be done in collaboration with multidisciplinary teams
                                </div>
                                <br />
                                <div>
                                    <img height="50px" width="50px" src="data:image/png;base64,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" />
                                    {" "} Your extracurricular involvement makes you an excellent candidate for the aerospace industry
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            );
    };

    
};


export default Profile;