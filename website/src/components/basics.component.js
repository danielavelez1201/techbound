import React from "react";

// Importing Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

// Importing a few elements from react-bootstrap for design aesthetics
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Basics = ({ setForm, formData, navigation }) => {
  const { email, resume } = formData;
  const { next } = navigation;

  return (
    <div>
      <Form>
        <Form.Group>
          Email (to send results)
          <Form.Control
            type="text"
            name="email"
            placeholder="johnny@college.edu"
            value={email}
            onChange={setForm}
            required
          />
        </Form.Group>
        <Form.Group>
          Resume
          <Form.File
            type="file"
            name="resume"
            value={resume}
            onChange={setForm}
            required
          />
        </Form.Group>
        <Button variant="primary" onClick={next}>
          Get Started
        </Button>
      </Form>
    </div>
  );
};

export default Basics;
