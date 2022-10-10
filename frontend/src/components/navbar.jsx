import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

// Icon imports
import { TbDeviceGamepad2, TbMap2 } from "react-icons/tb";
import { RiLinksLine } from "react-icons/ri";
import "./navbar.css";

// Navbar imports
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar"
import { useState } from "react";

// Navbar Component
function AspireNavbar() {
    if (localStorage.getItem("racemarkers") === null){
        return(
        <div className="navbarPadding">
        <Navbar className="fixed-bottom navbarDefault" expand="sm" bg="light" variant="light">
            <Nav className="m-auto">
                <Nav.Link href="/TeamLogin">
                    <TbDeviceGamepad2 className="iconDefault" />
                </Nav.Link>
                <Nav.Link href="/">
                    <TbMap2 className="iconDefault"/>
                </Nav.Link>
                <Nav.Link href="/ExternalLinks">
                    <RiLinksLine className="iconDefault"/>
                </Nav.Link>
            </Nav>
        </Navbar>
        </div>
        );
    }
    else{
        return (
        <div className="navbarPadding">
        <Navbar className="fixed-bottom navbarDefault" expand="sm" bg="light" variant="light">
            <Nav className="m-auto">
                <Nav.Link href="/Race">
                    <TbDeviceGamepad2 className="iconDefault" />
                </Nav.Link>
                <Nav.Link href="/">
                    <TbMap2 className="iconDefault"/>
                </Nav.Link>
                <Nav.Link href="/ExternalLinks">
                    <RiLinksLine className="iconDefault"/>
                </Nav.Link>
            </Nav>
        </Navbar>
        </div>
        );
    }
}

export default AspireNavbar;
