import React, { useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Help from "./helpInfo";

// Icon imports
import { IoCloseSharp } from "react-icons/io5";

// CSS
import "./helpButton.css";

// Bootstrap button
import Button from "react-bootstrap/Button";

// HelpButton component links to the help page
function HelpButton() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div className="fixed-top" align="right">
            <Button className="helpButton" align="right" onClick={handleShow}>
                ?
            </Button>
            <Modal show={show} onHide={handleClose} dialogClassName="main-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Aspire UWA</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Help/>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default HelpButton;
