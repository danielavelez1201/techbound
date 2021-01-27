import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Redirect } from "react-router-dom";

const NavItems = [
    {
    title: 'View Internships',
    url: '#',
    cName: 'nav-links'
    },

    {
        title: 'Log In',
        url: '#',
        cName: 'nav-links'
    },

    {
        title: 'Tailor Your Resume',
        url: '#',
        cName: 'nav-button'
    },
]

class Header2 extends Component {
  render() {
    return (
        <div className= 'nav-background'>
            <nav className= "FullNavbar">
                <h2 className="logo blue-text">techbound</h2>
                <ul>
                {NavItems.map((item, index) => {
                        return(
                            <li className="NavbarItems" key={index}>
                                <a className={item.cName} href= {item.url}>
                                    {item.title}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </div>
    );
  }
}

export default Header2;
