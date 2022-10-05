import React, { Component } from "react";
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