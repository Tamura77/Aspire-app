import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import "./racePopup.css";

function AspireRacePopup(props){

    var [inputValue, setInputValue] = useState(props.answer);
    
    return (
        <Modal
        {...props}
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
            {props.task}
        </p>
        <Form>
            <Form.Group className="mb-3" controlId="formControlTextarea1">
                <Form.Control placeholder="enter answer here" as="textarea" rows={3} 
                type="text">
                    {inputValue}
                </Form.Control >
          </Form.Group>
        </Form>
        </Modal.Body>

        <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>Close</Button>
        <Button variant="primary" onClick={function(e){
            props.updateMarkerAnswer(props.name, inputValue);
        }}>Save changes</Button>
        </Modal.Footer>
    </Modal>
    );
}

export default AspireRacePopup