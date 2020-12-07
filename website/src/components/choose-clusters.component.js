import React from "react";
import Select from "react-select";

// Importing Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

// Importing a few elements from react-bootstrap for design aesthetics
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default class ChooseClusters extends React.Component {
  render() {
    const all_clusters = [
      { value: "language", label: "Language" },
      { value: "security_and_defense", label: "Security and Defense" },
      { value: "education", label: "Education" },
      { value: "media_and_entertainment", label: "Media and Entertainment" },
    ];
    const { currentStep, handleChange, clusters } = this.props;
    if (currentStep !== 3) {
      return null;
    }
    return (
      <div>
        <Form>
          <Form.Group>
            Clusters (Select 3)
            <Select
              isMulti
              name="clusters"
              value={clusters}
              options={all_clusters}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
      </div>
    );
  }
}
