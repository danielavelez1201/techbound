import React from "react";

// Importing Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
import * as styles from "../button.scss";

// Importing a few elements from react-bootstrap for design aesthetics
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { useLocation } from "react-router-dom";
import { Typeahead } from 'react-bootstrap-typeahead'; // ES2015


const MoreDeets = ({ setForm, formData, navigation }) => {
    const { email, firstname, lastname, password, confirmation, college } = formData;
    const { previous, next } = navigation;
    const [colleges, setColleges] = useState([]);
    // const [file, setFile] = useState(formData.resume);
    // console.log("state variable", file);
    const location = useLocation();
    const colleges2 = location.state ? location.state.colleges : null;
    const emailVar = location.state ? location.state.email : null;
    const [loadedColleges, setLoadedColleges] = useState(colleges2);
    const [collegesLoaded, setCollegesLoaded] = useState(false);

    // useEffect(() => {
    //     async function getColleges() {
    //         await fetch('http://universities.hipolabs.com/search?country=United%20States')
    //             .then(res => res.json())
    //             .then(colleges => {
    //                 console.log(colleges); 
    //                 const collegeList = colleges.map(college => college.name)
    //                 console.log(collegeList)
    //                 setLoadedColleges(collegeList);    
    //                 setCollegesLoaded(true); 
    //                 return collegeList;      
    //             })
    //             .catch(error => console.error(error));
    //     };
    
    //     getColleges();
    // }, [collegesLoaded])

    // console.log(emailVar)
    
    
//    useEffect(() => {
//         setForm({target: {name: "resume", value: file}})
//         console.log("form in use effect,", formData);
//     }, []); 

    useEffect(() => {
        console.log("hi");
        fetch('http://universities.hipolabs.com/search?country=United%20States')
            .then(response => response.json())
            .then(colleges => {
                setColleges(colleges);
                console.log("colleges", colleges);})
    }, []);


    const renderColleges = (college, index) => {
        return (
            <option key={index}>{college.name}</option>
        );
    }

    return (
        <div style={{ "display": "flex", "align-items": "stretch", "flex-direction": "row", "flex-wrap": 'wrap' }}>
            <div>
                <div style={{ "padding": "50px" }}>
                    <Form>
                        <h1 className="black-text">Join Techbound now to get early access.</h1>
                        <br></br>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                name="email"
                                placeholder={emailVar === null ? 'Email' : email}
                                value={email}
                                onChange={setForm}
                                required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                name="firstname"
                                placeholder="First name"
                                value={firstname}
                                onChange={setForm}
                                required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                type="text"
                                name="lastname"
                                placeholder="Last name"
                                value={lastname}
                                onChange={setForm}
                                required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={password}
                                onChange={setForm}
                                required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                type="password"
                                name="confirmation"
                                placeholder="Confirm your password"
                                value={confirmation}
                                onChange={setForm}
                                required />
                        </Form.Group>
                        <Form.Group>
                            <Autocomplete
                                name="college"
                                value={college}
                                onChange={setForm}
                                required
                                options={colleges}
                                autoHighlight
                                getOptionLabel={(option) => option.name}
                                renderOption={(option) => (
                                    <React.Fragment>
                                        <span>{option.name}</span>
                                    </React.Fragment>
                                )}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Choose a college"
                                        variant="outlined"
                                        inputProps={{
                                            ...params.inputProps,
                                            autoComplete: 'new-password', // disable autocomplete and autofill
                                        }}
                                    />
                                )}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Button variant="primary" onClick={previous}>
                                Previous
                            </Button>
                            <Button variant="primary" onClick={next}>
                                Next
                            </Button>
                        </Form.Group>
                        {/* <Form.Control
                            as="select"
                            name="college"
                            value={college}
                            onChange={setForm}
                            required
                        >
                            <Typeahead
                                id="pagination-example"
                                onPaginate={(e) => console.log('Results paginated')}
                                value={college}
                                onChange={setForm}
                                options={loadedColleges}
                                paginate={true}
                                placeholder="Select your college" 
                            />
                        </Form.Control> */}
                    </Form>
                <br>
                </br>

                <div class="row middle-on-small center-on-small" style={{ "justify-content": "center" }}>
                    <div class="column small-12 medium-6 large-4">
                        <a onClick={next} class="c-button c-button--gooey">
                            Next
                            <div class="c-button__blobs">
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </a>
                    </div>
                </div>

                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={{ "display": "block", "height": "0", "width": "0" }}>
                    <defs>
                        <filter id="goo">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur"></feGaussianBlur>
                            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo"></feColorMatrix>
                            <feBlend in="SourceGraphic" in2="goo"></feBlend>
                        </filter>
                    </defs>
                </svg>
            </div>
        </div><div style={{ "background-color": "#3517EB", "flex": "1" }}>

            </div>
        </div>
    );
};


export default MoreDeets;