import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import "./racePopup.css";

function AspireRacePopup(props){

    var [raceColour, setRaceColour] = useState(props.colour);
    
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
            <Form.Group className="mb-3" controlId="form.ControlTextarea1">
                <Form.Control placeholder="enter answer here" as="textarea" rows={3} />
          </Form.Group>
        </Form>
        </Modal.Body>

        <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>Close</Button>
        <Button variant="primary" onClick={function(e){
            setRaceColour("#00FF00");
            props.updateColour;
            console.log(props.colour);
        }}>Save changes</Button>
        </Modal.Footer>
    </Modal>
    );
}

export default AspireRacePopup