import React from "react";

// Importing Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

// Importing a few elements from react-bootstrap for design aesthetics
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";

const MoreDeets = ({ setForm, formData, navigation }) => {
    const { firstname, lastname, password, confirmation, college } = formData;
    const { previous, next } = navigation;
    const [colleges, setColleges] = useState({});
    // const [file, setFile] = useState(formData.resume);
    // console.log("state variable", file);

    // console.log("resume value", formData.resume);
    console.log("form Data:", formData);
    
//    useEffect(() => {
//         setForm({target: {name: "resume", value: file}})
//         console.log("form in use effect,", formData);
//     }, []); 

    // useEffect(() => {
    //     console.log("hi");
    //     fetch('http://universities.hipolabs.com/search?country=United%20States')
    //         .then(response => response.json())
    //         .then(colleges => setColleges(colleges));
    // }, []);

    // useEffect(() => {
    //     console.log("ho");
    //     const colleges = async () => {
    //         const url = 'http://universities.hipolabs.com/search?country=United%20States';
    //         try {
    //             let res = await fetch(url);
    //             setColleges(res.json());
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     colleges();
    // }, []);

    // useEffect(() => {
    //     const internships = async () => {
    //         const response = await axios.get("http://localhost:5000/internships");
    //         setInternships(response.data);
    //     }
    //     internships();
    // }, []);

    async function getColleges() {
        const response = await fetch('http://universities.hipolabs.com/search?country=United%20States')
                                .then(res => res.json())
                                .then(colleges => {
                                    setColleges(colleges);
                                    colleges.map(college => <option>{college.name}</option>);
                                })
                                .catch(error => console.error(error));
    };

    // async function renderColleges() {
    //     const college = await getColleges();
    //     console.log("colleges", colleges);
    //     colleges.map(college => <option>{college.name}</option>)
    // }

    // renderColleges()

    return (
        <div>
            <Form>
                <Form.Group>
                    First Name
                    <Form.Control
                    type="text"
                    name="firstname"
                    placeholder="Johnny"
                    value={firstname}
                    onChange={setForm}
                    required
                    />
                </Form.Group>
                <Form.Group>
                    Last Name
                    <Form.Control
                    type="text"
                    name="lastname"
                    placeholder="Appleseed"
                    value={lastname}
                    onChange={setForm}
                    required
                    />
                </Form.Group>
                <Form.Group>
                    Password
                    <Form.Control
                    type="password"
                    name="password"
                    placeholder="6+ characters"
                    value={password}
                    onChange={setForm}
                    required
                    />
                </Form.Group>
                <Form.Group>
                    Confirm Password
                    <Form.Control
                    type="password"
                    name="confirmation"
                    placeholder="6+ characters"
                    value={confirmation}
                    onChange={setForm}
                    required
                    />
                </Form.Group>
                <Form.Group>
                    College/University
                    <Form.Control 
                    as="select" 
                    name="college" 
                    value={college} 
                    onChange={setForm} 
                    required
                    >
                        <option>Other</option>
                        {getColleges()}
                        {colleges.map(college => <option>{college.name}</option>)}
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Button variant="primary" onClick={previous}>
                        Previous
                    </Button>
                    <Button variant="primary" onClick={next}>
                        Next
                    </Button>
                </Form.Group>
            </Form>
        </div>
    );
};


export default MoreDeets;