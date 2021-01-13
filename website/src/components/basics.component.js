import React from "react";

// Importing Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hooks-helper";
import { useHistory } from "react-router-dom";

// Importing a few elements from react-bootstrap for design aesthetics
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Basics = () => {
  const defaultData = {
    email: "",
    resume: ""
  }
  const [formData, setForm] = useForm(defaultData);
  const { email, resume } = formData;

  let history = useHistory();
  const handleClick = () => {
    console.log(history);
    history.replace({
      pathname: "/sign-up",
      state: { email: email, resume: resume }
    });
  };

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
        <Button variant="primary" onClick={handleClick}>
          Get Started
        </Button>
      </Form>
    </div>
  );
};

export default Basics;
