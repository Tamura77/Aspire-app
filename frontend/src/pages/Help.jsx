import React, { useState } from "react";
import { BrowserRouter as Router , Link } from "react-router-dom";

// Icons
import { TbDeviceGamepad2, TbMap2 } from "react-icons/tb";
import { RiLinksLine } from "react-icons/ri";
import { MdLocationPin } from "react-icons/md";

// Components
import AspireNavbar from "../components/navbar";

// CSS
import "./styling/Help.css"

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
                        <div className="helpTitle" align="center">Race Mode</div>
                    </Col>
                </Row>
                <Row>
                    <Col md="9">
                        <div className="helpText">
                            Switch to the race page and enter the race code provided. Then wait for the race to start
                        </div>
                    </Col>
                    <Col md="3">
                        <TbDeviceGamepad2 className="helpIcon" />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="helpText">
                            Answer all the questions then submit your answers for marking
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
                            Press on the waypoint and answer in the popup<br/>
                        </div>
                    </Col>
                    <Col md="3">
                        <MdLocationPin className="helpIcon redIcon" align="center" />
                    </Col>
                </Row>
                <Row>
                    <Col md="9">
                        <div className="helpText">
                            Once you answer the waypoint will turn orange, indicating its time to get your answer checked
                        </div>
                    </Col>
                    <Col md="3">
                        <MdLocationPin className="helpIcon orangeIcon" align="center" />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="helpText">
                            After answering you will have the option to submit your answers, at this point press the submit button and pass the device to an administrator for marking
                        </div>
                    </Col>
                </Row>
            </div>
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
                            Switch to the information page using the navbar
                        </div>
                    </Col>
                    <Col md="3">
                        <TbMap2 className="helpIcon" />
                    </Col>
                </Row>
                <Row>
                    <Col md="9">
                        <div className="helpText">
                            Press on a waypoint to show additional information about that location
                        </div>
                    </Col>
                    <Col md="3">
                        <MdLocationPin className="helpIcon" />
                    </Col>
                </Row>
            </div>
            <div className="helpDiv" align="left">
                <Row>
                    <Col>
                        <div className="helpTitle" align="center">
                            Useful Links 
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md="9">
                        <div className="helpText">
                            Switch to the information page using the navbar
                        </div>
                    </Col>
                    <Col md="3">
                        <RiLinksLine className="helpIcon" />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="helpText">
                            Click on the link of the page you want to visit 
                        </div>
                    </Col>
                </Row>
            </div>
        </Container>
        </div>
        <AspireNavbar />
        </>
    );
}

export default Help
