import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

export default class Header extends Component {
  render() {
    return (
      <div>
        <div>
          <Navbar
            collapseOnSelect
            fixed="top"
            expand="lg"
            bg="dark"
            variant="dark"
          >
            <Navbar.Brand href="#home">TECHBOUND</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav
                variant="pills"
                className="ml-auto"
                defaultActiveKey="#memes"
              >
                <Nav.Link href="#internships">View Internships</Nav.Link>
                <Nav.Link href="#deets">Log In</Nav.Link>
                <Button variant="info">Tailor Your Resume</Button>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <div className="hero-container">
          <h1>Find a tech internship.</h1>
        </div>
      </div>
    );
  }
}
