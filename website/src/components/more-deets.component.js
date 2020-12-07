import React from "react";

// Importing Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

// Importing a few elements from react-bootstrap for design aesthetics
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const MoreDeets = ({ setForm, formData, navigation }) => {
    const { firstname, lastname, password, confirmation, github, linkedin } = formData;
    const { previous, next } = navigation;

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