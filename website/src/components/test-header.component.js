import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Form, OverlayTrigger, Popover } from "react-bootstrap";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useForm } from "react-hooks-helper";
import { connect } from 'react-redux';
import { login } from '../actions/action.auth';
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

const Header2 = ({ login, isAuthenticated, user }) => {
    const [formData, setForm] = useForm(defaultData);
    const { email, password } = formData;

    async function onSubmit(e) {
        e.preventDefault();
        console.log(formData.email, formData.password);
        await login(formData.email, formData.password); 

    }

    console.log("isAuthenticated from header", isAuthenticated);

    let history = useHistory();

    const profileClick = () => {
        history.push({
          pathname: '/profile',
          state: {userEmail: user.email },
        });
      };

    //if (isAuthenticated) {
    //    return <Redirect to= "/sample" />;
    //}

    const [modalShow, setModalShow] = useState(false);

    const loginPopover = (
        <Popover className="login-box">
            <Popover.Content>
                <h4>Welcome back!</h4>
                <h6>New here? <a href="sign-up">Create an account.</a></h6>
                <Form onSubmit={(e) => onSubmit(e)}>
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
                    <Button type="submit">Log In</Button>
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
                        if (item.title === "Log In" && !isAuthenticated) {
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
                        else if (item.title === "Log In" && isAuthenticated) {
                            return (
                                <li className="NavbarItems">
                                        <a className={item.cName} onClick={profileClick}>
                                            View profile
                                        </a>
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

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
  });

export default connect(mapStateToProps, {login})(Header2);

