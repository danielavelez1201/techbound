import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Form, OverlayTrigger, Popover } from "react-bootstrap";
import { Link, Redirect, useHistory } from "react-router-dom";
import { useForm } from "react-hooks-helper";
import { connect } from 'react-redux';
import { login } from '../actions/action.auth';
import ForgotPassword from "./forgot-password.component";
import * as styles from '../App.css'
import App from "../App";

function NavItems(className) {return [
    {
        title: 'For recruiters',
        url: '#',
        cName: className,
    },
    {
        title: 'Log In',
        cName: className,
    },
    {
        title: 'Create account',
        url: 'signup',
        cName: 'nav-button'
    },
];
};


const defaultData = {
    email: "",
    password: ""
}

const Header2 = (props, {isAuthenticated, user }) => {
    const [formData, setForm] = useForm(defaultData);
    const { email, password } = formData;
    const [open, setOpen] = useState(false);
    console.log("open in header:", open)

    async function onSubmit(e) {
        e.preventDefault();
        console.log(formData.email, formData.password);
        await login(formData.email, formData.password); 
        history.push({
            pathname: '/profile',
            state: {userEmail: formData.email },
          });
    }

    console.log("isAuthenticated from header", isAuthenticated);

    let history = useHistory();

    const profileClick = () => {
        history.push({
          pathname: '/profile',
          state: {userEmail: user.email },
        });
      };

    const [modalShow, setModalShow] = useState(false);

    const loginPopover = (
        <Popover className="login-box">
            <Popover.Content>
                <h4>Welcome back!</h4>
                <h6>New here? <a href="signup">Create an account.</a></h6>
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
        <div>
            
            
            <div className= "nav-background">
            
            <h2  className="logo blue-text">techbound</h2>
            
            <nav className= {open? 'FullNavbar-open' : 'FullNavbar-closed'}>
                
                <ul className="ul">
                {NavItems('nav-links-white').map((item, index) => {
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
        <div onClick={() => setOpen(!open)} className={open ? "sidebar-background-open" : "sidebar-background-closed"}>
            <img onClick={() => setOpen(!open)} style={{"padding": "20px", "height": "60px"}} src="https://i1.wp.com/freevector.co/wp-content/uploads/2009/01/54459-menu-three-lines-button-interface-symbol.png" />
        </div>
        </div>
        
    );
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
  });

export default connect(mapStateToProps)(Header2);;

