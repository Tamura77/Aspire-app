import React, { useState, useEffect } from 'react';
import {useQuery} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {BrowserRouter as Router, Link} from "react-router-dom";
import axios from 'axios';
import Form from 'react-bootstrap/Form';

import "./styling/AdminLogin.css";

function setToken(userToken) {
    sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken() {

    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.token
}

function Admin(){
    
    const [hasToken, setHasToken] = useState(false);
    const [password, setPassword] = useState();
    const [disable, setDisable] = useState(true);
    const [incorrect, setIncorrect] = useState(false);

    useEffect(() => {
        const token = getToken();
        const valid = axios.post("http://localhost:5000/admin/login/verify", {"token": token}); //PROBLEM MAY BE THAT I AM DOING THIS WRONG
        setHasToken(valid);
        if(hasToken) {
            setDisable(false);
            // routeChange();
        }
      }, []);

    const navigate = useNavigate();

    // Change to Tables page on submit
    const routeChange = () =>{ 
        let path = `/AdminTables`; 
        navigate(path);
    }

    const handleSubmit = async e => {
        e.preventDefault();
        setIncorrect(true)
        const token = await axios.post("http://localhost:5000/admin/login", {"password": password}); //PROBLEM MAY BE THIS IS ASSIGNING TOKEN WRONG
        setIncorrect(false)
        setToken(token);
        setDisable(false);
    }

    return(
        <div className="AdminLoginDiv">
            <Form className="AdminLoginForm" onSubmit={handleSubmit}>
                <div className="AdminLoginFormContent">
                    <h1 className="AdminLoginFormTitle">Admin Log In</h1>
                    <div className="form-group mt-3">
                        <label>Incorrect Please Try Again</label>
                        <input 
                        type="password" 
                        onChange={e => setPassword(e.target.value)} 
                        className="form-control mt-1"
                        placeholder="Enter Admin code"/>
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                        <button type="button" className="btn btn-primary" disabled={disable} onClick={routeChange}>
                            Go To Admin Pages
                        </button>
                    </div>
                </div>
            </Form>
        </div>
    );
}

export default Admin