import React from "react";

// Importing Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

// Importing a few elements from react-bootstrap for design aesthetics
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default class Basics extends React.Component {
  render() {
    if (this.props.currentStep !== 1) {
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
              value={this.props.email}
              onChange={this.props.handleChange}
              required
            />
          </Form.Group>
          <Form.Group>
            Resume
            <Form.File
              type="file"
              name="resume"
              value={this.props.resume}
              onChange={this.props.handleChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={this.props.onNext}>
            Get Started
          </Button>
        </Form>
      </div>
    );
  }
}
