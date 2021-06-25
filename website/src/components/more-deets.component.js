import React from "react";

// Importing Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

// Importing a few elements from react-bootstrap for design aesthetics
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";

const MoreDeets = ({ setForm, formData, navigation, resume }) => {
    const { firstname, lastname, password, confirmation, github, linkedin } = formData;
    const { previous, next } = navigation;
    const [file, setFile] = useState(formData.resume);
    console.log("state variable", file);

    console.log("resume value", formData.resume);

    const setFormValues = (e) => {
        setForm({target: {name: e.target.name, value: e.nativeEvent.data}});
        setForm({target: {name: "resume", value: file}});
        console.log(formData);
    }
    
   useEffect(() => {
        setForm({target: {name: "resume", value: file}})
        console.log("form in use effect,", formData);
    }, []); 

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
                    GitHub Link (optional)
                    <Form.Control
                    type="text"
                    name="github"
                    placeholder="https://github.com/johnny"
                    value={github}
                    onChange={setForm}
                    />
                </Form.Group>
                <Form.Group>
                    LinkedIn Profile Link (optional)
                    <Form.Control
                    type="text"
                    name="linkedin"
                    placeholder="https://www.linkedin.com/in/johnnyappleseed/"
                    value={linkedin}
                    onChange={setForm}
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
            </Form>
        </div>
    );
};



export default MoreDeets;