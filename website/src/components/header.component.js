import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Redirect } from "react-router-dom";

export default class Header extends Component {
  render() {
    return (
        <div className= "Navbar">
          <Navbar
            collapseOnSelect
            fixed="top"
            sticky="top"
            expand="lg"
            bg="dark"
            variant="dark"
            className= "Navbar"
          >
            <Navbar.Brand href="/">TECHBOUND</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav
                variant="pills"
                className="ml-auto"
                defaultActiveKey="#memes"
              >
                <Nav.Link href="#internships">View Internships</Nav.Link>
                <Nav.Link href="#deets">Log In</Nav.Link>
                <Button variant="info" href="sign-up">Tailor Your Resume</Button>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
<<<<<<< HEAD
=======
      </div>
>>>>>>> 4200cb916a9676d3744b34d6ea8f6d5ae5ae6aaf
    );
  }
}
