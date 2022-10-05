import React, { Component } from "react";
<<<<<<< HEAD
import { BsListTask } from "react-icons/bs";
import { BsPinMap } from "react-icons/bs";
import { BsSpeedometer2 } from "react-icons/bs";
import './sidebar.css'

const Pages = [
    {
    name: "Tasks",
    icon: <BsListTask/>,
    link: "/tasks"
},
{
    name: "Locations",
    icon: <BsPinMap/>,
    link: "/locations"
},
{
    name: "Races",
    icon: <BsSpeedometer2/>,
    link: "/races"
}
]

function Sidebar(){
    return(
        <div className="Sidebar">
            <ul className="SidebarList">
                {Pages.map((val,key) =>{
                    return (
                        <li key = {key} 
                        className="row"
                        onClick={() => {
                            window.location.pathname = val.link;
                        }}>
                            <div> {val.icon}</div> <div>{val.name}</div>
                </li>
                    );
                })}
                
            </ul>
        </div>
    )
}

export default Sidebar
=======
import { BrowserRouter as Router, Link } from "react-router-dom";

import "./sidebar.css";




//sidebar data/page
import {pages} from "./sidebardata";

function sidebar(){
    return (
        <>
        <div className="sidebar">
           <ul className="sidebarlist">
            {pages.map((val, key) => {
                return ( <li key ={key}
                    className="row"
                    onClick={() => {window.location.pathname = val.Link;
                }}>
                    {" "} 
                    <div id="list">
                        <div id="icon">
                            {val.Icon}
                        </div>
                        <div id="name">
                            {val.name}
                        </div>
                    </div>
                </li>
                );
            })}
           </ul>
        </div>
        </>
    );
}
export default sidebar
>>>>>>> 20302be54a1b442c8645cadc11b6926bca815778
