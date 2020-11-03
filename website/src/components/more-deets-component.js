import React from "react";

// Importing Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

// Importing a few elements from react-bootstrap for design aesthetics
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import ChooseClusters from "./choose-clusters-component";

export default class MoreDeets extends React.Component {
    render() {
        const { currentStep, handleChange, firstname, lastname, password, confirmation, linkedin, github, onNext} = this.props;
        if (currentStep !== 2) {
            return null
        }
        return (
            <div>
                <Form>
                    <Form.Group>First Name
                        <Form.Control type="text" name="firstname" value={firstname} placeholder="Johnny" onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group>Last Name
                        <Form.Control type="text" name="lastname" value={lastname} placeholder="Appleseed" onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group>Password
                        <Form.Control type="password" name="password" value={password} placeholder="6+ characters" onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group>Confirm Password
                        <Form.Control type="password" name="confirmation" value={confirmation} placeholder="6+ characters" onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group>GitHub Link (optional)
                        <Form.Control type="text" name="github" value={github} placeholder="https://github.com/johnny" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>LinkedIn Profile Link (optional)
                        <Form.Control type="text" name="linkedin" value={linkedin} placeholder="https://www.linkedin.com/in/johnnyappleseed/" onChange={handleChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={onNext}>
                        Next
                    </Button>
                </Form>
            </div>
        )
    }
}