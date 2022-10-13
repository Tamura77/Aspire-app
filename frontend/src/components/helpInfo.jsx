import React, { useState } from "react";
import { BrowserRouter as Router , Link } from "react-router-dom";

// Icons
import { TbDeviceGamepad2, TbMap2 } from "react-icons/tb";
import { RiLinksLine } from "react-icons/ri";
import { MdLocationPin } from "react-icons/md";

// CSS
import "../pages/styling/Help.css"

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Help page for information on how to use the website
function Help() {
    return (
        <>
        <div className="helpWrappingDiv">
        <Container>
        <div className="helpDiv" align="left">
                <Row>
                    <Col>
                        <div className="helpTitle" align="center">
                            Information Mode
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md="9">
                        <div className="helpText">
                            Switch to the information page using the navigation bar.
                        </div>
                    </Col>
                    <Col md="3">
                        <TbMap2 className="helpIcon" />
                    </Col>
                </Row>
                <Row>
                    <Col md="9">
                        <div className="helpText">
                            Each marker is a UWA "landmark" and when pressed it will display information about that location.
                        </div>
                    </Col>
                    <Col md="3">
                        <svg width="100" height="100">
                          <circle cx="50" cy="50" r="20" stroke="#fff" strokeWidth="2" fill="#FFA500" />
                        </svg>
                    </Col>
                </Row>
            </div>
            <div className="helpDiv" align="left">
                <Row>
                    <Col>
                        <div className="helpTitle" align="center">Race Mode</div>
                    </Col>
                </Row>
                <Row>
                    <Col md="9">
                        <div className="helpText">
                            Switch to the race page and enter your provided race code.
                        </div>
                    </Col>
                    <Col md="3">
                        <TbDeviceGamepad2 className="helpIcon" />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="helpText">
                            Answer the question once you get to the location.
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="helpSubHeader">
                            To answer a question
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md="9">
                        <div className="helpText">
                            Press on the red marker and type your answer in the pop-up.<br/>
                        </div>
                    </Col>
                    <Col md="3">
                        <svg width="100" height="100">
                            <circle cx="50" cy="50" r="20" stroke="#fff" strokeWidth="2" fill="#FF0000">
                            <text x="50" y="50" fill="#fff">
                                1
                            </text>
                            </circle>
                        </svg>
                    </Col>
                </Row>
                <Row>
                    <Col md="9">
                        <div className="helpText">
                            Once you answer the marker will turn green.
                        </div>
                    </Col>
                    <Col md="3">
                        <svg width="100" height="100">
                          <circle cx="50" cy="50" r="20" stroke="#fff" strokeWidth="2" fill="#2D932B" />
                        </svg>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="helpText">
                            After answering you will have the option to submit your answers, at this point press the submit button and pass the device to an administrator for marking.
                        </div>
                    </Col>
                </Row>
            </div>
        </Container>
        </div>
        </>
    );
}

export default Help
