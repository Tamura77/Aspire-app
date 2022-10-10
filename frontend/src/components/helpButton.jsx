import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

// Icon imports
import { IoCloseSharp } from "react-icons/io5";

// CSS
import "./helpButton.css";

// Bootstrap button
import Button from "react-bootstrap/Button";

// HelpButton component links to the help page
function HelpButton() {
    return (
        <div className="fixed-top">
            <Button className="helpButton" href='/Help'>
                ?
            </Button>
        </div>
    );
}

export default HelpButton;
