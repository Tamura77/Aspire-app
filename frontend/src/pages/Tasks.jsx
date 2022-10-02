import React, { useState } from "react";
import { BrowserRouter as Router , Link } from "react-router-dom";

//icons
import {BsFillArrowRightSquareFill} from "react-icons/bs"
import {BsFillArrowLeftSquareFill} from "react-icons/bs"

//Components
import Sidebar from "../components/sidebar";

//Styling
import "./styling/Tasks.css"
import "../components/sidebar.css"


function Tasks() {
    const [isshown, setisshown] = useState(false);
    const [isshown2, setisshown2] = useState(true);

    const handleClick = event =>{
        setTimeout(() => {
        setisshown(current => !current);
        setisshown2(current => !current);
    }, 50);
}
  return (
    <>
    <div className="tasks">
        {isshown2 && (
        <div id = "arrow"onClick={handleClick}><BsFillArrowRightSquareFill/></div>
        )}
        {isshown && (
            <div id="sidebar">
            <Sidebar/>
            <div id = "close" onClick={handleClick}>
            <BsFillArrowLeftSquareFill/>
            </div>
            </div>
        )}
        Test 1
    </div>
    </>
  );
}

export default Tasks