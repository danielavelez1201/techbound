import React from "react";
import { useForm, useStep } from "react-hooks-helper";
import { useLocation } from "react-router-dom";
import { useState } from 'react';

// Importing Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

// Importing a few elements from react-bootstrap for design aesthetics
import MoreDeets from "./more-deets.component";
import ChooseClusters from "./choose-clusters.component";

const steps = [
    { id: "more-deets" },
    { id: "choose-clusters" },
];

const SignUpNext = () => {
    const location = useLocation();

    const defaultData = {
        firstname: "",
        lastname: "",
        email: location.state.email,
        password: "",
        confirmation: "",
        college: "",
        clusters: [],
    };

    const [formData, setForm] = useForm(defaultData);
    const { step, navigation } = useStep({ initialStep: 0, steps });
    const [resume, _] = useState(defaultData.resume);
    const { id } = step;

    const props = { formData, setForm, navigation, resume };

    switch (id) {
        case "more-deets":
            return <MoreDeets {...props} />;
        case "choose-clusters":
            return <ChooseClusters {...props} />;
        default:
            return null;
    }
};

export default SignUpNext;