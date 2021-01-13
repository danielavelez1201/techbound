import React from 'react';
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { login } from '../actions/action.auth';
import { useState } from "react";

function Login () {
    const [loginData, setLoginData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const onChange = (e) => 
    setLoginData({...loginData, [e.target.name]: e.target.value})

    const onSubmit = (e) => {
        e.preventDefault();
        login(name, email, password);
    }
    const { name, email, password} = loginData;
    return (
        <div>
        <h1> Sign in to your account </h1>
        <form onSubmit = {(e) => onSubmit(e)}>
            <input 
            type="text" 
            onChange={(e) => onChange(e)} 
            autoComplete="on" 
            name="name" 
            placeholder="name"/> 
            <br />
            <input 
            type="email" 
            onChange={(e) => onChange(e)} 
            autoComplete="on" 
            name="email" 
            placeholder="email here"/> 
            <input 
            type="password" 
            onChange={(e) => onChange(e)} 
            autoComplete="on" 
            name="password" 
            placeholder="password"/> 
            <button type="submit">LOGIN</button>

        </form>
        <br />
        <h6> Don't have an account? <Link to="/signup">Create Account</Link></h6>

        </div>
    )
}

export default connect(null, {login})(Login);
