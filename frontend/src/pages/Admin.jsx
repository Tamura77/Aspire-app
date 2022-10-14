import React, { useState, useEffect } from 'react';
import {useQuery} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import {BrowserRouter as Router, Link} from "react-router-dom";
import axios from 'axios';
import Form from 'react-bootstrap/Form';

import "./styling/AdminLogin.css";

function setToken(userToken) {
    sessionStorage.setItem('token', userToken);
}

function Admin(){
    
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        axios.post("/admin/login/verify", {"token": token}).then((response) => {
            if(response.data.success) {
                routeChange();
            }
        }).catch((e) => {
            console.error(e);
        });
      }, []);

    const navigate = useNavigate();

    // Change to Tables page on submit
    const routeChange = () =>{ 
        let path = `/AdminTables`; 
        navigate(path);
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios.post("/admin/login", {"password": password}).then((response) => {
            setToken(response.data.token);
            routeChange();
        }).catch((e) => {
            setPassword("");
            if (e.response.status == 401) {
                setErrorMessage("Incorrect Password Please Try Again")
            } else {
                setErrorMessage("Server Error Please Try Again")
            }
        })
    }

    return(
        <div className="AdminLoginDiv">
            <Form className="AdminLoginForm" onSubmit={handleSubmit}>
                <div className="AdminLoginFormContent">
                    <h1 className="AdminLoginFormTitle">Admin Log In</h1>
                    {errorMessage != "" ? <span className="FormError">{errorMessage}</span> : <></>} 
                    <div className="form-group mt-3">
                        <input 
                        type="password" 
                        value={password}
                        onChange={e => setPassword(e.target.value)} 
                        className="form-control mt-1"
                        placeholder="Enter Admin code"/>
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </div>
            </Form>
        </div>
    );
}

export default Admin