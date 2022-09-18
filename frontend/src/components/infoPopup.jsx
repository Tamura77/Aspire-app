import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./infoPopup.css";

function AspireInfoPopup(props){
    // var [name] = useState(props.name);
    // var [description] = useState(props.description);

    // console.log("in popup:");
    // console.log(name);
    // console.log(description);

    return (
    <Modal
        {...props}
        onEntered = {console.log("entered")}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            {props.name}
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p>
            {props.description}
        </p>
        </Modal.Body>
        <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
    </Modal>
    );
}

export default AspireInfoPopup