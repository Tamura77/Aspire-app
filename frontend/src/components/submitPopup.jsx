import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function AspireSubmitPopup(props){
    return (
    <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <Modal.Body>
        <p>
            Are you sure?
        </p>
        </Modal.Body>
        <Modal.Footer>
        <Button onClick={
            function(e){
                props.submitRequest();
                props.onHide;
            }
        }>Yes</Button>
        <Button onClick={props.onHide}>No</Button>
        </Modal.Footer>
    </Modal>
    );
}

export default AspireSubmitPopup