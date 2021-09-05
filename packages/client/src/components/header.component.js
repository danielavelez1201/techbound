import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/action.auth";

function Header({logout}) {
    return (
        <div className= "Navbar">
          <Navbar
            collapseOnSelect
            fixed="top"
            sticky="top"
            expand="lg"
            bg="light"
            variant="light"
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
                <Nav.Link href="#login">Log In</Nav.Link>
                <Nav.Link onClick ={logout} href="#">Log Out</Nav.Link>
                <Button variant="info" href="/signup">Create account</Button>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </div>
    );
  }


export default connect(null, {logout})(Header);
