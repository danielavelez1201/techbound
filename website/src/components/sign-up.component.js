import React from "react";
import Select from "react-select";

// Importing Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

// Importing a few elements from react-bootstrap for design aesthetics
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Basics from "./basics.component";
import MoreDeets from "./more-deets.component";
import ChooseClusters from "./choose-clusters.component";

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmation: "",
      resume: "",
      linkedin: "",
      github: "",
      clusters: [],
      currentStep: 1,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
    this.register = this.register.bind(this);
    this._next = this._next.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleChangeSelect(e) {
    this.setState({ clusters: e });
  }

  _next() {
    let currentStep = this.state.currentStep;
    // If the current step is 1 or 2, then add one on "next" button click
    currentStep = currentStep >= 2 ? 3 : currentStep + 1;
    this.setState({ currentStep: currentStep });
  }

  register() {}

  render() {
    const {
      firstname,
      lastname,
      email,
      password,
      confirmation,
      resume,
      linkedin,
      github,
      clusters,
      currentStep,
    } = this.state;

    return (
      <div>
        <Form onSubmit={this.register}>
          <Basics
            currentStep={currentStep}
            handleChange={this.handleChange}
            email={email}
            resume={resume}
            onNext={this._next}
          />
          <MoreDeets
            currentStep={currentStep}
            handleChange={this.handleChange}
            firstname={firstname}
            lastname={lastname}
            password={password}
            confirmation={confirmation}
            linkedin={linkedin}
            github={github}
            onNext={this._next}
          />
          <ChooseClusters
            currentStep={currentStep}
            handleChange={this.handleChangeSelect}
            clusters={clusters}
          />
        </Form>
      </div>
    );
  }
}
