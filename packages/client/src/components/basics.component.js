import React from "react";

// Importing Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from 'react';
import { useForm } from "react-hooks-helper";
import { useHistory } from "react-router-dom";

// Importing a few elements from react-bootstrap for design aesthetics
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Basics = (colleges) => {


    async function getColleges() {
        await fetch('http://universities.hipolabs.com/search?country=United%20States')
            .then(res => res.json())
            .then(colleges => {
                const collegeList = colleges.map(college => college.name)
                return collegeList;      
            })
            .catch(error => console.error(error));
    };


  const defaultData = {
    email: ""
  }
  const [{ email }, setForm] = useForm(defaultData);

  let history = useHistory();
  async function handleClick() {
    if (!colleges) {
      colleges = await getColleges()
    }
    history.push({
      pathname: "/signup",
      state: { email: email, colleges: colleges}
    });
  };

  // code including resume upload, don't wanna delete bc might be useful later

  // const defaultData = {
  //   email: "",
  //   resume: ""
  // }
  // const [{ email, resume }, setForm] = useForm(defaultData);
  // const [fileName, setFileName] = useState("none");
  // const [file, setFile] = useState("");

  // const uploadFile = (e) => {
  //   setFileName(e.target.files[0].originalname);
  //   setForm({target: {name: "resume", value: e.target.files[0]}});
  //   setFile(e.target.files[0]);
  // }
  // let history = useHistory();
  // const handleClick = () => {
  //   console.log(file);
  //   history.push({
  //     pathname: "/sign-up/more",
  //     state: { email: email, resume: resume }
  //   });
  // };

  return (
    <div>
      <Form>
         <Form.Group className="form-centered">
          <Form.Control
            type="email"
            name="email"
            className="form-field form-margin-centered"
            placeholder="jenny@college.edu"
            value={email}
            onChange={setForm}
            required
          />
        </Form.Group>
        {/* <Form.Group className="form-label form-margin">
          Resume
          <Form.File
            type="file"
            className= "resume-button"
            onChange={uploadFile}
            required
            label={fileName}
          />
        </Form.Group> */}
        <Button className = 'button' variant="primary" onClick={handleClick}>
          Create account
        </Button>
        <Form.Group>
        
        </Form.Group>
        
      </Form>
    </div>
    
  );
};

export default Basics;

