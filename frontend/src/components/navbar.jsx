import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

// Icon imports
import { TbDeviceGamepad2, TbMap2 } from "react-icons/tb";
import { RiLinksLine } from "react-icons/ri";

// Navbar imports
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar"

// Navbar Component
function AspireNavbar() {
    return (
        <Navbar expand="sm" bg="dark" variant="dark">
            <Container>
                <Nav>
                    <Nav.Link href="/PageNotFound">
                        <TbDeviceGamepad2 />
                    </Nav.Link>
                    <Nav.Link href="/Map">
                        <TbMap2 />
                    </Nav.Link>
                    <Nav.Link href="/PageNotFound">
                        <RiLinksLine />
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}

export default AspireNavbar;
