import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Form, OverlayTrigger, Overlay, Popover } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { useForm } from "react-hooks-helper";
import ForgotPassword from "./forgot-password.component";

const NavItems = [
    {
        title: 'View Internships',
        url: '#',
        cName: 'nav-links'
    },
    {
        title: 'Log In',
        cName: 'nav-links'
    },
    {
        title: 'Tailor Your Resume',
        url: '#',
        cName: 'nav-button'
    },
];

const defaultData = {
    email: "",
    password: ""
};

const Header2 = () => {
    const [formData, setForm] = useForm(defaultData);
    const { email, password } = formData;

    const [modalShow, setModalShow] = useState(false);

    const loginPopover = (
        <Popover className="login-box">
            <Popover.Content>
                <h2>Welcome back!</h2>
                <Form>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" className="form-field" value={email} onChange={setForm} required />
                    </Form.Group>
                    <Form.Group>
                        <div className="inline-form-text">
                            <Form.Label>Password</Form.Label>
                            <Form.Text><a href="#" onClick={() => setModalShow(true)}>Forgot Your Password?</a></Form.Text>
                        </div>
                        <Form.Control className="form-field" type="password" name="password" value={password} onChange={setForm} required />
                    </Form.Group>
                    <Button className="button">Log In</Button>
                    <h3>New here? <a href="sign-up">Create an account.</a></h3>
                </Form>
            </Popover.Content>
        </Popover>
    );

    return (
        <div className= 'nav-background'>
            <nav className= "FullNavbar">
                <h2 className="logo blue-text">techbound</h2>
                <ul>
                {NavItems.map((item, index) => {
                        if (item.title === "Log In") {
                            return (
                                <li className="NavbarItems" key={index}>
                                    <OverlayTrigger trigger="click" placement="bottom" overlay={loginPopover}>
                                        <a className={item.cName}>
                                            {item.title}
                                        </a>
                                    </OverlayTrigger>
                                </li>
                            )
                        }
                        return (
                            <li className="NavbarItems" key={index}>
                                <a className={item.cName} href={item.url}>
                                    {item.title}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </nav>
            <ForgotPassword show={modalShow} onHide={() => setModalShow(false)} />
        </div>
    );
};

export default Header2;
