import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function AspireSubmitPopup(props){
    return (
    <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <Modal.Body>
        <p>
            Are you sure you want to complete this action?
        </p>
        </Modal.Body>
        <Modal.Footer>
        <Button className="btn btn-success" onClick={
            function(e){
                props.submitRequest();
                props.onHide;
            }
        }>Yes</Button>
        <Button className="btn btn-danger" onClick={props.onHide}>No</Button>
        </Modal.Footer>
    </Modal>
    );
}

export default AspireSubmitPopup