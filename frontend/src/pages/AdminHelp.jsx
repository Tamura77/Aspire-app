import React, { useState, useEffect } from "react";
import { BrowserRouter as Router , Link, useNavigate } from "react-router-dom";
import { verifyLogin } from "../utils/verifyLogin";

// Icons
import { TbDeviceGamepad2, TbMap2 } from "react-icons/tb";
import { RiLinksLine } from "react-icons/ri";
import { MdLocationPin } from "react-icons/md";

// Components
import Sidebar from "../components/sidebar";

// CSS
import "./styling/Help.css"

// Bootstrap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Help page for information on how to use the website
function AdminHelp() {

    useEffect(verifyLogin(useNavigate()), []);

    return (
        <>
        <div className="admin-div">
            <Sidebar/>
            <div className="helpWrappingDiv" style={{width: "100%"}}>
                <Container>
                    <div className="helpDiv" align="left">
                        <Row>
                            <Col> 
                                <div className="helpTitle">Tables Page</div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="helpText">
                                    The Tables page gives an overview of all the tasks created,
                                    all locations created and the tasks in the current race which
                                    will be shown in the race mode.
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col> 
                                <div className="helpTitle">Tasks Page</div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="helpText">
                                    Tasks are the content of the race and contain a question and a location
                                    The tasks page shows the current tasks that have been created on the right
                                    hand side and allows you to add more using the left hand side.
                                    To add a task select a location and enter the question then click post
                                    To modify or delete a task enter the corresponding task ID and then click 
                                    the delete button or enter a new question or location and click update.
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col> 
                                <div className="helpTitle">Race Page</div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="helpText">
                                    A race is a collection of tasks in a specific order the race is configured in
                                    the Race page. The race page shows you the current race on the right hand side and 
                                    allows you to modify the race using the left hand side. To add to the race select 
                                    a task and the race name then click post. To delete a task from a race enter its Race
                                    ID and press delete. To change one of the tasks enter its Race ID then select a new 
                                    task and press update. The order of the tasks is important as it is displayed to the 
                                    users and tells them the order to do the tasks in. The order of the tasks can be 
                                    considered a loop and the starting and finishing positions can be altered using 2 
                                    letters at the end of the race code the users enter before starting a race. ab will 
                                    start from the 1st task and end at the last task, cd will start at the 2nd task and
                                    end at the 1st and so on. This allows one set of tasks to create many races.
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col> 
                                <div className="helpTitle">Locations Page</div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="helpText">
                                    The locations page allows you to manage the places where tasks can be set and the places 
                                    displayed in the information mode. To add a new location press somewhere on the map enter 
                                    a description, a place name and then click post. To access the lower half of the map click the 
                                    down button and then click on a location, to return to the top half click the up button. To
                                    delete a location enter the Place ID (available on the tables page) then click delete. To update 
                                    a location enter the Place ID and then edit any of the place name, description or coordinate 
                                    fields and then click update.
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        </div>
        </>
    );
}

export default AdminHelp
