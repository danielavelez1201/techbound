import React, { useState } from "react";
import { useForm } from "react-hooks-helper";
import { Button, Form, Modal } from "react-bootstrap";

const ForgotPassword = props => {
    const defaultData = {
        email: "",
    }
    const [formData, setForm] = useForm(defaultData);
    const { email } = formData;

    return (
        <Modal {...props} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    Recover Password
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>What is your email?</Form.Label>
                        <Form.Control type="email" name="email" value={email} onChange={setForm} required />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>Cancel</Button>
                <Button>Email me a recovery link</Button>
            </Modal.Footer>
        </Modal>
    )
};

export default ForgotPassword;