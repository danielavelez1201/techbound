import React from "react";
import { useForm, useStep } from "react-hooks-helper";

// Importing Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

// Importing a few elements from react-bootstrap for design aesthetics
import Basics from "./basics.component";
import MoreDeets from "./more-deets.component";
import ChooseClusters from "./choose-clusters.component";

const steps = [
    { id: "basics" },
    { id: "more-deets" },
    { id: "choose-clusters" },
];

const defaultData = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmation: "",
    resume: "",
    linkedin: "",
    github: "",
    clusters: [],
}

const SignUp = () => {
    const [formData, setForm] = useForm(defaultData);
    const { step, navigation } = useStep({ initialStep: 0, steps });
    const { id } = step;

    const props = { formData, setForm, navigation };

    switch (id) {
        case "basics":
            return <Basics {...props} />;
        case "more-deets":
            return <MoreDeets {...props} />;
        case "choose-clusters":
            return <ChooseClusters {...props} />;
        default:
            return null;
    }
};

export default SignUp;