import React from "react";

// Importing Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

// Importing a few elements from react-bootstrap for design aesthetics
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import MoreDeets from "./more-deets.component.js";
import { Redirect } from "react-router-dom";

function Basics(props) {
  if (props.currentStep !== 1) {
    return null;
  }
  return (
    <div>
      <Form>
        <Form.Group>
          Email (to send results)
          <Form.Control
            type="text"
            name="email"
            value={props.email}
            onChange={props.handleChange}
            required
          />
        </Form.Group>
        <Form.Group>
          Resume
          <Form.File
            type="file"
            name="resume"
            value={props.resume}
            onChange={props.handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={props.onNext}>
          Get Started
        </Button>
      </Form>
    </div>
  );
}

export default Basics;
